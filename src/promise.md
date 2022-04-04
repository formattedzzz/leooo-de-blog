# promise基本原理

## 基本实现

```js
class Promise {
  constructor(executor) {
    this.status = 'pending' // 初始化状态
    this.value = undefined // 初始化成功返回的值
    this.reason = undefined // 初始化失败返回的原因

    // 解决处理异步的resolve
    this.onResolvedCallbacks = [] // 存放所有成功的resolve
    this.onRejectedCallbacks = [] // 存放所有失败的reject

    /**
     * @param {*} value 成功返回值
     * 定义resolve方法
     * 注意：状态只能从pending->fulfilled和pending->rejected两个
     */
    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled' // 成功时将状态转换为成功态fulfilled
        this.value = value // 将成功返回的值赋值给promise
        // 为了解决异步resolve以及返回多层promise
        this.onResolvedCallbacks.forEach(fn => {
          fn() // 当状态变为成功态依次执行所有的resolve函数
        })
      }
    }
    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected' // 失败时将状态转换为成功态失败态rejected
        this.reason = reason // 将失败返回的原因赋值给promise
        this.onRejectedCallbacks.forEach(fn => {
          fn() // 当状态变为失败态依次执行所有的reject函数
        })
      }
    }
    executor(resolve, reject) // 执行promise传的回调函数
  }
  /**
   * 定义promise的then方法
   * @param {*} onFulfilled 成功的回调
   * @param {*} onRejected 失败的回调
   */
  then(onFulfilled, onRejected) {
    // 为了解决then方法返回Promise的情况
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        // 如果状态为fulfilled时则将值传给这个成功的回调
        setTimeout(() => {
          const x = onFulfilled(this.value) // x的值有可能为 promise || 123 || '123'...
          // 注意：此时调用promise2时还没有返回值，要用setTimeout模拟进入第二次事件循环；先有鸡先有蛋
          resolvePromise(promise2, x, resolve, reject)
        }, 0)
      }
      if (this.status === 'rejected') {
        setTimeout(() => {
          const x = onRejected(this.reason) // 如果状态为rejected时则将视频的原因传给失败的回调
          resolvePromise(promise2, x, resolve, reject)
        }, 0)
      }
      if (this.status === 'pending') {
        // 记录--> 解决异步
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        })
      }
    })
    return promise2 // 解决多次链式调用的问题
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  // console.log(promise2, x, resolve, reject)
  if (promise2 === x) {
    // 如果返回的值与then方法返回的值相同时
    throw TypeError('循环引用')
  }
  // 判断x是不是promise;注意：null的typeof也是object要排除
  if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    try {
      const then = x.then // 获取返回值x上的then方法；注意方法会报错要捕获异常；原因111
      if (typeof then === 'function') {
        // 就认为是promise
        then.call(
          x,
          y => {
            // resolve(y)
            // 递归解析 ; 有可能返回多个嵌套的promise
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            reject(r)
          }
        )
      }
    } catch (e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```

## 来看一道面试题的执行顺序

```js
new Promise((resolve, reject) => {
  console.log('log: 外部promise')
  resolve()
  //---------------@1
})
  .then(() => {
    console.log('log: 外部第一个then')
    //---------------@2
    new Promise((resolve, reject) => {
      console.log('log: 内部promise')
      //---------------@3
      resolve()
    })
      .then(() => {
        console.log('log: 内部第一个then')
        //---------------@4
      })
      .then(() => {
        console.log('log: 内部第二个then')
        //---------------@5
      })
  })
  .then(() => {
    console.log('log: 外部第二个then')
    //---------------@6
  })
// log: 外部promise
// log: 外部第一个then
// log: 内部promise
// log: 内部第一个then
// log: 外部第二个then
// log: 内部第二个then
```

首先我们明确两个概念 `入栈微任务执行` `入栈所属promise内部队列`

`@1` 之后马上该 `promise` 状态就变成了 `resolved` (且清空之前的所有执行栈)

这时候 `.then` 添加的函数马上就会 `入栈微任务执行`

于是微任务入栈 外部第一个 `then` 而链式调用的外部第二个 `then` 回调是 `入栈所属promise内部队列`

于是来到了 `@2`、`@3`

同理同步的来到 `@4` 但是 `@5` 那步的回调并不会立即执行 而是入栈 `@4` 那步返回的 `promise` 内部队列

所以至此 `@1` 所在的函数 `.then` 的同步操作完了 回来执行 `入栈微任务执行` 的 `@6` 最后 `@5`

## 链式调用、分开调用的区别

分开调用都是入栈同一个 promise 对象 执行都是在同一轮事件循环 拿到的值也是一样的

```js
var p = new Promise(ok => {
  setTimeout(() => {
    ok({ code: 200 })
  })
})
p.then(v => {
  console.log(v)
  return new Promise(ok => {
    setTimeout(() => {
      ok({ ...v, data: null })
    })
  }).then(v2 => {
    if (v2.code) v2.code++
    return v2
  })
}).then(console.log)
// { code: 200 }
// { code: 201, data: null }

p.then(console.log)
// { code: 200 }
```
