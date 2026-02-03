/**
 * StoreManager - Gestión de la tienda y power-ups
 * Responsable de compras, inventario, temas y consumibles
 */
class StoreManager {
    constructor(userManager, translationManager) {
        this.userManager = userManager;
        this.translationManager = translationManager;
        this.storeItems = [
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
    }

    /**
     * Abre la modal de la tienda
     */
    openStore() {
        const currentUser = this.userManager.getCurrentUserName();

        if (!currentUser) {
            const users = this.userManager.getUsers();
            const userNames = Object.keys(users);

            if (userNames.length === 0) {
                alert('Por favor, crea un jugador antes de entrar en la tienda.\nPor favor, crea un xogador antes de entrar na tenda.');
                return;
            }
            alert('Por favor, selecciona un jugador antes de entrar en la tienda.\nPor favor, selecciona un xogador antes de entrar na tenda.');
            return;
        }

        const user = this.userManager.getCurrentUser();
        this.userManager.initInventory(user);

        const modal = document.getElementById('store-modal');
        if (modal) {
            modal.classList.add('active');
        }

        this.renderStore();
    }

    /**
     * Cierra la modal de la tienda
     */
    closeStore() {
        const modal = document.getElementById('store-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    /**
     * Renderiza los items de la tienda
     */
    renderStore() {
        const container = document.getElementById('store-items');
        const balance = document.getElementById('store-balance');

        if (!container || !balance) return;

        const user = this.userManager.getCurrentUser();
        if (!user) return;

        balance.innerText = user.totalCoins;
        container.innerHTML = '';

        this.storeItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'store-item';

            let owned = 0;
            let isOwned = false;
            let isEquipped = false;

            if (item.type === 'consumable') {
                if (item.id === 'potion') owned = user.inventory.potions;
                if (item.id === 'freeze') owned = user.inventory.freezes;
                if (item.id === 'shield') owned = user.inventory.shields;
            } else if (item.type === 'theme') {
                isOwned = user.inventory.themes.includes(item.id);
                isEquipped = user.currentTheme === item.id;
            }

            const canBuy = user.totalCoins >= item.price;
            if (!canBuy && !isOwned) {
                itemDiv.classList.add('locked');
            }

            const t = (key) => this.translationManager.t(key);

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
                    ${isEquipped ? `<button class="btn-buy" onclick="storeManager.unequipTheme()">${t('btn_unequip')}</button>` :
                    isOwned && item.type === 'theme' ? `<button class="btn-buy" onclick="storeManager.equipTheme('${item.id}')">${t('btn_equip')}</button>` :
                        `<button class="btn-buy" onclick="storeManager.buyItem('${item.id}')" ${!canBuy ? 'disabled' : ''}>${t('btn_buy')}</button>`}
                </div>
            `;

            container.appendChild(itemDiv);
        });
    }

    /**
     * Compra un item de la tienda
     * @param {string} itemId - ID del item a comprar
     */
    buyItem(itemId) {
        const item = this.storeItems.find(i => i.id === itemId);
        if (!item) return;

        const user = this.userManager.getCurrentUser();
        if (!user) return;

        this.userManager.initInventory(user);

        // Verificar si tiene suficientes monedas
        if (user.totalCoins < item.price) {
            alert(this.translationManager.t('alert_not_enough_coins'));
            return;
        }

        // Descontar monedas
        user.totalCoins -= item.price;

        // Añadir item al inventario
        if (item.type === 'consumable') {
            if (item.id === 'potion') {
                user.inventory.potions++;
            } else if (item.id === 'freeze') {
                user.inventory.freezes++;
            } else if (item.id === 'shield') {
                user.inventory.shields++;
            }
        } else if (item.type === 'theme') {
            if (!user.inventory.themes.includes(item.id)) {
                user.inventory.themes.push(item.id);
            }
        }

        // Guardar en localStorage
        this.userManager.saveToStorage();

        // Feedback visual
        const balance = document.getElementById('store-balance');
        if (balance && balance.parentElement) {
            balance.parentElement.classList.add('coin-flash');
            setTimeout(() => {
                balance.parentElement.classList.remove('coin-flash');
            }, 500);
        }

        // Sonido de compra (usando confetti)
        try {
            confetti({ particleCount: 50, spread: 70, colors: ['#f1c40f', '#27ae60'] });
        } catch (e) {
            // Confetti no cargado
        }

        // Mostrar mensaje de éxito
        this.showFeedbackMessage(this.translationManager.t('alert_purchase_success'));

        // Re-renderizar tienda
        this.renderStore();
        this.userManager.renderUserList();
    }

    /**
     * Equipa un tema
     * @param {string} themeId - ID del tema a equipar
     */
    equipTheme(themeId) {
        const user = this.userManager.getCurrentUser();
        if (!user) return;

        this.userManager.initInventory(user);

        // Solo permitir equipar temas que el usuario posee
        if (!user.inventory || !Array.isArray(user.inventory.themes) || !user.inventory.themes.includes(themeId)) {
            return;
        }

        user.currentTheme = themeId;
        this.userManager.saveToStorage();
        this.renderStore();
    }

    /**
     * Desequipa el tema actual y vuelve al default
     */
    unequipTheme() {
        const user = this.userManager.getCurrentUser();
        if (!user) return;

        this.userManager.initInventory(user);
        user.currentTheme = 'default';
        this.userManager.saveToStorage();
        this.renderStore();
    }

    /**
     * Usa una poción de tiempo durante el juego
     * @param {Object} gameState - Estado del juego { timeLeft, timerElement, updateDisplay, showFeedback }
     */
    usePotion(gameState) {
        const user = this.userManager.getCurrentUser();
        if (!user) return false;

        this.userManager.initInventory(user);

        if (user.inventory.potions <= 0) {
            alert(this.translationManager.t('alert_no_potions'));
            return false;
        }

        // Consumir poción
        user.inventory.potions--;
        this.userManager.saveToStorage();

        // Añadir tiempo
        gameState.timeLeft += 15;
        if (gameState.timerElement) {
            gameState.timerElement.innerText = gameState.timeLeft + "s";
        }

        // Actualizar display
        if (gameState.updateDisplay) {
            gameState.updateDisplay();
        }

        // Feedback visual
        this.showFeedbackMessage(this.translationManager.t('alert_potion_used'));
        try {
            confetti({ particleCount: 30, spread: 60, colors: ['#3498db', '#9b59b6'] });
        } catch (e) {
            // Confetti no cargado
        }

        return true;
    }

    /**
     * Usa un congelador de tiempo durante el juego
     * @param {Object} gameState - Estado del juego { timerInterval, freezeTimeout, startTimer }
     * @returns {Object} Nuevo estado { timerInterval, freezeTimeout }
     */
    useFreezeTime(gameState) {
        const user = this.userManager.getCurrentUser();
        if (!user) return { ...(gameState || {}), used: false };

        this.userManager.initInventory(user);

        if (user.inventory.freezes <= 0) {
            alert(this.translationManager.t('alert_no_freezes'));
            return { ...(gameState || {}), used: false };
        }

        // Consumir freeze
        user.inventory.freezes--;
        this.userManager.saveToStorage();

        // Pausar timer
        if (gameState.timerInterval) {
            clearInterval(gameState.timerInterval);
        }

        // Limpiar timeout pendiente
        if (gameState.freezeTimeout) {
            clearTimeout(gameState.freezeTimeout);
        }

        // Feedback visual
        this.showFeedbackMessage(this.translationManager.t('alert_freeze_used'));
        try {
            confetti({ particleCount: 40, spread: 80, colors: ['#00d4ff', '#ffffff', '#a8e6ff'] });
        } catch (e) {
            // Confetti no cargado
        }

        // Actualizar display
        this.updatePowerUpDisplay();

        // Reanudar timer después de 5 segundos
        const newFreezeTimeout = setTimeout(() => {
            if (gameState.startTimer) {
                gameState.startTimer();
            }
        }, 5000);

        return {
            timerInterval: null,
            freezeTimeout: newFreezeTimeout,
            used: true
        };
    }

    /**
     * Actualiza el display de power-ups en el juego
     */
    updatePowerUpDisplay() {
        const user = this.userManager.getCurrentUser();
        if (!user) return;

        this.userManager.initInventory(user);

        const potionBtn = document.getElementById('btn-use-potion');
        const potionCount = document.getElementById('potion-count');
        const freezeBtn = document.getElementById('btn-use-freeze');
        const freezeCount = document.getElementById('freeze-count');
        const shieldIndicator = document.getElementById('shield-indicator');
        const shieldCount = document.getElementById('shield-count');

        if (potionCount) potionCount.innerText = user.inventory.potions;
        if (freezeCount) freezeCount.innerText = user.inventory.freezes;
        if (shieldCount) shieldCount.innerText = user.inventory.shields;

        if (potionBtn) potionBtn.disabled = user.inventory.potions <= 0;
        if (freezeBtn) freezeBtn.disabled = user.inventory.freezes <= 0;

        if (shieldIndicator) {
            if (user.inventory.shields > 0) {
                shieldIndicator.classList.add('active');
            } else {
                shieldIndicator.classList.remove('active');
            }
        }
    }

    /**
     * Aplica el tema actual a los elementos visuales
     */
    applyTheme() {
        const user = this.userManager.getCurrentUser();
        if (!user) return;

        this.userManager.initInventory(user);
        const theme = user.currentTheme;

        const appContainer = document.getElementById('app-container');
        if (!appContainer) return;

        if (theme === 'theme_space') {
            appContainer.setAttribute('data-theme', 'space');
        } else if (theme === 'theme_jungle') {
            appContainer.setAttribute('data-theme', 'jungle');
        } else {
            appContainer.removeAttribute('data-theme');
        }
    }

    /**
     * Muestra un mensaje de feedback en pantalla
     * @param {string} message - Mensaje a mostrar
     */
    showFeedbackMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.style.position = 'fixed';
        msgDiv.style.top = '50%';
        msgDiv.style.left = '50%';
        msgDiv.style.transform = 'translate(-50%, -50%)';
        msgDiv.style.zIndex = '2000';
        msgDiv.style.pointerEvents = 'none';

        const msgContent = document.createElement('div');
        msgContent.style.background = 'rgba(39, 174, 96, 0.85)';
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
     * Obtiene los items de la tienda
     * @returns {Array}
     */
    getStoreItems() {
        return this.storeItems;
    }
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StoreManager;
}

// Hacer disponible globalmente para navegadores y eval() en tests
if (typeof window !== 'undefined') {
    window.StoreManager = StoreManager;
}
