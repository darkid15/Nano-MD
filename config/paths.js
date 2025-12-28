// confif/paths.js

const path = require("path");

const projectDir = path.join(__dirname, "..");
const utilsDir = path.join(projectDir, "utils");
const dataDir = path.join(projectDir, "data");
const commandsDir = path.join(projectDir, "src", "commands");
const authFolder = path.join(projectDir, "auth_info");

module.exports = {
  utilsDir,
  dataDir,
  commandsDir,
  authFolder
}