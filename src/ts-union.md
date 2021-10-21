# ts 联合类型约束

在 typescript 中，如果一个函数的输入输出均是 `number | string` 类型，但是规定输入是`string`输出也为`string`，输入为`number`输出也为`number`，可以有如下方案

- 使用泛型

- 函数重载

```js
type union = string | number
function OverLoad(a: number): number
function OverLoad(a: string): string
function OverLoad(a: union): union {
  if (typeof a == 'number') return a * a
  if (typeof a == 'string') return a + a
  return a
}
```
