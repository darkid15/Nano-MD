// src/socket/createSocket.js

const {
	default: makeWASocket,
	fetchLatestBaileysVersion,
	useMultiFileAuthState
} = require("baileys");
const { 
  BROWSER,
  LOGGER
} = require("../../config/socket.js");
const { authFolder } = require("../../config/paths.js");
//const logger = require(`${utilsDir}/logger.js`);
const { registerEvents } = require("./events");

async function createSocket () {
	const { state, saveCreds } = await useMultiFileAuthState(authFolder);
	const { version } = await fetchLatestBaileysVersion();

	const sock = makeWASocket({
		version,
		auth: state,
		logger: LOGGER,
		browser: BROWSER
	});
	
	registerEvents(sock, saveCreds);
}

module.exports = { createSocket };