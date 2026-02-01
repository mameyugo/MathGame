/**
 * MateAventura - Lógica principal de la aplicación
 * Juego educativo de matemáticas multiidioma (ES/GL)
 */

// Sistema de traducciones
const translations = {
    es: {
        app_title: '🚀 MateAventura',
        input_player_name: 'Nombre del jugador...',
        btn_add: '+ Añadir',
        btn_duel_mode: '🏆 MODO DUELO',
        btn_open_store: '🏪 TIENDA',
        hall_of_fame_title: '👑 Salón de la Fama',
        hall_of_fame_empty: '¡Nadie en el podio aún!',
        config_title: 'Configuración',
        config_title_user: 'Configuración: ',
        choose_operations: 'Elige las operaciones:',
        op_addition: 'Sumas',
        op_subtraction: 'Restas',
        op_multiplication: 'Multiplicaciones',
        btn_play: '¡A JUGAR!',
        btn_change_user: '⬅ Cambiar de usuario',
        btn_close_store: '⬅ Cerrar',
        label_level: 'Nivel',
        turn_of: '🏆 Turno de: ',
        btn_play_user: '▶️ Jugar',
        alert_invalid_name: 'Nombre no válido o ya existe',
        alert_choose_operation: 'Elige una operación',
        alert_min_users: 'Se necesitan al menos 2 usuarios',
        alert_duel_end: '🏁 FIN DEL DUELO\n',
        alert_good_job: '¡Buen trabajo! Ganaste ',
        alert_coins: ' monedas.',
        store_title: '🏪 Tienda de Objetos',
        store_balance: 'Tu saldo:',
        item_potion_name: 'Poción de Tiempo',
        item_potion_desc: 'Añade +15 segundos al temporizador',
        item_shield_name: 'Escudo Protector',
        item_shield_desc: 'Evita la penalización al fallar una respuesta',
        item_theme_space_name: 'Modo Espacial',
        item_theme_space_desc: 'Tema visual con estrellas',
        item_theme_jungle_name: 'Modo Selva',
        item_theme_jungle_desc: 'Tema visual con plátanos',
        item_owned: 'Tienes: ',
        btn_buy: 'Comprar',
        btn_equipped: 'Equipado',
        btn_equip: 'Equipar',
        alert_not_enough_coins: '¡No tienes suficientes monedas!',
        alert_purchase_success: '¡Compra realizada! 🎉',
        alert_shield_used: '¡Escudo usado! 🛡️',
        alert_no_potions: '¡No tienes pociones!',
        alert_potion_used: '¡Poción usada! +15s ⏰'
    },
    gl: {
        app_title: '🚀 MateAventura',
        input_player_name: 'Nome do xogador...',
        btn_add: '+ Engadir',
        btn_duel_mode: '🏆 MODO DUELO',
        btn_open_store: '🏪 TENDA',
        hall_of_fame_title: '👑 Salón da Fama',
        hall_of_fame_empty: 'Ninguén no podio aínda!',
        config_title: 'Configuración',
        config_title_user: 'Configuración: ',
        choose_operations: 'Escolle as operacións:',
        op_addition: 'Sumas',
        op_subtraction: 'Restas',
        op_multiplication: 'Multiplicacións',
        btn_play: '¡A XOGAR!',
        btn_change_user: '⬅ Cambiar de usuario',
        btn_close_store: '⬅ Pechar',
        label_level: 'Nivel',
        turn_of: '🏆 Quenda de: ',
        btn_play_user: '▶️ Xogar',
        alert_invalid_name: 'Nome non válido ou xa existe',
        alert_choose_operation: 'Escolle unha operación',
        alert_min_users: 'Necesítanse polo menos 2 usuarios',
        alert_duel_end: '🏁 FIN DO DUELO\n',
        alert_good_job: 'Bo traballo! Gañaches ',
        alert_coins: ' moedas.',
        store_title: '🏪 Tenda de Obxectos',
        store_balance: 'O teu saldo:',
        item_potion_name: 'Poción de Tempo',
        item_potion_desc: 'Engade +15 segundos ao temporizador',
        item_shield_name: 'Escudo Protector',
        item_shield_desc: 'Evita a penalización ao fallar unha resposta',
        item_theme_space_name: 'Modo Espacial',
        item_theme_space_desc: 'Tema visual con estrelas',
        item_theme_jungle_name: 'Modo Selva',
        item_theme_jungle_desc: 'Tema visual con plátanos',
        item_owned: 'Tes: ',
        btn_buy: 'Comprar',
        btn_equipped: 'Equipado',
        btn_equip: 'Equipar',
        alert_not_enough_coins: '¡Non tes suficientes moedas!',
        alert_purchase_success: '¡Compra realizada! 🎉',
        alert_shield_used: '¡Escudo usado! 🛡️',
        alert_no_potions: '¡Non tes pocións!',
        alert_potion_used: '¡Poción usada! +15s ⏰'
    }
};

// Variables globales
let currentLanguage = localStorage.getItem('math_lang') || 'es';
let users = JSON.parse(localStorage.getItem('math_users')) || {};
let currentUser = null;
let duelMode = false;
let duelPlayers = [];
let duelScores = {};
let currentDuelIdx = 0;
let gameCoins = 0, gameLevel = 1, timeLeft = 30, timerInterval, currentAnswer = 0;

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
            shields: 0,
            themes: []
        };
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
    return translations[currentLanguage][key] || translations['es'][key] || key;
}

/**
 * Cambia el idioma de la aplicación
 * @param {string} lang - Código de idioma (es/gl)
 */
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('math_lang', lang);
    document.getElementById('html-root').setAttribute('lang', lang);

    // Actualizar estilos de botones de idioma
    document.getElementById('btn-lang-es').style.borderColor = lang === 'es' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-es').style.background = lang === 'es' ? '#f0f7ff' : 'white';
    document.getElementById('btn-lang-gl').style.borderColor = lang === 'gl' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-gl').style.background = lang === 'gl' ? '#f0f7ff' : 'white';

    // Actualizar todos los textos
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = t(key);
    });

    // Actualizar placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

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
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-config').classList.add('active');
}

/**
 * Inicia una partida individual
 */
function startSingleGame() {
    duelMode = false;
    users[currentUser].ops = [];
    if (document.getElementById('cfg-sum').checked) users[currentUser].ops.push('+');
    if (document.getElementById('cfg-res').checked) users[currentUser].ops.push('-');
    if (document.getElementById('cfg-mul').checked) users[currentUser].ops.push('*');
    if (!users[currentUser].ops.length) return alert(t('alert_choose_operation'));
    localStorage.setItem('math_users', JSON.stringify(users));
    initGameSession(users[currentUser].level, 0);
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
    initGameSession(users[currentUser].level, 0);
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
    applyTheme();
    
    generateQuestion();
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
    while (opts.size < 4) opts.add(currentAnswer + (Math.floor(Math.random() * 10) - 5));
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
        users[currentUser].level = gameLevel;
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
                ${isEquipped ? `<button class="btn-buy" disabled>${t('btn_equipped')}</button>` :
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
    users[currentUser].currentTheme = themeId;
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
 * Updates the power-up display in game
 */
function updatePowerUpDisplay() {
    initInventory(users[currentUser]);
    
    const potionBtn = document.getElementById('btn-use-potion');
    const potionCount = document.getElementById('potion-count');
    const shieldIndicator = document.getElementById('shield-indicator');
    const shieldCount = document.getElementById('shield-count');
    
    potionCount.innerText = users[currentUser].inventory.potions;
    shieldCount.innerText = users[currentUser].inventory.shields;
    
    potionBtn.disabled = users[currentUser].inventory.potions <= 0;
    
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

// Inicializar idioma al cargar
changeLanguage(currentLanguage);

// Initialize inventory for all existing users
Object.keys(users).forEach(userName => {
    initInventory(users[userName]);
});
localStorage.setItem('math_users', JSON.stringify(users));

showUsers();
