# async-await 流程中的异常处理

```js
function sendRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ name: "leo", age: 23 });
      } else {
        reject({ error: "this is a error info" });
      }
    });
  });
}
function getResult() {
  return new Promise(resolve => {
    sendRequest()
      .then(data => {
        resolve({ data, ok: true });
      })
      .catch(error => {
        resolve({ data: error, ok: false });
      });
  });
}
async function test() {
  let res = await getResult();
  if (res.ok) {
    console.log("res 正常返回,通过res.data获得相关数据", res);
  } else {
    console.log("res 发生异常,通过res.data获得错误信息", res);
  }
}
test();
```

这种兼容的写法适合在请求数据的时候 你永远不知道 API 会给你返回什么内容

处理好 `await` 函数的异常来统一做一些补救的逻辑 比如说增加一些友好的提示

```jsx
import { extend } from "umi-request";
import { notification } from "antd";
import router from "umi/router";

const errorHandler = error => {
  const { response, data } = error;
  if (response && response.status) {
    const { status } = response;
    if (Number(status) === 401) {
      localStorage.removeItem("chain:token");
      router.push("/user/login");
    }
  } else if (!response) {
    notification.error({
      description: "网络异常",
      message: "您的网络发生异常，无法连接服务器"
    });
  }
  return Promise.resolve({ ok: false, ...data });
};

const request = extend({
  errorHandler,
  // getResponse: true,
  credentials: "include",
  // 默认请求是否带上cookie
  timeout: 8000
});

request.use(async (ctx, next) => {
  // ctx 请求上下文 有ctx.req ctx.res 以next()函数为界限 对请求做洋葱圈处理
  const token = localStorage.getItem("chain:token");
  if (token) {
    ctx.req.options.headers["Authorization"] = `Bearer ${token}`;
  }
  await next();
  if (ctx.res.error && JSON.stringify(ctx.res.error).includes("token")) {
    // 如果收到token相关的错误 则需要重新登录
    console.error("token dead:", ctx.res);
    localStorage.removeItem("chain:token");
    router.push("/user/login");
  }
});

export default request;
```

上面的 `errorHandler` 函数默认捕获非 200 的状态码
如果状态码异常我们无法根据 API 作出相应的 toast 也拿不到 `response` 中的 body
所以我们可以统一到 `errorHandler` 中处理 `Promise` reject 的情况

```js
import request from "./request";
function sendPostApi(params) {
  return request('/api/system/init/SetSelfNode', {
    method: 'POST',
    data: { node: params },
  });
}
function* sendPostApiEffect(payload) {
  const response = await sendPostApi(payload);
  if (response.ok !== false) {
    return true;
  } else {
    message.error("api失败");
    return false;
  }
}
```

如此 我们 `await` 任何请求 API 的返回值 都能拿到值（包括错误信息）
