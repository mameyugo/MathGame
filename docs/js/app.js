/**
 * MateAventura - Lógica principal de la aplicación
 * Juego educativo de matemáticas multiidioma (ES/GL)
 */

// Importar TranslationManager (se debe cargar antes en el HTML)
const translationManager = new TranslationManager();

// Variables globales
let currentLanguage = translationManager.getCurrentLanguage();
let users = JSON.parse(localStorage.getItem('math_users')) || {};
let currentUser = null;
let duelMode = false;
let duelPlayers = [];
let duelScores = {};
let currentDuelIdx = 0;
let gameCoins = 0, gameLevel = 1, timeLeft = 30, timerInterval = null, currentAnswer = 0;
let freezeTimeout = null;
let problemMode = false;
let problemType = 'matematico';
let currentProblem = null;

// Store items definition
const storeItems = [
    {
        id: 'potion',
        icon: '⏰',
        nameKey: 'item_potion_name',
        descKey: 'item_potion_desc',
        price: 50,
        type: 'consumable'
    },
    {
        id: 'freeze',
        icon: '❄️',
        nameKey: 'item_freeze_name',
        descKey: 'item_freeze_desc',
        price: 20,
        type: 'consumable'
    },
    {
        id: 'shield',
        icon: '🛡️',
        nameKey: 'item_shield_name',
        descKey: 'item_shield_desc',
        price: 100,
        type: 'consumable'
    },
    {
        id: 'theme_space',
        icon: '🌟',
        nameKey: 'item_theme_space_name',
        descKey: 'item_theme_space_desc',
        price: 200,
        type: 'theme'
    },
    {
        id: 'theme_jungle',
        icon: '🍌',
        nameKey: 'item_theme_jungle_name',
        descKey: 'item_theme_jungle_desc',
        price: 200,
        type: 'theme'
    }
];

/**
 * Initialize user inventory if it doesn't exist
 * @param {Object} user - User object
 */
function initInventory(user) {
    if (!user.inventory) {
        user.inventory = {
            potions: 0,
            freezes: 0,
            shields: 0,
            themes: []
        };
    }
    if (typeof user.inventory.potions !== 'number' || Number.isNaN(user.inventory.potions)) {
        user.inventory.potions = 0;
    }
    if (typeof user.inventory.freezes !== 'number' || Number.isNaN(user.inventory.freezes)) {
        user.inventory.freezes = 0;
    }
    if (typeof user.inventory.shields !== 'number' || Number.isNaN(user.inventory.shields)) {
        user.inventory.shields = 0;
    }
    if (!Array.isArray(user.inventory.themes)) {
        user.inventory.themes = [];
    }
    if (!user.currentTheme) {
        user.currentTheme = 'default';
    }
}

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
        renderLeaderboard();
    }
}

/**
 * Muestra la pantalla de usuarios
 */
function showUsers() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-users').classList.add('active');
    renderUserList();
    renderLeaderboard();
}

/**
 * Renderiza la lista de usuarios
 */
function renderUserList() {
    const list = document.getElementById('user-list');
    list.innerHTML = "";
    for (let name in users) {
        list.innerHTML += `
        <div class="user-card">
            <div class="user-info" onclick="selectUser('${name}')">
                <span><strong>${name}</strong> (Lvl ${users[name].level})</span>
                <span>💰 ${users[name].totalCoins}</span>
            </div>
            <button class="btn-play-user" onclick="event.stopPropagation(); selectUser('${name}')" data-i18n="btn_play_user">▶️ Jugar</button>
        </div>`;
    }
    // Actualizar traducciones de los botones recién creados
    document.querySelectorAll('[data-i18n="btn_play_user"]').forEach(el => {
        el.innerHTML = t('btn_play_user');
    });
}

/**
 * Renderiza el salón de la fama (top 3 usuarios)
 */
function renderLeaderboard() {
    const list = document.getElementById('leader-list');
    const sorted = Object.keys(users).sort((a, b) => users[b].totalCoins - users[a].totalCoins).slice(0, 3);
    list.innerHTML = sorted.length ? "" : `<small>${t('hall_of_fame_empty')}</small>`;
    sorted.forEach((name, i) => {
        const icons = ['🥇', '🥈', '🥉'];
        list.innerHTML += `<div class="leader-item"><span>${icons[i]} ${name}</span><strong>${users[name].totalCoins}</strong></div>`;
    });
}

/**
 * Crea un nuevo usuario
 */
function createUser() {
    const name = document.getElementById('new-user-name').value.trim();
    if (!name || users[name]) return alert(t('alert_invalid_name'));
    users[name] = {
        level: 1,
        totalCoins: 0,
        ops: ['+'],
        inventory: { potions: 0, shields: 0, themes: [] },
        currentTheme: 'default'
    };
    localStorage.setItem('math_users', JSON.stringify(users));
    document.getElementById('new-user-name').value = "";
    renderUserList();
}

/**
 * Selecciona un usuario y muestra su configuración
 * @param {string} name - Nombre del usuario
 */
function selectUser(name) {
    currentUser = name;
    document.getElementById('config-title').innerText = t('config_title_user') + name;
    document.getElementById('cfg-sum').checked = users[name].ops.includes('+');
    document.getElementById('cfg-res').checked = users[name].ops.includes('-');
    document.getElementById('cfg-mul').checked = users[name].ops.includes('*');
    // Reset edit name section
    document.getElementById('username-edit-section').style.display = 'none';
    document.getElementById('btn-edit-username').style.display = 'block';
    document.getElementById('edit-user-name').value = '';
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-config').classList.add('active');
}

/**
 * Muestra el formulario de edición de nombre
 */
function showEditName() {
    document.getElementById('username-edit-section').style.display = 'block';
    document.getElementById('btn-edit-username').style.display = 'none';
    document.getElementById('edit-user-name').value = currentUser;
    document.getElementById('edit-user-name').focus();
}

/**
 * Cancela la edición del nombre
 */
function cancelEditName() {
    document.getElementById('username-edit-section').style.display = 'none';
    document.getElementById('btn-edit-username').style.display = 'block';
    document.getElementById('edit-user-name').value = '';
}

/**
 * Guarda el nuevo nombre del usuario
 */
function saveUserName() {
    const newName = document.getElementById('edit-user-name').value.trim();
    const oldName = currentUser;

    // Validar que el nombre no esté vacío
    if (!newName) {
        return alert(t('alert_invalid_name'));
    }

    // Si el nombre no cambió, cancelar
    if (newName === oldName) {
        cancelEditName();
        return;
    }

    // Validar que el nombre no exista ya
    if (users[newName]) {
        return alert(t('alert_invalid_name'));
    }

    // Copiar datos del usuario con el nuevo nombre (copia profunda)
    users[newName] = JSON.parse(JSON.stringify(users[oldName]));

    // Eliminar el usuario con el nombre antiguo
    delete users[oldName];

    // Guardar en localStorage
    localStorage.setItem('math_users', JSON.stringify(users));

    // Actualizar currentUser
    currentUser = newName;

    // Actualizar la interfaz
    document.getElementById('config-title').innerText = t('config_title_user') + newName;
    cancelEditName();

    // Mostrar mensaje de confirmación
    alert(t('alert_name_updated'));

    // Actualizar la lista de usuarios
    renderUserList();
    renderLeaderboard();
}


/**
 * Inicia una partida individual
 */
function startSingleGame() {
    duelMode = false;
    problemMode = false;
    users[currentUser].ops = [];
    if (document.getElementById('cfg-sum').checked) users[currentUser].ops.push('+');
    if (document.getElementById('cfg-res').checked) users[currentUser].ops.push('-');
    if (document.getElementById('cfg-mul').checked) users[currentUser].ops.push('*');
    if (!users[currentUser].ops.length) return alert(t('alert_choose_operation'));
    localStorage.setItem('math_users', JSON.stringify(users));
    initGameSession(1, 0);
}

/**
 * Inicia una partida de problemas
 * @param {string} type - 'logica' o 'matematico'
 */
function startProblemGame(type) {
    duelMode = false;
    problemMode = true;
    problemType = type;
    initGameSession(1, 0);
}

/**
 * Configura el modo duelo
 */
function setupDuel() {
    duelPlayers = Object.keys(users);
    if (duelPlayers.length < 2) return alert(t('alert_min_users'));
    duelMode = true;
    currentDuelIdx = 0;
    duelScores = {};
    startNextDuelTurn();
}

/**
 * Inicia el siguiente turno en modo duelo
 */
function startNextDuelTurn() {
    currentUser = duelPlayers[currentDuelIdx];
    document.getElementById('turn-indicator').innerText = t('turn_of') + currentUser;
    initGameSession(1, 0);
}

/**
 * Inicializa una sesión de juego
 * @param {number} lvl - Nivel inicial
 * @param {number} coins - Monedas iniciales
 */
function initGameSession(lvl, coins) {
    gameLevel = lvl;
    gameCoins = coins;
    timeLeft = 30;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-game').classList.add('active');

    // Initialize power-ups display
    initInventory(users[currentUser]);
    updatePowerUpDisplay();
    updateRecordDisplay();
    applyTheme();

    if (problemMode) {
        toggleProblemUI(true);
        generateProblem();
    } else {
        toggleProblemUI(false);
        generateQuestion();
    }
    startTimer();
}

/**
 * Starts or restarts the game timer
 */
function startTimer() {
    // Don't start timer if time has already run out
    if (timeLeft <= 0) {
        endGameSession();
        return;
    }

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('game-timer').innerText = timeLeft + "s";
        if (timeLeft <= 0) endGameSession();
    }, 1000);
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
    if (val === currentAnswer) {
        gameCoins += 10;
        timeLeft += 2;
        try {
            confetti({ particleCount: 30, spread: 50 });
        } catch (e) {
            // Confetti library not loaded
        }
        if (gameCoins % 50 === 0) gameLevel++;
        generateQuestion();
    } else {
        // Check if user has shield active
        initInventory(users[currentUser]);
        if (users[currentUser].inventory.shields > 0) {
            users[currentUser].inventory.shields--;
            localStorage.setItem('math_users', JSON.stringify(users));
            updatePowerUpDisplay();
            // Show shield used message
            showFeedbackMessage(t('alert_shield_used'));
            return; // Shield protects, no penalty
        }

        document.getElementById('app-container').classList.add('shake');
        setTimeout(() => document.getElementById('app-container').classList.remove('shake'), 400);
        timeLeft -= 4;
    }
    document.getElementById('game-level').innerText = gameLevel;
    document.getElementById('game-coins').innerText = gameCoins;
    updateRecordDisplay();
}

/**
 * Shows a feedback message on screen
 * @param {string} message - Message to display
 */
function showFeedbackMessage(message) {
    // Outer container: responsible only for centering/positioning
    const msgDiv = document.createElement('div');
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '50%';
    msgDiv.style.left = '50%';
    msgDiv.style.transform = 'translate(-50%, -50%)';
    msgDiv.style.zIndex = '2000';
    msgDiv.style.pointerEvents = 'none';

    // Inner content: visual styles + animation
    const msgContent = document.createElement('div');
    msgContent.style.background = 'rgba(39, 174, 96, 0.95)';
    msgContent.style.color = 'white';
    msgContent.style.padding = '20px 40px';
    msgContent.style.borderRadius = '15px';
    msgContent.style.fontSize = '1.5rem';
    msgContent.style.fontWeight = 'bold';
    msgContent.style.animation = 'slideUp 0.3s';
    msgContent.innerText = message;

    msgDiv.appendChild(msgContent);
    document.body.appendChild(msgDiv);
    setTimeout(() => {
        msgDiv.remove();
    }, 2000);
}

/**
 * Finaliza la sesión de juego actual
 */
function endGameSession() {
    clearInterval(timerInterval);
    if (duelMode) {
        duelScores[currentUser] = gameCoins;
        currentDuelIdx++;
        if (currentDuelIdx < duelPlayers.length) {
            startNextDuelTurn();
        } else {
            alert(t('alert_duel_end') + Object.entries(duelScores).map(([p, s]) => `${p}: ${s}`).join("\n"));
            showUsers();
        }
    } else {
        users[currentUser].totalCoins += gameCoins;
        users[currentUser].level = Math.max(users[currentUser].level || 1, gameLevel);
        localStorage.setItem('math_users', JSON.stringify(users));
        alert(t('alert_good_job') + gameCoins + t('alert_coins'));
        showUsers();
    }
}

/**
 * Opens the store modal
 */
function openStore() {
    if (!currentUser) {
        const userNames = Object.keys(users);
        if (userNames.length === 0) {
            // No users created: ask the player to create a profile before using the store
            alert('Por favor, crea un jugador antes de entrar en la tienda.\nPor favor, crea un xogador antes de entrar na tenda.');
            return;
        }
        // Users exist but none is selected: require explicit selection instead of defaulting
        alert('Por favor, selecciona un jugador antes de entrar en la tienda.\nPor favor, selecciona un xogador antes de entrar na tenda.');
        return;
    }
    initInventory(users[currentUser]);
    document.getElementById('store-modal').classList.add('active');
    renderStore();
}

/**
 * Closes the store modal
 */
function closeStore() {
    document.getElementById('store-modal').classList.remove('active');
}

/**
 * Renders the store items
 */
function renderStore() {
    const container = document.getElementById('store-items');
    const balance = document.getElementById('store-balance');

    balance.innerText = users[currentUser].totalCoins;
    container.innerHTML = '';

    storeItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'store-item';

        let owned = 0;
        let isOwned = false;
        let isEquipped = false;

        if (item.type === 'consumable') {
            if (item.id === 'potion') owned = users[currentUser].inventory.potions;
            if (item.id === 'freeze') owned = users[currentUser].inventory.freezes;
            if (item.id === 'shield') owned = users[currentUser].inventory.shields;
        } else if (item.type === 'theme') {
            isOwned = users[currentUser].inventory.themes.includes(item.id);
            isEquipped = users[currentUser].currentTheme === item.id;
        }

        const canBuy = users[currentUser].totalCoins >= item.price;
        if (!canBuy && !isOwned) {
            itemDiv.classList.add('locked');
        }

        itemDiv.innerHTML = `
            <div class="item-info">
                <div class="item-header">
                    <span class="item-icon">${item.icon}</span>
                    <span class="item-name">${t(item.nameKey)}</span>
                </div>
                <div class="item-description">${t(item.descKey)}</div>
                ${item.type === 'consumable' ? `<div class="item-owned">${t('item_owned')}${owned}</div>` : ''}
                ${isEquipped && item.type === 'theme' ? `<div class="item-owned">✓ ${t('btn_equipped')}</div>` : ''}
            </div>
            <div class="item-purchase">
                <div class="item-price">💰 ${item.price}</div>
                ${isEquipped ? `<button class="btn-buy" onclick="unequipTheme()">${t('btn_unequip')}</button>` :
                isOwned && item.type === 'theme' ? `<button class="btn-buy" onclick="equipTheme('${item.id}')">${t('btn_equip')}</button>` :
                    `<button class="btn-buy" onclick="buyItem('${item.id}')" ${!canBuy ? 'disabled' : ''}>${t('btn_buy')}</button>`}
            </div>
        `;

        container.appendChild(itemDiv);
    });
}

/**
 * Buys an item from the store
 * @param {string} itemId - ID of the item to buy
 */
function buyItem(itemId) {
    const item = storeItems.find(i => i.id === itemId);
    if (!item) return;

    initInventory(users[currentUser]);

    // Check if user has enough coins
    if (users[currentUser].totalCoins < item.price) {
        alert(t('alert_not_enough_coins'));
        return;
    }

    // Deduct coins
    users[currentUser].totalCoins -= item.price;

    // Add item to inventory
    if (item.type === 'consumable') {
        if (item.id === 'potion') {
            users[currentUser].inventory.potions++;
        } else if (item.id === 'freeze') {
            users[currentUser].inventory.freezes++;
        } else if (item.id === 'shield') {
            users[currentUser].inventory.shields++;
        }
    } else if (item.type === 'theme') {
        if (!users[currentUser].inventory.themes.includes(item.id)) {
            users[currentUser].inventory.themes.push(item.id);
        }
    }

    // Save to localStorage
    localStorage.setItem('math_users', JSON.stringify(users));

    // Visual feedback
    const balance = document.getElementById('store-balance');
    balance.parentElement.classList.add('coin-flash');
    setTimeout(() => {
        balance.parentElement.classList.remove('coin-flash');
    }, 500);

    // Play purchase sound (using confetti as substitute)
    try {
        confetti({ particleCount: 50, spread: 70, colors: ['#f1c40f', '#27ae60'] });
    } catch (e) {
        // Confetti library not loaded
    }

    // Show success message
    showFeedbackMessage(t('alert_purchase_success'));

    // Re-render store
    renderStore();
    renderUserList();
}

/**
 * Equips a theme
 * @param {string} themeId - ID of the theme to equip
 */
function equipTheme(themeId) {
    initInventory(users[currentUser]);

    const inventory = users[currentUser].inventory;

    // Only allow equipping themes that the user owns
    if (!inventory || !Array.isArray(inventory.themes) || !inventory.themes.includes(themeId)) {
        return;
    }
    users[currentUser].currentTheme = themeId;
    localStorage.setItem('math_users', JSON.stringify(users));
    renderStore();
}

/**
 * Unequips the current theme and reverts to default
 */
function unequipTheme() {
    initInventory(users[currentUser]);
    users[currentUser].currentTheme = 'default';
    localStorage.setItem('math_users', JSON.stringify(users));
    renderStore();
}

/**
 * Uses a time potion during gameplay
 */
function usePotion() {
    initInventory(users[currentUser]);

    if (users[currentUser].inventory.potions <= 0) {
        alert(t('alert_no_potions'));
        return;
    }

    // Consume potion
    users[currentUser].inventory.potions--;
    localStorage.setItem('math_users', JSON.stringify(users));

    // Add time
    timeLeft += 15;
    document.getElementById('game-timer').innerText = timeLeft + "s";

    // Update display
    updatePowerUpDisplay();

    // Visual feedback
    showFeedbackMessage(t('alert_potion_used'));
    try {
        confetti({ particleCount: 30, spread: 60, colors: ['#3498db', '#9b59b6'] });
    } catch (e) {
        // Confetti library not loaded
    }
}

/**
 * Uses a freeze time power-up during gameplay
 */
function useFreezeTime() {
    initInventory(users[currentUser]);

    if (users[currentUser].inventory.freezes <= 0) {
        alert(t('alert_no_freezes'));
        return;
    }

    // Consume freeze
    users[currentUser].inventory.freezes--;
    localStorage.setItem('math_users', JSON.stringify(users));

    // Pause timer for 5 seconds
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Clear any pending freeze timeout
    if (freezeTimeout) {
        clearTimeout(freezeTimeout);
    }

    // Visual feedback
    showFeedbackMessage(t('alert_freeze_used'));
    try {
        confetti({ particleCount: 40, spread: 80, colors: ['#00d4ff', '#ffffff', '#a8e6ff'] });
    } catch (e) {
        // Confetti library not loaded
    }

    // Update display
    updatePowerUpDisplay();

    // Resume timer after 5 seconds
    freezeTimeout = setTimeout(() => {
        freezeTimeout = null;
        startTimer();
    }, 5000);
}

/**
 * Updates the power-up display in game
 */
function updatePowerUpDisplay() {
    initInventory(users[currentUser]);

    const potionBtn = document.getElementById('btn-use-potion');
    const potionCount = document.getElementById('potion-count');
    const freezeBtn = document.getElementById('btn-use-freeze');
    const freezeCount = document.getElementById('freeze-count');
    const shieldIndicator = document.getElementById('shield-indicator');
    const shieldCount = document.getElementById('shield-count');

    potionCount.innerText = users[currentUser].inventory.potions;
    freezeCount.innerText = users[currentUser].inventory.freezes;
    shieldCount.innerText = users[currentUser].inventory.shields;

    potionBtn.disabled = users[currentUser].inventory.potions <= 0;
    freezeBtn.disabled = users[currentUser].inventory.freezes <= 0;

    if (users[currentUser].inventory.shields > 0) {
        shieldIndicator.classList.add('active');
    } else {
        shieldIndicator.classList.remove('active');
    }
}

/**
 * Applies the current theme to visual elements
 */
function applyTheme() {
    initInventory(users[currentUser]);
    const theme = users[currentUser].currentTheme;

    // Apply theme to the app container
    const appContainer = document.getElementById('app-container');
    if (theme === 'theme_space') {
        appContainer.setAttribute('data-theme', 'space');
    } else if (theme === 'theme_jungle') {
        appContainer.setAttribute('data-theme', 'jungle');
    } else {
        appContainer.removeAttribute('data-theme');
    }
}

/**
 * Actualiza la visualización del récord del jugador
 */
function updateRecordDisplay() {
    const recordEl = document.getElementById('game-record');
    if (!recordEl || !currentUser) return;

    const userRecord = typeof users[currentUser].level === 'number' ? users[currentUser].level : 1;
    const displayRecord = Math.max(userRecord, gameLevel);
    recordEl.innerText = displayRecord;
}

/**
 * Normaliza la estructura de usuarios guardados (migraciones de localStorage)
 */
function normalizeUsers() {
    let changed = false;

    Object.keys(users).forEach(userName => {
        const user = users[userName];
        const beforeInventory = user.inventory ? JSON.stringify(user.inventory) : null;
        const beforeTheme = user.currentTheme;

        if (typeof user.level !== 'number' || Number.isNaN(user.level)) {
            user.level = 1;
            changed = true;
        }

        initInventory(user);

        const afterInventory = JSON.stringify(user.inventory);
        if (beforeInventory !== afterInventory || beforeTheme !== user.currentTheme) {
            changed = true;
        }
    });

    if (changed) {
        localStorage.setItem('math_users', JSON.stringify(users));
    }
}

/**
 * Sincroniza el estado desde localStorage (útil cuando vuelves atrás en navegador)
 */
function syncStateFromStorage() {
    // Recargar datos desde localStorage
    const storedUsers = localStorage.getItem('math_users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
        // Migrar/normalizar estructura antigua de usuarios
        normalizeUsers();
    }

    currentLanguage = localStorage.getItem('math_lang') || 'es';
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
