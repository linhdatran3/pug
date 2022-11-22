/* eslint-disable-next-line */
const { join } = require('path');
const express = require('express');

const router = express.Router();
const { output, srcLocales } = require('../gulp/config/directories');
const { renderErrorHTML } = require('../gulp/utils');
const { DEFAULT_LANG } = require('../gulp/config/server');

const multiLang = process.env.MULTI_LANGUAGE;

function forceRequire(path) {
  const realPath = join(__dirname, path);

  delete require.cache[realPath];

  /* eslint-disable-next-line */
  return require(path);
}

router.get('/', (_, res) => {
  const defautLangPath = multiLang ? `/${DEFAULT_LANG}` : '';

  res.redirect(`${defautLangPath}/index.html`);
});

router.get('/*.html', (req, res) => {
  try {
    let lang;
    let match;
    let localeLang;
    let { path: url } = req;

    if (multiLang) {
      const testLang = /^\/([^/]+)\//.exec(url);

      if (!testLang) {
        throw new Error('No language in the url');
      }

      [match, lang] = testLang;
      localeLang = forceRequire(`../${srcLocales + lang}.json`);

      url = url.replace(match, '');
    }

    const testFile = /[/]?(.+)\.html/.exec(url);

    if (!testFile) {
      throw new Error('Not found');
    }

    res.render(testFile[1], {
      $translator: localeLang || {},
      $localeName: lang,
    }, (err, html) => {
      if (err) {
        throw err;
      }

      res.send(html);
    });
  } catch (err) {
    res.send(renderErrorHTML(err)).status(404);
  }
});

router.get(/^\/.*[^(.html)]$/, (req, res) => {
  res.redirect(join(req.path, 'index.html'));
});

router.post('*', (req, res) => {
  try {
    const json = forceRequire(join(__dirname, '..', output, req.url));

    res.send(json);
  } catch (err) {
    res.send(renderErrorHTML(err)).status(404);
  }
});

module.exports = router;
