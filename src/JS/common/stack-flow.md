# 递归栈溢出

## 普通优化

```js
var map = {};
function feibo(n) {
  if (map[n]) {
    // console.log(map[n])
    return map[n];
  }
  if (n > 2) {
    map[n] = feibo(n - 1) + feibo(n - 2);
    return map[n];
  } else {
    return 1;
  }
}

var feibo0 = (function() {
  var map = {};
  return function feibo(n) {
    if (map[n]) {
      // console.log(map[n])
      return map[n];
    }
    if (n > 2) {
      map[n] = feibo(n - 1) + feibo(n - 2);
      return map[n];
    } else {
      return 1;
    }
  };
})();

// 性能是最差的 n超过一定值（40）会急剧上升
function feibo1(n) {
  if (n > 2) {
    return feibo1(n - 1) + feibo1(n - 2);
  } else {
    return 1;
  }
}

// 斐波那契数列
function feibo2(num) {
  var i = 1;
  var j = 1;
  var k = 2;
  for (let n = 3; n <= num; n++) {
    [i, j, k] = [j, k, j + k];
  }
  if (num <= 2) return 1;
  return j;
}

// console.time('map')
// console.log(feibo(60));
// console.timeEnd('map')
// 外部有map

// console.time('warpmap')
// console.log(feibo0(60));
// console.timeEnd('warpmap')
// 性能最好 应为访问map作用域更近

// console.time('nomap')
// console.log(feibo1(60));
// console.timeEnd('nomap')
// 一度卡死 塞入的执行栈太多

// console.time('for')
// console.log(feibo2(60));
// console.timeEnd('for')
// 性能也可以的

// 1548008755920
// map: 2.843ms
// 1548008755920
// warpmap: 0.127ms
// 1548008755920
// for: 0.157ms
```

很显然 普通斐波那契数列尾递归的算法调用栈是呈指数增长 随着 n 的增大要不了多少便会栈溢出

## 尾递归优化

```js
function f(n, prev, next) {
  if (n <= 1) {
    return next;
  }
  return f(n - 1, next, prev + next);
}
```

return 时在进行递归调用 让调用栈不再有叠加态 因为此时已经 return 完了
这就是 `O(1)` 的复杂度

解决参数的饿问题可以：

- 尾递归 + 函数柯理化
- 尾递归 + ES6 默认赋值

## 尾调用跟尾递归的区别

单纯的尾调用自身即是尾递归
