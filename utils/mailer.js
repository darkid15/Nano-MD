// utils/mailer.js

const nodemailer = require("nodemailer");
const {
  nanoEmail,
  nanoPass,
  mailTo
} = require("../config/mail.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: nanoEmail,
    pass: nanoPass
  }
});

async function sendQRMail (qrFileName, qrFilePath) {
  await transporter.sendMail({
    from: nanoEmail,
    to: mailTo,
    subject: "NANO-MD QR Code",
    text: "Scan this QR code to link Nano. Please ignore this if you didn't request it.",
    attachments: [{filename: qrFileName, path: qrFilePath}]
  });
}

async function sendPairingCodeMail (pairingCode) {
  await transporter.sendMail({
    from: nanoEmail,
    to: mailTo,
    subject: "NANO-MD Pairing Code",
    text: `Enter this pairing code in your Whatsapp's \"Linked Devices\"; ${pairingCode}.`
  });
}

module.exports = {
  sendQRMail,
  sendPairingCodeMail
}