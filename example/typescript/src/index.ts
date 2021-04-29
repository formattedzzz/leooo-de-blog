
import all from './lib/lib-1'
import info from './lib/lib-2.js'
import { Point } from './lib/lib-3'
function leo(name) {
  console.log(name + 'jiuzhe')
}
leo('haha')
leo('pop')
console.log(require('./lib/lib-1').log())
console.log({ all })
console.log({ info })

// 枚举类型 既会申明类型 还会还会申明值 这跟类是一样的 类本身就是一种类型
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green;
console.log(c)

interface Obj {
  a: number
  b: string
  // 这个意思是 索引是string的话 值的类型必须为 any
  [propName: string]: any
}
let obj: Obj = undefined
obj = { a: 1, b: 'string', c: 13 }
// console.log(obj + 12)
console.log('obj.b', obj.b, obj.c)

// 接口定义json
interface Config {
  name: string
  age: number
  phone?: string
  [propName: string]: any
  func(val: string): boolean
  arr: string[]
}

function getinfo(para: Config): object {
  if (para.func) {
    console.log(para.func.toString())
  }
  return {
    info: `name is ${para.name} & age is ${para.age}`,
    len: para.arr.length
  }
}
let fun1 = function (val: string): boolean {
  return Number(val) > 0
}
const para = {
  name: 'xiaolin',
  other: 'no more',
  age: 22,
  func: fun1,
  arr: ['leoo']
} as Config
console.log(getinfo(para))


let point: Point = { X: 100, Y: 100, aaa: 'xiaolin' } as Point
console.log(point)
let point1: Point
console.log(typeof point1) // true

// 接口定义数组 一般我们不会用接口来定义数组 因为这好像并没有什么软用 因为这只是定义了数组的结构 
// 数组本该有的方法都没了 用到哪个还要定义到接口里
interface SomeArray {
  [index: number]: string
  join(pattern: string): string
}
const arr: SomeArray = ['leooo', 'nommmp']

console.log('arr.join', arr.join(''))
interface commonobj {
  [propName: string]: any
}
// 返回一个object时 访问属性报错? 1 断言成any 2 如上定义成一个commonobj
// 因为在 any 类型的变量上 访问任何属性都是允许的
// (window as any).a = 1 // ok
function someFunc(a: string, b: number = 6, ...items): object {
  // console.log({ arguments })
  const argv: IArguments = arguments
  console.log(a + b, items instanceof Array)
  return { a, b, items }
}
console.log((someFunc('leoo', 2, 2, []) as any).a)

// 函数多态 类型断言
// interface ApiError extends Error {
//   code: number;
//   logcode(): string;
//   (code: number): number;
// }
// interface HttpError extends Error {
//   statusCode: number;
// }
// function isApiError(error: Error) {
//   if (typeof (error as ApiError).code === 'number') {
//     return true;
//   }
//   return false;
// }
// class ApiErr extends Error implements ApiError {
//   code: number = 0
//   constructor(code: number) {
//     super()
//     this.code = code
//   }
//   logcode() { return String(this.code) }
// }
// console.log(isApiError(new ApiErr(200)))
// console.log(isApiError())

declare interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

let tom: Cat = {
  name: 'Tom',
  run: () => { console.log('run') }
};
// 这里先定义成Cat 可以将其赋值给animal类型 直接赋值却不行
// 因为这里等价于 类的继承关系 很奇怪吧
// interface Cat extends Animal {
//   run(): void;
// }
let animal: Animal = tom
console.log(animal)

// 再来看一个问题 如果一个接口定义有一些属性 有的属性是值 有的属性是方法
// shorthand 的方式是行为 键名冒号的形式是属性 将一个构造对象赋值给该类型的变量 接口不会检查该对象是否有这些行为

interface Dog {
  run(): void
}

class Temp implements Dog {
  name: string
  private age: string
  private _info: string
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  get info(): string {
    console.log('get-name')
    return this._info
  }
  set info(val: string) {
    console.log('set-name')
    this._info = val
  }
  run() { }
}
// function Temp(name) {
//   this.name = name
// }
// Temp.prototype.run = function () { }
let tom2: Cat = new Temp('tom2', 12)
let tom3: Temp = new Temp('tom3', 12)
let tom4: Dog = new Temp('tom4', 16)
// console.log(tom3.age) not access to age
tom3.info = 'shabi'
console.log(tom3.info)
console.log({ tom2 }, { tom3 }, { tom4 })

// aaa 回到申明文件中寻找定义
// const aaa = null
// aaa = 1
// console.log(jQuery('leoo'), 'aaa is', aaa)

// 调用申明文件中申明的类型
const info1: Xiaolin.info = {
  name: 'leooo',
  age: 24
}
console.log(info1)

// const direct: Directions = 'Up'
// console.log(direct)

// 元组
let tuple: [string, object, number] = undefined;
tuple = ['string', {}, 1]
console.log(tuple)

enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
// console.log(Days["Sun"] === 0); // true
// console.log(Days["Mon"] === 1); // true
// console.log(Days["Tue"] === 2); // true
// console.log(Days["Sat"] === 6); // true
// console.log(Days[0] === "Sun"); // true
// console.log(Days[1] === "Mon"); // true
// console.log(Days[2] === "Tue"); // true
// console.log(Days[6] === "Sat"); // true
const day: Days = Days.Fri

enum Directions {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right'
}
console.log(day, day === 5, Directions.up) // 5
const di: Directions[] = [Directions.up, Directions.down]
console.log(di)

type leo = number | string
type leostr = 'bob' | 'leo' | 'jerry'
const str1: leostr = 'bob'
const str2: leo = 'haha'
console.log(str1, str2)

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap<number, string>([7, 'seven']); // ['seven', 7]

interface Date2 extends Date {
  log(): void
}
class Date2Face extends Date {
  log() { }
}
let date2: Date2 = new Date2Face()
console.log(date2)
