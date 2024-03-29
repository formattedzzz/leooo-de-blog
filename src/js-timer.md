# js 靠谱的定时任务

- 合理的 `setinterval`

```js
/**
 * @description timeout 版本的 interval 保证轮询的时间间隔
 * @param {cb}
 * @param {inter}
 * @returns {Function} 清楚定时器的方法
 */
const timerMap = {}
export function intervalTimer(cb, inter, now) {
  const mark = Math.random()
    .toString(36)
    .slice(8)
  if (now) cb()
  const temp = function() {
    cb && cb()
    clearTimeout(timerMap[mark])
    timerMap[mark] = setTimeout(temp, inter)
  }
  timerMap[mark] = setTimeout(temp, inter)
  return () => clearTimeout(timerMap[mark])
}
```

- 功能扩展

```js
/*
    @ timer 对象
    @ 提供 7 个API如下：
    @ timer.setTimeout(fun, delay[, id])
    @ timer.clearTimeout(id)
    @ timer.setInterval(fun, delay[, id])
    @ timer.clearInterval(id)
    @ timer.delete(id) 删除对应id的timeout/interval
    @ timer.pause(id) 暂停对应id的timeout/interval
    @ timer.resume(id) 恢复对应id的timeout/interval
    @ timer.clean() 清空所有 timeout & interval
*/

class Timer {
  // 构造函数
  constructor() {
    // 暂停状态 - 这是个公共状态，由外部 Ticker 决定。
    this.paused = true

    // 队列
    this.queue = new Map()

    // 正在使用 timer 的 RAF
    this.usingRAF = false

    // useRAF 触发器
    Reflect.defineProperty(this, 'useRAF', {
      set: function(value) {
        Reflect.set(this, 'usingRAF', value)
        value ? Timer.RAF.enable() : Timer.RAF.disable()
      }
    })
  }

  // setTimeout 的实现
  setTimeout(fn, delay, id = Symbol('timeoutID')) {
    // 存入队列
    this.queue.set(id, {
      fn: fn,
      type: 0,
      paused: 0,
      elapsed: 0,
      delay: delay
    })
    return id
  }

  // clearTimeout
  clearTimeout(id) {
    return this.delete(id)
  }

  // setInterval 的实现
  setInterval(fn, delay, id = Symbol('intervalID')) {
    // 存入队列
    this.queue.set(id, {
      fn: fn,
      type: 1,
      paused: 0,
      elapsed: 0,
      delay: delay
    })
    return id
  }

  // clearInterval
  clearInterval(id) {
    return this.delete(id)
  }

  // 修改指定id的 delay/fn
  set(id, config = {}) {
    let item = this.queue.get(id) || {}
    for (let key in config) {
      item[key] = config[key]
    }
    return true
  }

  // 删除 queue 上的成员
  delete(id) {
    return this.queue.delete(id)
  }

  // 暂停指定id
  pause(id) {
    id === undefined ? this.pauseAll() : (this.queue.get(id).paused = 1)
    return true
  }

  // 恢复指定id
  resume(id) {
    return this.play(id)
  }

  // 播放指定id
  play(id) {
    id === undefined ? this.playAll() : (this.queue.get(id).paused = 0)
    return true
  }

  // 清空timer
  clean() {
    this.queue = new Map()
    return true
  }

  // 暂停全部 id
  pauseAll() {
    this.queue.forEach(item => (item.paused = 1))
    return true
  }

  // 播放全部 id
  playAll() {
    this.queue.forEach(item => (item.paused = 0))
    return true
  }

  // 重置 elapsed 为 0
  reset = function(id) {
    id === undefined ? this.resetAll() : (this.queue.get(id).elapsed = 0)
  }

  // 重置所有的 elapsed 为 0
  resetAll = function() {
    this.queue.forEach(function(item) {
      item.elapsed = 0
    })
  }

  // tick
  tick(delta) {
    this.paused || this.updateQueue(delta)
  }

  // 更新 map 队列
  updateQueue(delta) {
    this.queue.forEach((item, id) => {
      if (item.paused === 1) return
      item.elapsed += delta
      if (item.elapsed >= item.delay) {
        item.fn()
        item.type === 0 ? this.delete(id) : (item.elapsed = 0)
      }
    })
  }

  // 状态更新
  update() {
    // 第一次调用 update 时主动停用原生接口
    this.useRAF = false
    // 下面是真正的 update
    this.update = delta => {
      if (this.usingRAF) return
      this.tick(delta)
    }
  }
}

class AnimationFrame {
  constructor() {
    this.time = 0
    this.auto = this.auto.bind(this)
  }
  auto(elapsed) {
    timer.tick(elapsed - this.time)
    this.time = elapsed
    this.id = requestAnimationFrame(this.auto)
  }
  enable() {
    timer.paused = false
    this.id = requestAnimationFrame(this.auto)
  }
  disable() {
    cancelAnimationFrame(this.id)
  }
}

Timer.RAF = new AnimationFrame()
let timer = new Timer()
timer.useRAF = true
export default timer
```
