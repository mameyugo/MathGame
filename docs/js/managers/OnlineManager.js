/**
 * OnlineManager - Gestión de conexiones online y autenticación
 * Maneja WebSocket, registro, login, salas y credenciales
 */

class OnlineManager {
    constructor(translationManager) {
        this.translationManager = translationManager;
        this.ws = null;
        this.username = null;
        this.isConnected = false;
        this.apiBaseUrl = 'https://rtc.mathqix.com/api';
        this.wsUrl = 'wss://rtc.mathqix.com/ws';
        this.roomToken = null;
        this.roomId = null;
        this.peerId = null;
        this.remotePeerId = null;

        // Cargar token guardado
        if (typeof localStorage !== 'undefined') {
            this.authToken = localStorage.getItem('math_online_token');
        }
    }

    /**
     * Obtiene traducción
     */
    t(key) {
        return this.translationManager.t(key);
    }

    /**
     * Verifica si hay credenciales guardadas
     */
    hasStoredCredentials() {
        return !!localStorage.getItem('math_online_username') &&
            !!localStorage.getItem('math_online_password') &&
            !!localStorage.getItem('math_online_token');
    }

    /**
     * Obtiene credenciales guardadas
     */
    getStoredCredentials() {
        return {
            username: localStorage.getItem('math_online_username'),
            password: localStorage.getItem('math_online_password')
        };
    }

    /**
     * Guarda credenciales en localStorage
     */
    saveCredentials(username, password) {
        localStorage.setItem('math_online_username', username);
        localStorage.setItem('math_online_password', password);
    }

    /**
     * Elimina credenciales guardadas
     */
    clearCredentials() {
        localStorage.removeItem('math_online_username');
        localStorage.removeItem('math_online_password');
    }

    /**
     * Registra un nuevo usuario en el servidor
     */
    async register(username, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: username,
                    pass: password
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en register:', error);
            throw new Error(this.t('error_connection') || 'Error de conexión con el servidor');
        }
    }

    /**
     * Autentica un usuario existente
     */
    async login(username, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: username,
                    pass: password
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en login:', error);
            throw new Error(this.t('error_connection') || 'Error de conexión con el servidor');
        }
    }


    /**
     * Sincroniza los datos del juego con el servidor
     */
    async syncUserData(gameData) {
        if (!this.username) {
            throw new Error('No hay usuario autenticado');
        }

        const creds = this.getStoredCredentials();
        if (!creds.password) {
            throw new Error('No hay credenciales guardadas');
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/sync.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: this.username,
                    pass: creds.password,
                    game_data: gameData
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en syncUserData:', error);
            throw error;
        }
    }

    /**
     * Registra o autentica (intenta login primero, luego registro)
     */
    async registerOrLogin(username, password) {
        try {
            // Intentar primero un login
            let result = await this.login(username, password);

            if (!result.ok && result.error && result.error.includes('Invalid credentials')) {
                // Si falla el login, intentar registrarse
                console.log('Login falló, intentando registrar...');
                result = await this.register(username, password);
            }

            if (result.ok) {
                // Guardar credenciales y token
                this.saveCredentials(username, password);
                this.username = username;

                if (result.token) {
                    this.authToken = result.token;
                    localStorage.setItem('math_online_token', result.token);
                }

                // Retornar el resultado completo (incluyendo game_data si existe)
                return result;
            } else {
                return result;
            }
        } catch (error) {
            throw error;
        }
    }


    /**
     * Conecta al servidor WebSocket
     */
    connect(username, password) {
        return new Promise((resolve, reject) => {
            try {
                this.username = username;

                // Si ya estamos conectados y autenticados, reutilizar
                if (this.ws && this.ws.readyState === WebSocket.OPEN && this.isConnected) {
                    console.log('WebSocket ya conectado, reutilizando...');
                    // If we are already connected, we might need to re-verify or just return success
                    // But the promise expects the 'login_success' payload.
                    // We can mock it or just resolve if we are sure.
                    resolve({ type: 'login_success' });
                    return;
                }

                // Si hay una conexión cerrándose o vieja, asegurar cierre
                if (this.ws) {
                    this.ws.close();
                }

                this.ws = new WebSocket(this.wsUrl);

                this.ws.onopen = () => {
                    console.log('WebSocket conectado');
                    // Enviar credenciales
                    this.ws.send(JSON.stringify({
                        type: 'login',
                        user: username,
                        pass: password,
                        token: this.authToken || localStorage.getItem('math_online_token')
                    }));
                };

                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    this._handleMessage(data, resolve, reject);
                };

                this.ws.onerror = (error) => {
                    console.error('Error WebSocket:', error);
                    this.isConnected = false;
                    reject(new Error(this.t('error_websocket') || 'Error de conexión WebSocket'));
                };

                this.ws.onclose = (event) => {
                    console.log('WebSocket desconectado', { code: event.code, reason: event.reason, wasClean: event.wasClean });
                    this.isConnected = false;
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Crea una nueva sala y retorna el token
     */
    async createRoom() {
        if (!this.username) {
            throw new Error('No hay usuario autenticado');
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/create-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.username,
                    authToken: this.authToken
                })
            });

            const data = await response.json();

            if (data.ok) {
                this.roomToken = data.token;
                this.roomId = data.roomId;
                this.peerId = data.peerId; // Fix: Saving peerId from response
                return data;
            } else {
                throw new Error(data.error || 'Error al crear sala');
            }
        } catch (error) {
            console.error('Error en createRoom:', error);
            throw error;
        }
    }

    /**
     * Se une a una sala usando el token
     */
    async joinRoom(token) {
        if (!this.username) {
            throw new Error('No hay usuario autenticado');
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/join-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token.toUpperCase(),
                    username: this.username,
                    authToken: this.authToken
                })
            });

            const data = await response.json();

            if (data.ok) {
                this.roomToken = token.toUpperCase();
                this.roomId = data.roomId;
                this.peerId = data.peerId;
                return data;
            } else {
                throw new Error(data.error || 'Error al unirse a la sala');
            }
        } catch (error) {
            console.error('Error en joinRoom:', error);
            throw error;
        }
    }

    /**
     * Obtiene información de la sala
     */
    async getRoomInfo(token) {
        try {
            const response = await fetch(
                `${this.apiBaseUrl}/get-room-info?token=${encodeURIComponent(token.toUpperCase())}`,
                { method: 'GET' }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en getRoomInfo:', error);
            throw error;
        }
    }

    /**
     * Se une a la sala en WebSocket
     */
    joinRoomWebSocket() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket no conectado');
        }

        if (!this.roomId || !this.peerId) {
            throw new Error('roomId o peerId no disponible');
        }

        this.send({
            type: 'join_room',
            roomId: this.roomId,
            peerId: this.peerId,
            token: this.roomToken,
            authToken: this.authToken
        });
    }

    /**
     * Envía mensaje a través del WebSocket
     */
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('📤 SEND WS:', message);
            this.ws.send(JSON.stringify(message));
            return true;
        }
        console.warn('⚠️ No se pudo enviar mensaje WS (desconectado):', message);
        return false;
    }

    /**
     * Desconecta del servidor
     */
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.isConnected = false;
        }
    }

    /**
     * Desconecta de la sala
     */
    leaveRoom() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.send({
                type: 'leave_room',
                roomId: this.roomId
            });
        }
        this.roomId = null;
        this.roomToken = null;
        this.peerId = null;
        this.remotePeerId = null;
    }

    /**
     * Verifica si está conectado
     */
    isOnlineConnected() {
        return this.isConnected;
    }

    /**
     * Obtiene el token actual de la sala
     */
    getRoomToken() {
        return this.roomToken;
    }

    // ==========================================
    // Partida: los mensajes viajan por el WebSocket y el servidor (PHP) los
    // reenvía al otro jugador de la sala. Antes iban por WebRTC entre los
    // dispositivos, que en móvil fallaba sin un servidor TURN.
    // ==========================================

    /**
     * Envía una acción de la partida al otro jugador
     * @returns {boolean} si se pudo enviar
     */
    sendGameAction(action, payload) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN && this.roomId) {
            this.send({ type: 'game', action, payload, timestamp: Date.now() });
            return true;
        }
        return false;
    }

    /**
     * Mensajes del servidor
     */
    _handleMessage(data, resolve, reject) {
        if (data.type === 'login_success') {
            this.isConnected = true;
            resolve(data);
        } else if (data.type === 'error') {
            console.error('Error en WebSocket:', data.message);
            this.isConnected = false;
            reject(new Error(data.message || 'Error de autenticación'));
        } else if (data.type === 'game') {
            if (this.onGameEvent) {
                this.onGameEvent({ action: data.action, payload: data.payload, timestamp: data.timestamp });
            }
        } else {
            if (data.type === 'peer_joined') {
                this.remotePeerId = data.peerId;
                if (this.onPeerConnected) this.onPeerConnected(data);
            } else if (data.type === 'peer_left') {
                this.remotePeerId = null;
                if (this.onPeerDisconnected) this.onPeerDisconnected(data);
            }
            if (this.onMessage) {
                this.onMessage(data);
            }
        }
    }
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OnlineManager;
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.OnlineManager = OnlineManager;
}
