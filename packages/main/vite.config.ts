/* eslint-env node */

import { join } from 'node:path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
/**
 * Vite config for the main package.
 *
 * @see https://vitejs.dev/config/
 */
const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..');
const ELECTRON_NODE_VERSION = process.versions.node.split('.')[0];
/**
 * @type {import('vite').UserConfig}
 */
const config = defineConfig({
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@types': fileURLToPath(new URL('../../types', import.meta.url)),
      '@shared': fileURLToPath(new URL('../shared/src', import.meta.url)),
      '@preload': fileURLToPath(new URL('../preload/src', import.meta.url)),
      '@renderer': fileURLToPath(new URL('../renderer/src', import.meta.url)),
    },
  },
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: `node${ELECTRON_NODE_VERSION}`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
});

export default config;
