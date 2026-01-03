// utils/replyQueue.js 

const { sendReply } = require("./sendReply.js");
const { getHumanDelay } = require("./humanDelay.js");
const logger = require("./logger.js");

const queue = [];
let processing = false;

function enqueueReply (sock, m, text, mentions, cooldown) {
    const delay = getHumanDelay(cooldown.min, cooldown.max);
    if (delay === null) return;
    queue.push({sock, m, text, mentions, delay});
    processQueue();
}

async function processQueue () {
    if (processing) return;
    processing = true;
    
    while (queue.length > 0) {
        const job = queue.shift();
        const jid = job.m.key.remoteJid;
        
        try {
            await job.sock.sendPresenceUpdate("composing", jid);
            await new Promise(r => setTimeout(r, job.delay));
            await job.sock.sendPresenceUpdate("paused", jid);
            
            await sendReply(
                job.sock,
                job.m,
                job.text,
                job.mentions
            );
        } catch (err) {
            logger.error(`Error sending reply: ${err}`);
        }
    }
    processing = false;
}

module.exports = { enqueueReply };