
/** @tsconfig打包配置 */

/** @类class相关 */

/** @理解public及private及protected之间的区别 @默认都是public子类和实例都能访问 @private只有类中才能访问 @protected类中和子类才能访问 */

// class Greeter {
//   greeting: string;
//   constructor(message: string) {
//     this.greeting = message;
//   }
//   greet() {
//     return "Hello, " + this.greeting;
//   }
// }
// let greeter = new Greeter("world");
// console.log(greeter.greeting)
// greeter.greet()

/** @没有constructor函数的类叫派生类 @同样的有constructor的话必须调用super方法才能访问到正确的this */

/** @类中的存储器get及set @可以在赋值和取值的时候插入业务代码 */

// class Person {
//   name: string
//   age: number
//   private infonumber: number
//   constructor (thename: string, age: number) {
//     this.name = thename
//     this.age = age
//   }
//   greet () {
//     console.log(`hi I'm ${this.name}`)
//   }
//   get info (): number {
//     console.log('get')
//     return this.age
//   }
//   set info (num: number) {
//     console.log('set')
//     this.age = num
//   }
// }

// class Coder extends Person {
//   constructor (thename:string, age: number) {
//     super(thename, age)
//   }
// }

// let person = new Person('xiaolin', 22)
// let coder = new Coder('xiaoyue', 25)
// console.log(coder.age) // get
// coder.age = 22         // set
// console.log(coder.age) // get
// console.log(coder.info)
// coder.info = 23
// console.log(coder.age, coder.info)

/** @readonly和static修饰符 @readonly修饰的属性只能在constructor中被赋值而实例只能访问不能赋值 @static修饰的属性标示只能通过类本身来访问 */
// class Grid {
//   static origin = {x: 0, y: 0}
//   calculateDistanceFromOrigin(point: {x: number; y: number;}) {
//       let xDist = (point.x - Grid.origin.x)
//       let yDist = (point.y - Grid.origin.y)
//       return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
//   }
//   constructor (public scale: number) { }
// }

// let grid1 = new Grid(1.0)  // 1x scale
// let grid2 = new Grid(5.0)  // 5x scale
// console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}))
// console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}))

/** @接口interface相关 */

/** @json对象的接口 相关点包括：@可选属性 @只读属性 @额外属性检查 @允许额外属性 @函数类型属性 @数组类型属性 */

// interface Config {
//   name: string
//   age: number
//   phone?: string
//   [propName: string]: any
//   func(val: string): boolean
//   arr: string[]
// }

// function getinfo (para: Config): object {
//   if (para.func) {
//     console.log(para.func.toString())
//   }
//   return {
//     info: `name is ${para.name} & age is ${para.age}`,
//     len: para.arr.length
//   }
// }
// let fun1 = function(val: string): boolean{
//   return Number(val) > 0
// }
// console.log(getinfo({
//   name: 'xiaolin',
//   other: 'no more',
//   age: 22,
//   func: fun1,
//   arr: ['leoo']
// }))

// interface Point {
//   origin?: string
//   readonly X: number
//   readonly Y: number
// }

// let point: Point = {X: 100, Y: 100, aaa: 'xiaolin'} as Point
// console.log(point)

/** @json的接口的扩展 */
// interface json {
//   [key: string]: any
// }
// function func1 (para: json):string {
//   // (<number>para.age) 类型断言 确定para.age必不可能不是数字类型
//   return `${Object.keys(para).join('-')} ${(<number>para.age) + 1}`
// }
// console.log(func1({
//   name: 'xiaolin',
//   age: 22,
//   123: 'str'
// }))

/** @函数的接口 相关点包括：@参数类型 @返回值类型 */
// // 先申明接口
// interface Fun1 {
//   (search: string, filter: number): string
// }
// let func: Fun1
// func = function(val, opt): string{
//   return `you are search ${val}-${opt}`
// }
// console.log(func('xiaolin', 22))
// //直接申明
// let fun2 = function (para1: string, para2: number) : object {
//   return {
//     info1: para1,
//     info2: para2
//   }
// }
// function test (val1: string) : object {
//   return {
//     val1
//   }
// }

/** @数组的接口 相关点包括：@参数类型 @返回值类型 */

// let list: any[] = ['xiaolin', 22, {}]
// console.log(list)
// interface Arrany{
//   [index: number]: any
// }
// let anyarr: Arrany
// anyarr = list
// console.log(anyarr)

/** @类的接口 相关点包括：@一个类就是一个数据类型 @类实现某个接口 @ */

// interface Time {
//   currentT: Date;
//   getNum(date: Date): number;
// }
// function timeInfo (para: Time): number {
//   return para.getNum(para.currentT)
// }

// 先看下怎么实现普通json接口中怎么实现
// console.log(timeInfo({
//   currentT: new Date(),
//   getNum: function (para: Date): number {
//     return Number(para)
//   }
// }))

/** @类implements实现interface */
// class DateTime implements Time {
//   currentT: Date
//   name: string
//   constructor (para: Date) {
//     this.currentT = para
//   }
//   getNum (date: Date): number {
//     return Number(date)
//   }
// }
// console.log(timeInfo(new DateTime(new Date())))

/** @函数相关 基本没啥好记录的 写两点: @可选参数 @剩余参数 */

// // 很显然可选参数必须放在末尾
// function buildName(firstName: string, lastName?: string) {
//   if (lastName) return firstName + " " + lastName
//   else return firstName
// }
// let result1 = buildName("Bob")                  // works correctly now
// let result2 = buildName("Bob", "Adams", "Sr.")  // error, too many parameters
// let result3 = buildName("Bob", "Adams")

// interface interfaceFun {
//   (fname: string, ...rest: number[]): string
// }
// let buildName: interfaceFun = function (firstName: string, ...restOfName: number[]) {
//   console.log(typeof restOfName)
//   return firstName + " " + restOfName.join(" ")
// }
// console.log(buildName('leoo', 1, 3, 3, 4))


/** @泛型相关 */
// //定义到接口上面
// interface interFun {
//   <T>(para1: T, para2: T): object
// }
// let fun3: interFun = function<T>(para1: T, para2: T) : object {
//   if (typeof para1 === 'string') {
//     console.log('string')
//   }
//   return {
//     info1: para1,
//     info2: para2
//   }
// }
// console.log(fun3('leo', 'haha'))
// console.log(fun3(12, 23))
// console.log(fun3<number[]>([12], [34]))

/** @泛型类 */
// class GenericNumber<T> {
//   zeroValue: T
//   add: (x: T, y: T) => T
// }
// let myGenericNumber = new GenericNumber<number>()
// myGenericNumber.zeroValue = 0
// myGenericNumber.add = function(x, y) { return x + y }

/** @泛型约束 */
// interface Lengthwise {
//   length: number
// }
// function loggingIdentity<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length)  // Now we know it has a .length property, so no more error
//   return arg
// }
// loggingIdentity({length: 12})

/** @在泛型里使用类类型 @没啥意思 */

/** @外部模块 module @内部模块 命名空间namespace */
/** @跟esmodule一样 @默认导出在引入的时候可以随意命名 @普通导出会合并为一个keyval对象形式 */

// ----------------------es6module
// import {obj1, obj2, abc} from './module1'
// console.log(obj1, obj2)
// // 默认导出可以随意命名 如果 * as othername 则可以通过othername.default 拿到默认导出的部分
// import * as defaultcontent from './module1'
// console.log(defaultcontent.default.toString())

// // 导入的接口abc
// let info : abc = {
//   name: 'leooo'
// }
// console.log(info)

// ----------------------es6 & commonjs
// let info2 = require('./module2')
// import arr from './module2'
// console.log(info2)
// console.log(arr)

/** @因为typescript是js语言的超集所以一个模块里面既可以用commonjs的exports也可以用esmodule的export 包括其他的模块语法 但是还是需要明确生产环境支持什么 */

/** @外部模块简写  leoo.d.ts */
// import * as LEO from "path";
// console.log(LEO)
// aaa 是全局变量
aaa = 'leo'
console.log(aaa)
// print 是全局接口
let fun : print = function (val: string) : object {
  return {
    val
  }
}
console.log(fun('leo'))

// 像访问对象一样拿到某个命名空间内的接口 但命名空间不是对象 里面不能有具体的上下文实现
function test (para: Xiaolin.info) {
  return {
    key1: para.age,
    key2: para.name
  }
}
console.log(test({
  name: 'xiaoyue',
  age: 22
}))

let arr : Xiaolin.arr = ['', 2, []]
// let arr2 : Xiaoleo.arr = ['', 2, []]
// let info : Xiaoleo.info = {
//   name: 'lll',
//   age: 76
// }
// console.log(arr, arr2, info)

// let s = new Geometric.Square();
// console.log(s.area(10,5)); // 50
// let t = new Geometric.Triangle();
// console.log(t.area(10,5)); // 25

/** @命名空间 @区分于模块化 @namespace就相当于全局可见的导出可以直接访问 */
/** @哪些分文件的namespace可以直接访问呢 @看tsconfig的配置在如src文件下或者打包范围内的ts文件都可以 */
/** @namespace就相当于全局申明全局变量 @通常结合outFile来打包成一个文件如果不是namespace文件也是空的 */
/** @不在.d.ts文件中的namespace内部东西需要导出才能访问 */

// 玩不来node 分文件打包好像只能导出一个接口 既然不会报错 那就是打包姿势或者运行环境不对

//----------------------------------namespace.ts写法为export namespace的情况 OK 可以用----------------------------------
// import {Xiaolin} from './namespace/namespace'
// function test (para: Xiaolin.info) : object {
//   return {
//     info1: para.name,
//     info2: para.age
//   }
// }
// console.log(test({name: 'xiaoyue', age: 25}))
// let anyarr : Xiaolin.arr = [1, '', []]
// console.log(new Xiaolin.Person('hahaleo').bark())
// console.log(Xiaolin.haha)

//----------------------------------namespace.ts写法为 namespace 的情况 写法都没问题 但是要看具体的宿主的环境----------------------------------
// import inter = Xiaolin // import 可以用来简化名称 取别名 
// function test (para: Xiaolin.info) : object {
//   return {
//     info1: para.name,
//     info2: para.age
//   }
// }
// console.log(test({name: 'xiaoyue', age: 25}))
// let anyarr : Xiaolin.arr = [1, '', []]
// console.log(new Xiaolin.Person('hahaleo').bark())
// console.log(Xiaolin.haha)

/** @装饰器 */
// @log
// class Decorate {
//   constructor () {
  
//   }
// }
// function log (target: Function) {
//   console.log('log被执行')
//   console.log(target.prototype)
//   target.prototype.leo = function () {
//     console.log(target.prototype.name)
//   }
// }
// let test = new Decorate()

/** @高级类型 @联合类型 */

/** @申明合并 */

/** @接口类型合并 */

// interface Person {
//   name : string
//   age: number
// }
// interface Person {
//   gender: boolean
// }
// let person : Person = {
//   name: 'leoo',
//   age: 22,
//   gender: true
// }

/** @三斜线指令用于声明文件间的依赖 */

