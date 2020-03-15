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

- `max-age` 秒数

  ```js
  document.cookie = `name=leooo;max-age=100;`;
  // 100秒后过期
  ```

### `secure` 属性

只会在 `https` 和 `ssl` 等安全协议下传输

### `httponly` 属性

`Cookie` 不想被客户端 `JavaScript` 脚本调用

```txt
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly;
```

### SameSite 属性

可以让该 `cookie` 不被附带到请求中

- `strict`

  浏览器将只发送相同站点请求的 `cookie`(即当前网页 URL 与请求目标 URL 完全一致)。

  如果请求来自与当前 `location` 的 URL 不同的 URL 则不包括标记为 `Strict` 属性的 `cookie`

- `Lax` 默认值 保留一些跨站子请求 如图片加载 `frames` 的调用

- `none` 如果想要指定 Cookies 在同站 跨站请求都被发送 那么需要明确指定 SameSite 为 None
