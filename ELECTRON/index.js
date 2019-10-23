const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage} = require('electron')
let path = require('path')
let window = null
let tray = null

ipcMain.on('something', (event, data) => {
  console.log(event, data)
  event.sender.send('something1', '我是主进程返回的值')
})
leooo = {name: 'chenlei'}
function createWindow () {
  window = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  })
  window.loadFile('./index.html')
  // window.loadFile('https://ecs2.nncz.cn/static/html/tms-help.html')
  window.webContents.openDevTools()
  window.on('closed', () => {
    console.log('window closed')
    window = null
  })
  const trayIcon = nativeImage.createFromPath(path.resolve(__dirname, './tray.png')).resize({width: 20, height: 18})
  tray = new Tray(trayIcon)
  const contextMenu = Menu.buildFromTemplate([
    {label: '查看消息', type: 'radio', click: () => {}},
    {label: '删除消息', type: 'radio', click: () => {}},
  ])
  tray.setToolTip('leooo de electron application')
  tray.setContextMenu(contextMenu)
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