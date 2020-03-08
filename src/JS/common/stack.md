# 写一个栈结构

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
