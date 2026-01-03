// utils/logger.js

const fs = require("fs");
const path = require("path");
const { logFile } = require("../config/paths.js");

function writeToFile (level, msg) {
    const timeStamp = new Date().toISOString();
    const fullMsg = `\n[${level}]\nDetails: ${timeStamp} - ${msg}\n`;
    fs.appendFileSync(logFile, fullMsg);
}

function info(msg) {
    console.log(`\n[INFO] - ${msg}\n`);
    writeToFile("INFO", msg);
}

function warn (msg) {
    console.log(`\n[WARN] - ${msg}\n`);
    writeToFile("WARN", msg);
}

function error (msg) {
    console.log(`\n[ERROR] - ${msg
    }\n`);
    writeToFile("ERROR", msg);
}

module.exports = { info, warn, error };