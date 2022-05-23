import('./lib').then(console.log)

interface Runable {
  run(a: number, b: string): string
}

class Leo implements Runable {
  run(a: number, b: string): string {
    return a + b
  }
}

console.log(new Leo().run(12, 'npm'))

class Bob<T extends any> {
  public t: T
  constructor(t: T) {
    this.t = t
  }
}

const bob: Bob<string> = new Bob<string>('')
