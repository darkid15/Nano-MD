// utils/commandsLoader.js

const { commandsDir } = require("../config/paths.js");
const fs = require("fs");
const path = require("path");

function loadCommands () {
    for (const cmd of fs.readdirSync(commandsDir)) {
        if (!cmd.endsWith(".js")) continue;
        
        const fullPath = path.join(commandsDir, cmd);
        const command = require(fullPath);
    }
}