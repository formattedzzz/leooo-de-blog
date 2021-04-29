/**
 * 
 * @param {*} target 
 * @description 看毛片算法
 */

function pmtArr(target) {
  var pmtArr = []
  target = target.split('')
  for (var j = 0; j < target.length; j++) {
    //获取模式串不同长度下的部分匹配值
    var pmt = target
    var pmtNum = 0
    for (var k = 0; k < j; k++) {
      var head = pmt.slice(0, k + 1) //前缀
      var foot = pmt.slice(j - k, j + 1) //后缀
      if (head.join('') === foot.join('')) {
        var num = head.length
        if (num > pmtNum) pmtNum = num
      }
    }
    pmtArr.push(j + 1 - pmtNum)
  }
  return pmtArr
}

function mapKMPStr(base, target) {
  var isMatch = []
  var pmt = pmtArr(target)
  console.time('kmp')
  var times = 0
  for (var i = 0; i < base.length; i++) {
    times++
    var tempIndex = 0
    for (var j = 0; j < target.length; j++) {
      if (i + target.length <= base.length) {
        if (target.charAt(j) === base.charAt(i + j)) {
          isMatch.push(target.charAt(j))
        } else {
          if (!j) break //第一个就不匹配直接跳到下一个
          var skip = pmt[j - 1]
          tempIndex = i + skip - 1
          break
        }
      }
    }
    var data = {
      index: i,
      matchArr: isMatch
    }
    callerKmp.push(data)
    if (tempIndex) i = tempIndex
    if (isMatch.length === target.length) {
      console.timeEnd('kmp')
      console.log('移位次数:', times)
      return i
    }
    isMatch = []
  }
  console.timeEnd('kmp')
  return -1
}

const base = 'aagctactgactagtcatatattcgcgcgggctattcgacgtctacgtacgcagcgacgagctcgtcgacttagtgccgcgtaattagcgcgatcgacgctgacgctgcataccctgcgacccagtcagtacacgtacgactcgactgcagtcactg'
const target = 'tagtgccgcgtaattag'
console.log(mapKMPStr(base, target))