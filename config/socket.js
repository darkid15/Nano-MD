// config/socket.js

const pino = require("pino");

const BROWSER = ["Nano-MD", "Chrome", "1.0.0"];
const LOGGER = pino({level: "silent"});
const PAIRING_MODE = "pairing-code";
const defaultMode = "pairing-code";

module.exports = {
  BROWSER,
  LOGGER,
  PAIRING_MODE,
  defaultMode
}