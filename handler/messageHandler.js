// handler/messageHandler.js

const { getContentType } = require("baileys");
const { loadCommands } = require("../utils/commandsLoader.js");
const logger = require("../utils/logger.js");
const { 
    allowedNumbers,
    prefix
} = require("../config/index.js");

async function handleMessage (sock, m) {
    try {
        if (!m.message || m.key) return;
        
        const sender = m.key.participant || m.key.remoteJid;
        if (!allowedNumbers.includes(sender)) return;
        
        const content = m.message;
        const contentType = await getContentType(content);
        let text;
        if (contentType === "conversation") {
            text = content.conversation;
        } else if (contentType === "extendedTextMessage") {
            text = content.extendedTextMessage.text;
        } else return;
        
        if (!text.startsWith(prefix)) return;
        
        const withoutPrefix = text.slice(prefix.length).trim().toLowerCase();
        
        const [cmdName, ...args] = withoutPrefix.split(/\s+/);
        
        const commands = loadCommands();
        logger.info("Successfully loaded commands.");
        
        cmd = commands.get(cmdName);
        
        if (!cmd) return;
        
        cmd.run({
            sock, 
            m,
            prefix
        })
        
    } catch (err) {
        logger.error(`HANDLER ERROR: ${err.stack || err}`);
    }
}

module.exports = { handleMessage };