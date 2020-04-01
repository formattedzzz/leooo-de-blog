# 简易函数处理

## 间隔防抖

比如你点击抢票 点一次抢票之后的一段时间（假设是 5 秒钟）内你都不能再点 如果点了 你又得再等 5 秒钟

```js
// 首次触发便执行依次 之后每次触发距上次操作大于delay才会执行 近似理解为delay时间段之内只能触发一次
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
```

## 尾防抖

不断有人上车 只有最后一个人上车之后再过 delay 才会执行

```js
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
```

## 间隔节流

你一直快速的点鼠标 但你需要的函数还是只能每一段时间才能执行一次

```js
// 首次触发便执行依次 之后每次触发距上次执行大于delay才会执行 注意这里时距离上次执行
var throttle = function(func, delay) {
  var prev = Date.now();
  return function() {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
};
function handle() {
  console.log(Math.random());
}
window.addEventListener("scroll", () => throttle(handle, 1000));
```

```js
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

```js
// 定时器加时间戳
var throttle = function(func, inter) {
  var timer = null;
  var startTime = Date.now();
  return function() {
    var curTime = Date.now();
    var remaining = inter - (curTime - startTime);
    var context = this;
    var args = [...arguments];
    timer && clearTimeout(timer);
    if (remaining <= 0) {
      console.log("inter");
      // clearTimeout(timer);
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};
// 时间戳是为了开头执行+定期执行 定时器是为了收尾的时候执行
function handle() {
  console.log(123);
}
window.addEventListener("scroll", throttle(handle, 1000));
```

## 柯里化

```js
const currying = (fn, ...args) => {
  if (args.length >= fn.length) {
    // 如果参数够了 就直接执行 并返回执行值
    return fn(...args);
  } else {
    // 如果不够就返回一个函数 并把返回函数的参数塞进去柯里化 直到参数数量足够
    return (...args2) => currying(fn, ...args, ...args2);
  }
};

const puerAdd = (x, y, z) => x + y + z;
const add = currying(puerAdd);
console.log(add(1, 2, 3));
console.log(add(1)(2, 3));
console.log(add(1, 2)(3));
console.log(add(1)(2)(3));
```

上面如果要实现加任意个数呢？这...

可以使用障眼法 修改 `add()` 的 toString 方法 使得它既是一个函数 又能访问出数值

```js
add(1); // 1
add(1)(2, 3); // 6
```
