# 浏览器渲染机制

js css html 构成的页面中渲染的相互关系

## defer 脚本与行内脚本

- 行内脚本和 script 正常引入（不加 defer） 都是下载完执行都是同步的 会影响 dom 的构建

- defer 浏览器会异步的下载该文件并且不会影响到后续 DOM 的渲染

- async 加入这个属性怎么说？js 会进行异步的加载 不影响 DOM 树的构建（这一点效果跟 defer 一样）谁先加载完就执行谁 而不是按页面上的前后顺序

- 注意 defer 只是会异步的下载 他的执行的同步代码依然会阻塞 DOM 的构建 而且按页面上的顺序依次执

```js
// main1.js 同步执行需要3s
console.log("main1-start");
const now = +new Date();
while (+new Date() < now + 3 * 1000) {}
const a = 123;
console.log(document.querySelector(".div2"));
console.log("main1-ended");

// main2.js
console.log('main2 excuted');
```

```html
<!-- index1.html -->
<!DOCTYPE html>
<html>
  <head>
    <script src="main1.js" defer></script>
    <script src="main2.js" defer></script>
  </head>
  <body>
    <div class="div1">这是一个div</div>
    <script>
      console.log("inline脚本1");
      console.log(document.querySelector(".div1").__proto__);
      alert(123);
    </script>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <div class="div2">这是一个div</div>
    <script>
      window.onload = function() {
        console.log('onload');
      };
      console.log("inline脚本2");
    </script>
  </body>
</html>
```

结果是 main1、main2 进入异步下载 前面的 div.div1 构建成功
解析执行行内脚本 1 输出 `inline脚本1` 弹出 `123`
确定之后 才构建好后面的 div

解析执行行内脚本 2 输出 `inline脚本2` 并绑定 onload 函数 再执行 main 3s 之后执行 main2

最后 onload 打印 `onload`

## 正常脚本与行内脚本

接下来我们把 `defer` 属性去掉来看下 index1.html 的表现行为

```html
- <script src="main1.js" defer></script>
- <script src="main2.js" defer></script>
+ <script src="main1.js" ></script>
+ <script src="main2.js" ></script>
```

执行到头部 \<script> 标签 main1、main2 进入同步下载并执行 页面行为上一刷新变进入 3 秒卡死期
之后就是正常执行了

## async 脚本与行内脚本

接下来我们换到 `async` 属性 `async` 是在 `defer` 的基础上进行的 来看看谁先加载完谁先执行的表现

```html
- <script src="main1.js" defer></script>
- <script src="main2.js" defer></script>
+ <script src="main1.js" async></script>
+ <script src="main2.js" async></script>
```

## CSS 下载慢与渲染

css 的加载不会阻塞 DOM 的解析 但是会阻塞渲染 css 加载会阻塞后面 js 语句的执行

```html
head
<script>
  function h() {
    console.log(document.querySelectorAll("h1"));
  }
  setTimeout(h, 0);
</script>
<link
  href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css?v=1"
  rel="stylesheet"
/>
```

脚本能获取到说明 dom 已经构建好了 但是没有渲染出来

DOM 解析和 CSS 解析是两个并行的进程
所以这也解释了为什么 CSS 加载不会阻塞 DOM 的解析。

然而 由于 Render Tree 是依赖于 DOM Tree 和 CSSOM Tree 的

所以他必须等待到 CSSOM Tree 构建完成 也就是 CSS 资源加载完成(或者 CSS 资源加载失败)后 才能开始渲染。

因此，CSS 加载是会阻塞 Dom 的渲染的。
由于 js 可能会操作之前的 Dom 节点和 css 样式

因此浏览器会维持 html 中 css 和 js 的顺序。
样式表会在后面的 js 执行前先加载执行完毕。
所以 css 会阻塞后面 js 的执行。
