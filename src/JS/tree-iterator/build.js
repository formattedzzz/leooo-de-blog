const flatData = [
  { parentid: null, id: 1, name: "江西省" },
  { parentid: null, id: 2, name: "湖南省" },
  { parentid: 1, id: 11, name: "赣州市" },
  { parentid: 1, id: 12, name: "南昌市" },
  { parentid: 11, id: 111, name: "南康区" },
  { parentid: 11, id: 112, name: "经开区" },
  { parentid: 12, id: 121, name: "昌东区" },
  { parentid: 12, id: 122, name: "红谷滩区" },
  { parentid: 111, id: 1111, name: "凤岗镇" },
  { parentid: 111, id: 1112, name: "唐江镇" },
  { parentid: 121, id: 1211, name: "昌平镇" },
  { parentid: 121, id: 1212, name: "昌柳镇" },
  { parentid: 1111, id: 11111, name: "天子村" },
  { parentid: 1111, id: 11112, name: "长江村" },
  { parentid: 1112, id: 11121, name: "唐平村" }
];

const buildTree = (flatData = []) => {
  if (!flatData.length) return [];
  var treeData = [];
  var tempMap = new Map();
  flatData.forEach(v => tempMap.set(v.id, v));
  flatData.forEach(v => {
    if (!tempMap.get(v.parentid)) {
      tempMap.get(v.id).children = [];
      treeData.push(v);
    } else {
      const parentNode = tempMap.get(v.parentid);
      parentNode.children
        ? parentNode.children.push(v)
        : (parentNode.children = [v]);
    }
  });
  return treeData;
};

console.log(JSON.stringify(buildTree(flatData), null, 2));
