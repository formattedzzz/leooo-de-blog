# 当 exec 遇上全局匹配

```js
function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe = /num=(\d+)/gi;
var wordRe = /word=(\w+)/i;
var a1 = captureOne(numRe, "num=1");
var a2 = captureOne(wordRe, "word=1");
var a3 = captureOne(numRe, "NUM=1");
var a4 = captureOne(wordRe, "WORD=1");
```

请问 a1~a4 分别是啥

```js
// a1 === "1"
// a3 === null
```

我们把字符串弄长一点

```js
function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe = /num=(\d+)/gi;
console.log(captureOne(numRe, "NUM=1NuM=2NUm=3"));
// "1"
console.log(captureOne(numRe, "NUM=1NuM=2NUm=3"));
// "2"
console.log(captureOne(numRe, "NUM=1NuM=2NUm=3"));
// "3"
```

也就是说 **numRe** 这个正则变量会维护一个内部变量 每调用一次 都会记录一个 **lastIndex**

再次调用会从 **lastIndex + 1** 的位置开始匹配
