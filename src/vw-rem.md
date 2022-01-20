# 移动端适配 vw 与 rem 选用场景

## vw 适配

优点：简单粗暴 所有尺寸均转换为百分比的屏幕宽度 无需注入基准尺寸代码

- 转换方式 预编译（使用 scss 支持自定义函数）

```scss
// 设计稿基准 750个物理像素
@function vw($px) {
  @return ($px / 375) * 100vw;
}
.box {
  width: vw(378);
}
.box {
  width: 100vw;
}
```

- 转换方式 postcss-px-to-viewport

缺点：不能适配 pc 端 所有尺寸按照屏幕宽度等比缩放 不能梯次配置。如屏幕宽度大于 720 时希望终止适配

## rem

优点：适配兼容性好。可按照屏幕宽度梯次配置。灵活度最好

1、 转换方式 postcss-plugin-px2rem

```js
module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 1
    },
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      selectorBlackList: ['.ignore']
    }
  }
}
```

```scss
.box {
  width: 375px;
}
// ==>
.box {
  width: 10rem;
}
```

2、设置基准屏幕宽度 baseWidth。一般按设计要求她们希望在保持绝对字体大小合适的前提下，更大的屏幕要能显示更多的内容。如 iphone6|7|8 及以下屏幕宽度为一梯级。iphone6|7|8 plus 至 ipadmini 为一梯级。ipadmini 以上布局应该重新适配。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <script>
    ;(function () {
      function setRem(baseWidth) {
        if (!baseWidth) {
          baseWidth = 375
        }
        var dpr = window.devicePixelRatio
        var currentWidth = Math.min(document.documentElement.clientWidth, 520)
        var remSize = 0
        var scale = 0
        scale = currentWidth / baseWidth
        remSize = baseWidth / 10
        remSize = remSize * scale
        document.documentElement.style.fontSize = remSize + 'px'
        document.documentElement.setAttribute('data-dpr', `${dpr}`)
      }
      setRem()
      window.addEventListener('resize', setRem)
    })()
  </script>
</html>
```

终上如果页面结构简单且只在移动端服务的页面可以考虑 vw。除此之外尽量选择 rem。
