import add from './add'
import md from './api.md'
import { A, B } from 'aeo'

globalThis.add = add
new A('leooo').log()
console.log(this, add(1, 9))
console.log('md', md)

B(1, true, 'bob')
