# 配置表

```txt
// 文件变量
@host = 10.1.1.15
@port = 9800
@json = application/json
@form = application/x-www-form-urlencoded
@file = multipart/form-data
@httpVersion = HTTP/1.1
@token =

### get-api 示例
GET https://wx.nnleo.cn/views/users {{httpVersion}}

### post-api示例
POST http://dummy.restapiexample.com/api/v1/create {{httpVersion}}
content-type: {{json}}

{
   "name": "Hendry",
   "salary": "61888",
   "age": 26
}

### 登录API
# @name login
POST http://{{host}}:{{port}}/api/auth/login {{httpVersion}}
Content-Type: {{json}}

{
   "user": {
      "username": "sysadmin",
      "password": "Lfl730811"
   }
}

### 获取链名称
# @name GetChainName
GET http://{{host}}:{{port}}/api/system/init/SetChainName {{httpVersion}}
// 这里Authorization 的 token 可以用固定的也可以用上面那个API的返回值
// Authorization: Bearer {{token}}
Authorization: Bearer {{login.response.body.user.token}}
```
