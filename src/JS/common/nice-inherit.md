# 中间实例继承

```js
function extend(Parent) {
  if (typeof Parent !== "function" && /=>/.test(Parent.toString() !== true)) {
    // 不能传入非函数 或者 箭头函数
    throw Error("param Parent should be a constructor Function or class");
  }
  var Temp = function() {};
  // 设置中间函数 用来继承父类构造函数原型下面的而方法
  // 为什么要借助中间函数过渡 如果直接把 new Parent() 赋给 Child.prototype
  // 那所有 Child 实例下会共享一些属性
  Temp.prototype = Parent.prototype;
  var Child = function() {
    Parent.call(this);
    // 继承所有父类实例下的属性及方法
  };
  Child.prototype = new Temp();
  // 把中间实例赋给 Child.prototype 这样 Child 实例就能访问到所有 Parent.prototype 下面的属性及方法
  Child.prototype.constructor = Child;
  // 上面 Child.prototype.constractor 指向 Temp 需要纠正回来
  return Child;
}

var Child = extend(Parent);
```

这样就算是非常完善了 所以大体上可以分为两种继承模式 拷贝继承和中间实例继承（也叫类式继承）

扩展一下：`bind` 函数的 `ployfill`

我们需要什么：

- 输入一个函数 返回一个新函数
- 当新函数普通调用时 `this` 指向 bind 的新对象 并返回值
- 当新函数当成构造函数调用时 `this` 指向实例、且新函数的原型要能访问到原函数的所有方法 相当于没有 `bind` 只是相当于构造函数被柯里化了

```js
Function.prototype.bind2 = function() {
  var self = this;
  var context = arguments[0];
  if (typeof context !== "function" && /=>/.test(context.toString() !== true)) {
    // 不能传入非函数 或者 箭头函数
    throw Error("param Parent should be a constructor Function or class");
  }
  var args = Array.prototype.slice.call(arguments, 1); // 取出 bind 时候就传递的参数
  var Temp = function() {};
  var newbound = function() {
    // 当作为构造函数时 this 指向实例 此时结果为 true 将绑定函数的 this 指向该实例 可以让实例获得来自绑定函数的值
    // 当作为普通函数时 this 指向 window 此时结果为 false 将绑定函数的 this 指向 context
    return self.apply(
      this instanceof newbound ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  Temp.prototype = this.prototype;
  newbound.prototype = new Temp();
  newbound.prototype.constructor = newbound;
  return newbound;
};
```

这样应该没得问题了 测试一下：

```js
var code = "window code";
function A(name, age) {
  this.name = name;
  this.age = age;
  console.log(this.code);
  console.log("arguments:", arguments);
}
A.prototype.loginfo = function() {
  console.log(this.name + this.age);
};
var B = A.bind2({ code: "obj code" }, "leooo"); // 先把name传进去
B(); // 普通调用
new B(23).loginfo(); // 构造函数调用

// obj code
// arguments: Arguments ["leooo", callee: ƒ, Symbol(Symbol.iterator): ƒ]
// undefined
// arguments: Arguments(2) ["leooo", 23, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// leooo23
```
