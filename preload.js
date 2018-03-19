// https://github.com/electron/electron/issues/3471
const ipcRenderer = require('electron').ipcRenderer

ipcRenderer.on('redirect-url', function (event, url) {
  window.location.assign(url)
})
