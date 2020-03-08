# 中间实例继承

```js
function Fa() {}
var Temp = function() {}; // 设置中间函数 用来继承父类构造函数原型下面的而方法
Temp.prototype = Fa.prototype;
var Son = function() {
  Fa.call(this); // 通过构造函数调用来继承父类实例下的属性和方法
};
Son.prototype = new Temp(); // 因为这是一个空函数，并没有父类实例下的属性跟方法
Son.prototype.constructor = Son; // 把原型构造函数重新指向Son
```

这样就算是非常完善了 所以大体上可以分为两种继承模式 拷贝继承和中间实例继承（也叫类式继承）
