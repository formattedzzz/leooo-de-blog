// 1-2-3-4-5-6-7-8
// 1-2

function reverseNode(head) {
  let res = null
  // 这里务必保持一下对原head的引用
  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = res
    res = cur
    cur = next
  }
  return res
}
var reverseKgroup = function (head, k) {
  let temp = head
  for (let i = 1; i < k; i++) {
    if (temp) temp = temp.next
  }
  // temp是第一组的最后一个元素
  if (temp == null) return head
  let leftLinkNode = temp.next
  temp.next = null
  let newHead = reverseNode(head)
  head.next = reverseKGroup(leftLinkNode, k)
  return newHead
}

