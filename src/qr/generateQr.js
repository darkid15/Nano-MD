// src/qr/generateQr.js

const qrcode = require("qrcode");
const { authFolder } = require("../../config/paths.js");

async function generateQR (qrString) {
  const timestamp = new Date();
  const qrFileName = `qr-${timestamp}.png`;
  const qrFilePath = `${authFolder}/${qrFileName}`;
  await qrcode.toFile(qrFilePath, qrString, {
    type: "png",
    width: 300,
    errorCorrectionLevel: "H"
  });
  
  return { qrFileName, qrFilePath };
}

module.exports = { generateQR };