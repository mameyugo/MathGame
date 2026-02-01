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
        btn_help: '📚 Ayuda',
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
        label_level: 'Nivel',
        turn_of: '🏆 Turno de: ',
        btn_play_user: '▶️ Jugar',
        alert_invalid_name: 'Nombre no válido o ya existe',
        alert_choose_operation: 'Elige una operación',
        alert_min_users: 'Se necesitan al menos 2 usuarios',
        alert_duel_end: '🏁 FIN DEL DUELO\n',
        alert_good_job: '¡Buen trabajo! Ganaste ',
        alert_coins: ' monedas.'
    },
    gl: {
        app_title: '🚀 MateAventura',
        input_player_name: 'Nome do xogador...',
        btn_add: '+ Engadir',
        btn_duel_mode: '🏆 MODO DUELO',
        btn_help: '📚 Axuda',
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
        label_level: 'Nivel',
        turn_of: '🏆 Quenda de: ',
        btn_play_user: '▶️ Xogar',
        alert_invalid_name: 'Nome non válido ou xa existe',
        alert_choose_operation: 'Escolle unha operación',
        alert_min_users: 'Necesítanse polo menos 2 usuarios',
        alert_duel_end: '🏁 FIN DO DUELO\n',
        alert_good_job: 'Bo traballo! Gañaches ',
        alert_coins: ' moedas.'
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
    users[name] = { level: 1, totalCoins: 0, ops: ['+'] };
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
    for (let i = 0; i < tens; i++) div.innerHTML += '<div class="ten-block">📦x10</div>';
    for (let i = 0; i < units; i++) div.innerHTML += '<span class="unit">🍎</span>';
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
        confetti({ particleCount: 30, spread: 50 });
        if (gameCoins % 50 === 0) gameLevel++;
        generateQuestion();
    } else {
        document.getElementById('app-container').classList.add('shake');
        setTimeout(() => document.getElementById('app-container').classList.remove('shake'), 400);
        timeLeft -= 4;
    }
    document.getElementById('game-level').innerText = gameLevel;
    document.getElementById('game-coins').innerText = gameCoins;
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

// Inicializar idioma al cargar
changeLanguage(currentLanguage);
showUsers();
