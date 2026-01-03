// src/login/requestPairingCode.js

async function requestPairingCodeOnce(sock, phoneNumber) {
    if (!sock?.authState?.creds) return;
    // Prevent duplicate requests
    if (sock.__pairingRequested) return;
    sock.__pairingRequested = true;
    
    try {
        await sock.requestPairingCode(phoneNumber);
    } catch (err) {
        console.error("Pairing code request failed:", err?.message || err);
    }
}

module.exports = { requestPairingCodeOnce };