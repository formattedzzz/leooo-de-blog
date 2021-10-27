# 弹窗滚动穿透的常见接法

- 固定定位

弹窗出现时对 body 固定定位

优点：简单快捷
缺点：iOS 上固定定位会滚动到页面顶部，可以对弹窗组件嵌入钩子，弹窗打开时记录页面位置，关闭时再滑动到相应位置。

- overflow-hidden

优点：同上
缺点：兼容性，看取舍。

- 滑动判断。这也是一般组件库的实现方案

```js
export default {
  name: 'Popup',
  mounted() {
    document.addEventListener('touchstart', this.touchStart, { passive: false })
    document.addEventListener('touchmove', this.touchMove, { passive: false })
  },
  beforeDestroy() {
    document.removeEventListener('touchstart', this.touchStart)
    document.removeEventListener('touchmove', this.touchMove)
  },
  methods: {
    touchStart(event) {
      this.startY = event.touches[0].clientY
    },
    touchMove(event) {
      const touch = event.touches[0]
      this.deltaY = touch.clientY - this.startY
      // deltaY > 0 ? '上滑' : '下滑'
      const el = this.getScroller(event.target)
      const { scrollHeight, offsetHeight, scrollTop } = el ? el : this.$el
      if (this.deltaY > 0 && scrollTop === 0) {
        // 手指往下 页面往上
        // 普通元素：scrollTop == 0
        // 滚动元素：scrollTop == 0 已滚动至最顶部
        event.preventDefault()
      }
      if (this.deltaY < 0 && scrollTop + offsetHeight >= scrollHeight) {
        // 手指往上 页面往下
        // 普通元素：scrollTop == 0 offsetHeight == scrollHeight
        // 滚动元素：scrollTop + offsetHeight == scrollHeight 已滚动至最低部
        event.preventDefault()
      }
    },
    getScroller(el) {
      let node = el
      while (node && node.tagName !== 'HTML' && node.nodeType === 1) {
        const { overflowY } = window.getComputedStyle(node)
        if (/scroll|auto/i.test(overflowY)) {
          return node
        }
        node = node.parentNode
      }
    }
  }
}
```
