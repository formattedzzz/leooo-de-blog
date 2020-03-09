# 回顾 toString 和 valueOf 两个函数

```js
Number(undefined) === NaN;
Number(null) === 0;
```

> undefined 和 null 没有 toString()和 valueOf()方法

为啥嘞 在 js 里面 这两个东西就是一个原始值 不是对象 也不是像 String Number 这样的包装对象 虽然 null 是一个空指针对象
只能用 String(null) String(undefined)

- toString 返回一个反映(描述)该对象的字符串

- valueOf 返回该对象的原始值

- Function.prototype.toString 影响的是函数调用 toString 返回的结果

- Object.prototype.toString 影响的是 json 对象调用 toString 返回的结果

- Array.prototype.toString 影响的是数组调用 toString 返回的结果 有趣的是：Array.prototype 本质是一个数组！

- Boolean Number String Regexp Date 以此类推

  123.toString()
  {a:1,b:2}.toString()
  function() {}.toString() 是会直接报错的
  应该(123).toString() ({a:1,b:2}).toString()这样 写成字面量的形式调用

```js
([1, 2.5, 3].toString() ===
  "1,2.5,3"[
    // 去掉[]及空格 跟String([]) 等价
    (1, 3, [12, 2.4, [4, 5, 6]])
  ].join(",")) ===
  [1, 3, [12, 2.4, [4, 5, 6]]]
    .toString()(
      // [1, 3,[12, 2.4, [4,5,6]]].join('') 不带分隔符结果大相径庭
      { a: 1 }
    )
    .toString()(
      // '[object object]'
      []
    )
    .toString(); // ''
// 所以说为什么object.prototype.toString()可以用来判断类型
```

在转换不同的数据类型时 相等操作符遵循下列基本规则：

- 如果有一个操作数是布尔值 则在比较相等性之前 将其转换为数值

- 如果一个操作数是字符串 另一个操作数是数值 在比较之前先将字符串转换为数值

- 如果一个操作数是对象 另一个操作数不是 则调用对象的 valueOf 方法 用得到的基本类型值按照前面的规则进行比较

- 如果有一个操作数是 NaN 无论另一个操作数是什么 相等操作符都返回 false

- 如果两个操作数都是对象 则比较它们是不是同一个对象 如果指向同一个对象 则相等操作符返回 true

- 在比较相等性之前 不能将 null 和 undefined 转成其他值

- null 和 undefined 是相等的
