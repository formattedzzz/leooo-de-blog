// ---------------------------block1
module.exports = 'b'

var a = require('./a')
console.log(a)
// ---------------------------block2
// console.log(3)
// module.exports = require('./a.js')
// setTimeout(() => {
//   console.log(require('./a.js'))
// })
