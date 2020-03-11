# 内容安全策略

## 标签限制

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' https://cdn.bootcss.com"
/>
```

- script-src: 外部脚本

- style-src：script-src 版的样式表

- img-src: 用于定义可从中加载图像的来源

- font-src: 用于指定可提供网页字体的来源

- media-src: 用于限制允许传输视频和音频的来源

- object-src: 可对 Flash 和其他插件进行控制

- plugin-types: 用于限制页面可以调用的插件种类

- child-src: 用于列出适用于工作线程和嵌入的帧内容的网址(框架)

## 禁止行内脚本
