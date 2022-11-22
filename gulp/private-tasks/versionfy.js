const { src, dest } = require("gulp");
const header = require("gulp-header");
const format = require("date-fns/format");

const { outputScript, outputStyle } = require("../config/directories");

function versionfy() {
  return src([`${outputScript}/**/*.js`, `${outputStyle}/**/*.css`])
    .pipe(header(`/* version: ${format(new Date(), "dd-MM-yyyy HH:mm:ss")} */`))
    .pipe(dest((file) => file.base));
}

versionfy.displayName = "versionfy";

module.exports = versionfy;
