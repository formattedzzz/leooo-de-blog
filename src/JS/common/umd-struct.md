# 认识 `umd` 模块的结构

```js
;(function (name, root, factory) {
  if (typeof exports === 'object' && typeof module.exports !== undefined) {
    console.log('当前为commonjs环境 在webpack中的es__module也会走这边')
    module.exports = factory()
  } else {
    if (typeof define === 'function' && define.amd) {
      console.log('当前为amd环境')
      define(factory)
    } else {
      console.log('当前为无模块化的浏览器环境')
      root[name] = factory()
    }
  }
})('Leo', this, function () {
  return {
    add: function (x = 0, y = 0) {
      return x + y
    }
  }
})
```

其结构为一个自执行函数 自动判断当前引入的环境 将整个库导出的类注入进去

`webapck` 将 `vue` 组件库打包成 `umd` 输出配置

```json
{
  "output": {
    "path": "./dist",
    "filename": "[name].umd.js",
    "library": "leoui",
    "libraryTarget": "umd",
    "globalObject": "this",
    "umdNamedDefine": true
  }
}
```

## webpack 打包模块化原理

以类库为场景打包的 umd 模块为例: 先看打包后的代码

```js
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else if (typeof exports === 'object') exports['app'] = factory()
  else root['app'] = factory()
})(typeof self !== 'undefined' ? self : this, function () {
  return (function (modules) {
    var installedModules = {}
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports
      }
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      })
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      )
      module.l = true
      return module.exports
    }
    __webpack_require__.m = modules
    __webpack_require__.c = installedModules
    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          configurable: false,
          enumerable: true,
          get: getter
        })
      }
    }
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module['default']
            }
          : function getModuleExports() {
              return module
            }
      __webpack_require__.d(getter, 'a', getter)
      return getter
    }
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    }
    // __webpack_public_path__
    __webpack_require__.p = ''
    return __webpack_require__((__webpack_require__.s = 0))
  })([
    function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1)
    },
    function (module, exports, __webpack_require__) {
      'use strict'
      var c = __webpack_require__(2)
      console.log(c)
      module.exports = {
        a: '我是a'
      }
    },
    function (module, exports) {
      var c1 = 'c1'
      var c2 = 'c2'
      module.exports = {
        c1: c1,
        c2: c2
      }
    }
  ])
})
```

### 结构初步拆解

- 首先通过自执行函数的方式将一个结构挂载到全局变量下(如上), 这个结构也是一个自执行函数, 拆开来就是

```js
function factory(modules) {
  // ...
}
const modules = [
  /* 0 */
  function (module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1)
  },
  /* 1 */
  function (module, exports, __webpack_require__) {
    'use strict'
    var c = __webpack_require__(2)
    console.log(c)
    module.exports = {
      a: 'this is a'
    }
  },
  /* 2 */
  function (module, exports) {
    var c1 = 'c1'
    var c2 = 'c2'
    module.exports = { c1, c2 }
  }
]

window['libname'] = factory(modules)
```

### 工厂函数的实现

上面 modules 是 webpack 对每个模块生成的函数数组 每个函数都有三个形参 **module**, **exports**, **\_\_webpack_require\_\_** 函数

这些都会在工厂函数中找到定义 那就接下来就看工厂函数的实现

```js
function factory(modules) {
  // webpack-bootstrap
  // 声明模块缓存
  var installedModules = {}

  // 这就是模块加载函数 会传入到每个模块(如果该模块require了其他的模块的话)
  function __webpack_require__(moduleId) {
    // 如果该模块安装过了则直接返回其导出
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // 初始化该模块并放入缓存中
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    })
    // 模块函数源代码执行 this->module.exports 对应形参为 module、exports、__webpack_require__
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )
    // 变为已加载
    module.l = true
    // 返回该模块导出
    return module.exports
  }
  // 可以更快地拿到所有其他分模块?
  __webpack_require__.m = modules
  // 可以更快地拿到缓存过的模块?
  __webpack_require__.c = installedModules

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        configurable: false,
        enumerable: true,
        get: getter
      })
    }
  }

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default']
          }
        : function getModuleExports() {
            return module
          }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }
  __webpack_require__.p = ''
  // __webpack_require__.start = 0 从入口模块(modules第一个元素)开始加载
  __webpack_require__.s = 0
  // 这里是一个类似于尾递归调用的结构
  return __webpack_require__(__webpack_require__.s)
}
```
