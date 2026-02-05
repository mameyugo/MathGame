/**
 * MathQix - Lógica principal de la aplicación
 * Juego educativo de matemáticas multiidioma (ES/GL)
 */

// Importar managers (se deben cargar antes en el HTML)
const translationManager = new TranslationManager();
const achievementManager = new AchievementManager(translationManager);
const userManager = new UserManager(translationManager);
const storeManager = new StoreManager(userManager, translationManager);
const problemCategoryManager = new ProblemCategoryManager(translationManager);
const dailyChallengeManager = new DailyChallengeManager(translationManager);

// Variables globales
let currentLanguage = translationManager.getCurrentLanguage();
let users = userManager.getUsers();
let currentUser = userManager.getCurrentUserName();

// Store items (mantenido para compatibilidad)
const storeItems = storeManager.getStoreItems();

// GameEngine and QuestionGenerator will be initialized after functions are defined
let gameEngine = null;
let questionGenerator = null;

// Variables que serán gestionadas por managers (mantenerlas para sincronización)
let duelMode = false;
let duelPlayers = [];
let duelScores = {};
let currentDuelIdx = 0;
let gameCoins = 0, gameLevel = 1, timeLeft = 30, timerInterval = null, currentAnswer = 0;
let freezeTimeout = null;
let problemMode = false;
let problemType = 'matematico';
let currentProblem = null;

/**
 * Initialize user inventory if it doesn't exist
 * @param {Object} user - User object
 */
/**
 * Obtiene el texto traducido según el idioma actual
 * @param {string} key - Clave de traducción
 * @returns {string} Texto traducido
 */
function t(key) {
    return translationManager.t(key);
}

/**
 * Cambia el idioma de la aplicación
 * @param {string} lang - Código de idioma (es/gl)
 */
async function changeLanguage(lang) {
    await translationManager.changeLanguage(lang);
    currentLanguage = translationManager.getCurrentLanguage();

    // Actualizar estilos de botones de idioma
    document.getElementById('btn-lang-es').style.borderColor = lang === 'es' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-es').style.background = lang === 'es' ? '#f0f7ff' : 'white';
    document.getElementById('btn-lang-gl').style.borderColor = lang === 'gl' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-gl').style.background = lang === 'gl' ? '#f0f7ff' : 'white';

    // Actualizar título de configuración si hay usuario seleccionado
    if (currentUser) {
        document.getElementById('config-title').innerText = t('config_title_user') + currentUser;
    }

    // Actualizar leaderboard si está visible
    if (document.getElementById('screen-users').classList.contains('active')) {
        userManager.renderLeaderboard();
    }
}

// Wrapper functions para mantener compatibilidad con HTML onclick handlers
function showUsers() {
    userManager.showUsers();
}

function renderUserList() {
    userManager.renderUserList();
}

function renderLeaderboard() {
    userManager.renderLeaderboard();
}

function createUser() {
    userManager.createUser();
}

function selectUser(name) {
    userManager.selectUser(name);
    currentUser = userManager.getCurrentUserName();
    users = userManager.getUsers();

    // Renderizar las tarjetas de categorías de problemas inmediatamente
    console.log('selectUser: about to render categories');
    renderProblemCategories();
    console.log('selectUser: categories rendered');
}

function showEditName() {
    userManager.showEditName();
}

function cancelEditName() {
    userManager.cancelEditName();
}

function saveUserName() {
    userManager.saveUserName();
    currentUser = userManager.getCurrentUserName();
    users = userManager.getUsers();
}

function initInventory(user) {
    userManager.initInventory(user);
}

function updateRecordDisplay() {
    userManager.updateRecordDisplay(gameLevel);
}

function normalizeUsers() {
    userManager.normalizeUsers();
    users = userManager.getUsers();
}

function syncStateFromStorage() {
    userManager.syncStateFromStorage();
    users = userManager.getUsers();
    currentUser = userManager.getCurrentUserName();
    currentLanguage = localStorage.getItem('math_lang') || 'es';
}


/**
 * Inicia una partida individual
 */
function startSingleGame() {
    const checkboxes = {
        sum: document.getElementById('cfg-sum').checked,
        res: document.getElementById('cfg-res').checked,
        mul: document.getElementById('cfg-mul').checked,
        div: document.getElementById('cfg-div').checked
    };
    gameEngine.startSingleGame(checkboxes);

    // Sincronizar estado global después de iniciar
    users = userManager.getUsers();
    gameLevel = gameEngine.gameLevel;
    gameCoins = gameEngine.gameCoins;
    timeLeft = gameEngine.timeLeft;
    problemMode = gameEngine.problemMode;
}

/**
 * Inicia una partida de problemas
 * @param {string} type - 'logica' o 'matematico'
 */
function startProblemGame(type) {
    // Reset problem session to establish new problem pool
    questionGenerator.resetProblemSession();

    // Validar que hay categorías seleccionadas
    const selectedCategories = userManager.getProblemCategories();
    if (!problemCategoryManager.hasValidSelection(selectedCategories)) {
        alert(t('no_problems_selected'));
        return;
    }

    problemType = type;
    gameEngine.problemType = type;
    gameEngine.startProblemGame(type);

    // Sincronizar estado global después de iniciar
    gameLevel = gameEngine.gameLevel;
    gameCoins = gameEngine.gameCoins;
    timeLeft = gameEngine.timeLeft;
    problemMode = gameEngine.problemMode;
}

/**
 * Configura el modo duelo
 */
function setupDuel() {
    gameEngine.setupDuel();
    // Sincronizar estado global
    currentUser = userManager.getCurrentUserName();
}

/**
 * Inicia el siguiente turno en modo duelo
 */
function startNextDuelTurn() {
    gameEngine.startNextDuelTurn();
    // Sincronizar estado global
    currentUser = userManager.getCurrentUserName();
}

/**
 * Inicializa una sesión de juego
 * @param {number} lvl - Nivel inicial
 * @param {number} coins - Monedas iniciales
 */
function initGameSession(lvl, coins) {
    gameEngine.initGameSession(lvl, coins);
    // Resetear tracking de problemas resueltos al iniciar nueva sesión
    gameEngine.resetSolvedProblems();
    // Sincronizar estado global
    gameLevel = gameEngine.gameLevel;
    gameCoins = gameEngine.gameCoins;
    timeLeft = gameEngine.timeLeft;
    problemMode = gameEngine.problemMode;
}

/**
 * Starts or restarts the game timer
 */
function startTimer() {
    gameEngine.startTimer();
    // Sincronizar estado global
    timerInterval = gameEngine.timerInterval;
}

/**
 * Activa/desactiva UI de modo problemas
 * @param {boolean} enabled
 */
function toggleProblemUI(enabled) {
    const answersArea = document.getElementById('answers-area');
    const equationArea = document.getElementById('equation-area');
    const submitBtn = document.getElementById('btn-submit-problem');

    if (!answersArea || !equationArea || !submitBtn) return;

    answersArea.style.display = enabled ? 'none' : 'grid';
    equationArea.style.display = enabled ? 'block' : 'none';
    submitBtn.style.display = enabled ? 'block' : 'none';
}

/**
 * Muestra animación de delta de tiempo (+x / -x)
 * @param {number} delta
 */
function showTimeEffect(text, tone) {
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

    clearTimeout(showTimeEffect._timer);
    showTimeEffect._timer = setTimeout(() => {
        el.classList.remove('show');
        el.textContent = '';
    }, 1000);
}

function showTimeDelta(delta) {
    if (!delta) return;
    const sign = delta > 0 ? '+' : '';
    showTimeEffect(`${sign}${delta}`, delta > 0 ? 'positive' : 'negative');
}

// Hacer disponible para GameEngine
if (typeof window !== 'undefined') {
    window.showTimeEffect = showTimeEffect;
}

// Inicializar GameEngine primero (sin QuestionGenerator todavía)
gameEngine = new GameEngine(
    userManager,
    translationManager,
    achievementManager,
    dailyChallengeManager,
    () => generateQuestion(),
    () => generateProblem(),
    (enabled) => toggleProblemUI(enabled),
    () => updatePowerUpDisplay(),
    () => applyTheme(),
    () => showUsers()
);

// Inicializar QuestionGenerator después, pasándole gameEngine para tracking
questionGenerator = new QuestionGenerator(userManager, problemCategoryManager, (val) => check(val), gameEngine);

// Wrapper functions para QuestionGenerator
function generateQuestion() {
    questionGenerator.setGameLevel(gameLevel);
    questionGenerator.generateQuestion();
    currentAnswer = questionGenerator.getCurrentAnswer();
    gameEngine.setCurrentAnswer(currentAnswer);
}

function renderVisual(num) {
    return questionGenerator.renderVisual(num);
}

function renderOptions() {
    questionGenerator.renderOptions();
}

function selectProblem() {
    questionGenerator.setProblemType(problemType);
    questionGenerator.setGameLevel(gameLevel);
    return questionGenerator.selectProblem();
}

function renderEquation(equation) {
    questionGenerator.renderEquation(equation);
}

function generateProblem() {
    questionGenerator.setProblemType(problemType);
    questionGenerator.setGameLevel(gameLevel);
    questionGenerator.generateProblem();
    currentProblem = questionGenerator.getCurrentProblem();
    
    // Si no hay problema (todos completados), finalizar la sesión
    if (!currentProblem) {
        endGameSession();
    }
}

/**
 * Valida respuesta del problema
 */
function submitProblem() {
    if (!currentProblem) return;

    const tipoRespuesta = currentProblem.tipoRespuesta || 'numero';
    let isCorrect = false;

    if (tipoRespuesta === 'numero') {
        // Validación para respuestas numéricas (comportamiento actual)
        const equationArea = document.getElementById('equation-area');
        const inputs = Array.from(equationArea.querySelectorAll('input.eq-input'));
        const values = inputs.map(i => i.value.trim());

        if (values.some(v => v === '')) {
            alert(t('alert_fill_equation'));
            return;
        }

        const parsed = values.map(v => Number(v));
        const expected = currentProblem.ecuacionValores || [];
        isCorrect = parsed.length === expected.length && parsed.every((v, i) => v === expected[i]);

    } else if (tipoRespuesta === 'opcion_multiple') {
        // Validación para opciones múltiples
        if (!window.selectedChoice) {
            alert('Por favor, selecciona una opción');
            return;
        }
        isCorrect = window.selectedChoice === currentProblem.respuestaCorrecta;

    } else if (tipoRespuesta === 'texto') {
        // Validación para entrada de texto
        const input = document.getElementById('text-answer-input');
        if (!input || input.value.trim() === '') {
            alert('Por favor, escribe tu respuesta');
            return;
        }
        let userAnswer = input.value.trim();
        let correctAnswer = String(currentProblem.respuestaCorrecta);

        if (currentProblem.caseSensitive === false) {
            userAnswer = userAnswer.toLowerCase();
            correctAnswer = correctAnswer.toLowerCase();
        }

        isCorrect = userAnswer === correctAnswer;
    }

    // Procesar resultado
    if (isCorrect) {
        // Marcar problema como resuelto para evitar repetición
        if (currentProblem.id) {
            gameEngine.markProblemAsSolved(currentProblem.id);
        }

        // Resetear selectedChoice para próximo problema
        window.selectedChoice = null;

        // Actualizar GameEngine
        gameEngine.gameCoins += 30;
        gameEngine.timeLeft += 10;
        showTimeDelta(10);

        // Track achievement stats for problems
        const user = userManager.getCurrentUser();
        if (user && achievementManager) {
            user.achievementStats = user.achievementStats || {};
            user.achievementStats.problemsSolved = (user.achievementStats.problemsSolved || 0) + 1;
            user.achievementStats.coins = gameEngine.gameCoins;
            user.achievementStats.level = gameEngine.gameLevel;

            // Check for new achievements
            const newAchievements = achievementManager.checkAchievements(user);
            if (newAchievements && newAchievements.length > 0) {
                newAchievements.forEach(achievement => {
                    achievementManager.showAchievementNotification(achievement);
                });
                userManager.saveToStorage();
            }
        }

        updateDailyChallengeProgress('problem_solved', 1);
        updateDailyChallengeProgress('coins_earned', 30);

        try {
            confetti({ particleCount: 30, spread: 50 });
        } catch (e) {
            // Confetti library not loaded
        }

        if (gameEngine.gameCoins % 50 === 0) {
            gameEngine.gameLevel++;
        }

        // Sincronizar variables locales
        gameCoins = gameEngine.gameCoins;
        gameLevel = gameEngine.gameLevel;
        timeLeft = gameEngine.timeLeft;

        document.getElementById('game-level').innerText = gameLevel;
        document.getElementById('game-coins').innerText = gameCoins;
        document.getElementById('game-timer').innerText = timeLeft + 's';

        updateRecordDisplay();
        generateProblem();
    } else {
        initInventory(users[currentUser]);
        if (users[currentUser].inventory.shields > 0) {
            users[currentUser].inventory.shields--;
            localStorage.setItem('math_users', JSON.stringify(users));
            updatePowerUpDisplay();
            showFeedbackMessage(t('alert_shield_used'));
            showTimeEffect('🛡️', 'neutral');
            return;
        }

        document.getElementById('app-container').classList.add('shake');
        setTimeout(() => document.getElementById('app-container').classList.remove('shake'), 400);

        // Actualizar GameEngine
        gameEngine.timeLeft -= 4;
        showTimeDelta(-4);
        timeLeft = gameEngine.timeLeft;
        document.getElementById('game-timer').innerText = timeLeft + 's';

        if (currentProblem.explicacion) {
            showFeedbackMessage(currentProblem.explicacion);
        }
    }
}

/**
 * Verifica si la respuesta seleccionada es correcta
 * @param {number} val - Valor seleccionado por el usuario
 */
function check(val) {
    // Sincronizar currentAnswer con gameEngine
    const prevTime = gameEngine.timeLeft;
    const isCorrect = val === currentAnswer;
    gameEngine.currentAnswer = currentAnswer;
    gameEngine.check(val);
    const delta = gameEngine.timeLeft - prevTime;
    showTimeDelta(delta);

    if (isCorrect) {
        updateDailyChallengeProgress('correct_answer', 1);
        updateDailyChallengeProgress('coins_earned', 10);
    }

    // Sincronizar estado global de vuelta
    gameCoins = gameEngine.gameCoins;
    gameLevel = gameEngine.gameLevel;
    timeLeft = gameEngine.timeLeft;
    users = userManager.getUsers();
}

/**
 * Finaliza la sesión de juego actual
 */
function endGameSession() {
    gameEngine.endGameSession();
    // Sincronizar estado global
    users = userManager.getUsers();
    currentUser = userManager.getCurrentUserName();
}

/**
 * Opens the store modal
 */
// Wrapper functions para mantener compatibilidad con HTML onclick handlers
function openStore() {
    storeManager.openStore();
}

function closeStore() {
    storeManager.closeStore();
}

function renderStore() {
    storeManager.renderStore();
}

function buyItem(itemId) {
    const purchased = storeManager.buyItem(itemId);
    if (purchased) {
        const user = userManager.getCurrentUser();
        if (user && achievementManager) {
            user.achievementStats = user.achievementStats || {};
            user.achievementStats.itemsBought = (user.achievementStats.itemsBought || 0) + 1;
            user.achievementStats.totalCoinsSpent = (user.achievementStats.totalCoinsSpent || 0) + 1;
            user.achievementStats.coins = user.totalCoins;

            const newAchievements = achievementManager.checkAchievements(user);
            if (newAchievements && newAchievements.length > 0) {
                newAchievements.forEach(achievement => {
                    achievementManager.showAchievementNotification(achievement);
                });
            }
        }

        updateDailyChallengeProgress('item_bought', 1);
    }
    users = userManager.getUsers();
}

function equipTheme(themeId) {
    storeManager.equipTheme(themeId);
    users = userManager.getUsers();
}

function unequipTheme() {
    storeManager.unequipTheme();
    users = userManager.getUsers();
}

function usePotion() {
    const timerElement = document.getElementById('game-timer');
    const initialTime = gameEngine.timeLeft;

    const gameState = {
        timeLeft: gameEngine.timeLeft,
        timerElement: timerElement,
        updateDisplay: updatePowerUpDisplay
    };

    const used = storeManager.usePotion(gameState);
    if (used) {
        gameEngine.timeLeft = gameState.timeLeft;
        timeLeft = gameEngine.timeLeft;
        showTimeDelta(timeLeft - initialTime);
    }
    users = userManager.getUsers();
}

function useFreezeTime() {
    const newState = storeManager.useFreezeTime({
        timerInterval: timerInterval,
        freezeTimeout: freezeTimeout,
        startTimer: startTimer
    });
    timerInterval = newState.timerInterval;
    freezeTimeout = newState.freezeTimeout;
    gameEngine.timerInterval = newState.timerInterval;
    gameEngine.freezeTimeout = newState.freezeTimeout;
    if (newState.used) {
        showTimeEffect('❄️', 'neutral');
    }
    users = userManager.getUsers();
}

function updatePowerUpDisplay() {
    storeManager.updatePowerUpDisplay();
}

function applyTheme() {
    storeManager.applyTheme();
}

/**
 * Shows a feedback message on screen
 * @param {string} message - Message to display
 */
function showFeedbackMessage(message) {
    storeManager.showFeedbackMessage(message);
}

/**
 * Inicializa la aplicación cargando traducciones y configurando el idioma
 */
async function initApp() {
    // Cargar traducciones del idioma actual
    await translationManager.loadTranslations(currentLanguage);

    // Inicializar idioma
    await changeLanguage(currentLanguage);

    // Migrar/normalizar estructura antigua de usuarios
    normalizeUsers();

    showUsers();
}

/**
 * Renderiza las tarjetas de categorías de problemas en la configuración del usuario
 */
function renderProblemCategories() {
    console.log('=== renderProblemCategories called ===');

    const container = document.getElementById('problem-categories-area');
    console.log('Container element:', container);

    if (!container) {
        console.error('ERROR: problem-categories-area not found in DOM!');
        return;
    }

    const selectedCategories = userManager.getProblemCategories();
    console.log('Selected categories from user:', selectedCategories);

    problemCategoryManager.renderCategoryCards(
        'problem-categories-area',
        selectedCategories,
        (categoryId) => {
            console.log('Category toggled:', categoryId);
            // Callback cuando se hace clic en una categoría
            userManager.toggleProblemCategory(categoryId);
            // Re-renderizar para actualizar visualización
            renderProblemCategories();
        }
    );
}

// Sincronizar estado cuando el usuario vuelve a la página (después de presionar atrás)
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // La página fue restaurada del bfcache (back/forward cache)
        syncStateFromStorage();
        // Re-renderizar la UI
        if (currentUser) {
            selectUser(currentUser);
        } else {
            showUsers();
        }
    }
});

// Guardar estado antes de descargar la página
window.addEventListener('beforeunload', function () {
    localStorage.setItem('math_users', JSON.stringify(users));
    localStorage.setItem('math_lang', currentLanguage);
});

/**
 * Abre el modal de logros
 */
function openAchievements() {
    const user = userManager.getCurrentUser();
    if (!user) return;

    // Inicializar logros si no existen
    achievementManager.initAchievements(user);

    const modal = document.getElementById('achievements-modal');
    modal.classList.add('active');

    renderAchievements();
}

/**
 * Cierra el modal de logros
 */
function closeAchievements() {
    const modal = document.getElementById('achievements-modal');
    modal.classList.remove('active');
}

/**
 * Renderiza los logros del usuario
 */
function renderAchievements() {
    const user = userManager.getCurrentUser();
    if (!user) return;

    const content = document.getElementById('achievements-content');
    const progress = achievementManager.getTotalProgress(user);
    const categoryProgress = achievementManager.getProgressByCategory(user);
    const achievements = achievementManager.getUserAchievements(user, false);
    const dailyChallenges = dailyChallengeManager.getDailyChallenges(user);

    // Resumen general
    let html = `
        <div class="achievements-summary">
            <div class="summary-title">Progreso Total</div>
            <div class="summary-stats">
                <div class="summary-stat">
                    <span class="stat-value">${progress.unlocked}</span>
                    <span class="stat-label">Desbloqueados</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${progress.total}</span>
                    <span class="stat-label">Total</span>
                </div>
                <div class="summary-stat">
                    <span class="stat-value">${progress.percentage}%</span>
                    <span class="stat-label">Completado</span>
                </div>
            </div>
        </div>
    `;

    // Desafíos diarios
    html += `
        <div class="daily-challenges">
            <div class="daily-challenges-header">
                <div class="daily-challenges-title">${t('daily_challenges_title')}</div>
            </div>
            <div class="daily-challenges-list">
    `;

    dailyChallenges.forEach(challenge => {
        const progressPercent = Math.round((challenge.progress / challenge.target) * 100);
        const text = dailyChallengeManager.formatChallengeText(challenge);
        const isClaimable = challenge.completed && !challenge.claimed;
        const buttonLabel = challenge.claimed
            ? t('daily_challenge_claimed')
            : (isClaimable ? t('daily_challenge_claim') : t('daily_challenge_progress'));

        html += `
            <div class="daily-challenge-card ${challenge.completed ? 'completed' : ''}">
                <div class="daily-challenge-info">
                    <div class="daily-challenge-name">${text.name}</div>
                    <div class="daily-challenge-desc">${text.description}</div>
                    <div class="daily-challenge-reward">${t('daily_challenge_reward')} +${challenge.reward}</div>
                    <div class="daily-challenge-progress">
                        <div class="daily-challenge-bar">
                            <div class="daily-challenge-fill" style="width: ${progressPercent}%"></div>
                        </div>
                        <div class="daily-challenge-percent">${progressPercent}%</div>
                    </div>
                </div>
                <button class="daily-challenge-claim" onclick="claimDailyChallenge('${challenge.id}')" ${isClaimable ? '' : 'disabled'}>
                    ${buttonLabel}
                </button>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    // Agrupar logros por categoría
    const categories = {
        progress: [],
        logic: [],
        mastery: [],
        economy: [],
        social: [],
        secret: []
    };

    achievements.forEach(achievement => {
        categories[achievement.category].push(achievement);
    });

    // Filtros por categoría
    html += `
        <div class="achievement-filters">
            <button class="achievement-filter active" data-filter="all">Todas</button>
            <button class="achievement-filter" data-filter="progress">Progreso</button>
            <button class="achievement-filter" data-filter="logic">Lógica</button>
            <button class="achievement-filter" data-filter="mastery">Maestría</button>
            <button class="achievement-filter" data-filter="economy">Economía</button>
            <button class="achievement-filter" data-filter="social">Social</button>
            <button class="achievement-filter" data-filter="secret">Secretos</button>
        </div>
    `;

    // Renderizar cada categoría
    Object.entries(categoryProgress).forEach(([categoryKey, categoryData]) => {
        if (categories[categoryKey].length === 0) return;

        const progressPercentage = (categoryData.unlocked / categoryData.total) * 100;

        html += `
            <div class="achievement-category" data-category="${categoryKey}">
                <div class="category-header">
                    <div>
                        <div class="category-title">${categoryData.name}</div>
                        <div class="category-progress">${categoryData.unlocked}/${categoryData.total} · ${Math.round(progressPercentage)}%</div>
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-background">
                        <div class="progress-bar-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="progress-bar-text">${Math.round(progressPercentage)}%</div>
                </div>
                <div class="achievements-grid">
        `;

        categories[categoryKey].forEach(achievement => {
            const unlockedClass = achievement.unlocked ? 'unlocked' : 'locked';
            const dateText = achievement.unlocked && achievement.unlockedAt
                ? `<div class="achievement-card-date">Desbloqueado: ${new Date(achievement.unlockedAt).toLocaleDateString()}</div>`
                : '';

            if (achievement.secret && !achievement.unlocked) {
                html += `
                    <div class="achievement-card locked">
                        <div class="achievement-secret">❓</div>
                        <div class="achievement-card-name">Logro Secreto</div>
                        <div class="achievement-card-description">???</div>
                    </div>
                `;
            } else {
                // Calcular progreso para logros bloqueados
                let progressHTML = '';
                if (!achievement.unlocked) {
                    const progress = achievementManager.getAchievementProgress(achievement, user);
                    if (progress.percentage > 0 && progress.percentage < 100) {
                        progressHTML = `
                            <div class="achievement-progress-container">
                                <div class="achievement-progress-bar">
                                    <div class="achievement-progress-fill" style="width: ${progress.percentage}%"></div>
                                </div>
                                <div class="achievement-progress-text">${progress.hint}</div>
                            </div>
                        `;
                    }
                }

                html += `
                    <div class="achievement-card ${unlockedClass}">
                        <div class="achievement-card-icon">${achievement.icon}</div>
                        <div class="achievement-card-name">${achievement.name}</div>
                        <div class="achievement-card-description">${achievement.description}</div>
                        ${progressHTML}
                        ${dateText}
                    </div>
                `;
            }
        });

        html += `
                </div>
            </div>
        `;
    });

    content.innerHTML = html;

    // Activar filtros
    const filterButtons = content.querySelectorAll('.achievement-filter');
    const categoryBlocks = content.querySelectorAll('.achievement-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            categoryBlocks.forEach(block => {
                const category = block.getAttribute('data-category');
                block.style.display = (filter === 'all' || filter === category) ? 'block' : 'none';
            });
        });
    });
}

function updateDailyChallengeProgress(type, amount) {
    const user = userManager.getCurrentUser();
    if (!user) return;

    dailyChallengeManager.updateProgress(user, type, amount);
    userManager.saveToStorage();
}

function claimDailyChallenge(challengeId) {
    const user = userManager.getCurrentUser();
    if (!user) return;

    const claimed = dailyChallengeManager.claimReward(user, challengeId);
    if (claimed) {
        userManager.saveToStorage();
        renderAchievements();
        users = userManager.getUsers();
    }
}

/**
 * Verifica y muestra notificaciones de logros desbloqueados
 */
function checkAndNotifyAchievements() {
    const user = userManager.getCurrentUser();
    if (!user) return;

    const unlockedAchievements = achievementManager.checkAchievements(user);

    // Mostrar notificaciones para nuevos logros
    unlockedAchievements.forEach((achievement, index) => {
        setTimeout(() => {
            achievementManager.showAchievementNotification(achievement);
        }, index * 500); // Retrasar cada notificación 500ms
    });

    if (unlockedAchievements.length > 0) {
        userManager.saveToStorage();
    }
}

// Inicializar la aplicación (evitar auto-init en tests)
if (typeof window !== 'undefined' && !window.__TEST__) {
    initApp();
}

// Exponer managers para tests
if (typeof window !== 'undefined') {
    window.__appManagers = window.__appManagers || {};
    window.__appManagers.userManager = userManager;
    window.__appManagers.achievementManager = achievementManager;
    window.__appManagers.dailyChallengeManager = dailyChallengeManager;
}
