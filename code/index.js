/**
 * @unhandledrejection捕获问题
 */
// var p = new Promise((ok, no) => {
//   // ok(1)
//   no(1)
// })
// p.then(() => {
//   console.log(a.b)
// }, console.error)
// window.addEventListener('unhandledrejection', console.error)

/**
 * @default unhandledrejection只会捕获未处理的错误、也就是then中未设置第二个参数也没有catch
 */

/**
 * @click代码触发跟事件触发有什么区别
 */
// const btn = document.querySelector('button')
// btn.addEventListener(
//   'click',
//   () => {
//     Promise.resolve().then(() => {
//       console.log('micro-task-1')
//     })
//     console.log('click1')
//     setTimeout(() => {
//       console.log('timer1')
//     })
//   },
//   false
// )
// btn.addEventListener(
//   'click',
//   () => {
//     Promise.resolve().then(() => {
//       console.log('micro-task-2')
//     })
//     console.log('click2')
//     setTimeout(() => {
//       console.log('timer2')
//     })
//   },
//   false
// )
// btn.addEventListener(
//   'click',
//   () => {
//     Promise.resolve().then(() => {
//       console.log('micro-task-3')
//     })
//     console.log('click3')
//     setTimeout(() => {
//       console.log('timer3')
//     })
//   },
//   false
// )
// btn.click()
/**
 * @default 代码触发：所有监听函数同时触发
 * @default 事件触发：监听函数按注册顺序依次等待微任务列清空触发
 */

/**
 * @手写请求并发器
 */
// var tasks = new Array(20).fill(undefined).map((_, idx) => {
//   return () => {
//     const delay = Math.round(1000 + Math.random() * 2000)
//     return new Promise((ok, no) => {
//       setTimeout(() => {
//         ok({ data: idx, delay })
//       }, delay)
//     })
//   }
// })
// function multiHandle(tasks, max) {
//   if (!tasks.length) return []
//   const resultMap = new Array(tasks.length)
//   for (let i = 0; i < max; i++) {
//     startChan()
//   }
//   function startChan() {
//     if (tasks.length == 0) return
//     const key = tasks.length - 1
//     const task = tasks.pop()
//     console.log('fetching:', key)
//     task()
//       .then(
//         res => {
//           console.log('oked:', key)
//           resultMap[key] = res
//         },
//         err => {
//           resultMap[key] = null
//         }
//       )
//       .finally(() => {
//         startChan()
//       })
//   }
//   return resultMap
// }
// var res = multiHandle(tasks, 4)
/**
 * @default 给定一个任务函数开启max个通道执行任务、某个通道执行完自行填补下一个任务，直至任务清空
 */

/**
 * @函数柯里化
 */
// function curry(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args)
//     } else {
//       return function (...sub_args) {
//         return curried.apply(this, args.concat(sub_args))
//       }
//     }
//   }
// }
// function sum(a, b, c) {
//   return a + b + c
// }
// let curriedSum = curry(sum)
// console.log(curriedSum(1, 2, 3))
// console.log(curriedSum(1)(2, 3))
// console.log(curriedSum(1)(2)(3))

/**
 * @Object的observe方法
 */
// var obj = {
//   foo: 0,
//   bar: 1
// }
// Object.observe(obj, function (...changes) {
//   console.log(...changes)
// })
// obj.baz = 2
// obj.foo = 'hello'
// Promise.resolve().then(console.log)
// delete obj.baz
/**
 * @default 貌似API已被废弃
 */

/**
 * @MutationObserve
 */
// var options = {
//   childList: true,
//   attributes: true,
//   subtree: true,
//   attributesOldValue: true,
//   characterData: true,
//   characterDataOldValue: true
// }
// var ob = new MutationObserver(console.log)
// var btn = document.querySelector('button')
// ob.observe(btn, options)
// btn.textContent += 'haha'
// Promise.resolve(123).then(console.log)
/**
 * @default MutationObserve是微任务
 */

/**
 * @webcomponents
 */
// var template = document.getElementById('caiBtn')
// class CaiButton extends HTMLElement {
//   constructor() {
//     super()
//     this._type = {
//       primary: 'cai-button-primary',
//       warning: 'cai-button-warning',
//       danger: 'cai-button-danger'
//     }
//     const shadow = this.attachShadow({
//       mode: 'open'
//     })
//     const content = template.content.cloneNode(true)
//     this._btn = content.querySelector('.cai-button')
//     shadow.appendChild(content)
//     window.com = this
//   }
//   static get observedAttributes() {
//     return ['type']
//   }
//   attributeChangedCallback(name, oldValue, newValue) {
//     this[name] = newValue
//     this.render()
//   }
//   render() {
//     this._btn.className = `cai-button ${this._type[this.type]}`
//   }
// }
// window.customElements.define('cai-button', CaiButton)
/**
 * @default
 */

/**
 * @
 */
/**
 * @default
 */

/**
 * @
 */
/**
 * @default
 */

/**
 * @
 */
/**
 * @default
 */

/**
 * @
 */
/**
 * @default
 */
