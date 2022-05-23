/* eslint-disable no-unused-vars */
// document.body.addEventListener('click', (ev) => {
//   console.log('111')
//   ev.stopPropagation()
// }, true)
// $0.addEventListener('click', (ev) => {
//   console.log('222')
// }, true)

// window.onload = () => {
//   console.log('loaded')
//   var div1 = document.querySelector('.div1')
//   var div2 = document.querySelector('.div2')
//   var btn = document.querySelector('button')

//   div1.addEventListener(
//     'click',
//     ev => {
//       // ev.stopImmediatePropagation()
//       alert('div1')
//     },
//     true
//   )
//   div1.addEventListener(
//     'click',
//     ev => {
//       ev.stopImmediatePropagation()
//       alert('div1-1')
//     },
//     true
//   )
//   div2.addEventListener(
//     'click',
//     () => {
//       alert('div2')
//     },
//     true
//   )
//   btn.addEventListener(
//     'click',
//     () => {
//       alert('button')
//     },
//     true
//   )
// }

// requestIdleCallback(myNonEssentialWork, { timeout: 2000 })
// 任务队列
// const tasks = [
//   () => {
//     console.log('第一个任务')
//   },
//   () => {
//     console.log('第二个任务')
//   },
//   () => {
//     console.log('第三个任务')
//   },
// ]
// function myNonEssentialWork(deadline) {
//   // 如果帧内有富余的时间，或者超时
//   while (
//     (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
//     tasks.length > 0
//   ) {
//     work()
//   }
//   if (tasks.length > 0) requestIdleCallback(myNonEssentialWork)
// }
// function work() {
//   tasks.shift()()
//   console.log('执行任务')
// }

// requestIdleCallback(() => {
//   console.log('requestIdleCallback')
// })

// requestAnimationFrame(() => {
//   console.log('requestAnimationFrame')
// })

// window.addEventListener('message', console.log)
// window.postMessage('nihao')

// Promise.resolve().then(() => {
//   console.log('promise')
// })
// setTimeout(() => {
//   console.log('timeout')
// })
// console.log('main')
// window.info = {
//   version: 12,
// }

// 记录任务开始时间
// let now = Date.now()
// // 插入十万条数据
// const total = 1000
// // 获取容器
// let ul = document.body
// // 将数据插入容器中
// for (let i = 0; i < total; i++) {
//   let li = document.createElement('li')
//   li.innerText = ~~(Math.random() * total)
//   ul.appendChild(li)
// }

// console.log('JS运行时间：', Date.now() - now)
// requestAnimationFrame(() => {
//   console.log('requestAnimationFrame', Date.now() - now)
// })
// requestIdleCallback(() => {
//   console.log('requestIdleCallback', Date.now() - now)
// })
// setTimeout(() => {
//   console.log('总运行时间：', Date.now() - now)
// }, 0)

function interval(cb, inter, rightnow) {
  let timer = null
  if (rightnow) cb()
  const temp = () => {
    cb()
    timer = setTimeout(temp, inter)
  }
  timer = setTimeout(temp, inter)
  return () => {
    clearTimeout(timer)
  }
}
var clear = interval(
  () => {
    console.log(1)
  },
  2000,
  true
)
clear()

function throttle(func, inter, rightnow) {
  let canrun = false
  let now = Date.now()
  let inited = false
  return function () {
    if (rightnow && !inited) {
      func.call(this, ...arguments)
      inited = true
    }
    if (Date.now() - now >= inter) canrun = true
    if (canrun) {
      func.call(this, ...arguments)
      now = Date.now()
      canrun = false
    }
  }
}
var fun = throttle(
  function num(num, name) {
    console.log(num, name, 1)
  },
  2000,
  true
)

// document.addEventListener('scroll', () => fun(100, 'leo'))

// ;(function() {
//   var callbacks = [],
//     timeLimit = 1000,
//     open = false
//   setInterval(loop, 500)
//   return {
//     addListener: function(fn) {
//       callbacks.push(fn)
//     },
//     cancleListenr: function(fn) {
//       callbacks = callbacks.filter(function(v) {
//         return v !== fn
//       })
//     },
//   }
//   function loop() {
//     var startTime = new Date()
//     debugger
//     console.log('lp')
//     if (new Date() - startTime > timeLimit) {
//       if (!open) {
//         callbacks.forEach(function(fn) {
//           fn.call(null)
//         })
//       }
//       open = true
//       window.stop()
//       alert('不要扒我了')
//       window.location.reload()
//     } else {
//       open = false
//     }
//   }
// })().addListener(function() {
//   window.location.reload()
// })
