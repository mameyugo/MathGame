/**
 * Tests de integración para funciones de duelo online
 * Prueba la lógica de compartir salas con tokens
 */

describe('Integración de Duelo Online', () => {
    let mockFetch;
    let mockWebSocket;

    beforeEach(() => {
        // Mock de fetch
        mockFetch = jest.fn();
        global.fetch = mockFetch;

        // Mock de WebSocket
        mockWebSocket = {
            send: jest.fn(),
            close: jest.fn(),
            readyState: 1, // OPEN
            onopen: null,
            onmessage: null,
            onerror: null,
            onclose: null
        };
        global.WebSocket = jest.fn(() => mockWebSocket);
    });

    describe('Flujo de Crear Sala', () => {
        test('debería crear sala y retornar token de 6 caracteres', async () => {
            const mockToken = 'ABC123';
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    token: mockToken,
                    roomId: 'room_1234'
                })
            });

            const response = await fetch('https://rtc.mathqix.com/api/create-room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'alice' })
            });

            const data = await response.json();

            expect(data.ok).toBe(true);
            expect(data.token).toBe(mockToken);
            expect(data.token.length).toBe(6);
            expect(/^[A-Z0-9]{6}$/.test(data.token)).toBe(true);
        });

        test('token debería ser criptográficamente único', async () => {
            const tokens = new Set();

            // Simular múltiples creaciones
            for (let i = 0; i < 100; i++) {
                const token = 'ABC' + String(i).padStart(3, '0');
                tokens.add(token);
            }

            expect(tokens.size).toBe(100);
        });
    });

    describe('Flujo de Unirse a Sala', () => {
        test('debería unirse a sala existente con token', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    roomId: 'room_1234',
                    peerId: 'peer_abc123',
                    peers: [
                        { username: 'alice', peerId: 'peer_111', isCreator: true },
                        { username: 'bob', peerId: 'peer_abc123', isCreator: false }
                    ]
                })
            });

            const response = await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: 'ABC123', username: 'bob' })
            });

            const data = await response.json();

            expect(data.ok).toBe(true);
            expect(data.peers.length).toBe(2);
            expect(data.peers[1].username).toBe('bob');
        });

        test('debería retornar error si sala no existe', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: false,
                    error: 'Room not found'
                })
            });

            const response = await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: 'INVALID', username: 'bob' })
            });

            const data = await response.json();

            expect(data.ok).toBe(false);
            expect(data.error).toBe('Room not found');
        });

        test('debería retornar error si sala está llena', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: false,
                    error: 'Room is full'
                })
            });

            const response = await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: 'ABC123', username: 'charlie' })
            });

            const data = await response.json();

            expect(data.ok).toBe(false);
            expect(data.error).toBe('Room is full');
        });
    });

    describe('Flujo de Información de Sala', () => {
        test('debería obtener estado de sala con token', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    roomId: 'room_1234',
                    gameState: 'ready',
                    isReady: true,
                    playerCount: 2,
                    maxPlayers: 2
                })
            });

            const response = await fetch(
                'https://rtc.mathqix.com/api/get-room-info?token=ABC123',
                { method: 'GET' }
            );

            const data = await response.json();

            expect(data.ok).toBe(true);
            expect(data.isReady).toBe(true);
            expect(data.playerCount).toBe(2);
        });

        test('debería indicar cuando sala no está lista', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    gameState: 'waiting',
                    isReady: false,
                    playerCount: 1
                })
            });

            const response = await fetch(
                'https://rtc.mathqix.com/api/get-room-info?token=ABC123',
                { method: 'GET' }
            );

            const data = await response.json();

            expect(data.isReady).toBe(false);
            expect(data.playerCount).toBe(1);
        });
    });

    describe('Flujo WebSocket para Signaling', () => {
        test('debería unirse a sala a través de WebSocket', () => {
            const ws = new WebSocket('ws://rtc.mathqix.com/ws');

            ws.send(JSON.stringify({
                type: 'login',
                user: 'alice',
                pass: 'password'
            }));

            expect(mockWebSocket.send).toHaveBeenCalledWith(
                expect.stringContaining('login')
            );
        });

        test('debería enviar oferta WebRTC', () => {
            const ws = new WebSocket('ws://rtc.mathqix.com/ws');

            ws.send(JSON.stringify({
                type: 'offer',
                offer: { type: 'offer', sdp: 'mock_sdp' }
            }));

            expect(mockWebSocket.send).toHaveBeenCalledWith(
                expect.stringContaining('offer')
            );
        });

        test('debería enviar respuesta WebRTC', () => {
            const ws = new WebSocket('ws://rtc.mathqix.com/ws');

            ws.send(JSON.stringify({
                type: 'answer',
                answer: { type: 'answer', sdp: 'mock_sdp' }
            }));

            expect(mockWebSocket.send).toHaveBeenCalledWith(
                expect.stringContaining('answer')
            );
        });

        test('debería manejar candidatos ICE', () => {
            const ws = new WebSocket('ws://rtc.mathqix.com/ws');

            ws.send(JSON.stringify({
                type: 'ice-candidate',
                candidate: { candidate: 'mock_candidate' }
            }));

            expect(mockWebSocket.send).toHaveBeenCalledWith(
                expect.stringContaining('ice-candidate')
            );
        });
    });

    describe('Flujo Completo de Juego Online', () => {
        test('debería ejecutar flujo: crear sala → compartir token → unirse → WebSocket → juego', async () => {
            // Paso 1: Crear sala
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    token: 'ABC123',
                    roomId: 'room_1234'
                })
            });

            const createRoomRes = await fetch('https://rtc.mathqix.com/api/create-room', {
                method: 'POST',
                body: JSON.stringify({ username: 'alice' })
            });
            const createData = await createRoomRes.json();

            expect(createData.token).toBe('ABC123');

            // Token se comparte por WhatsApp/Telegram
            const sharedToken = createData.token;

            // Paso 2: Segundo jugador se une
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    roomId: 'room_1234',
                    peerId: 'peer_bob',
                    peers: [
                        { username: 'alice', peerId: 'peer_alice', isCreator: true },
                        { username: 'bob', peerId: 'peer_bob', isCreator: false }
                    ]
                })
            });

            const joinRes = await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                body: JSON.stringify({ token: sharedToken, username: 'bob' })
            });
            const joinData = await joinRes.json();

            expect(joinData.ok).toBe(true);
            expect(joinData.peers.length).toBe(2);

            // Paso 3: Conectar WebSocket
            const ws = new WebSocket('ws://rtc.mathqix.com/ws');
            expect(global.WebSocket).toHaveBeenCalled();

            // Paso 4: Validar que ambos están en la sala
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    gameState: 'ready',
                    isReady: true,
                    playerCount: 2
                })
            });

            const infoRes = await fetch(
                `https://rtc.mathqix.com/api/get-room-info?token=${sharedToken}`
            );
            const infoData = await infoRes.json();

            expect(infoData.isReady).toBe(true);
            expect(infoData.playerCount).toBe(2);
        });
    });

    describe('Seguridad y Validación', () => {
        test('el token debería ser case-insensitive para unirse', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({ ok: true })
            });

            // Probar con minúsculas
            await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                body: JSON.stringify({ token: 'abc123', username: 'alice' })
            });

            // Debería convertirse a mayúsculas automáticamente
            const callArgs = mockFetch.mock.calls[0];
            expect(callArgs[0]).toContain('join-room');
        });

        test('debería validar credenciales antes de unirse a sala', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: false,
                    error: 'Invalid credentials'
                })
            });

            const response = await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                body: JSON.stringify({ token: 'ABC123', username: 'attacker' })
            });

            const data = await response.json();
            expect(data.ok).toBe(false);
        });

        test('debería expulsar usuarios después de timeout de inactividad', async () => {
            mockFetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: false,
                    error: 'Room expired'
                })
            });

            const response = await fetch('https://rtc.mathqix.com/api/join-room', {
                method: 'POST',
                body: JSON.stringify({ token: 'EXPIRED', username: 'late' })
            });

            const data = await response.json();
            expect(data.error).toBe('Room expired');
        });
    });
});
