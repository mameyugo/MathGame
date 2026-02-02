/**
 * MateAventura - Lógica principal de la aplicación
 * Juego educativo de matemáticas multiidioma (ES/GL)
 */

// Importar managers (se deben cargar antes en el HTML)
const translationManager = new TranslationManager();
const userManager = new UserManager(translationManager);
const storeManager = new StoreManager(userManager, translationManager);

// Variables globales
let currentLanguage = translationManager.getCurrentLanguage();
let users = userManager.getUsers();
let currentUser = userManager.getCurrentUserName();

// Store items (mantenido para compatibilidad)
const storeItems = storeManager.getStoreItems();

// GameEngine will be initialized after functions are defined
let gameEngine = null;

// Variables que serán gestionadas por GameEngine (mantenerlas para sincronización)
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
    // Sincronizar estado global
    users = userManager.getUsers();
}

/**
 * Inicia una partida de problemas
 * @param {string} type - 'logica' o 'matematico'
 */
function startProblemGame(type) {
    problemType = type;
    gameEngine.problemType = type;
    gameEngine.startProblemGame(type);
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
 * Genera una pregunta matemática aleatoria
 */
function generateQuestion() {
    const ops = users[currentUser].ops;
    const op = ops[Math.floor(Math.random() * ops.length)];
    const mode = Math.random();
    let n1 = Math.floor(Math.random() * (gameLevel + 5)) + 1;
    let n2 = Math.floor(Math.random() * (gameLevel + 5)) + 1;
    if (op === '-' && n1 < n2) [n1, n2] = [n2, n1];
    currentAnswer = eval(`${n1}${op}${n2}`);

    const area = document.getElementById('question-area');
    area.innerHTML = "";

    if (mode < 0.3 && gameLevel < 8) { // Modo Visual
        area.appendChild(renderVisual(n1));
        const s = document.createElement('div');
        s.innerText = op.replace('*', '×');
        area.appendChild(s);
        area.appendChild(renderVisual(n2));
    } else if (mode < 0.6) { // Modo Incógnita
        area.innerText = `? ${op.replace('*', '×')} ${n2} = ${currentAnswer}`;
        currentAnswer = n1;
    } else { // Modo Estándar
        area.innerText = `${n1} ${op.replace('*', '×')} ${n2} = ?`;
    }
    renderOptions();
}

/**
 * Renderiza representación visual de un número (decenas y unidades)
 * @param {number} num - Número a representar
 * @returns {HTMLElement} Elemento div con la representación visual
 */
function renderVisual(num) {
    const div = document.createElement('div');
    div.className = 'visual-box';
    const tens = Math.floor(num / 10);
    const units = num % 10;

    // Get current theme
    const theme = users[currentUser].currentTheme || 'default';
    let unitIcon = '🍎';

    if (theme === 'theme_space') {
        unitIcon = '⭐';
    } else if (theme === 'theme_jungle') {
        unitIcon = '🍌';
    }

    for (let i = 0; i < tens; i++) div.innerHTML += '<div class="ten-block">📦x10</div>';
    for (let i = 0; i < units; i++) div.innerHTML += `<span class="unit">${unitIcon}</span>`;
    return div;
}

/**
 * Renderiza las opciones de respuesta
 */
function renderOptions() {
    const grid = document.getElementById('answers-area');
    grid.innerHTML = "";
    let opts = new Set([currentAnswer]);

    const addOption = (val) => {
        if (typeof val !== 'number' || Number.isNaN(val)) return;
        if (val < 0) return;
        opts.add(val);
    };

    // 15%: añadir opción errónea con resultado correcto ±10
    if (Math.random() < 0.15) {
        const delta = Math.random() < 0.5 ? -10 : 10;
        addOption(currentAnswer + delta);
    }

    // 10%: añadir opción errónea invirtiendo los dígitos (14 -> 41)
    if (Math.random() < 0.10) {
        const reversed = parseInt(String(Math.abs(currentAnswer)).split('').reverse().join(''), 10);
        if (!Number.isNaN(reversed) && reversed !== currentAnswer) {
            addOption(reversed);
        }
    }

    // Completar opciones con valores cercanos
    let guard = 0;
    while (opts.size < 4 && guard < 100) {
        guard++;
        addOption(currentAnswer + (Math.floor(Math.random() * 10) - 5));
    }
    Array.from(opts).sort(() => Math.random() - 0.5).forEach(o => {
        if (o >= 0) {
            const b = document.createElement('button');
            b.className = 'option-btn';
            b.innerText = o;
            b.onclick = () => check(o);
            grid.appendChild(b);
        }
    });
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

/**
 * Selecciona un problema según nivel y tipo
 */
function selectProblem() {
    if (typeof window.bancoProblemas === 'undefined' || !Array.isArray(window.bancoProblemas)) {
        return null;
    }

    const candidates = window.bancoProblemas.filter(p => p.tipo === problemType && p.nivelMin <= gameLevel);
    const pool = candidates.length ? candidates : window.bancoProblemas;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return pick?.generar ? pick.generar() : null;
}

/**
 * Renderiza la ecuación con inputs vacíos
 * @param {string} equation
 */
function renderEquation(equation) {
    const equationArea = document.getElementById('equation-area');
    if (!equationArea) return;

    equationArea.innerHTML = '';
    const lines = String(equation).split('\n');

    lines.forEach(line => {
        const row = document.createElement('div');
        row.className = 'equation-row';

        const parts = line.split('__');
        parts.forEach((part, idx) => {
            row.insertAdjacentText('beforeend', part);
            if (idx < parts.length - 1) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'eq-input';
                input.setAttribute('data-eq', '1');
                row.appendChild(input);
            }
        });

        equationArea.appendChild(row);
    });
}

/**
 * Genera un problema
 */
function generateProblem() {
    currentProblem = selectProblem();
    if (!currentProblem) {
        showFeedbackMessage('No hay problemas disponibles');
        return;
    }

    const area = document.getElementById('question-area');
    area.innerText = currentProblem.texto;

    renderEquation(currentProblem.ecuacion);

    // Enfocar el primer input para responder más rápido
    setTimeout(() => {
        const firstInput = document.querySelector('#equation-area .eq-input');
        if (firstInput) firstInput.focus();
    }, 0);
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
        gameCoins += 10;
        timeLeft += 2;
        try {
            confetti({ particleCount: 30, spread: 50 });
        } catch (e) {
            // Confetti library not loaded
        }
        if (gameCoins % 50 === 0) gameLevel++;
        document.getElementById('game-level').innerText = gameLevel;
        document.getElementById('game-coins').innerText = gameCoins;
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
        timeLeft -= 4;
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
