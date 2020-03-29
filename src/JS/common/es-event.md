# 自定义事件

## 原生 js 的自定义事件

```html
<body>
  <div id="app">假如这里是模态框</div>
  <button data-type="1" class="emit">button1</button>
  <button data-type="2" class="emit">button2</button>
  <script>
    var app = document.getElementById("app");
    // 原生的自定义事件
    $(".emit").click(function(e) {
      var ev = new CustomEvent("customEventName", {
        detail: {
          type: e.target.dataset.type,
          name: "leooo"
        }
      });
      app.dispatchEvent(ev);
    });
    // 监听事件：
    app.addEventListener("customEventName", e => {
      console.log(e);
      console.log(e.detail.type);
    });
  </script>
</body>
```

## jq 自定义事件

```js
// <div id="app2">1234566 这里是模态框2</div>
// <button data-type="1" class="emit2">jqbutton1</button>
// <button data-type="2" class="emit2">jqbutton2</button>

$("#app2").bind("leoevent", function(e, ...argv) {
  console.log(e, argv);
});
$(".emit2").click(function(e) {
  $("#app2").trigger("leoevent", [e.target.dataset.type, "leooo"]);
});
```

## 移动端 300ms 点击延时问题

移动端浏览器的默认显示宽度是 980px(不同机型各异 但相差不大) 而不是屏幕的宽度(320px 或其他) 为了对早期普通网页更好的体验 iphone 设计了双击放大显示的功能 这就是 300ms 延迟的来源。 如果用户一次点击后 300ms 内没有其他操作 则认为是个单击行为 否则为双击放大行为

## 浏览器端的事件

**DOM0**级事件

```js
dom.onclick = function() {
  console.log("dom0 event");
};
dom.onclick = function() {
  console.log("dom0 event2");
  // 重新绑定会被覆盖
};
// <div onclick="aaa()"></div>
function aaa() {
  console.log("dom0 event");
}
```

**DOM2**级事件

addEventListener、jq 里面的事件绑定也都是基于 DOM2 级

```js
var p = document.getElementById("p");
var c = document.getElementById("c");
// addEventListener第三个参数默认是false 冒泡时执行
c.addEventListener(
  "click",
  function() {
    alert("子节点捕获");
  },
  true
);
c.addEventListener("click", function(e) {
  alert("子节点冒泡");
});
p.addEventListener(
  "click",
  function() {
    alert("父节点捕获");
  },
  true
);
p.addEventListener(
  "click",
  function() {
    alert("父节点冒泡");
  },
  false
);
// DOM2级事件不影响已绑定的DOM0级事件
p.onclick = function(e) {
  console.log(this, e);
};
// jq的多重绑定写法
$("#app").on({
  touchstart: function() {
    timeOutEvent = setTimeout(function() {
      // 此处为长按事件
    }, 500);
  },
  touchmove: function() {
    clearTimeout(timeOutEvent);
    timeOutEvent = 0;
    e.preventDefault();
  },
  touchend: function() {
    clearTimeout(timeOutEvent);
    if (timeOutEvent !== 0) {
      // 此处为点击事件
    }
    return false;
  }
});
```

## 事件对象 e 的 一些属性

**e.isTrusted** 区分是原生的事件还是自定义事件

## 事件委托

```js
function delegate(ele, selector, type, fn) {
  function callback(e) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    while (!target.matches(selector)) {
      target = target.parentNode;
    }
    fn.call(target, e);
  }
  ele.addEventListener(type, callback, false);
}
delegate(
  document.querySelector("body"),
  ".list-group-item",
  "click",
  function() {
    console.log("bingo");
  }
);
```
