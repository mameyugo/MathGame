/**
 * GameEngine - Manages game sessions, timer, and game flow
 * Handles single-player, problem mode, and duel mode
 */
class GameEngine {
    /**
     * @param {UserManager} userManager - User management instance
     * @param {TranslationManager} translationManager - Translation instance
     * @param {Function} generateQuestionFn - Function to generate math questions
     * @param {Function} generateProblemFn - Function to generate logic problems
     * @param {Function} toggleProblemUIFn - Function to toggle problem UI
     * @param {Function} updatePowerUpDisplayFn - Function to update power-up display
     * @param {Function} applyThemeFn - Function to apply current theme
     * @param {Function} showUsersFn - Function to show users screen
     */
    constructor(
        userManager,
        translationManager,
        generateQuestionFn,
        generateProblemFn,
        toggleProblemUIFn,
        updatePowerUpDisplayFn,
        applyThemeFn,
        showUsersFn
    ) {
        this.userManager = userManager;
        this.translationManager = translationManager;
        this.generateQuestion = generateQuestionFn;
        this.generateProblem = generateProblemFn;
        this.toggleProblemUI = toggleProblemUIFn;
        this.updatePowerUpDisplay = updatePowerUpDisplayFn;
        this.applyTheme = applyThemeFn;
        this.showUsers = showUsersFn;

        // Game state
        this.gameLevel = 1;
        this.gameCoins = 0;
        this.timeLeft = 30;
        this.timerInterval = null;
        this.freezeTimeout = null;
        this.currentAnswer = null;

        // Game modes
        this.duelMode = false;
        this.problemMode = false;
        this.problemType = '';
        this.duelPlayers = [];
        this.currentDuelIdx = 0;
        this.duelScores = {};
    }

    /**
     * Gets translation helper
     */
    t(key) {
        return this.translationManager.t(key);
    }

    /**
     * Starts a single-player game
     * @param {Object} checkboxes - { sum, res, mul } checkbox states
     * @returns {boolean} Success status
     */
    startSingleGame(checkboxes) {
        this.duelMode = false;
        this.problemMode = false;

        const user = this.userManager.getCurrentUser();
        if (!user) return false;

        user.ops = [];
        if (checkboxes.sum) user.ops.push('+');
        if (checkboxes.res) user.ops.push('-');
        if (checkboxes.mul) user.ops.push('*');
        if (checkboxes.div) user.ops.push('/');

        if (!user.ops.length) {
            alert(this.t('alert_choose_operation'));
            return false;
        }

        this.userManager.saveToStorage();
        this.initGameSession(1, 0);
        return true;
    }

    /**
     * Starts a problem-based game
     * @param {string} type - 'logica' or 'matematico'
     */
    startProblemGame(type) {
        this.duelMode = false;
        this.problemMode = true;
        this.problemType = type;
        this.initGameSession(1, 0);
    }

    /**
     * Sets up duel mode
     * @returns {boolean} Success status
     */
    setupDuel() {
        const users = this.userManager.getUsers();
        this.duelPlayers = Object.keys(users);

        if (this.duelPlayers.length < 2) {
            alert(this.t('alert_min_users'));
            return false;
        }

        this.duelMode = true;
        this.currentDuelIdx = 0;
        this.duelScores = {};
        this.startNextDuelTurn();
        return true;
    }

    /**
     * Starts next turn in duel mode
     */
    startNextDuelTurn() {
        const currentUser = this.duelPlayers[this.currentDuelIdx];
        this.userManager.selectUser(currentUser);

        const turnIndicator = document.getElementById('turn-indicator');
        if (turnIndicator) {
            turnIndicator.innerText = this.t('turn_of') + currentUser;
        }

        this.initGameSession(1, 0);
    }

    /**
     * Initializes a game session
     * @param {number} lvl - Initial level
     * @param {number} coins - Initial coins
     */
    initGameSession(lvl, coins) {
        this.gameLevel = lvl;
        this.gameCoins = coins;
        this.timeLeft = this.problemMode ? 60 : 30;

        // Switch to game screen
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const gameScreen = document.getElementById('screen-game');
        if (gameScreen) {
            gameScreen.classList.add('active');
        }

        // Initialize user inventory and display
        const user = this.userManager.getCurrentUser();
        if (user) {
            this.userManager.initInventory(user);
            this.updatePowerUpDisplay();
        }

        // Update game display with initial values
        const levelElement = document.getElementById('game-level');
        const coinsElement = document.getElementById('game-coins');
        if (levelElement) {
            levelElement.innerText = this.gameLevel;
        }
        if (coinsElement) {
            coinsElement.innerText = this.gameCoins;
        }

        this.userManager.updateRecordDisplay(this.gameLevel);
        this.applyTheme();

        // Generate appropriate content
        if (this.problemMode) {
            this.toggleProblemUI(true);
            this.generateProblem();
        } else {
            this.toggleProblemUI(false);
            this.generateQuestion();
        }

        this.startTimer();
    }

    /**
     * Starts or restarts the game timer
     */
    startTimer() {
        // Don't start if time has run out
        if (this.timeLeft <= 0) {
            this.endGameSession();
            return;
        }

        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            const timerElement = document.getElementById('game-timer');
            if (timerElement) {
                timerElement.innerText = this.timeLeft + "s";
            }
            if (this.timeLeft <= 0) {
                this.endGameSession();
            }
        }, 1000);
    }

    /**
     * Checks user answer
     * @param {number} val - User's answer
     */
    check(val) {
        if (val === this.currentAnswer) {
            // Correct answer
            this.gameCoins += 10;
            this.timeLeft += 2;

            try {
                confetti({ particleCount: 30, spread: 50 });
            } catch (e) {
                // Confetti not loaded
            }

            if (this.gameCoins % 50 === 0) {
                this.gameLevel++;
            }

            this.generateQuestion();
        } else {
            // Wrong answer - check for shield
            const user = this.userManager.getCurrentUser();
            if (user) {
                this.userManager.initInventory(user);

                if (user.inventory.shields > 0) {
                    user.inventory.shields--;
                    this.userManager.saveToStorage();
                    this.updatePowerUpDisplay();

                    // Show shield message
                    const showFeedbackMessage = window.showFeedbackMessage;
                    if (typeof showFeedbackMessage === 'function') {
                        showFeedbackMessage(this.t('alert_shield_used'));
                    }

                    if (typeof window !== 'undefined' && typeof window.showTimeEffect === 'function') {
                        window.showTimeEffect('🛡️', 'neutral');
                    }

                    // Update display and return (no penalty)
                    this.updateGameDisplay();
                    return;
                }
            }

            // No shield - apply penalty
            const appContainer = document.getElementById('app-container');
            if (appContainer) {
                appContainer.classList.add('shake');
                setTimeout(() => appContainer.classList.remove('shake'), 400);
            }

            this.timeLeft -= 4;
        }

        this.updateGameDisplay();
    }

    /**
     * Updates game display (level, coins, record)
     */
    updateGameDisplay() {
        const levelElement = document.getElementById('game-level');
        const coinsElement = document.getElementById('game-coins');

        if (levelElement) {
            levelElement.innerText = this.gameLevel;
        }
        if (coinsElement) {
            coinsElement.innerText = this.gameCoins;
        }

        this.userManager.updateRecordDisplay(this.gameLevel);
    }

    /**
     * Ends the current game session
     */
    endGameSession() {
        clearInterval(this.timerInterval);

        if (this.duelMode) {
            // Duel mode ending
            const currentUser = this.duelPlayers[this.currentDuelIdx];
            this.duelScores[currentUser] = this.gameCoins;
            this.currentDuelIdx++;

            if (this.currentDuelIdx < this.duelPlayers.length) {
                this.startNextDuelTurn();
            } else {
                // Show final duel results
                const results = Object.entries(this.duelScores)
                    .map(([p, s]) => `${p}: ${s}`)
                    .join("\n");
                alert(this.t('alert_duel_end') + results);
                this.showUsers();
            }
        } else {
            // Single-player mode ending
            const user = this.userManager.getCurrentUser();
            if (user) {
                user.totalCoins += this.gameCoins;
                user.level = Math.max(user.level || 1, this.gameLevel);
                this.userManager.saveToStorage();
            }

            alert(this.t('alert_good_job') + this.gameCoins + this.t('alert_coins'));
            this.showUsers();
        }
    }

    /**
     * Sets the current answer (called by question generator)
     * @param {number} answer - Correct answer
     */
    setCurrentAnswer(answer) {
        this.currentAnswer = answer;
    }

    /**
     * Gets current game state
     * @returns {Object} Game state
     */
    getGameState() {
        return {
            gameLevel: this.gameLevel,
            gameCoins: this.gameCoins,
            timeLeft: this.timeLeft,
            timerInterval: this.timerInterval,
            freezeTimeout: this.freezeTimeout,
            duelMode: this.duelMode,
            problemMode: this.problemMode,
            problemType: this.problemType
        };
    }

    /**
     * Updates time left (used by power-ups)
     * @param {number} newTimeLeft - New time value
     */
    setTimeLeft(newTimeLeft) {
        this.timeLeft = newTimeLeft;
        const timerElement = document.getElementById('game-timer');
        if (timerElement) {
            timerElement.innerText = this.timeLeft + "s";
        }
    }

    /**
     * Pauses the timer (used by freeze power-up)
     */
    pauseTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }

    /**
     * Resumes the timer after freeze
     * @param {number} delay - Delay in milliseconds
     */
    resumeTimerAfterFreeze(delay) {
        clearTimeout(this.freezeTimeout);
        this.freezeTimeout = setTimeout(() => {
            this.freezeTimeout = null;
            this.startTimer();
        }, delay);
    }
}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}
if (typeof window !== 'undefined') {
    window.GameEngine = GameEngine;
}
