const a = 1
const b = 'ok'
export * from './lib-1.js'

export default {
  a,
  b
}

// 直接使用 generator 函数生成迭代器
Object.prototype[Symbol.iterator] = function* () {
  const _keys = Object.keys(this)
  for (let index = 0; index < _keys.length; index++) {
    const key = _keys[index]
    yield [key, this[key]]
  }
}

// 手动定义
// Object.prototype[Symbol.iterator] = function () {
//   const _keys = Object.keys(this)
//   let _idx = 0
//   return {
//     next: () => {
//       let key = _keys[_idx++]
//       if (!key) {
//         return { done: true }
//       }
//       return {
//         value: [key, this[key]],
//         done: false
//       }
//     }
//   }
// }

// 甚至可以手动分开定义
// Object.prototype[Symbol.iterator] = function () {
//   return this
// }
// Object.prototype.next = function () {
//   const keys = Object.keys(this)
//   if (this.__proto__._idx === undefined) {
//     this.__proto__._idx = 0
//   }
//   const key = keys[this.__proto__._idx++]
//   if (!key) {
//     delete this.__proto__._idx
//     return { done: true }
//   }
//   return { done: false, value: [key, this[key]] }
// }

var obj = {
  a: 'kkk',
  b: 1,
  c: true,
  d: () => {
    console.log(123)
  }
}
for (let [k, v] of obj) {
  console.log(k, v)
}
console.log([...obj])
// with (obj) {
//   console.log(a, b, c, d)
// }
function leo(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    })
  })
}
async function gen() {
  const res = await leo('datakkk')
  return res
}
window.gen = gen

debugger;
function* genfunc(num) {
  const res1 = 2 * (yield num)
  console.log(res1) // 12
  const res2 = 10 * (yield (res1 / 3))
  console.log(res2) // 40
  return res2
}

const res = genfunc(5)
console.log(res.next()) // 5
console.log(res.next(6)) // 4
console.log(res.next(4)) // 40