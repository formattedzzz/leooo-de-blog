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
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .text-over2 {
        width: 400px;
        line-height: 1.6rem;
        height: 4.8rem;
        overflow: hidden;
        position: relative;
      }

      .text-over2::after {
        content: "...";
        display: block;
        height: 1.6rem;
        position: absolute;
        width: 3rem;
        right: 0;
        bottom: 0;
        text-align: right;
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0) 0%,
          #fff 60%,
          #fff 100%
        );
        color: #555;
      }

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
    </style>
  </head>

  <body>
    <div class="text-over1">
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
    </div>
    <div class="text-over2">
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
      这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本这是文本
    </div>
  </body>
</html>
```
