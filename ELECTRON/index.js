const {app, BrowserWindow} = require('electron')

let window = null

function createWindow () {
  window = new BrowserWindow({
    width: 1280,
    height: 720
  })
  window.webContents.openDevTools()
  window.loadFile('./index.html')
  window.on('closed', () => {
    console.log('window closed')
    window = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出
  // 否则绝大部分应用及其菜单栏会保持激活
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时
  // 通常在应用程序中重新创建一个窗口
  if (window === null) {
    createWindow()
  }
})