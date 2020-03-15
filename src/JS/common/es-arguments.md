# 认识 `arguments` 对象

## `arguments` 对象本质是啥

在 `js` 这门灵活的语言里 `arguments` 对象像是个异类的存在 长得像数组却是个对象

先把 `arguments` 几个常用的属性打出来瞧瞧:

```js
function A() {
  console.log("arguments", arguments, typeof arguments);
  console.log("arguments.callee", arguments.callee);
  console.log("A.caller", A.caller);
}
A("abc", 1, 2, 3, []);

console.log("-----------");

function B() {
  A("abc", 1, 2, 3, []);
}
B();

// arguments Arguments(5) ["abc", 1, 2, 3, Array(0), callee: ƒ, Symbol(Symbol.iterator): ƒ]
// arguments.callee ƒ A() {
//   console.log("arguments", arguments, typeof arguments);
//   console.log("arguments.callee", arguments.callee);
//   console.log("A.caller", arguments.callee.caller);
// }
// A.caller null

// -----------
// arguments Arguments(5) ["abc", 1, 2, 3, Array(0), callee: ƒ, Symbol(Symbol.iterator): ƒ]
// arguments.callee ƒ A() {
//   console.log("arguments", arguments, typeof arguments);
//   console.log("arguments.callee", arguments.callee);
//   console.log("A.caller", arguments.callee.caller);
// }
// A.caller ƒ B() {
//   A("abc", 1, 2, 3, []);
// }
```

`arguments` 是个对象 `__proto__` 指向 `Object.prototype` 只能在函数体内执行的时候访问

```js
function A() {
  console.log(arguments.__proto__ === Object.prototype); // true
  console.log(Object.prototype.toString.call(arguments)); // "[object Arguments]"
  console.log(arguments.toString()); // "[object Arguments]"
  console.log(Arguments); // Arguments is not defined
}
```

看来 `arguments` 对象本质跟 `Array`、`RegExp` 一样是 `Arguments` 类构造出来 但我们却访问不到这个类

## 基本应用

- 更好的解决传参个数不定的问题

- 对匿名函数进行递归调用

- 值得注意的是 es6 箭头函数没有 arguments 对象 我们可以通过扩展运算符来代替

  ```js
  const A = (...args) => {
    console.log(args);
  };
  ```
