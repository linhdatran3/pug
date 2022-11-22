const { series, parallel, watch } = require("gulp");
const cached = require("gulp-cached");

const reload = require("./reload");
const buildLocales = require("./build--locales");
const printResults = require("./print--results");
const buildStyles = require("./build--styles");
const lintScripts = require("./lint--scripts");
const buildScriptsES6 = require("./build--scripts-es6");
const copyAssets = require("./copy--assets");

const {
  filesPug,
  srcLocales,
  filesScssBuilt,
  filesScssPartial,
  filesJs,
  filesAssets,
} = require("../config/directories");

function runWatchers(cb) {
  const reloadAndShowResults = parallel(printResults, reload);

  // HTML --------------------
  watch(filesPug, reload);

  // LOCALE --------------------
  watch(`${srcLocales}*/*.json`, series(buildLocales, reloadAndShowResults));

  // CSS --------------------
  watch(filesScssBuilt, series(buildStyles, printResults));

  watch(filesScssPartial, series(buildStyles, printResults)).on(
    "change",
    () => delete cached.caches.scss
  );

  // JS --------------------

  watch(filesJs, series(lintScripts, buildScriptsES6, reloadAndShowResults));

  // ASSETS --------------------
  watch(filesAssets, series(copyAssets, reloadAndShowResults));

  if (typeof cb === "function") {
    cb();
  }
}

runWatchers.displayName = "run:watchers";

module.exports = runWatchers;
