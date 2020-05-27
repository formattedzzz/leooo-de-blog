class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}
// 单向链表
class LinkList {
  constructor() {
    this.head = new Node('head')
  }
  // 通过element查找Node
  find(element) {
    let currentNode = this.head
    while (currentNode.element != element) {
      currentNode = currentNode.next
      // 走到底退出循环
      if (currentNode == null) break
    }
    return currentNode
  }
  index(idx) {
    let currentNode = this.head
    while (idx > 0) {
      currentNode = currentNode.next
      idx--
    }
    return currentNode
  }
  insert(element, ele) {
    const newNode = new Node(element)
    let node = this.find(ele)
    if (node) {
      newNode.next = node.next
      node.next = newNode
    } else {
      console.log('未找到定位 添加到最后')
      const lastNode = this.last()
      lastNode.next = newNode
    }
  }
  display() {
    let currentNode = this.head
    console.log(currentNode.element)
    while (currentNode.next != null) {
      currentNode = currentNode.next
      console.log(currentNode.element)
    }
  }
  last() {
    let currentNode = this.head
    while (currentNode.next) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  len() {
    let currentNode = this.head
    let len = 1
    while (currentNode.next) {
      currentNode = currentNode.next
      len++
    }
    return len
  }
  forEach(cb) {
    let currentNode = this.head
    let idx = 0
    cb(currentNode, idx)
    while (currentNode.next) {
      currentNode = currentNode.next
      idx++
      cb(currentNode, idx)
    }
  }
  findPrev(element) {
    let currentNode = this.head
    while (currentNode.next && currentNode.next.element != element) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  remove(element) {
    let deletedNode = this.find(element)
    if (!deletedNode) {
      console.log('未找到')
      return
    }
    let prevNode = this.findPrev(element)
    if (deletedNode.next) {
      prevNode.next = deletedNode.next
    } else {
      prevNode.next = null
    }
    return deletedNode
  }
}

var linkList = new LinkList()
console.log(linkList.len())
linkList.insert('leo', 'head')
linkList.insert('bob', 'leo')
linkList.insert('npm', 'bob')
linkList.insert('ump', 'npm')

console.log(linkList.remove('ump'))
console.log(linkList.last())
linkList.insert('you')
linkList.insert('lpl')
// linkList.display()
console.log(linkList.len())
linkList.forEach((item, idx) => {
  console.log(item.element, '--', idx)
})
console.log(linkList.index(linkList.len() - 1))
