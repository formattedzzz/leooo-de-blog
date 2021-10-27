# 页面滚动特效总结一二

- 场景 1：通讯录表头吸顶列表

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      section {
        font-size: 30px;
      }
      h1 {
        position: sticky;
        top: 0;
        background: #f33;
      }
      h2 {
        padding: 200px 50px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <section>
      <h1>分组表头1111</h1>
      <h2>分组行1</h2>
      <h2>分组行2</h2>
      <h2>分组行3</h2>
      <h2>分组行4</h2>
    </section>
    <section>
      <h1>分组表头2222</h1>
      <h2>分组行1</h2>
      <h2>分组行2</h2>
      <h2>分组行3</h2>
      <h2>分组行4</h2>
    </section>
    <section>
      <h1>分组表头3333</h1>
      <h2>分组行1</h2>
      <h2>分组行2</h2>
      <h2>分组行3</h2>
      <h2>分组行4</h2>
    </section>
  </body>
</html>
```

- 场景 2：滚动背景固定

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      section {
        width: 100%;
        height: 100vh;
        background-attachment: fixed;
        background-size: contain;
      }
    </style>
  </head>
  <body>
    <section
      style="background-image:url(https://lh3.googleusercontent.com/rj182HB1wZb-0eTHpg2pfxknNPTM9teZVlfk-ogn7uz5huIY9Jpqp1q6VT1VXSrPaQ3MrBMsVgX-LS34hcrja0S0QAbhLc7NeMr42_8=w600)"
    ></section>
    <section
      style="background-image:url(https://lh3.googleusercontent.com/icDq5Mi4f7B35oLXVsmmEjudO4puVZKfllIwqIcwTXbGTXR0jpxPWbQpQmh9_ZbmeWZWc1t_vY4CveCludIsI_ki9MtfCUJcQHmE1w=w335)"
    ></section>
    <section
      style="background-image:url(https://lh3.googleusercontent.com/f5KJ-c1KS809s5nfYH1vbDUcQU8HSdOqpggTb4QeBCm8yGsLtdxONnNOnHoli8NDx_SyCHCUWmvu9p7NS_xkGWrmw8bLED_Gny0RqQ=w335)"
    ></section>
  </body>
</html>
```

- 场景 3：滚动视差

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      section {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        overflow: scroll;
        transform-style: preserve-3d;
        perspective: 10px;
        filter: blur(5px) contrast(5px);
        /* mix-blend-mode: lighten; */
      }
      div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        text-align: center;
        line-height: 100vh;
        padding: 50vh 0;
        font-size: 50px;
      }
      section div:nth-child(1) {
        transform: translateZ(-1px) scale(1.1);
        color: rgba(255, 170, 51, 0.8);
        z-index: 1;
      }
      section div:nth-child(2) {
        transform: translateZ(-2px) scale(1.2);
        color: rgba(221, 255, 51, 0.8);
        z-index: 2;
      }
      section div:nth-child(3) {
        transform: translateZ(-3px) scale(1.3);
        color: rgba(102, 255, 51, 0.8);
        z-index: 3;
      }
      section div:nth-child(4) {
        transform: translateZ(-4px) scale(1.4);
        color: rgba(51, 255, 119, 0.8);
        z-index: 4;
      }
      section div:nth-child(5) {
        transform: translateZ(-5px) scale(1.5);
        color: rgba(51, 255, 238, 0.8);
        z-index: 5;
      }
    </style>
  </head>
  <body>
    <section>
      <div>hello world!</div>
      <div>hello world!</div>
      <div>hello world!</div>
      <div>hello world!</div>
      <div>hello world!</div>
    </section>
  </body>
</html>
```

- 场景 4：一个元素（或者系列元素）从页面滑到某个点开始：该元素 fixed 到页面某个位置，并触发相关动画，动画结束之后便随着文档流滑走。也就是 `document.scrollTop` 一一对应着页面动画的某一帧。

思路：确定好父级高度（根据动画时长）。动画元素设置 sticky 定位。监控父级元素的滑出高度动态改变动画元素要处于第几帧数的状态。相关库 [magic-scroll](https://scrollmagic.io/)
