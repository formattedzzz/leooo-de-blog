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
 * @链表相交点
 */
function getIntersectionNode(headA, headB) {
  if (headA === null || headB === null) {
    return null
  }
  let pA = headA,
    pB = headB
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }
  return pA //当pA === pB时就是交点
}
function getIntersectionNode() {
  const visited = new Set()
  let p = headB,
    q = headA
  while (p) {
    visited.add(p)
    p = p.next
  }
  while (q) {
    if (visited.has(q)) {
      return q
    }
    q = q.next
  }
  return null
}
/**
 * @链表两数相加
 */
function addTwoNumbers1(l1, l2) {
  var ten = 0
  var head = null
  var tail = null
  while (l1 || l2) {
    var l1Val = l1 !== null && l1.val ? l1.val : 0
    var l2Val = l2 !== null && l2.val ? l2.val : 0
    var sum = l1Val + l2Val + ten
    if (sum >= 10) {
      ten = 1
    } else {
      ten = 0
    }
    sum = sum % 10
    if (!head) {
      head = tail = new ListNode(sum)
    } else {
      tail.next = new ListNode(sum)
      tail = tail.next
    }
    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }
  if (ten) {
    tail.next = new ListNode(ten)
  }
  return head
}

/**
 * @链表两数相加 倒叙版本
 */
function addTwoNumbers2(l1, l2) {
  let stack1 = l1
  let stack2 = l2
  let arr1 = []
  let arr2 = []
  while (stack1) {
    arr1.push(stack1.val)
    stack1 = stack1.next
  }
  while (stack2) {
    arr2.push(stack2.val)
    stack2 = stack2.next
  }
  let len1 = arr1.length - 1
  let len2 = arr2.length - 1
  let record = 0
  let data = []
  while (len1 > -1 || len2 > -1 || record) {
    let num1 = (arr1[len1] || 0) - 0
    let num2 = (arr2[len2] || 0) - 0
    let total = num2 + num1 + record
    data.push(total % 10)
    record = Math.floor(total / 10)
    len1--
    len2--
  }
  let result = {}
  let cur = result
  while (data.length) {
    cur.next = {
      val: data.pop(),
      next: null
    }
    cur = cur.next
  }
  return result.next
}

/**
 * @有序链表转成二叉树
 */
function sortedListToBST(head) {
  if (!head) return null
  if (!head.next) return new TreeNode(head.val)
  let pre = null,
    p = head,
    p_weight = head
  while (p_weight && p_weight.next) {
    pre = p
    p = p.next
    p_weight = p_weight.next.next
  }
  pre.next = null
  let node = new TreeNode(p.val)
  node.left = sortedListToBST(head)
  node.right = sortedListToBST(p.next)
  return node
}

/**
 *
 * @获取链表倒数第K个节点
 */
function getKthFromEnd(head, k) {
  let pre = new ListNode()
  pre.next = head
  let L = pre
  let R = pre
  let count = 1
  while (R && R.next) {
    R = R.next
    if (count > k) {
      L = L.next
    }
    count++
  }
  return L.next
}

/**
 *
 * @删除链表倒数第K个节点
 */
function removeNthFromEnd(head, n) {
  let pre = new ListNode()
  pre.next = head
  let L = pre
  let R = pre
  let count = 1
  while (R && R.next) {
    R = R.next
    if (count > n) {
      L = L.next
    }
    count++
  }
  L.next = L.next.next
  return pre.next
}

/**
 * @反转链表
 */
function reverseList(head) {
  let res = null
  while (head) {
    const next = head.next
    head.next = res
    res = head
    head = next
  }
  return res
}

/**
 * @反转中间部分链表
 */
var reversePartList = function (head, left, right) {
  if (left == right) return head
  let L1 = new ListNode()
  let R1 = head
  L1.next = head
  for (let i = 1; i < left; i++) {
    L1 = L1.next
  }
  for (let i = 1; i < right; i++) {
    if (R1 && R1.next) R1 = R1.next
  }
  console.log('--', L1.val, R1.val)
  let R2 = R1.next
  R1.next = null
  const reversed = reverseList(L1.next)
  let temp = reversed
  while (temp && temp.next) {
    temp = temp.next
  }
  temp.next = R2
  if (L1.val) {
    L1.next = reversed
  } else {
    head = reversed
  }
  return head
}
/**
 * @K个一组反转链表
 */
var reverseKCount = function (head, k) {
  let temp = head
  for (let i = 1; i < k; i++) {
    if (temp) temp = temp.next
  }
  // temp是第一组的最后一个元素
  if (temp == null) return head
  let leftLinkNode = temp.next
  // 获取到写一个节点的引用就立即断开
  temp.next = null
  let newHead = reverseList(head)
  head.next = reverseKGroup(leftLinkNode, k)
  return newHead
}

/**
 * @合并两个有序链表
 */
const mergeTwoLists = function (list1, list2) {
  let res = new ListNode(0)
  let cur = res
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1
      list1 = list1.next
    } else {
      cur.next = list2
      list2 = list2.next
    }
    cur = cur.next
  }
  cur.next = list1 ? list1 : list2
  return res.next
}

/**
 * @回溯算法之全排列1 数组不重复
 */
function permute(nums) {
  const res = []
  const len = nums.length
  // path 已经选了的数字
  // [1, 2]
  function backTrack(path) {
    const map = {}
    path.forEach(p => {
      map[p] = true
    })
    if (path.length === len) {
      res.push(path)
      return
    }
    for (let idx = 0; idx < nums.length; idx++) {
      const num = nums[idx]
      if (map[num] === true) continue
      backTrack([...path, num])
    }
  }
  backTrack([])
  return res
}
/**
 * @回溯算法之全排列2 数组有重复
 */
function permuteUnique(nums) {
  let res = []
  let selected = nums.slice().fill(false)
  function bct(path = [], space = selected) {
    if (path.length === nums.length) {
      res.push(path.slice())
      return
    }
    let added = new Set()
    space.forEach((i, index) => {
      if (i == true) return
      if (!added.has(nums[index])) {
        added.add(nums[index])
        path.push(nums[index])
        space[index] = true
        bct(path, space)
        space[index] = false
        path.pop()
      }
    })
  }
  bct()
  return res
}
/**
 * @回溯算法之和为target的数组 如果想不到不及时剪枝
 */
function combinationSum(nums, target) {
  const res = []
  // 未使用的数字 还需要凑多少
  function backTrack(used, tempSum) {
    if (tempSum < 0) return
    if (tempSum === 0) {
      if (track(res, used)) return
      res.push(used)
      return
    }
    nums.forEach(num => {
      backTrack([...used, num], tempSum - num)
    })
  }
  backTrack([], target)
  function track(L, R) {
    const t = R.sort().join('')
    for (let idx = 0; idx < L.length; idx++) {
      const el = L[idx]
      if (el.sort().join('') == t) return true
    }
    return false
  }
  return res
}
/**
 * @回溯算法之和为target的数组 及时剪枝
 */
function combinationSum(candidates, target) {
  const res = []
  // 升序排序
  candidates.sort((a, b) => a - b)
  const search = (path, target, start) => {
    if (target === 0) {
      // 满足条件，拷贝一份放入结果数组
      res.push([...path])
      return
    }
    // 注意起点为start
    for (let i = start; i < candidates.length; i++) {
      // 剩余的目标数小于当前元素，后面的元素只会更大，直接放弃此轮
      if (target < candidates[i]) return
      path.push(candidates[i])
      // 数字可以重复，所以传入i
      search(path, target - candidates[i], i)
      path.pop()
    }
  }
  search([], target, 0)
  return res
}

/**
 * @回溯算法之和为target的数组 每个数字只能用一次 这里的剪枝的过程有点抽象 不好理解
 */
function combinationSum2(nums, target) {
  nums.sort((L, R) => L - R)
  const res = []

  // 已使用的下标 还需要凑多少
  function backTrack(used, tempSum, idx) {
    if (tempSum < 0) return
    if (tempSum === 0) {
      const aa = used.map(v => nums[v])
      res.push(aa)
      return
    }
    const usedMap = {}
    let last
    used.forEach(i => (usedMap[i] = true))
    for (let i = idx; i < nums.length; i++) {
      if (usedMap[i]) continue
      if (nums[i] === last) continue
      backTrack([...used, i], tempSum - nums[i], i)
      last = nums[i]
    }
  }

  backTrack([], target, 0)
  return res
}
/**
 * @回溯算法之nk组合 算法1
 */
function combine(n, k) {
  const res = []
  function bt(path, st) {
    if (path.length == k) {
      res.push(path)
      return
    }
    const map = {}
    path.forEach(p => {
      map[p] = true
    })
    for (let i = st; i <= n; i++) {
      if (map[i] == true) continue
      bt([...path, i], i + 1)
    }
  }
  bt([], 1)
  return res
}

/**
 * @回溯算法之nk组合 算法2
 */
var combine = function (n, k) {
  const result = []
  function bt(arr, st) {
    if (arr.length == k) {
      result.push(arr)
      return
    }
    for (let i = st; i <= n; i++) {
      arr.push(i)
      dfs([...arr], i + 1)
      arr.pop()
    }
  }
  bt([], 1)
  return result
}
/**
 * @回溯算法之nk组合 算法3
 */
var combine = function (n, k) {
  const ans = []
  function dfs(cur, temp) {
    // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
    if (temp.length + (n - cur + 1) < k) {
      return
    }
    // 记录合法的答案
    if (temp.length == k) {
      ans.push(temp)
      return
    }
    // 考虑选择当前位置
    dfs(cur + 1, [...temp, cur])
    // 考虑不选择当前位置
    dfs(cur + 1, temp)
  }
  dfs(1, [])
  return ans
}
/**
 * @回溯算法之子集 动态规划递推法
 */
function subsets(nums) {
  const dp = new Array(nums.length).fill([])
  dp[0] = [[], [nums[0]]]
  for (let i = 1; i < nums.length; i++) {
    const prev = dp[i - 1]
    const prev_add_i = prev.map(sub => {
      return [...sub, nums[i]]
    })
    dp[i] = [...prev, ...prev_add_i]
  }
  return dp[nums.length - 1]
}
/**
 * @回溯算法之子集 回溯法
 */
function subsets(nums) {
  let result = []
  let path = []
  function backtracking(st) {
    console.log(st, path)
    result.push(path.slice())
    for (let i = st; i < nums.length; i++) {
      // console.log({ st, i })
      path.push(nums[i])
      backtracking(i + 1)
      path.pop()
    }
  }
  backtracking(0)
  return result
}
/**
 * @回溯算法之子集2 有重复
 */
function subsets2(nums) {
  nums.sort((L, R) => L - R)
  const res = []
  const path = []
  function bt(st, path) {
    console.log(st, path)
    res.push([...path])
    for (let i = st; i < nums.length; i++) {
      if (i > st && nums[i] === nums[i - 1]) {
        console.log({ st, i, path })
        continue
      }
      path.push(nums[i])
      bt(i + 1, path)
      path.pop()
    }
  }
  bt(0, path)
  return res
}
// subsets([1, 2, 3])
/**
 * @回溯算法之计算所有递增子序列
 */
function findSubsequences(nums) {
  let set = new Set()
  function dfs(start, path) {
    if (start >= nums.length) return
    // 从start开始找  不小于当前path末尾的树，进下一层
    for (let i = start; i < nums.length; i++) {
      if (path.length === 0 || nums[i] >= path[path.length - 1]) {
        path.push(nums[i])
        // 中途碰上的长度>=2 的路径都算上
        if (path.length >= 2) set.add(path.join(','))
        dfs(i + 1, path)
        path.pop()
      }
    }
  }
  dfs(0, [])
  return Array.from(set).map(str => str.split(',').map(val => +val))
}
function findSubsequences(nums) {
  const res = []
  function back(start, curArr) {
    if (curArr.length > 1) {
      res.push([...curArr])
    }
    const map = new Map()
    for (let i = start; i < nums.length; i++) {
      if (
        map.has(nums[i]) ||
        (curArr.length && curArr[curArr.length - 1] > nums[i])
      ) {
        continue
      }
      map.set(nums[i], 1)
      curArr.push(nums[i])
      back(i + 1, curArr)
      curArr.pop()
    }
  }
  back(0, [])
  return res
}
/**
 * @回溯算法之电话号码组合数
 */
function teleNumber(numstr) {
  if (!numstr) return []
  const nums = numstr.trim().split('')
  const map = {
    1: [],
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  }
  const res = []
  function help(st, path) {
    const letters = map[nums[st]]
    if (path.length == nums.length) {
      res.push(path.join(''))
      return
    }
    for (let i = 0; i < letters.length; i++) {
      path.push(letters[i])
      help(st + 1, path)
      path.pop()
    }
  }
  help(0, [])
  return res
}
// console.log(teleNumber('23'))
/**
 * @回溯算法之复原IP
 */
var restoreIpAddresses = function (s) {
  let result = []
  dfs(0, 0, '', '')
  return result
  function dfs(i, segI, seg, ip) {
    if (i === s.length && segI === 3 && isValid(seg)) {
      result.push(ip + seg)
    } else if (i < s.length && segI <= 3) {
      if (isValid(seg + s[i])) {
        dfs(i + 1, segI, seg + s[i], ip)
      }
      if (seg.length > 0 && segI < 3) {
        dfs(i + 1, segI + 1, '' + s[i], ip + seg + '.')
      }
    }
  }
  function isValid(seg) {
    return seg <= 255 && (seg === '0' || seg[0] !== '0')
  }
}

/**
 * @回溯算法之括号生成
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
