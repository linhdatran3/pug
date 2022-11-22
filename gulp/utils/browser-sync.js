const browserSync = require("browser-sync");

const browserSyncInstance = browserSync.create();

browserSyncInstance.isStreaming = true;

module.exports = browserSyncInstance;
