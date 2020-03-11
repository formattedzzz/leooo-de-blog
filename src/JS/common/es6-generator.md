# generator 处理连续的异步流程

```js
function* fn() {
  var data = yield getData();
  console.log("---", data);
  var ioRes = yield write(data);
  console.log("---", ioRes);
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "leooo"
      });
    });
  });
}

function write(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success:" + data);
    });
  });
}

var handle = fn();

handle
  .next()
  .value.then(data => {
    console.log(111, data);
    return JSON.stringify(data);
  })
  .then(data => {
    console.log(222, data);
    return handle.next(data + "leo").value;
  })
  .then(data => {
    console.log(333, data);
    return handle.next(data + "bob").value;
  });

console.log("---end---");

// ---end---
// 111 { name: 'leooo' }
// 222 {"name":"leooo"}
// --- {"name":"leooo"}leo
// 333 success:{"name":"leooo"}leo
// --- success:{"name":"leooo"}leobob
```

## 捋一下 generator 函数的调用机制

- 执行 fn 得到一个 Generator 迭代器（这里的迭代器用 es5 也能得到）
- handle.next() 得到第一个 yield 关键字后面表达式的返回值

  ```js
  handle.next() = {
    value: Promise,
    done: false
  };
  ```

- handle.next().value Promise 回调处理

  ```js
  handle.next().value.then(nextdata => {
    return JSON.stringify(nextdata);
  });
  ```

  这里的 return 值现在并没有赋值给第一个 yield 语句前面的变量 因为 handle 迭代器还没有执行 next 函数
  第二个 then 函数只是对第一个 then 回调返回值的链式调用 第二个 then 函数的返回值时调用了下一次 next 函数

- 传给下一个 yield

  ```js
  then(data => {
    console.log(222, data);
    return handle.next(data + "leo").value;
  });
  ```

  这个 Promise 返回时 handle 调用下一个 next next 函数的参数 便会赋值给第一个 yield 语句前面的变量
  以此类推...

## yield 常量会怎样

```js
function* fn1() {
  var data = yield 1;
  console.log(data);
  var ioRes = yield 2;
  console.log(ioRes, data);
}
var handle2 = fn1();
console.log(handle2);
let data1 = handle2.next();
console.log("data1", data1);

let data2 = handle2.next(data1.value + "leo");
console.log("data2", data2);

let data3 = handle2.next(data2.value + "bob");
console.log("data3", data3);

// Object [Generator] {}
// data1 { value: 1, done: false }
// --- 1leo
// data2 { value: 2, done: false }
// --- 2bob 1leo
// data3 { value: undefined, done: true }
```

## 判断迭代器是否 done 完

```js
function* genfunc(para) {
  const yield1 = yield asyncHandle1();
  console.log("yield1", yield1);

  const yield2 = yield asyncHandle2(yield1);
  console.log("yield2", yield2);
}
function asyncHandle1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: "leo", age: 24 });
    });
  });
}
function asyncHandle2(str) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ msg: "success", txt: JSON.stringify(str) });
    });
  });
}
const genIterator = genfunc();
genIterator
  .next()
  .value.then(asyncRes1 => {
    const temp = Object.assign({}, asyncRes1, { info: "" });
    return genIterator.next(temp).value;
  })
  .then(asyncRes2 => {
    console.log(asyncRes2);
    return genIterator.next(asyncRes2);
  })
  .then(asyncRes3 => {
    console.log(asyncRes3);
  });

// yield1 { name: 'leo', age: 24, info: '' }
// { msg: 'success', txt: '{"name":"leo","age":24,"info":""}' }
// yield2 { msg: 'success', txt: '{"name":"leo","age":24,"info":""}' }
// { value: undefined, done: true }
```

其中的关键就是 yield 的时候返回一个 Promise 对象，给这个 Promise 对象添加 then 方法，当异步操作成功时执行 then 中的 onFullfilled 函数 onFullfilled 函数中又去执行 g.next 从而让 Generator 继续执行，然后再返回一个 Promise，再在成功时执行 g.next，然后再返回...

## 使用递归让 generator 自动执行完

```js
function run(gen) {
  var g = gen();
  function next(data) {
    var result = g.next(data);
    if (result.done) return;
    result.value.then(function(data) {
      next(data);
    });
  }
  next();
}
run(gen);
```

这只是一个非常简易的写法 只针对 yield 后面返回 Promise 对象的情况

## 待扩展 co 模块

```js
const co = require("co");
function* gen() {
  ...
}
co(gen);
```
