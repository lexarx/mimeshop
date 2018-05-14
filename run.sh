#!/bin/bash

pushd client
npm install --production
node_modules/.bin/webpack --mode=production
popd

pushd server
npm install --production
popd

node server/app.js