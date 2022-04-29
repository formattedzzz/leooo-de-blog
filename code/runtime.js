// function maxUnrepeat(str) {
//   if (str.length <= 1) return str.length
//   let res = 1
//   for (let L = 0; L < str.length; L++) {
//     const set = {}
//     let tmpMax = 1
//     set[str[L]] = true
//     for (let R = L + 1; R < str.length; R++) {
//       if (set[str[R]] == true) {
//         break
//       } else {
//         set[str[R]] = true
//         tmpMax++
//       }
//     }
//     // console.log('--', L, tmpMax)
//     if (tmpMax > res) res = tmpMax
//   }
//   return res
// }

function maxUnrepeat(s) {
  const occ = new Set()
  const n = s.length
  let rk = -1
  let ans = 0
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      occ.delete(s.charAt(i - 1))
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      occ.add(s.charAt(rk + 1))
      ++rk
    }
    ans = Math.max(ans, rk - i + 1)
  }
  return ans
}

console.log(maxUnrepeat('abcabcbb'))

function merge(intervals) {
  intervals.sort((L, R) => {
    return L[0] - R[0]
  })
  let idx = 0
  while (idx < intervals.length - 1) {
    const cur = intervals[idx]
    const next = intervals[idx + 1]
    const [s1, e1] = cur
    const [s2, e2] = next
    if (e1 >= s2) {
      intervals.splice(idx, 2, [s1, Math.max(e2, e1)])
    } else {
      idx++
    }
  }
  return intervals
}
console.log(
  merge([
    [1, 4],
    [0, 2],
    [3, 5]
  ])
)

// [10, 5, 2, 6]
function clacKCount(nums, k) {
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    const num_s = nums[i]
    let left = k / num_s
    if (left > 1) {
      res++
    } else {
      continue
    }
    for (let k = i + 1; k < nums.length; k++) {
      const num_e = nums[k]
      left = left / num_e
      if (left > 1) {
        res++
      } else {
        break
      }
    }
  }
  return res
}
console.log(clacKCount([10, 5, 2, 6], 100))
