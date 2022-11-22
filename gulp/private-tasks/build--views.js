const { src, dest, parallel } = require("gulp");
const pug = require("gulp-pug");

const { srcLocales, filesPugBuilt, output } = require("../config/directories");
const options = require("../config/pug");
const { handleError } = require("../utils/errors");

function generateBuildTmpFn(lang) {
  let outputPath = output;
  const pugOpts = {
    ...options,
    locals: {
      $translator: {},
      $localeName: lang,
    },
  };

  if (lang) {
    outputPath = `${output + lang}/`;
    /* eslint-disable-next-line */
    pugOpts.locals.$translator = require(`../../${srcLocales + lang}.json`);
  }

  function buildView() {
    return src(filesPugBuilt)
      .pipe(pug(pugOpts))
      .on("error", handleError)
      .pipe(dest(outputPath));
  }

  buildView.displayName = `build:views:${lang || "single-lang"}`;

  return buildView;
}

function buildViews(cb) {
  const folders = process.env.MULTI_LANGUAGE;

  if (folders) {
    return parallel(...folders.split(",").map(generateBuildTmpFn))(cb);
  }

  return generateBuildTmpFn()();
}

buildViews.displayName = "build:views";

module.exports = buildViews;
