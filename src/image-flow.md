# 大面积图片加载优化思路

场景：一个很长的 `div` 里面罗列了很多图片 形成了瀑布流 怎么优化图片加载。大致思路：

- 一般来说形成了瀑布流的图片尺寸不会太大，根据云床的缩略图服务提取缩略图，瀑布流仅展示缩略图，详情或大图预览时展示原图。缩略图大小根据显示效果调整。

- 对图片懒加载渲染

可选方案 1：用 `getBoundingClientReact` 来探测图片是否进入父级元素 `setSrc` 屏幕滚动时节流触发函数

```js
function LazyLoad(el, options) {
  if (!(this instanceof LazyLoad)) {
    return new LazyLoad(el)
  }

  this.setting = Object.assign(
    {},
    { src: 'data-src', srcset: 'data-srcset', selector: '.lazyload' },
    options
  )

  if (typeof el === 'string') {
    el = document.querySelectorAll(el)
  }
  this.images = Array.from(el)

  this.listener = this.loadImage()
  this.listener()
  this.initEvent()
}

LazyLoad.prototype = {
  loadImage() {
    return throttle(function() {
      let startIndex = 0
      while (startIndex < this.images.length) {
        const image = this.images[startIndex]
        if (isElementInViewport(image)) {
          const src = image.getAttribute(this.setting.src)
          const srcset = image.getAttribute(this.setting.srcset)
          if (image.tagName.toLowerCase() === 'img') {
            if (src) {
              image.src = src
            }
            if (srcset) {
              image.srcset = srcset
            }
          } else {
            image.style.backgroundImage = `url(${src})`
          }
          this.images.splice(startIndex, 1)
          continue
        }
        startIndex++
      }

      if (!this.images.length) {
        this.destroy()
      }
    }).bind(this)
  },
  initEvent() {
    window.addEventListener('scroll', this.listener, false)
  },
  destroy() {
    window.removeEventListener('scroll', this.listener, false)
    this.images = null
    this.listener = null
  }
}
```

可选方案 2：用 IntersectionObserver 构造器

```js
const io = new IntersectionObserver(() => {
  // 实例化 默认基于当前视窗
})
let ings = document.querySelectorAll('[data-src]')
// 将图片的真实url设置为data-src src属性为占位图 元素可见时候替换src
function callback(entries) {
  entries.forEach(item => {
    // 遍历entries数组
    if (item.isIntersecting) {
      // 当前元素可见
      item.target.src = item.target.dataset.src
      // 替换src
      io.unobserve(item.target)
      // 停止观察当前元素 避免不可见时候再次调用callback函数
    }
  })
}
imgs.forEach(item => {
  // io.observe接受一个DOM元素，添加多个监听 使用forEach
  io.observe(item)
})
```

- 其他 针对浏览器同一个 IP 最多只能同时发送 6 个 TCP 请求的限制、利用代理服务器做域名分表处理

```js
const res = {
  images: [
    {
      src: 'https://image1.xuangubao.cn/u8_xc65sbpms',
      token: ''
    },
    {
      src: 'https://image2.xuangubao.cn/u8_xc65sbpms',
      token: ''
    }
  ]
}
```
