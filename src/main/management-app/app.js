/* jshint node: true */ // configure JSHint to analyze with node globals

"use strict";

/*
 * Configure and prepare the static asset server for the management webapp.
 */

const express = require("express");
const path = require("path");
const oApp = express();

const sWebAssetRoot = path.resolve(__dirname);

/* This pattern matches paths beginning with config/ and
 * paths in the root directory ending with .js. Effectively,
 * this pattern matches everything server-side that the client
 * doesn't need to know about.
 */
const oProhibitedPattern = /^(\/?config.*|\/?\w+\.js)/;
oApp.use(function(req, res, next) { // Pretend that internal files don't exist
    if (req.path.match(oProhibitedPattern)) {
        res.sendStatus(403);
    } else {
        next();
    }
});

oApp.use(express.static(sWebAssetRoot, {
    fallthrough: false
}));

module.exports = oApp;
