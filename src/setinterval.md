# 靠谱的 `setinterval`

```js
/**
 * @description timeout 版本的 interval 保证轮询的时间间隔
 * @param {cb}
 * @param {inter}
 * @returns {Function} 清楚定时器的方法
 */
const timerMap = {}
export function intervalTimer(cb, inter, now) {
  const mark = Math.random()
    .toString(36)
    .slice(8)
  if (now) cb()
  const temp = function() {
    cb && cb()
    clearTimeout(timerMap[mark])
    timerMap[mark] = setTimeout(temp, inter)
  }
  timerMap[mark] = setTimeout(temp, inter)
  return () => clearTimeout(timerMap[mark])
}
```
