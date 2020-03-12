# commonjs require 会死循环吗

不会 因为访问一个还没执行完的模块文件 返回的是一个空对象

```js
// a.js
var b = require("./b");
console.log("b:", b);
module.exports = "a";

// b.js
module.exports = "b";
var a = require("./a");
console.log("a:", a);
```

运行一下 node a.js

```js
// a: {}
// b: b
```

a.js 执行第一行便会同步解析并执行整个 b.js 模块

当 b.js 执行到 require('./a') 时导入的并不是字符串 a 而是空对象{}

因为此时 a 模块还未完成导出操作
