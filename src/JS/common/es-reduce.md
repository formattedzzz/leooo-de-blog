# reduce 的用法

1、参数一 callback

callback 回调四个参数分别是

- prev 上一次数组项传进去回炉改造的返回值
- cur 当前值
- idx 索引
- arr 调用的数组

> 该数组是对所调用数组的引用 不是拷贝!

2、参数二初始值

`initval` 初始值(可选) 如果没有指定 那么循环从第二个值开始 数组的第一项则被当作初始值 如果指定则从数组对一项开始循环

```js
var arr1 = [1, 2, 4, 4, 5, 6, 7, 8];
arr1.reduce(function(prev, cur, idx, arr) {
  return prev + cur;
}, initval);
```

大概可以实现以下功能：
连续求和、连续运算、数组统计次数、去重、多维数组扁平化、json 数组的相关操作

实现 Array.prototype.map

```js
Array.prototype.map2 = function(cb) {
  if (typeof cb !== "function") return;
  let that = this;
  return that.reduce((prev, cur, idx, srcarr) => {
    let tmp = cb.call(that, cur, idx);
    prev.push(tmp);
    return prev;
  }, []);
};
```
