# 迭代器 数据结构的 `Symbol.iterator` 属性

> for...of 是 ES6 引入用来遍历所有数据结构的统一方法

这里的所有数据结构只指具有 `iterator` 接口的数据。一个数据只要部署了 `Symbol.iterator` 就具有了 `iterator` 接口 就可以使用 `for...of` 循环遍历它的成员。也就是说 `for...of` 循环内部调用的数据结构为 `Symbol.iterator` 方法。

可以调用 `for...of` 循环遍历的数据包括：

- `Array`
- `Set`
- `Map`
- 伪数组 `arguments` 对象、DOM `NodeList` 对象
- `Generator`
- `String`

```js
function isIterator(obj) {
  return typeof obj[Symbol.iterator] === "function";
}
console.log(isIterator([1, 2, 3])); // true
console.log(isIterator("string")); // true
console.log(isIterator(new Map())); // true
console.log(isIterator(new Set())); // true
console.log(isIterator(new WeakMap())); // false
console.log(isIterator(new WeakSet())); // false
```

也就是说上面提到的这些数据类型原生就具备了 `iterator` 接口 也可以直接用扩展运算符转化 `Array`

除了 `for...of` 以下操作都会默认调用数据的 `iterator` 操作

- 解构赋值

  对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法

- 扩展运算符
  扩展运算符内部就调用 `Iterator` 接口

- yield\*

  yield\* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

- 接受数组、对象作为参数的场合

  `entries()` `values()` `keys()`

  `Array.from()`

  `Map()` `Set()` `WeakMap()` `WeakSet()`（比如 `new Map(["a", 1], ["b", 2]])`)

  `Promise.all()`

  `Promise.race()`

来实现一个自定义的 具有 `Symbol.iterator` 接口的迭代器 这里 `Symbol.iterator` 属性部署在对象上或者原型链上面均可

## 通过对象直接构造

```js
function isIterator(obj) {
  return typeof obj[Symbol.iterator] === "function";
}
let collection = {
  items: [1, 2, 3],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
};

console.log(isIterator(collection)); // true
for (let item of collection) {
  console.log(item); // 1 2 3
}
```

## 通过原型链添加

```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    let value = this.value;
    if (value < this.stop) {
      this.value++;
      return {
        done: false,
        value: value
      };
    }
    return {
      done: true,
      value: undefined
    };
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (let value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}
console.log([...range(0, 5)]); // [0, 1, 2, 3, 4, 5]
```
