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
                    username: this.username,
                    authToken: this.authToken
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

    // ==========================================
    // WebRTC Implementation
    // ==========================================

    /**
     * Inicializa la conexión Peer-to-Peer
     * @param {boolean} isInitiator - Si este cliente inicia la conexión (creador de sala)
     */
    initPeerConnection(isInitiator) {
        if (this.peerConnection) {
            this.peerConnection.close();
        }

        const configuration = {
            iceServers: this.iceServers || [{ urls: 'stun:stun.l.google.com:19302' }]
        };

        console.log('Iniciando RTCPeerConnection con:', configuration);
        this.peerConnection = new RTCPeerConnection(configuration);

        // Handler para candidatos ICE locales
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendIceCandidate(event.candidate);
            }
        };

        // Handler para cambio de estado de conexión
        this.peerConnection.onconnectionstatechange = () => {
            console.log('Connection State:', this.peerConnection.connectionState);
            if (this.peerConnection.connectionState === 'connected') {
                if (this.onPeerConnected) this.onPeerConnected();
            } else if (this.peerConnection.connectionState === 'disconnected' ||
                this.peerConnection.connectionState === 'failed') {
                if (this.onPeerDisconnected) this.onPeerDisconnected();
            }
        };

        if (isInitiator) {
            // El iniciador crea el Data Channel
            this.createDataChannel();
            this.createOffer();
        } else {
            // El receptor espera el Data Channel
            this.peerConnection.ondatachannel = (event) => {
                console.log('Data Channel recibido del remoto');
                this.setupDataChannel(event.channel);
            };
        }
    }

    /**
     * Crea el canal de datos para el juego
     */
    createDataChannel() {
        console.log('Creando Data Channel local');
        const dataChannel = this.peerConnection.createDataChannel("game-events");
        this.setupDataChannel(dataChannel);
    }

    /**
     * Configura event listeners para el canal de datos
     */
    setupDataChannel(channel) {
        this.dataChannel = channel;

        this.dataChannel.onopen = () => {
            console.log('Data Channel ABIERTO');
            // Notificar que estamos listos
        };

        this.dataChannel.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                // console.log('Recibido por Data Channel:', data);
                if (this.onGameEvent) {
                    this.onGameEvent(data);
                }
            } catch (e) {
                console.error('Error parseando mensaje Data Channel:', e);
            }
        };

        this.dataChannel.onerror = (error) => {
            console.error('Error Data Channel:', error);
        };
    }

    /**
     * Envía datos por el canal P2P
     */
    sendGameAction(action, payload) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            const message = JSON.stringify({ action, payload, timestamp: Date.now() });
            this.dataChannel.send(message);
            return true;
        }
        // console.warn('Data Channel no está abierto. Estado:', this.dataChannel ? this.dataChannel.readyState : 'null');
        return false;
    }

    /**
     * Crea y envía una oferta SDP
     */
    async createOffer() {
        try {
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);
            this.sendOffer(offer);
        } catch (e) {
            console.error('Error creando oferta:', e);
        }
    }

    /**
     * Maneja mensajes de señalización recibidos por WebSocket
     */
    async handleSignalingMessage(data) {
        if (!this.peerConnection) {
            // Si recibimos oferta y no tenemos PC, inicializar como receptor
            if (data.type === 'offer') {
                this.initPeerConnection(false);
            } else {
                return;
            }
        }

        try {
            if (data.type === 'offer') {
                console.log('Procesando Oferta Remota');
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                const answer = await this.peerConnection.createAnswer();
                await this.peerConnection.setLocalDescription(answer);
                this.sendAnswer(answer);

            } else if (data.type === 'answer') {
                console.log('Procesando Respuesta Remota');
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));

            } else if (data.type === 'ice-candidate') {
                if (data.candidate) {
                    await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            }
        } catch (e) {
            console.error('Error manejando señalización:', e);
        }
    }

    /**
     * Override del _handleMessage para interceptar señalización P2P
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
        } else if (['offer', 'answer', 'ice-candidate'].includes(data.type)) {
            this.handleSignalingMessage(data);
        } else {
            // Procesar otros tipos de mensajes
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
