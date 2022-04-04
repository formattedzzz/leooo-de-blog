#### Regexp 正则表达式

正则需要转义列表：**[ ] \ ^ \$ . | ? \* + ( )**

**匹配字符的数量规则**

**?** 最多 1 个 言下之意就是**可有可无**

**\*** 0 个或者任意个

**+** 最少一个

**{2,4}** 最少 2 个最多 4 个

**匹配模式**

**i g m** 忽略大**小写**、**全局**、**多行**

**范围匹配**

**[abc]** a、b、c 均可

**[^abc]** 排除 abc

**分组的作用 小括号**

**(?=exp)** 关于问号前瞻

```js
'1234567890'.replaceAll(/\B(?=(\d{3})+(?!\d))/g, ($0,$1)=>$0+',')
String(num).replaceAll(/\d(?=(\d{3})+(\.|$))/g, '$&,')

'bing abcing'.match(/\b\w+(?=ing)/g) // ["b", "abc"]
'bing abcing'.match(/\b\w+(?:ing)/g) // ['bing', 'abcing']
'bingcvb abcingnpm'.match(/(?<=ing)\w+\b/g) // ["cvb", "npm"]
'bingcvb abcingnpm'.match(/(?=ing)\w+\b/g) // ['ingcvb', 'ingnpm']
```

**正则匹配规则需要传参数**时需要调用 RegExp 构造函数显式神申明

#### String.prototype

```js
substr(start, length) // 返回新的 原string不受影响
substring(start, [end]) // 返回新的 原string不受影响 第二个参数可选 不传则截到底
```

#### Array.prototype

```js
slice(start, end) // 返回新的 原array不受影响
splice(start, length, ...item) // 返回被删除的 原array会受影响
```

#### canvas.toDataURL() 图片跨域问题

- 转化为 base64 的方式
- 获取 blob 的方式
- 设置 img 跨域属性 account/static/html/url2base64.html

#### Class

- class 内部方法不能枚举 即**Object.keys()** 不能遍历 **Object.getOwnpropertyNames()**可以

- class 内部默认采用严格模式

- 只能当成构造函数 只能通过 **new** 来调用 不能自执行

- constructor 默认返回实例对象 即返回**this** 完全可以修改 一修改就嗝屁了

- 可以通过实例\***\* proto \*\***给类添加方法 与 es5 一致

- class 不存在变量提升 必须先声明后用

- 将实例的方法单独提出来用的 this 需要注意：在构造函数中绑定好 this 或者在构造函数中申明为箭头函数
  静态方法中的 this 指向类本身 而不是实例 实例不能继承静态方法

- 子类可以通过 super 关键字来调用父类静态方法

- **class**类的静态属性只能在外部手动添加 而实例属性是 **key=val** 的形式写在类里面 或在**constructor**里面手动添加

- **new.target** 属性

```js
function Person(name) {
  if (new.target !== undefined) {
    this.name = name
  } else {
    throw new Error('该函数Person必须使用 new 关键字来调用！')
  }
}
```

- Object.getPrototypeOf(ColorPoint) === Point 判断**ColorPoint**是否继承**PointB**

- constrictor 里面 super( ) 相当于 A.prototype.constructor.call(this)。作为函数时 super( ) 只能用在子类的构造函数之中。作为对象时 super 在普通方法之中 指向 A.prototype

- B 中的 super 作为对象时不能访问到 A 中的**实例属性和方法**。当然可以访问挂在**A.prototype**中的属性
  子类普通方法中通过 super 调用父类的普通方法时 方法内部的 this 指向当前的子类实例 super 在静态方法之中指向父类本身 在普通方法之中指向父类的原型对象

- 挂在**父类实例**下的属性 **子类实例**访问不到 不过要看你的父类和 super( ) 是怎么写的 一般都是会实现的
  挂在**父类本身**下的属性 通过实例只能通过类的静态属性访问 如 Date.now()
  挂在**A.prototype**下面的属性 子类实例都能访问到 与挂在子类实例下的属性不冲突

```js
// 挂在实例上
class Leo {
    name= 'ping',
    age= 18
}
// 挂在原型上
Leo.prototype.name = 'ok'
```

- **super** 的三种情况

  - 在构造函数中
  - 在普通方法中
  - 在子类方法中 在普通方法中 在子类静态方法中【两种情况 super 指向不同 B.prototype 和 B 本身】

- ES6 中 class 静态方法 static 只能在静态方法中调用 而且类中不能调用

```js
class WaterFull {
  static fun1() {
    console.log(+Date.now())
  }
  fun2() {
    this.fun1() // 肯定不行 this 都不指向WaterFull本身
    WaterFull.fun1 // 也不行
  }
  static fun3() {
    this.fun1() // this => 类本身
  }
}
WaterFull.fun3() // ok
```

#### node 处理视频流

https://www.jianshu.com/p/85d5c534b4e3

#### 关于 formdata

上传文件的时候 必须在 form 标签里做这样的标识 enctype="multipart/form-data" 这种话格式提交可以用 new FormData 代替避免 submit 引起的页面跳转 这种提交方式一般用在文件(图片视频)上传 所以 在 node.js 里处理这类表单还需要中间件 connect-multiparty

```js
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
app.post('/formdata', multipartMiddleware, function (req, res) {
  console.log(req.body)
  res.send(req.body)
})
```

数据上传默认 contentType 是**x-www-form-urlencoded** 可以被**body-parser**解析**application/json** 格式 常用 节省带宽 **application/x-www-form-urlencoded**

#### Babel-ployfill

模拟实现 es6 中的 Array.of( ) function( ) { return [].slice.call(arguments) }

#### node file

- fs.readdirSync(\_\_dirname) 读取文件所处文件夹下所有文件或文件夹的名字

  ```js
  fs.statSync(path) = {
    dev: 16777220,
    mode: 33188, # 33188：文件 16877：文件夹
    nlink: 1,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4194304,
    ino: 1316112,
    size: 6148,
    blocks: 16,
    atimeMs: 1542786993127.8633,
    mtimeMs: 1532505116000,
    ctimeMs: 1541572768112.636,
    birthtimeMs: 1532505116000,
    atime: 2018-11-21T07:56:33.128Z,
    mtime: 2018-07-25T07:51:56.000Z,
    ctime: 2018-11-07T06:39:28.113Z,
    birthtime: 2018-07-25T07:51:56.000Z
  }
  ```

返回的对象值有 isFile( ) isDirectory( )

fs.mkdirSync(path[, options]) 同步写入或创建(没有的话)文件夹

#### 小程序 formid

小程序 formid 的获得 表单的提交和支付 支付可以获得三个 formid 表单可以获得一个

#### session 方式登录小程序

```js
router.get('/login', function (req, res) {
  console.log(req.query)
  const {code, encryptedData, iv, signature} = req.query
  const {appid, secret} = config
  const { code, encryptedData, iv } = req.payload
  Axios({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    method: 'GET',
    params: {
      appid,
      secret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  }).then((response) => {
      console.log(response.data)
    let { session_key, openid } = response.data
    let pc = new WXBizDataCrypt(appid, session_key)
    let decodedata = pc.decryptData(encryptedData , iv)
    console.log(session_key, openid)
      console.log('解密后用户信息: ', decodedata)
    let {nickName, gender, country, province, city, avatarUrl} = decodedata
      UserTable.findOne({ where: {openid: openid} }).then((user) => {
      if (user) {
        UserTable.update({
          nickname: nickName,
          gender,
          country,
          province,
          city,
          avatar: avatarUrl
          }, {where: {openid: openid} }).then(() => {
            console.log('老用户基本资料更新成功！')
          })
      } else {
        UserTable.create({
            openid,
          nickname: nickName,
          gender,
          avatar: avatarUrl,
          country,
          province,
          city
         }).then(() => {
             console.log('新用户基本资料注入成功！')
         })
       }
        })
    SessionTable.findOne({ where: {openid: openid} }).then((session) => {
    if (session) {
            console.log('有记录')
      let uuid = uuidv1()
      SessionTable.update({session_key: session_key, sessionid: uuid}, {where: {openid: openid} }).then(()=>{
            console.log('老用户sessionID更新成功！')
                res.header('sessionID', uuid)
                res.json({
                    code: 1,
                    message: '自定义登录态成功！',
                    sessionID: uuid
                })
            })
        }else{
          console.log('没记录')
            let uuid = uuidv1()
            SessionTable.create({
            session_key: session_key,
            openid: openid,
            sessionid: uuid
        }).then(()=>{
            console.log('新用户sessionID创建成功！')
            res.header('sessionID', uuid)
            res.json({
                code: 1,
                message: '自定义登录态成功！',
                sessionID: uuid
            })
        })
    })
})
```

#### sequelize

从表中查询出来的原始数据非常的 ugly 需要回炉改造
let arr = new Array(12).fill([ ]) 造出来的数组 每个元素都是引用的 无语

#### 数据劫持

**Object.defineproperty( ) => ES6 proxy** 每个 data 都是一个 proxy 实例

子组件为什么不要擅自改变**props** 单项数据流 父组件更新时 子组件也会更新为最新值

#### 模块化

- commonjs 规范 同步引入模块 引入即执行 显然不能用在前端
- 前端模块化 requirejs AMD 规范 依赖前置 异步引入
- seajs cmd 规范 也是异步引入 就近引入 需要用的时候才会执行
- es6 的模块化 新的模块规范 需要编译 而 webpack 支持所有模块化的写法

#### 中间实例继承

```js
function Fa() {}
var Temp = function () {} // 设置中间函数 用来继承父类构造函数原型下面的而方法
Temp.prototype = Fa.prototype
var Son = function () {
  Fa.call(this) // 通过构造函数调用来继承父类实例下的属性和方法
}
Son.prototype = new Temp() // 因为这是一个空函数，并没有父类实例下的属性跟方法
Son.prototype.constructor = Son // 把原型构造函数重新指向Son
```

这样就算是非常完善了 所以大体上可以分为两种继承模式 拷贝继承和中间实例继承（也叫类式继承）

#### 解决 js Number 精度问题的便捷方法(放缩法)

```js
formatFloat (num1, num2) {
  let baseNum, baseNum1, baseNum2
  try {
    baseNum1  =  num1.toString().split('.')[1].length
        // 获取num1有几位小数
  } catch (e) {
    baseNum1  =  0
  }
  try {
        // 获取num2有几位小数
    baseNum2  =  num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2  =  0
  }
  baseNum  =  Math.pow(10, Math.max(baseNum1, baseNum2))
  return (num1  *  baseNum  +  num2  *  baseNum) / baseNum
}
formatFloat (0.12, 0.3) => 0.42
return (0.12 * 100 + 0.3 * 100) / 100
```

#### 小程序滑动组件 movable-view

#### vue-cli 关于代理表的配置

代理表中的配置只代理当前开发服务器下的主机 如果 axios 全局设置了 baseURL 代理是无效的
pathRewrite: {

​ '\*/api': ' ' //是否要覆盖的'/api' 可能是因为'/api' 是一个在开发环境中的标示 所以可以配置重写

}
this.req({
url: '/api/admin/v1'
})
==> 之后变成了 'http://localhost:8080/admin/v1' 所以一般不要填空

- 如果后端设置了跨域头 那么不需要代理 直接设置 baseURL 即可
- 这个过程属于正向代理 正向代理中代理的过程是客户端 代理机器是作为一个访问客户的身份 而反向代理中代理机器是作为服务身份 服务端对代理的存在无感知 而在反向代理中客户机对代理的存在无感知

#### 小程序之事件注意点

一个元素同时绑定了 touchstart touchmove touchend tap
触发顺序为 start---->move---->tap 如果是单纯的 tap move 的记录值是上一次的 move 事件触发的
解决方案是我们需要在 touchend 的时候清空相关记录值
tap 事件中想要不发 move 中的相关逻辑可以通过记录 start 和 move 的位移来过滤

#### try catch

try catch

- 性能 OK 的！
- 不会丢失错误的完整性
- 不能 catch 异步栈里的错误！这也不是它该管的范畴

简单实验：进行 1000 次 Math.random()操作 平均时间 0.5-0.6ms
用 try catch 在 0.7ms 左右 考虑到业务逻辑中只对少数不确定的错误进行 try catch 性能问题不用担心

在函数体内 try 和 catch 的代码块中的 return 语句执行前都会先执行 finally

且 finally 中 return 掉了 就跳出 **try-catch** 了

#### 一个脚手架的常用包

```json
"cac": "^6.3.8",
"chalk": "^2.4.1",
"conf": "^2.0.0",
"cross-spawn": "^6.0.5",
"download-git-repo": "^1.1.0",
"fs-extra": "^7.0.0",
"hash-sum": "^1.0.2",
"ini": "^1.3.5",
"inquirer": "^6.2.0",
"is-binary-path": "^2.0.0",
"joycon": "^2.1.2",
"jstransformer": "^1.0.0",
"jstransformer-ejs": "^0.2.0",
"log-update": "^2.3.0",
"majo": "^0.6.2",
"micromatch": "^3.1.10",
"ora": "^3.0.0",
"parse-package-name": "^0.1.0",
"resolve-from": "^4.0.0",
"update-notifier": "^2.5.0",
"yarn-global": "^1.1.0"
"chalk": "^2.3.2",
"commander": "^2.15.1",
"download-git-repo": "^1.0.2",
"fs-extra": "^5.0.0",
"inquirer": "^5.2.0",
"lotusjs-util": "^1.0.0",
"moment": "^2.22.0",
"shelljs": "^0.8.1"
```

#### 小程序页面配置

```json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

#### 浏览器渲染机制

- js css html 构成的页面中渲染的相互关系

- 行内脚本和 script 正常引入（不加 defer） 都是同步的 会影响 dom 的构建

- defer 浏览器会异步的下载该文件并且不会影响到后续 DOM 的渲染

- async 加入这个属性怎么说 js 会进行异步的加载 不影响 DOM 树的构建（这一点效果跟 defer 一样）谁先加载完就执行谁 而不是按页面上的前后顺序

- 注意 defer 只是会异步的加载 他的执行的同步代码依然会阻塞 DOM 的构建 而且按页面上的顺序依次执

```html
head
<script src="main.js" defer></script>
main.js 的同步执行需要3s
<script src="main2.js" defer></script>
body
<div>前面的div</div>
<div>前面的div</div>
<div>前面的div</div>
<script>
  alert(123)
</script>
<div>后面的div</div>
<div>后面的div</div>
<div>后面的div</div>
<script>
  window.onload = function () {
    console.log(123)
  }
</script>
```

结果是 main main2 进入异步加载 前面的 div 构建成功 第一块行内脚本解析执行 弹 123 确定之后

才构建好后面的 div

解析执行脚本 2 输出'脚本 2'并绑定 onload 函数 再执行 main 3s 之后执行 main2

最后 onload

css 的加载不会阻塞 DOM 的解析 但是会阻塞渲染 css 加载会阻塞后面 js 语句的执行

```html
head
<script>
  function h() {
    console.log(document.querySelectorAll('h1'))
  }
  setTimeout(h, 0)
</script>
<link
  href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css?v=1"
  rel="stylesheet"
/>
```

脚本能获取到说明 dom 已经构建好了 但是没有渲染出来

DOM 解析和 CSS 解析是两个并行的进程，所以这也解释了为什么 CSS 加载不会阻塞 DOM 的解析。
然而，由于 Render Tree 是依赖于 DOM Tree 和 CSSOM Tree 的，所以他必须等待到 CSSOM Tree 构建完成，也就是 CSS 资源加载完成(或者 CSS 资源加载失败)后，才能开始渲染。

因此，CSS 加载是会阻塞 Dom 的渲染的。
由于 js 可能会操作之前的 Dom 节点和 css 样式，因此浏览器会维持 html 中 css 和 js 的顺序。因此，样式表会在后面的 js 执行前先加载执行完毕。所以 css 会阻塞后面 js 的执行。

#### node_modules 加载规则

1.如果包下有 package.json 文件 并且其中的 main 属性配置的文件能够找到 则加载此文件 2.如果 package.json 文件没有或者它里面 main 属性配置的文件名不能找到 则默认加载当前文件夹下的 index.js 3.如果都没有找到则报错

总之 require( ) 加载 node_modules 的时候是按照 module.paths 数组中的路径一个个查找

#### npm 包前缀

**^1.0.3** 安装当前大版本中的最新版
**～ 1.1.2** 安装的版本前两为一致 最后一位随意
**1.2.2** 精确匹配某个版本

![formatedzzz](http://ghchart.rshah.org/formattedzzz)

#### 测试集成库

mocha 测试框架
chai 断言库 断言通俗来讲就是判断代码结果对不对
jsdom node 端是没有 js dom 对象的 比如 window、document 等等 所以需要这个库提供
istanbul 代码覆盖率计算工具
coveralls 统计上面的代码测试覆盖率工具
travis-ci 自动集成 比如 master 代码 push 到 github 上之后 travis-ci 就会自动进行自动化测试

#### babel-plugin

从定义方法改成引用 那重复定义就变成了重复引用 就不存在代码重复的问题了
babel-runtime 就是这些方法的集合处 因此 在使用 babel-plugin-transform-runtime 的时候必须把 babel-runtime 当做依赖

#### 调试

谷歌浏览器怎么查看页面 js、css 文件的有效利用程度
点开**Coverage** 点击计算 查看源文件 会有红绿行标示

```js
window.addEventListener('blur', () => {})
window.addEventListener('visibilitychange', () => {
  // 通过这方法来获取当前标签页在浏览器中的激活状态。
  switch (document.visibilityState) {
    case 'prerender': // 网页预渲染 但内容不可见
    case 'hidden': // 内容不可见 处于后台状态，最小化，或者锁屏状态
    case 'visible': // 内容可见
    case 'unloaded': // 文档被卸载
  }
})
window.addEventListener('online', onlineHandler)
window.addEventListener('offline', offlineHandler)
new Date().toLocaleTimeString() // "下午5:11:10"
```

#### 视窗尺寸

pageX pageY
类似于 clientX、clientY 相对于浏览器窗口可视区域的 X Y 坐标加上滚动条滚动的长度 说白了就是文档坐标 套用公式就是
pageX = clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft (一般是 0)
offsetX offsetY 相对于事件源元素 "内边框" 的 X Y 坐标
screenX、screenY 相对于显示屏 而不是浏览器窗体的左上角的 X Y 坐标

offsetLeft clientLeft 的区别
offsetLeft 当前元素 **外边框** 相对于最近有定位祖先元素 **外边框** 的左偏移
clientLeft 左边框的宽度

offsetWidth clientHeight 的区别
offsetWidth 算边框
clientWidth 不算边框

document.documentElement ==> <html>...</html>
document.body ==> <body>...</body>

#### 对象方法

扩展对象 阻止对象扩展 让一个对象变的不可扩展 也就是永远不能再添加新的属性

1. **Object.preventExtensions**
2. **Object.isExtensible**
   密封对象 让一个对象密封 并返回被密封后的对象 密封对象是指那些不能添加新的属性 不能删除已有属性 以及不能修改已有属性的可枚举性、可配置性、可写性 但可以修改已有属性的值的对象
3. **Object.seal**
4. **Object.isSealed**
   冻结对象 这个方法比 Object.seal 更绝 冻结对象是指那些不能添加新的属性 不能修改已有属性的值 不能删除已有属性 以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说 这个对象永远是不可变的
5. **Object.freeze**
6. **Object.isFrozen**

移动端 1 像素模糊的问题 **transform** + 伪类

#### URLSearchParams( )

通过这个接口拿到反序列化之后的查询参数 支持遍历 get 等操作

#### new 关键字都干了什么

```js
function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}
```

#### for-in 性能优化

一个有 200000 个属性的对象用 for-in 遍历首次会耗时严重、第二次开始会减少 因为第一次要把所有 key 值取出来

最好还是先用**Object.keys( )**取出来 其耗时优于**for-in**首次耗时

for in 内部应该也是调用了类似于 **Object.keys( )**

对比整数的 key 可以发现 string 做为 key 性能明显下降 耗时是 integer 类型 key 的 3~4 倍 Hash 计算是有代价的

#### Map WeakMap Set WeakSet

为什么 WeakMap 可以避免内存泄露

- **Set**

```js
var set = new Set()
set.add(window)
set.has(window) // true
set.size // 1
set.add(window)
set.add(1)
set.size // 2
set.delete(window)
set.has(window) // false
set.clear()
set.size // 0
```

- **Map**

用**entries( )、keys( )、values( )** 和 **es6 for of** 遍历

```js
var map = new Map()
var key1 = {
  toString: function () {
    return 2
  }
}
var key2 = 2
map.set(key1, 1)
map.set(key2, 2)
map.has(key1) // true
map.has('2') // false，类型不同
map.delete(2)
map.size // 1
map.get(key2) // undefined
```

- **WeakMap**

  WeakMap 相对于普通的 Map 也是键值对集合

  只不过 WeakMap 的 key 只能是非空对象（non-null object) WeakMap 对它的 key 仅保持弱引用

  也就是说它不阻止垃圾回收器回收它所引用的 **key**

  **WeakMap**最大的好处是可以避免内存泄漏

  一个仅被 **WeakMap** 作为 **key** 而引用的对象 会被垃圾回收器回收掉

#### 写一个栈结构

```js
function Stack() {
  let items = []
  this.push = function (element) {
    items.push(element)
  }
  this.pop = function () {
    let s = items.pop()
    return s
  }
  this.peek = function () {
    return items[items.length - 1]
  }
  this.isEmpty = function () {
    return items.length == 0
  }
  this.size = function () {
    return items.length
  }
  this.clear = function () {
    items = []
  }
}
```

这样的问题是每 new 一个 Stack 就会在内存中生成一个**items**副本

```js
let Stack = (function () {
  // 这样写可以把每个实例及实例所对应的栈结构以键值对的形式都存在weakMap中 避免内存泄露
  const items = new WeakMap()
  class Stack {
    constructor() {
      items.set(this, [])
    }
    getItems() {
      let s = items.get(this)
      return s
    }
    push(element) {
      this.getItems().push(element)
    }
    pop() {
      return this.getItems().pop()
    }
    peek() {
      return this.getItems()[this.getItems.length - 1]
    }
    isEmpty() {
      return this.getItems().length == 0
    }
    size() {
      return this.getItems().length
    }
    clear() {
      this.getItems() = []
    }
  }
  return Stack
})()
```

可以解决十进制转为二进制的问题、任意进制转换的问题、平衡园括号问题、汉罗塔问题

```js
// 例子十进制转二进制问题
function divideBy2(decNumber) {
  var remStack = new Stack(),
    rem,
    binaryString = ''
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }
  return binaryString
}
// 任意进制转换的算法
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    binaryString = '',
    digits = '0123456789ABCDEF'
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }
  while (!remStack.isEmpty()) {
    binaryString += digits[remStack.pop()].toString()
  }
  return binaryString
}
```

#### 自己实现 Promise

```js
var a = new Promise((resolve, reject) => {
  resolve(123)
})
a.then(v => {
  console.log(v)
})
setTimeout(() => {
  a.then(v => {
    console.log(v)
  })
}, 0)
// then 方法是放在同异步中都会执行的
```

#### 怎么实现鼠标在某个元素上滑动不引起页面 scroll、移动端呢

https://github.com/smackgg/vue-scroll-lock/blob/master/src/vue-scroll-lock.vue

**this.\$el.removeEventListener('wheel', this.onWheelHandler, false)**

#### 精灵图片生成器

https://spritegen.website-performance.org/

**clip-path** 具有四个属性

circle( )

ellipse( )

inset( ) **t r b l**的顺序 边界值 跟设置**padding**一样 padding 部分将被裁减 可以设置百分比

polygon( )

正方形变成菱形：**clip-path:polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);**

#### clip

裁剪掉左半部分<**100px \* 100px**>：**rect(0, auto, auto, 50px)**

裁剪掉上半部分<**100px \* 100px**>：**rect(50px, auto, auto, 0)**

#### CSS3 画环形图

#### spritejs 了解一下

#### 从滴滴开源的 cubeui 了解后编译

#### canvas 性能优化利用缓存(离屏渲染)

使用缓存也就是用离屏 canvas 进行预渲染了。原理很简单 就是先绘制到一个离屏 canvas 中 然后再通过**drawImage**把离屏 canvas 画到主 canvas 中

1. 通常使用 canvas 绘画，都是每隔多少毫秒清空画布重新使用画笔重新绘制
2. 缓存的原理就是将需要绘制的图形先画出来保存为 **"贴纸"**
3. 然后每隔多少毫秒，清空画布，将贴纸贴到一个新的位置
4. 省去了每次绘制图形的步骤

#### 比较理想的 rem 适配应该是大概应该是这样的

桌面端 因为桌面端不需要跟随可视区的变化而改变根字体大小

**document.documentElement.style.fontSize = '16px'**

移动端 根据屏幕宽度来定 一屏就是 25rem

**document.documentElement.style.fontSize = '4vw'**

#### 前端 js 操作 cookie

一个 API 返回只能**set-cookie**header 字段只能设置一组值

直接访问**document.cookie** 拿出来的是本域名路径下的所有 cookie 值

**写入一组 cookie**

```js
document.cookie = `${key}=${val};expires=${new Date(
  Date.now() + timespan
).toGTMString()}`
```

**获取 cookie 中某个 key 的值**

需要写个函数取出所有的**cookie**自己去截取出来

**删除某个 cookie**

跟设置 cookie 一样 把有效期设为过期时间就行了

#### js 内存管理

- 什么情况下内存会被垃圾回收机制自动处理

- 以前循环引用导致的内存泄漏

- **标记清除算法** 判断标志 从全局对象出发无法再获取他们的引用

- 通过 chrome 浏览器 performance 检查内存占用的情况

- node 中可以使用**process.memoryUsage**接口**heapUsed**字段来查看

  rss（resident set size）：所有内存占用，包括指令区和堆栈

  heapTotal："堆"占用的内存，包括用到的和没用到的

  heapUsed：用到的堆的部分

  external： V8 引擎内部的 C++ 对象占用的内存

常见的内存泄漏案例

- 意外的全局变量

- 定时器操作不当

- 闭包的使用不当 闭包函数 里面还能访问到不需要再用的变量

- dom 的引用 dom 都被移除了 代码在 runtime 的时候还在操作跟相关 dom 相关的变量

#### 单例模式很简单的写法

写一个普通的类 然后再暴露一个方法 getSingleTon

```js
var Singleton = function (name) {
  this.name = name
}
Singleton.prototype.getName = function () {
  return this.name
}
// 获取实例对象
Singleton.prototype.getSingleTon = (function () {
  var instance = null
  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
// 测试单体模式的实例
var a = getSingleTon('aa')
var b = getSingleTon('bb')
a === b // true
```

创建对象和管理单例的职责被分布在两个不同的方法中. 这两个方法组合起来才具有单例模式的威力

#### 关于前端编码

**encodeURIComponent** **decodeURIComponent** String 与 unicode 之间的转换

```js
str = 'A'
code = str.charCodeAt() // 65
str2 = String.fromCharCode(code) // 'A'
str3 = String.fromCharCode(0x60 + 26) // 'z'
// 普通字符串转ASCII
```

**atob btoa** ASCII 与 binary 之间的转换

**btoa** base64 的编码原理

**btoa** 不能转换中文的问题 可以调用 encodeURIComponent 先转为 unicode

IE9 以下不支持 atob btoa 该怎样兼容？

```js
//1. charcode
'A'.charCodeAt().toString(2) //"1000001"
//2. 7位前面补成8位 加一个0
"1000001".padStart(8, '0') //"01000001"
//3. 为了达到24位的整数倍，补两个0x00
"01000001" + '00'.repeat(8) //"010000010000000000000000"
//4. 按6位一组分开
["010000", "010000", "000000", "000000"]=> [16,16,0,0] => [Q,Q,A,A]

//查表得到字符串,两个==表示补了两字节0x00，也取代了原来的A的作用，补了0x00之后，生成的base64字符串末尾肯定是0
`QQ==`
```

```js
// 从input元素中读取一个文件：
let fileInput = document.getElementById('file')
fileInput.onchange = console.log(fileInput.files[0])
// 直接创建一个
let file = new File(['1'], '1.txt')
file instanceof File // true
file instanceof Blob // true
```

file 和其他类型之间的转换是一个异步的过程，是通过 fileReader 来实现的，转换的结果在 reader 的 onload 事件中获取，代码如下：

- file to base64
  dataUrl 除去 MIME 信息以外才是 base64 的数据

```js
let reader = new FileReader(file)
reader.onload = event => console.log(event.target.result)
reader.readAsDataURL(file)
```

- file to arrayBuffer

```js
let reader = new FileReader(file)
reader.onload = event => console.log(event.target.result)
reader.readAsArrayBuffer(file)
```

- file to binaryString

```js
reader.readAsBinaryString(file)
```

- base64 to file

```js
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
```

#### performance.timing 性能分析

```js
function logLoadInfo() {
  setTimeout(function () {
    let t = performance.timing
    console.log(
      'DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0)
    )
    console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
    console.log(
      'request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0)
    )
    console.log(
      '解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0)
    )
    console.log(
      '白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0)
    )
    console.log(
      'domready时间 ：' +
        (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0)
    )
    console.log(
      'onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0)
    )
    if ((t = performance.memory)) {
      console.log(
        'js内存使用占比 ：' +
          ((t.usedJSHeapSize / t.totalJSHeapSize) * 100).toFixed(2) +
          '%'
      )
    }
  })
}
```

#### 网页全屏

```js
// 进入全屏
function toFullScreen() {
  let elem = document.body
  elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert('浏览器不支持全屏')
}
// 退出全屏
function exitFullscreen() {
  let elem = parent.document
  elem.webkitCancelFullScreen
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
    ? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert('切换失败,可尝试Esc退出')
}
```

#### 前端怎么优雅的下载代码

```js
// 前端要用js处理a链接的定向问题
// filename 就是模拟的a标签的download属性 决定了下载的默认文件名
function downloadFile(filename, data) {
  let DownloadLink = document.createElement('a')
  if (DownloadLink) {
    document.body.appendChild(DownloadLink)
    DownloadLink.style = 'display: none'
    DownloadLink.download = filename
    DownloadLink.href = data
    if (document.createEvent) {
      let DownloadEvt = document.createEvent('MouseEvents')
      DownloadEvt.initEvent('click', true, false)
      DownloadLink.dispatchEvent(DownloadEvt)
    } else if (document.createEventObject) DownloadLink.fireEvent('onclick')
    else if (typeof DownloadLink.onclick == 'function') DownloadLink.onclick()
    document.body.removeChild(DownloadLink)
  }
}
// 后端对应的地址直接返回流 前端直接用浏览器去访问这个路由就会触发下载
home.get('/blob', async ctx => {
  ctx.type = 'octet-stream'
  let data = await fs.readFileSync(
    path.resolve(__dirname, '../static/img/mp1.jpg')
  )
  console.log(data)
  ctx.body = data
})
```

#### Blob 对象(Binary large Object)

```js
// 文件上传时通过转换为bloburl来实现预览
$('.test-file').change(function (e) {
  let file = e.currentTarget.files[0]
  console.log(typeof file, file instanceof Blob) // object true
  const src = URL.createObjectURL(file)
  // console.log(src)
  // blob:http://localhost:7006/866a4808-7336-4ab6-b506-321bd0f024e0
  var img = new Image()
  img.src = src
  img.onload = function () {
    document.body.append(img)
  }
})
```

#### URL.createObjectURL()

Blob 其实是一个可以当作文件用的二进制数据 我们可以通过接口**URL.createObjectURL()**生成一个指向 Blob 的地址 参数本质就是一个 blob 对象

需要注意的是 即使是同样的二进制数据 每调用一次**URL.createObjectURL**方法 就会得到一个不一样的 Blob URL 这个 URL 的存在时间 等同于网页的存在时间 一旦网页刷新或卸载 这个 Blob URL 即失效

#### Blob 与 ArrayBuffer 的互转

```js
// 创建一个以二进制数据存储的html文件
const text = '<div>hello world</div>'
const blob = new Blob([text], { type: 'text/html' })
// Blob {size: 22, type: "text/html"}
// 以文本读取
const textReader = new FileReader()
textReader.readAsText(blob)
textReader.onload = function () {
  console.log(textReader.result)
  // <div>hello world</div>
}
// 以ArrayBuffer形式读取
const bufReader = new FileReader()
bufReader.readAsArrayBuffer(blob)
bufReader.onload = function () {
  console.log(new Uint8Array(bufReader.result))
  // Uint8Array(22) [60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 60, 47, 100, 105, 118, 62]
}
```

```js
// 我们直接创建一个Uint8Array并填入上面的数据
const u8Buf = new Uint8Array([
  60,
  100,
  105,
  118,
  62,
  104,
  101,
  108,
  108,
  111,
  32,
  119,
  111,
  114,
  108,
  100,
  60,
  47,
  100,
  105,
  118,
  62
])
const u8Blob = new Blob([u8Buf], { type: 'text/html' }) // Blob {size: 22, type: "text/html"}
const textReader = new FileReader()

textReader.readAsText(u8Blob)
textReader.onload = function () {
  console.log(textReader.result)
  // 同样得到div>hello world</div>
}
```

#### new Blob()两个参数分别是什么

- 第一个参数

**ArrayBuffer** **ArrayBufferView** **Blob** **DOMString ** 二进制数据序列构成的数组

ArrayBuffer 涉及面比较广 我的理解是 ArrayBuffer 代表内存之中的一段二进制数据 **一旦生成不能再改** 可以通过视图（**TypedArray**和**DataView**）进行操作

- 第二个可选参数（BlobPropertyBag 字典）

**{type: "application/octet-binary"}**

**{type: "application/json"}**

**{type: "video/mpe4"}**

**{type: application/octet-stream}**

#### 浏览器端的事件

**DOM0**级事件

```js
dom.onclick = function () {
  console.log('dom0 event')
}
dom.onclick = function () {
  console.log('dom0 event2')
  // 重新绑定会被覆盖
}
// <div onclick="aaa()"></div>
function aaa() {
  console.log('dom0 event')
}
```

**DOM2**级事件

addEventListener、jq 里面的事件绑定也都是基于 DOM2 级

```js
var p = document.getElementById('p')
var c = document.getElementById('c')
// addEventListener第三个参数默认是false 冒泡时执行
c.addEventListener(
  'click',
  function () {
    alert('子节点捕获')
  },
  true
)
c.addEventListener('click', function (e) {
  alert('子节点冒泡')
})
p.addEventListener(
  'click',
  function () {
    alert('父节点捕获')
  },
  true
)
p.addEventListener(
  'click',
  function () {
    alert('父节点冒泡')
  },
  false
)
// DOM2级事件不影响已绑定的DOM0级事件
p.onclick = function (e) {
  console.log(this, e)
}
// jq的多重绑定写法
$('#app').on({
  touchstart: function () {
    timeOutEvent = setTimeout(function () {
      // 此处为长按事件
    }, 500)
  },
  touchmove: function () {
    clearTimeout(timeOutEvent)
    timeOutEvent = 0
    e.preventDefault()
  },
  touchend: function () {
    clearTimeout(timeOutEvent)
    if (timeOutEvent !== 0) {
      // 此处为点击事件
    }
    return false
  }
})
```

#### 事件对象 e 的 一些属性

**isTrusted** 区分是原生的事件还是自定义事件

#### 熟悉一下原生 js 的自定义事件

```html
<body>
  <div id="app">假如这里是模态框</div>
  <button data-type="1" class="emit">button1</button>
  <button data-type="2" class="emit">button2</button>
  <script>
    var app = document.getElementById('app')
    // 原生的自定义事件
    $('.emit').click(function (e) {
      var ev = new CustomEvent('customEventName', {
        detail: {
          type: e.target.dataset.type,
          name: 'leooo'
        }
      })
      app.dispatchEvent(ev)
    })
    // 监听事件：
    app.addEventListener('customEventName', e => {
      console.log(e)
      console.log(e.detail.type)
    })
  </script>
</body>
```

#### jq 自定义事件

```js
// <div id="app2">1234566 这里是模态框2</div>
// <button data-type="1" class="emit2">jqbutton1</button>
// <button data-type="2" class="emit2">jqbutton2</button>

$('#app2').bind('leoevent', function (e, ...argv) {
  console.log(e, argv)
})
$('.emit2').click(function (e) {
  $('#app2').trigger('leoevent', [e.target.dataset.type, 'leooo'])
})
```

#### 移动端 300ms 点击延时问题

移动端浏览器的默认显示宽度是 980px(不同机型各异 但相差不大) 而不是屏幕的宽度(320px 或其他) 为了对早期普通网页更好的体验 iphone 设计了双击放大显示的功能 这就是 300ms 延迟的来源。 如果用户一次点击后 300ms 内没有其他操作 则认为是个单击行为 否则为双击放大行为

**目前较为成熟的方案**

- 视口设置为不能缩放

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,maximum-scale=1, minimum-scale=1"
/>
```

不能缩放就不会有双击缩放操作 因此 click 事件也就没了 300ms 延迟 这个是 Chrome 首先在 Android 中提出的

- 引入其他库 **fastclick** 或者 **hammer.js**

#### 浏览器的 http 请求

Chrome 浏览器支持 6 个请求的并行下载，后面的请求将会推入请求队列中或者停滞不前。一旦前面的六个请求之一完成，队列中的一个请求将会启动

同一域名下太多请求发出。在 HTTP/1.0 或者 HTTP/1.1 连接下，Chrome 对于同一主机支持最多同时 6 个 TCP 链接

**TTFB** time to first byte

请求花费很长时间来接受到服务器传来的第一个字节

**原因**

- 客户端和服务器之间的链接慢
- 服务器反应迟缓，在本地启动服务，如果你依然有一个很慢的`TTFB`，那说明服务器链接或者服务器本身反应很慢

**解决方案**

- 如果是连接缓慢，考虑将你的内容放到 CDN 上面或者更换服务器提供商
- 如果是服务反应慢，考虑优化数据库请求、实施缓存或者更改服务器配置

#### 斐波那契数列递归性能你真的了解过吗

#### webpack 和 commonjs 模块机制是怎样处理循环引用的

#### history    API 了解一下

情景来源：某个页面初始化后通过页面交互 ajax 请求的数据要反应在 url 里面

**window.history** 对象

```js
history.pushState(
  { name: 'leooo' },
  'history-title',
  '/leooo/bob?name=leo&age=23'
)
// pushState并不会引起任何加载、刷新 但是会记录到页面路由的历史栈中
```

第一个参数可以 state 通过**history.state**访问得到 第三个参数如果是斜杠开头的就会直接替换掉当前的 location.pathname

```js
history.replaceState()
history.back()
history.forward()
history.go(1)
history.go(-1)
// history的改变就会触发 popState 事件
window.onpopstate = function () {}
```

#### import export

```js
export let a = 12
// <==>等价于
let a = 12
export {a}

// 导出重定向
export {default} from './other-module'
export * from './other-module'
```
