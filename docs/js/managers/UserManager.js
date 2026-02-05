/**
 * UserManager - Gestión de usuarios del juego
 * Responsable de CRUD de usuarios, leaderboard, inventarios y persistencia
 */
class UserManager {
    constructor(translationManager) {
        this.translationManager = translationManager;
        this.users = JSON.parse(localStorage.getItem('math_users')) || {};
        this.currentUser = null;
    }

    /**
     * Inicializa el inventario de un usuario si no existe
     * @param {Object} user - Usuario a inicializar
     */
    initInventory(user) {
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
        // Inicializar categorías de problemas (por defecto solo Explorador)
        if (!user.problemCategories || !Array.isArray(user.problemCategories)) {
            user.problemCategories = ['explorador'];
        }
    }

    /**
     * Normaliza la estructura de usuarios (migraciones)
     */
    normalizeUsers() {
        let changed = false;

        Object.keys(this.users).forEach(userName => {
            const user = this.users[userName];
            const beforeInventory = user.inventory ? JSON.stringify(user.inventory) : null;
            const beforeTheme = user.currentTheme;

            if (typeof user.level !== 'number' || Number.isNaN(user.level)) {
                user.level = 1;
                changed = true;
            }

            this.initInventory(user);

            const afterInventory = JSON.stringify(user.inventory);
            if (beforeInventory !== afterInventory || beforeTheme !== user.currentTheme) {
                changed = true;
            }
        });

        if (changed) {
            this.saveToStorage();
        }
    }

    /**
     * Sincroniza el estado desde localStorage
     */
    syncStateFromStorage() {
        const storedUsers = localStorage.getItem('math_users');
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
            this.normalizeUsers();
        }
    }

    /**
     * Guarda usuarios en localStorage
     */
    saveToStorage() {
        localStorage.setItem('math_users', JSON.stringify(this.users));
    }

    /**
     * Muestra la pantalla de usuarios
     */
    showUsers() {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-users').classList.add('active');
        this.renderUserList();
        this.renderLeaderboard();
    }

    /**
     * Renderiza la lista de usuarios
     */
    renderUserList() {
        const list = document.getElementById('user-list');
        if (!list) return;

        // Actualizar el texto del título según si hay usuarios o no
        const introText = document.querySelector('.intro-text[data-i18n]');
        if (introText) {
            const userCount = Object.keys(this.users).length;
            if (userCount === 0) {
                introText.setAttribute('data-i18n', 'intro_create_player');
                introText.innerText = this.translationManager.t('intro_create_player');
            } else {
                introText.setAttribute('data-i18n', 'intro_create_new_player');
                introText.innerText = this.translationManager.t('intro_create_new_player');
            }
        }

        list.innerHTML = "";
        for (let name in this.users) {
            list.innerHTML += `
            <div class="user-card">
                <div class="user-info" onclick="userManager.selectUser('${name}')">
                    <span><strong>${name}</strong> (Lvl ${this.users[name].level})</span>
                    <span>💰 ${this.users[name].totalCoins}</span>
                </div>
                <button class="btn-play-user" onclick="event.stopPropagation(); userManager.selectUser('${name}')" data-i18n="btn_play_user">▶️ Jugar</button>
            </div>`;
        }
        // Actualizar traducciones de los botones recién creados
        document.querySelectorAll('[data-i18n="btn_play_user"]').forEach(el => {
            el.innerHTML = this.translationManager.t('btn_play_user');
        });
    }

    /**
     * Renderiza el salón de la fama (top 3 usuarios)
     */
    renderLeaderboard() {
        const list = document.getElementById('leader-list');
        if (!list) return;

        const sorted = Object.keys(this.users)
            .sort((a, b) => this.users[b].totalCoins - this.users[a].totalCoins)
            .slice(0, 3);

        list.innerHTML = sorted.length ? "" : `<small>${this.translationManager.t('hall_of_fame_empty')}</small>`;
        sorted.forEach((name, i) => {
            const icons = ['🥇', '🥈', '🥉'];
            list.innerHTML += `<div class="leader-item"><span>${icons[i]} ${name}</span><strong>${this.users[name].totalCoins}</strong></div>`;
        });
    }

    /**
     * Crea un nuevo usuario
     */
    createUser() {
        const nameInput = document.getElementById('new-user-name');
        if (!nameInput) return;

        const name = nameInput.value.trim();
        if (!name || this.users[name]) {
            return alert(this.translationManager.t('alert_invalid_name'));
        }

        this.users[name] = {
            level: 1,
            totalCoins: 0,
            ops: ['+'],
            inventory: { potions: 0, freezes: 0, shields: 0, themes: [] },
            currentTheme: 'default',
            problemCategories: ['explorador'] // Por defecto nivel fácil
        };

        this.saveToStorage();
        nameInput.value = "";
        this.renderUserList();
    }

    /**
     * Selecciona un usuario y muestra su configuración
     * @param {string} name - Nombre del usuario
     */
    selectUser(name) {
        this.currentUser = name;

        const configTitle = document.getElementById('config-title');
        const cfgSum = document.getElementById('cfg-sum');
        const cfgRes = document.getElementById('cfg-res');
        const cfgMul = document.getElementById('cfg-mul');
        const editSection = document.getElementById('username-edit-section');
        const editBtn = document.getElementById('btn-edit-username');
        const editInput = document.getElementById('edit-user-name');

        if (configTitle) {
            configTitle.innerText = this.translationManager.t('config_title_user') + name;
        }

        if (cfgSum) cfgSum.checked = this.users[name].ops.includes('+');
        if (cfgRes) cfgRes.checked = this.users[name].ops.includes('-');
        if (cfgMul) cfgMul.checked = this.users[name].ops.includes('*');
        const cfgDiv = document.getElementById('cfg-div');
        if (cfgDiv) cfgDiv.checked = this.users[name].ops.includes('/');

        // Reset edit name section
        if (editSection) editSection.style.display = 'none';
        if (editBtn) editBtn.style.display = 'block';
        if (editInput) editInput.value = '';

        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const configScreen = document.getElementById('screen-config');
        if (configScreen) configScreen.classList.add('active');

        // Renderizar categorías de problemas después de cambiar de pantalla
        if (typeof renderProblemCategories === 'function') {
            setTimeout(() => renderProblemCategories(), 0);
        }
    }

    /**
     * Muestra el formulario de edición de nombre
     */
    showEditName() {
        const editSection = document.getElementById('username-edit-section');
        const editBtn = document.getElementById('btn-edit-username');
        const editInput = document.getElementById('edit-user-name');

        if (editSection) editSection.style.display = 'block';
        if (editBtn) editBtn.style.display = 'none';
        if (editInput) {
            editInput.value = this.currentUser;
            editInput.focus();
        }
    }

    /**
     * Cancela la edición del nombre
     */
    cancelEditName() {
        const editSection = document.getElementById('username-edit-section');
        const editBtn = document.getElementById('btn-edit-username');
        const editInput = document.getElementById('edit-user-name');

        if (editSection) editSection.style.display = 'none';
        if (editBtn) editBtn.style.display = 'block';
        if (editInput) editInput.value = '';
    }

    /**
     * Guarda el nuevo nombre del usuario
     */
    saveUserName() {
        const editInput = document.getElementById('edit-user-name');
        if (!editInput) return;

        const newName = editInput.value.trim();
        const oldName = this.currentUser;

        // Validar que el nombre no esté vacío
        if (!newName) {
            return alert(this.translationManager.t('alert_invalid_name'));
        }

        // Si el nombre no cambió, cancelar
        if (newName === oldName) {
            this.cancelEditName();
            return;
        }

        // Validar que el nombre no exista ya
        if (this.users[newName]) {
            return alert(this.translationManager.t('alert_invalid_name'));
        }

        // Copiar datos del usuario con el nuevo nombre (copia profunda)
        this.users[newName] = JSON.parse(JSON.stringify(this.users[oldName]));

        // Eliminar el usuario con el nombre antiguo
        delete this.users[oldName];

        // Guardar en localStorage
        this.saveToStorage();

        // Actualizar currentUser
        this.currentUser = newName;

        // Actualizar la interfaz
        const configTitle = document.getElementById('config-title');
        if (configTitle) {
            configTitle.innerText = this.translationManager.t('config_title_user') + newName;
        }

        this.cancelEditName();

        // Mostrar mensaje de confirmación
        alert(this.translationManager.t('alert_name_updated'));

        // Actualizar la lista de usuarios
        this.renderUserList();
        this.renderLeaderboard();
    }

    /**
     * Actualiza la visualización del récord del jugador
     * @param {number} gameLevel - Nivel actual del juego
     */
    updateRecordDisplay(gameLevel) {
        const recordEl = document.getElementById('game-record');
        if (!recordEl || !this.currentUser) return;

        const userRecord = typeof this.users[this.currentUser].level === 'number'
            ? this.users[this.currentUser].level
            : 1;
        const displayRecord = Math.max(userRecord, gameLevel);
        recordEl.innerText = displayRecord;
    }

    /**
     * Obtiene las categorías de problemas del usuario actual
     * @returns {Array<string>}
     */
    getProblemCategories() {
        if (!this.currentUser || !this.users[this.currentUser]) {
            return ['explorador']; // Default
        }
        const categories = this.users[this.currentUser].problemCategories;
        return Array.isArray(categories) && categories.length > 0
            ? categories
            : ['explorador'];
    }

    /**
     * Actualiza las categorías de problemas del usuario actual
     * @param {Array<string>} categories - Array de IDs de categorías
     */
    setProblemCategories(categories) {
        if (!this.currentUser || !this.users[this.currentUser]) return;

        this.users[this.currentUser].problemCategories = Array.isArray(categories)
            ? categories
            : [];
        this.saveToStorage();
    }

    /**
     * Alterna una categoría de problemas (añadir/quitar)
     * @param {string} categoryId - ID de la categoría
     */
    toggleProblemCategory(categoryId) {
        if (!this.currentUser || !this.users[this.currentUser]) return;

        const categories = this.getProblemCategories();
        const index = categories.indexOf(categoryId);

        if (index > -1) {
            // Quitar categoría
            categories.splice(index, 1);
        } else {
            // Añadir categoría
            categories.push(categoryId);
        }

        this.setProblemCategories(categories);
    }

    /**
     * Obtiene el objeto del usuario actual
     * @returns {Object|null}
     */
    getCurrentUser() {
        return this.currentUser ? this.users[this.currentUser] : null;
    }

    /**
     * Obtiene el nombre del usuario actual
     * @returns {string|null}
     */
    getCurrentUserName() {
        return this.currentUser;
    }

    /**
     * Obtiene todos los usuarios
     * @returns {Object}
     */
    getUsers() {
        return this.users;
    }

    /**
     * Sincroniza datos remotos con el usuario local
     * @param {Object} remoteData - Datos recibidos del servidor
     */
    mergeUserData(remoteData) {
        if (!this.currentUser || !this.users[this.currentUser]) return;

        // Si no hay datos remotos, no hacemos nada
        if (!remoteData) return;

        // Actualizar datos del usuario actual con los del servidor
        // Como el servidor ya hizo el merge inteligente, confiamos en sus datos
        const user = this.users[this.currentUser];

        // Mezclar propiedades base
        if (typeof remoteData.level === 'number') user.level = remoteData.level;
        if (typeof remoteData.totalCoins === 'number') user.totalCoins = remoteData.totalCoins;

        // Ops se prefiere local si existe, sino remoto
        if (remoteData.ops && !user.ops) user.ops = remoteData.ops;

        // Inventario
        if (remoteData.inventory) {
            user.inventory = remoteData.inventory;
        }

        // Categorías
        if (remoteData.problemCategories) {
            user.problemCategories = remoteData.problemCategories;
        }

        // Tema
        if (remoteData.currentTheme) {
            user.currentTheme = remoteData.currentTheme;
        }

        // Estadísticas
        if (remoteData.achievementStats) {
            user.achievementStats = remoteData.achievementStats;
        }

        // Logros
        if (remoteData.achievements) {
            user.achievements = remoteData.achievements;
        }

        // Guardar cambios
        this.saveToStorage();
        console.log('Datos de usuario sincronizados con el servidor');
    }
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserManager;
}

// Hacer disponible globalmente para navegadores y eval() en tests
if (typeof window !== 'undefined') {
    window.UserManager = UserManager;
}
