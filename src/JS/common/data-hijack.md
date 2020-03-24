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

`descriptor` 各个参数值

- `value`
- `enumerable` 是否可以枚举
- `configurable` 决定了对象的属性是否可以被删除以及除 `writable` 特性外的其它特性是否可以被修改
- `set` 与 `get` 属性不能和 `value` 共存

## `es6` `Proxy`

可以代理（拦截）几乎一切功能 这两个 API 都是在各自的老版本环境中无法被 shim 的

## 差异对比

### `Object.defineProperty` 弊端在哪

`Object.defineProperty` 是对对象的属性进行劫持 要劫持整个对象 需要自己写递归

```js
class Observer {
  constructor(data) {
    // 遍历参数data的属性,给添加到this上
    for (let key of Object.keys(data)) {
      if (typeof data[key] === "object") {
        data[key] = new Observer(data[key]);
      }
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log("你访问了" + key);
          return data[key];
        },
        set(newVal) {
          console.log("你设置了" + key);
          console.log("新的" + key + "=" + newVal);
          if (newVal === data[key]) {
            return;
          }
          data[key] = newVal;
        }
      });
    }
  }
}

const obj = {
  name: "app",
  age: "18",
  a: {
    b: 1,
    c: 2
  },
  arr: [1, 2, 3]
};
const app = new Observer(obj);
app.age = 20;
console.log(app.age);
app.newPropKey = "新属性";
console.log(app.newPropKey);
```

- 对象属性的新增及删除需要重新监测
- 数组下标的变动不会监测不到
  这里的数组是对象 又被 `new` 了一个 `Observer` 触发的一个 set 函数只知道 key 为 0
- 当 data 中数据比较多且层级很深的时候 会有性能问题 因为要遍历 `data` 中所有的数据并给其设置成响应式的

### `Proxy` 简单看看什么叫全属性的支持

Proxy 是对整个对象进行劫持

```js
const obj = {
  name: "app",
  age: "18",
  a: {
    b: 1,
    c: 2
  }
};
const p = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log("你访问了" + propKey);
    return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver) {
    console.log("你设置了" + propKey);
    console.log("新的" + propKey + "=" + value);
    Reflect.set(target, propKey, value, receiver);
  }
});
p.age = "20";
console.log(p.age);
p.newPropKey = "新属性";
console.log(p.newPropKey);
p.a.d = "这是obj中a的属性";
console.log(p.a.d);

// ----------------------------修改原对象的age属性
// 你设置了age
// 新的age=20
// 你访问了age
// 20

// ----------------------------设置新的属性
// 你设置了newPropKey
// 新的newPropKey=新属性
// 你访问了newPropKey
// 新属性

// ----------------------------给obj的a属性(是个对象)设置属性
// 你访问了a
// 你访问了a
// 这是obj中a的属性
```

如果对象的属性是对象 返回一个新的 `Proxy`

## `Proxy` 参数 `handler` 可设属性一览

- `get(target, propKey, receiver)` 拦截对象属性的读取

  参数：**_目标对象_** 、**_属性名_** 、 **_proxy 实例本身_**

  比如 proxy.foo 和 proxy['foo']

- `set(target, propKey, value, receiver)` 拦截对象属性的设置

  参数：**_目标对象_** 、 **_属性名_** 、 **_属性值_** 、 **_proxy 实例本身_**

  比如 proxy.foo = v 或 proxy['foo'] = v 返回一个布尔值

- `has(target, propKey)` 拦截 propKey in proxy 的操作 返回一个布尔值。

  参数：**_目标对象_** 、 **_需查询的属性名_**

- `deleteProperty(target, propKey)` 拦截 delete proxy[propKey]的操作 返回一个布尔值。

- `ownKeys(target)`

  拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环 返回一个数组。

  该方法返回目标对象所有自身的属性的属性名 而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

- `getOwnPropertyDescriptor(target, propKey)`

  拦截 Object.getOwnPropertyDescriptor(proxy, propKey) 返回属性的描述对象。

- `defineProperty(target, propKey, propDesc)`

  拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs) 返回一个布尔值。

- `preventExtensions(target)` 拦截 Object.preventExtensions(proxy) 返回一个布尔值。

- `getPrototypeOf(target)` 拦截 Object.getPrototypeOf(proxy) 返回一个对象。

- `isExtensible(target)` 拦截 Object.isExtensible(proxy) 返回一个布尔值。

- `setPrototypeOf(target, proto)` 拦截 Object.setPrototypeOf(proxy, proto) 返回一个布尔值。

  如果目标对象是函数 那么还有两种额外操作可以拦截。

- `apply(target, object, args)` 拦截 Proxy 实例作为函数调用的操作

  参数：**_目标对象_** 、 **_上下文对象（this）_** 、 **_目标对象的参数数组_**

  比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

- `construct(target, args)` 拦截 Proxy 实例作为构造函数调用的操作

  比如 new Proxy(...args)。

```js
/**
 * @Proxy 代理对象
 * @getReceiver方法和receiver参数 Oproxy.getReceiver === Oproxy
 */
let target = { name: "xiaolin", age: 22 };
let handler = {};
let proxy = new Proxy(target, handler);
// handler不传的话则没有任何拦截效果;

let info = {
  name: "xiaolin",
  age: 22
};
let newinfo = new Proxy(info, {
  get: function(target, prop, receiver) {
    console.log("get");
    if (prop === "__proto__") {
      return Object.prototype;
    }
    if (target[prop]) {
      // return target[prop] === Reflect.get(target, prop)
      return Reflect.get(target, prop);
    } else {
      return null;
    }
  },
  set: function(target, key, newval) {
    console.log("set");
    target[key] = newval;
  }
});
console.log(newinfo.__proto__);
console.log(newinfo.name, info.name);
newinfo.name = "leooo"; // name的值会一同改变
console.log(newinfo.name, info.name);

/**
 * @特殊用法在get函数加入业务逻辑实现虚拟属性 也就是访问得到一个计算属性 但该属性不可遍历
 */
/**
 * @操作proxy实例的全新副本属性也有同样的效果
 */
let copyinfo = Object.create(newinfo);
console.log(copyinfo.name, copyinfo === newinfo);
copyinfo.name = "haha";
console.log(copyinfo.toString(), copyinfo.name, copyinfo.age);
```

```js
/**
 * @实现一些特殊的方法代理数组 如 array['1:3'] 数组的截取操作
 * @实现禁止访问一个对象的内部属性 比如vue中_和$开头的变量是不允许的
 * @实现数据验证 当给属性赋值时不合法的值会报错
 */
let arr = [1, 2, 3, 4, 5, 6, 7];
let sliceProxy = new Proxy(arr, {
  get: function(target, prop) {
    if (/:/.test(prop)) {
      let [start, end] = prop.split(":");
      return target.slice(Number(start), Number(end));
    }
  }
});
console.log(sliceProxy["1:3"]);

/**
 * @proxy对象get或set不可配置configurable且不可写writable的属性会报错
 */
```

```js
/**
 * @handler中的apply 代理函数 当proxy实例调用或通过call、apply调用的时候会触发apply
 */
let tarFun = function(a, b) {
  return a + b;
};
let proxyFun = new Proxy(tarFun, {
  apply(target, ctx, args) {
    return "this is leo";
  }
});
console.log(
  proxyFun(1, 2),
  proxyFun.call(null, 1, 2),
  proxyFun.apply(null, [1, 2])
);

/**
 * @那handler中的apply函数会覆盖被代理函数的逻辑怎么复用原函数中逻辑呢 Reflect.apply(...arguments)
 */
let tarFun = function(a, b) {
  return a + b;
};
let proxyFun = new Proxy(tarFun, {
  apply(target, ctx, args) {
    return Math.pow(Reflect.apply(...arguments), 2);
  }
});
console.log(
  proxyFun(1, 2),
  proxyFun.call(null, 1, 2),
  proxyFun.apply(null, [1, 2])
);

/**
 * @construct方法用于拦截new命令
 */
```
