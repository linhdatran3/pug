// Change this value to false if you don't wanna use cache
const { DEFAULT_LANG } = require('./server');

module.exports = {
  css: 'dist/css/styles.min.css',
  'css-rtl': 'dist/css/styles-rtl.min.css',
  js: 'dist/js/scripts.min.js',
  redirect: `<meta http-equiv="refresh" content="0;url=./${DEFAULT_LANG}/index.html">`,
};
