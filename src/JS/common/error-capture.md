# js错误捕获

```js
window.onerror = function(message, source, lineno, colno, error) {
  // console.log(message, source, lineno, colno, error)
}
```

## 不同源的js文件错误捕获不到怎么办

- 解决跨域 Access-Control-Allow-Origin: *

- 加上 crossorigin 属性
