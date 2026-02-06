const WebSocket = require('ws');

// Polyfill fetch
if (!global.fetch) {
    try {
        global.fetch = require('node-fetch');
    } catch (e) {
        console.warn('Fetch global no encontrado y node-fetch no instalado.');
    }
}

const API_URL = 'https://rtc.mathqix.com/api';
const WS_URL = 'wss://rtc.mathqix.com/ws';
const TIMESTAMP = Date.now();
const USER = `TEST_DEBUG_${TIMESTAMP}`;
const PASS = 'password123';

async function run() {
    console.log(`--- Starting Debug Script for ${USER} ---`);

    // 1. Register
    console.log('1. Registering...');
    const regRes = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: USER, pass: PASS })
    }).then(r => r.json());
    console.log('Register Response:', regRes);

    // 2. Login
    console.log('2. Logging in...');
    const loginRes = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: USER, pass: PASS })
    }).then(r => r.json());
    console.log('Login Response:', loginRes);

    if (!loginRes.ok || !loginRes.token) {
        console.error('Login Failed! Aborting WS.');
        return;
    }

    // 3. Create Room (to get roomId & peerId)
    console.log('3. Creating Room...');
    const createRes = await fetch(`${API_URL}/create-room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: USER, authToken: loginRes.token })
    }).then(r => r.json());
    console.log('Create Room Response:', createRes);

    if (!createRes.ok) {
        console.error('Create Room Failed!');
        return;
    }

    const { roomId, peerId } = createRes;
    console.log(`RoomID: ${roomId}, PeerID: ${peerId}`);

    // 4. WS Connect
    console.log('4. Connecting WS...');
    const ws = new WebSocket(WS_URL);

    ws.on('open', () => {
        console.log('WS Open. Sending Login...');
        ws.send(JSON.stringify({
            type: 'login',
            user: USER,
            pass: PASS,
            token: loginRes.token
        }));
    });

    ws.on('message', (data) => {
        const str = data.toString();
        // console.log('WS Message Received:', str);
        try {
            const msg = JSON.parse(str);
            if (msg.type === 'error') {
                console.error('SERVER SENT ERROR:', msg.message);
                process.exit(1);
            } else if (msg.type === 'login_success') {
                console.log('LOGIN SUCCESS! Sending join_room...');
                // 5. Join Room WS
                ws.send(JSON.stringify({
                    type: 'join_room',
                    roomId: roomId,
                    peerId: peerId
                }));
            } else if (msg.type === 'room_joined') {
                console.log('ROOM_JOINED RECEIVED! Success.');
                console.log(msg);
                process.exit(0);
            }
        } catch (e) {
            console.error('Parse Error:', e);
        }
    });

    ws.on('error', (err) => {
        console.error('WS Connection Error:', err);
    });

    ws.on('close', (code, reason) => {
        console.log('WS Closed:', code, reason.toString());
    });
}

run().catch(err => console.error('Script Error:', err));
