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
                    name: "唐平村",
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
            id: 121,
            name: "昌东区",
            children: [
              {
                id: 1211,
                name: "昌平镇",
                children: []
              },
              {
                id: 1212,
                name: "昌柳镇",
                children: []
              }
            ]
          },
          {
            id: 122,
            name: "红谷滩区",
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

function wideRange(treeData, id) {
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
console.log(wideRange(treeData, 11112));
