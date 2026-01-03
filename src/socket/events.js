// src/socket/events.js

const { handleMessage } = require("../../handler/messageHandler.js");
const { generateQR } = require("../login/generateQr.js");
const { sendQRMail } = require("../../utils/mailer.js");
const { startupCooldown } = require("../../utils/startupCooldown.js");
const logger = require("../../utils/logger.js");
const { ownerNumber } = require("../../config/index.js");

async function registerEvents (sock, saveCreds, mode) {
    let botReady = false;
    
    sock.ev.on("creds.update", saveCreds);
    logger.info("Saved creds successfully!");
    
    sock.ev.on("connection.update", async (update) => {
        logger.info("Checking connection updates...");
        const { connection, lastDisconnect, qr } = update;
        
        if (qr && mode==="qr") {
            try {
                const { qrFileName, qrFilePath } = await generateQR(qr);
                await sendQRMail(qrFileName, qrFilePath);
                logger.info(`Sent ${qrFileName} through mail!`);
            } catch (err) {
                logger.error(`Error: ${err.stack || err}`);
            }
        }
        
        if (connection === "connecting") logger.info("Nano is connecting...");
        if (connection === "open") logger.info("Connected to WA!");
        if (connection === "closed") {
            const err = lastDisconnect?.err;
            const code = err?.output?.statusCode;
            logger.warn(`Error: ${err}\n\tStatus code: ${code}`);
            if (code === 401) logger.warn("Logged out. Delete sessions folder and try again.");
        }
        await startupCooldown();
        botReady = true;
    });
    
    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (!botReady) return;
        if (type !== "notify") return;
        for (const m of messages) {
            if (!m) continue;
            await handleMessage(sock, m);
        };
    });

};

module.exports = { registerEvents };
