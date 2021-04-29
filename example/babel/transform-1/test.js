// export const app = {
//   name: 'leooo',
//   age: 23,
//   log1: () => {
//     console.log('log1', this)
//   },
//   log2() {
//     console.log('log2', this)
//   }
// }

// app.log1()
// app.log2()
// var log2 = app.log2
// log2()

var aaa = null
if (Math.random() < 0.01) {
  aaa = { name: 'leooo' }
}
console.log(aaa?.name)
