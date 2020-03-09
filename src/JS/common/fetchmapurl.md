# 数据请求映射到 URL

**window.history** 对象

```js
history.pushState(
  { name: "leooo" },
  "history-title",
  "/leooo/bob?name=leo&age=23"
);
// pushState并不会引起任何加载、刷新 但是会记录到页面路由的历史栈中
```

第一个参数可以 state 通过**history.state**访问得到 第三个参数如果是斜杠开头的就会直接替换掉当前的 location.pathname

```js
history.replaceState();
history.back();
history.forward();
history.go(1);
history.go(-1);
// history的改变就会触发 popState 事件
window.onpopstate = function() {};
```

页面请求数据时将相应的参数写进 URL 中而不引起页面的任何行为
这样拷贝 URL 在页面打开时 页面 componentDidMount 时再根据 pathname 中的参数进行页面初始化
