/**
 * GameEngine - Manages game sessions, timer, and game flow
 * Handles single-player, problem mode, and duel mode
 */
class GameEngine {
    /**
     * @param {UserManager} userManager - User management instance
     * @param {TranslationManager} translationManager - Translation instance
     * @param {AchievementManager} achievementManager - Achievement management instance
    * @param {DailyChallengeManager} dailyChallengeManager - Daily challenge management instance
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
        achievementManager,
        dailyChallengeManager,
        generateQuestionFn,
        generateProblemFn,
        updatePowerUpDisplayFn,
        applyThemeFn,
        showUsersFn
    ) {
        this.userManager = userManager;
        this.translationManager = translationManager;
        this.achievementManager = achievementManager;
        this.dailyChallengeManager = dailyChallengeManager;
        this.generateQuestion = generateQuestionFn;
        this.generateProblem = generateProblemFn;
        this.updatePowerUpDisplay = updatePowerUpDisplayFn;
        this.applyTheme = applyThemeFn;
        this.showUsers = showUsersFn;

        // Game state
        this.gameLevel = 1;
        this.gameCoins = 0;
        this.timeLeft = 30;
        this.timerInterval = null;
        this.freezeTimeout = null;
        this.sessionEnded = false;
        this.currentAnswer = null;

        // UI references (can be passed or looked up)
        this.ui = {
            answersArea: document.getElementById('answers-area'),
            equationArea: document.getElementById('equation-area'),
            submitBtn: document.getElementById('btn-submit-problem')
        };
        this.duelMode = false;
        this.problemMode = false;
        this.problemType = '';
        this.duelPlayers = [];
        this.currentDuelIdx = 0;
        this.duelScores = {};

        // Track solved problems to avoid repetition
        this.solvedProblemsInSession = new Set();
        this.currentProblem = null;
    }

    /**
     * Activa/desactiva UI de modo problemas
     * @param {boolean} enabled
     */
    toggleProblemUI(enabled) {
        // Refresh references in case DOM changed
        const answersArea = document.getElementById('answers-area');
        const equationArea = document.getElementById('equation-area');
        const submitBtn = document.getElementById('btn-submit-problem');

        if (!answersArea || !equationArea || !submitBtn) return;

        if (enabled) {
            answersArea.classList.add('hidden');
            equationArea.classList.remove('hidden');
            equationArea.style.display = 'block';
            submitBtn.classList.remove('hidden');
            submitBtn.style.display = 'block';
        } else {
            answersArea.classList.remove('hidden');
            equationArea.classList.add('hidden');
            equationArea.style.display = 'none';
            submitBtn.classList.add('hidden');
            submitBtn.style.display = 'none';
        }
    }

    /**
     * Gets translation helper
     */
    t(key) {
        return this.translationManager.t(key);
    }

    /**
     * Starts a single-player game
     * @param {Object} [checkboxes] - Optional { sum, res, mul } checkbox states. If null, reads from DOM.
     * @returns {boolean} Success status
     */
    startSingleGame(checkboxes = null) {
        this.duelMode = false;
        this.problemMode = false;

        const user = this.userManager.getCurrentUser();
        if (!user) return false;

        // If no config provided, read from DOM (Encapsulation of UI logic requested)
        if (!checkboxes) {
            checkboxes = {
                sum: document.getElementById('cfg-sum')?.checked || false,
                res: document.getElementById('cfg-res')?.checked || false,
                mul: document.getElementById('cfg-mul')?.checked || false,
                div: document.getElementById('cfg-div')?.checked || false
            };
        }

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
     * Muestra animación de delta de tiempo (+x / -x)
     * @param {string} text - Texto a mostrar
     * @param {string} tone - Tono del mensaje ('positive', 'negative', 'neutral')
     */
    showTimeEffect(text, tone) {
        const el = document.getElementById('game-timer-delta');
        if (!el) return;

        el.textContent = text;
        el.classList.remove('positive', 'negative', 'neutral', 'show');
        if (tone) {
            el.classList.add(tone);
        }

        requestAnimationFrame(() => {
            el.classList.add('show');
        });

        clearTimeout(this.effectTimer);
        this.effectTimer = setTimeout(() => {
            el.classList.remove('show');
            el.textContent = '';
        }, 1000);
    }

    /**
     * Helper para mostrar cambios de tiempo
     * @param {number} delta - Cambio en el tiempo
     */
    showTimeDelta(delta) {
        if (!delta) return;
        const sign = delta > 0 ? '+' : '';
        this.showTimeEffect(`${sign}${delta}`, delta > 0 ? 'positive' : 'negative');
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
        this.sessionEnded = false;
        this.gameLevel = lvl;
        this.gameCoins = coins;
        this.timeLeft = this.problemMode ? 60 : 30;

        // Reset solved problems tracking for new session
        this.resetSolvedProblems();

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
            // Don't generate generic problem for numbers_game, it handles its own generation
            if (this.problemType !== 'numbers_game') {
                this.generateProblem();
            }
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
        // Track special times for secret achievements
        if (this.achievementManager) {
            const user = this.userManager.getCurrentUser();
            if (user) {
                const now = new Date();
                const hour = now.getHours();
                const minute = now.getMinutes();
                const day = now.getDay(); // 0 = Sunday, 1 = Monday

                // Track midnight plays (00:00-00:59)
                if (hour === 0) {
                    user.achievementStats = user.achievementStats || {};
                    user.achievementStats.midnightPlays = (user.achievementStats.midnightPlays || 0) + 1;
                }

                // Track Monday 8 AM plays (08:00-08:59)
                if (day === 1 && hour === 8) {
                    user.achievementStats = user.achievementStats || {};
                    user.achievementStats.mondayMorningPlays = (user.achievementStats.mondayMorningPlays || 0) + 1;
                }

                // Check for secret achievements
                const newAchievements = this.achievementManager.checkAchievements(user);
                if (newAchievements && newAchievements.length > 0) {
                    newAchievements.forEach(achievement => {
                        if (achievement.secret) {
                            this.achievementManager.showAchievementNotification(achievement);
                        }
                    });
                }
            }
        }

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
                return;
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
            this.showTimeDelta(2); // Show +2s effect

            if (this.dailyChallengeManager) {
                const user = this.userManager.getCurrentUser();
                this.dailyChallengeManager.updateProgress(user, 'correct_answer', 1);
                this.dailyChallengeManager.updateProgress(user, 'coins_earned', 10);
            }

            // Online Sync
            if (this.onlineMode && this.sendOnlineAction) {
                this.sendOnlineAction('score_update', { score: this.gameCoins });

                // Race Mode Check
                if (this.onlineGameType === 'race') {
                    const currentWins = this.gameCoins / 10; // Assuming 10 coins per win
                    if (currentWins >= this.targetWins) {
                        this.sendOnlineAction('game_over', { result: 'won' });
                        this.handleOnlineGameOver('lost'); // Opponent lost (I won)
                        return;
                    }
                }
            }

            // Track achievement stats
            const user = this.userManager.getCurrentUser();
            if (user && this.achievementManager) {
                // Update streak tracking
                user.achievementStats = user.achievementStats || {};
                user.achievementStats.totalAnswered = (user.achievementStats.totalAnswered || 0) + 1;
                user.achievementStats.correctAnswers = (user.achievementStats.correctAnswers || 0) + 1;
                user.achievementStats.streak = (user.achievementStats.streak || 0) + 1;
                user.achievementStats.coins = this.gameCoins;
                user.achievementStats.level = this.gameLevel;

                // Check for new achievements
                const newAchievements = this.achievementManager.checkAchievements(user);
                if (newAchievements && newAchievements.length > 0) {
                    newAchievements.forEach(achievement => {
                        this.achievementManager.showAchievementNotification(achievement);
                    });
                    this.userManager.saveToStorage();
                }
            }

            try {
                confetti({ particleCount: 30, spread: 50 });
            } catch (e) {
                // Confetti not loaded
            }

            const expectedLevel = Math.floor(this.gameCoins / 50) + 1;
            if (expectedLevel > this.gameLevel) {
                this.gameLevel = expectedLevel;
                if (user && this.achievementManager) {
                    user.achievementStats.level = this.gameLevel;
                }
            }

            this.generateQuestion();
        } else {
            // Wrong answer - reset streak
            const user = this.userManager.getCurrentUser();
            if (user && this.achievementManager) {
                user.achievementStats = user.achievementStats || {};
                user.achievementStats.totalAnswered = (user.achievementStats.totalAnswered || 0) + 1;
                // Reset streak on wrong answer
                user.achievementStats.streak = 0;

                // Check achievements after resetting streak (some achievements may depend on losing streak)
                const newAchievements = this.achievementManager.checkAchievements(user);
                if (newAchievements && newAchievements.length > 0) {
                    newAchievements.forEach(achievement => {
                        this.achievementManager.showAchievementNotification(achievement);
                    });
                    this.userManager.saveToStorage();
                }
            }

            // Check for shield
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
     * Valida respuesta del problema
     */
    submitProblem() {
        if (!this.currentProblem) return;

        const tipoRespuesta = this.currentProblem.tipoRespuesta || 'numero';
        let isCorrect = false;

        const t = (key) => this.translationManager.t(key);

        if (tipoRespuesta === 'numero') {
            // Validación para respuestas numéricas
            const equationArea = document.getElementById('equation-area');
            const inputs = Array.from(equationArea.querySelectorAll('input.eq-input'));
            const values = inputs.map(i => i.value.trim());

            if (values.some(v => v === '')) {
                alert(t('alert_fill_equation'));
                return;
            }

            const parsed = values.map(v => Number(v));
            const expected = this.currentProblem.ecuacionValores || [];
            isCorrect = parsed.length === expected.length && parsed.every((v, i) => v === expected[i]);

        } else if (tipoRespuesta === 'opcion_multiple') {
            // Validación para opciones múltiples
            if (!window.selectedChoice) {
                alert(this.t('alert_select_option'));
                return;
            }
            isCorrect = window.selectedChoice === this.currentProblem.respuestaCorrecta;

        } else if (tipoRespuesta === 'texto') {
            // Validación para entrada de texto
            const input = document.getElementById('text-answer-input');
            if (!input || input.value.trim() === '') {
                alert(this.t('alert_write_answer'));
                return;
            }
            let userAnswer = input.value.trim();
            let correctAnswer = String(this.currentProblem.respuestaCorrecta);

            if (this.currentProblem.caseSensitive === false) {
                userAnswer = userAnswer.toLowerCase();
                correctAnswer = correctAnswer.toLowerCase();
            }

            isCorrect = userAnswer === correctAnswer;
        } else if (tipoRespuesta === 'numbers_game') {
            // Validación para Cifras (Numbers Game)
            const input = document.getElementById('numbers-game-input');
            if (!input || input.value.trim() === '') {
                this.showFeedbackMessage(this.t('alert_write_operation'));
                return;
            }

            // Need access to numbersGameManager? It's global in app.js.
            // GameEngine doesn't seem to have valid reference to numbersGameManager explicitly passed.
            // BUT GameEngine runs in browser scope where `numbersGameManager` is global (window.numbersGameManager).
            // We can access it via global or pass it.
            // Best practice: access via global for now since app structure relies on globals, or rely on dependency injection if we want to be pure.
            // GameEngine constructor didn't take numbersGameManager.
            // I'll assume global access for now to match current architecture.

            const numbersManager = window.numbersGameManager;

            const expression = input.value.trim();
            const result = numbersManager.checkSolution(this.currentProblem.target, this.currentProblem.numbers, expression);

            if (result.valid && result.exact) {
                isCorrect = true;
            } else {
                isCorrect = false;
                let reason = result.reason || 'Incorrecto';
                if (result.valid && !result.exact) {
                    reason = `Resultado: ${result.value} (Objetivo: ${this.currentProblem.target})`;
                }
                this.showFeedbackMessage(reason);
            }

            // Track specific stats for Cifras
            const user = this.userManager.getCurrentUser();
            if (user && this.achievementManager) {
                user.achievementStats = user.achievementStats || {};

                if (isCorrect) {
                    user.achievementStats.exactSolutions = (user.achievementStats.exactSolutions || 0) + 1;
                    user.achievementStats.numbersGameStreak = (user.achievementStats.numbersGameStreak || 0) + 1;

                    // Chequear full house (usar todos los números)
                    const usedNumbers = expression.match(/\d+/g);
                    if (usedNumbers && usedNumbers.length === 6) {
                        user.achievementStats.fullHouseSolutions = (user.achievementStats.fullHouseSolutions || 0) + 1;
                        this.showTimeEffect('🃏 Full House!', 'positive');
                    }
                } else {
                    user.achievementStats.numbersGameStreak = 0;
                }
                this.userManager.saveToStorage();
            }
        }

        // Procesar resultado
        if (isCorrect) {
            console.log('[GameEngine] Answer is CORRECT. Starting post-correct logic.');
            try {
                // Marcar problema como resuelto para evitar repetición
                if (this.currentProblem.id) {
                    this.markProblemAsSolved(this.currentProblem.id);
                }

                // Resetear selectedChoice para próximo problema
                window.selectedChoice = null;

                // Actualizar GameEngine
                this.gameCoins += 30;
                this.timeLeft += 10;
                this.showTimeDelta(10);

                // Track achievement stats for problems
                const user = this.userManager.getCurrentUser();
                if (user && this.achievementManager) {
                    console.log('[GameEngine] Updating achievement stats...');
                    user.achievementStats = user.achievementStats || {};
                    user.achievementStats.problemsSolved = (user.achievementStats.problemsSolved || 0) + 1;
                    user.achievementStats.coins = this.gameCoins;
                    user.achievementStats.level = this.gameLevel;

                    // Check for new achievements
                    const newAchievements = this.achievementManager.checkAchievements(user);
                    if (newAchievements && newAchievements.length > 0) {
                        newAchievements.forEach(achievement => {
                            this.achievementManager.showAchievementNotification(achievement);
                        });
                        this.userManager.saveToStorage();
                    }
                }

                if (this.dailyChallengeManager) {
                    console.log('[GameEngine] Updating daily challenges...');
                    const user = this.userManager.getCurrentUser();
                    this.dailyChallengeManager.updateProgress(user, 'problem_solved', 1);
                    this.dailyChallengeManager.updateProgress(user, 'coins_earned', 30);
                }

                try {
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 30, spread: 50 });
                    }
                } catch (e) {
                    // Confetti library not loaded
                }

                const expectedLevel = Math.floor(this.gameCoins / 50) + 1;
                if (expectedLevel > this.gameLevel) {
                    this.gameLevel = expectedLevel;
                }

                this.updateGameDisplay();

                // Call generateProblemFn from constructor properties
                if (this.generateProblem) {
                    console.log('[GameEngine] Triggering next problem generation...');
                    this.generateProblem();
                }
            } catch (error) {
                console.error('[GameEngine] CRITICAL ERROR in post-correct logic:', error);
                // Fallback: try to generate next problem anyway if possible, or just log
                if (this.generateProblem) this.generateProblem();
            }
        }
        else {
            const user = this.userManager.getCurrentUser();
            this.userManager.initInventory(user);
            if (user.inventory.shields > 0) {
                user.inventory.shields--;
                this.userManager.saveToStorage();
                this.updatePowerUpDisplay();
                this.showFeedbackMessage(t('alert_shield_used'));
                this.showTimeEffect('🛡️', 'neutral');
                return;
            }

            const appContainer = document.getElementById('app-container');
            if (appContainer) {
                appContainer.classList.add('shake');
                setTimeout(() => appContainer.classList.remove('shake'), 400);
            }

            // Actualizar GameEngine
            this.timeLeft -= 4;
            this.showTimeDelta(-4);

            this.updateGameDisplay();

            if (this.currentProblem.explicacion) {
                this.showFeedbackMessage(this.currentProblem.explicacion);
            }
        }
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
     * @param {boolean} forceEnd - Force end without checks (used by online logic)
     */
    endGameSession(forceEnd = false) {
        if (this.sessionEnded) return;
        this.sessionEnded = true;

        clearInterval(this.timerInterval);

        if (this.onlineMode) {
            if (!forceEnd && this.sendOnlineAction) {
                // If we ended naturally (timeout) in online mode -> We lost!
                this.sendOnlineAction('game_over', { result: 'timeout' });
                alert('😢 ¡Se acabó el tiempo! Perdiste.');
                if (this.onOnlineGameOver) this.onOnlineGameOver();
            }
            // If forced end, it was handled by receiveRemoteAction
            return;
        }

        if (this.duelMode) {
            // Duel mode ending
            const currentUser = this.duelPlayers[this.currentDuelIdx];
            this.duelScores[currentUser] = this.gameCoins;
            this.currentDuelIdx++;

            if (this.currentDuelIdx < this.duelPlayers.length) {
                this.startNextDuelTurn();
            } else {
                // Determine winner and track achievement stats
                const winner = Object.entries(this.duelScores)
                    .reduce((prev, current) => (prev[1] > current[1]) ? prev : current)[0];

                // Track duel win for achievements
                const winnerUser = this.userManager.getUsers()[winner];
                if (winnerUser && this.achievementManager) {
                    winnerUser.achievementStats = winnerUser.achievementStats || {};
                    winnerUser.achievementStats.duelsWon = (winnerUser.achievementStats.duelsWon || 0) + 1;
                    winnerUser.achievementStats.duelStreakMax = (winnerUser.achievementStats.duelStreakMax || 0) + 1;

                    // Check for new duel-related achievements
                    const newAchievements = this.achievementManager.checkAchievements(winnerUser);
                    if (newAchievements && newAchievements.length > 0) {
                        newAchievements.forEach(achievement => {
                            this.achievementManager.showAchievementNotification(achievement);
                        });
                        this.userManager.saveToStorage();
                    }
                }

                if (winnerUser && this.dailyChallengeManager) {
                    this.dailyChallengeManager.updateProgress(winnerUser, 'duel_won', 1);
                    this.userManager.saveToStorage();
                }

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

            if (!user) {
                // Guard: no debería ocurrir, pero registramos el error y salimos limpiamente
                console.error('[GameEngine] endGameSession: currentUser es null. Los puntos no se pueden guardar. gameCoins:', this.gameCoins);
                alert(this.t('alert_good_job') + this.gameCoins + this.t('alert_coins'));
                this.showUsers();
                return;
            }

            user.totalCoins += this.gameCoins;
            user.level = Math.max(user.level || 1, this.gameLevel);

            // Track achievement stats for single-player
            if (this.achievementManager) {
                user.achievementStats = user.achievementStats || {};
                user.achievementStats.coins = user.totalCoins;
                user.achievementStats.level = user.level;
                user.achievementStats.totalCoinsEarned = (user.achievementStats.totalCoinsEarned || 0) + this.gameCoins;

                const newAchievements = this.achievementManager.checkAchievements(user);
                if (newAchievements && newAchievements.length > 0) {
                    newAchievements.forEach(achievement => {
                        this.achievementManager.showAchievementNotification(achievement);
                    });
                }
            }

            this.userManager.saveToStorage();

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

    /**
     * Marks a problem as solved in current session
     * @param {string} problemId - ID of the solved problem
     */
    markProblemAsSolved(problemId) {
        this.solvedProblemsInSession.add(problemId);
    }

    /**
     * Gets the set of solved problems in current session
     * @returns {Set<string>} Set of solved problem IDs
     */
    getSolvedProblems() {
        return this.solvedProblemsInSession;
    }

    /**
     * Resets solved problems tracking (when starting new game)
     */
    resetSolvedProblems() {
        this.solvedProblemsInSession.clear();
    }

    // ==========================================
    // Online Duel Implementation
    // ==========================================

    /**
     * Sets callbacks for online interaction
     */
    setOnlineCallbacks(sendActionFn, onGameOverFn) {
        this.sendOnlineAction = sendActionFn;
        this.onOnlineGameOver = onGameOverFn;
    }

    /**
     * Starts an online game session
     */
    startOnlineGameSession(config) {
        console.log('🎮 GameEngine: Starting online game session with config:', config);
        this.duelMode = true; // Use existing duel flag for UI purposes
        this.onlineMode = true; // New flag for logic distinction
        this.onlineGameType = config.type || 'time'; // 'time' (Survival) or 'race' (First to X)
        this.targetWins = config.targetWins || 10;

        // Reset state
        this.gameLevel = 1;
        this.gameCoins = 0;
        this.currentDuelIdx = 0; // Not used in online but kept for safety
        this.duelScores = {}; // We will store opponent score here

        // Use standard init
        this.initGameSession(1, 0);
    }

    /**
     * Handles incoming actions from remote player
     */
    receiveRemoteAction(action, payload) {
        if (!this.onlineMode) return;

        switch (action) {
            case 'score_update':
                // Update remote score display (could be added to UI)
                console.log('Opponent score:', payload.score);
                // Update duelScores for UI
                if (this.onOpponentScoreUpdate) {
                    this.onOpponentScoreUpdate(payload.score);
                }
                break;

            case 'power_up':
                if (payload.type === 'freeze') {
                    // Apply freeze to local player
                    this.applyFreezeEffect();
                }
                break;

            case 'game_over':
                // Opponent finished or lost
                this.handleOnlineGameOver(payload.result); // 'won', 'lost', 'timeout'
                break;
        }
    }

    /**
     * Applies freeze effect from opponent
     */
    applyFreezeEffect() {
        // reuse existing logic or implement new
        // For now, simpler version:
        const showTimeEffect = window.showTimeEffect;
        if (showTimeEffect) showTimeEffect('❄️ Opponent Froze You!', 'negative');

        // Pause for 3 seconds
        /* logic to pause input or timer */
    }

    /**
     * Handles end of online game
     */
    handleOnlineGameOver(remoteResult) {
        this.endGameSession(true); // Stop local game

        let message = '';
        if (remoteResult === 'won') {
            message = '❌ ¡Tu oponente ha ganado!';
        } else if (remoteResult === 'lost' || remoteResult === 'timeout') {
            message = '🏆 ¡Has ganado! Tu oponente perdió.';
        }

        alert(message);
        if (this.onOnlineGameOver) this.onOnlineGameOver();
    }

}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameEngine;
}
if (typeof window !== 'undefined') {
    window.GameEngine = GameEngine;
}
