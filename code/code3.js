/**
 * @动态规划之最大子数组和
 */
function maxSubArray(nums) {
  var max = nums[0]
  var sum = 0
  for (let num of nums) {
    if (sum < 0) {
      sum = 0
    }
    sum += num
    max = Math.max(sum, max)
  }
  return max
}
function maxSubArray(arr) {
  const map = []
  let res = arr[0]
  function dp(idx) {
    if (map[idx] !== undefined) return map[idx]
    if (idx === 0 || dp(idx - 1) <= 0) {
      map[idx] = arr[idx]
      map[idx] = arr[idx]
      return arr[idx]
    } else {
      map[idx] = Math.max(dp(idx - 1) + arr[idx], arr[idx])
      return map[idx]
    }
  }
  dp(arr.length - 1)
  arr.forEach((_, idx) => {
    res = Math.max(res, map[idx])
  })
  return res
}
// (maxSubArray([-1])

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
// calcHandleTimes([5, 3, 1, 2, 4])

/**
 * @动态规划之最长公共子序列
 */
function maxCommonSeries(str1, str2) {
  if (!str1 || !str2) return 0
  const len1 = str1.length
  const len2 = str2.length
  const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0))
  for (let i = 1; i <= len1; i++) {
    for (let k = 1; k <= len2; k++) {
      if (str1[i - 1] == str2[k - 1]) {
        dp[i][k] = dp[i - 1][k - 1] + 1
      } else {
        dp[i][k] = Math.max(dp[i - 1][k], dp[i][k - 1])
      }
    }
  }
  return dp[len1][len2]
}

/**
 * @动态规划最长的斐波那契数列长度
 */
function lenLongestFibSubseq(arr) {
  const n = arr.length
  // 动态规划
  let dp = new Array(n)
  let map = new Map() // key 存数组值，value 存数组下标
  for (let i = 0; i < n; i++) {
    map.set(arr[i], i) // 数组严格递增，所以不会有重复
    dp[i] = []
  }
  // i>j>k  当 dp[i] = dp[j] + dp[k] 的时候  dp[i][j] = dp[j][k] + 1
  // 否则 dp[i][j] = 2; 因为当下一个式子成立时， dp应该取 3
  // 为什么要用 [i][j]  因为到达索引 i 时，它并不是一定存在于一种斐波那契数列中
  // 比如 8 可以是 1 3 4 8 ，也可以是 1 7 8 代表的两种 状态 显然是不同的
  let result = 0
  for (let i = 1; i < n; i++) {
    // 为什么i 不从2开始，j不从1开始： 因为我们要保证每一个dp[j][k]能至少取到 2
    for (let j = 0; j < i; j++) {
      let k = map.get(arr[i] - arr[j])
      if (k < j) {
        dp[i][j] = dp[j][k] + 1
        if (dp[i][j] > result) result = dp[i][j]
      } else {
        dp[i][j] = 2
      }
    }
  }
  return result
}

/**
 * @递归算法之括号生成
 */
function generateParenthesis(n) {
  const res = []

  const dfs = (lRemain, rRemain, str) => {
    if (str.length == 2 * n) {
      res.push(str)
      return
    }
    if (lRemain > 0) {
      dfs(lRemain - 1, rRemain, str + '(')
    }
    if (lRemain < rRemain) {
      dfs(lRemain, rRemain - 1, str + ')')
    }
  }
  dfs(n, n, '')
  return res
}

/**
 * @数学归纳法之第n个丑数
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

/**
 * @数学归纳法之求斐波那契数列的第n项
 */
function feibo(num) {
  var i = 1
  var j = 1
  var k = 2
  for (let n = 3; n <= num; n++) {
    ;[i, j, k] = [j, k, j + k]
  }
  if (num <= 2) return 1
  return j
}

/**
 * @数学归纳法之最长连续递增子序列的长度
 */
function findLengthOfLCIS(nums) {
  let dp = new Array(nums.length).fill(1)
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
    }
  }
  return Math.max(...dp)
}

/**
 * @数学归纳法之一步两步到目标步数的跳法总数
 */
function calcStepCount(n) {
  var arr = new Array(n + 1).fill(undefined)
  arr[0] = 0
  arr[1] = 1
  arr[2] = 2
  for (let idx = 3; idx < arr.length; idx++) {
    arr[idx] = arr[idx - 1] + arr[idx - 2]
  }
  return arr[n]
}

/**
 * @数学归纳法之求跳跃到终点的最少步数
 */
function calcMinJumps(nums) {
  let cur = 0 // 已经跳到了哪一个下标
  let next_max = 0 // 当前下标能跳到的最远下标
  let step = 0
  for (let idx = 0; idx < nums.length - 1; idx++) {
    next_max = Math.max(next_max, idx + nums[idx])
    if (cur == idx) {
      cur = next_max
      step++
    }
  }
  return step
}

/**
 * @数学归纳法之判断能否条跳到终点
 */
function canJumpToTerminal(nums) {
  let tempfar = 0
  for (let idx = 0; idx < nums.length; idx++) {
    const num = nums[idx]
    if (idx <= tempfar) tempfar = Math.max(tempfar, idx + num)
  }
  return tempfar >= nums.length - 1
}
// canJump([3, 2, 1, 0, 4])

/**
 * @数学归纳法之判断能否条跳到数值为零的下标
 */
function canJumpToZero(arr, start) {
  // 递归
  let findZero = false
  // 传入一个Set，来保证不会重复递归
  findNext(start, new Set())
  function findNext(index, visited) {
    // console.log(index);
    if (arr[index] == 0) {
      findZero = true
    }
    // 递归的时候要注意出口条件，不能无限循环栈溢出了
    if (
      index > arr.length - 1 ||
      index < 0 ||
      findZero ||
      index + arr[index] == index ||
      index - arr[index] == index ||
      visited.has(index)
    ) {
      return findZero
    }
    findNext(index + arr[index], visited.add(index))
    findNext(index - arr[index], visited.add(index))
  }
  return findZero
}
// canJumpToZero([4, 2, 3, 0, 3, 1, 2], 5)

/**
 * @数学归纳法打家劫舍
 */
function rob(nums) {
  var len = nums.length
  if (len < 2) return nums[len - 1] ? nums[len - 1] : 0
  // DP数组 自底往上递推
  var res = [nums[0], Math.max(nums[0], nums[1])]
  for (let i = 2; i < len; i++) {
    // 偷还是不偷 取大值即可
    res[i] = Math.max(res[i - 1], nums[i] + res[i - 2])
  }
  return res[len - 1]
}
