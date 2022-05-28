# 面试题 设计一个异步任务并发器

原题：

```js
const timeout = time => {
  return new Promise(ok => {
    setTimeout(() => ok('time:' + time), time)
  })
}
const schedule = new Scheduler(2)
function addTask(time, order) {
  schedule
    .add(() => timeout(time))
    .then(res => {
      console.log({ res, order })
    })
}
addTask(800, 1)
addTask(300, 2)
addTask(400, 3)
addTask(500, 4)
addTask(400, 5)
// 依次输出 2-3-1-5-4

// 请实现
class Scheduler {
  // ...
}
```

简易实现

```js
const timeout = time => {
  return new Promise(ok => {
    setTimeout(() => ok('time:' + time), time)
  })
}
class Scheduler {
  constructor(max) {
    this.max = max
    this.tasks = []
    this.polling = 0
  }

  add(task) {
    return new Promise((resolve, reject) => {
      const taskItem = {
        task,
        resolve,
        reject
      }
      this.tasks.push(taskItem)
      if (this.polling < this.max) this.poll()
    })
  }

  poll() {
    if (!this.tasks.length) {
      this.polling--
      return
    }
    const taskItem = this.tasks.shift()
    const { task, resolve, reject } = taskItem
    this.polling++
    task()
      .then(resolve, reject)
      .finally(() => {
        this.poll()
      })
  }
}

const schedule = new Scheduler(2)
function addTask(time, order) {
  schedule
    .add(() => timeout(time))
    .then(res => {
      console.log({ res, order })
    })
}
addTask(800, 1)
addTask(300, 2)
addTask(400, 3)
addTask(500, 4)
addTask(400, 5)
// 并发通道数为2
// { res: 'time:300', order: 2 }
// { res: 'time:400', order: 3 }
// { res: 'time:800', order: 1 }
// { res: 'time:400', order: 5 }
// { res: 'time:500', order: 4 }

const schedule2 = new Scheduler(2)
function addTask(time, order) {
  schedule2
    .add(() => timeout(time))
    .then(res => {
      console.log({ res, order })
    })
}
addTask(800, 1)
addTask(300, 2)
addTask(400, 3)
addTask(500, 4)
addTask(400, 5)
// 并发通道数改为1 所有任务退化成串行执行
// { res: 'time:800', order: 1 }
// { res: 'time:300', order: 2 }
// { res: 'time:400', order: 3 }
// { res: 'time:500', order: 4 }
// { res: 'time:400', order: 5 }
```

代码组织的注意点 schedule 实例 add task 之后返回新的 promise 需要将新的 promise 与任务执行产生的 promise 进行联合
