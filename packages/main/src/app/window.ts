import { join } from 'path';
import { BrowserWindow } from 'electron';

async function createWindow(): Promise<BrowserWindow> {
  const window = new BrowserWindow({
    show: false,
    center: true,
    webPreferences: {
      webviewTag: false,
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  window.on('ready-to-show', () => {
    window.show();
    if (import.meta.env.DEV) window?.webContents.openDevTools();
  });

  const pageUrl =
    import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();

  await window.loadURL(pageUrl);
  return window;
}

async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

  if (!window) window = await createWindow();
  if (window.isMinimized()) window.restore();

  window.focus;
}

export default restoreOrCreateWindow;
