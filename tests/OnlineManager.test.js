const fs = require('fs');
const path = require('path');

// Cargar archivos necesarios
const translationManagerCode = fs.readFileSync(path.join(__dirname, '../docs/js/managers/TranslationManager.js'), 'utf8');
const onlineManagerCode = fs.readFileSync(path.join(__dirname, '../docs/js/managers/OnlineManager.js'), 'utf8');

describe('OnlineManager - Sistema de Duelo Online', () => {
    let onlineManager;
    let translationManager;
    let localStorageMock;

    beforeAll(() => {
        window.__TEST__ = true;

        // Mock localStorage
        localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
            store: {}
        };

        // Implementar efectivamente
        localStorageMock.setItem.mockImplementation((key, value) => {
            localStorageMock.store[key] = value;
        });
        localStorageMock.getItem.mockImplementation((key) => {
            return localStorageMock.store[key] || null;
        });
        localStorageMock.removeItem.mockImplementation((key) => {
            delete localStorageMock.store[key];
        });
        localStorageMock.clear.mockImplementation(() => {
            localStorageMock.store = {};
        });

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });

        // Ejecutar TranslationManager
        window.eval(`
            ${translationManagerCode}
            window.TranslationManager = TranslationManager;
        `);

        // Crear instancia de TranslationManager
        translationManager = new window.TranslationManager();
        translationManager.translations = {
            'es': {
                'error_connection': 'Error de conexión con el servidor',
                'error_websocket': 'Error de conexión WebSocket'
            }
        };
    });

    beforeEach(() => {
        // Limpiar localStorage
        localStorageMock.clear();

        // Ejecutar OnlineManager
        window.eval(`
            ${onlineManagerCode}
            window.OnlineManager = OnlineManager;
        `);

        // Crear instancia
        onlineManager = new window.OnlineManager(translationManager);

        // Mock de fetch
        global.fetch = jest.fn();

        // Mock de WebSocket
        global.WebSocket = jest.fn(() => ({
            send: jest.fn(),
            close: jest.fn(),
            readyState: WebSocket.OPEN,
            onopen: null,
            onmessage: null,
            onerror: null,
            onclose: null
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Gestión de Credenciales', () => {
        test('debería guardar credenciales en localStorage', () => {
            onlineManager.saveCredentials('testuser', 'password123');

            expect(localStorageMock.setItem).toHaveBeenCalledWith('math_online_username', 'testuser');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('math_online_password', 'password123');
        });

        test('debería obtener credenciales guardadas', () => {
            localStorageMock.store['math_online_username'] = 'alice';
            localStorageMock.store['math_online_password'] = 'pass123';

            const creds = onlineManager.getStoredCredentials();

            expect(creds.username).toBe('alice');
            expect(creds.password).toBe('pass123');
        });

        test('debería verificar si hay credenciales guardadas', () => {
            expect(onlineManager.hasStoredCredentials()).toBe(false);

            localStorageMock.store['math_online_username'] = 'bob';
            localStorageMock.store['math_online_password'] = 'secret';
            localStorageMock.store['math_online_token'] = 'mock_token';

            expect(onlineManager.hasStoredCredentials()).toBe(true);
        });

        test('debería limpiar credenciales', () => {
            localStorageMock.store['math_online_username'] = 'charlie';
            localStorageMock.store['math_online_password'] = 'secret';

            onlineManager.clearCredentials();

            expect(localStorageMock.removeItem).toHaveBeenCalledWith('math_online_username');
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('math_online_password');
        });
    });

    describe('Registro e Inicio de Sesión', () => {
        test('debería registrar un nuevo usuario exitosamente', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ ok: true })
            });

            const result = await onlineManager.register('newuser', 'password123');

            expect(result.ok).toBe(true);
            expect(global.fetch).toHaveBeenCalledWith(
                'https://rtc.mathqix.com/api/register',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                })
            );
        });

        test('debería fallar si el usuario ya existe', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ ok: false, error: 'User already exists' })
            });

            const result = await onlineManager.register('existing', 'pass123');

            expect(result.ok).toBe(false);
            expect(result.error).toBe('User already exists');
        });

        test('debería hacer login exitosamente', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ ok: true })
            });

            const result = await onlineManager.login('alice', 'pass123');

            expect(result.ok).toBe(true);
        });

        test('debería registrarse automáticamente si login falla', async () => {
            // Primer fetch (login) falla
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ ok: false, error: 'Invalid credentials' })
            });
            // Segundo fetch (registro) exitoso
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ ok: true })
            });

            const result = await onlineManager.registerOrLogin('bob', 'newpass123');

            expect(result.ok).toBe(true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });

        test('debería guardar credenciales después de registerOrLogin exitoso', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({ ok: true })
            });

            await onlineManager.registerOrLogin('testuser', 'testpass');

            expect(localStorageMock.setItem).toHaveBeenCalledWith('math_online_username', 'testuser');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('math_online_password', 'testpass');
        });
    });

    describe('Gestión de Salas', () => {
        beforeEach(() => {
            onlineManager.username = 'testuser';
        });

        test('debería crear una sala exitosamente', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    token: 'ABC123',
                    roomId: 'room_123'
                })
            });

            const result = await onlineManager.createRoom();

            expect(result.ok).toBe(true);
            expect(result.token).toBe('ABC123');
            expect(onlineManager.roomToken).toBe('ABC123');
            expect(onlineManager.roomId).toBe('room_123');
        });

        test('debería unirse a una sala exitosamente', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    roomId: 'room_456',
                    token: 'XYZ789',
                    peerId: 'peer_abc',
                    peers: [
                        { username: 'alice', peerId: 'peer_aaa', isCreator: true },
                        { username: 'bob', peerId: 'peer_abc', isCreator: false }
                    ]
                })
            });

            const result = await onlineManager.joinRoom('XYZ789');

            expect(result.ok).toBe(true);
            expect(onlineManager.roomToken).toBe('XYZ789');
            expect(onlineManager.peerId).toBe('peer_abc');
            expect(result.peers.length).toBe(2);
        });

        test('debería obtener información de la sala', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                    token: 'ABC123',
                    gameState: 'ready',
                    isReady: true,
                    playerCount: 2
                })
            });

            const result = await onlineManager.getRoomInfo('ABC123');

            expect(result.ok).toBe(true);
            expect(result.isReady).toBe(true);
            expect(result.playerCount).toBe(2);
        });

        test('debería manejar error cuando sala no existe', async () => {
            global.fetch.mockResolvedValueOnce({
                json: async () => ({
                    ok: false,
                    error: 'Room not found'
                })
            });

            const result = await onlineManager.getRoomInfo('INVALID');

            expect(result.ok).toBe(false);
            expect(result.error).toBe('Room not found');
        });

        test('debería lanzar error si intenta crear sala sin usuario autenticado', async () => {
            onlineManager.username = null;

            await expect(onlineManager.createRoom()).rejects.toThrow('No hay usuario autenticado');
        });

        test('debería lanzar error si intenta unirse sin usuario autenticado', async () => {
            onlineManager.username = null;

            await expect(onlineManager.joinRoom('ABC123')).rejects.toThrow('No hay usuario autenticado');
        });
    });

    describe('Conexión WebSocket', () => {
        test('debería conectar al WebSocket con credenciales', (done) => {
            const mockWs = {
                send: jest.fn(),
                close: jest.fn(),
                readyState: WebSocket.OPEN,
                onopen: null,
                onmessage: null,
                onerror: null,
                onclose: null
            };

            global.WebSocket = jest.fn(() => mockWs);

            const promise = onlineManager.connect('testuser', 'testpass');

            // Simular apertura de conexión
            setTimeout(() => {
                mockWs.onopen();
                // Simular login exitoso
                mockWs.onmessage({
                    data: JSON.stringify({
                        type: 'login_success',
                        iceServers: [{ urls: 'stun:server.com' }]
                    })
                });
            }, 10);

            promise.then((result) => {
                expect(result.type).toBe('login_success');
                expect(onlineManager.isConnected).toBe(true);
                expect(mockWs.send).toHaveBeenCalled();
                done();
            });
        });

        test('debería manejar errores de WebSocket', (done) => {
            const mockWs = {
                send: jest.fn(),
                close: jest.fn(),
                readyState: WebSocket.OPEN,
                onopen: null,
                onmessage: null,
                onerror: null,
                onclose: null
            };

            global.WebSocket = jest.fn(() => mockWs);

            const promise = onlineManager.connect('user', 'pass');

            setTimeout(() => {
                mockWs.onerror(new Error('Connection failed'));
            }, 10);

            promise.catch((error) => {
                expect(onlineManager.isConnected).toBe(false);
                expect(error).toBeDefined();
                done();
            });
        });

        test('debería reutilizar conexión existente', async () => {
            const mockWs = {
                send: jest.fn(),
                close: jest.fn(),
                readyState: WebSocket.OPEN
            };
            onlineManager.ws = mockWs;
            onlineManager.isConnected = true;
            // No mocking connect needed as we are testing the logic inside
            // But we need to ensure the promise resolves immediately

            const result = await onlineManager.connect('user', 'pass');

            expect(result.type).toBe('login_success');
            expect(onlineManager.ws).toBe(mockWs); // Same instance
        });

        test('debería enviar mensaje por WebSocket', () => {
            onlineManager.ws = {
                readyState: WebSocket.OPEN,
                send: jest.fn()
            };

            onlineManager.send({ type: 'test', data: 'hello' });

            expect(onlineManager.ws.send).toHaveBeenCalledWith(
                JSON.stringify({ type: 'test', data: 'hello' })
            );
        });

        test('debería desconectar del WebSocket', () => {
            const mockWs = {
                close: jest.fn(),
                readyState: WebSocket.OPEN
            };
            onlineManager.ws = mockWs;
            onlineManager.isConnected = true;

            onlineManager.disconnect();

            expect(mockWs.close).toHaveBeenCalled();
            expect(onlineManager.isConnected).toBe(false);
            expect(onlineManager.ws).toBeNull();
        });
    });

    describe('Gestión de Sala WebSocket', () => {
        beforeEach(() => {
            onlineManager.ws = {
                readyState: WebSocket.OPEN,
                send: jest.fn()
            };
            onlineManager.roomId = 'room_123';
            onlineManager.peerId = 'peer_abc';
            onlineManager.roomToken = 'ABC123';
            onlineManager.authToken = 'auth_token_123';
        });

        test('debería unirse a sala en WebSocket', () => {
            onlineManager.joinRoomWebSocket();

            expect(onlineManager.ws.send).toHaveBeenCalledWith(
                expect.stringContaining('"type":"join_room"')
            );
            expect(onlineManager.ws.send).toHaveBeenCalledWith(
                expect.stringContaining('"token":"ABC123"')
            );
        });

        test('debería enviar acciones de la partida por el WebSocket (reenvío del servidor)', () => {
            const enviado = onlineManager.sendGameAction('answer', { correct: true });

            expect(enviado).toBe(true);
            const mensaje = JSON.parse(onlineManager.ws.send.mock.calls.pop()[0]);
            expect(mensaje.type).toBe('game');
            expect(mensaje.action).toBe('answer');
            expect(mensaje.payload).toEqual({ correct: true });
        });

        test('no debería enviar acciones sin sala', () => {
            onlineManager.roomId = null;
            expect(onlineManager.sendGameAction('answer', {})).toBe(false);
        });

        test('debería entregar las acciones recibidas y avisar de la llegada del rival', () => {
            const eventos = [];
            const llegadas = [];
            onlineManager.onGameEvent = (d) => eventos.push(d);
            onlineManager.onPeerConnected = (d) => llegadas.push(d);

            onlineManager._handleMessage({ type: 'peer_joined', peerId: 'p2' }, () => {}, () => {});
            onlineManager._handleMessage({ type: 'game', action: 'initial_sync', payload: { queue: [1] }, timestamp: 5 }, () => {}, () => {});

            expect(llegadas.length).toBe(1);
            expect(onlineManager.remotePeerId).toBe('p2');
            expect(eventos).toEqual([{ action: 'initial_sync', payload: { queue: [1] }, timestamp: 5 }]);
        });

        test('debería salir de la sala', () => {
            onlineManager.leaveRoom();

            expect(onlineManager.ws.send).toHaveBeenCalledWith(
                expect.stringContaining('"type":"leave_room"')
            );
            expect(onlineManager.roomId).toBeNull();
            expect(onlineManager.roomToken).toBeNull();
        });
    });

    describe('Obtención de Estados', () => {
        test('debería verificar si está conectado', () => {
            onlineManager.isConnected = false;
            expect(onlineManager.isOnlineConnected()).toBe(false);

            onlineManager.isConnected = true;
            expect(onlineManager.isOnlineConnected()).toBe(true);
        });

        test('debería obtener token de sala actual', () => {
            onlineManager.roomToken = 'ABC123';

            expect(onlineManager.getRoomToken()).toBe('ABC123');
        });
    });
});
