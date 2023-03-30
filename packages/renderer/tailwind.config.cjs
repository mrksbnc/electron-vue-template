/**
 * @see https://tailwindcss.com/docs/configuration
 *
 * @note THIS FILE IS REQUIRED FOR SUCCESSFUL BUILD
 *
 * @note EDIT THE CONFIG in ./tailwind.config.cjs TOO
 * IF YOU WANT TO EXTEND THE TAILWIND CONFIGURATION
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'secondary': '#6B7280',
        'success': '#10B981',
        'danger': '#EF4444',
        'warning': '#F59E0B',
        'info': '#3B82F6',
        'light': '#F3F4F6',
        'dark': '#1F2937',
      },
    },
  },
  plugins: [],
};
