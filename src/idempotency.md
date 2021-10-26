# 接口的幂等性测试

什么叫幂等请求？为什么说只有幂等请求在 `http2` 中才能够被管道化(`pipeline`)

场景：前端需要发送一个 `post` 请求来申请余额提现 提现的过程后端需要确认的工作较多 需要等待诸多生产回调 耗时较长

```js
POST const res = withdraw(account_id, amount);
```

接口如此的话，前端如果没有限制导致用户连续点击多次或者用户点完刷新页面重新点击，即使第一次发起的请求成功了后面的请求也会提示失败。我们需要的行为是这样的在体现结果未下来的前的所有请求都应该归为一次操作 都应该收到提现成功的 `response`。成功之后请求才是一次新的请求。

接口设计应该拆分成两步 首先在提现组件内部先 `post` 请求一个 `uuid` 放在组件内部或者本地缓存里，真正的入库请求时带上，请求结束再删掉

```js
POST const handleId = await genTicketId();
this.handleId = handleId
localstorage.setItem('handleId', handleId)
```

后端在操作表时关联了同一个 `uuid` 的表操作只会执行一次 这样不管前端发送多少次请求 返回的结果都一样
直到前端确认提现成功 才能能够更新 `uuid` 进行再次提现

```js
POST const res = withdraw(account_id, amount, handleId);
if (res) {...}
```

从请求语义上来说 `GET`, `PUT`, `DELETE` 都是幂等操作 而 `POST` 不是
