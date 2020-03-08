# Class

- class 内部方法不能枚举 即**Object.keys()** 不能遍历 **Object.getOwnpropertyNames()**可以

- class 内部默认采用严格模式

- 只能当成构造函数 只能通过 **new** 来调用 不能自执行

- constructor 默认返回实例对象 即返回**this** 完全可以修改 一修改就嗝屁了

- 可以通过实例\***\* proto \*\***给类添加方法 与 es5 一致

- class 不存在变量提升 必须先声明后用

- 将实例的方法单独提出来用的 this 需要注意：在构造函数中绑定好 this 或者在构造函数中申明为箭头函数
  静态方法中的 this 指向类本身 而不是实例 实例不能继承静态方法

- 子类可以通过 super 关键字来调用父类静态方法

- **class**类的静态属性只能在外部手动添加 而实例属性是 **key=val** 的形式写在类里面 或在**constructor**里面手动添加

- **new.target** 属性

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error("该函数Person必须使用 new 关键字来调用！");
  }
}
```

- Object.getPrototypeOf(ColorPoint) === Point 判断**ColorPoint**是否继承**PointB**

- constrictor 里面 super( ) 相当于 A.prototype.constructor.call(this)。作为函数时 super( ) 只能用在子类的构造函数之中。作为对象时 super 在普通方法之中 指向 A.prototype

- B 中的 super 作为对象时不能访问到 A 中的**实例属性和方法**。当然可以访问挂在**A.prototype**中的属性
  子类普通方法中通过 super 调用父类的普通方法时 方法内部的 this 指向当前的子类实例 super 在静态方法之中指向父类本身 在普通方法之中指向父类的原型对象

- 挂在**父类实例**下的属性 **子类实例**访问不到 不过要看你的父类和 super( ) 是怎么写的 一般都是会实现的
  挂在**父类本身**下的属性 通过实例只能通过类的静态属性访问 如 Date.now()
  挂在**A.prototype**下面的属性 子类实例都能访问到 与挂在子类实例下的属性不冲突

```js
// 挂在实例上
class Leo {
    name= 'ping',
    age= 18
}
// 挂在原型上
Leo.prototype.name = 'ok'
```

- **super** 的三种情况

  - 在构造函数中
  - 在普通方法中
  - 在子类方法中 在普通方法中 在子类静态方法中【两种情况 super 指向不同 B.prototype 和 B 本身】

- ES6 中 class 静态方法 static 只能在静态方法中调用 而且类中不能调用

```js
class WaterFull {
  static fun1() {
    console.log(+Date.now());
  }
  fun2() {
    this.fun1(); // 肯定不行 this 都不指向WaterFull本身
    WaterFull.fun1; // 也不行
  }
  static fun3() {
    this.fun1(); // this => 类本身
  }
}
WaterFull.fun3(); // ok
```
