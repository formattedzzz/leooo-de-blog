# 认识 `umd` 模块的结构

```js
(function(name, root, factory) {
  if (typeof exports === "object" && typeof module.exports !== undefined) {
    console.log("当前为commonjs环境");
    module.exports = factory();
  } else {
    if (typeof define === "function" && define.amd) {
      console.log("当前为amd环境");
      define(factory);
    } else {
      console.log("当前为无模块化的浏览器环境");
      root[name] = factory();
    }
  }
})("Leo", this, function() {
  return {
    add: function(x = 0, y = 0) {
      return x + y;
    }
  };
});
```

其结构为一个自执行函数 自动判断当前引入的环境 将整个库导出的类注入进去

`webapck` 将 `vue` 组件库打包成 `umd` 输出配置

```json
{
  "output": {
    "path": resolve("dist"),
    "filename": "[name].umd.js",
    "library": "leoui",
    "libraryTarget": "umd",
    "globalObject": "this",
    "umdNamedDefine": true
  }
}
```
