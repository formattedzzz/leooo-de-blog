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
 * @栈模拟队列
 */
var Stack = function () {
  this._state = []
}
Stack.prototype.push = function (val) {
  this._state.push(val)
}
Stack.prototype.pop = function () {
  return this._state.pop()
}
Stack.prototype.peek = function () {
  return this._state[this._state.length - 1]
}
Stack.prototype.size = function () {
  return this._state.length
}
Stack.prototype.empty = function () {
  return this._state.length == 0
}

var MyQueue = function () {
  this._stack1 = new Stack()
  this._stack2 = new Stack()
}

MyQueue.prototype.push = function (x) {
  this._stack1.push(x)
}

MyQueue.prototype.peek = function () {
  if (this._stack2.size() == 0) {
    while (this._stack1.size() > 0) {
      this._stack2.push(this._stack1.pop())
    }
  }
  return this._stack2.peek()
}

MyQueue.prototype.pop = function () {
  if (this._stack2.size() == 0) {
    while (this._stack1.size() > 0) {
      this._stack2.push(this._stack1.pop())
    }
  }
  return this._stack2.pop()
}

MyQueue.prototype.empty = function () {
  return this._stack1.size() + this._stack2.size() == 0
}

/**
 * @有序链表转成二叉树
 */
var sortedListToBST = function (head) {
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
var getKthFromEnd = function (head, k) {
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
var removeNthFromEnd = function (head, n) {
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
  let prev = null
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}

/**
 * @反转部分链表
 */
var reverseBetween = function (head, left, right) {
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
