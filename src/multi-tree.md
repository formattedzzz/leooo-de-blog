# 多叉树

## 多叉树的遍历

```js
var treeData = [
  {
    id: 1,
    name: '江西省',
    children: [
      {
        id: 11,
        name: '赣州市',
        children: [
          {
            id: 111,
            name: '南康区',
            children: [
              {
                id: 1111,
                name: '凤岗镇',
                children: [
                  {
                    id: 11111,
                    name: '天子村',
                    children: []
                  },
                  {
                    id: 11112,
                    name: '长江村',
                    children: []
                  }
                ]
              },
              {
                id: 1112,
                name: '唐江镇',
                children: [
                  {
                    id: 11121,
                    name: '唐平村',
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 112,
            name: '经开区',
            children: []
          }
        ]
      },
      {
        id: 12,
        name: '南昌市',
        children: [
          {
            id: 121,
            name: '昌东区',
            children: [
              {
                id: 1211,
                name: '昌平镇',
                children: []
              },
              {
                id: 1212,
                name: '昌柳镇',
                children: []
              }
            ]
          },
          {
            id: 122,
            name: '红谷滩区',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '湖南省',
    children: []
  }
]
const deepRange = (treeData, id) => {
  if (!treeData || !treeData.length) return []
  // 定义一个数据栈
  let stack = []

  let item = null
  let nodes = []
  // 先将第一层节点放入栈
  for (var i = 0, len = treeData.length; i < len; i++) {
    stack.push(treeData[i])
  }

  while (stack.length) {
    // 将数据栈的第一个取出来
    item = stack.shift()
    // 如果符合就赋值给result
    nodes.push(item.id + item.name)
    if (item.id === id) {
      result = item.name
    }
    //如果该节点有子节点，继续添加进入栈底
    if (item.children && item.children.length) {
      // stack = stack.concat(item.children);
      stack = item.children.concat(stack)
    }
  }
  return { nodes, result }
}

function wideRange(treeData, id) {
  if (!treeData || !treeData.length) return []
  var result = null
  var stack = []
  var nodes = []
  for (let i = 0; i < treeData.length; i++) {
    stack.push(treeData[i])
  }
  while (stack.length) {
    var item = stack.shift()
    nodes.push(item.id + item.name)
    if (item.id === id) {
      result = item.name
    }
    if (item.children || item.children.length) {
      stack = stack.concat(item.children)
    }
  }
  return { nodes, result }
}

console.log(deepRange(treeData, 11112))
console.log(wideRange(treeData, 11111))

// {
//   nodes: [
//     '1江西省',     '11赣州市',
//     '111南康区',   '1111凤岗镇',
//     '11111天子村', '11112长江村',
//     '1112唐江镇',  '11121唐平村',
//     '112经开区',   '12南昌市',
//     '121昌东区',   '1211昌平镇',
//     '1212昌柳镇',  '122红谷滩区',
//     '2湖南省'
//   ],
//   result: '长江村'
// }
// {
//   nodes: [
//     '1江西省',     '2湖南省',
//     '11赣州市',    '12南昌市',
//     '111南康区',   '112经开区',
//     '121昌东区',   '122红谷滩区',
//     '1111凤岗镇',  '1112唐江镇',
//     '1211昌平镇',  '1212昌柳镇',
//     '11111天子村', '11112长江村',
//     '11121唐平村'
//   ],
//   result: '天子村'
// }
```

## 多叉树的还原

```js
const flatData = [
  { parentid: null, id: 1, name: '江西省' },
  { parentid: null, id: 2, name: '湖南省' },
  { parentid: 1, id: 11, name: '赣州市' },
  { parentid: 1, id: 12, name: '南昌市' },
  { parentid: 11, id: 111, name: '南康区' },
  { parentid: 11, id: 112, name: '经开区' },
  { parentid: 12, id: 121, name: '昌东区' },
  { parentid: 12, id: 122, name: '红谷滩区' },
  { parentid: 111, id: 1111, name: '凤岗镇' },
  { parentid: 111, id: 1112, name: '唐江镇' },
  { parentid: 121, id: 1211, name: '昌平镇' },
  { parentid: 121, id: 1212, name: '昌柳镇' },
  { parentid: 1111, id: 11111, name: '天子村' },
  { parentid: 1111, id: 11112, name: '长江村' },
  { parentid: 1112, id: 11121, name: '唐平村' }
]

const buildTree = (flatData = []) => {
  if (!flatData.length) return []
  var treeData = []
  var tempMap = new Map()
  // 我们通过一个map结构的引用关系来扁平化层级关系
  flatData.forEach(v => tempMap.set(v.id, v))
  flatData.forEach(v => {
    if (!tempMap.get(v.parentid)) {
      tempMap.get(v.id).children = []
      treeData.push(v)
    } else {
      const parentNode = tempMap.get(v.parentid)
      parentNode.children
        ? parentNode.children.push(v)
        : (parentNode.children = [v])
    }
  })
  return treeData
}

console.log(JSON.stringify(buildTree(flatData), null, 2))
```

## 多叉树获取 ID 路径

```js
function getIdPath(tree, target) {
  const nodeIdPath = []
  let res = []
  let oked = false
  dfs(nodeIdPath, { children: tree })
  return res
  function dfs(nodeIdPath, node) {
    if (node.id === target) {
      nodeIdPath.push(node.id)
      console.log('target', nodeIdPath)
      res = [...nodeIdPath]
      oked = true
      return
    }
    for (let idx = 0; idx < node.children.length; idx++) {
      if (oked) return
      const no = node.children[idx]
      nodeIdPath.push(no.id)
      if (no.id === target) {
        console.log('target::', no.id)
        res = [...nodeIdPath]
        oked = true
        return
      }
      console.log('id:', no.id, 'name:', no.name)
      if (no.children && no.children.length) {
        dfs(nodeIdPath, no)
      }
      nodeIdPath.pop()
    }
  }
}
```
