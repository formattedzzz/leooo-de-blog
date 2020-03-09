# 操作 cookie

一个 API 返回只能 **set-cookie** header 字段只能设置一组值

直接访问 **document.cookie** 拿出来的是本域名路径下的所有 cookie 值

- 写入一组 **cookie**

  ```js
  document.cookie = `${key}=${val};expires=${new Date(
    Date.now() + timespan
  ).toGTMString()}`;
  ```

- 获取 **cookie** 中某个 key 的值

  需要写个函数取出所有的 **cookie** 自己去截取出来

- 删除某个 **cookie**

  跟设置 **cookie** 一样 把有效期设为过期时间就行了
