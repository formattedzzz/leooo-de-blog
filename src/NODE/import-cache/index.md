# require 模块缓存

每个模块首次被引用、导入（计算所有包的相互依赖关系）之后会得到一个对外可用的变量 存在该应用进程中
后面的每次导入便直接访问这个变量

```js
// lib.js
var now = +new Date();
while (+new Date() - now < 1000) {}
console.log("lib");
module.exports = function() {
  console.log(123);
};

// a.js
console.time("1");
let func = require("./lib.js");
console.timeEnd("1");
func();
module.exports = "aaa";

// b.js
console.time("1");
let func = require("./lib.js");
console.timeEnd("1");
func();
module.exports = "bbb";

// index.js
console.log(require("./a.js"));
console.log(require("./b.js"));
```

四个文件的依赖关系如上 运行

```js
node index.js

// lib
// 1: 1006.003ms
// 123
// aaa
// 1: 0.018ms
// 123
```

一个应用起来之后进程中的所有模块导出的变量 与其他模块的依赖关系都已经确定了

一般我们都是重新部署应用 进程切断 重新启动的过程是不能对外服务的 即使时间很短

那么怎样可以做到`node`应用的不断网热更新呢

## node 应用热部署
