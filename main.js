// Modules to control application life and create native browser window
const {app, BrowserWindow, shell} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 703,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://mobile.twitter.com')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Workaround for redirect error
  // https://github.com/electron/electron/issues/3471
  mainWindow.webContents.on('did-get-redirect-request', function (e, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, refeerrer, header) {
    if (isMainFrame) {
      setTimeout(function () { mainWindow.webContents.send('redirect-url', newURL) }, 10)
      e.preventDefault()
    }
  })

  // Use external web browser when open new window
  // https://qiita.com/k0kubun/items/baa0b2ee3d25f1e2f86d
  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
