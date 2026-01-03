// src/index.js

const { createSocket } = require("./socket/createSocket.js");
const { ownerNumber } = require("../config/index.js");
const logger = require("../utils/logger.js");

async function startBot () {
  logger.info("Starting Nano-MD bot...");
  await createSocket("qr", ownerNumber);
};

startBot();