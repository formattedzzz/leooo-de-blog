const buffer = require('buffer')

const buf = buffer.Buffer

console.log(buf.alloc(10, 65, 67, 78).toString())

console.log(buf.from('我'))
