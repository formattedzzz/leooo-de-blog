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

### 模块使用

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

- runInThisContext

```js
"use strict";
const vm = require("vm");
let code = `(function(require) {
  const http = require('http');
  http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<pre><code>console.log("Hello World")</pre></code>');
  }).listen(8124);
  console.log('Server running at http://127.0.0.1:8124/');
})`;
vm.runInThisContext(code)(require);
```

- runInContext

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

## 查看内存

node 中可以使用 **`process.memoryUsage`** 接口 **`heapUsed`** 字段来查看

`rss`（resident set size）所有内存占用，包括指令区和堆栈

`heapTotal` 堆占用的内存，包括用到的和没用到的

`heapUsed` 用到的堆的部分

`external` V8 引擎内部的 C++ 对象占用的内存
