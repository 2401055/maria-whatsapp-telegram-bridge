const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');
const path = require('path');

// Hardcoded Data
const tgToken = "8993276798:AAEbTv5iH2U6Wr_UZmuenSivEsEsLtjNoBw";
const ownerId = "8439757620";

console.log('--- MARIA BRIDGE STARTING ---');

const tgBot = new TelegramBot(tgToken, { polling: true });

// Immediate Startup Notification
tgBot.sendMessage(ownerId, "🚀 *System Booting Up...*\nIf you see this, the Telegram connection is WORKING. Now starting WhatsApp bridge...")
.then(() => {
    console.log('Telegram Startup Message Sent!');
})
.catch(err => {
    console.error('CRITICAL: Telegram API Error:', err.message);
});

function start() {
    console.log('Starting plugins.js...');
    const p = spawn('node', ['plugins.js'], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    p.on('exit', (code) => {
        console.log(`Process exited with code ${code}. Restarting...`);
        setTimeout(start, 5000);
    });

    p.on('error', (err) => {
        console.error('Failed to start plugins.js:', err);
    });
}

start();
