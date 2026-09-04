import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Rcon } from 'rcon-client';

const app = express();
const root = path.dirname(fileURLToPath(
    import.meta.url));
app.use(express.json());
app.use(express.static(path.join(root, 'dist')));

app.post('/api/checkout', async(request, response) => {
    const { username, packages, testPayment } = request.body || {};
    if (!testPayment) return response.status(400).json({ error: 'Test payment mode is required.' });
    if (!/^[A-Za-z0-9_]{3,16}$/.test(username || '')) return response.status(400).json({ error: 'Enter a valid Minecraft username.' });
    if (!process.env.RCON_HOST || !process.env.RCON_PASSWORD) return response.status(503).json({ error: 'RCON is not configured yet. Add RCON_HOST and RCON_PASSWORD to .env.' });

    const allowedPackages = new Map([
        ['rank:beginner-rank', { kind: 'rank', value: 'beginner-rank' }],
        ['rank:starter rank', { kind: 'rank', value: 'starter rank' }],
        ['rank:intermediate-rank', { kind: 'rank', value: 'intermediate-rank' }],
        ['rank:master-rank', { kind: 'rank', value: 'master-rank' }],
        ['rank:king', { kind: 'rank', value: 'king' }],
        ['rank:admin-rank', { kind: 'rank', value: 'admin-rank' }],
        ['money:10000', { kind: 'money', value: 10000 }],
        ['money:50000', { kind: 'money', value: 50000 }],
        ['money:100000', { kind: 'money', value: 100000 }],
        ['money:1000000', { kind: 'money', value: 1000000 }],
        ['money:5000000', { kind: 'money', value: 5000000 }],
        ['money:1000000000', { kind: 'money', value: 1000000000 }]
    ]);
    const selectedPackages = Array.isArray(packages) ? packages.map(item => {
        const packageItem = allowedPackages.get(`${item.kind}:${item.value}`);
        if (!packageItem) return null;
        return {...packageItem, quantity: packageItem.kind === 'money' ? Math.max(1, Math.min(99, Number(item.quantity) || 1)) : 1 };
    }).filter(Boolean) : [];
    if (!selectedPackages.length) return response.status(400).json({ error: 'Select at least one valid package.' });
    let rcon;
    try {
        rcon = new Rcon({ host: process.env.RCON_HOST, port: Number(process.env.RCON_PORT || 25575), password: process.env.RCON_PASSWORD });
        rcon.on('error', () => {});
        await rcon.connect();
        for (const item of selectedPackages) {
            const rankName = item.value === 'admin-rank' ? item.value : item.value.replace(/-?rank$/, '').trim();
            const command = item.kind === 'rank' ? `lp user ${username} parent set ${rankName}` : `/eco give ${username} ${item.value * item.quantity}`;
            await rcon.send(command);
        }
        return response.json({ username, message: 'The test payment passed and your selected packages were delivered.' });
    } catch (error) {
        console.error('RCON checkout failed:', error.code || error.message);
        return response.status(502).json({ error: 'RCON checkout failed.', details: error.code || error.message });
    } finally {
        if (rcon) {
            try {
                await rcon.end();
            } catch {}
        }
    }
});

app.use((request, response) => response.sendFile(path.join(root, 'dist', 'index.html')));
app.listen(Number(process.env.PORT || 3000), () => console.log(`SurvivalCraft Store running on port ${process.env.PORT || 3000}`));
