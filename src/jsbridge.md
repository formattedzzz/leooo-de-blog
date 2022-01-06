# webview jsbridge 简要分析

客户端 webview 前置注入 js

```js
;(function() {
  if (window.WebViewJavascriptBridge) {
    return
  }

  if (!window.onerror) {
    window.onerror = function(msg, url, line) {
      console.log(
        'WebViewJavascriptBridge: ERROR:' + msg + '@' + url + ':' + line
      )
    }
  }
  window.WebViewJavascriptBridge = {
    registerHandler,
    callHandler,
    disableJavscriptAlertBoxSafetyTimeout,
    _fetchQueue,
    _handleMessageFromObjC
  }

  var messagingIframe
  var sendMessageQueue = []
  var messageHandlers = {}

  var CUSTOM_PROTOCOL_SCHEME = 'https'
  var QUEUE_HAS_MESSAGE = '__wvjb_queue_message__'

  var responseCallbacks = {}
  var uniqueId = 1
  var dispatchMessagesWithTimeoutSafety = true

  function registerHandler(handlerName, handler) {
    messageHandlers[handlerName] = handler
  }

  function callHandler(handlerName, data, responseCallback) {
    if (arguments.length == 2 && typeof data == 'function') {
      responseCallback = data
      data = null
    }
    _doSend({ handlerName: handlerName, data: data }, responseCallback)
  }
  function disableJavscriptAlertBoxSafetyTimeout() {
    dispatchMessagesWithTimeoutSafety = false
  }

  function _doSend(message, responseCallback) {
    if (responseCallback) {
      var callbackId = 'cb_' + uniqueId++ + '_' + new Date().getTime()
      responseCallbacks[callbackId] = responseCallback
      message['callbackId'] = callbackId
    }
    sendMessageQueue.push(message)
    // 这里客户端会捕获到消息队列有事件了 客户端会主动调用_fetchQueue
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
  }

  // 对messageQueue消费 通过json格式化位oc字典
  function _fetchQueue() {
    var messageQueueString = JSON.stringify(sendMessageQueue)
    sendMessageQueue = []
    return messageQueueString
  }

  /**
   * @param {messageJSON} { ['responseId' or 'callbackId]: 'id-string', handlerName: '' }
   * */

  // 暴露给客户端直接调用 客户端给web的回调及客户端主要调web函数都走都走这里
  function _dispatchMessageFromObjC(messageJSON) {
    if (dispatchMessagesWithTimeoutSafety) {
      setTimeout(_doDispatchMessageFromObjC)
    } else {
      _doDispatchMessageFromObjC()
    }

    function _doDispatchMessageFromObjC() {
      var message = JSON.parse(messageJSON)
      var messageHandler
      var responseCallback

      if (message.responseId) {
        // native回复web 把发消息时存的回调取出来
        responseCallback = responseCallbacks[message.responseId]
        if (!responseCallback) {
          return
        }
        responseCallback(message.responseData)
        delete responseCallbacks[message.responseId]
      } else {
        // native 主动调web函数
        if (message.callbackId) {
          // 如果有callbackId 说明native需要web回复他
          // 构造回调 消息队列压栈
          var callbackResponseId = message.callbackId
          responseCallback = function(responseData) {
            _doSend({
              handlerName: message.handlerName,
              responseId: callbackResponseId,
              responseData: responseData
            })
          }
        }

        var handler = messageHandlers[message.handlerName]
        if (!handler) {
          console.log(
            'WebViewJavascriptBridge: WARNING: no handler for message from ObjC:',
            message
          )
        } else {
          // 相当于native 主动给web发消息
          handler(message.data, responseCallback)
        }
      }
    }
  }

  function _handleMessageFromObjC(messageJSON) {
    _dispatchMessageFromObjC(messageJSON)
  }

  messagingIframe = document.createElement('iframe')
  messagingIframe.style.display = 'none'
  messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE
  document.documentElement.appendChild(messagingIframe)

  registerHandler(
    '_disableJavascriptAlertBoxSafetyTimeout',
    disableJavscriptAlertBoxSafetyTimeout
  )

  setTimeout(_callWVJBCallbacks, 0)
  function _callWVJBCallbacks() {
    var callbacks = window.WVJBCallbacks
    delete window.WVJBCallbacks
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i](WebViewJavascriptBridge)
    }
  }
})()
```

webview 业务代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta
      name="viewport"
      content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <style type="text/css">
      html {
        font-family: Helvetica;
        color: #222;
      }
      h1 {
        color: steelblue;
        font-size: 24px;
        margin-top: 24px;
      }
      button {
        margin: 0 3px 10px;
        font-size: 12px;
      }
      .logLine {
        border-bottom: 1px solid #ccc;
        padding: 4px 2px;
        font-family: courier;
        font-size: 11px;
      }
    </style>
  </head>
  <body>
    <h1>WebViewJavascriptBridge Demo</h1>
    <script>
      window.onerror = function(err) {
        log('window.onerror: ' + err)
      }

      function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
          return callback(WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function() {
          document.documentElement.removeChild(WVJBIframe)
        }, 0)
      }

      setupWebViewJavascriptBridge(function(bridge) {
        var uniqueId = 1
        function log(message, data) {
          var log = document.getElementById('log')
          var el = document.createElement('div')
          el.className = 'logLine'
          el.innerHTML =
            uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
          if (log.children.length) {
            log.insertBefore(el, log.children[0])
          } else {
            log.appendChild(el)
          }
        }

        bridge.registerHandler('testJavascriptHandler', function(
          data,
          responseCallback
        ) {
          log('ObjC called testJavascriptHandler with', data)
          var responseData = { 'Javascript Says': 'Right back atcha!' }
          log('JS responding with', responseData)
          responseCallback(responseData)
        })

        document.body.appendChild(document.createElement('br'))

        var callbackButton = document
          .getElementById('buttons')
          .appendChild(document.createElement('button'))
        callbackButton.innerHTML = 'Fire testObjcCallback'
        callbackButton.onclick = function(e) {
          e.preventDefault()
          log('JS calling handler "testObjcCallback"')
          bridge.callHandler('testObjcCallback', { foo: 'bar' }, function(
            response
          ) {
            log('JS got response', response)
          })
        }
      })
    </script>
    <div id="buttons"></div>
    <div id="log"></div>
  </body>
</html>
```
