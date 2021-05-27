# 小程序新版 canvas2d API

## 原生 CanvasRenderingContext2D 接口对比

## 渲染尺寸与逻辑尺寸

## 同层渲染

## 与 wx.createCanvasContext() 性能对比

```html
<template>
  <view class="poster-container" @catchtouchmove="true">
    <view class="poster-title">分享到朋友圈</view>
    <image :src="tempFilePath" class="poster-view" />
    <view class="poster-tips">保存图片后 可分享朋友圈</view>
    <button class="poster-save" type="default" plain="true" @tap="saveShareImg">
      保存图片
    </button>
    <canvas
      :id="id"
      class="poster-canvas"
      style="width:375px;height:572px"
      type="2d"
    ></canvas>
  </view>
</template>
<script>
  import { formatDisplayTime } from '@/utils'
  // const text_string = `据媒体报道，驱动IC封测厂上半年淡季不淡薄膜覆晶封装（COF）、测试、基板产能也同步吃紧。在关键零组件的替代效应发酵的态势下，驱动IC封测的COF产能在传统淡季在传统淡季在传统淡季在传统淡季在传统淡季在传统淡季在传统淡季在传统淡季在传统淡季逆势爆季在传统淡季逆势爆季在传统淡...`

  function drawText({ ctx, x, y, width, maxline, content, lineHeight }) {
    let currentLineIdx = 0 // 第几行
    let currentChar = 0 // 第几个字符
    let currentLineWid = 0 // 当前行width
    for (let i = 0; i < content.length; i++) {
      currentLineWid += ctx.measureText(content[i]).width
      if (currentLineWid >= width) {
        // console.log(currentLineWid, width)
        ctx.fillText(
          content.substring(currentChar, i),
          x,
          y + currentLineIdx * lineHeight
        ) //绘制截取部分
        currentChar = i
        currentLineWid = 0
        currentLineIdx++
        // console.log(`第${currentLineIdx}以绘制`)
        if (currentLineIdx > maxline) {
          console.log('over', currentLineIdx, maxline)
          break
        }
      }
    }
    if (currentChar < content.length) {
      ctx.fillText(
        content.substring(currentChar),
        x,
        y + currentLineIdx * lineHeight
      )
    }
  }
  let SAVE_AUTHED = undefined
  export default {
    name: 'PosterCanvas',
    props: {
      article: { type: [Object, null], required: true }
    },
    data() {
      return {
        id: `ID${Math.random().toString(36).slice(6).toUpperCase()}`,
        tempFilePath: ''
      }
    },
    computed: {},
    mounted() {
      if (this.article) setTimeout(this.initCanvas)
    },
    methods: {
      initCanvas() {
        const query = wx.createSelectorQuery()
        query
          .select(`#${this.id}`)
          .fields({ node: true, size: true })
          .exec(res => {
            if (!res || !res[0]) {
              console.error('canvas init error')
              return
            }
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            const dpr = wx.getSystemInfoSync().pixelRatio
            const logicW = res[0].width
            const logicH = res[0].height
            canvas.width = logicW * dpr
            canvas.height = logicH * dpr
            ctx.scale(dpr, dpr)
            global.ctx3 = ctx
            this.ctx = ctx
            this.canvas = canvas
            this.logicW = logicW
            this.logicH = logicH
            Promise.all([
              this.initImgSource(
                canvas,
                'https://image.xuangubao.cn/Fss0lK32GMgWhSZY2VBB0vTQpXbJ'
              ),
              this.initImgSource(
                canvas,
                'https://image.xuangubao.cn/FsRjo36LgkLGVNB9EaPNvcANg8FB'
              )
            ]).then(imgdoms => {
              this.draw(ctx, logicW, logicH, imgdoms)
            })
          })
      },
      initImgSource(canvas, imguri) {
        return new Promise(resolve => {
          const poster_img = Taro.getStorageSync(imguri)
          if (poster_img) {
            const img = canvas.createImage()
            img.src = poster_img
            img.onload = () => resolve(img)
            return
          }
          Taro.downloadFile({
            url: imguri,
            success(res) {
              if (res && res.tempFilePath) {
                Taro.setStorageSync(imguri, res.tempFilePath)
                const img = canvas.createImage()
                img.src = res.tempFilePath
                img.onload = () => resolve(img)
              } else {
                console.error(res)
                reject(new Error(res))
              }
            },
            fail(err) {
              console.error(err)
              reject(err)
            }
          })
        })
      },
      draw(ctx, logicW, logicH, imgdoms) {
        console.log(logicW, logicH)
        const article = this.article
        const author =
          article.source_name || (article.author && article.author.display_name)
        const display_time = formatDisplayTime(article.display_time)
        ctx.drawImage(imgdoms[0], 0, 0, logicW, logicH)
        ctx.font = `normal bold 22px sans-serif`
        ctx.fillStyle = '#191919'
        drawText({
          ctx,
          content: article.title,
          x: 22,
          y: 80,
          maxline: 2,
          width: 332,
          lineHeight: 34
        })
        ctx.save()
        ctx.font = `13px sans-serif`
        ctx.fillStyle = '#989898'
        ctx.fillText(`${author} ${display_time}`, 22, 140)
        ctx.restore()
        ctx.font = `16px sans-serif`
        ctx.fillStyle = '#424242'
        drawText({
          ctx,
          content: article.content_short,
          x: 22,
          y: 174,
          maxline: 7,
          width: 320,
          lineHeight: 28
        })
        ctx.font = `normal normal 14px sans-serif`
        ctx.fillStyle = '#424242'
        drawText({
          ctx,
          content: `长按识别二维码查看资讯详情`,
          x: 186,
          y: 398,
          maxline: 2,
          width: 104,
          lineHeight: 22
        })
        ctx.drawImage(imgdoms[1], 80, 364, 86, 86)
        this.savePoster()
      },
      savePoster() {
        wx.canvasToTempFilePath({
          canvas: this.canvas,
          success: res => {
            // console.log(res)
            if (res && res.tempFilePath) {
              this.tempFilePath = res.tempFilePath
            }
          },
          fail(err) {
            console.error(err)
          }
        })
      },
      saveShareImg() {
        // 获取用户是否开启用户授权相册
        const tempFilePath = this.tempFilePath
        if (!tempFilePath) {
          wx.showToast({
            title: '未获取到图片资源',
            icon: 'none'
          })
          return
        }
        if (SAVE_AUTHED === false) {
          wx.openSetting({
            success: result => {
              if (result) {
                if (result.authSetting['scope.writePhotosAlbum'] === true) {
                  SAVE_AUTHED = true
                  wx.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success() {
                      wx.showToast({
                        title: '图片保存成功，快去分享到朋友圈吧~',
                        icon: 'none'
                      })
                    },
                    fail() {
                      wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                      })
                    }
                  })
                }
              }
            }
          })
        } else {
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    SAVE_AUTHED = true
                    wx.saveImageToPhotosAlbum({
                      filePath: tempFilePath,
                      success() {
                        wx.showToast({
                          title: '图片保存成功，快去分享到朋友圈吧~',
                          icon: 'none'
                        })
                      },
                      fail() {
                        wx.showToast({
                          title: '保存失败',
                          icon: 'none'
                        })
                      }
                    })
                  },
                  fail() {
                    SAVE_AUTHED = false
                    wx.showToast({
                      title: '请设置允许访问相册',
                      icon: 'none'
                    })
                  }
                })
              } else {
                // 有则直接保存
                SAVE_AUTHED = true
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath,
                  success() {
                    wx.showToast({
                      title: '图片保存成功，快去分享到朋友圈吧~',
                      icon: 'none'
                    })
                  },
                  fail() {
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .poster-container {
    width: 100%;
    height: 100%;
    padding: 28px;
    text-align: center;
    position: relative;
    view {
      width: 100%;
    }
    .poster-title {
      font-size: 34px;
      color: $c-dark;
      margin-bottom: 32px;
      font-weight: 600;
    }
    .poster-view {
      width: 436px;
      height: 650px;
      margin: 32px auto;
      border-radius: 10px;
    }
    canvas.poster-canvas {
      position: absolute;
      left: 0;
      top: 0;
      transform: translateX(-200%) translateY(-200%);
    }
    .poster-tips {
      font-size: 28px;
      color: $c-light;
      font-weight: 300;
      margin-bottom: 30px;
    }
    button.poster-save {
      width: 342px;
      height: 72px;
      border-radius: 10px;
      border: 1px solid #999;
      line-height: 72px;
      font-size: 30px;
      font-weight: 400;
      color: #333;
      padding: 0;
      margin: 30px auto 0;
    }
  }
</style>
```
