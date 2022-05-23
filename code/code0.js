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
function findKthLargest(nums, k) {
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
 * @二叉树路径总和
 */
function hasPathSum(root, sum) {
  if (!root) return false
  var cur = sum - root.val
  if (!root.left && !root.right && cur == 0) return true
  if (!root.left) return hasPathSum(root.right, cur)
  if (!root.right) return hasPathSum(root.left, cur)
  return hasPathSum(root.left, cur) || hasPathSum(root.right, cur)
}
/**
 * @二叉树最小深度
 */
function minDepth(root) {
  if (!root) return 0
  if (!root.left && !root.right) return 1
  if (!root.left) return minDepth(root.right) + 1
  if (!root.right) return minDepth(root.left) + 1
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1
}
/**
 * @二叉树中序遍历 递归
 */
function binaryMidEach1(root) {
  const res = []
  function viewNode(node) {
    if (!node) return
    if (node.left) viewNode(node.left)
    res.push(node.val)
    if (node.right) viewNode(node.right)
  }
  viewNode(root)
  return res
}
/**
 * @二叉树中序遍历 深度遍历
 */
function binaryMidEach2(root) {
  const res = []
  const stack = [root]
  while (stack.length) {
    const node = stack.shift()
    if (!node) continue
    if (node.left) {
      if (node.right) stack.unshift(node.right)
      stack.unshift(new TreeNode(node.val))
      stack.unshift(node.left)
    } else {
      res.push(node.val)
      if (node.right) stack.unshift(node.right)
    }
  }
  return res
}
/**
 * @二叉树层序遍历 栈运用
 */
function binaryLevelEach(root) {
  if (!root) return []
  const res = []
  let stack = [root]
  while (stack.length) {
    const nextStack = []
    const temp = []
    stack.forEach(n => {
      if (!n) return
      temp.push(n.val)
      if (n.left) nextStack.push(n.left)
      if (n.right) nextStack.push(n.right)
    })
    stack = nextStack
    res.push(temp)
  }
  return res
}

/**
 * @二叉树判断是否平衡
 */
function binaryBalanced(root) {
  if (!root) return true
  if (Math.abs(depth(root.left) - depth(root.right)) > 1) return false
  return binaryBalanced(root.left) && binaryBalanced(root.right)
  // 求最大深度
  function depth(node) {
    if (!node) return 0
    const left = depth(node.left)
    const right = depth(node.right)
    return Math.max(left, right) + 1
  }
}
/**
 * @二叉树生成所有不同的二叉搜索树
 */
function generateTrees(n) {
  let m = new Map()
  const findTree = function (l, r) {
    let tree = []
    if (l > r) {
      tree.push(null)
      return tree
    }
    let key = `${l}-${r}`
    if (m.has(key)) return m.get(key)
    for (let i = l; i <= r; i++) {
      let leftTree = findTree(l, i - 1)
      let rightTree = findTree(i + 1, r)
      for (let lt of leftTree) {
        for (let rt of rightTree) {
          tree.push(new TreeNode(i, lt, rt))
        }
      }
    }
    m.set(key, tree)
    return tree
  }
  return findTree(1, n)
}
/**
 * @二叉树判断两颗树是否相同
 */
function isSameTree(p, q) {
  if (p === null && q === null) return true
  if (p === null || q === null) return false
  if (p.val != q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}
/**
 * @二叉树判断两颗树是否对称
 */
function isSymmetric(root) {
  if (!root) return true
  var leftAndRight = function (left, right) {
    if (!left && !right) return true
    if (!left || !right) return false
    if (left.val != right.val) return false
    return (
      leftAndRight(left.left, right.right) &&
      leftAndRight(left.right, right.left)
    )
  }
  return leftAndRight(root.left, root.right)
}
