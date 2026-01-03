// jsonUtils.js

const fs = require("fs-extra");
const path = require("path");


async function readJson(filePath, fallback = null) {
    try {
        const exists = await fs.pathExists(filePath);
        if (!exists) return fallback;

        return await fs.readJson(filePath);
    } catch (err) {
        throw new Error(`JSON read failed (${filePath}): ${err.message}`);
    }
}


async function writeJson(filePath, data, options = { spaces: 2 }) {
    try {
        const dir = path.dirname(filePath);

        // Ensure ONLY the directory
        await fs.ensureDir(dir);
        await fs.writeJson(filePath, data, options);
    } catch (err) {
        throw new Error(`JSON write failed (${filePath}): ${err.message}`);
    }
}

module.exports = {
    readJson,
    writeJson
};
