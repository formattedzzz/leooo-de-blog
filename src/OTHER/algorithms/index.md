# 记录一些算法题

```js
// setTimeout(() => {
//    console.log("timeout");
//  }, 0);
//  setImmediate(() => {
//    console.log("immediate");
//  });

// const fs = require("fs");
// const starttime = Date.now();
// let endtime;

// fs.readFile("app.js", () => {
//   endtime = Date.now();
//   console.log("finish reading time: ", endtime - starttime);
// });

// let index = 0;

// function handler() {
//   if (index++ >= 5) return;
//   //   console.log(`nextTick ${index}`);
//   //   process.nextTick(handler);
//   console.log(`setImmediate ${index}`);
//   setImmediate(handler);
// }
// handler();

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

var reverseWords = function(s) {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .reverse()
    .join(" ");
};

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
