// handler/messageHandler.js

const { getContentType } = require("baileys");
const { loadCommands } = require("../utils/commandsLoader.js");
const { 
    allowedNumbers,
    prefix
} = require("../config/index.js");

async function handleMessage (sock, m) {
    if (!m.message || m.key) return;
    const sender = m.key.participant || m.key.remoteJid;
    if (!allowedNumbers.includes(sender)) return;
    const content = m.message;
    if (!content.startsWith(prefix)) return;
    const contentType = await getContentType(content);
    let text;
    if (contentType === "conversation") {
        text = content.conversation;
    } else if (contentType === "extendedTextMessage") {
        text = content.extendedTextMessage.text;
    } else return;
    
    const withoutPrefix = text.slice(prefix.length).trim().toLowerCase();
    
    const [cmdName, ...args] = withoutPrefix.split(/s\+/);
    
    const commands = await loadCommands();
}

module.exports = { handleMessage };