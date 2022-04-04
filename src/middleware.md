# 洋葱圈流调简易模型

```js
const middleWare = []

async function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

middleWare.push(async (ctx, next) => {
  console.log(1)
  await wait(500)
  ctx.body = { name: 'leooo' }
  await next()
  await wait(500)
  console.log(2)
  return ctx
})

middleWare.push(async (ctx, next) => {
  console.log(3)
  await wait(500)
  await next()
  await wait(500)
  console.log(4)
})

middleWare.push(async (ctx, next) => {
  console.log(5)
  await wait(500)
  await next()
  await wait(500)
  console.log(6)
})

middleWare.push(async (ctx, next) => {
  console.log(7, ctx)
  await next()
  ctx.head = 'pop'
})

function compose(wares) {
  wares = wares.filter(v => typeof v === 'function')
  return function (ctx, lastcb) {
    return dispatch(0)
    function dispatch(i) {
      console.log('i::', i)
      func = wares[i]
      // 如果最后一个ware调用了next方法
      // 将会触发dispatch(wares.length) 调用lastcb
      if (i >= wares.length) return lastcb(ctx)
      try {
        return func(ctx, dispatch.bind(null, i + 1))
      } catch (error) {
        return error
      }
    }
  }
}
const context = { status: 200, env: 'dev' }
const res = compose(middleWare)(context, ctx => {
  console.log('lastcb', ctx)
})

res
  .then(ctx => {
    console.log('结果', ctx)
  })
  .catch(err => {
    console.log('错误', err)
  })

// 如果一个ware中多次调用next怎么办 还需要在闭包函数中设置一个计数器
```
