# 多行文本溢出处理终极方式

## CSS 大法

```html
<style>
  .multi-clamp {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 3;
    box-orient: vertical;
  }
</style>
```

缺点：只能显示省略号 不能自定义文本。且展开折叠需要通过 js 切换类名实现。

## js 模拟处理

要点：

- 1、获取容器的 contentHeight 即内容高度 offsetHeight - border - padding
- 2、获取行高。得出有多少行。如果行数不超出，直接 return
- 3、确定 innerText 中到底是第几个字符开始换临界行。(利用二分法快速找出)
- 4、操作容器 innerHTML 并初始化点击事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <!-- <meta http-equiv="Content-Security-Policy"  content="default-src 'self'"/> -->
    <title>text-overflow</title>
    <style>
      body,
      html {
        padding: 0;
        margin: 0;
      }
      * {
        box-sizing: border-box;
      }
      .text-over1 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 3;
        box-orient: vertical;
        padding: 20px;
      }
      .text-over3 {
        border: 10px solid #f33;
        padding: 20px;
      }
    </style>
  </head>

  <body>
    <div class="text-over1">
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
    </div>
    <div class="text-over3">
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
    </div>
    <script>
      const int = v => parseFloat(v)
      const countRows = (h, l) => Math.round(h / l)
      const binarySearch = (text, cb) => {
        let min = 0,
          max = text.length - 1
        while (min <= max) {
          const mid = parseInt((max + min) / 2)
          const result = cb(mid)
          max = result > 0 ? mid - 1 : max
          min = result < 0 ? mid + 1 : min
          if (result === 0) return mid
        }
      }
      // 具体实现
      class MultiClamp {
        constructor(element, config = params || {}) {
          // 设置默认配置，并将用户配置添加到this
          Object.assign(
            this,
            {
              rows: 2,
              ellipsis: '...',
              expandText: '展开',
              closeText: '收起'
            },
            config
          )

          this.ele = element
          this.text = element.innerText
          this.singleLineHeight = this.eleLineHeight()

          // 判断文本行数是否需要显示省略号，不需要直接返回
          const initRows = countRows(
            this.contentHeight(),
            this.singleLineHeight
          )
          if (initRows <= this.rows) return

          // 如需要展开/收起功能，创建对应标签
          if (this.expandable) this.expandableDom = this.createExpandableDom()
          if (this.closeable) this.closeableDom = this.createCloseableDom()

          // 文本溢出隐藏
          this.clamp()
        }
        // 创建展开功能标签
        createExpandableDom = () => {
          const expendDom = document.createElement('span')
          expendDom.innerHTML = this.expandText
          expendDom.className = 'expand'
          expendDom.onclick = () => {
            this.ele.innerHTML = this.text
            if (this.closeableDom) this.ele.appendChild(this.closeableDom)
          }
          return expendDom
        }
        // 创建收起功能标签
        createCloseableDom = () => {
          const closeDom = document.createElement('span')
          closeDom.innerHTML = this.closeText
          closeDom.className = 'close'
          closeDom.onclick = () => {
            this.clamp()
          }
          return closeDom
        }
        // 填充容器文本
        fillText(text, addExp) {
          this.ele.innerHTML = text
          if (addExp) this.ele.appendChild(this.expandableDom)
        }
        // 获取文本行数
        textRows = text => {
          this.fillText(text, this.expandable)
          return countRows(this.contentHeight(), this.singleLineHeight)
        }
        // 根据位置截取文本
        sliceText = pos => `${this.text.slice(0, pos)}${this.ellipsis}`
        // 获取元素计算属性
        getStyle = attr =>
          window.getComputedStyle
            ? window.getComputedStyle(this.ele, null)[attr]
            : this.ele.currentStyle[attr]
        // 获取容器高度
        contentHeight() {
          const height = this.ele.offsetHeight
          const attrs = [
            'borderTop',
            'borderBottom',
            'paddingTop',
            'paddingBottom'
          ]
          return (
            height -
            attrs.reduce((total, cur) => total + int(this.getStyle(cur)), 0)
          )
        }
        // 获取每行文本高度
        eleLineHeight() {
          let lineHeight = int(this.getStyle('lineHeight'))
          if (isNaN(lineHeight)) {
            this.fillText('test')
            lineHeight = this.contentHeight(this.ele)
            this.fillText(this.text)
          }
          return lineHeight
        }
        // 文本溢出隐藏
        clamp() {
          const { text, rows, sliceText, textRows } = this
          const pos = binarySearch(text, cur => {
            const curRows = textRows(sliceText(cur))
            if (curRows !== rows) return curRows - rows
            return textRows(sliceText(cur + 1)) - rows - 1
          })
          console.log(pos)
          this.fillText(sliceText(pos), this.expandable)
        }
      }
      new MultiClamp(document.querySelector('.text-over3'), {
        rows: 3,
        ellipsis: ' ... ',
        expandable: true,
        expandText: '展开',
        closeable: true,
        closeText: '收起'
      })
    </script>
  </body>
</html>
```
