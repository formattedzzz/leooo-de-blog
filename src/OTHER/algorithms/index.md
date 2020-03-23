# 记录一些 leetcode 算法题

```js
function lengthOfLongestSubstring(s = "sdvhkdf") {
  if (typeof s !== "string" || s.length === 0) return 0;
  var stringArray = s.split("");
  var maxLen = 1;
  var tempLongString = stringArray[0];
  for (let i = 0; i < stringArray.length; i++) {
    var idx = tempLongString.indexOf(stringArray[i]);
    if (idx < 0) {
      tempLongString = tempLongString + stringArray[i];
      maxLen = Math.max(tempLongString.length, maxLen);
    } else {
      tempLongString = tempLongString.slice(idx + 1) + stringArray[i];
    }
  }
  return maxLen;
}
console.log(lengthOfLongestSubstring());
```

```js
var longestCommonPrefix = function(strs = ["mfmlower", "flow", "flight"]) {
  var res = "";
  const minLen = Math.min(...strs.map(v => v.length));
  const data = strs[0];
  for (let i = 0; i < minLen; i++) {
    if (strs.every(v => v[i] === data[i])) {
      console.log(data[i]);
      res = res + data[i];
    } else {
      break;
    }
  }
  return res;
};
console.log(longestCommonPrefix());
```

```js
var checkInclusion = function(s1 = "adc", s2 = "dcda") {
  if (!s1.length || !s2.length || s2.length < s1.length) return false;
  var res = false;
  const len = s1.length;
  const str = [...s1].sort().join("");
  console.log(str);
  for (let i = 0; i < s2.length - s1.length + 1; i++) {
    console.log(s2.substr(i, len));
    const element = [...s2.substr(i, len)].sort().join("");
    //  console.log(element);
    if (str === element) res = true;
  }
  return res;
};
console.log(checkInclusion());
```

```js
var multiply = function(num1, num2) {
  if (!num1 || !num2 || !Number(num1) || !Number(num2)) return 0;
  var num1Arr = [...num1];
  var num2Arr = [...num2];
  var stack = new Array(num1.length + num2.length).fill(0);
  // console.log(stack);
  const fixNum = n => (Number(n) <= 9 ? "0" + n : "" + n);
  for (let num1idx = 0; num1idx < num1Arr.length; num1idx++) {
    for (let num2idx = 0; num2idx < num2Arr.length; num2idx++) {
      var [shi, ge] = fixNum(
        num1Arr[num1Arr.length - 1 - num1idx] *
          num2Arr[num2Arr.length - 1 - num2idx]
      ).split("");
      // console.log(shi + ge);
      stack[num1idx + num2idx] += Number(ge);
      if (stack[num1idx + num2idx] >= 10) {
        stack[num1idx + num2idx] -= 10;
        stack[num1idx + num2idx + 1]++;
      }
      stack[num1idx + num2idx + 1] += Number(shi);
      if (stack[num1idx + num2idx + 1] >= 10) {
        stack[num1idx + num2idx + 1] -= 10;
        stack[num1idx + num2idx + 2]++;
      }
      // console.log("--", stack);
    }
  }
  // console.log("----", stack);
  return stack
    .reverse()
    .join("")
    .replace(/^0+/, "");
};

// 43210
//   456  num2
//    67  num1
// |||||
//    42
//   35
//  28

console.log(multiply("123", "456"));
```

```js
var reverseWords = function(s) {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .reverse()
    .join(" ");
};
```

```js
var simplifyPath = function(path = "/") {
  var result = "";
  var tempPath = [];
  var paths = path.split("/");
  paths.map(val => {
    if (val && val === "..") {
      tempPath.pop();
    } else if (val && val !== ".") {
      tempPath.push(val);
    }
  });
  tempPath.length ? (result = "/" + tempPath.join("/")) : (result = "/");
  return result;
};
console.log(simplifyPath("/."));
```

```js
var threeSum = function(nums = [-2, 0, 0, 2, 2]) {
  if (!nums || nums.length < 3) return [];
  var result = [];
  var arr = nums.sort((a, b) => a - b);
  // [ -4, -3, -2, -1, -1, 0,  1,  2,  3,  5, 6]
  // [-1, -1, 0, 1, 2, 4]
  // console.log(arr);
  var tempFix = null;
  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i] > 0) break;
    if (tempFix === arr[i]) {
      continue;
    } else {
      tempFix = arr[i];
    }
    var restArr = arr.slice(i + 1);
    var start = 0;
    var ended = restArr.length - 1;
    while (start < ended) {
      if (restArr[start] + restArr[ended] + tempFix === 0) {
        // 刚好fix
        const temp = [restArr[start], restArr[ended], tempFix];
        console.log(temp);
        let repeat = false;
        // repeat = result.forEach(v => {
        //   const L = v.sort((a, b) => a - b).join("");
        //   const R = temp.sort((a, b) => a - b).join("");
        //   if (L === R) {
        //     repeat = true;
        //   }
        // });
        if (result.length) {
          var last = result[result.length - 1];
          if (last.join() === temp.join()) repeat = true;
        }
        !repeat && result.push([restArr[start], restArr[ended], tempFix]);
        ended--;
        start++;
        // restArr[start] + restArr[ended] < 0 ? start++ : ended--;
      } else {
        // 不够fix start 向后挪
        if (restArr[start] + restArr[ended] + tempFix < 0) {
          start++;
        } else {
          // fix过头 ended 向前挪
          ended--;
        }
      }
    }
  }
  return result;
};
// console.log(threeSum());
```

```js
// 最大岛屿问题 实现思路
var grids = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];
var numIslands = function(grid = grids) {
  var count = 0; // 岛屿数量
  if (grid.length === 0) return count;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        dfsSearch(grid, i, j);
        count++;
      }
    }
  }
  return count;
};

function dfsSearch(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return;
  if (grid[i][j] === "1") {
    grid[i][j] = "0";
    dfsSearch(grid, i + 1, j); // 搜索右边
    dfsSearch(grid, i - 1, j); // 搜索左边
    dfsSearch(grid, i, j + 1); // 搜索下边
    dfsSearch(grid, i, j - 1); // 搜索上边
  }
}
// console.log(numIslands());
```
