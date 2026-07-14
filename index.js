const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { spawn } = require('child_process');

// 1. Start Web Server IMMEDIATELY for Railway
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Maria Bridge is Active'));
app.listen(port, '0.0.0.0', () => {
    console.log(`SERVER_LISTENING_ON_PORT_${port}`);
});

// 2. Initialize Telegram Bot
const tgToken = "8993276798:AAEbTv5iH2U6Wr_UZmuenSivEsEsLtjNoBw";
const ownerId = "8439757620";
const tgBot = new TelegramBot(tgToken, { polling: true });

console.log('TELEGRAM_BOT_INITIALIZING');

// 3. Startup Alert
tgBot.sendMessage(ownerId, "🚀 *BRIDGE SYSTEM ONLINE*\n\nRailway has successfully deployed the code. I am now starting the WhatsApp module...")
.then(() => console.log('STARTUP_MESSAGE_SENT'))
.catch(e => console.error('TELEGRAM_SEND_ERROR:', e.message));

// 4. Start WhatsApp Module
function startWhatsApp() {
    console.log('STARTING_PLUGINS_JS');
    const p = spawn('node', ['plugins.js'], {
        stdio: 'inherit'
    });

    p.on('exit', (code) => {
        console.log(`WHATSAPP_EXITED_CODE_${code}_RESTARTING`);
        setTimeout(startWhatsApp, 5000);
    });
}

// Small delay to ensure TG is ready
setTimeout(startWhatsApp, 2000);
