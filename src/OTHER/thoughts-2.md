#

## glob（minimatch）语法

```js
var minimatch = require('minimatch')

minimatch('bar.foo', '*.foo') // true!
minimatch('bar.foo', '*.bar') // false!
minimatch('bar.foo', '*.+(bar|foo)', { debug: true }) // true, and noisy!
```

## man 命令

## 重新捋一捋前端前端操作二进制数据
