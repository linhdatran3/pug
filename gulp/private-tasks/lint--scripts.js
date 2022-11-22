const { src } = require("gulp");
const eslint = require("gulp-eslint");
const cached = require("gulp-cached");

const { filesJs } = require("../config/directories");
const { handleESLintError } = require("../utils/errors");
const stream = require("../utils/browser-sync");

function lintScripts() {
  const gulpInstance = src(filesJs)
    .pipe(cached("eslint"))
    .pipe(eslint())
    .pipe(eslint.results(handleESLintError));

  if (stream.isStreaming) {
    return gulpInstance;
  }

  return gulpInstance.pipe(eslint.format()).pipe(eslint.failOnError());
}

lintScripts.displayName = "lint:scripts";

module.exports = lintScripts;
