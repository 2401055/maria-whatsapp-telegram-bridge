const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { spawn } = require('child_process');

// 1. Web Server
const app = express();
const port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Maria Bridge Status: Active'));
app.listen(port, '0.0.0.0', () => console.log(`WEB_SERVER_READY_PORT_${port}`));

// 2. Bot Config
const tgToken = "8993276798:AAEbTv5iH2U6Wr_UZmuenSivEsEsLtjNoBw";
const ownerId = "8439757620";
const tgBot = new TelegramBot(tgToken, { polling: true });

// 3. Error Reporting to Telegram
process.on('uncaughtException', (err) => {
    const errorMsg = `⚠️ *CRITICAL ERROR*:\n\`\`\`\n${err.message}\n\`\`\``;
    tgBot.sendMessage(ownerId, errorMsg, { parse_mode: 'Markdown' }).catch(() => {});
    console.error(err);
});

// 4. Startup
console.log('INITIALIZING_SYSTEM');
tgBot.sendMessage(ownerId, "🛰️ *Maria Bridge Attempting to Connect...*\nWeb server is active. Starting modules.")
.then(() => {
    console.log('STARTUP_SIGNAL_SENT');
    startWhatsApp();
})
.catch(e => {
    console.error('TELEGRAM_AUTH_ERROR:', e.message);
});

function startWhatsApp() {
    console.log('SPAWNING_WHATSAPP_MODULE');
    const p = spawn('node', ['plugins.js'], { stdio: 'inherit' });
    
    p.on('exit', (code) => {
        tgBot.sendMessage(ownerId, `🔄 *WhatsApp Module Restarting* (Exit Code: ${code})`).catch(() => {});
        setTimeout(startWhatsApp, 5000);
    });
}
