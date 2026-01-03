// src/socket/createSocket.js

const {
	default: makeWASocket,
	fetchLatestBaileysVersion,
	useMultiFileAuthState
} = require("baileys");
const fs = require("fs-extra");
const { 
  BROWSER,
  LOGGER
} = require("../../config/socket.js");
const {
    authFolder, 
    utilsDir
} = require("../../config/paths.js");
const { requestPairingCode } = require("../login/generatePairingCode.js");
const logger = require(`${utilsDir}/logger.js`);
const { registerEvents } = require("./events");

async function createSocket ({mode, phonenumber}) {
    fs.ensureDir(authFolder);
	const { state, saveCreds } = await useMultiFileAuthState(authFolder);
	const { version } = await fetchLatestBaileysVersion();

	const sock = makeWASocket({
		version,
		auth: state,
		logger: LOGGER,
		browser: BROWSER
	});
	logger.info("Successfully created socket!");
	
	if (mode==="pairing-code" && !state.creds.registered) {
	    await requestPairingCode(sock, phonenumber);
	    logger.info("Requested pairing code successfully!");
	}
	
	registerEvents(sock, saveCreds, mode);
}

module.exports = { createSocket };