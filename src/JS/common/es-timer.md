# 用 setTimeout 实现合理的 setInterval

> "在开发环境下 很少使用间歇调用（setInterval） 原因是后一个间歇调用很可能在前一个间歇调用结束前启动"

## 由于 js 执行机制 setInterval 的固有弊端

JS 执行遇到 setInterval 便会间歇性将函数体插入到异步队列 不管先插入的函数体是否执行完 就开始计时 比如间歇时间是 500ms 那么不管那时候前一个方法是否已经执行完毕 都会把后一个方法放入执行的序列中。这时候就会发生一个问题 假如前一个方法的执行时间超过 500ms 加入是 1000ms 那么就意味着 前一个方法执行结束后 后一个方法马上就会执行 因为此时间歇时间已经超过 500ms 了。简单来说导致两个问题：

- 某些间隔会被跳过

- 多个定时器的代码执行时间可能会比预期小

```js
var executeTimes = 0;
var intervalTime = 500;
var intervalId = null;
var oriTime = new Date().getTime();

function intervalFun() {
  executeTimes++;
  var nowExecuteTimes = executeTimes;
  var timeDiff = new Date().getTime() - oriTime;
  console.log(
    "doIntervalFun——" + nowExecuteTimes + ", after " + timeDiff + "ms"
  );
  var delayParam = 0;
  sleep(1000);
  console.log("doIntervalFun——" + nowExecuteTimes + " finish !");
  if (executeTimes == 5) {
    clearInterval(intervalId);
  }
}

function timeOutFun() {
  executeTimes++;
  var nowExecuteTimes = executeTimes;
  var timeDiff = new Date().getTime() - oriTime;
  console.log(
    "doTimeOutFun——" + nowExecuteTimes + ", after " + timeDiff + "ms"
  );
  var delayParam = 0;
  sleep(1000);
  console.log("doTimeOutFun——" + nowExecuteTimes + " finish !");
  if (executeTimes < 5) {
    setTimeout(arguments.callee, intervalTime);
  }
}
//sleep是一个普通的'睡觉'函数,sleep(1000)表示运行该函数会花费1秒
function sleep(sleepTime) {
  var start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > sleepTime) {
      break;
    }
  }
}

// intervalId = setInterval(intervalFun,intervalTime);

setTimeout(timeOutFun, intervalTime);
```

## 效果实现

分别运行上面最后两行代码：

- **setInterval**

![执行setInterval](https://i.loli.net/2017/12/14/5a325f826e03e.png)

可以发现 fun2 和 fun1 开始的间歇接近 1000ms 刚好就是 fun1 的执行时间 也就意味着 fun1 执行完后 fun2 马上就执行了 和我们间歇调用的初衷背道而驰

- **setTimeout**

![执行setTimeout](https://i.loli.net/2017/12/14/5a325f82532ff.png)

fun1 和 fun2 相差了 1500ms = 1000 + 500 fun2 在 fun1 执行完的 500ms 后执行

setTimeout 在内部实现了递归调用配合硬性判断条件来触发

因为这里的 sleep 函数是同步的 代码均为依次执行

## 整理出来

```js
function getNewInterval() {
  // 这里通过构造函数返回一个函数 这样就不会在清除的时候把所有的定时器都清掉了
  function myInterval() {
    var args = arguments;
    myInterval.timeId = setTimeout(() => {
      if (typeof args[0] === "function") args[0]();
      args.callee(...args);
    }, args[1]);
    // return myInterval.timeId;
    // 这里return是没用的 因为 args.callee 一调用 myInterval 一直执行 不会有返回值
  }
  myInterval.clear = () => {
    clearTimeout(myInterval.timeId);
  };
  return myInterval;
}
```

测试一下

```js
function sleep(sleepTime) {
  var start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > sleepTime) break;
  }
}
var call = () => {
  sleep(500);
  console.log("call excuted", Math.ceil(new Date().getTime() / 1000), "s");
};

var newInterval = new getNewInterval();

newInterval(call, 500);

var timer = setTimeout(() => {
  newInterval.clear();
  clearTimeout(timer);
}, 6000);

// call excuted 1584020089 s
// call excuted 1584020090 s
// call excuted 1584020091 s
// call excuted 1584020092 s
// call excuted 1584020093 s
// call excuted 1584020094 s
```
