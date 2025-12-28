// src/index.js

const { createSocket } = require("./socket/createSocket.js");
const { ownerNumber } = require("../config/index.js");

async function startBot () {
  await createSocket();
};

startBot();