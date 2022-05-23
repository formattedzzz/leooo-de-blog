/**
 * @字符串计算器
 */
var calculate = function (s) {
  let prev = 0
  let num = 0
  let sum = 0
  let preOp = '+'
  s += '&'
  for (let i = 0; i < s.length; i++) {
    if (s[i] == ' ') continue
    if (/\d/.test(s[i])) {
      let base = 10
      let v = Number(s[i])
      while (/\d/.test(s[i + 1]) && i + 1 < s.length) {
        v = base * v + Number(s[i + 1])
        i++
      }
      num = v
    } else {
      switch (preOp) {
        case '+':
          sum += prev
          prev = num
          break
        case '-':
          sum += prev
          prev = -num
          break
        case '*':
          prev *= num
          break
        case '/':
          prev /= num
          prev = Math.trunc(prev)
          break
      }
      preOp = s[i]
      num = 0
    }
  }
  return prev + sum
}

/**
 * @字符串相乘
 */
var multiply = function (num1, num2) {
  if (!num1 || !num2 || !Number(num1) || !Number(num2)) return 0
  var num1Arr = [...num1]
  var num2Arr = [...num2]
  var stack = new Array(num1.length + num2.length).fill(0)
  // console.log(stack);
  const fixNum = n => (Number(n) <= 9 ? '0' + n : '' + n)
  for (let num1idx = 0; num1idx < num1Arr.length; num1idx++) {
    for (let num2idx = 0; num2idx < num2Arr.length; num2idx++) {
      var [shi, ge] = fixNum(
        num1Arr[num1Arr.length - 1 - num1idx] *
          num2Arr[num2Arr.length - 1 - num2idx]
      ).split('')
      // console.log(shi + ge);
      stack[num1idx + num2idx] += Number(ge)
      if (stack[num1idx + num2idx] >= 10) {
        stack[num1idx + num2idx] -= 10
        stack[num1idx + num2idx + 1]++
      }
      stack[num1idx + num2idx + 1] += Number(shi)
      if (stack[num1idx + num2idx + 1] >= 10) {
        stack[num1idx + num2idx + 1] -= 10
        stack[num1idx + num2idx + 2]++
      }
      // console.log("--", stack);
    }
  }
  // console.log("----", stack);
  return stack.reverse().join('').replace(/^0+/, '')
}

/**
 * @字符串之KMP算法
 */
const kmp = (s1, s2) => {
  const n = s1.length //匹配串
  const m = s2.length //模式串
  if (!m) return 0 //模式串为空
  let next = new Array(m) //next数组
  next[0] = 0
  for (let i = 1, j = 0; i < m; i++) {
    while (j && s2[i] !== s2[j]) {
      //不匹配，左移
      j = next[j - 1]
    }
    if (s2[i] === s2[j]) ++j //匹配 j右移
    next[i] = j
  }
  //匹配
  for (let i = 0, j = 0; i < n; i++) {
    while (j && s1[i] !== s2[j]) {
      // 失配 左移
      j = next[j - 1]
    }
    if (s1[i] === s2[j]) ++j // 匹配 j + 1
    if (j === m) return i - m + 1
  }
  return -1
}

/**
 * @字符串之最长无重复子串
 */
function maxUnrepeat(s) {
  const occ = new Set()
  const n = s.length
  let rk = -1
  let ans = 0
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      occ.delete(s.charAt(i - 1))
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      occ.add(s.charAt(rk + 1))
      ++rk
    }
    ans = Math.max(ans, rk - i + 1)
  }
  return ans
}

/**
 * @字符串之最长无重复子串
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
 * @字符串按异位分组
 */
function groupAnagrams(strs) {
  const map = new Map()
  for (let str of strs) {
    let array = Array.from(str) //字符转成数组
    array.sort() //排序
    let key = array.toString()
    let list = map.get(key) ? map.get(key) : new Array() //从map中取到相应的数组
    list.push(str) //加入数组
    map.set(key, list) //重新设置该字符的数组
  }
  return Array.from(map.values()) //map中的value转成数组
}

/**
 * @两数之和
 */
function twoSum(nums, target) {
  map = new Map()
  for (let i = 0; i < nums.length; i++) {
    x = target - nums[i]
    if (map.has(x)) {
      return [map.get(x), i]
    }
    map.set(nums[i], i)
  }
}

/**
 * @三数之和
 */
function threeSum(nums) {
  let ans = []
  const len = nums.length
  if (nums == null || len < 3) return ans
  nums.sort((a, b) => a - b) // 对数组进行升序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] === nums[i - 1]) continue // 去重
    let L = i + 1
    let R = len - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) {
        ans.push([nums[i], nums[L], nums[R]])
        while (L < R && nums[L] === nums[L + 1]) L++ // 去重
        while (L < R && nums[R] === nums[R - 1]) R-- // 去重
        L++
        R--
      } else if (sum < 0) {
        L++
      } else if (sum > 0) {
        R--
      }
    }
  }
  return ans
}

/**
 * @计算两个正序数组的中位数
 */
function findMedianSortedArrays(nums1, nums2) {
  const arr = []
  while (nums1.length || nums2.length) {
    if (nums1[0] === undefined) {
      arr.push(nums2.shift())
      continue
    }
    if (nums2[0] === undefined) {
      arr.push(nums1.shift())
      continue
    }
    if (nums1[0] <= nums2[0]) {
      arr.push(nums1.shift())
    } else {
      arr.push(nums2.shift())
    }
  }
  return arr.length % 2 === 1
    ? arr[(arr.length - 1) / 2]
    : (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2
}
// console.log(findMedianSortedArrays([1, 2], [3, 4]))
// console.log(findMedianSortedArrays([1, 3], [2]))

/**
 * @乘积小于K的子数组个数
 */
function clacKCount(nums, k) {
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    const num_s = nums[i]
    let left = k / num_s
    if (left > 1) {
      res++
    } else {
      continue
    }
    for (let k = i + 1; k < nums.length; k++) {
      const num_e = nums[k]
      left = left / num_e
      if (left > 1) {
        res++
      } else {
        break
      }
    }
  }
  return res
}
// clacKCount([10, 5, 2, 6], 100)

/**
 * @合并区间
 */
function merge(intervals) {
  intervals.sort((L, R) => {
    return L[0] - R[0]
  })
  let idx = 0
  while (idx < intervals.length - 1) {
    const cur = intervals[idx]
    const next = intervals[idx + 1]
    const [s1, e1] = cur
    const [s2, e2] = next
    if (e1 >= s2) {
      intervals.splice(idx, 2, [s1, Math.max(e2, e1)])
    } else {
      idx++
    }
  }
  return intervals
}
// merge([
//   [1, 4],
//   [0, 2],
//   [3, 5]
// ])
