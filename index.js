const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');
const express = require('express');
const path = require('path');

// Web Server to keep Railway happy
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Maria-MD Bridge is Running!'));
app.listen(port, () => console.log(`Web server listening on port ${port}`));

// Hardcoded Data
const tgToken = "8993276798:AAEbTv5iH2U6Wr_UZmuenSivEsEsLtjNoBw";
const ownerId = "8439757620";

console.log('--- MARIA BRIDGE STARTING ---');

const tgBot = new TelegramBot(tgToken, { polling: true });

// Startup Notification
tgBot.sendMessage(ownerId, "🚀 *System Initializing...*\nWeb server is up. Starting WhatsApp bridge now...")
.catch(e => console.error("TG Error:", e.message));

function start() {
    console.log('Starting plugins.js...');
    const p = spawn('node', ['plugins.js'], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    p.on('exit', (code) => {
        console.log(`Process exited with code ${code}. Restarting in 5s...`);
        setTimeout(start, 5000);
    });
}

start();
