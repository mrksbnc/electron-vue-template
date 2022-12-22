/**
 * @see https://tailwindcss.com/docs/configuration
 *
 * @note THIS FILE IS REQUIRED FOR SUCCESSFUL BUILD
 *
 * @note EDIT THE CONFIG in ./packages/renderer/tailwind.config.cjs
 * TOO IF YOU WANT TO EXTEND THE TAILWIND CONFIGURATION
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/renderer/index.html', './packages/renderer/src/**/*.{vue,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
