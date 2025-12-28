// config/index.js

require("dotenv").config();

const masterNumber = process.env.MASTER_NUMBER;
const ownerNumber = process.env.OWNER_NUMBER;

const allowedNumbers = [masterNumber, ownerNumber];

module.exports = {
  masterNumber,
  ownerNumber,
  allowedNumbers
}