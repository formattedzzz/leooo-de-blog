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
  });

function* fn1() {
  var data = yield 1;
  console.log(data);
  var ioRes = yield 2;
  console.log(ioRes, data);
}
var handle2 = fn1();
console.log(handle2);
let data = handle2.next();
console.log("data", data);

let data2 = handle2.next();
console.log("data2", data2);

let data3 = handle2.next();
console.log("data3", data3);
```
