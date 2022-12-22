/**
 * Electron Builder Configuration
 *
 * @see https://www.electron.build/configuration/configuration
 */

/** @type {import('electron-builder').Configuration} */
module.exports = {
  directories: {
    buildResources: './public',
    output: './dist/',
  },
  asar: true,
  compression: 'maximum',
  appId: 'com.mrksbnc.electron-vue-template',
  files: ['packages/**/dist/**'],
  buildDependenciesFromSource: true,
  mac: {
    target: ['dmg'],
    hardenedRuntime: true,
    category: 'public.app-category.utilities',
    artifactName: '${productName}.${ext}',
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
    ],
    artifactName: '${productName}.${ext}',
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false,
  },
  linux: {
    target: 'AppImage',
    category: 'Utility',
    artifactName: '${productName}.${ext}',
  },
};
