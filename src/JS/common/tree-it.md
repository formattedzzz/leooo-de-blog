# 多叉树的逆序还原

```js
var treeData = [
  {
    id: 1,
    name: "江西省",
    children: [
      {
        id: 11,
        name: "赣州市",
        children: [
          {
            id: 111,
            name: "南康区",
            children: [
              {
                id: 1111,
                name: "凤岗镇",
                children: [
                  {
                    id: 11111,
                    name: "天子村",
                    children: []
                  },
                  {
                    id: 11112,
                    name: "长江村",
                    children: []
                  }
                ]
              },
              {
                id: 1112,
                name: "唐江镇",
                children: [
                  {
                    id: 11121,
                    name: "横岭村",
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 112,
            name: "经开区",
            children: []
          }
        ]
      },
      {
        id: 12,
        name: "南昌市",
        children: [
          {
            id: 122,
            name: "昌东区",
            children: [
              {
                id: 1222,
                name: "张差镇",
                children: []
              }
            ]
          },
          {
            id: 122,
            name: "大学区",
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "湖南省",
    children: []
  }
];
const deepRange = (treeData, id) => {
  if (!treeData || !treeData.length) return [];
  // 定义一个数据栈
  let stack = [];

  let item = null;
  let nodes = [];
  // 先将第一层节点放入栈
  for (var i = 0, len = treeData.length; i < len; i++) {
    stack.push(treeData[i]);
  }

  while (stack.length) {
    // 将数据栈的第一个取出来
    item = stack.shift();
    // 如果符合就赋值给result
    nodes.push(item.id + item.name);
    if (item.id === id) {
      result = item.name;
    }
    //如果该节点有子节点，继续添加进入栈底
    if (item.children && item.children.length) {
      // stack = stack.concat(item.children);
      stack = item.children.concat(stack);
    }
  }
  return { nodes, result };
};

function broadRange(treeData, id) {
  if (!treeData || !treeData.length) return [];
  var result = null;
  var stack = [];
  var nodes = [];
  for (let i = 0; i < treeData.length; i++) {
    stack.push(treeData[i]);
  }
  while (stack.length) {
    var item = stack.shift();
    nodes.push(item.id + item.name);
    if (item.id === id) {
      result = item.name;
    }
    if (item.children || item.children.length) {
      stack = stack.concat(item.children);
    }
  }
  return { nodes, result };
}

console.log(deepRange(treeData, 11112));
console.log(broadRange(treeData, 11112));

// {
//   nodes: [
//     '1江西省',     '11赣州市',
//     '111南康区',   '1111凤岗镇',
//     '11111天子村', '11112长江村',
//     '1112唐江镇',  '11121横岭村',
//     '112经开区',   '12南昌市',
//     '122昌东区',   '1222张差镇',
//     '122大学区',   '2湖南省'
//   ],
//   result: '长江村'
// }
// {
//   nodes: [
//     '1江西省',     '2湖南省',
//     '11赣州市',    '12南昌市',
//     '111南康区',   '112经开区',
//     '122昌东区',   '122大学区',
//     '1111凤岗镇',  '1112唐江镇',
//     '1222张差镇',  '11111天子村',
//     '11112长江村', '11121横岭村'
//   ],
//   result: '长江村'
// }
```
