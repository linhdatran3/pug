const { src, dest } = require("gulp");
const concat = require("gulp-concat");

const { outputStyle } = require("../config/directories");
const { handleError } = require("../utils/errors");

function bundleStyles(isRTL) {
  const suffix = isRTL ? "-rtl" : "";
  const libsCss = `${outputStyle}$libs${suffix}.css`;
  const appsCss = `${outputStyle}${suffix}.css`;
  const concatCss = `styles${suffix}.css`;

  function bundleStyle() {
    return src([libsCss, appsCss], { allowEmpty: true })
      .pipe(concat(concatCss))
      .on("error", handleError)
      .pipe(dest(outputStyle));
  }

  bundleStyle.displayName = `bundle:styles:${isRTL ? "rtl" : "origin"}`;

  return bundleStyle;
}

module.exports = bundleStyles;
