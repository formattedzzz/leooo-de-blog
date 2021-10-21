# TS 中的 infer 关键字

如果实现 ts 内置类型 ReturnType，或者说现在有一个函数类型，其输入是对象数组，现在需要写一个泛型来通过该函数类型提取数组中对象的类型。这个时候我们就要用到 infer 关键字

```ts
// 通过type定义一个函数类型
type Func1 = (a: string) => boolean

// 通过接口定义一个函数类型
interface Func2 {
  (argv1: string | number): boolean | number
}

// 如果泛型输入符合该函数结构 直接提取被infer修饰的那个值
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any
type MyReturnedTypeOfFunc1 = ReturnType<Func1> // boolean
type MyReturnedTypeOfFunc2 = ReturnType<Func2> // boolean | number

// 提取参数类型
// 申明一个具体类型
function SomeFunc(params: string[]): any {
  return
}
// 根据函数结构定义泛型
type GetParamsTypeFromFunc<T> = T extends (params: (infer P)[]) => any ? P : T
type ParamsType = GetParamsTypeFromFunc<typeof SomeFunc> // string
```
