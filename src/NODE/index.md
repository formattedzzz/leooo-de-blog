# node 内置模块实践

## event 模块

### 挂载一个触发器到整个应用（进程）

```js
// app.js
const event = require("events");
global.Emitter = new event.EventEmitter();
console.log(require("./lib.js"));
Emitter.on("success", data => {
  console.log(data);
});

// lib.js
Emitter.emit("success", { name: "xiaolin" });

// node app.js
// { name: "xiaolin" }
```

### 主要方法

```js
function CustomEmitter() {
  let emitter = new event.EventEmitter();
  process.nextTick(() => {
    emitter.emit("success", { name: "xiaolin" });
  });
  return emitter;
}
var customEmitter = new CustomEmitter();
customEmitter.on("success", data => {
  console.log(data);
});

// once、off、on、emit 方法
customEmitter.once("success", data => {
  console.log(data);
});
```

### 可以先触发再监听吗

并不能...

```js
const event = require("events");
const Emitter = new event.EventEmitter();
process.nextTick(() => {
  Emitter.on("success", data => {
    console.log(data);
  });
});
Emitter.emit("success", { name: "xiaolin" });
// exit
```

### 最大监听数及事件名称

```js
const event = require("events");
// 实例方法 设置、获取最大监听数
let emitter = new event.EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);

// 获取所有监听事件名称构成的数组
let emitter = new event.EventEmitter();
emitter.eventNames();
// ['success', 'fail']
```

## 使用流加 gzip 来返回资源

```js
const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "content-encoding": "gzip"
    });
    fs.createReadStream(`${__dirname}/index.html`)
      .pipe(zlib.createGzip())
      .pipe(res);
  })
  .listen(8000);
```

## crypto 加密解密模块

```js
const crypto = require("crypto");
function encode(data, key = "key") {
  const cipher = crypto.createCipher("aes192", key);
  let crypted = cipher.update(data, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}
function decode(encrypted, key = "key") {
  const decipher = crypto.createDecipher("aes192", key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
let encodeData = encode(Buffer.from("{name: 'xiaolin', age: 22}"), "leo");
console.log(encodeData);
// ab156c3dd42f39985110d8c648f8052db043f0afdb1c7a2d92815064bed5efb5
console.log(decode(encodeData, "leo"));
// "{name: 'xiaolin', age: 22}"
```

## node 全局变量污染的问题

```js
// a.js
t = 1;
module.exports = function() {
  console.log(123);
};

// b.js
console.log(t);
```

**`b.js`** 中 t 能否直接打印出来？答案是可以的 因为 **`global`** 对象是可以访问的

因此 **`t = 1`** 等价于 **`global.t = 11`** 但是如果声明了 **`var t`** 上下文就不会被污染

## child_process 模块

## vm 模块

虚拟机 **`vm`** 模块可以开辟出一个独立作用域 **`code`** 代码块里的变量无法访问、影响本地作用域

- `runInThisContext`

```js
"use strict";
const vm = require("vm");
let code = `(function(require) {
  const http = require('http');
  http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<pre><code>console.log("Hello World")</pre></code>');
  }).listen(8124);
  console.log('Server running at http://127.0.0.1:7003/');
})`;
vm.runInThisContext(code)(require);
```

- `runInContext`

```js
const vm = require("vm");
const x = 1;
const sandbox = { x: 2 };
vm.createContext(sandbox);
// Contextify the sandbox.
const code = `x += 40; var y = 17;`;
// x and y are global variables in the sandboxed environment.
// Initially, x has the value 2 because that is the value of sandbox.x.
vm.runInContext(code, sandbox);
console.log(sandbox.x); // 42
console.log(sandbox.y); // 17
console.log(x, y); // 1; y is not defined.
```

## Eventloop 示例

```txt
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function() {
    console.log("promise1");
  });
}, 0);

setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function() {
    console.log("promise2");
  });
}, 0);
// timer1
// timer2
// promise1
// promise2
```

咋和浏览器不一样呢 根据 Node.js [官方介绍](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout) 每次事件循环都包含了 6 个阶段:

- `timers` 阶段: 这个阶段执行 `timer`（setTimeout、setInterval）的回调
- `I/O callbacks` 阶段: 执行一些系统调用错误 比如网络通信的错误回调
- `idle` `prepare` 阶段: 仅 node 内部使用
- `poll` 阶段: 获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- `check` 阶段: 执行 setImmediate() 的回调
- `close` callbacks 阶段: 执行 socket 的 close 事件回调

我们重点看 `timers`、`poll`、`check` 这 3 个阶段就好 因为日常开发中的绝大部分异步任务都是在这 3 个阶段处理的。

### `timers` 阶段

是事件循环的第一个阶段 Node 会去检查有无已过期的 timer 如果有则把它的回调压入 timer 的任务队列中等待执行 事实上 Node 并不能保证 timer 在预设时间到了就会立即执行 因为 Node 对 timer 的过期检查不一定靠谱 它会受机器上其它运行程序影响 或者那个时间点主线程不空闲

```js
setTimeout(() => {
  console.log("timeout");
}, 0);
setImmediate(() => {
  console.log("immediate");
});
// 执行顺序是不确定
```

但是把它们放到一个 `I/O` 回调里面 就一定是 `setImmediate()` 先执行 因为 poll 阶段后面就是 check 阶段

### `poll` 阶段

主要有 2 个功能：

- 处理 poll 队列的事件
- 当有已超时的 timer 执行它的回调函数

even loop 将同步执行 poll 队列里的回调 直到队列为空或执行的回调达到系统上限（上限具体多少未详） 接下来 even loop 会去检查有无预设的 `setImmediate()` 分两种情况:

1、若有预设的 `setImmediate()`, event loop 将结束 poll 阶段进入 check 阶段 并执行 check 阶段的任务队列

2、若没有预设的 `setImmediate()` event loop 将阻塞在该阶段等待

注意一个细节 没有 `setImmediate()` 会导致 event loop 阻塞在 poll 阶段 这样之前设置的 timer 岂不是执行不了了？所以咧 在 poll 阶段 event loop 会有一个检查机制 检查 timer 队列是否为空 如果 timer 队列非空 event loop 就开始下一轮事件循环 即重新进入到 timer 阶段。

### check 阶段

`setImmediate()` 的回调会被加入 check 队列中 从 event loop 的阶段图可以知道 check 阶段的执行顺序在 poll 阶段之后。

### 循环案例

```js
const fs = require("fs");

fs.readFile("test.txt", () => {
  console.log("readFile");
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});
// readFile
// immediate
// timeout
```

**`process.nextTick()`** VS **`setImmediate()`**

`process.nextTick()` 会在各个事件阶段之间执行 一旦执行 要直到 nextTick 队列被清空

Node.js 中 `microtask` 在事件循环的各个阶段之间执行(清空)

```js
const fs = require("fs");
const starttime = Date.now();
let endtime;
fs.readFile("app.js", () => {
  endtime = Date.now();
  console.log("finish reading time: ", endtime - starttime);
});
let index = 0;
function handler() {
  if (index++ >= 5) return;
  console.log(`nextTick ${index}`);
  process.nextTick(handler);
  // console.log(`setImmediate ${index}`)
  // setImmediate(handler)
}
handler();
// nextTick 1
// nextTick 2
// nextTick 3
// nextTick 4
// nextTick 5
// finish reading time:  14
```

## 查看内存

node 中可以使用 **`process.memoryUsage`** 接口 **`heapUsed`** 字段来查看

`rss`（resident set size）所有内存占用 包括指令区和堆栈

`heapTotal` 堆占用的内存 包括用到的和没用到的

`heapUsed` 用到的堆的部分

`external` V8 引擎内部的 C++ 对象占用的内存
