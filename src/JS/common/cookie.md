# js 操作 cookie

## 增删改查

一个 API 返回只能 **set-cookie** header 字段只能设置一组值

直接访问 **document.cookie** 拿出来的是本域名路径下的所有 cookie 值

- 获取所有可访问的 `cookie` 键值对转化为对象

```js
function getCookieMap() {
  var cookieArray = document.cookie; //获取cookie存储字符串
  var cookieMap = {};
  var arr = cookieArray.split(";");
  if (arr && arr.length) {
    arr.forEach(cook => {
      const [key, val] = cook.split("=");
      cookieMap[key.trim()] = val;
    });
  }
  return cookieMap;
}
```

- 写入一组 **cookie**

```js
document.cookie = `${key}=${val};expires=${new Date(
  Date.now() + timespan
).toGTMString()}`;
// 函数方式
function setcookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  var expires = d.toGMTString();
  document.cookie = name + "=" + value + ";expires=" + expires;
}
```

- 获取 **cookie** 中某个 key 的值

需要写个函数取出所有的 **cookie** 自己去截取出来

```js
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
```

- 删除某个 **cookie**

跟设置 **cookie** 一样 把有效期设为过期时间就行了

```js
function delCookie(name) {
  document.cookie = name + "=;expires=" + new Date(0).toGMTString();
```

## 注意的点

### 访问 `document.cookie` 一次只能设置一个键值对

### `value` 属性

包含逗号、分号、斜杠 需要转义 最好都 `encodeURIComponent` 一下

### `path` 属性

path 这个属性默认是 `"\"` 这个值匹配的是 web 的路由

### 有效期属性

默认保存到浏览器关闭 值为 `session`

- `expires` 时间点

  ```js
  document.cookie = `name=leooo;expires=${new Date(Date.now() + 100000)};`;
  // 100秒后过期
  ```

- `max-age` 秒数 其优先级高于 `expires`

  ```js
  document.cookie = `name=leooo;max-age=100;`;
  // 100秒后过期
  document.cookie = `name=leooo;max-age=0;`;
  // 立即删除该组cookie值
  document.cookie = `name=leooo;max-age=100;`;
  // 跟会话效果一样 浏览器关闭则cookie消失
  ```

### `secure` 属性

只会在 `https` 和 `ssl` 等安全协议下传输

### `httponly` 属性

`Cookie` 不想被客户端 `JavaScript` 脚本调用

```txt
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly;
```

### SameSite 属性

让 `Cookie` 在跨站请求时不会被发送 有三个可以设置的值 仅 https 条件下可以设置 `SameSite=none` 必须同时加上 `Secure` 属性 所以我们要测试的话 先把 localhost https 化

首先我们来明确一下 跨域跟跨站的区别

- 跨域 协议/主机名/端口 均需一致

- 跨站 不需要考虑协议和端口 有效顶级域名+二级域名 一致即可

  `www.a.nnleo.cn` `www.b.nnleo.cn` 同站 顶级域名相同

  `blog.nnleo.cn` `wx.nnleo.cn` 跨站 独立的二级域名

#### **`strict`**

浏览器将只发送相同站点请求的 `cookie`(即当前网页 URL 与请求目标 URL 完全一致)。

如果请求来自与当前 `location` 的 URL 不同的 URL 则不包括标记为 `Strict` 属性的 `cookie`

#### **`Lax`**

80 版+ `chrome` 的默认值 在跨站的情况下 一部分情况的请求仍会发送 cookie

|   请求类型   |      Lax      |
| :----------: | :-----------: |
|    a 链接    |  发送 cookie  |
| link 预加载  |  发送 cookie  |
|   get 表单   |  发送 cookie  |
|  post 表单   | 不发送 cookie |
|    iframe    | 不发送 cookie |
| 类 ajax 请求 | 不发送 cookie |
|  image 标签  | 不发送 cookie |
|              |               |

#### **`none`**

老版本默认值 如果想要指定 `Cookies` 在同站、跨站请求都被发送 那么需要明确指定 `SameSite` 为 `None`
