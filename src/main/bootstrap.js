"use strict";

/**
 * Bootstraps the full chatbot, including the conversation and management API, with default config.
 */

const path = require("path");
const express = require("express");

// Load Conversation API
const sConversationApiAppFile = path.resolve(__dirname, "conversation-api", "app.js");
const sConversationApiEnvironmentsFile = path.resolve(__dirname, "conversation-api", "config", "environments.js");
const oConversationApi = require(sConversationApiAppFile);
const oConversationApiConfig = require(sConversationApiEnvironmentsFile)[process.env.NODE_ENV];

if (oConversationApiConfig === undefined || oConversationApiConfig.port === undefined || oConversationApiConfig.address === undefined) {
    throw "[FATAL] Required conversation API configuration not found! Check config/environments.js and NODE_ENV environment variable.";
}

// Load Management API
const sManagementApiAppFile = path.resolve(__dirname, "management-api", "app.js");
const sManagementApiEnvironmentsFile = path.resolve(__dirname, "management-api", "config", "environments.js");
const oManagementApi = require(sManagementApiAppFile);
const oManagementApiConfig = require(sManagementApiEnvironmentsFile)[process.env.NODE_ENV];

if (oManagementApiConfig === undefined || oManagementApiConfig.port === undefined || oManagementApiConfig.address === undefined) {
    throw "[FATAL] Required management API configuration not found! Check config/environments.js and NODE_ENV environment variable.";
}

// Load Management Webapp
const sManagementAppFile = path.resolve(__dirname, "management-app", "app.js");
const sManagementAppEnvironmentsFile = path.resolve(__dirname, "management-app", "config", "environments.js");
const oManagementApp = require(sManagementAppFile);
const oManagementAppConfig = require(sManagementAppEnvironmentsFile)[process.env.NODE_ENV];

if (oManagementAppConfig === undefined || oManagementAppConfig.port === undefined || oManagementAppConfig.address === undefined) {
    throw "[FATAL] Required management webapp configuration not found! Check config/environments.js and NODE_ENV environment variable.";
}

// Start servers
oConversationApi.listen(oConversationApiConfig.port, oConversationApiConfig.address);
oManagementApi.listen(oManagementApiConfig.port, oManagementApiConfig.address);
oManagementApp.listen(oManagementAppConfig.port, oManagementAppConfig.address);

console.log("[INFO] In " + process.env.NODE_ENV + " mode");
console.log("[INFO] Conversation API listening on port " + oConversationApiConfig.port + " bound to address " + oConversationApiConfig.address);
console.log("[INFO] Management API listening on port " + oManagementApiConfig.port + " bound to address " + oManagementApiConfig.address);
console.log("[INFO] Management App listening on port " + oManagementAppConfig.port + " bound to address " + oManagementAppConfig.address);
