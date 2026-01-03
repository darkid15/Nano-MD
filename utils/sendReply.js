// utils/sendReply.js 

async sendReply (sock, m, text, mentions=[]) {
    const jid = m.key.remoteJid;
    
    return sock.sendMessage(jid, {
        text,
        mentions,
        quoted: m
    });
}

module.exports = { sendReply };