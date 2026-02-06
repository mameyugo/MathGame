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
const numbersGameManager = new NumbersGameManager();
const onlineManager = new OnlineManager(translationManager);
const localDuelManager = new LocalDuelManager(null, userManager, t); // GameEngine not ready yet

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
 * Inicia el modo de juego "Cifras"
 */
function startNumbersGame() {
    // Generar nivel
    const level = numbersGameManager.generateLevel();

    // Configurar entorno de problema
    gameEngine.problemMode = true;
    gameEngine.problemType = 'numbers_game';
    gameEngine.initGameSession(gameLevel, gameCoins); // Re-init session logic

    // Configurar objeto "problema actual" para compatibilidad
    // Configurar objeto "problema actual" para compatibilidad
    // Configurar objeto "problema actual" para compatibilidad
    currentProblem = {
        id: 'numbers_game_' + Date.now(),
        tipoRespuesta: 'numbers_game',
        target: level.target,
        numbers: level.numbers,
        solution: null, // Se calculará asíncronamente
        explicacion: `Objetivo: ${level.target} con [${level.numbers.join(', ')}]`
    };

    // Renderizar UI
    const questionArea = document.getElementById('question-area');
    questionArea.innerHTML = `
        <div class="numbers-game-container">
            <div class="target-number">
                ${level.target}
            </div>
            <div class="available-numbers">
                ${level.numbers.map(n => `<div class="number-card">${n}</div>`).join('')}
            </div>
            <p data-i18n="numbers_game_instruction">
                Escribe una operación exacta usando estos números (+, -, *, /, paréntesis)
            </p>
        </div>
    `;

    // Configurar área de respuesta (reutilizando equation-area pero customizado)
    const equationArea = document.getElementById('equation-area');
    equationArea.style.display = 'block';
    equationArea.innerHTML = `
        <input type="text" id="numbers-game-input" placeholder="Ej: (25 * 4) + 1" autocomplete="off" autocorrect="off">
    `;

    // Mostrar botón de enviar
    const submitBtn = document.getElementById('btn-submit-problem');
    submitBtn.style.display = 'block';

    // Ocultar área de opciones
    document.getElementById('answers-area').style.display = 'none';

    // Timer de 45 segundos (User Request)
    gameEngine.timeLeft = 45;
    gameEngine.setTimeLeft(45);

    // Auto-focus input
    setTimeout(() => document.getElementById('numbers-game-input')?.focus(), 100);

    // Calcular solución asíncronamente para no bloquear UI
    numbersGameManager.findBestSolutionAsync(level.target, level.numbers)
        .then(solution => {
            if (currentProblem && currentProblem.id) {
                currentProblem.solution = solution;
                // console.log('Solución calculada:', solution);
            }
        })
        .catch(err => console.error('Error calculando solución:', err));
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
    () => handleGameEnd()
);

/**
 * Maneja el fin del juego (intercepta llamada de GameEngine)
 */
function handleGameEnd() {
    // Si estamos en modo Cifras y se acabó el tiempo
    if (gameEngine.problemType === 'numbers_game' && currentProblem) {
        // Usamos la solución pre-calculada
        let solution = currentProblem.solution;

        // Si por alguna razón no se terminó de calcular (muy raro en 45s), calculamos síncrono ahora
        if (!solution) {
            console.warn('Solución no estaba lista al acabar el tiempo. Calculando síncrono...');
            solution = numbersGameManager.findBestSolution(currentProblem.target, currentProblem.numbers);
        }

        showNumbersGameResult(solution);
        return; // Detener flujo normal para no mostrar modal de usuarios inmediatamente
    }

    // Comportamiento default
    showUsers();
}

/**
 * Muestra el resultado del juego de cifras con opciones
 * @param {Object} solution 
 */
function showNumbersGameResult(solution) {
    const isExact = solution.diff === 0;
    const title = isExact ? '¡Se acabó el tiempo!' : '¡Tiempo agotado!';
    const subTitle = isExact ? 'Solución exacta encontrada:' : `No se encontró exacto (Dif: ${solution.diff})`;

    // Crear modal dinámicamente
    const modalId = 'numbers-game-result-modal';
    let modal = document.getElementById(modalId);

    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <h2>${title}</h2>
            <p style="font-size: 1.1rem; margin: 10px 0;">${subTitle}</p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; font-family: monospace; font-size: 1.2rem; font-weight: bold; color: #2c3e50;">
                ${solution.expression} = ${solution.value}
            </div>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                <button id="btn-ng-home" class="btn-back">🏠 Inicio</button>
                <button id="btn-ng-retry" class="main-btn" style="margin:0;">🔄 Nuevo Juego</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners
    document.getElementById('btn-ng-home').onclick = () => {
        modal.remove();
        showUsers();
    };

    document.getElementById('btn-ng-retry').onclick = () => {
        modal.remove();
        startNumbersGame();
    };
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
    } else if (tipoRespuesta === 'numbers_game') {
        // Validación para Cifras (Numbers Game)
        const input = document.getElementById('numbers-game-input');
        if (!input || input.value.trim() === '') {
            showFeedbackMessage('Por favor, escribe una operación');
            return;
        }

        const expression = input.value.trim();
        const result = numbersGameManager.checkSolution(currentProblem.target, currentProblem.numbers, expression);

        if (result.valid && result.exact) {
            isCorrect = true;
            // Bonus achievements logic handled in validation result?
        } else {
            isCorrect = false;
            let reason = result.reason || 'Incorrecto';
            if (result.valid && !result.exact) {
                reason = `Resultado: ${result.value} (Objetivo: ${currentProblem.target})`;
            }
            showFeedbackMessage(reason);
        }

        // Track specific stats for Cifras
        const user = userManager.getCurrentUser();
        if (user && achievementManager) {
            user.achievementStats = user.achievementStats || {};

            if (isCorrect) {
                user.achievementStats.exactSolutions = (user.achievementStats.exactSolutions || 0) + 1;
                user.achievementStats.numbersGameStreak = (user.achievementStats.numbersGameStreak || 0) + 1;

                // Chequear full house (usar todos los números)
                // Contar números en expresión
                const usedNumbers = expression.match(/\d+/g);
                if (usedNumbers && usedNumbers.length === 6) {
                    user.achievementStats.fullHouseSolutions = (user.achievementStats.fullHouseSolutions || 0) + 1;
                    showTimeEffect('🃏 Full House!', 'positive');
                }
            } else {
                user.achievementStats.numbersGameStreak = 0;
            }
            userManager.saveToStorage();
        }
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
function renderProblemCategories() {
    const container = document.getElementById('problem-categories-area');
    if (!container) return;

    const selectedCategories = userManager.getProblemCategories();

    problemCategoryManager.renderCategoryCards(
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
 * Delegated Methods for Online Play
 */
function createAndShareGameRoom() {
    onlineGameController.createAndShareGameRoom();
}

function joinRoomByCode() {
    const roomCode = document.getElementById('join-room-input').value.trim().toUpperCase();
    onlineGameController.joinRoomByCode(roomCode);
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
    onlineGameController.pendingOnlineAction = 'create';
    openOnlineCredentialsModal();
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
}
