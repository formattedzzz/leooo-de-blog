# js 基础回顾、总结

## `toString` 和 `valueOf` 两个函数

> `undefined` 和 `null` 没有 `toString` 和 `valueOf` 方法

```js
Number(undefined) === NaN;
Number(null) === 0;
```

为啥嘞 在 js 里面 这两个东西就是一个原始值 不是对象 也不是像 `String` `Number` 这样的包装对象 虽然 `null` 是一个空指针对象
只能用 `String(null)` `String(undefined)`

- `toString` 返回一个反映(描述)该对象的字符串

- `valueOf` 返回该对象的原始值

- `Function.prototype.toString` 影响的是函数调用 `toString` 返回的结果

- `Object.prototype.toString` 影响的是 json 对象调用 `toString` 返回的结果

- `Array.prototype.toString` 影响的是数组调用 `toString` 返回的结果 有趣的是：`Array.prototype` 本质是一个数组！

- `Boolean` `Number` `String` `Regexp` `Date` 以此类推

  `123.toString()`、 `{a:1,b:2}.toString()`、 `function() {}.toString()` 是会直接报错的
  应该`(123).toString()` `({a:1,b:2}).toString()` 这样 写成字面量的形式调用

  ```js
  [1, 2.5, 3].toString(); // "1,2.5,3";
  // 去掉[]及空格 跟String([]) 等价
  [1, 3, [12, 2.4, [4, 5, 6]]].join(",") ===
    [1, 3, [12, 2.4, [4, 5, 6]]].toString();

  // [1, 3,[12, 2.4, [4,5,6]]].join('') 不带分隔符结果大相径庭

  ({ a: 1 }.toString()); // '[object Object]'

  [].toString(); // ''

  null == undefined; // true
  ```

在转换不同的数据类型时 相等操作符遵循下列基本规则：

- 如果有一个操作数是布尔值 则在比较相等性之前 将其转换为数值

- 如果一个操作数是字符串 另一个操作数是数值 在比较之前先将字符串转换为数值

- 如果一个操作数是对象 另一个操作数不是 则调用对象的 `valueOf` 方法 用得到的基本类型值按照前面的规则进行比较

  **_特别地_** 如果一个操作对象是数组 如果要调用 `toString` 方法则会隐式的调用 `join` 方法

- 如果有一个操作数是 `NaN` 无论另一个操作数是什么 相等操作符都返回 `false`

- 如果两个操作数都是对象 则比较它们是不是同一个对象 如果指向同一个对象 则相等操作符返回 `true`

- 在比较相等性之前 不能将 `null` 和 `undefined` 转成其他值

- `null` 和 `undefined` 是相等的

- 还有个疑问 对象和非对象运算、比较的时候 怎么知道他调用的是 `toString` 还是 `valueOf` 呢

  正常情况下 调用的都是 `toString` 除非你手动把 `valueOf` 改了并返回基本数据类型

- 所以说为什么 `Object.prototype.toString` 方法可以用来判断类型.

  这个接口返回的是 描述包装对象的一段字符串

  ```js
  Object.prototype.toString.call([]);
  // '[object Array]'
  Object.prototype.toString.call("");
  // '[object String]'
  ```

  很显然格式便是 `[object {{constractorName}}]`

- 来做道题

  ```js
  console.log([[[] == []] + []][+![]][+![]]);
  ```

  先拆外面的三部分 `[[[] == []] + []]`、 `[+![]]`、 `[+![]]`

  `[[[] == []] + []]` === `[[false] + []]` === `["false"]`

  `[+![]]` === `[0]`

  `[+![]]` === `[0]`

  故原式子 === `["false"][0][0]` === `"f"`

- 再来一道

  ```js
  console.log(
    (!~+[] + {})[--[~+""][+[]] * [~+[]] + ~~!+[]] + ({} + [])[[~!+[]] * ~+[]]
  );
  // "sb"
  ```

  😀 打扰了...

  ```js
  // 分解
  (!~+[] + {})[ --[~+""][+[]] * [~+[]] + ~~!+[] ]
  + 
  ({} + [])[[~!+[]] * ~+[]]

  // 分解
  ('false[object Object]')[ --[~+""][+[]] * [~+[]] + ~~!+[] ]
  + 
  ('[object Object]')[[~!+[]] * ~+[]]

  // 分解
  ('false[object Object]')[ --[-1][0] * [-1] + ~~true ]
  + 
  ('[object Object]')[[~true] * -1]

  // 分解
  ('false[object Object]')[ -2 * [-1] + 1 ]
  + 
  ('[object Object]')[[-2] * -1]

  // 分解
  ('false[object Object]')[3]
  + 
  ('[object Object]')[2]

  // 'sb'
  ```

- 总之 见相关流程图

![process](https://user-gold-cdn.xitu.io/2020/4/21/1719d4f703af20a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## js 进制转换

任意进制的字符串转十进制

```js
Number.parseInt("110", 2); // 6
Number.parseInt("010", 8); // 8
Number.parseInt("0xf", 16); // 15
```

十进制转任意进制

```js
Number.prototype.toString.call(10, 2); // "1010"
Number.prototype.toString.call(15, 16); // "f"
```

## `(2.55).toFixed(1) === 2.5`

根本原因在于 2.55 的存储要比实际存储小一点 导致 0.05 的第 1 位尾数不是 1 所以就被舍掉了

同样的 0.1 + 0.2 的问题 0.1 存取的值要比 0.1 大一点点

```js
// 先把toFixed存起来
if (!Number.prototype._toFixed) {
  Number.prototype._toFixed = Number.prototype.toFixed;
}
// 再纠正
Number.prototype.toFixed = function(n) {
  return (this + 1e-14)._toFixed(n);
};
```
