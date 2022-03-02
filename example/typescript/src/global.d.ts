// declare module "leooo" {
//   let leoo : number[] = [1, 3, 9];
//   export {leoo}
// }
// declare module "pleoo" {
//   export function normalize(p: string): string;
//   export function join(...paths: any[]): string;
// }

// 只能定义类型 而不能定义值 单纯的在index.ts中去访问 aaa 是不行的
declare var aaa: number | string
declare interface print {
  (para: string): object
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
    constructor(name: string, age: number)
  }
  export let a: number
}

declare enum Directions {
  Up,
  Down,
  Left,
  Right
}
declare const jQuery: (selector: string) => any

declare namespace Xiaomo {
  export interface ProcessAsd {
    NODE_ENV: 'development' | 'production'
    DEV: string
    PROD: string

    NETLESS_APP_IDENTIFIER: string

    CLOUD_STORAGE_OSS_ALIBABA_ACCESS_KEY: string
    CLOUD_STORAGE_OSS_ALIBABA_BUCKET: string
    CLOUD_STORAGE_OSS_ALIBABA_REGION: string

    CLOUD_STORAGE_DOMAIN: string

    AGORA_APP_ID: string

    GITHUB_CLIENT_ID: string

    WECHAT_APP_ID: string
    FLAT_SERVER_DOMAIN: string
    FLAT_WEB_DOMAIN: string

    CLOUD_RECORDING_DEFAULT_AVATAR?: string
  }
}

declare module "some" {
  export default interface Some {
    name: string
    log: (int: number) => boolean
  }
  export class init {
    ext(): void
  }
}