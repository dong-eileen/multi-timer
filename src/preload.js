// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showNotification: (title, body) =>
    ipcRenderer.send("show-notification", title, body),
  saveTimersToFile: (filePath, fileName, body) =>
    ipcRenderer.send("save-timers-to-file", filePath, fileName, body),
});
