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
 * @二叉树路径总和为target的所有路径数组
 */
function pathSum(root, target) {
  if (!root) return []
  const res = []
  function bt(node, path, target) {
    const left = target - node.val
    const path_add = [...path, node.val]
    if (!node.left && !node.right && left == 0) {
      res.push(path_add)
      return
    }
    if (node.left) {
      bt(node.left, path_add, left)
    }
    if (node.right) {
      bt(node.right, path_add, left)
    }
  }
  bt(root, [], target)
  return res
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
