
// export namespace Xiaolin {
//   export class Person {
//     name: string
//     constructor (name: string) {
//       this.name = name
//     }
//     bark () {
//       console.log(this.name)
//       return this.name
//     }
//   }
// }
// export namespace Xiaolin {
//   export interface info {
//     name: string
//     age: number
//   }
//   export interface arr {
//     [index: number]: any
//   }
//   export let haha = true
// }
export namespace Xiaoleo {
  export interface info {
    name: string
    age: number
  }
  export interface arr {
    [index: number]: any
  }
  export let haha = true
}
export namespace Xiaoleo {
  export class Person {
    name: string
    constructor (name: string) {
      this.name = name
    }
    bark () {
      console.log(this.name)
      return this.name
    }
  }
}
export namespace Geometric { 
  const HALF = 0.5;
  
  export interface Shape {
      area(h:number,w:number):number;
  } 
  
  export class Square implements Shape {
      area(h:number,w:number) {return h*w;}
  }

  export class Triangle implements Shape { 
      area(h:number,w:number) { return (h*w)*HALF };
  }
}