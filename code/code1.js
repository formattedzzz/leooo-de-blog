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
 * @回溯算法之全排列
 */
var permute = function (nums) {
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
permute([1, 2, 3])

/**
 * @回溯算法之组合数
 */
var combinationSum = function (nums, target) {
  const res = []
  const temp = {}
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
 * @回溯算法之组合数变形
 */
var combinationSum2 = function (nums, target) {
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
