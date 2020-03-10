# 关于数组的空元素

```js
var arr = [1, 2, 3];
arr[10] = 9;
console.log(arr, arr.length);
//  [1, 2, 3, empty × 7, 9]  11
arr.forEach(v => {
  console.log(v);
});
// 1 2 3 9
arr.filter(v => {
  return v === undefined;
});
// []
// 并不会出现7个undefined组成的数组
```

> filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或 等价于 true 的值 的元素创建一个新数组。**callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用** 那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。

也就是说 显示为 empty 的元素并不会等价于这个值是 undefined、虽然我们访问它得出的 undefined

当我们 delete arr[2]之后 arr[2]这个位置 并不是 undefined 而是空

undefined 是实实在在的值 可以被 forEach filter 遍历 而 empty 不行
