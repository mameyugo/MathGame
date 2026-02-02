/**
 * MateAventura - Lógica principal de la aplicación
 * Juego educativo de matemáticas multiidioma (ES/GL)
 */

// Importar managers (se deben cargar antes en el HTML)
const translationManager = new TranslationManager();
const userManager = new UserManager(translationManager);
const storeManager = new StoreManager(userManager, translationManager);
const problemCategoryManager = new ProblemCategoryManager(translationManager);

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
        mul: document.getElementById('cfg-mul').checked
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

// Inicializar QuestionGenerator antes de GameEngine
questionGenerator = new QuestionGenerator(userManager, problemCategoryManager, (val) => check(val));

// Inicializar GameEngine después de definir las funciones auxiliares
gameEngine = new GameEngine(
    userManager,
    translationManager,
    () => generateQuestion(),
    () => generateProblem(),
    (enabled) => toggleProblemUI(enabled),
    () => updatePowerUpDisplay(),
    () => applyTheme(),
    () => showUsers()
);

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
}

/**
 * Valida respuesta del problema
 */
function submitProblem() {
    if (!currentProblem) return;

    const equationArea = document.getElementById('equation-area');
    const inputs = Array.from(equationArea.querySelectorAll('input.eq-input'));
    const values = inputs.map(i => i.value.trim());

    if (values.some(v => v === '')) {
        alert(t('alert_fill_equation'));
        return;
    }

    const parsed = values.map(v => Number(v));
    const expected = currentProblem.ecuacionValores || [];

    const isCorrect = parsed.length === expected.length && parsed.every((v, i) => v === expected[i]);

    if (isCorrect) {
        // Actualizar GameEngine
        gameEngine.gameCoins += 10;
        gameEngine.timeLeft += 2;

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
            return;
        }

        document.getElementById('app-container').classList.add('shake');
        setTimeout(() => document.getElementById('app-container').classList.remove('shake'), 400);

        // Actualizar GameEngine
        gameEngine.timeLeft -= 4;
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
    gameEngine.currentAnswer = currentAnswer;
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
    const initialTime = timeLeft;

    storeManager.usePotion({
        timeLeft: timeLeft,
        timerElement: timerElement,
        updateDisplay: updatePowerUpDisplay
    });

    // Si la operación fue exitosa, timeLeft se incrementó en 15
    timeLeft = initialTime + 15;
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
// Inicializar la aplicación (evitar auto-init en tests)
if (typeof window !== 'undefined' && !window.__TEST__) {
    initApp();
}
