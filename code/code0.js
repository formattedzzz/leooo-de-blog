/**
 * @深拷贝
 */
function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

/**
 * @快速排序
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  let mid = arr.length % 2 === 0 ? arr.length / 2 : (arr.length - 1) / 2
  console.log(mid)
  let L = []
  let R = []
  for (let idx = 0; idx < arr.length; idx++) {
    if (idx !== mid) {
      if (arr[idx] <= arr[mid]) {
        L.push(arr[idx])
      } else {
        R.push(arr[idx])
      }
    }
  }
  console.log('---', L, R)
  return quickSort(L).concat([arr[mid]]).concat(quickSort(R))
}

/**
 * @数组扁平化
 */
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

/**
 * @LRU缓存算法
 */
class LRUCache {
  constructor(maxnum) {
    this.maxnum = maxnum > 0 ? maxnum : 1
    this.cache = {}
    this.keys = []
  }

  get(key) {
    if (this.cache[key]) {
      this.remove(this.keys, key)
      this.keys.push(key)
      return this.cache[key]
    }
    return -1
  }

  put(key, val) {
    this.cache[key] = val
    if (!this.cache[key]) {
      this.keys.push(key)
    } else {
      this.remove(this.keys, key)
      this.keys.push(key)
    }
    if (this.keys.length > this.maxnum) {
      delete this.cache[this.keys.shift()]
    }
  }

  remove(arr, item) {
    const idx = arr.indexOf(item)
    if (idx >= 0) {
      return arr.splice(idx, 1)
    }
    return []
  }
}

/**
 * @第K个最大元素
 */
var findKthLargest = function (nums, k) {
  const res = []
  buildHeap(nums)
  const n = nums.length
  // 此处一定要是n, 不能是nums.length;因为nums大小在改变
  for (let i = n - 1; i >= n - k; i--) {
    ;[nums[0], nums[nums.length - 1]] = [nums[nums.length - 1], nums[0]]
    res.push(nums.pop())
    // 从堆顶0开始调整
    headAdjust(0, nums.length, nums)
  }
  return res.pop()
  function buildHeap(nums) {
    const n = nums.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      headAdjust(i, n, nums)
    }
  }
  function headAdjust(i, n, nums) {
    let left = 2 * i + 1
    let right = left + 1
    let large = i
    if (left < n && nums[left] > nums[large]) {
      large = left
    }
    if (right < n && nums[right] > nums[large]) {
      large = right
    }
    if (large != i) {
      ;[([nums[i], nums[large]] = [nums[large], nums[i]])]
      headAdjust(large, n, nums)
    }
  }
}

function calcInitPoker(nums) {
  if (nums.length <= 2) return nums
  const res = []
  while (nums.length) {
    res.push(nums.pop())
    if (res.length >= 3) {
      ;[res[res.length - 2], res[0]] = [res[0], res[res.length - 2]]
    }
  }
  console.log(res)
  return res
}
// calcInitPoker([9, 8, 7, 6, 5, 4, 3, 2, 1])

/**
 * @数字转罗马数字
 */
function intToRoman(num) {
  const gemap = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  const shimap = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
  const baimap = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
  let res = ''
  let [ge = 0, shi = 0, bai = 0, qian = 0] = String(num).split('').reverse()
  res += new Array(+qian).fill('M').join('')
  res += baimap[bai]
  res += shimap[shi]
  res += gemap[ge]
  return res
}
function intToRoman(num) {
  const valueSymbols = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ]
  const roman = []
  for (const [value, symbol] of valueSymbols) {
    while (num >= value) {
      num -= value
      roman.push(symbol)
    }
    if (num == 0) {
      break
    }
  }
  return roman.join('')
}
/**
 * @任务调度
 */
var leastInterval = function (tasks, n) {
  let totalCount = tasks.length
  let maxCount = 0 // 单个任务执行的最多次数
  let count = 0 // 执行maxCount的任务数量
  let taskMap = {}
  for (let i = 0; i < totalCount; i++) {
    if (taskMap[tasks[i]]) {
      taskMap[tasks[i]]++
    } else {
      taskMap[tasks[i]] = 1
    }
  }
  // console.log(taskMap)
  for (let key in taskMap) {
    if (taskMap[key] == maxCount) {
      maxCount = taskMap[key]
      count++
    } else if (taskMap[key] > maxCount) {
      maxCount = taskMap[key]
      count = 1
    }
  }
  // console.log(maxCount)
  // console.log(count)
  return Math.max((maxCount - 1) * (n + 1) + count, totalCount)
}
/**
 * @统计可以被K整除的下标对数目
 */
var countPairs = function (nums, k) {
  const map = {}
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    const yue = gcd(nums[i], k)
    for (const key in map) {
      if ((yue * key) % k == 0) {
        res += map[key]
      }
    }
    if (map[yue]) {
      map[yue]++
    } else {
      map[yue] = 1
    }
  }
  return res
  function gcd(a, b) {
    if (a < b) {
      ;[a, b] = [b, a]
    }
    if (a % b == 0) {
      return b
    } else {
      return gcd(b, a % b)
    }
  }
}
/**
 * @检查数组对是否可以被k整除
 */
var canArrange = function (arr, k) {
  let m = new Map()
  for (let i of arr) {
    let mod = ((i % k) + k) % k
    if (!m.has(mod)) m.set(mod, 1)
    else m.set(mod, m.get(mod) + 1)
  }
  if (m.has(0) && m.get(0) % 2 !== 0) return false
  if (k % 2 === 0 && m.has(k / 2) && m.get(k / 2) % 2 !== 0) return false
  for (let [kk, vv] of m.entries()) {
    if (kk !== 0 && (k % 2 !== 0 || kk !== k / 2)) {
      if (vv !== m.get(k - kk)) return false
    }
  }
  return true
  // int[] mod = new int[k];
  // for (int num : arr) {
  //     ++mod[(num % k + k) % k];
  // }
  // for (int i = 1; i + i < k; ++i) {
  //     if (mod[i] != mod[k - i]) {
  //         return false;
  //     }
  // }
  // return mod[0] % 2 == 0
}
