# **NANO-MD**

## 

# **Directory Structure**
```
bot/
├─ src/
│  ├─ index.js              # Entry point
│  ├─ socket/
│  │  ├─ createSocket.js    # Baileys socket creation
│  │  └─ events.js          # Attach event listeners
│  ├─ auth/
│  │  └─ authState.js       # Multi-file auth handling
│  ├─ handlers/
│  │  ├─ messageHandler.js  # Incoming message logic
│  │  └─ commandHandler.js  # Command parsing + execution
│  ├─ commands/
│  ├─ utils/
│  └─ config/
│     └─ index.js
│
├─ session/                 # creds.json & keys
├─ package.json
└─ README.md
```
