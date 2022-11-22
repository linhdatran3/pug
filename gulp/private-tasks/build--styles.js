const { src, dest } = require("gulp");
const sass = require("sass");
const gulpSass = require("gulp-sass");
const cached = require("gulp-cached");
const sassUnicode = require("gulp-sass-unicode");
const autoprefixer = require("gulp-autoprefixer");
const header = require("gulp-header");
const BREAKPOINTS = require("../../src/scripts/breakpoint.json");

const { filesScssBuilt, outputStyle } = require("../config/directories");
const sassOpts = require("../config/sass");
const browserSync = require("../utils/browser-sync");
const { handleError } = require("../utils/errors");

function buildStyles() {
  return src(filesScssBuilt, { allowEmpty: true })
    .pipe(cached("scss"))
    .pipe(
      header(`
      $BREAKPOINT-XS: ${BREAKPOINTS.XS};
      $BREAKPOINT-SM: ${BREAKPOINTS.SM}px;
      $BREAKPOINT-MD: ${BREAKPOINTS.MD}px;
      $BREAKPOINT-LG: ${BREAKPOINTS.LG}px;
      $BREAKPOINT-XL: ${BREAKPOINTS.XL}px;
    `)
    )
    .pipe(gulpSass(sass).sync(sassOpts))
    .on("error", handleError)
    .pipe(sassUnicode())
    .on("error", handleError)
    .pipe(autoprefixer())
    .on("error", handleError)
    .pipe(dest(outputStyle))
    .pipe(browserSync.stream());
}

buildStyles.displayName = "build:styles";

module.exports = buildStyles;
