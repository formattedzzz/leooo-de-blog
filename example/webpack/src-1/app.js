import A from './lib/a'
import C from './lib/a'

A()
console.log(C)

import('./lib/b').then(module => {
  console.log(module)
})
