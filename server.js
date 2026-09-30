const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 80; // AWS зазвичай слухає 80 порт

// Функція для отримання локальної IP-адреси сервера
function getServerIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1';
}

// Роздаємо статику з папки public
app.use(express.static(path.join(__dirname, 'public')));

// Ендпоінт, щоб фронтенд міг отримати IP сервера
app.get('/api/ip', (req, res) => {
    res.json({ ip: getServerIp() });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});