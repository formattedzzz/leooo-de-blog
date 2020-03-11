# 原型及原型链

一图胜前言 😝😝

![prototype-chain](https://i.loli.net/2020/03/12/5YpZ8Xxa1MPDyiU.jpg)

这里比较特殊的一个情况是`Function`这个类(也就是构造函数 **function Function(){ }**) 的 `__proto__`属性及`prototype`属性指向同一个对象

```js
Function.__proto__ === Function.prototype; // true
```
