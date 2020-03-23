
// declare module "leooo" {
//   let leoo : number[] = [1, 3, 9];
//   export {leoo}
// }
// declare module "pleoo" {
//   export function normalize(p: string): string;
//   export function join(...paths: any[]): string;
// }
declare var aaa : number|string
declare interface print {
  (para: string) : object
}
declare namespace Xiaolin {
 interface info {
    name: string
    age: number
  }
 interface arr {
    [index: number]: any
  }
}
declare namespace Xiaolin {
  export class Person {
    name: string
    age: number
    constructor (name: string, age: number)
  }
  export let a : number
}
