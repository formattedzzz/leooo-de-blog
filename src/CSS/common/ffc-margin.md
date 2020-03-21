# FFC 布局中的 margin 使用

怎么解决 BFC 模块下 **margin: auto;** 无法实现垂直居中的问题

```css
 {
  display: flex;
  display: inline-flex;
  display: grid;
  display: inline-grid;
}
```

在 FFC、GFC 中 **margin: auto;** 是可以实现垂直居中

**`flex`** 格式化上下文中 设置了 `margin: auto` 的元素 在通过 `justify-content` 和 `align-self` 进行对齐之前 任何正处于空闲的空间都会分配到该方向的自动 margin 中去

所以 flex 容器 **`display: flex;`** 容器元素 **`margin: auto;`** 即可实现垂直居中 水平方向 **`space-around`**

要实现 **`space-between`** 也是极其简单的 只要将首位两个元素 向外 margin 设置为 0 即可

不同方向的自动 `margin`

```css
.ffc {
  margin: 20px auto;
  display: flex;
  height: 160px;
  background: #eee;
}
.ffc .ffc-item {
  /* 设置垂直方向居中 */
  margin: auto 0;
}
.ffc .ffc-item.item-last {
  /* 设置水平方向的空隙全部分布在最后一个盒子的左侧 */
  margin-left: auto;
}
```

FFC 搭配使用 **margin-top auto** 实现粘性 footer

其他方式

绝对定位 + `padding`

已知高度可以 `padding-bottom` + `margin-top` 相抵解决

`calc` 计算 content `min-height` 来解决
