#!/usr/bin/env node

/**
 * @description Creates watchers for all the packages and starts the electron application
 * in development mode
 *
 * @see https://vitejs.dev/guide/api-javascript.html#dev
 * @see https://nodejs.org/en/docs/inspector/
 */

import electronPath from 'electron';
import { spawn } from 'child_process';
import { build, createServer } from 'vite';
/**
 * @type {import('vite').LogLevel}
 * */
const logLevel = 'warn';
/**
 * @type {'production' | 'development'}
 * */
const env = (process.env.MODE = process.env.MODE || 'development');
/**
 * Setup watcher for `main` package
 * @param {import('vite').ViteDevServer} watchServer Renderer watch server instance.
 */
async function setupMainPackageWatcher({ resolvedUrls }) {
  /** Needs to set up `VITE_DEV_SERVER_URL` environment variable from {@link import('vite').ViteDevServer.resolvedUrls} */
  process.env.VITE_DEV_SERVER_URL = resolvedUrls.local[0];
  /** @type {ChildProcess | null} */
  let electronMain = null;

  return build({
    logLevel,
    mode: env,
    configFile: 'packages/main/vite.config.ts',
    build: {
      /**
       * Set to {} to enable rollup watcher
       * @see https://vitejs.dev/config/build-options.html#build-watch
       */
      watch: {},
    },
    plugins: [
      {
        name: 'electron:main:on-package-change',
        writeBundle() {
          /** Kill electron if process already exist */
          if (electronMain !== null) {
            electronMain.removeListener('exit', process.exit);
            electronMain.kill('SIGINT');
            electronMain = null;
          }
          /** Spawn new electron process */
          electronMain = spawn(String(electronPath), ['--inspect', '.'], {
            stdio: 'inherit',
          });
          /** Stops the watch script when the application has been quit */
          electronMain.addListener('exit', process.exit);
        },
      },
    ],
  });
}
/**
 * Setup watcher for `preload` package
 * @param {import('vite').ViteDevServer} watchServer Renderer watch server instance.
 * Required to access the web socket of the page. By sending the `full-reload` command to the socket, it reloads the web page.
 */
async function setupPreloadPackageWatcher({ ws }) {
  return build({
    logLevel,
    mode: env,
    configFile: 'packages/preload/vite.config.ts',
    build: {
      /**
       * Set to {} to enable rollup watcher
       * @see https://vitejs.dev/config/build-options.html#build-watch
       */
      watch: {},
    },
    plugins: [
      {
        name: 'electron:preload:on-package-change',
        writeBundle() {
          ws.send({
            type: 'full-reload',
          });
        },
      },
    ],
  });
}
/**
 * Setup watcher for `preload` package
 * @param {import('vite').ViteDevServer} watchServer Renderer watch server instance.
 * Required to access the web socket of the page. By sending the `full-reload` command to the socket, it reloads the web page.
 */
async function setupSharedPackageWatcher({ ws }) {
  return build({
    logLevel,
    mode: env,
    configFile: 'packages/shared/vite.config.ts',
    build: {
      /**
       * Set to {} to enable rollup watcher
       * @see https://vitejs.dev/config/build-options.html#build-watch
       */
      watch: {},
    },
    plugins: [
      {
        name: 'electron:shared:on-package-change',
        writeBundle() {
          ws.send({
            type: 'full-reload',
          });
        },
      },
    ],
  });
}
/**
 * Setup watcher for `renderer` package
 */
const rendererWatchServer = await createServer({
  logLevel,
  mode: env,
  configFile: 'packages/renderer/vite.config.ts',
}).then((s) => s.listen());

await setupPreloadPackageWatcher(rendererWatchServer);
await setupSharedPackageWatcher(rendererWatchServer);
await setupMainPackageWatcher(rendererWatchServer);
