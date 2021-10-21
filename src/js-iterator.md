# es5 构造迭代器

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
  return typeof obj[Symbol.iterator] === 'function'
}
console.log(isIterator([1, 2, 3])) // true
console.log(isIterator('string')) // true
console.log(isIterator(new Map())) // true
console.log(isIterator(new Set())) // true
console.log(isIterator(new WeakMap())) // false
console.log(isIterator(new WeakSet())) // false
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

然后这个方法执行完返回一个能访问到 next 方法的对象 next 执行返回 { value: any, done: boolean }

## 通过对象直接构造

```js
function isIterator(obj) {
  return typeof obj[Symbol.iterator] === 'function'
}
let collection = {
  items: [1, 2, 3],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item
    }
  }
}

console.log(isIterator(collection)) // true
for (let item of collection) {
  console.log(item) // 1 2 3
}
```

## 通过原型链添加

```js
class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    let value = this.value
    if (value < this.stop) {
      this.value++
      return {
        done: false,
        value: value
      }
    }
    return {
      done: true,
      value: undefined
    }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop)
}

for (let value of range(0, 3)) {
  console.log(value) // 0, 1, 2
}
console.log([...range(0, 5)]) // [0, 1, 2, 3, 4, 5]
```

## 同样的思想 如何让一个对象可以 for of 循环

```js
Object.prototype[Symbol.iterator] = function() {
  const _keys = Object.keys(this)
  let _idx = 0
  return {
    next: () => {
      let key = _keys[_idx++]
      if (!key) {
        return { done: true }
      }
      console.log(this)
      return {
        value: [key, this[key]],
        done: false
      }
    }
  }
}

// 或者可以分开定义 通过原型链访问到 next方法
Object.prototype[Symbol.iterator] = function() {
  return this
}
Object.prototype.next = function() {
  const keys = Object.keys(this)
  if (this.__proto__._idx === undefined) {
    this.__proto__._idx = 0
  }
  const key = keys[this.__proto__._idx++]
  if (!key) {
    delete this.__proto__._idx
    return { done: true }
  }
  return { done: false, value: [key, this[key]] }
}

// 测试一下
var obj = {
  a: 'kkk',
  b: 1,
  c: true,
  d: () => {
    console.log(123)
  }
}
for (let [k, v] of obj) {
  console.log(k, v)
}
// 直接扩展为数组
console.log([...obj])
```

## 重载一些内置迭代器

```js
function reload(arr) {
  if (Array.isArray(arr)) {
    arr[Symbol.iterator] = function*() {
      for (let i = 0; i < this.length; i++) {
        yield [this[i], i]
      }
    }
  }
}
var arr = ['x', 'y', 'z']
reload(arr)
for (let [item, idx] of arr) {
  console.log(item, idx)
}
```

## 直接使用 `generator` 函数构造迭代器

```js
function createCommonIterator(from, to, cb) {
  return {
    from,
    to,
    [Symbol.iterator]: function*() {
      for (var i = this.from; i <= this.to; i++) {
        yield cb(i, this)
      }
    }
  }
}

for (let [item, tobj] of createCommonIterator(0, 10, (i, o) => [i, o])) {
  console.log(item, tobj)
}
```

总结下来就是一点 只要一个对象具有 `Symbol.iterator` 属性（原型链上也可以）
且该属性执行完返回一个 `迭代器` 这个 `迭代器` 既可以用 **`es5`** 自己实现 也可以用 `generator` 函数

那它就能够被 `for...of` 迭代遍历

## 扩展一下 `Symbol` 的一些用法

```js
// Symbol 基本数据类型 string number boolean null undefined
// Symbol对象数据类型 object

// 特点：独一无二 永远不相等
let s1 = Symbol('tmc') // symbol中的标识 一般只放number或string 不然结果返回Symbol([object Object])
let s2 = Symbol()
console.log(s1 === s2)

let obj = {
  [s1]: 1,
  a: 2
}
// 声明的Symbol属性是不可枚举的 for - in 可以遍历自身属性和原型上的属性ß
for (let key in obj) {
  console.log(obj[key])
}
// 获取对象上的属性
console.log(Object.getOwnPropertySymbols(obj))

let s3 = Symbol.for('tmc')
let s4 = Symbol.for('tmc')
console.log(s3 === s4)
// 通过Symbol来获取key值
console.log(Symbol.keyFor(s3))

// Symbol 内置对象
// Symbol.iterator 实现对象的遍历
// 元编程 可以去对原生js的操作进行修改
let instance = {
  [Symbol.hasInstance](value) {
    return 'a' in value
  }
}
console.log({ a: 3 } instanceof instance)

let arr = [1, 2, 3]
arr[Symbol.isConcatSpreadable] = false // 拼接数组时不展开
console.log([].concat(arr, [1, 2, 3]))

// match split search方法
let obj1 = {
  [Symbol.match](value) {
    return value.length === 3
  }
}
console.log('abc'.match(obj1))

//species 衍生对象
class MyArray extends Array {
  constructor(...args) {
    super(...args)
  }
  // 强制修改一下
  static get [Symbol.species]() {
    return Array
  }
}
let v = new MyArray(1, 2, 3)
let c = v.map(item => (item *= 2)) // c是v的衍生对象
console.log(c instanceof MyArray)

// Symbol.toPrimitive
// 数据类型转化
let obj3 = {
  [Symbol.toPrimitive](type) {
    console.log(type)
    return 123
  }
}
console.log(obj++)

// Symbol.toStringTag
let obj5 = {
  [Symbol.toStringTag]: 'xxxx'
}

console.log(Object.prototype.toString.call(obj5))
```

## 扩展 forEach 遍历的中断

推荐使用 `find` `some` 方法 如果非要使用 `forEach` 可以考虑将 `array` 截断 但这会改变原数组

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
arr.forEach((v, i, a) => {
  if (v > 3) {
    // console.log(a === arr);
    a.splice(i)
    console.log(a)
    return
  }
  console.log(v, i)
})
```
