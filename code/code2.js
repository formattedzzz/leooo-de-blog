/**
 * @栈运用之栈模拟队列
 */
function buildQueueByStack() {
  var Stack = function () {
    this._state = []
  }
  Stack.prototype.push = function (val) {
    this._state.push(val)
  }
  Stack.prototype.pop = function () {
    return this._state.pop()
  }
  Stack.prototype.peek = function () {
    return this._state[this._state.length - 1]
  }
  Stack.prototype.size = function () {
    return this._state.length
  }
  Stack.prototype.empty = function () {
    return this._state.length == 0
  }

  var MyQueue = function () {
    this._stack1 = new Stack()
    this._stack2 = new Stack()
  }

  MyQueue.prototype.push = function (x) {
    this._stack1.push(x)
  }

  MyQueue.prototype.peek = function () {
    if (this._stack2.size() == 0) {
      while (this._stack1.size() > 0) {
        this._stack2.push(this._stack1.pop())
      }
    }
    return this._stack2.peek()
  }

  MyQueue.prototype.pop = function () {
    if (this._stack2.size() == 0) {
      while (this._stack1.size() > 0) {
        this._stack2.push(this._stack1.pop())
      }
    }
    return this._stack2.pop()
  }

  MyQueue.prototype.empty = function () {
    return this._stack1.size() + this._stack2.size() == 0
  }
  return MyQueue
}

/**
 * @栈运用之判断括号有效性
 */
function checkPairs(str) {
  let stack = []
  const L = {
    '{': true,
    '(': true,
    '[': true
  }
  const R = {
    '}': true,
    ')': true,
    ']': true
  }
  const LR = {
    '}': '{',
    ')': '(',
    ']': '['
  }
  for (let idx = 0; idx < str.length; idx++) {
    const s = str[idx]
    if (L[s]) {
      stack.push(s)
    }
    if (R[s]) {
      if (!stack.length) return false
      if (LR[s] === stack[stack.length - 1]) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}

/**
 * @滑动窗口之盛水最多的容器
 */
function maxArea(nums) {
  let S = 0
  let E = nums.length - 1
  let res = 0
  while (S < E) {
    res = Math.max(res, (E - S) * Math.min(nums[S], nums[E]))
    nums[S] < nums[E] ? S++ : E--
  }
  return res
}
// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))

/**
 * @滑动窗口之接雨水问题
 */
function maxContain(height) {
  const len = height.length
  let sum = 0
  // 找到最大的第一个数max，以其索引p为基准，将原数组分割为一左一右两个数组
  // 左数组的右边界最大高度和右数组的左边界最大高度都为max
  let max = Math.max(...height)
  let p = height.indexOf(max)
  // l为左数组的左边界最大高度的初始值，r为右边界最大高度的初始值
  let l = height[0],
    r = height[len - 1]
  // 遍历左数组，如果该数小于左边界最大高度l，则该格子蓄水量为l - height[i]， 反之则更新l的值
  for (let i = 1; i < p; i++) {
    if (height[i] < l) {
      sum += l - height[i]
    } else {
      l = height[i]
    }
  }
  // 倒叙遍历右数组，如果该数小于右边界最大高度r，则该格子蓄水量为r - height[i]， 反之则更新r的值
  for (let i = len - 2; i > p; i--) {
    if (height[i] < r) {
      sum += r - height[i]
    } else {
      r = height[i]
    }
  }
  return sum
}

/**
 * @判断直线上的点
 */
function maxPoints(points) {
  if (points.length <= 2) return points.length
  const ID_2_AB = {}
  let res = 0
  for (let idx1 = 0; idx1 < points.length - 1; idx1++) {
    const dot1 = points[idx1]
    for (let idx2 = idx1 + 1; idx2 < points.length; idx2++) {
      const dot2 = points[idx2]
      ID_2_AB[`${idx1}-${idx2}`] = calcAB(dot1, dot2)
    }
  }
  Object.keys(ID_2_AB).forEach(key => {
    const S = +key.split('-')[0]
    const E = +key.split('-')[1]
    const L = ID_2_AB[key]
    if (E - S < 2) return
    let temp = 0
    for (let idx = S + 1; idx < E; idx++) {
      const middot = points[idx]
      if (check(middot, L)) temp++
    }
    if (temp > res) res = temp
  })
  return res + 2
  function calcAB([x1, y1], [x2, y2]) {
    if (x1 === x2) return { a: Infinity, b: x1 }
    let a = (y2 - y1) / (x2 - x1)
    let b = y1 - a * x1
    return { a, b }
  }
  function check([x1, y1], { a, b }) {
    if (a === Infinity) return Math.abs(x1 - b) < 1e-10
    return Math.abs(x1 * a + b - y1) < 1e-10
  }
}
// maxPoints([
//   [-184, -551],
//   [-105, -467],
//   [-90, -394],
//   [-60, -248],
//   [115, 359],
// ])

/**
 * @买卖股票1
 */
function maxProfit1(ps) {
  let min_p = Infinity
  let max = 0
  for (let idx = 0; idx < ps.length; idx++) {
    const p = ps[idx]
    if (p < min_p) {
      min_p = p
    } else {
      max = Math.max(max, p - min_p)
    }
  }
  return max
}
/**
 * @买卖股票2
 */
function maxProfit2(prices) {
  var max = 0
  var len = prices.length
  for (var i = 0; i < len - 1; i++) {
    if (prices[i + 1] > prices[i]) {
      max += prices[i + 1] - prices[i]
    }
  }
  return max
}

/**
 * @分糖果 根据评分数组分配求最少需要的糖果数
 */
function minCandyCountDiviedByRate(ratings) {
  const divs = new Array(ratings.length).fill(1)
  for (let idx = 1; idx < divs.length; idx++) {
    if (ratings[idx] > ratings[idx - 1]) {
      divs[idx] = divs[idx - 1] + 1
    }
  }
  for (let idx = divs.length - 2; idx >= 0; idx--) {
    if (ratings[idx] > ratings[idx + 1]) {
      divs[idx] = Math.max(divs[idx], divs[idx + 1] + 1)
    }
  }
  return divs.reduce((acc, nex) => {
    return acc + nex
  }, 0)
}
// candy([1, 3, 4, 5, 2])

/**
 * @分糖果 二分法(n堆糖果分给k个人 求最大分得数)
 */
function maximumCandies(candies, k) {
  const sum = candies.reduce((cur, next) => cur + next, 0)
  if (sum < k) {
    return 0
  }
  let ans = 1
  let lo = 1
  let hi = Math.max(...candies)
  function check(n) {
    let cnt = 0
    for (let c of candies) {
      cnt += Math.floor(c / n)
    }
    return cnt >= k
  }
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1)
    if (!check(mid)) {
      hi = mid - 1
    } else {
      ans = mid
      lo = mid + 1
    }
  }
  return ans
}
