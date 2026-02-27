/**
 * MathQix - Lógica principal de la aplicación
 * Juego educativo de matemáticas multiidioma (ES/GL)
 */

const APP_VERSION = '2026.02.20.0002';
console.log(`%c🚀 MathQix v${APP_VERSION}`, 'color: #3498db; font-weight: bold; font-size: 1.2rem;');
console.log('Build date: 2026-02-20 08:24');

// Importar managers (se deben cargar antes en el HTML)
const translationManager = new TranslationManager();
const achievementManager = new AchievementManager(translationManager);
const userManager = new UserManager(translationManager);
const storeManager = new StoreManager(userManager, translationManager);
const problemCategoryManager = new ProblemCategoryManager(translationManager);
const dailyChallengeManager = new DailyChallengeManager(translationManager);
const numbersGameManager = new NumbersGameManager();
const settingsManager = new SettingsManager();
const onlineManager = new OnlineManager(translationManager);
const localDuelManager = new LocalDuelManager(null, userManager, t); // GameEngine not ready yet

// Initialize dependencies
storeManager.setAchievementManager(achievementManager);

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

// Variables para duelo online
let pendingOnlineAction = null; // 'create' o 'join' según lo que el usuario quiera hacer

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

    // Sincronizar con el usuario actual si existe
    if (currentUser) {
        userManager.setUserLanguage(lang, currentUser);
    }

    // Actualizar estilos de botones de idioma usando clases
    document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.getElementById(`btn-lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Actualizar título de configuración si hay usuario seleccionado
    if (currentUser) {
        const configTitle = document.getElementById('config-title');
        if (configTitle) {
            const textNode = configTitle.childNodes[0];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = t('config_title_user') + currentUser + ' ';
            } else {
                configTitle.prepend(document.createTextNode(t('config_title_user') + currentUser + ' '));
            }
        }
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
    renderProblemCategories();
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
    gameEngine.startSingleGame();

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
 * Inicia el modo de juego "Cifras"
 */
async function startNumbersGame() {
    try {
        currentProblem = await numbersGameManager.startGame(gameEngine);
    } catch (error) {
        console.error('Error al iniciar Numbers Game:', error);
    }
}

/**
 * Configura el modo duelo
 */
function setupDuel() {
    showDuelModeSelector();
}

/**
 * Inicia el siguiente turno en modo duelo
 */
function startNextDuelTurn() {
    localDuelManager.startNextTurn();
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

    if (enabled) {
        answersArea.classList.add('hidden');
        equationArea.classList.remove('hidden');
        equationArea.style.display = 'block'; // Ensure block display for visibility
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
 * Muestra animación de delta de tiempo (+x / -x)
 * @param {number} delta
 */
/**
 * Muestra animación de delta de tiempo (+x / -x)
 * @param {string} text - Texto a mostrar
 * @param {string} tone - Tono del mensaje ('positive', 'negative', 'neutral')
 */
function showTimeEffect(text, tone) {
    if (gameEngine) {
        gameEngine.showTimeEffect(text, tone);
    }
}

function showTimeDelta(delta) {
    if (gameEngine) {
        gameEngine.showTimeDelta(delta);
    }
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
    () => updatePowerUpDisplay(),
    () => applyTheme(),
    () => handleGameEnd()
);

/**
 * Maneja el fin del juego (intercepta llamada de GameEngine)
 */
function handleGameEnd() {
    // Si estamos en modo Cifras y se acabó el tiempo
    if (gameEngine.problemType === 'numbers_game' && currentProblem) {
        // Verificar integridad del problema
        if (!currentProblem.numbers) {
            console.warn('handleGameEnd: currentProblem.numbers es undefined. Ignorando cálculo de solución.');
            showUsers();
            return;
        }

        // Usamos la solución pre-calculada
        let solution = currentProblem.solution;

        // Si por alguna razón no se terminó de calcular (muy raro en 45s), calculamos síncrono ahora
        if (!solution) {
            console.warn('Solución no estaba lista al acabar el tiempo. Calculando síncrono...');
            solution = numbersGameManager.findBestSolution(currentProblem.target, currentProblem.numbers);
        }

        numbersGameManager.showResult(
            solution,
            () => showUsers(),           // onHome
            () => startNumbersGame()     // onRetry
        );
        return;
    }

    // Comportamiento default
    showUsers();
}

// Update managers with gameEngine dependency
localDuelManager.gameEngine = gameEngine;

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
    // Si estamos en modo Cifras, generamos un nuevo nivel de Cifras
    if (problemType === 'numbers_game') {
        startNumbersGame();
        return;
    }

    questionGenerator.setProblemType(problemType);
    questionGenerator.setGameLevel(gameLevel);
    questionGenerator.generateProblem();
    currentProblem = questionGenerator.getCurrentProblem();

    // Sync with GameEngine
    if (gameEngine) {
        gameEngine.currentProblem = currentProblem;
    }

    // Si no hay problema (todos completados), finalizar la sesión
    if (!currentProblem) {
        endGameSession();
    }
}

/**
 * Valida respuesta del problema
 */
function submitProblem() {
    gameEngine.submitProblem();

    // Sincronizar variables locales
    gameCoins = gameEngine.gameCoins;
    gameLevel = gameEngine.gameLevel;
    timeLeft = gameEngine.timeLeft;

    // Si se generó nuevo problema, actualizar currentProblem global desde engine
    // (Asumiendo que generateProblem() actualiza el engine)
    currentProblem = gameEngine.currentProblem;

    // La UI ya se actualizó en GameEngine
}

/**
 * Verifica si la respuesta seleccionada es correcta
 * @param {number} val - Valor seleccionado por el usuario
 */
/**
 * Verifica si la respuesta seleccionada es correcta
 * @param {number} val - Valor seleccionado por el usuario
 */
function check(val) {
    gameEngine.check(val);

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
    storeManager.buyItem(itemId);
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
    // Usar siempre el timerInterval del engine como fuente de verdad
    const newState = storeManager.useFreezeTime({
        timerInterval: gameEngine.timerInterval,
        freezeTimeout: gameEngine.freezeTimeout,
        startTimer: startTimer
    });

    // Sincronizar ambas referencias
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
 * Abre el modal de configuración del usuario
 */
function openSettingsModal() {
    settingsManager.openSettingsModal(currentUser, userManager, renderProblemCategories);
}

/**
 * Cierra el modal de configuración y guarda los cambios
 */
function closeSettingsModal() {
    settingsManager.closeSettingsModal(userManager, () => {
        users = userManager.getUsers();
    });
}

/**
 * Toggle visibilidad del row de delay cuando se activa/desactiva hints
 */
function onHintsEnabledChange() {
    settingsManager.onHintsEnabledChange();
}

/**
 * Ajusta el valor del delay de hints (+1 / -1 segundo)
 * @param {number} delta - +1 o -1
 */
function adjustHintDelay(delta) {
    settingsManager.adjustHintDelay(delta);
}

/**
 * Guarda el nombre de usuario editado desde el modal de settings
 */
function settingsSaveUserName() {
    settingsManager.saveUserName(userManager, t, (newName) => {
        currentUser = newName;
        users = userManager.getUsers();

        // Actualizar título de la pantalla de config
        const configTitle = document.getElementById('config-title');
        if (configTitle) {
            configTitle.childNodes[0].textContent = t('config_title_user') + newName + ' ';
        }
    });
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

    // Asegurar que se cargan las traducciones fallback (es) si estamos en otro idioma
    if (currentLanguage !== 'es') {
        await translationManager.loadTranslations('es');
    }

    // Inicializar idioma
    await changeLanguage(currentLanguage);

    // Migrar/normalizar estructura antigua de usuarios
    normalizeUsers();

    showUsers();
}

/**
 * Renderiza las tarjetas de categorías de problemas en la configuración del usuario
 */
async function renderProblemCategories() {
    const container = document.getElementById('problem-categories-area');
    if (!container) return;

    const selectedCategories = userManager.getProblemCategories();

    await problemCategoryManager.renderCategoryCards(
        'problem-categories-area',
        selectedCategories,
        (categoryId) => {
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

// Cerrar modal de settings al hacer click en el overlay
document.getElementById('settings-modal')?.addEventListener('click', function (e) {
    if (e.target === this) closeSettingsModal();
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

    // Usar el método refactorizado del manager
    achievementManager.renderAchievements(user, dailyChallengeManager);
}

/**
 * Cierra el modal de logros
 */
function closeAchievements() {
    const modal = document.getElementById('achievements-modal');
    modal.classList.remove('active');
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
        achievementManager.renderAchievements(user, dailyChallengeManager);
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

// Inicializar OnlineGameController
const onlineGameController = new OnlineGameController(
    onlineManager,
    gameEngine,
    questionGenerator,
    userManager,
    t
);

// Exponer globalmente para HTML calls
window.onlineGameController = onlineGameController;

/**
 * ========== FUNCIONES PARA MODO DUELO ONLINE ==========
 */

function showDuelModeSelector() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('screen-duel-mode');
    if (screen) {
        screen.classList.add('active');
    }
}

function startLocalDuel() {
    localDuelManager.startDuel();
    currentUser = userManager.getCurrentUserName();
}

/**
 * Confirma el handover entre turnos del duelo local y arranca el turno del siguiente jugador.
 * Se llama desde el botón de la pantalla screen-duel-handover.
 */
function confirmDuelHandover() {
    gameEngine.startNextDuelTurn();
    currentUser = userManager.getCurrentUserName();
}

/**
 * Delegated Methods for Online Play
 */
function createAndShareGameRoom() {
    onlineGameController.createAndShareGameRoom();
}

function joinRoomByCode() {
    const roomCode = document.getElementById('join-room-input').value.trim().toUpperCase();
    onlineGameController.attemptJoinRoom(roomCode);
}

function prepareOnlineDuel() {
    if (onlineManager.hasStoredCredentials()) {
        const credentials = onlineManager.getStoredCredentials();
        console.log('Usando credenciales:', credentials.username);
        showOnlineDuelOptions();

        // Background sync and connect
        onlineGameController.checkAndSync(credentials.username, credentials.password);
    } else {
        openOnlineCredentialsModal();
    }
}

function showOnlineDuelOptions() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-online-options').classList.add('active');
    const input = document.getElementById('join-room-input');
    if (input) input.value = '';
}

function startCreateRoom() {
    onlineGameController.attemptCreateRoom();
}

function registerOrLoginOnline() {
    const username = document.getElementById('online-username').value.trim();
    const password = document.getElementById('online-password').value.trim();
    onlineGameController.registerOrLoginOnline(username, password);
}

// Credential Modals Helper (View Logic)
function openOnlineCredentialsModal() {
    const modal = document.getElementById('online-credentials-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('online-username').value = '';
        document.getElementById('online-password').value = '';
        document.getElementById('online-username').focus();

        const messageDiv = document.getElementById('online-credentials-message');
        if (messageDiv) messageDiv.style.display = 'none';
    }
}

function closeOnlineCredentialsModal() {
    const modal = document.getElementById('online-credentials-modal');
    if (modal) modal.style.display = 'none';
}

function showMessage(messageDiv, text, type = 'error') {
    onlineGameController.showMessage(messageDiv, text, type);
}

/**
 * Listeners for Custom Events from Controller
 */
window.addEventListener('online-connected', () => {
    // If we just connected (not joining/creating), show options
    showOnlineDuelOptions();
});

window.addEventListener('show-duel-selector', () => {
    showDuelModeSelector();
});

window.addEventListener('online-game-start', () => {
    // Update global UI vars from engine if needed (often reference directly)
    gameLevel = gameEngine.gameLevel;
    gameCoins = gameEngine.gameCoins;
    timeLeft = gameEngine.timeLeft;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-game').classList.add('active');

    updateRecordDisplay();
    document.getElementById('game-level').innerText = gameLevel;
    document.getElementById('game-coins').innerText = gameCoins;

    generateQuestion();
    startTimer();
});

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
    window.__appManagers.onlineManager = onlineManager;
    window.__appManagers.onlineGameController = onlineGameController;
    window.__appManagers.numbersGameManager = numbersGameManager;
    window.__appManagers.settingsManager = settingsManager;
}
