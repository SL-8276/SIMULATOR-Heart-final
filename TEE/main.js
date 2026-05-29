const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const { listPorts, startSerial } = require("./serial.cjs");

let mainWindow;
let stopSerial = null;
let serialStarted = false;
let selectedSerialPort = null;

function sendProbeStatus(message) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("probe-status", message);
  }
}

function sendProbeReading(packet) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("probe-reading", packet);
  }
}

function startProbeSerial() {
  try {
    stopSerial?.();
  } catch {}

  stopSerial = startSerial({
    selectedPort: selectedSerialPort,
    onStatus: sendProbeStatus,
    onData: sendProbeReading
  });
}

function resolveRendererEntry() {
  const devServerUrl = process.env.ELECTRON_RENDERER_URL;
  const bundledIndexPath = path.join(__dirname, "renderer", "dist", "index.html");

  if (devServerUrl) {
    return { type: "url", target: devServerUrl };
  }

  if (fs.existsSync(bundledIndexPath)) {
    return { type: "file", target: bundledIndexPath };
  }

  throw new Error(
    "Renderer build not found. Run `npm run build:renderer` before launching the desktop app."
  );
}

function createWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  const rendererEntry = resolveRendererEntry();

  if (rendererEntry.type === "url") {
    mainWindow.loadURL(rendererEntry.target);
  } else {
    mainWindow.loadFile(rendererEntry.target);
  }

  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.on("did-finish-load", () => {
    if (serialStarted) return;
    serialStarted = true;
    startProbeSerial();
  });
}

ipcMain.handle("probe-list-ports", async () => listPorts());

ipcMain.handle("probe-select-port", async (_event, portPath) => {
  selectedSerialPort = String(portPath || "").trim() || null;
  startProbeSerial();
  return selectedSerialPort;
});

app.whenReady().then(() => {
  try {
    createWindow();
  } catch (error) {
    console.error(error);
    app.quit();
  }
});

app.on("window-all-closed", () => {
  try {
    stopSerial?.();
  } catch {}

  if (process.platform !== "darwin") app.quit();
});
