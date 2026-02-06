/**
 * OnlineGameController - Manages the flow of online multiplayer games
 * Orchestrates OnlineManager, GameEngine, and UI for online play
 */
class OnlineGameController {
    /**
     * @param {OnlineManager} onlineManager
     * @param {GameEngine} gameEngine
     * @param {QuestionGenerator} questionGenerator
     * @param {UserManager} userManager
     * @param {Function} t - translation function
     */
    constructor(onlineManager, gameEngine, questionGenerator, userManager, t) {
        this.onlineManager = onlineManager;
        this.gameEngine = gameEngine;
        this.questionGenerator = questionGenerator;
        this.userManager = userManager;
        this.t = t;

        this.isHost = false;
        this.pendingOnlineAction = null;

        // Bind methods
        this.onPeerConnected = this.onPeerConnected.bind(this);
        this.onGameEvent = this.onGameEvent.bind(this);
        this.onServerMessage = this.onServerMessage.bind(this);

        // Setup listeners
        this.onlineManager.onPeerConnected = this.onPeerConnected;
        this.onlineManager.onGameEvent = this.onGameEvent;
        this.onlineManager.onMessage = this.onServerMessage;
    }

    /**
     * Handles successful P2P connection
     */
    onPeerConnected() {
        console.log('🔗 Peer Connected! Starting exchange...');

        // Close any open modals
        this.closeShareRoomModal();
        this.closeOnlineCredentialsModal();

        // UI Feedback
        this.showOnlineStartOverlay();

        if (this.isHost) {
            // Host Generates Content
            setTimeout(() => {
                const queue = this.questionGenerator.generateMathQuestionBatch(50);
                const config = {
                    type: 'race',
                    targetWins: 10
                };

                // Send Initial Sync
                this.onlineManager.sendGameAction('initial_sync', {
                    queue: queue,
                    config: config,
                    timestamp: Date.now()
                });

                // Start Local Game
                this.startSynchronizedOnlineGame(queue, config);
            }, 1000);
        }
    }

    /**
     * Handles incoming game events from peer
     */
    onGameEvent(data) {
        if (data.action === 'initial_sync') {
            const { queue, config } = data.payload;
            this.startSynchronizedOnlineGame(queue, config);
        } else {
            // Delegate to GameEngine
            this.gameEngine.receiveRemoteAction(data.action, data.payload);
        }
    }

    /**
     * Handles general messages from the Signaling Server
     */
    onServerMessage(data) {
        // console.log('🔔 Server Message:', data);
        if (data.type === 'room_joined') {
            console.log('✅ Joined room successfully:', data.roomId);
            const messageDiv = document.getElementById('online-credentials-message');
            if (messageDiv) {
                this.showMessage(messageDiv, '✅ Unido a sala. Esperando oponente...', 'success');
            }

            // Show overlay only if we are the guest (peerId is set)
            // But actually, we want to show it for both, but host usually sees "Share Code" modal.
            // Guest sees "Joining..." then this.
            if (!this.isHost) {
                this.showWaitingOverlay();
            }
        }
    }

    /**
     * Starts the synchronized game session
     */
    startSynchronizedOnlineGame(queue, config) {
        // Remove Overlay
        setTimeout(() => {
            this.removeOnlineStartOverlay();
        }, 1500);

        // Setup Problem Queue
        this.questionGenerator.setProblemQueue(queue);

        // Setup Game Engine callbacks
        this.gameEngine.setOnlineCallbacks(
            (action, payload) => this.onlineManager.sendGameAction(action, payload),
            () => { /* On Game Over Local Handler (optional) */ }
        );

        // Start Session
        this.gameEngine.startOnlineGameSession(config);

        // Trigger UI update callback (passed from app.js usually, or dispatch event)
        // For now we can dispatch a custom event or assume app.js will react to game state changes
        // But app.js needs to know to switch screens. we can dispatch a global event.
        window.dispatchEvent(new CustomEvent('online-game-start'));
    }

    // ==========================================
    // UI Management (Modals & Overlays)
    // ==========================================

    showWaitingOverlay() {
        const existing = document.getElementById('online-start-overlay');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.id = 'online-start-overlay';
        msg.className = 'online-overlay';
        msg.innerHTML = `
            <div class="overlay-content">
                <div class="overlay-title">⏳ Esperando Oponente</div>
                <div class="overlay-subtitle">Conectado a la sala. Esperando a que el anfitrión inicie...</div>
                <button class="btn-back" style="margin-top: 20px; background: rgba(255,255,255,0.2);" onclick="document.getElementById('online-start-overlay').remove()">Cancelar</button>
            </div>`;
        document.body.appendChild(msg);
    }

    showOnlineStartOverlay() {
        const msg = document.createElement('div');
        msg.id = 'online-start-overlay';
        msg.className = 'online-overlay';
        msg.innerHTML = `
            <div class="overlay-content">
                <div class="overlay-title">🚀 Oponente Encontrado</div>
                <div class="overlay-subtitle">Sincronizando juego...</div>
            </div>`;
        document.body.appendChild(msg);
    }

    removeOnlineStartOverlay() {
        const overlay = document.getElementById('online-start-overlay');
        if (overlay) overlay.remove();
    }

    // ==========================================
    // Room Management Flow
    // ==========================================

    /**
     * Creates a room and shows the share token
     */
    async createAndShareGameRoom() {
        const messageDiv = document.getElementById('online-credentials-message');
        this.showMessage(messageDiv, 'Sincronizando y creando sala...', 'loading');

        // Sync before creating
        await this.syncWithServer();

        try {
            const result = await this.onlineManager.createRoom();

            if (result.ok) {
                this.isHost = true;
                this.showMessage(messageDiv, '✅ Sala creada', 'success');
                this.showShareRoomToken(result.token);

                // IMPORTANT: Register WS connection to the room for signaling
                this.onlineManager.joinRoomWebSocket();
            } else {
                this.showMessage(messageDiv, result.error || 'Error desconocido', 'error');
            }
        } catch (error) {
            console.error('Error al crear sala:', error);
            this.showMessage(messageDiv, error.message || 'Error de conexión', 'error');
        }
    }

    /**
     * Joins a room by code
     */
    async joinRoomByCode(roomCode) {
        const messageDiv = document.getElementById('online-credentials-message');

        if (!roomCode) {
            this.showMessage(messageDiv, 'Ingresa el código de la sala', 'error');
            return;
        }

        this.showMessage(messageDiv, 'Sincronizando y uniéndose...', 'loading');

        // Sync before joining
        await this.syncWithServer();

        try {
            const result = await this.onlineManager.joinRoom(roomCode);

            if (result.ok) {
                this.isHost = false;
                this.showMessage(messageDiv, '✅ ¡Te uniste a la sala!', 'success');

                setTimeout(() => {
                    this.closeOnlineCredentialsModal();

                    // IMPORTANT: Register WS connection to the room for signaling
                    this.onlineManager.joinRoomWebSocket();

                    // INITIATE P2P CONNECTION AS GUEST (Initiator)
                    // Important: The joiner initiates the P2P connection in this pattern
                    this.onlineManager.initPeerConnection(true);
                }, 1000);
            } else {
                this.showMessage(messageDiv, result.error || 'Error desconocido', 'error');
            }
        } catch (error) {
            console.error('Error al unirse a sala:', error);
            this.showMessage(messageDiv, error.message || 'Error de conexión', 'error');
        }
    }

    // ==========================================
    // Auth Flow
    // ==========================================

    async registerOrLoginOnline(username, password) {
        const messageDiv = document.getElementById('online-credentials-message');

        if (!username || !password) {
            this.showMessage(messageDiv, this.t('error_credentials_required'), 'error');
            return;
        }

        this.showMessage(messageDiv, 'Conectando...', 'loading');

        try {
            const result = await this.onlineManager.registerOrLogin(username, password);

            if (result.ok) {
                this.showMessage(messageDiv, this.t('success_connected'), 'success');

                // Merge data logic (delegated back to app via callback or direct if manager passed)
                // We have userManager, so we can do it here
                if (result.game_data) {
                    this.userManager.mergeUserData(result.game_data);
                }

                // Sync Up (using helper)
                await this.syncWithServer();

                setTimeout(async () => {
                    this.closeOnlineCredentialsModal();

                    // Asegurar conexión WebSocket antes de cualquier acción
                    await this.connectAndShowOptions(username, password);

                    if (this.pendingOnlineAction === 'create') {
                        this.createAndShareGameRoom();
                        this.pendingOnlineAction = null;
                    }
                }, 1000);
            } else {
                this.showMessage(messageDiv, result.error || 'Error desconocido', 'error');
            }
        } catch (error) {
            this.showMessage(messageDiv, error.message || 'Error de conexión', 'error');
        }
    }

    async connectAndShowOptions(username, password) {
        try {
            const result = await this.onlineManager.connect(username, password);
            if (result && result.type === 'login_success') {
                window.dispatchEvent(new CustomEvent('online-connected'));
            }
        } catch (error) {
            alert(error.message);
        }
    }

    /**
     * Helper to sync local data with server
     */
    async syncWithServer() {
        const currentUserData = this.userManager.getCurrentUser();
        if (currentUserData) {
            try {
                // console.log('🔄 Syncing with server...');
                const syncResult = await this.onlineManager.syncUserData(currentUserData);
                if (syncResult.ok && syncResult.game_data) {
                    this.userManager.mergeUserData(syncResult.game_data);
                    // console.log('✅ Sync successful');
                    window.dispatchEvent(new CustomEvent('update-ui'));
                    return true;
                }
            } catch (e) {
                console.warn('Sync error:', e);
            }
        }
        return false;
    }

    async checkAndSync(username, password) {
        // Ensure we are connected/authenticated context mostly
        // Perform Sync
        const messageDiv = document.getElementById('online-credentials-message');
        // If modal not open, where to show feedback? 
        // Maybe just console or toast? For now console.

        try {
            // 1. Ensure Local Auth state matches
            this.onlineManager.username = username;

            // 2. Sync
            await this.syncWithServer();

            // 3. Connect socket immediately
            await this.connectAndShowOptions(username, password);

        } catch (e) {
            console.error('Auto-sync failed:', e);
            // Optionally force re-login if password wrong?
        }
    }

    // ==========================================
    // UI Helpers
    // ==========================================

    showShareRoomToken(token) {
        this.closeOnlineCredentialsModal();
        let modal = document.getElementById('share-room-modal');
        if (!modal) {
            this.createShareRoomModal();
            modal = document.getElementById('share-room-modal');
        }

        const display = document.getElementById('room-code-display');
        if (display) display.textContent = token;

        if (modal) modal.style.display = 'flex';
    }

    createShareRoomModal() {
        // Check if exists
        if (document.getElementById('share-room-modal')) return;

        const html = `
        <div id="share-room-modal" class="modal" style="display: none;">
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h2>🎮 Código de Sala</h2>
                    <button class="modal-close" id="btn-close-share-room">✖</button>
                </div>
                <div class="modal-body-centered">
                    <p class="mb-20 font-1-1">Comparte este código con tu amigo:</p>
                    <div class="room-code-container">
                        <div id="room-code-display" class="room-code-text">LOADING...</div>
                    </div>
                    <button class="main-btn w-100 mb-10" id="btn-copy-code">📋 Copiar código</button>
                    <p class="text-muted text-sm mb-15">Esperando a tu amigo... (Timeout en 1 hora)</p>
                    <button class="btn-back w-100" id="btn-cancel-share">❌ Cancelar</button>
                </div>
            </div>
        </div>`;

        if (document.body) document.body.insertAdjacentHTML('beforeend', html);

        // Bind events
        document.getElementById('btn-close-share-room').onclick = () => this.closeShareRoomModal();
        document.getElementById('btn-cancel-share').onclick = () => this.closeShareRoomModal();
        document.getElementById('btn-copy-code').onclick = () => {
            const code = document.getElementById('room-code-display').textContent;
            navigator.clipboard.writeText(code).then(() => alert('Copiado!')).catch(() => alert('Copia: ' + code));
        };
    }

    closeShareRoomModal() {
        const modal = document.getElementById('share-room-modal');
        if (modal) modal.style.display = 'none';
        window.dispatchEvent(new CustomEvent('show-duel-selector'));
    }

    closeOnlineCredentialsModal() {
        const modal = document.getElementById('online-credentials-modal');
        if (modal) modal.style.display = 'none';
    }

    showMessage(messageDiv, text, type = 'error') {
        if (!messageDiv) return;
        messageDiv.style.display = 'block';
        messageDiv.textContent = text;
        messageDiv.className = `message-box ${type}`;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.OnlineGameController = OnlineGameController;
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OnlineGameController;
}

