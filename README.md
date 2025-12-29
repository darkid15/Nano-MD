# **NanoMD**

## **NanoMD** is a **private, minimal, security‑first** WhatsApp bot built with Node.js and Baileys.

The name Nano reflects the core philosophy of the project: start *small*, stay *intentional*, and avoid *unnecessary complexity*. Every file, module, and behavior exists for a reason.

This is not a public bot framework. It is a controlled tool designed for a very small, trusted user set.

---

## **Core Philosophy**

### **NanoMD** is built around a few non‑negotiable principles:
- Private by default — unauthorized users do not exist to the bot
- Human‑like behavior — predictable automation gets banned; humans don’t
- Minimal surface area — small modules, clear responsibility, no magic
- Security over convenience — silence is safer than feedback

The project favors intentional limitation over feature explosion.


---

## **Authentication Model**
- NanoMD currently supports QR‑only authentication.
- Pairing code login is not implemented yet
- QR generation is mandatory
- QR delivery via email is mandatory by design

Terminal‑based QR display may be added later as a configurable alternative, but email delivery is the default and intended path.

The bot runs in a single‑session, single‑user mode.

---

## **Trust & Permission System**
### NanoMD operates under a strict identity hierarchy:
- Master — defined via environment variables
- Owner — defined in JSON configuration
- Officers — defined in JSON configuration (limited set)

All identities are validated using normalized JIDs.

### Unauthorized Users
If a message is received from an unauthorized JID:
- No reply is sent
- No error is thrown
- No side effects occur

The bot remains completely silent.

This behavior is intentional and serves both security and anti‑ban purposes.

---

## Message Processing Pipeline
Incoming messages follow a strict pipeline:

1. messages.upsert event received
2. Message content existence check
3. Authorization gate (JID validation)
4. Prefix validation
5. Text extraction
6. Command dispatch

Messages that fail any step are discarded immediately.

This conservative pipeline keeps behavior predictable and easy to reason about.

---

## Human‑Like Behavior Constraints

NanoMD intentionally avoids mechanical behavior patterns:

Randomized response delays

Message queueing (no parallel spam replies)

Zero instant replies under all circumstances

Small probability of intentionally ignoring messages


These constraints exist to reduce automation fingerprints and mimic real human interaction patterns.


---

## What NanoMD Will **NOT** Do

NanoMD explicitly refuses to:

Join groups automatically

DM users first

Operate publicly

Act as a spam or growth tool


Public mode is not planned.

The bot is private by design and will remain so.


---

## **Directory Structure**

```
NANOMD/
├─ config/
│  ├─ index.js        # Central configuration loader
│  ├─ mail.js         # Mail configuration
│  ├─ paths.js        # Shared path definitions
│  └─ socket.js       # Socket configuration
│
├─ handler/
│  └─ messageHandler.js  # Message processing pipeline
│
├─ src/
│  ├─ index.js        # True entry point
│  ├─ qr/
│  │  └─ generateQr.js
│  └─ socket/
│     ├─ createSocket.js
│     └─ events.js
│
├─ utils/
│  ├─ commandsLoader.js
│  └─ mailer.js
│
├─ .env
├─ package.json
└─ README.md
```

Each module has a single responsibility and communicates only through explicit exports.

---

## **Configuration**

All sensitive or environment‑specific values are externalized.
Secrets live in .env
Persistent role data lives in JSON
No critical values are hardcoded

If configuration is missing or invalid, the bot is expected to fail fast.

---

## **Runtime Assumptions**

- Developed on modern Node.js (v25 used during development)
- Compatible with Termux
- Designed for single‑instance execution
- Multi‑session support is a future consideration, not a current goal

---

## **Extensibility**

NanoMD may support third‑party plugins in the future, but:

All plugins must respect the private trust model

No plugin may bypass authorization gates

Human‑like constraints are non‑optional


Extensibility will never override safety.


---

## **Final Note**

NanoMD is intentionally small.

Growth is allowed. Bloat is not.

If you understand why silence is sometimes the safest response, you already understand this project.

