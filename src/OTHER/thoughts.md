# 记录一些还暂未实践的想法

## 一个很长的 div 里面罗列了很多图片 形成了瀑布流 怎么实现懒加载

`getBoundingClientRect` + `setSrc`

```js
function LazyLoad(el, options) {
  if (!(this instanceof LazyLoad)) {
    return new LazyLoad(el);
  }

  this.setting = Object.assign(
    {},
    { src: "data-src", srcset: "data-srcset", selector: ".lazyload" },
    options
  );

  if (typeof el === "string") {
    el = document.querySelectorAll(el);
  }
  this.images = Array.from(el);

  this.listener = this.loadImage();
  this.listener();
  this.initEvent();
}

LazyLoad.prototype = {
  loadImage() {
    return throttle(function() {
      let startIndex = 0;
      while (startIndex < this.images.length) {
        const image = this.images[startIndex];
        if (isElementInViewport(image)) {
          const src = image.getAttribute(this.setting.src);
          const srcset = image.getAttribute(this.setting.srcset);
          if (image.tagName.toLowerCase() === "img") {
            if (src) {
              image.src = src;
            }
            if (srcset) {
              image.srcset = srcset;
            }
          } else {
            image.style.backgroundImage = `url(${src})`;
          }
          this.images.splice(startIndex, 1);
          continue;
        }
        startIndex++;
      }

      if (!this.images.length) {
        this.destroy();
      }
    }).bind(this);
  },
  initEvent() {
    window.addEventListener("scroll", this.listener, false);
  },
  destroy() {
    window.removeEventListener("scroll", this.listener, false);
    this.images = null;
    this.listener = null;
  }
};
```

屏幕滚动时节流触发函数 获取所有

## a 链接的 `target` 设置为 `_blank` 有什么隐患 解决方案

新页面能访问前一个页面的 window 对象 共享同一进程 可以设置 noopener 解决

## `http` 头报文的 `keep-alive` 是什么意思 有什么不好

tcp 连接复用 会 catch 住一定的服务器资源

## chrome 浏览器一个进程的并发请求数是多少 跟同一主机的 TCP 连接数有限制吗

## `performance.timing` 查看网页性能

```js
function logLoadInfo() {
  setTimeout(function() {
    let t = performance.timing;
    console.log(
      "DNS查询耗时" + (t.domainLookupEnd - t.domainLookupStart).toFixed(0),
      "\nTCP链接耗时" + (t.connectEnd - t.connectStart).toFixed(0),
      "\nrequest请求耗时" + (t.responseEnd - t.responseStart).toFixed(0),
      "\n解析dom树耗时" + (t.domComplete - t.domInteractive).toFixed(0),
      "\n白屏时间" + (t.responseStart - t.navigationStart).toFixed(0),
      "\ndomready时间" +
        (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0),
      `\nonload时间 ${(t.loadEventEnd - t.navigationStart).toFixed(0)}%`
    );
    if ((t = performance.memory)) {
      console.log(
        `js内存使用占比 ${(
          (t.usedJSHeapSize / t.totalJSHeapSize) *
          100
        ).toFixed(2)}%`
      );
    }
  });
}
```

## 模拟实现 call 怎么解决传参数个数的问题 不能用 es6

使用代码拼接用 eval 执行

## eval 的直接调用跟间接调用有什么区别

## 1 像素解决方案 根据像素比进行 scale 相应比例吗

## v-for 中如果数组重新赋值 更新列表元素带 key 是比不带 key 更快吗

## vue 中 v-for 列表元素事件使用了代理吗 为什么使用（不使用）

指向的均是同一个事件

## vue 中父子组建的生命周期是啥顺序

## 正则之断言

### 断言是 **`(?=)`**

### 断言不是 **`(?!)`**

```js
const numberWithCommas1 = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const numberWithCommas2 = x => {
  return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, (a, b) => b + ",");
};
```

`replace` 函数的第二个参数

```js
var str = "abcing npmingkkk";
str.replace(/ab(\w)(?=ing)/g, console.log);
// abc c 0 abcing npmingkkk

str.replace(/(?=ing)(\w)+/g, console.log);
```

这里有四个参数 匹配成功一次的 `整项`、`子项1`、`整项index`、`字符串`

```js
"bing abcing".match(/\b\w+(?=ing)/g);
// ["b", "abc"]

"bing abcingqwenpm".match(/\b\w+(?:ing)/g);
// ["bing", "abcing"]

"bingcvb abcingnpm".match(/(?<=ing)\w+\b/g);
// ["cvb", "npm"]

"ingqwe bingcvb abcingnpm".match(/(?<!ing)\w+\b/g); // js不支持
// ["ingqwe", "bingcvb", "abcingnpm"]
```

## arguments 对象的陷阱

```js
function A(func) {
  func();
  arguments[0]();
}
A(function() {
  console.log(this);
});
```

解析：

要明确 `arguments` 是对象 `{ 0: func, length: 1}` 相当于 **`arguments.0()`**

## 写一个事件委托

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

## 连续赋值的优先级问题

```js
var a = { name: "a" };
a.x = a = {};
console.log(a.x);
```

很明显是 `undefined` 呀 来看个复杂一点的

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x); // undefined
console.log(b.x); // { n: 2}
```

- 首先 a 和 b 同时引用了 `{ n: 1 }` 对象
- 接着执行到 `a.x = a = { n: 2 }` 语句 尽管赋值是从右到左的没错

  但是 **`.`** 的优先级比 **`=`** 要高 所以这里首先执行 `a.x` 相当于为 a（或者 b）所指向的 `{ n: 1 }` 对象新增了一个属性 `x`

  即此时对象将变为 `{ n: 1; x: undefined }`

  或者可以理解为 `x` 这个属性把 `a` 赋值之前的引用给 catch 住了

- 之后按正常情况 从右到左进行赋值 此时执行 `a = { n: 2 }` 的时候 `a` 的引用改变 指向了新对象 `{ n: 2 }` 而 `b` 依然指向的是旧对象
- 之后执行 `a.x = { n: 2 }` 的时候 并不会重新解析一遍 `a` 而是沿用最初解析 `a.x` 时候的 `a` 也即旧对象
  故此时旧对象的 `x` 的值为 `{ n: 2 }` 旧对象为 `{ n: 1, x : { n: 2 } }` 它被 `b` 引用着

```js
var a = (b = c);
// 猜想其复制过程(从左到右)
// 猜想1: b = c; a = b; 正确。c的值只会被读取一次。
// vccode 在代码格式化的时候也是将 b = c 包起来的
// 猜想2: b = c; a = c;
```

## `module.exports` 和 `exports` 有啥区别

一个模块内 `exports` 默认情况下就是 `module.exports` 的一个引用 最后导出的还是 `module.exports`

## 怎么给页面加上合适的骨架屏（原理）

### 以我们熟悉的 vue SPA 为例 首先我们加上结构及样式

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    #skeleton {
    }
  </style>
  <!-- 编译后插入在 head 中的外链样式文件 -->
  <link href=/static/css/app.5be76b7d213b43df9723e8ab15122efb.css
  rel=stylesheet>
</head>
<body>
  <div id="root">
    <div id="skeleton"></div>
  </div>
</body>
```

编译后的样式文件加载跟解析都会阻碍 `skeleton` 以最快的速度展现怎么办?

在样式文件加载完成之后 JavaScript 文件也基本已经加载完成

因此在骨架屏真的渲染出来之后没多久就被 JavaScript 渲染的真正内容取代 这就是为什么骨架屏出现非常靠后 效果大打折扣

### 避免样式文件的加载阻塞骨架屏的渲染

将 `rel="stylesheet"` 改为 `rel="preload"` 浏览器会在空闲的时候加载并缓存 之后再使用就不用重复加载

因为 **预加载的资源不会阻塞渲染**

### 避免 JS 先于 preload 的 CSS

如果 JavaScript 先执行并渲染出了内容 再应用外链样式 会导致页面重排和重绘 用户会先看到排版完全是乱的页面 再看到正常的页面
在样式文件加载完成前 即使 JavaScript 已经渲染好了内容 也先不要替换掉骨架屏 等待样式文件加载完成后 再触发 JavaScript 进行挂载

先把 `$mount` 操作缓存起来

```js
const app = new Vue({
  router,
  components: { App },
  template: "<App/>"
});
/**
 * 挂载 Vue 渲染好的 HTML 元素到 #app 中  替换掉骨架屏
 */
window.mount = function() {
  app.$mount("#app");
};
```

preload 完在 `$mount`

```html
<link
  rel="preload"
  href="/static/css/app.5be76b7d213b43df9723e8ab15122efb.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet';window.mount();"
/>
```

### 同样的避免 CSS 先于 JS

```js
const app = new Vue({
  router,
  components: { App },
  template: "<App/>"
});
// 挂载 Vue 渲染好的 HTML 元素到 #app 中  替换掉骨架屏
window.mount = function() {
  app.$mount("#app");
};
// 如果样式文件已经加载完成了  直接挂载
if (window.STYLE_READY) {
  window.mount();
}
```

preload 完在 `$mount`

```html
<link
  rel="preload"
  href="/static/css/app.5be76b7d213b43df9723e8ab15122efb.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet';window.STYLE_READY=1;window.mount&&window.mount();"
/>
```

## 前端安全之跨站请求伪造

- 受害者登录 a.com 并保留了登录凭证（Cookie）
- 攻击者引诱受害者访问了 b.com
- b.com 向 a.com 发送了一个请求 a.com/act=xx。浏览器会
- a.com 接收到请求后 对请求进行验证 并确认是受害者的凭证 误以为是受害者自己发送的请求
- a.com 以受害者的名义执行了 act=xx
- 攻击完成 攻击者在受害者不知情的情况下 冒充受害者 让 a.com 执行了自己定义的操作

从用户角度来讲 点击小电影的链接可以开启无痕模式

从开发来讲

- 接口要做必要的跨域限制 或者判断请求头 Origin 字段

- 下发给用户的 `cookie` `Samesite` 属性 设置为 `strict` 跨站将不会携带 `cookie`

  `strict` 将表示这个 `cookie` 只为 **`a.com`** 服务

  不管是你在 `b.com` 请求 `a.com` 还是 `a.com` 请求 `b.com`

- 可以下发一个额外随机的 token 埋到页面上 b.com 是拿不到的

跨站请求伪造特点是 伪造请求的网站并不能获取到用户的 cookie 只是冒用
比如 点击到新页面 新页面自动提交一个 post 表单 img preload-link 会带上 可以跨站的 cookie

node 应用可以用的 csurf 这个库防范

## 前端安全之脚本注入

## https 实现原理

安装有第三方权威证书的浏览器才能访问

比如 阿里在第三方权威机构注册证书 证书里包含有阿里的公钥

小林要发送一段机密给文件阿里 小林先生成一段密钥（我们叫它 `文件密钥` ）来加密文件 有了 `文件密钥` 才能查看文件内容

所以小林要把文件跟 `文件密钥` 都给发给阿里 又怕网络层被劫持

所以小林用阿里的公钥来加密 `文件密钥` 这样就不用担心啦 因为就算被劫持人家也没有阿里的私钥来解 `文件密钥`

阿里拿到之后用公司的私钥解密 `文件密钥` 最后拿到了文件的内容

这时候阿里给小林回了一段验证码 验证码被阿里的私钥加密过了

小林拿到加密过的验证码 用阿里的公钥解

整个过程既有对称加密又有非对称加密

## node 一个端口可以开多个进程吗

## `react` `setState` 函数有哪些需要注意的点 从表现行为来看

- **合成事件** 及 **钩子函数** 中的 `setState`

```js
class A extends Component {
  state = { index: 0 };
  componentDidMount() {
    console.log("SetState调用setState");
    this.setState({
      index: this.state.index + 1
    });
    console.log("state", this.state.index);
  }
  bindEvent = e => {
    console.log("SetState调用setState");
    this.setState({
      index: this.state.index + 1
    });
    console.log("state", this.state.index);
  };
}
```

- **异步函数** 和 **原生事件** 中的 `setstate`

显著特点 每个 `setState` 函数都会同步执行到渲染完成 在跳到下一个语句 简单来说就是完全同步的

```js
class A extends Component {
  state = { index: 0 };
  componentDidMount() {
    setTimeout(() => {
      console.log("调用setState");
      this.setState({
        index: this.state.index + 1
      });
      console.log("state", this.state.index);
    });
    document.body.addEventListener("click", () => {
      console.log("调用setState");
      this.setState({
        index: this.state.index + 1
      });
      console.log("state", this.state.index);
    });
  }
}
```

- 什么情况下连续 `setState` 会合并处理

  **合成事件** 及 **钩子函数** 里不使用 `(prevState) => {}` 情况的连续 `setState`

- 怎么防止合并处理 避免上述情况即可

## react hooks 中 `useEffect` 跟 `useLayoutEffect` 有什么区别

先看官网的说法

> 其函数签名与 useEffect 相同 但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前 useLayoutEffect 内部的更新计划将被同步刷新。

useLayoutEffect 里面的 callback 函数会在 DOM 更新完成后立即执行, 但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制

假设你本意在 useEffect 中 也就是组件加载完成后, 立马将方块的横坐标位置移到 600px 的位置 useEffect 会在初次渲染完成之后再变换位置 肉眼能观察到位置上的改变 useLayoutEffect 则会在 DOM 构建完成同步执行 阻碍渲染。渲染完成便已经在 600px 的位置

## webpack 打包优化的实践

### tree shaking

去除无用代码 纠正 webpack 默认 tree-shaking 下面的弊端

### dll 动态链接库优化

本质上就是空间换时间的策略 优化打包时间 分版本环境解决方案也不同
2.x、3.x 往往要自己配一一个打包脚本、在配置命中脚本 也有 autoDll 的相关插件
`webpack4.x` 打包性能的强化到基本不需要了

### 按需引入方面

- `babel-plugin-import`
- 试图直接从分目录下引入需要的函数

### 布置合适的 service worker 来缓存一部分不常改变的静态资源

## 拷贝与赋值的区别

```js
var arr = [1, 2, 3];
var arr_copy = arr.slice(0);
```

这样算是拷贝嘛 这显然就是赋值而已

拷贝严格上来说是先申明一个对象 然后在不断开引用的情况下将别个对象移植过来 前后具有完全一致的数据、特性 且两者之间无任何引用关系

## 原生 ajax 怎么停止一个已经发送的请求

```js
function ajax(options) {
  let method = options.method || "GET", // 不传则默认为GET请求
    params = options.params, // GET请求携带的参数
    data = options.data, // POST请求传递的参数
    url =
      options.url +
      (params
        ? "?" +
          Object.keys(params)
            .map(key => key + "=" + params[key])
            .join("&")
        : ""),
    async = options.async === false ? false : true,
    success = options.success,
    timeout = options.timeout || 6000,
    headers = options.headers;
  let xhr;
  // 创建xhr对象
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.timeout = timeout;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("everything-ok:", xhr);
      success && success(xhr.responseText);
    }
  };
  xhr.onabort = function() {
    console.log("请求停止...");
  };
  xhr.ontimeout = function() {
    console.log("请求超时...");
  };
  xhr.open(method, url, async);
  if (headers) {
    Object.keys(Headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
  }
  method === "GET" ? xhr.send() : xhr.send(data);
  return xhr;
}
var url = "https://wx.nnleo.cn/views/users";
var reqIns = ajax({ url, timeout: 100 });
// reqIns.abort();
```

## react 中执行 `this.forceUpdate()` 会经历那几个生命周期

## 怎么理解 `redux` 、 `mobx` 状态管理库的通用性

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="//cdn.bootcss.com/redux/3.5.2/redux.min.js"></script>
  </head>
  <body>
    <script>
      /** Action Creators */
      function inc() {
        return { type: "INCREMENT" };
      }
      function dec() {
        return { type: "DECREMENT" };
      }
      function reducer(state, action) {
        // 首次调用本函数时设置初始 state
        state = state || { counter: 0 };
        switch (action.type) {
          case "INCREMENT":
            return { counter: state.counter + 1 };
          case "DECREMENT":
            return { counter: state.counter - 1 };
          default:
            return state; // 无论如何都返回一个 state
        }
      }

      var store = Redux.createStore(reducer);
      console.log(store.getState()); // { counter: 0 }
      store.dispatch(inc());
      console.log(store.getState()); // { counter: 1 }
      store.dispatch(inc());
      console.log(store.getState()); // { counter: 2 }
      store.dispatch(dec());
      console.log(store.getState()); // { counter: 1 }
    </script>
  </body>
</html>
```

所以当我们初始化好 `store` 之后 我们可以在需要的地方 `import` 进来即可

或者把它挂载到组件全局都能访问到的地方 只要 `this` 指向组件实例 我们就能访问到

```js
import Vue from "vue";
import { Component } from "react";
var store = Redux.createStore(reducer);
Vue.prototype.$store = store;
Component.prototype.store = store;

class component extends Component {
  state = {};

  componentDidMount() {
    console.log(this.store);
    this.store.dispatch({
      type: "INCREMENT"
    });
  }
}
```