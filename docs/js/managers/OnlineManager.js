/**
 * OnlineManager - Gestión de conexiones online y autenticación
 * Maneja WebSocket, registro, login, salas y credenciales
 */

class OnlineManager {
    constructor(translationManager) {
        this.translationManager = translationManager;
        this.ws = null;
        this.username = null;
        this.iceServers = null;
        this.isConnected = false;
        this.apiBaseUrl = 'https://rtc.mathqix.com/api';
        this.wsUrl = 'ws://rtc.mathqix.com/ws';
        this.roomToken = null;
        this.roomId = null;
        this.peerId = null;
        this.remotePeerId = null;
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
        return !!localStorage.getItem('math_online_username');
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
                // Guardar credenciales
                this.saveCredentials(username, password);
                this.username = username;
                return { ok: true };
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
                this.ws = new WebSocket(this.wsUrl);

                this.ws.onopen = () => {
                    console.log('WebSocket conectado');
                    // Enviar credenciales
                    this.ws.send(JSON.stringify({
                        type: 'login',
                        user: username,
                        pass: password
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

                this.ws.onclose = () => {
                    console.log('WebSocket desconectado');
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
                    username: this.username
                })
            });

            const data = await response.json();

            if (data.ok) {
                this.roomToken = data.token;
                this.roomId = data.roomId;
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
                    username: this.username
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
            peerId: this.peerId
        });
    }

    /**
     * Envía una oferta WebRTC al otro jugador
     */
    sendOffer(offer) {
        this.send({
            type: 'offer',
            offer: offer
        });
    }

    /**
     * Envía una respuesta WebRTC al otro jugador
     */
    sendAnswer(answer) {
        this.send({
            type: 'answer',
            answer: answer
        });
    }

    /**
     * Envía un candidato ICE
     */
    sendIceCandidate(candidate) {
        this.send({
            type: 'ice-candidate',
            candidate: candidate
        });
    }

    /**
     * Maneja mensajes del WebSocket
     */
    _handleMessage(data, resolve, reject) {
        if (data.type === 'login_success') {
            console.log('Login exitoso en WebSocket', data.iceServers);
            this.isConnected = true;
            this.iceServers = data.iceServers;
            resolve(data);
        } else if (data.type === 'error') {
            console.error('Error en WebSocket:', data.message);
            this.isConnected = false;
            reject(new Error(data.message || 'Error de autenticación'));
        } else {
            // Procesar otros tipos de mensajes
            if (this.onMessage) {
                this.onMessage(data);
            }
        }
    }

    /**
     * Envía mensaje a través del WebSocket
     */
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
            return true;
        }
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
     * Obtiene los ICE servers disponibles
     */
    getIceServers() {
        return this.iceServers || [];
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
}
