# canvas

## 非零规则和奇偶规则

Ctx.fill()方法的两种规则 非零和奇偶 决定了路径在叠加的过程中是显示还是不显示

## 离屏渲染

上代码。假设有一颗年轮环形小球 也就是 我们在 **new** 一颗小球实例的时候 就把绘制的这部分工作先在创建出的 **canvas** 元素中完成 真正执行 **paint** 的时候再把离屏 **canvas** 渲染到页面上

```js
var context = document.getElementById("cas").getContext("2d");
function Ball(x, y, vx, vy, cache = true) {
  // 构造函数中确定绘制参数
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.cacheCas = document.createElement("canvas");
  this.cacheCtx = this.cacheCas.getContext("2d");
  if (cache) {
    this.cache();
  }
}
Ball.prototype.cache = function() {
  // 离屏绘制好这个元素
  this.cacheCtx.restore();
  this.cacheCtx.beginPath();
  // ...some path
  this.cacheCtx.stroke();
  this.cacheCtx.restore();
};
Ball.prototype.paint = function() {
  // 绘制到页面上的context
  if (this.cache) {
    this.cacheCtx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r);
  } else {
    context.restore();
    context.beginPath();
    // ...some path
    context.stroke();
    context.restore();
  }
};
Ball.prototype.move = function() {
  // 小球进行移动
  this.x += this.vx;
  this.y += this.vy;
  if (this.x > canvas.width - this.r || this.x < this.r) {
    this.x = this.x < this.r ? this.r : canvas.width - this.r;
    this.vx = -this.vx;
  }
  if (this.y > canvas.height - this.r || this.y < this.r) {
    this.y = this.y < this.r ? this.r : canvas.height - this.r;
    this.vy = -this.vy;
  }
  this.paint(ctx);
};
```

## canvas 清晰度问题

明确一个点 canvas 属性宽高：绘制区域的宽高 400\*400 的画布在你的 canvasAPI 中就只能容纳 400\*400 超出部分不予显示

canvas 样式宽高：画布在页面中所占位置的大小 通过设置样式宽高对画布进行缩放

所以我们可以画一个 600\*600 的画布 显示为 300\*300 大小 来提升清晰度
