# pre-interview

## url 到页面呈现

> wx.nnleo.cn wx 三级域名 nnleo 耳机域名 cn 顶级域名（TLD top level domain）

输入 www.baidu.com

### 从网络层面看

- 浏览器会构建请求行 (GET / http/1.1)
- 检查强缓存 (from disk cache) 命中则直接返回 html 页面 否则的话就需要请求后端
- DNS（domain name system）解析 拿到主机 IP

  客户端缓存 => 网关缓存 => 本地域名服务器(dns.baidu.com) => [根域名服务器 => 顶级域名服务器(dns.com) => 权限域名服务器(递归或迭代查询)]

- 通过三次握手确认建立 TCP 连接
- 发送 http 请求 （包括请求头、请求体）请求头里面我们会带上 缓存字段头、cookie 等
- 网络响应拿到 html 页面文件

### 从页面解析构建、渲染层面看

标记生成器 构建 DOM 树、样式树 生成布局树（渲染树）

## 网络协议相关

http response header view source 查看当前网站使用的 http 版本

### http1.0

- 新增了 If-Modified-Since,Expires 来做缓存控制
- 存在带宽浪费

### http1.x

- 支持 host 域（必带 否则 400）主机名
  这是为了虚拟主机服务的 一台物理主机往往会有多台虚拟主机 他们共享同一个 IP
- 默认使用长链接 keep-alive 减少三次握手的浪费 频繁 http 请求得以复用
- 新增 range 头 支持 206（partial content）
- 新增了很多关于错误信息的状态码
- 基于文本解析

### http/2

- 多路复用 同一个 tcp 连接可以同时发送多个 http 请求 二进制分帧法
  降低了延迟同时提高了带宽的利用率 每个 request 对应一个 ID 根据 ID 重新组合为各自的请求
- 新增头部压缩
  HTTP1.x 的 header 很多时候都是重复多余的 选择合适的压缩算法可以减小包的大小和数量
- 基于二进制的协议解析 只认 0 和 1
- 完全兼容 http1.x 的语义

所以以往说的某些减少 http 请求、雪碧图优化 其实在 http/2 已经问题不大了

## 影响网络请求的两个重要因素

### 带宽 （这点我们无需考虑）

### 延迟（主要三点）

- DNS lookup 域名拿到服务器 IP 的过程

  这个通常可以利用 DNS 缓存结果来达到减少这个时间的目的

- TCP 连接 如果 tcp 连接不复用 每次请求都经历三次握手和慢启动

  三次握手在高延迟的场景下影响较明显

  慢启动则对文件类大请求影响较大

- 浏览器阻塞

  根据浏览器限制 对每个域名 最多同时 4-6 个 tcp 连接 后续的只能阻塞

  使用 http/2 请求多路复用 充分利用带宽资源

http/2 跟慢启动:

HTTP 性能优化的关键并不在于高带宽 而是低延迟。TCP 连接会随着时间进行自我「调谐」起初会限制连接的最大速度 如果数据成功传输 会随着时间的推移提高传输的速度。这种调谐则被称为 TCP 慢启动

### TCP 跟 UDP

TCP（传输控制协议）面向连接 可靠的 基于字节流的传输层协议

- 面向连接 双方通讯之前要经过三次握手确认连接
- 可靠性 包括状态及可控性两方面 会精准的记录哪些数据发送、接收、未接收。
  如果网路差发生丢包会控制速度甚至重发 如果接受成功会加快传输 又一个慢启动的过程 是有状态的、可控的

UDP（用户数据报协议）面向无连接的传输层协议 （其他 tcp 具有的特性它都没有）

- 面向字节流
- 无状态、不可控 仅仅继承了 IP 层的特性

两者的适用场景 是否面向连接 是否提供可靠交付 工作效率 实时性 安全性

### TCP 的四次挥手

客户端：我要断开了诶
服务端：收到断开请求 你先等着 我确认好回你
服务端：确认完毕 我要准备关闭了啊
客户端：发个报文确认一下我这边要关了 服务端收到 OK 关闭 此时客户端等最长报文时间没有收到后续报文 OK 关闭

### TFO tcp 快速打开的原理

TFO 的优势并不在与首轮三次握手 而在于后面的握手 在拿到客户端的 Cookie 并验证通过以后 可以直接返回 HTTP 响应 充分利用了 1 个 RTT(Round-Trip Time 往返时延)的时间提前进行数据传输 积累起来还是一个比较大的优势

## nodejs 操作大文件

## vue 相关

## 缓存

### 强缓存

> 200 (from disk cache) 或是 200 OK (from memory cache)
> Chrome 会根据本地内存的使用率来决定缓存存放在哪

```txt
expires: hu, 28 Dec 2017 05:27:45 GMT
```

Expires 有一个很大的弊端 就是它返回的是服务器的时间 但判断的时候用的却是客户端的时间

```txt
<!-- 缓存请求 -->
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached

<!-- 缓存响应 -->
Cache-control: must-revalidate
Cache-control: no-cache 请求服务器比对 也就是跳过强缓存阶段 进入协商缓存
Cache-control: no-store 不使用任何缓存
Cache-control: no-transform 代理服务器不能转换编码
Cache-control: public 表明响应可以被任何对象（包括发送请求的客户端 代理服务器等等）缓存
Cache-control: private 表明响应只能被单个用户缓存 不能作为共享缓存（即代理服务器不能缓存它）
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-control: s-maxage=<seconds>
```

### 启发式缓存阶段

```txt
Age:23146
Cache-Control: public
Date:Tue, 28 Nov 2017 12:26:41 GMT
Last-Modified:Tue, 28 Nov 2017 05:14:02 GMT
Vary:Accept-Encoding
```

如果没有哪个字段明确规定了资源的过期时间 那么跳过强缓存会先来到启发式缓存阶段：

根据响应头中 2 个时间字段 Date 和 Last-Modified 之间的时间差值 取其值的 10%作为缓存时间周期

### 协商缓存

> 304(not modified)

```txt
<!-- response -->
Last-Modified

<!-- request -->
if-Modified-Since
if-Unmodified-Since
```

If-Unmodified-Since 字面意思和 If-Modified-Since 相反 但处理方式并不是相反的。

如果文件在两次访问期间没有被修改则返回 200 和资源 如果文件修改了则返回状态码 412(预处理错误)

- 与含有 If-Range 消息头的范围请求搭配使用 实现断点续传的功能 即如果资源没修改继续下载 如果资源修改了 续传的意义就没有了。
- POST、PUT 请求中 优化并发控制 即当多用户编辑用一份文档的时候 如果服务器的资源已经被修改 那么在对其作出编辑会被拒绝提交

```txt
<!-- response -->
Etag

<!-- request -->
If-None-Match
If-Match
```

### Appcache (H5 新特性)

现在估计没啥用了

### service worker

### 用户行为对缓存的影响

- 重新输入 URL 直接到缓存中拿
- 刷新 向服务器比对
- 强刷 删除缓存之后 在发起请求

## 前端优化

- 从编码上面

  遍历 递归 循环引用内存泄露等

  设置合理的作用域

  高频操作的函数防抖、节流

  事件代理

- 从 DOM 渲染上

  避免高频次的操作 DOM
  比如设计动画的 使用 transform 属性避免不必要的页面回流
  使用 visibility 属性设置可见行
  复杂的 DOM 操作应当使用离屏构建

  对流式布局要针对性编写按需加载的组件

  对大量数据的渲染（往往瓶颈不在 js 而在渲染层面）可以采取时间分片的渲染方式 比如在页面上渲染 10 万条数据
  我们可以编写一个组件渲染 通过 `window.requestAnimationFrame` 接口让浏览器根据实际情况来调度分片

- 从页面构建上

  设置合理的动态路由、骨架屏页面

  对样式文件进行必要的 pre-fetch 避免阻碍页面的最终呈现

  对必要的 script 标签 defer 防止白屏时间过长

- 缓存优化上 编写合理的 service-worker 文件 选择合适的静态资源可以优先走 cacheStorage
  API 数据请求优先

- 从服务器上 对 js、css、html 文件 gzip
