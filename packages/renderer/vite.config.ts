/* eslint-env node */

import { join } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
/**
 * Vite config for the renderer package.
 *
 * @see https://vitejs.dev/config/
 */
const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');
const ELECTRON_CHROME_VERSION = process.versions.v8.split('.').splice(0, 2).join('');
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [vue()],
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  base: '',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@main': fileURLToPath(new URL('../main/src', import.meta.url)),
      '@types': fileURLToPath(new URL('../../types', import.meta.url)),
      '@shared': fileURLToPath(new URL('../shared/src', import.meta.url)),
      '@preload': fileURLToPath(new URL('../preload/src', import.meta.url)),
    },
  },
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    target: `chrome${ELECTRON_CHROME_VERSION}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
});
