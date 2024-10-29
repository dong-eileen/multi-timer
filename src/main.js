const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow = null;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegrationInWorker: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

function showNotification(event, title, body) {
  const notification = new Notification({
    title,
    body,
  });
  notification.show();
  notification.on("click", (event, arg) => {
    mainWindow.show();
  });
}

function writeToFile(event, filePath, fileName, body) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
  try {
    fs.writeFileSync(`${filePath}/${fileName}`, body, "utf-8");
    return true;
  } catch (e) {
    return false;
  }
}

function loadFromFile(event, filePath, fileName) {
  try {
    return fs.readFileSync(`${filePath}/${fileName}`, "utf-8");
  } catch (e) {
    return null;
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  ipcMain.on("show-notification", showNotification);
  ipcMain.handle("save-timers-to-file", writeToFile);
  ipcMain.handle("load-timers-from-file", loadFromFile);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
