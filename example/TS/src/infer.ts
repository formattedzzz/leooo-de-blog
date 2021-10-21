
// 声明一个泛型类型别名，返回值与泛型类型相同，入参类型不限制。
type Reverse<T> = (arg: any) => T
// 声明一个泛型方法，入参arg继承泛型约束，返回空对象并断言其类型为T
function returnResultType<T>(arg: Reverse<T>): T {
  return {} as T
}
// 调用returnResultType，传入方法 (arg: any) => 3，获得result返回值
const result = returnResultType((arg: any) => 3)
// 获取result类型并重名为ResultType
type ResultType = typeof result

// type ResultType2 = ReturnType<returnResultType>

type NullType<T> = T extends null | undefined ? never : T
const a: NullType<null> = '' as never
const b: NullType<boolean> = true

// 用type描述函数类型
type FuncT<T> = (a: T) => T
type Func = (a: string) => boolean

// 用接口描述函数类型
interface Func2 {
  (argv1: string | number): boolean | number
}
type ReturnedTypeOfFunc1 = ReturnType<Func>
type ReturnedTypeOfFunc2 = ReturnType<Func2>

type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
type MyReturnedTypeOfFunc1 = ReturnType<Func>
type MyReturnedTypeOfFunc2 = ReturnType<Func2>

// 申明具体的函数
function Func3<T>(...params: T[]): Promise<T[]> {
  return Promise.resolve(params)
}
const res = Func3([1, 2, 3])
type ResType = typeof res

// 如果<T>传入的类型
type InferType<T> = T extends (params: infer P) => any ? P : T
type InferType2<T> = T extends (params: (infer P)[]) => any ? P : T
const Infer1: InferType<boolean> = true
const Infer2: InferType2<(params: number[]) => boolean> = 1
const Infer3: InferType<(params: number[]) => boolean> = [1, 2]

function Tmp(params: string[]):any{
  return
}
const Infer4: InferType2<typeof Tmp> = ''

type Tuple = [string, number]
type TupleArray = Array<string | number>
const tuple: Tuple = ['', 12]
type ok = Tuple extends TupleArray ? true : false

let num: number = 12_3456.3_456

console.log(num)

type union = string | number
function OverLoad(a: number): number
function OverLoad(a: string): string
function OverLoad(a: union): union {
  if (typeof a == 'number') return a * a
  if (typeof a == 'string') return a + a
  return a
}
