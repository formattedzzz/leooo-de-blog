# 简易函数处理

```js
// 首次触发便执行依次 之后每次触发距上次触发大于delay才会执行 近似理解为delay时间段之内只能触发一次
function debounceStart(fn, delay, ctx) {
  var timer = null;
  var canRun = true;
  return function() {
    var args = arguments;
    if (canRun) {
      fn.apply(ctx, args);
      canRun = false;
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      canRun = true;
    }, delay);
  };
}

// 不断有人上车 只有最后一个人上车之后再过delay才会执行
function debounceEnd(fn, delay, ctx) {
  var timer = null;
  return function() {
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(ctx, args);
    }, delay);
  };
}

// 首次触发便执行依次 之后每次触发距上次执行大于delay才会执行 注意这里时距离上次执行
function throttle(fn, inter, ctx) {
  var canRun = true;
  return function() {
    let args = arguments;
    if (canRun) {
      fn.apply(ctx, args);
      canRun = false;
      setTimeout(() => {
        canRun = true;
      }, inter);
    }
  };
}

var handle = debounceStart(function() {
  console.log(1);
}, 1000);
var handle1 = debounceEnd(function() {
  console.log(1);
}, 1000);
var handle2 = throttle(function() {
  console.log(1);
}, 1000);

window.onscroll = handle2;
```
