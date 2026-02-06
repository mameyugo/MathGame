/**
 * @jest-environment node
 */
// Usamos environment node para tener acceso a red real y evitar limitaciones de jsdom

const WebSocket = require('ws');

// Polyfill para fetch si estamos en node antiguo (aunque Node 18+ ya lo tiene)
// Si falla, el usuario tendrá que instalar node-fetch, pero intentaremos usar el nativo o lo que haya.
if (!global.fetch) {
    // Intenta requerir node-fetch si no existe global
    try {
        global.fetch = require('node-fetch');
    } catch (e) {
        console.warn('Fetch global no encontrado y node-fetch no instalado. Los tests pueden fallar.');
    }
}

describe('Multiplayer Flow Integration Test', () => {
    // Configuración
    const API_URL = 'https://rtc.mathqix.com/api';
    const WS_URL = 'wss://rtc.mathqix.com/ws';
    const TIMESTAMP = Date.now();

    // Usuarios de prueba
    const userA = {
        username: `TEST_${TIMESTAMP}_A`,
        password: 'password123',
        token: null,
        peerId: null
    };

    const userB = {
        username: `TEST_${TIMESTAMP}_B`,
        password: 'password123',
        token: null,
        peerId: null
    };

    let roomToken = null;
    let roomId = null;
    let wsA = null;
    let wsB = null;

    // Helper para delay
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Helper para conectar WS
    const connectWebSocket = (userState) => {
        return new Promise((resolve, reject) => {
            console.error(`[${userState.username}] Connecting to ${WS_URL}...`);
            const ws = new WebSocket(WS_URL);

            ws.on('open', () => {
                console.error(`[${userState.username}] WS Connected. Sending login...`);
                // Login inmediato al conectar
                ws.send(JSON.stringify({
                    type: 'login',
                    user: userState.username,
                    pass: userState.password,
                    token: userState.token
                }));
            });

            ws.on('message', (data) => {
                let msg;
                try {
                    msg = JSON.parse(data.toString());
                } catch (e) {
                    console.error(`[${userState.username}] WS Parse Error:`, e);
                    return;
                }

                // console.error(`[${userState.username}] WS Msg:`, msg); 

                if (msg.type === 'login_success') {
                    console.error(`[${userState.username}] Login Success`);
                    resolve(ws);
                } else if (msg.type === 'error') {
                    console.error(`[${userState.username}] WS Error:`, msg.message);
                    reject(new Error(msg.message));
                }
            });

            ws.on('error', (err) => {
                console.error(`[${userState.username}] WS Connection Error:`, err);
                reject(err);
            });

            ws.on('close', (code, reason) => {
                console.error(`[${userState.username}] WS Closed:`, code, reason.toString());
            });
        });
    };

    // ==========================================
    // 1. REGISTRO Y LOGIN
    // ==========================================
    test('1. Registrar y Loguear usuarios', async () => {
        // Registrar User A
        const regA = await fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ user: userA.username, pass: userA.password })
        }).then(r => r.json());

        // Si ya existe (rerun), intentamos login directo. Si es nuevo, esperamos ok.
        if (!regA.ok && !regA.error.includes('exists')) {
            throw new Error(`Fallo registro A: ${regA.error}`);
        }

        // Login User A
        const loginA = await fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ user: userA.username, pass: userA.password })
        }).then(r => r.json());

        if (!loginA.ok || !loginA.token) throw new Error(`Fallo login A: ${loginA.error}`);
        userA.token = loginA.token;
        console.error(`User A Token: ${userA.token.substring(0, 10)}...`);

        // Registrar User B
        const regB = await fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ user: userB.username, pass: userB.password })
        }).then(r => r.json());

        if (!regB.ok && !regB.error.includes('exists')) {
            throw new Error(`Fallo registro B: ${regB.error}`);
        }

        // Login User B
        const loginB = await fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ user: userB.username, pass: userB.password })
        }).then(r => r.json());

        if (!loginB.ok || !loginB.token) throw new Error(`Fallo login B: ${loginB.error}`);
        userB.token = loginB.token;
        console.error(`User B Token: ${userB.token.substring(0, 10)}...`);
    });

    // ==========================================
    // 2. CREAR SALA (User A)
    // ==========================================
    test('2. User A crea una sala', async () => {
        const res = await fetch(`${API_URL}/create-room`, {
            method: 'POST',
            body: JSON.stringify({ username: userA.username, authToken: userA.token })
        }).then(r => r.json());

        if (!res.ok) throw new Error(`Fallo crear sala: ${res.error}`);

        roomToken = res.token;
        roomId = res.roomId;
        userA.peerId = res.peerId;

        expect(roomToken).toHaveLength(6);
        expect(userA.peerId).toBeDefined();
        console.error(`Sala Creada: ${roomToken} (ID: ${roomId}, PeerID A: ${userA.peerId})`);
    });

    // ==========================================
    // 3. UNIRSE A SALA (User B)
    // ==========================================
    test('3. User B se une a la sala', async () => {
        const res = await fetch(`${API_URL}/join-room`, {
            method: 'POST',
            body: JSON.stringify({
                token: roomToken,
                username: userB.username,
                authToken: userB.token
            })
        }).then(r => r.json());

        if (!res.ok) throw new Error(`Fallo unirse sala: ${res.error}`);

        userB.peerId = res.peerId;
        expect(res.roomId).toBe(roomId);
        console.error(`User B unido. PeerId: ${userB.peerId}`);
    });

    // ==========================================
    // 4. WEBSOCKET FLOW
    // ==========================================
    test('4. Flujo WebSocket completo (Login + Join + Signaling)', async () => {
        // Conectar ambos sockets
        console.error('Conectando WebSocket A...');
        wsA = await connectWebSocket(userA);
        console.error('WS A Conectado y Logueado');

        console.error('Conectando WebSocket B...');
        wsB = await connectWebSocket(userB);
        console.error('WS B Conectado y Logueado');

        // Escuchar mensajes de sala
        const joinedPromiseA = new Promise((resolve) => {
            wsA.on('message', (data) => {
                const msg = JSON.parse(data.toString());
                if (msg.type === 'room_joined') {
                    console.error('User A recibió room_joined:', msg);
                    resolve(msg);
                }
            });
        });

        const joinedPromiseB = new Promise((resolve) => {
            wsB.on('message', (data) => {
                const msg = JSON.parse(data.toString());
                if (msg.type === 'room_joined') {
                    console.error('User B recibió room_joined:', msg);
                    resolve(msg);
                }
            });
        });

        // Ambos se unen al canal de señalización WebSocket
        console.error('Enviando join_room para A y B...');
        wsA.send(JSON.stringify({
            type: 'join_room',
            roomId: roomId,
            peerId: userA.peerId
        }));

        wsB.send(JSON.stringify({
            type: 'join_room',
            roomId: roomId,
            peerId: userB.peerId
        }));

        // Esperar confirmación
        await Promise.all([joinedPromiseA, joinedPromiseB]);
        console.error('✅ Ambos usuarios unidos al WebSocket de la sala correctamente');
    }, 30000); // 30s timeout

    afterAll(() => {
        if (wsA) wsA.close();
        if (wsB) wsB.close();
    });
});
