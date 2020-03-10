# 各种姿势实现 sleep 函数

```js
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};
sleep(1000).then(() => {
  console.log(1);
});

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  });
}
sleepGenerator(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback, time) {
  if (typeof callback === "function") setTimeout(callback, time);
}

function output() {
  console.log(1);
}
sleep(output, 1000);
```

大多数人都会从异步编程的角度去实现 通过顶层 setTimeout 返回 Promise 对象
除了这些 笔者第一时间想到的却不是这些 而是不用定时器 已同步的方式实现

```js
function sleep(time) {
  var now = +Date.now();
  while (+Date.now() - now <= time) {}
  return;
}
console.time(1);
sleep(2000);
console.log(123);
console.timeEnd(1);

console.time(1);
sleep(3000);
console.log(456);
console.timeEnd(1);
// 123
// 2000.244140625ms
// 456
// 3001.861328125ms
```

虽然很投巧 但在生产环境中 毫无使用价值 😄
