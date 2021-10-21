# webworker处理复杂计算

> 前言：一直都觉得只有 java 才能谈多线程这么高逼格的话题 可惜 java 和 javascript 的关系就好比雷锋跟雷峰塔的关系 不过在 HTML5 新特性中有一个 web worker,关于它的理论如果没有相关 demo 去实践它可能理解起来会有点僵硬。本文是通过 canvas 里面的一个操作像素的 demo 来更为直观地展现 webworker 的性能。

## js 的单线程特性

JavaScript 引擎是单线程运行的 JavaScript 中耗时的 I/O 操作都被处理为异步操作

它们包括键盘、鼠标 I/O 输入输出事件、窗口大小的 resize 事件、定时器(setTimeout、setInterval)事件、Ajax 请求网络 I/O 回调等。

当这些异步任务发生的时候 它们将会被放入浏览器的事件任务队列中去 等到 JavaScript 运行时执行线程空闲时候才会按照队列先进先出的原则被一一执行 但终究还是单线程。

只要有一个任务耗时很长 后面的任务都必须排队等着 会拖延整个程序的执行。

常见的浏览器无响应（假死） 往往就是因为某一段 Javascript 代码长时间运行（比如运行一个运算量非常大的函数） 导致整个页面卡在这个地方 其他任务无法执行。

## 异步和单线程

正是因为单线程所以注定了 js 中的某些操作必须是异步的 举个粒子：

```js
window.onload = function() {
  console.log(111)
  setTimeout(function() {
    console.log(222)
  }, 0)
  console.log(333)
}
```

上面的代码依次输出 111,333,222

因为运行 js 碰到属于异步操作的代码就会单独拎出来放在一个队列（setTimeout 就属于异步操作 不管是不是 0 秒后执行）

等待同步代码（不属于异步操作的代码就是同步了）执行完就依次执行队列里的操作。

其实在 head 里面加载 js 的话 window.onload 本身也属于异步代码。

## 实现异步操作的方法

1、利用 setTimout 或回调实现异步

2、动态创建 script 标签

3、利用 script 提供的 defer/async

4、es6 里的 promise

这里只是总结一下 觉得前三种都很鸡肋 用好回调和 promise 大法就好了。

## 什么是 webworker

Web Worker 是 HTML5 标准的一部分 这一规范定义了一套 API 它允许一段 JavaScript 程序运行在主线程之外的另外一个线程中。

工作线程允许开发人员编写能够长时间运行而不被用户所中断的后台程序 去执行事务或者逻辑 并同时保证页面对用户的及时响应 可以将一些大量计算的代码交给 web worker 运行而不冻结用户界面。

## webworker 的基本语法

- 启动与通讯

```js
//---------------放在页面上的main.js：主线程
var worker = new Worker('worker.js')
// 主线程向子线程发送数据
worker.postMessage(data)
worker.onmessage = function(ev) {
  var data = ev.data
  // 主线程收到子线程的处理后的数据
}

//-------------放在后台的worker.js：子线程
self.onmessage = function(ev) {
  var data = ev.data //收到主线程发过来的源数据
  var newdata = handle(data)
  self.postMessage(newdata) //把处理好的数据发回去
}
//把一些运算不叫复杂或工作量大的js代码拎过来
function handle(data) {
  //some coding...
}
```

- 停止 worker

```js
// 方式一 main.js 在主线程停止方式
var worker = new Worker('./worker.js')

worker.terminate()

// 方式二、worker.js
self.close()
```

看一下最基本的流程语法 需要特别注意：子线程里面的 js 代码所支持的语法非常有限 只支持 ECMAscript 的基本语法

具体范围是多大呢 我们都知道 javascript 大致分为 ECMAscript、DOM、BOM、nodeJs。

第一类是基础 DOM 类是基于 ECMAscript 实现的去操作 DOM 树的 BOM 类就是浏览器行为语法

而 nodeJs 则是基于 ECMAscript 去操作 os、file、database、net 等等之类的

所以它只支持像 string、array、object...这样子的东西

像 alert 这种浏览器环境提供的 API 是不支持的 相信大家肯定知道这个范围 也就是 ECMAscript V8 引擎实现的那一套

还有上面说了线程是后台开的 这些文件自然要放在服务器环境下运行的 我们可以借助 serve 包

```bash
cnpm i -g serve
```

在子线程中还可以通过 importScripts 语法来引入其他的 js 文件

## demo：用 canvas 语法操作十万颗像素点

- 主线程 js

```js
window.onload = function() {
  var oc = document.getElementById('print')
  var ogc = oc.getContext('2d')
  ogc.fillStyle = '#fc6423'
  var ali = document.getElementsByTagName('li')
  for (var i = 0; i < ali.length; i++) {
    ali[i].onclick = function() {
      console.time(1) //------------------计时开始
      ogc.clearRect(0, 0, oc.width, oc.height)
      ogc.save()
      var h = 200
      var str = this.innerHTML
      ogc.font = h * 0.85 + 'px impact'
      ogc.textBaseline = 'top'
      var w = ogc.measureText(str).width
      ogc.fillText(str, (oc.width - w) / 2, (oc.height - h) / 2)
      var allarea = ogc.getImageData(
        (oc.width - w) / 2,
        (oc.height - h) / 2,
        w,
        h
      )
      console.log(w)
      ogc.clearRect(0, 0, oc.width, oc.height)
      var newarea = ogc.createImageData(w, h)
      // var allarr = random(w * h, w * h / 10);
      //这里开一个worker 为的就是把上一行代码：10组随机数的产生拎到子线程中去运行
      var worker = new Worker('cutarr.js')
      worker.postMessage(w * h) // 将数据发给子线程
      worker.onmessage = function(ev) {
        var allarr = ev.data //收到处理后的数据
        var inow = 0
        var timer = null
        timer = setInterval(function() {
          for (var i = 0; i < allarr[inow].length; i++) {
            newarea.data[allarr[inow][i] * 4] =
              allarea.data[allarr[inow][i] * 4]
            newarea.data[allarr[inow][i] * 4 + 1] =
              allarea.data[allarr[inow][i] * 4 + 1]
            newarea.data[allarr[inow][i] * 4 + 2] =
              allarea.data[allarr[inow][i] * 4 + 2]
            newarea.data[allarr[inow][i] * 4 + 3] =
              allarea.data[allarr[inow][i] * 4 + 3]
          }
          ogc.putImageData(newarea, (oc.width - w) / 2, (oc.height - h) / 2)
          if (inow == 9) {
            inow = 0
            clearInterval(timer)
          }
          inow++
        }, 150)
        ogc.restore()
      }
      console.timeEnd(1) //------------------计时结束
    }
  }
}
```

- 子线程 js

```js
function random(all, part) {
  var arr1 = []
  var allarr = []
  for (var i = 0; i < all; i++) {
    arr1.push(i)
  }
  for (var i = 0; i < all / part; i++) {
    var newarr = []
    for (var j = 0; j < part; j++) {
      newarr.push(arr1.splice(Math.floor(Math.random() * arr1.length), 1))
    }
    allarr.push(newarr)
  }
  return allarr
}
self.onmessage = function(ev) {
  var arr = random(ev.data, ev.data / 10)
  self.postMessage(arr)
}
```

上面这段 js 代码要完成的是将一块区域内的近 10 万颗像素（可调文字大小改变）每隔 150ms 随机显示其 1/10 的像素点 最终形成一个完整的汉字

其中最耗时的过程在于随机数的产生 有几个像素点就进行几次 random 操作。这是由随机函数 random 来完成 这里单纯地把它拎到子线程中去处理。

上面的代码是用了 webworker 的 不使用 webworker：即把 random 放在 window.onload 里面

直接用 var allarr = random(params)来产生就好了。接下来对比一下两种请况下从点击每个字到打印计时一共花费多少时间：

![不使用worker](https://i.loli.net/2017/12/05/5a2688bf20bb3.png)

![使用worker](https://i.loli.net/2017/12/05/5a2688bf21ecb.png)

一个接近 2 秒 一个 10ms 以内 差距悬殊。

而且前面提到：工作线程允许开发人员编写能够长时间运行而不被用户所中断的后台程序 去执行事务或者逻辑 并同时保证页面对用户的及时响应 也就是说 当浏览器碰到这句代码：

```js
var allarr = random(w * h, (w * h) / 10)
```

页面就会卡死近 2000ms 不能有任何操作 比如说点击、右键 更不用说执行后面的代码了：

```js
console.log(111)
var allarr = random(w * h, (w * h) / 10)
console.log(222)
```

这样我看到：几乎在点击的同时就打印了 111 而 222、计时和分割线是在近 2000ms 之后同时打印的 因为上面三行代码都是同步的

而用了 webworker 则不存在卡死的请况 速度也快多了。

如果面积小看不出有多少差别 可以如果把大小调到 500 前者就达到了恐怖的 15 秒之多了。

可是这时候用了 webworker 虽然不会造成卡死状态 但好像也快不了多少 也许在一个可控的范围内才能发挥它的性能吧 或者说本来 js 代码对多线程的支持就不好。大家可以自己去编写更复杂变态的函数去测验。

[案例源码地址](https://github.com/formattedzzz/H5-web-Worker-exploer)

## 部分典型的应用场景

Web Worker 带来后台计算能力 Web Worker 自身是由 webkit 多线程实现 但它并没有为 Javasctipt 语言带来多线程编程特性 我们现在仍然不能在 Javascript 代码中创建并管理一个线程 或者主动控制线程间的同步与锁等特性。Web Worker 只是浏览器（宿主环境）提供的一个能力／API。而且它不支持 IE。

1、使用专用线程进行数学运算
Web Worker 最简单的应用就是用来做后台计算 而这种计算并不会中断前台用户的操作

2、 图像处理
通过使用从 canvas 或者 video 元素中获取的数据 可以把图像分割成几个不同的区域并且把它们推送给并行的不同 Workers 来做计算

3、大量数据的检索
当需要在调用 ajax 后处理大量的数据 如果处理这些数据所需的时间长短非常重要 可以在 Web Worker 中来做这些 避免冻结 UI 线程。

4、背景数据分析
由于在使用 Web Worker 的时候 我们有更多潜在的 CPU 可用时间 我们现在可以考虑一下 JavaScript 中的新应用场景。我们现在可以考虑一下 JavaScript 中的新应用场景。例如 我们可以想像在不影响 UI 体验的情况下实时处理用户输入。利用这样一种可能 我们可以想像一个像 Word（Office Web Apps 套装）一样的应用：当用户打字时后台在词典中进行查找 帮助用户自动纠错等等。

> 参考文章：[deep-in-web-worker](http://www.alloyteam.com/2015/11/deep-in-web-worker/#prettyPhoto)
