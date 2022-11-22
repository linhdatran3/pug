const { series } = require("gulp");
const buildLocales = require("./build--locales");
const copyAssets = require("./copy--assets");
const lintScripts = require("./lint--scripts");
const buildScriptsES6 = require("./build--scripts-es6");
const buildStyles = require("./build--styles");
const buildStylesRtl = require("./build--styles-rtl");

const buildAssets = series(
  buildLocales,
  copyAssets,
  lintScripts,
  buildScriptsES6,
  buildStyles,
  buildStylesRtl
);

module.exports = buildAssets;
