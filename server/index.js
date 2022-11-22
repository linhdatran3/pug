const express = require('express');
const pug = require('pug');

const route = require('./route');
const { STATIC_PORT } = require('../gulp/config/server');
const { srcView, output } = require('../gulp/config/directories');
const pugOptions = require('../gulp/config/pug');
const { renderErrorHTML } = require('../gulp/utils');

const app = express();
const { log } = console;

app.engine('pug', (path, options, callback) => {
  const opts = { ...pugOptions, ...options };

  pug.renderFile(path, opts, (err, result) => {
    const data = result || renderErrorHTML(err.message);

    callback(null, data);
  });
});

app.set('views', srcView);
app.set('view engine', 'pug');
app.use(express.static(output));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use('/', route);

const logPort = `----- View server is running at http://localhost:${STATIC_PORT} -----`;

app.listen(STATIC_PORT, () => log(logPort));
