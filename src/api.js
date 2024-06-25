const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

async function startAPI() {
    const wwebVersion = '2.2412.54'; 
    const client = new Client({
                // authStrategy: new LocalAuth(),
        authStrategy: new LocalAuth({
            clientId: "client-one"
        }),
        puppeteer: {
            args: ["--no-sandbox"],
        },
        webVersionCache: {
            type: 'remote',
            remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
        },
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    await client.initialize();

    return client;
}

module.exports = {
    startAPI,
};