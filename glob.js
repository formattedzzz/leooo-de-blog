/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
// const minimatch = require('minimatch')

// console.log(minimatch('bar.foo', '*.foo')) // true!
// console.log(minimatch('bar.foo', '*.bar')) // false!
// console.log(minimatch('bar.foo', '*.+(bar|foo)', { debug: true })) // true, and noisy!
const glob = require('glob')
glob('src/**/index.md', {}, (err, files) => {
  console.log(err, files)
})
const tool = require('util')
const obj = {}
console.log(tool.isPrimitive(true))
console.log(tool.isPrimitive(obj))

// let timerMap = {}
// function interval(cb, inter) {
//   const mark = Math.random().toString(36).slice(8)
//   timerMap[mark] = setTimeout(function () {
//     cb && cb()
//     clearTimeout(timerMap[mark])
//     timerMap[mark] = setTimeout(arguments.callee, inter)
//   }, inter)
//   return () => clearTimeout(timerMap[mark])
// }

// const clear = interval(() => {
//   console.log(123)
// }, 2000)

// let timerMap = {}
// function intervalTimer(cb, inter) {
//   const mark = Math.random().toString(36).slice(8)
//   const inner = function () {
//     cb && cb()
//     setTimeout(inner, timer)
//   }
//   inner()
// }

/**
 * @param {cb}
 * @param {inter}
 * @returns {Function}
 */
let timerMap = {}
function interval(cb, inter) {
  const mark = Math.random().toString(36).slice(8)
  const inner = function () {
    cb && cb()
    clearTimeout(interval[mark])
    interval[mark] = setTimeout(inner, inter)
  }
  // 为了避免严格模式使用 arguments.callee 可以单独提取出来 句柄可以依附在函数本身上
  interval[mark] = setTimeout(inner, inter)
  return () => clearTimeout(interval[mark])
}
const clear1 = interval(() => {
  console.log(111)
}, 2000)
const clear2 = interval(() => {
  console.log(222)
}, 2000)

class A {
  constructor(options = {}) {
    const { name = 'name', age = 24 } = options
    this.name = name
    this.age = age
  }
  log() {
    console.log(this.name + this.age)
    return this
  }
}

class B extends A {

}
new B().log()
