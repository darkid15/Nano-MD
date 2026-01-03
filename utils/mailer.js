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
    text: "\nThis is a test run from Darkid. Do not scan this QR code yet. Please ignore this if you didn't request it.\n",
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
