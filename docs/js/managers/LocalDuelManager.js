/**
 * LocalDuelManager - Manages the flow of local multiplayer games
 */
class LocalDuelManager {
    /**
     * @param {GameEngine} gameEngine
     * @param {UserManager} userManager
     * @param {Function} t - translation function
     */
    constructor(gameEngine, userManager, t) {
        this.gameEngine = gameEngine;
        this.userManager = userManager;
        this.t = t;
    }

    /**
     * Inicia una partida de duelo local
     */
    startDuel() {
        const users = this.userManager.getUsers();
        if (Object.keys(users).length < 2) {
            alert(this.t('alert_min_users'));
            return;
        }
        this.gameEngine.setupDuel();

        // Return current user name for app.js sync if needed
        return this.userManager.getCurrentUserName();
    }

    /**
     * Inicia el siguiente turno
     */
    startNextTurn() {
        this.gameEngine.startNextDuelTurn();
        return this.userManager.getCurrentUserName();
    }

    /**
     * Configuración inicial del duelo
     */
    setupDuel() {
        this.gameEngine.setupDuel();
        return this.userManager.getCurrentUserName();
    }
}

if (typeof window !== 'undefined') {
    window.LocalDuelManager = LocalDuelManager;
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalDuelManager;
}

