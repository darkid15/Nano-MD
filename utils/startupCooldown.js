// utils/startupCooldown.js

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startupCooldown() {
  const min = 3 * 60 * 1000; // 3 minutes
  const max = 5 * 60 * 1000; // 5 minutes

  const duration = Math.floor(
    Math.random() * (max - min + 1) + min
  );

  await delay(duration);
}

module.exports = { startupCooldown };