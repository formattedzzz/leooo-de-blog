/* eslint-disable no-unused-vars */

/**
 * @动态规划之最大子数组和
 */
function calcMaxAcc(arr) {
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
// console.log(calcMaxAcc([-1]))

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
  console.log(arr)
  return arr.length % 2 === 1
    ? arr[(arr.length - 1) / 2]
    : (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2
}
// console.log(findMedianSortedArrays([1, 2], [3, 4]))
// console.log(findMedianSortedArrays([1, 3], [2]))

/**
 * @栈运用之基本计算器
 */

/**
 * @栈运用之基本计算器加括号版本
 */

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
 * @括号生成
 */
var generateParenthesis = function (n) {
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
 * @第K个最大元素
 */
var findKthLargest = function (nums, k) {
  let heapSize = nums.length
  buildMaxHeap(nums, heapSize) // 构建好了一个大顶堆
  // 进行下沉 大顶堆是最大元素下沉到末尾
  for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
    swap(nums, 0, i)
    --heapSize // 下沉后的元素不参与到大顶堆的调整
    // 重新调整大顶堆
    maxHeapify(nums, 0, heapSize)
  }
  return nums[0]
  // 自下而上构建一颗大顶堆
  function buildMaxHeap(nums, heapSize) {
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      maxHeapify(nums, i, heapSize)
    }
  }
  // 从左向右，自上而下的调整节点
  function maxHeapify(nums, i, heapSize) {
    let l = i * 2 + 1
    let r = i * 2 + 2
    let largest = i
    if (l < heapSize && nums[l] > nums[largest]) {
      largest = l
    }
    if (r < heapSize && nums[r] > nums[largest]) {
      largest = r
    }
    if (largest !== i) {
      swap(nums, i, largest) // 进行节点调整
      // 继续调整下面的非叶子节点
      maxHeapify(nums, largest, heapSize)
    }
  }
  function swap(a, i, j) {
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
}

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
