"use strict";

/*
 * Environment configuration file for Chatbot Management Webapp.
 */

const oEnvironments = {
    production: {
        port: 80,
        address: "0.0.0.0"
    },
    development: {
        port: 3002,
        address: "127.0.0.1"
    }
};

module.exports = oEnvironments;
