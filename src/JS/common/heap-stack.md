# 堆栈结构

## 写一个堆结构

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

## 写一个栈结构

```js
function Stack() {
  let items = [];
  this.push = function(element) {
    items.push(element);
  };
  this.pop = function() {
    let s = items.pop();
    return s;
  };
  this.peek = function() {
    return items[items.length - 1];
  };
  this.isEmpty = function() {
    return items.length == 0;
  };
  this.size = function() {
    return items.length;
  };
  this.clear = function() {
    items = [];
  };
}
```

这样的问题是每 new 一个 Stack 就会在内存中生成一个**items**副本

```js
let Stack = (function() {
  // 这样写可以把每个实例及实例所对应的栈结构以键值对的形式都存在weakMap中 避免内存泄露
  const items = new WeakMap();
  class Stack {
    constructor() {
      items.set(this, []);
    }
    getItems() {
      let s = items.get(this);
      return s;
    }
    push(element) {
      this.getItems().push(element);
    }
    pop() {
      return this.getItems().pop();
    }
    peek() {
      return this.getItems()[this.getItems.length - 1];
    }
    isEmpty() {
      return this.getItems().length == 0;
    }
    size() {
      return this.getItems().length;
    }
    clear() {
      this.getItems() = [];
    }
  }
  return Stack;
})();
```

可以解决十进制转为二进制的问题、任意进制转换的问题、平衡园括号问题、汉罗塔问题

```js
// 例子十进制转二进制问题
function divideBy2(decNumber) {
  var remStack = new Stack(),
    rem,
    binaryString = "";
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}
// 任意进制转换的算法
function baseConverter(decNumber, base) {
  var remStack = new Stack(),
    rem,
    binaryString = "",
    digits = "0123456789ABCDEF";
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    binaryString += digits[remStack.pop()].toString();
  }
  return binaryString;
}
```
