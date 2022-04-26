/* eslint-disable no-unused-vars */
function ListNode(val, next) {
  this.val = val
  this.next = next || null
}
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @买卖股票1
 */
var maxProfit = function (ps) {
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
 * @栈运用之判断括号有效性
 */
var isValid = function (str) {
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
// console.log(isValid('{}[]({[]})'))

/**
 * @动态规划之最少操作次数
 */
function calcHandleTimes(nums) {
  let len = nums.length
  function dp(idx) {
    if (idx < 1) return 1
    if (nums[idx] > nums[idx - 1]) {
      return dp(idx - 1) + 1
    } else {
      return dp(idx - 1)
    }
  }
  return len - dp(len - 1)
}
console.log(calcHandleTimes([5, 3, 1, 2, 4]))

/**
 * @分糖果
 */
function candy(ratings) {
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
  console.log(divs)
  return divs.reduce((acc, nex) => {
    return acc + nex
  }, 0)
}
console.log(candy([1, 3, 4, 5, 2]))

/**
 * @跳跃问题
 */
function canJump(nums) {
  let tempfar = 0
  for (let idx = 0; idx < nums.length; idx++) {
    const num = nums[idx]
    if (idx <= tempfar) tempfar = Math.max(tempfar, idx + num)
  }
  return tempfar >= nums.length - 1
}
console.log(canJump([3, 2, 1, 0, 4]))

/**
 * @最长无重复子串
 */
function longSubstringLength(str) {
  if (str.length <= 1) return str.length
  const temp = new Map()
  let res = 0
  let S = 0
  let E = 0
  for (let idx = 0; idx < str.length; idx++) {
    const s = str[idx]
    if (!temp.has(s)) {
      temp.set(s, idx)
      E++
      res = Math.max(E - S, res)
    } else {
      const dupidx = temp.get(s)
      if (dupidx < S) {
        E++
        temp.set(s, idx)
        res = Math.max(E - S, res)
      } else {
        S = dupidx + 1
        E = idx + 1
        temp.set(s, idx)
      }
    }
    console.log('----', s, `${S}-${E}`, str.slice(S, E))
  }
  return res
}
// abcabcbb bbbbb abs pwwkew aabaab!bb tmmzuxt
// console.log(longSubstringLength('tmmzuxt'))

/**
 * @滑动窗口之接雨水问题
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
  // console.log(ID_2_AB)
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
}
// y = ax + b
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
// console.log(
//   maxPoints([
//     [-184, -551],
//     [-105, -467],
//     [-90, -394],
//     [-60, -248],
//     [115, 359],
//     [138, 429],
//     [60, 336],
//     [150, 774],
//     [207, 639],
//     [-150, -686],
//     [-135, -613],
//     [92, 289],
//     [23, 79],
//     [135, 701],
//     [0, 9],
//     [-230, -691],
//     [-115, -341],
//     [-161, -481],
//     [230, 709],
//     [-30, -102],
//   ])
// )

/**
 * @第n个丑数
 */
// [1, 2, 3, 4, 5]
// n = 2 p2 1 p3 1 p5 1 2-3-5 dp[n]=min(2,3,5)=2 p2++
// n = 3 p2 2 p3 1 p5 1 4-3-5 fp[n]=min(4,3,5)=3 p3++
// n = 4 p2 2 p3 2 p5 1 4-6-5 fp[n]=min(4,6,5)=4 p2++
// n = 5 p2 3 p3 2 p5 1 6-6-5 fp[n]=min(6,6,5)=5 p5++
function nthUglyNumber(n) {
  const dp = new Array(n + 1).fill(0)
  dp[1] = 1
  let p2 = 1
  let p3 = 1
  let p5 = 1
  for (let i = 2; i <= n; i++) {
    const num2 = dp[p2] * 2
    const num3 = dp[p3] * 3
    const num5 = dp[p5] * 5
    dp[i] = Math.min(Math.min(num2, num3), num5)
    if (dp[i] === num2) p2++
    if (dp[i] === num3) p3++
    if (dp[i] === num5) p5++
  }
  return dp[n]
}

var findLengthOfLCIS = function (nums) {
  let dp = new Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
  }
  return Math.max(...dp)
}
