const express = require('express');
const api = require('./api');
const staticFiles = require('./static-files');
const compression = require('compression');

const app = express();
app.use(compression());
app.use('/api', api);
app.use(staticFiles);
app.listen(3000);

module.exports = app;