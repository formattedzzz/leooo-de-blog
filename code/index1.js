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
// var clear = interval(
//   () => {
//     console.log(1)
//   },
//   2000,
//   true
// )
// clear()

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