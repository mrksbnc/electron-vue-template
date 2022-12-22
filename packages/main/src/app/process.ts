import { app } from "electron";
import restoreOrCreateWindow from "./window";

function requestSingleInstance(): void {
  const isSingleInstance = app.requestSingleInstanceLock();
  if (!isSingleInstance) {
    app.quit();
    process.exit(0);
  }
}

export async function init(): Promise<void> {
  requestSingleInstance();
  app.disableHardwareAcceleration();
  app.on("second-instance", restoreOrCreateWindow);
  app.on("activate", restoreOrCreateWindow);
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app
    .whenReady()
    .then(restoreOrCreateWindow)
    .catch((e) => console.error("Window couldn't be created! Cause:\r\n", e));

  if (import.meta.env.PROD)
    app
      .whenReady()
      .then(() => import("electron-updater"))
      .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
      .catch((e) => console.error("Failed check updates:", e));
}
