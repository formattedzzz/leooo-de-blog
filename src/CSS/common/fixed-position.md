# 固定定位的潜在问题

```css
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 13px 16px;
  font-size: 14px;
  color: #ccc;
  background-color: rgba(37, 38, 45, 0.9);
  border-radius: 2px;
  width: auto;
  max-width: 12em;
  box-sizing: content-box;
}
```

一行文本最多显示 12 个中文字符    试想如果去除 transform 属性 left 设为 80%会怎么样
