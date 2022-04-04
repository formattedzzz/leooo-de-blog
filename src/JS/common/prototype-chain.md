# 原型及原型链

一图胜前言 😝😝

![prototype-chain](https://i.loli.net/2020/03/12/5YpZ8Xxa1MPDyiU.jpg)

这里比较特殊的一个情况是`Function`这个类(也就是构造函数 **function Function(){ }**) 的 `__proto__`属性及`prototype`属性指向同一个对象

```js
Function.__proto__ === Function.prototype // true
```

## `new` 操作符的本质

```js
function newFunc(func, ...args) {
  if (
    typeof func !== 'function' ||
    /=>/.test(Function.prototype.toString.call(func))
  ) {
    // 不能 new 一个非函数或者箭头函数
    throw new Error('param1 should be a function')
  }
  var obj = {}
  obj.__proto__ = func.prototype
  var res = func.apply(obj, ...args)
  if (typeof res === 'object') {
    return res
  }
  return obj
}
```

## instaceof 操作符实现原理

```js
function instaceof(obj, func) {
  if (typeof obj === 'function') {
    console.log('function')
    return func === Function || func === Object
  }
  if (typeof obj !== 'object' || obj === null) return false
  console.log('object')
  let currentProto = obj.__proto__
  while (currentProto) {
    if (currentProto.constructor === func) {
      return true
    } else {
      console.log({ currentProto })
      currentProto = currentProto.__proto__
    }
  }
}
console.log(instaceof([], Object)) // true
```
