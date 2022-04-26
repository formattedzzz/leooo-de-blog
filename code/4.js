class Node {
  constructor(key, L, R) {
    this.key = key
    this.L = L
    this.R = R
  }
  height() {}
  // 左旋
  rotateL() {}
  // 右旋
  rotateR() {}
}
function insert(root, node) {
  if (node.key < root.key) {
    if (root.L) {
      insert(root.L, node)
    } else {
      root.L = node
    }
  } else {
    if (root.R) {
      insert(root.R, node)
    } else {
      root.R = node
    }
  }
}
function preEach(root, cb) {
  if (root) {
    cb(root.key)
    preEach(root.L, cb)
    preEach(root.R, cb)
  }
}
function midEach(root, cb) {
  if (root) {
    midEach(root.L, cb)
    cb(root.key)
    midEach(root.R, cb)
  }
}
function bakEach(root, cb) {
  if (root) {
    bakEach(root.L, cb)
    bakEach(root.R, cb)
    cb(root.key)
  }
}
function getMin(root) {
  if (root) {
    if (root.L) return getMin(root.L)
    return root.key
  }
  return null
}
function getMax(root) {
  if (root) {
    if (root.R) return getMax(root.R)
    return root.key
  }
  return null
}

const bint = new Node(5)
insert(bint, new Node(4))
insert(bint, new Node(3))
insert(bint, new Node(2))
insert(bint, new Node(1))
insert(bint, new Node(6))
insert(bint, new Node(7))
insert(bint, new Node(8))
insert(bint, new Node(9))
insert(bint, new Node(10))
insert(bint, new Node(4))
insert(bint, new Node(3))
insert(bint, new Node(6))

preEach(bint, console.log)
console.log('---')
midEach(bint, console.log)
console.log('---')
bakEach(bint, console.log)
console.log('---')
console.log('min:', getMin(bint), 'max:', getMax(bint))

// 斜树
// 普通二叉树
// 平衡二叉树
// 完全二叉树
// 满二叉树
// 二叉搜索树

// 前序遍历 本身-左-右
// 中序遍历 左-本身-右
// 后序遍历 左-右-本身
// 总结就是何时输出本身

// 二叉查找树 转 平衡二叉树

// 二叉查找树 镜像、对称

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
 * @KMP算法
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
 * @两数之和
 */
var twoSum = function (nums, target) {
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
var threeSum = function (nums) {
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
 * @构建最大堆
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 整个流程就是上浮下沉
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
