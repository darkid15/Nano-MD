// confif/paths.js

const path = require("path");

const projectDir = path.join(__dirname, "..");
const utilsDir = path.join(projectDir, "utils");
const dataDir = path.join(projectDir, "data");
const commandsDir = path.join(projectDir, "src", "commands");
const authFolder = path.join(projectDir, "auth_info");
const logFile = path.join(dataDir, ".log");

module.exports = {
  utilsDir,
  dataDir,
  commandsDir,
  authFolder,
  logFile
}