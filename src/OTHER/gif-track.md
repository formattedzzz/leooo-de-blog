# 用 GIF 图片做数据埋点请求

为什么通常在发送数据埋点请求的时候使用的是 `1x1` 像素的透明 gif 图片

```html
<script type="text/javascript">
  var thisPage = location.href;
  var referringPage = document.referrer ? document.referrer : "none";
  var beacon = new Image();
  beacon.src =
    "http://www.example.com/logger/beacon.gif?page=" +
    encodeURI(thisPage) +
    "&ref=" +
    encodeURI(referringPage);
</script>
```

英文术语叫：`image beacon`。总结下来就是：
1、避免跨域

2、浏览、点击、热点、心跳、ID 颁发

3、不会阻塞页面的加载与渲染

4、不占用 `ajax` 请求限额 相比 `XMLHttpRequest` 对象发送 GET 请求 性能上更好

5、能够完成整个 `HTTP` 请求 + 响应

6、GIF 的最低合法体积最小【最小的 `BMP` 文件需要 74 个字节 PNG 需要 67 个字节 而合法的 GIF 只需要 43 个字节】

7、只需要 new 一个 Image 添加 src 即可发送请求 不需要处理返回数据 不需要添加到 dom 节点 后端可以返回 204 no content 表示请求处理成功但没有内容返回
