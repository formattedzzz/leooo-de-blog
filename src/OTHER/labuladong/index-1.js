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

// var xhr = new XMLHttpRequest()
// xhr.open('GET', 'https://wx.nnleo.cn/views/users')
// xhr.onreadystatechange = res => {
//   console.log(res)
// }
// xhr.send()
