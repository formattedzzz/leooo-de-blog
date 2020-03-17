# 捋一捋 babel

- @babel/parser
- @babel/core
- @babel/cli
- babel-loader
- @babel/polyfill
- @babel/runtime
- @babel/plugin-transform-runtime

## 基本 `babel` 包一览

| 包名                              | 功能                                  | 说明                                                                             |
| --------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------- |
| `@babel/core`                     | babel 编译核心包 语法分析、转化、生成 | 必装开发依赖                                                                     |
| `@babel/cli`                      | 命令行执行 babel 命令工具             | 非必装开发依赖 packages.json 的 script 中使用了 babel 命令则需安装               |
| `babel-loader`                    | webpack 中使用 babel 加载文件         | 非必装开发依赖 webpack 项目中使用                                                |
| `@babel/plugin-*`                 | babel 编译功能实现插件 描述转化规则   | 开发依赖 按照需要的功能安装                                                      |
| `@babel/preset-*`                 | 功能实现插件预设（插件集合）          | 开发依赖 按照需要的功能安装 js 语言新特性转换推荐使用 preset-env                 |
| `@babel/plugin-transform-runtime` | 有些新特性不用转化 直接引入工具函数   | 非必装开发依赖 在文件编译时转换为引入的语法                                      |
| `@babel/runtime`                  | 工具函数库                            | 非必装生产依赖 和@babel/plugin-transform-runtime 同时存在                        |
| `@babel/polyfill`                 | 低版本浏览器兼容库                    | 非必装生产依赖 通过 preset-env 引入 polyfill 需安装此包 并通过 corejs 指定版本   |
| `core-js@_`                       | 低版本浏览器兼容库                    | 非必装生产依赖 通过 preset-env 引入 polyfill 需安装此包 并通过 corejs 指定版本   |
| `@babel/runtime-corejs_`          | 不污染变量的低版本浏览器兼容库        | 非必装生产依赖 plugin-transform-runtime 设置开启后 可以不污染变量的引入 polyfill |
|                                   |                                       |

## 三种方式配置 `babel`

- 在 package.json 中设置 babel 字段。
- .babelrc 文件或.babelrc.js
- babel.config.js 文件

## 关于 `@babel/polyfill`

推荐使用 preset-env 来按需引入 polyfill

```js
// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill
        corejs: 2 // 2-corejs@2  3-corejs@3
      }
    ]
  ]
};
```

## 如何开发一个 `babel-plugin-`

### 转码过程

首先来了解 `Babel` 转码的过程分三个阶段：分析(parse)、转换(transform)、生成(generate)。 其中分析、生成阶段由 `Babel` 核心完成 而转换阶段则由 `Babel` 插件完成 这也是我们开发插件的核心

- 分析(`@babel/core` 核心处理，无需考虑)

  ```js
  parse(sourceCode) => AST
  ```

- 转换(自己写)

  ```js
  transform(AST, BabelPlugins) => newAST
  ```

- 生成(`@babel/core` 核心处理，无需考虑)

  ```js
  generate(newAST) => newSourceCode
  ```

### 插件基础格式

```js
// 其中types和template为@babel/core中的相对应的解析包（@babel/template|@babel/types）也可以单独引入进行使用
export default function({ types: babelTypes, template: babelTemplate }) {
  return {
    visitor: {
      Identifier(path, state) {},
      ASTNodeTypeHere(path, state) {}
    }
  };
}
```
