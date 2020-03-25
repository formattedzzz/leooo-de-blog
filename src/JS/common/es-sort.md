# Array.prototype.sort

## 默认的规则

`sort()` 方法用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序 并返回数组。
默认排序顺序是在将元素转换为字符串 然后比较它们的 `UTF-16` 代码单元值序列时构建的

```js
const months = ["March", "Jan", "Feb", "Dec"];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```

## 参数为函数的比较规则

根据 MDN 的文档 这个方法接收一个可选的 `compareFunction`。
而这个 `compareFunction` 接收两个数组元素 并返回一个值决定这两个元素是否需要调换位置 规则如下：

- 如果 `compareFunction(a, b)` 小于 0 那么 a 会被排列到 b 之前
- 如果 `compareFunction(a, b)` 等于 0 a 和 b 的相对位置不变
  备注：ECMAScript 标准并不保证这一行为 而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）
- 如果 `compareFunction(a, b)` 大于 0 b 会被排列到 a 之前
- `compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果 否则排序的结果将是不确定的

## 自定义排序规则

需求如下：

- a, b 都是两位数时 按从小到大排序
- a, b 中有一个两位数 两位数放到后边
- a, b 都不是两位数 按从小到大排序

```js
var arr = [1, 56, 58, 23, 11, 100, 101, 23, 99, 456, 0, 9, 233, 12];
function isdoubleDigit(num) {
  return num >= 10 && num <= 99;
}
function compare(a, b) {
  // 都是两位数
  if (isdoubleDigit(a) && isdoubleDigit(b)) {
    return a - b;
  }
  // a是两位数，b不是，a应该被放到最后
  if (isdoubleDigit(a) && !isdoubleDigit(b)) {
    return 1;
  }
  // b是两位数，a不是，b应该被放到最后
  if (!isdoubleDigit(a) && isdoubleDigit(b)) {
    return -1;
  }
  // 都不是两位数，正常排序
  return a - b;
}
console.log(arr.sort(compare));
// [0, 1, 9, 100, 101, 233, 456, 11, 12, 23, 23, 56, 58, 99]
```

## 原地算法

原地算法：是一种使用小的、固定数量的额外之空间来转换资料的算法。当算法执行时 输入的资料通常会被要输出的部份覆盖掉

比如给定一个排序数组 你需要在原地删除重复出现的元素 使得每个元素只出现一次 返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 `O(1)` 额外空间的条件下完成。
