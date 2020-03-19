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
