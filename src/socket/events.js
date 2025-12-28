// src/socket/events.js

const { handleMessage } = require("../../handler/messageHandler.js");
const { generateQR } = require("../qr/generateQr.js");
const { sendQRMail } = require("../../utils/mailer.js");

async function registerEvents (sock, saveCreds) {
  sock.ev.on("creds.update", saveCreds);
  
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      try {
        const { qrFileName, qrFilePath } = await generateQR(qr);
        await sendQRMail(qrFileName, qrFilePath);
        console.log(`Sent ${qrFileName} through mail!`);
      } catch (err) {
        console.log(`Error: ${err.stack || err}`);
      }
    }
    if (connection === "connecting") console.log("Connecting...");
    if (connection === "open") console.log("Bot is connected!");
    if (connection === "closed") {
      const err = lastDisconnect?.err;
      const code = err?.output?.statusCode;
      if (code === 401) {
        console.log("Logged out. Delete sessions folder and try again.");
      } else {
          console.log(`Error: ${err}, code: ${code}`);
      }
    };
  });
  
  sock.ev.on("messages.upsert", ({ messages, type }) => {
      if (type !== "notify") return;
      for (const m of messages) {
          if (!m) continue;
          handleMessage(sock, m);
      };
  });
};

module.exports = { registerEvents };