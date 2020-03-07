# 构造堆

```js
// 创建堆，其实是对data数组做一个结构调整，使其具有堆的特性
function buildHeap(data) {
  var len = data.length;
  for (var i = Math.floor(len / 2); i >= 0; i--) {
    heapAjust(data, i, len);
  }
}
// 堆调整函数，即调整当前data为大根堆
function heapAjust(data, i, len) {
  var child = 2 * i; // 左子节点
  while (child <= len) {
    var temp = data[i];
    // 如果右孩子存在且其值大于左孩子的值，则将child指向右孩子
    if (child + 1 <= len && data[child] < data[child + 1]) {
      child = child + 1;
    }
    // 如果当前结点的值小于其孩子结点的值，则交换，直至循环结束
    if (data[i] < data[child]) {
      data[i] = data[child];
      data[child] = temp;
      i = child;
      child = 2 * i;
    } else {
      break;
    }
  }
}
// 排序
function heapSort(data) {
  var data = data.slice(0);
  if (!(data instanceof Array)) {
    return null;
  }
  if (data instanceof Array && data.length == 1) {
    return data;
  }
  buildHeap(data);
  var len = data.length;
  for (var i = len - 1; i >= 0; i--) {
    [data[0], data[i]] = [data[i], data[0]];
    heapAjust(data, 0, i - 1);
  }
  return data;
}
function buildHeap2(data) {
  var temp = data.slice();
  var len = temp.length;
  for (var i = Math.floor(len / 2); i >= 0; i--) {
    heapAjust(temp, i, len);
  }
  return temp;
}
const arr = [62, 88, 58, 47, 35, 73, 51, 99, 37, 93];
console.log(buildHeap2(arr));
console.log(heapSort(arr)); // [35, 37, 47, 51, 58, 62, 73, 88, 93, 99]
```
