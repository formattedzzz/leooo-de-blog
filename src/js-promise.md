# Promise 容易踩的坑

很常见的场景，对于数据量很大的页面（比如五花八门的行情数据）加载数据后往往会对初始数据做很多预操作

```js
fetchData(params)
  .then(data => {
    this.pagedata = preHandle(data)
  })
  .catch(err => {
    console.log(err) // page error
  })
```

`Promise` 是链式传递调用的 `catch` 放在最后会捕获每一层的意外错误，也就是说如果 `preHandle` 报错 比如说后端突然改了接口的数据结构或者类型导致不符合你的要求触发 `throw Error` 同样也会 `catch`。导致既走了 `then` 又走了 `catch`。我们往往容易忽略最新 `then` 方法是否能够稳定 `resolve`。我们可以在 `fetchData` 调用完就 `catch` 分别是接口报错还是逻辑报错。当然也可以根据数据类型判断。

是否要保证 `preHandle` 稳定 `resolve` 还需要看业务情况。页面要求是否严格 `json-schema` 通过失败是否会出现致命错误等。明确链环中的每一个 `Promise` 是否 `resolve` 才能让页面行为变得可控。
