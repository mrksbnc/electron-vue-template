/**
 * @see https://tailwindcss.com/docs/using-with-preprocessors
 * @see https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor
 */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
  },
};
