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

// for (let index = 0; index < 5; index++) {
//   setTimeout(() => {
//     console.log(5)
//   })
// }
// console.log(index)
// function runFor(s, e, cb) {
//   for (var i = s; i < e; i++) {
//     ;(function(i) {
//       cb(i)
//     })(i)
//   }
// }
// runFor(0, 5, (i) => {
//   setTimeout(console.log(i))
// })

// class Leo {
//   name = ''
//   constructor(name) {
//     this.name = name
//   }
//   bark() {
//     console.log(this.name)
//   }
//   getSingle() {
//     return Leo.single()
//   }
//   static single = (function() {
//     let ins = null
//     return () => {
//       if (ins) return ins
//       ins = new Leo('single')
//       return ins
//     }
//   })()
// }
// console.log(Leo.single() === Leo.single())
// console.log(new Leo().getSingle() === new Leo().getSingle())

// function quickSort(arr) {
//   if (arr.length <= 1) return arr
//   let mid = arr.length % 2 === 0 ? arr.length / 2 : (arr.length - 1) / 2
//   console.log(mid)
//   let L = []
//   let R = []
//   for (let idx = 0; idx < arr.length; idx++) {
//     if (idx !== mid) {
//       if (arr[idx] <= arr[mid]) {
//         L.push(arr[idx])
//       } else {
//         R.push(arr[idx])
//       }
//     }
//   }
//   console.log('---', L, R)
//   return quickSort(L)
//     .concat([arr[mid]])
//     .concat(quickSort(R))
// }
// console.log(quickSort([2, 1]))
// console.log(quickSort([2, 1, 9, 3, 7, 2, 5, 6, 3, 8, 0, 3, 10]))

// 将树形数组拍平 数组中有字符串有数字 保持原有的数据类型
function flat(arr) {
  const res = []
  const stack = []
  stack.push(...arr)
  while (stack.length) {
    const last = stack.pop()
    if (Array.isArray(last)) {
      stack.push(...last)
    } else {
      console.log(last)
      res.unshift(last)
    }
  }
  return res
}
function flat2(arr) {
  const res = []
  const stack = []
  stack.push(...arr)
  while (stack.length) {
    const last = stack.shift()
    if (Array.isArray(last)) {
      stack.unshift(...last)
    } else {
      console.log(last)
      res.push(last)
    }
  }
  return res
}

function flat3(arr) {
  function it(arr) {
    const res = []
    for (let idx = 0; idx < arr.length; idx++) {
      if (Array.isArray(arr[idx])) {
        res.push(...it(arr[idx]))
      } else {
        res.push(arr[idx])
      }
    }
    return res
  }
  return it(arr)
}
// console.log(flat3([1, 2, '3', [4, [5, '6'], 7]]))
// console.log(flat2([1, 2, '3', [4, [5, '6'], 7]]))

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

// var now = Date.now()

// while (Date.now() - now < 3000) {
//   //
// }

// console.log(maxProfit([-1, 2, 3, -4, 3, 5]))

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

const btn = document.querySelector('.button')
btn.addEventListener(
  'click',
  () => {
    Promise.resolve().then(() => {
      console.log('micro-task-1')
    })
    console.log('click1')
    setTimeout(() => {
      console.log('timer1')
    })
  },
  false
)
btn.addEventListener(
  'click',
  () => {
    Promise.resolve().then(() => {
      console.log('micro-task-2')
    })
    console.log('click2')
    setTimeout(() => {
      console.log('timer2')
    })
  },
  false
)
btn.addEventListener(
  'click',
  () => {
    Promise.resolve().then(() => {
      console.log('micro-task-3')
    })
    console.log('click3')
    setTimeout(() => {
      console.log('timer3')
    })
  },
  false
)
btn.click()
