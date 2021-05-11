# 动态规划基本思路

```js
// 凑零钱问题
// 动态规划 凑11块 => 凑10块、凑9块、凑6块
const coins = [1, 2, 5]
const target = 11

function calcMount(coins, target = 0) {
  const tempMap = {}
  function dp(target) {
    console.log('dp::', target)
    if (tempMap[target]) return tempMap[target]
    if (target < 0) return -1
    if (target === 0) return 0
    let tempR = Infinity
    coins.forEach(coin => {
      const sub = dp(target - coin)
      if (sub === -1) return
      tempR = Math.min(tempR, sub + 1)
    })
    tempMap[target] = tempR
    return tempR === Infinity ? -1 : tempR
  }
  return dp(target)
}
calcMount(coins, target)

// 动态规划说白了两步 1、确定base-case也就是边界条件 2、确定递归函数

// 求最大递增子序列的长度
const array = [1, 4, 3, 2, 6, 7, 5, 9]
// dp[i]表示以array[i]结尾的递增子序列的长度
// 数学归纳法

// 子序列最大和
const array = [1, 4, 3, 2, 6, 7, 5, 9]
// dp[i]表示以array[i]结尾的连续子序列的和

// 求最长公共子序列及其长度
const string1 = 'abagesoop' // long
const string2 = 'nabdge' // short
// dp[i, j]表示以string2[i]结尾的公共连续子序列的长度

// 背包问题
// const cap = 4
// const w_arr = [2, 1, 3]
// const v_arr = [4, 2, 3]
// result = 6
// 如何定义状态转移方程：
// 对于前 5 个物品、容量为 4 的可装的最大价值是 dp(5, 4)
const temp = {}
const w_arr = [2, 1, 3]
const v_arr = [4, 2, 3]
function calcMaxValueLoad(thing_num, cap) {
  // 从前thing_num件中拿若干件 容量为cap 返回最大值
  let value = 0
  if (thing_num < 1 || cap < 1) return value
  if (cap < w_arr[w_arr.length - thing_num]) {
    // 前thing_num件中的第一件就就放不下去了
    console.log('放不下::', cap, w_arr[w_arr.length - thing_num])
    return calcMaxValueLoad(thing_num - 1, cap)
  }
  const load =
    calcMaxValueLoad(thing_num - 1, cap - w_arr[w_arr.length - thing_num]) +
    v_arr[w_arr.length - thing_num]
  const notLoad = calcMaxValueLoad(thing_num - 1, cap)
  value = Math.max(load, notLoad)
  console.log({ thing_num, load, notLoad, value })
  return value
}
calcMaxValueLoad(3, 4)

// 分割等和子集
// [1, 5, 5, 11] => [1, 5, 5] [11]
// 问题转化为 是否存在若干元素恰好装满11 简版背包问题
const arr = [1, 2, 3, 8]
const sum =
  arr.reduce((acc, next) => {
    return acc + next
  }, 0) / 2
function judge(num, cap) {
  const len = arr.length
  console.log({ num, cap })
  if (num < 1) return false
  if (arr[len - num] > cap) return judge(num - 1, cap)
  if (arr[len - num] === cap) return true
  const load = judge(num - 1, cap - arr[len - num])
  const notLoad = judge(num - 1, cap)
  if (load) return true
  if (notLoad) return true
  return false
}
judge(4, sum)

// 完全背包问题
// 给定一组硬币和总额 求所有可以组合的方法
const amount = 11
const coins = [5, 2, 1, 3]
// 5 = 5
// 5 = 1 + 2 + 2
// 5 = 1 + 1 + 1 + 2
// 5 = 1 + 1 + 1 + 1 + 1
// 只从后num种物品中选 容量为cap的情况下 最多有calcCombineCountz(num, cap)种组合方法
const record = new Map()
function calcCombineCount(num, cap) {
  console.log({ num, cap })
  const len = coins.length
  const coin_val = coins[len - num]
  if (record.get(`${num}${cap}`)) return record.get(`${num}${cap}`)
  if (num < 1 || cap < 1) return 0
  if (num === 1 && cap % coins[len - num] === 0) return 1
  if (cap < coin_val) return calcCombineCount(num - 1, cap)
  if (cap === coin_val) return calcCombineCount(num - 1, cap) + 1
  let res_if_load = 0
  let res_if_not_load = calcCombineCount(num - 1, cap)
  let temp_load_num = Math.floor(cap / coin_val)
  for (let idx = 1; idx <= temp_load_num; idx++) {
    console.log(`if load${idx}个${coin_val},left_cap${cap - idx * coin_val}`)
    res_if_load += calcCombineCount(num - 1, cap - idx * coin_val)
  }
  console.log('res_if_load + res_if_not_load', res_if_load, res_if_not_load)
  record.set(`${num}${cap}`, res_if_load + res_if_not_load)
  return res_if_load + res_if_not_load
}
calcCombineCount(4, 11)
```
