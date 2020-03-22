# 实现一个极简版的 promise

## 基本实现

```js
function Promise2(excution) {
  var self = this;
  self.callBackList = [];
  self.status = Promise2.status.pendding;
  self.resolveData = null;
  function resolve(value) {
    setTimeout(() => {
      self.resolveData = value;
      self.status = Promise2.status.resolved;
      self.callBackList.forEach(func => {
        func(value);
      });
    });
  }
  excution(resolve.bind(self));
}
Promise2.status = {
  pendding: "pendding",
  resolved: "resolved",
  rejected: "rejected"
};
Promise2.prototype.then = function(callback) {
  var self = this;
  return new Promise2(resolve => {
    if (self.status === Promise2.status.resolved) {
      console.log("status resolved");
      var callbackReturn = callback(self.resolveData);
      if (callbackReturn instanceof Promise2) {
        callbackReturn.then(thenProRes => resolve(thenProRes));
      } else {
        callbackReturn ? resolve(callbackReturn) : resolve(self.resolveData);
      }
      return;
    }
    // console.log("self.status", self.status, self.resolveData, callbackReturn);
    self.callBackList.push(function() {
      var callbackReturn = callback(self.resolveData);
      if (callbackReturn instanceof Promise2) {
        callbackReturn.then(thenProRes => resolve(thenProRes));
      } else {
        resolve(callbackReturn);
      }
    });
  });
};

var pro = new Promise2(resolve => {
  resolve("leo");
});
setTimeout(() => {
  pro
    .then(v => {
      console.log(v);
      return new Promise2(resolve => {
        setTimeout(() => resolve(v + v));
      });
    })
    .then(v => {
      console.log(v);
      return v;
    })
    .then(console.log);
});
```

## 来看一道面试题的执行顺序

```js
new Promise((resolve, reject) => {
  console.log("log: 外部promise");
  resolve();
  //---------------@1
})
  .then(() => {
    console.log("log: 外部第一个then");
    //---------------@2
    new Promise((resolve, reject) => {
      console.log("log: 内部promise");
      //---------------@3
      resolve();
    })
      .then(() => {
        console.log("log: 内部第一个then");
        //---------------@4
      })
      .then(() => {
        console.log("log: 内部第二个then");
        //---------------@5
      });
  })
  .then(() => {
    console.log("log: 外部第二个then");
    //---------------@6
  });
// log: 外部promise
// log: 外部第一个then
// log: 内部promise
// log: 内部第一个then
// log: 外部第二个then
// log: 内部第二个then
```

首先我们明确两个概念 `入栈微任务执行` `入栈所属promise内部队列`

`@1` 之后马上该 `promise` 状态就变成了 `resolved` (且清空之前的所有执行栈)

这时候 `.then` 添加的函数马上就会 `入栈微任务执行`

于是微任务入栈 外部第一个 `then` 而链式调用的外部第二个 `then` 回调是 `入栈所属promise内部队列`

于是来到了 `@2`、`@3`

同理同步的来到 `@4` 但是 `@5` 那步的回调并不会立即执行 而是入栈 `@4` 那步返回的 `promise` 内部队列

所以至此 `@1` 所在的函数 `.then` 的同步操作完了 回来执行 `入栈微任务执行` 的 `@6` 最后 `@5`

## 链式调用的分开调用的区别

分开调用都是入栈同一个 promise 对象 执行都是在同一轮事件循环 拿到的值也是一样的
