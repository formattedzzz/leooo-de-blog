# js 操作 cookie

一个 API 返回只能 **set-cookie** header 字段只能设置一组值

直接访问 **document.cookie** 拿出来的是本域名路径下的所有 cookie 值

- 获取所有 cookie 转化为对象

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
}
```
