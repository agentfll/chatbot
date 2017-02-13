"use strict";

/*
 * Configure and prepare the static asset server for the management webapp.
 */

const express = require("express");
const oApp = express();

const sWebAssetRoot = path.resolve(__dirname);

/* This pattern matches paths beginning with config/ and
 * paths in the root directory ending with .js. Effectively,
 * this pattern matches everything server-side that the client
 * doesn't need to know about.
 */
const oProhibitedPattern = /^(\/?config.*|\/?\w+\.js)/;
oAssetServer.use(function(req, res, next) { // Pretend that internal files don't exist
    if (oProhibitedPattern.match(req.path)) {
        res.sendStatus(404);
    }
});

oApp.use(express.static(sWebAssetRoot));

module.exports = oApp;
