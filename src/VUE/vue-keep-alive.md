# vue 内置组件 keep-alive 缓存策略

先看看一般的缓存淘汰策略 有 FIFO（先进先出）、LFU（最少使用）、LRU（最近最少使用）

## LRU 策略 （Least Recently Used）

```js
// 假设缓存长度为3
var arr = [, ,]
// 访问A
arr = [, , A]
// 访问B
arr = [, A, B]
// 访问C
arr = [A, B, C]

// 访问D
arr = [B, C, D]

// 再访问B
arr = [C, D, B]
```

最近一次访问的会被提前

实现一个简单的 LRU 缓存结构

```js
class LRUCache {
  constructor(maxnum) {
    this.maxnum = maxnum > 0 ? maxnum : 1
    this.cache = {}
    this.keys = []
  }

  get(key) {
    if (this.cache[key]) {
      this.remove(this.keys, key)
      this.keys.push(key)
      return this.cache[key]
    }
    return -1
  }

  put(key, val) {
    this.cache[key] = val

    if (!this.cache[key]) {
      this.keys.push(key)
    } else {
      this.remove(this.keys, key)
      this.keys.push(key)
    }
    if (this.keys.length > this.maxnum) {
      delete this.cache[this.keys.shift()]
    }
  }

  remove(arr, item) {
    const idx = arr.indexOf(item)
    if (idx >= 0) {
      return arr.splice(idx, 1)
    }
    return []
  }
}

var cache = new LRUCache(3)
console.log(cache.get(1))
cache.put(1, 2)
cache.put(2, 3)
cache.put(3, 4)
console.log(cache.get(1))
console.log(cache.get(2))
console.log(cache.get(3))
cache.put(2, 2)
console.log(cache.get(2))
cache.put(4, 5)
console.log(cache.get(1))
console.log(cache.keys, cache.cache)
```

使用 map 结构实现 这里使用了 map 结构的迭代器属性非常的巧妙

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()
  }

  get(key) {
    let val = this.map.get(key)
    if (typeof val === 'undefined') {
      return -1
    }
    this.map.delete(key)
    this.map.set(key, val)
    return val
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key)
    }

    this.map.set(key, value)
    let keys = this.map.keys()
    while (this.map.size > this.capacity) {
      // 这里就是删除第一个 set 的属性
      this.map.delete(keys.next().value)
    }
  }
}
```

## keep-alive 组件源码

被 `keep-alive` 包裹且命中缓存的组件生命周期中只有 `activated` `deactivated` 两个钩子函数

```js
export default {
  name: 'keep-alive',
  // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,发生在 initLifecycle 的过程中
  abstract: true,
  props: {
    // 被缓存组件
    include: patternTypes,
    // 不被缓存组件
    exclude: patternTypes,
    // 指定缓存大小
    max: [String, Number]
  },
  created() {
    // 初始化用于存储缓存的 cache 对象
    this.cache = Object.create(null)
    // 初始化用于存储VNode key值的 keys 数组
    this.keys = []
  },
  destroyed() {
    for (const key in this.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted() {
    // 监听缓存（include）/不缓存（exclude）组件的变化
    // 在变化时，重新调整 cache
    // pruneCache：遍历 cache，如果缓存的节点名称与传入的规则没有匹配上的话，就把这个节点从缓存中移除
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  render() {
    // 获取第一个子元素的 vnode
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions
    if (componentOptions) {
      // name 不在 inlcude 中或者在 exlude 中则直接返回 vnode，否则继续进行下一步
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      // 获取键，优先获取组件的 name 字段，否则是组件的 tag
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key

      // --------------------------------------------------
      // 下面就是 LRU 算法了，
      // 如果在缓存里有则调整，
      // 没有则放入（长度超过 max，则淘汰最近没有访问的）
      // --------------------------------------------------
      // 如果命中缓存，则从缓存中获取 vnode 的组件实例，并且调整 key 的顺序放入 keys 数组的末尾
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      }
      // 如果没有命中缓存,就把 vnode 放进缓存
      else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      // keepAlive标记位
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}

// 移除 key 缓存
function pruneCacheEntry(
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

// remove 方法（shared/util.js）
/**
 * Remove an item from an array.
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
