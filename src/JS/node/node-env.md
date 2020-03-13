# node 中使用环境变量

## 通过命令行传递

```bash
HOST=wx.nnleo.cn PORT=65534 node bin/www
```

## 使用 .env 文件

```bash
npm install dotenv --save
```

安装 dotenv 依赖读取变量文件 根目录下新建.env 文件 并将其 gitignore 掉

```env
HOST=wx.nnleo.cn
PORT=65534
```

```js
require("dotenv").config();
console.log(process.env.HOST);
// wx.nnleo.cn
console.log(process.env.PORT);
// 65534
```

## 使用 Npm Scripts

新建.launch.json 或者在 .launch.json 加入一个启动配置项

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "program": "${workspaceFolder}/ELECTRON/index.js"
    },
    {
      "name": "launch by npm",
      "request": "launch",
      "cwd": "${workspaceFolder}/src",
      "runtimeExecutable": "npm",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```
