# 数据劫持

## `es5` `defineProperty`

```js
Object.defineProperty(window, "a", {
  get() {
    if (this.value) {
      return (this.value += 1);
    } else {
      return (this.value = 1);
    }
  }
});
if (a === 1 && a === 2 && a === 3) console.log(true);
// true
```

descriptor 各个参数值

- `value`
- `enumerable` 是否可以枚举
- `configurable` 决定了对象的属性是否可以被删除以及除 `writable` 特性外的其它特性是否可以被修改
- `set` 与 `get` 属性不能和 `value` 共存

## `es6` `Proxy`

```js
/**
 * @Proxy 代理对象
 * @getReceiver方法和receiver参数 Oproxy.getReceiver === Oproxy
 */
// let target = {name: 'xiaolin', age: 22}
// let handler = {}
// let proxy = new Proxy(target, handler)
// handler不传的话则没有任何拦截效果

// let info = {
//   name: 'xiaolin',
//   age: 22
// }
// let newinfo = new Proxy(info, {
//   get: function (target, prop, receiver) {
//     console.log('get')
//     if (prop === '__proto__') {
//       return Object.prototype
//     }
//     if (target[prop]) {
//       // return target[prop] === Reflect.get(target, prop)
//       return Reflect.get(target, prop)
//     } else {
//       return null
//     }
//   },
//   set: function (target, key, newval) {
//     console.log('set')
//     target[key] = newval
//   }
// })
// console.log(newinfo.__proto__)
// console.log(newinfo.name, info.name)
// newinfo.name = 'leooo'  // name的值会一同改变
// console.log(newinfo.name, info.name)

/**
 * @特殊用法在get函数加入业务逻辑实现虚拟属性 也就是访问得到一个计算属性 但该属性不可遍历
 */

/**
 * @操作proxy实例的全新副本属性也有同样的效果
 */
// let copyinfo = Object.create(newinfo)
// console.log(copyinfo.name, copyinfo === newinfo)
// copyinfo.name = 'haha'
// console.log(copyinfo.toString(), copyinfo.name, copyinfo.age)

/**
 * @实现一些特殊的方法代理数组 如 array['1:3'] 数组的截取操作
 * @实现禁止访问一个对象的内部属性 比如vue中_和$开头的变量是不允许的
 * @实现数据验证 当给属性赋值时不合法的值会报错
 */
// let arr = [1, 2, 3, 4, 5, 6, 7]
// let sliceProxy = new Proxy(arr, {
//   get: function (target, prop) {
//     if (/:/.test(prop)) {
//       let [start, end] = prop.split(':')
//       return target.slice(Number(start), Number(end))
//     }
//   }
// })
// console.log(sliceProxy['1:3'])

/**
 * @proxy对象get或set不可配置configurable且不可写writable的属性会报错
 */

/**
 * @handler中的apply 代理函数 当proxy实例调用或通过call、apply调用的时候会触发apply
 */
// let tarFun = function (a, b) { return a + b }
// let proxyFun = new Proxy(tarFun, {
//   apply (target, ctx, args) {
//     return 'this is leo'
//   }
// })
// console.log(proxyFun(1, 2), proxyFun.call(null, 1, 2), proxyFun.apply(null, [1, 2]))

/**
 * @那handler中的apply函数会覆盖被代理函数的逻辑怎么复用原函数中逻辑呢 Reflect.apply(...arguments)
 */
// let tarFun = function (a, b) { return a + b }
// let proxyFun = new Proxy(tarFun, {
//   apply (target, ctx, args) {
//     return Math.pow(Reflect.apply(...arguments), 2)
//   }
// })
// console.log(proxyFun(1, 2), proxyFun.call(null, 1, 2), proxyFun.apply(null, [1, 2]))

/**
 * @construct方法用于拦截new命令
 */
```

这两个 API 都是在各自的老版本环境中无法被 shim 的
