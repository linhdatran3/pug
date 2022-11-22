const server = require('./server');

module.exports = {
  port: server.DEV_PORT,
  proxy: `http://localhost:${server.STATIC_PORT}`,
  ui: {
    port: server.DASHBOARD_PORT,
  },
  open: false,
  ghostMode: false,
  logPrefix: 'SYNC',
};
