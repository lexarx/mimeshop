const express = require('express');
const staticFile = require('connect-static-file');

const app = express();
app.use('/app-bundle.js', staticFile(`${__dirname}/../client/app-bundle.js`));
app.use('/', staticFile(`${__dirname}/../client/app/app.html`));

module.exports = app;