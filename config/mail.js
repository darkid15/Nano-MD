// config/mail.js

require("dotenv").config();

const nanoEmail = process.env.NANO_MAIL;
const nanoPass = process.env.NANO_PASS;

const mailTo = process.env.MAIL_TO;

module.exports = {
  nanoEmail,
  nanoPass,
  mailTo
}