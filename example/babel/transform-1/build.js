var _aaa;

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
var aaa = null;

if (Math.random() < 0.01) {
  aaa = {
    name: 'leooo'
  };
}

console.log((_aaa = aaa) === null || _aaa === void 0 ? void 0 : _aaa.name);
