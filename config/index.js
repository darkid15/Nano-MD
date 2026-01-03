// config/index.js

require("dotenv").config();

const botName = process.env.BOT_NAME;
const botAlias = process.env.BOT_ALIAS;
const botVersion = "1.0.0";
const prefix = process.env.PREFIX;

const masterNumber = process.env.MASTER_NUMBER;
const ownerNumber = process.env.OWNER_NUMBER;
const bottomBar= '╰━━━━━━━━━━━━━━━━╯';

const allowedNumbers = [masterNumber, ownerNumber];

module.exports = {
    botName,
    botAlias,
    botVersion,
    bottomBar,
    masterNumber,
    ownerNumber,
    allowedNumbers
}