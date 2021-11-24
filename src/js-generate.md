# generate 函数处理异步任务

```ts
function* gen(): Generator<Promise<any>, any, any> {
  const res1 = yield new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 500)
  })
  console.log({ res1 })
  const res2 = yield new Promise((resolve, reject) => {
    setTimeout(() => resolve(2 + res1), 500)
  })
  console.log({ res2 })
  const res3 = yield new Promise((resolve, reject) => {
    setTimeout(() => resolve(3 + res2), 500)
  })
  console.log({ res3 })
  return res3
}

function co(
  Fn: () => Generator<Promise<any>, any, any>,
  cb?: (...args: any[]) => any
): void {
  const it = Fn()
  next()
  async function next(toLeft?: any) {
    const { done, value } = it.next(toLeft)
    console.log('next') // next执行yield+1次
    if (!done) {
      const val = await value
      next(val)
    } else {
      if (cb) {
        cb(value)
      }
    }
  }
}

co(gen, res => console.log('done', res))
```
