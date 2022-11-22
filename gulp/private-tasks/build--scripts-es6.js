const { src, dest } = require("gulp");
const gulpWebpack = require("webpack-stream");
const webpack = require("webpack");
const vinylNamed = require("vinyl-named");

const { filesJsES6, outputScript } = require("../config/directories");
const option = require("../config/webpack");
const { list, handleError } = require("../utils/errors");

function buildScriptsES6(cb) {
  if (!list.isJSValid) {
    return cb();
  }

  return src(filesJsES6)
    .pipe(vinylNamed())
    .pipe(gulpWebpack(option, webpack))
    .on("error", handleError)
    .pipe(dest(outputScript));
}

buildScriptsES6.displayName = "build:scripts-es6";

module.exports = buildScriptsES6;
