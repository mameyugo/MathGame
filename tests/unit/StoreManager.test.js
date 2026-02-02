const StoreManager = require('../../docs/js/managers/StoreManager');

describe('StoreManager', () => {
    let manager;
    let mockUserManager;
    let mockTranslationManager;

    beforeEach(() => {
        // Mock UserManager
        mockUserManager = {
            getCurrentUserName: jest.fn(() => 'Alice'),
            getCurrentUser: jest.fn(() => ({
                totalCoins: 200,
                inventory: { potions: 2, freezes: 1, shields: 0, themes: ['theme_space'] },
                currentTheme: 'default'
            })),
            getUsers: jest.fn(() => ({ Alice: {} })),
            initInventory: jest.fn(),
            saveToStorage: jest.fn(),
            renderUserList: jest.fn()
        };

        // Mock TranslationManager
        mockTranslationManager = {
            t: jest.fn((key) => key)
        };

        // Mock document
        const mockElement = {
            style: {},
            classList: { add: jest.fn(), remove: jest.fn() },
            appendChild: jest.fn(),
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
            innerText: '',
            remove: jest.fn()
        };
        
        global.document = {
            getElementById: jest.fn(),
            createElement: jest.fn(() => mockElement),
            body: { appendChild: jest.fn() }
        };

        // Mock alert
        global.alert = jest.fn();

        // Mock confetti
        global.confetti = jest.fn();

        manager = new StoreManager(mockUserManager, mockTranslationManager);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Constructor', () => {
        test('should initialize with store items', () => {
            expect(manager.storeItems).toBeDefined();
            expect(manager.storeItems.length).toBe(5);
        });

        test('should have consumable items', () => {
            const consumables = manager.storeItems.filter(i => i.type === 'consumable');
            expect(consumables.length).toBe(3);
            expect(consumables.map(i => i.id)).toEqual(['potion', 'freeze', 'shield']);
        });

        test('should have theme items', () => {
            const themes = manager.storeItems.filter(i => i.type === 'theme');
            expect(themes.length).toBe(2);
            expect(themes.map(i => i.id)).toEqual(['theme_space', 'theme_jungle']);
        });
    });

    describe('openStore', () => {
        test('should open store modal when user is selected', () => {
            const mockModal = { classList: { add: jest.fn() } };
            global.document.getElementById = jest.fn(() => mockModal);
            manager.renderStore = jest.fn();

            manager.openStore();

            expect(mockUserManager.initInventory).toHaveBeenCalled();
            expect(mockModal.classList.add).toHaveBeenCalledWith('active');
            expect(manager.renderStore).toHaveBeenCalled();
        });

        test('should alert if no users exist', () => {
            mockUserManager.getCurrentUserName.mockReturnValue(null);
            mockUserManager.getUsers.mockReturnValue({});

            manager.openStore();

            expect(alert).toHaveBeenCalled();
        });

        test('should alert if no user is selected but users exist', () => {
            mockUserManager.getCurrentUserName.mockReturnValue(null);
            mockUserManager.getUsers.mockReturnValue({ Bob: {} });

            manager.openStore();

            expect(alert).toHaveBeenCalled();
        });
    });

    describe('closeStore', () => {
        test('should close store modal', () => {
            const mockModal = { classList: { remove: jest.fn() } };
            global.document.getElementById = jest.fn(() => mockModal);

            manager.closeStore();

            expect(mockModal.classList.remove).toHaveBeenCalledWith('active');
        });
    });

    describe('renderStore', () => {
        test('should render store items', () => {
            const mockContainer = { innerHTML: '', appendChild: jest.fn() };
            const mockBalance = { innerText: '' };
            global.document.getElementById = jest.fn((id) => {
                if (id === 'store-items') return mockContainer;
                if (id === 'store-balance') return mockBalance;
                return null;
            });

            manager.renderStore();

            expect(mockBalance.innerText).toBe(200);
            expect(mockContainer.appendChild).toHaveBeenCalledTimes(5);
        });

        test('should handle missing elements gracefully', () => {
            global.document.getElementById = jest.fn(() => null);

            expect(() => manager.renderStore()).not.toThrow();
        });
    });

    describe('buyItem', () => {
        test('should purchase potion successfully', () => {
            const user = {
                totalCoins: 200,
                inventory: { potions: 2, freezes: 1, shields: 0, themes: [] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);

            manager.buyItem('potion');

            expect(user.totalCoins).toBe(150); // 200 - 50
            expect(user.inventory.potions).toBe(3); // 2 + 1
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
        });

        test('should purchase freeze successfully', () => {
            const user = {
                totalCoins: 200,
                inventory: { potions: 2, freezes: 1, shields: 0, themes: [] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);

            manager.buyItem('freeze');

            expect(user.totalCoins).toBe(180); // 200 - 20
            expect(user.inventory.freezes).toBe(2); // 1 + 1
        });

        test('should purchase shield successfully', () => {
            const user = {
                totalCoins: 200,
                inventory: { potions: 2, freezes: 1, shields: 0, themes: [] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);

            manager.buyItem('shield');

            expect(user.totalCoins).toBe(100); // 200 - 100
            expect(user.inventory.shields).toBe(1); // 0 + 1
        });

        test('should purchase theme successfully', () => {
            const user = {
                totalCoins: 200,
                inventory: { potions: 2, freezes: 1, shields: 0, themes: ['theme_space'] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);

            manager.buyItem('theme_jungle');

            expect(user.totalCoins).toBe(0); // 200 - 200
            expect(user.inventory.themes).toContain('theme_jungle');
        });

        test('should not purchase if insufficient coins', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                totalCoins: 10,
                inventory: { potions: 0, freezes: 0, shields: 0, themes: [] }
            });

            manager.buyItem('potion');

            expect(alert).toHaveBeenCalled();
            expect(mockUserManager.saveToStorage).not.toHaveBeenCalled();
        });

        test('should not purchase invalid item', () => {
            manager.buyItem('invalid_item');
            expect(mockUserManager.saveToStorage).not.toHaveBeenCalled();
        });
    });

    describe('equipTheme', () => {
        test('should equip owned theme', () => {
            const user = {
                currentTheme: 'default',
                inventory: { themes: ['theme_space'] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);
            manager.renderStore = jest.fn();

            manager.equipTheme('theme_space');

            expect(user.currentTheme).toBe('theme_space');
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
            expect(manager.renderStore).toHaveBeenCalled();
        });

        test('should not equip unowned theme', () => {
            const user = mockUserManager.getCurrentUser();
            const originalTheme = user.currentTheme;

            manager.equipTheme('theme_jungle');

            expect(user.currentTheme).toBe(originalTheme);
            expect(mockUserManager.saveToStorage).not.toHaveBeenCalled();
        });
    });

    describe('unequipTheme', () => {
        test('should unequip theme and revert to default', () => {
            const user = {
                currentTheme: 'theme_space',
                inventory: {}
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);
            manager.renderStore = jest.fn();

            manager.unequipTheme();

            expect(user.currentTheme).toBe('default');
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
        });
    });

    describe('usePotion', () => {
        test('should consume potion and add time', () => {
            const user = {
                inventory: { potions: 2, freezes: 1, shields: 0, themes: [] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);
            
            const gameState = {
                timeLeft: 30,
                timerElement: { innerText: '' },
                updateDisplay: jest.fn()
            };

            manager.usePotion(gameState);

            expect(user.inventory.potions).toBe(1); // 2 - 1
            expect(gameState.timeLeft).toBe(45); // 30 + 15
            expect(gameState.timerElement.innerText).toBe('45s');
            expect(gameState.updateDisplay).toHaveBeenCalled();
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
        });

        test('should not use potion if none available', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                inventory: { potions: 0 }
            });

            const gameState = { timeLeft: 30 };
            manager.usePotion(gameState);

            expect(alert).toHaveBeenCalled();
            expect(mockUserManager.saveToStorage).not.toHaveBeenCalled();
        });
    });

    describe('useFreezeTime', () => {
        test('should consume freeze and pause timer', () => {
            // Fresh user object for this test
            const user = {
                inventory: { potions: 2, freezes: 1, shields: 0, themes: [] }
            };
            mockUserManager.getCurrentUser.mockReturnValue(user);
            
            const mockInterval = 123;
            const gameState = {
                timerInterval: mockInterval,
                freezeTimeout: null,
                startTimer: jest.fn()
            };

            global.clearInterval = jest.fn();
            const originalSetTimeout = global.setTimeout;
            let freezeTimeoutId = null;
            global.setTimeout = jest.fn((fn, delay) => {
                // Solo capturamos el setTimeout del freeze (5000ms)
                if (delay === 5000) {
                    freezeTimeoutId = 456;
                    return 456;
                }
                // Otros setTimeout (como showFeedbackMessage) se ignoran
                return originalSetTimeout(fn, delay);
            });

            const result = manager.useFreezeTime(gameState);

            expect(user.inventory.freezes).toBe(0); // 1 - 1
            expect(clearInterval).toHaveBeenCalledWith(mockInterval);
            expect(result.timerInterval).toBeNull();
            expect(result.freezeTimeout).toBe(456);
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
            
            global.setTimeout = originalSetTimeout;
        });

        test('should not use freeze if none available', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                inventory: { freezes: 0 }
            });

            const gameState = {};
            manager.useFreezeTime(gameState);

            expect(alert).toHaveBeenCalled();
            expect(mockUserManager.saveToStorage).not.toHaveBeenCalled();
        });
    });

    describe('updatePowerUpDisplay', () => {
        test('should update power-up counts and button states', () => {
            const mockElements = {
                'btn-use-potion': { disabled: false },
                'potion-count': { innerText: '' },
                'btn-use-freeze': { disabled: false },
                'freeze-count': { innerText: '' },
                'shield-indicator': { classList: { add: jest.fn(), remove: jest.fn() } },
                'shield-count': { innerText: '' }
            };

            global.document.getElementById = jest.fn((id) => mockElements[id]);

            manager.updatePowerUpDisplay();

            expect(mockElements['potion-count'].innerText).toBe(2);
            expect(mockElements['freeze-count'].innerText).toBe(1);
            expect(mockElements['shield-count'].innerText).toBe(0);
            expect(mockElements['btn-use-potion'].disabled).toBe(false);
            expect(mockElements['shield-indicator'].classList.remove).toHaveBeenCalledWith('active');
        });

        test('should activate shield indicator when shields available', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                inventory: { potions: 0, freezes: 0, shields: 3, themes: [] }
            });

            const shieldIndicator = { classList: { add: jest.fn(), remove: jest.fn() } };
            global.document.getElementById = jest.fn((id) => {
                if (id === 'shield-indicator') return shieldIndicator;
                return { innerText: '', disabled: false };
            });

            manager.updatePowerUpDisplay();

            expect(shieldIndicator.classList.add).toHaveBeenCalledWith('active');
        });
    });

    describe('applyTheme', () => {
        test('should apply space theme', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                inventory: {},
                currentTheme: 'theme_space'
            });

            const mockContainer = { setAttribute: jest.fn(), removeAttribute: jest.fn() };
            global.document.getElementById = jest.fn(() => mockContainer);

            manager.applyTheme();

            expect(mockContainer.setAttribute).toHaveBeenCalledWith('data-theme', 'space');
        });

        test('should apply jungle theme', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                inventory: {},
                currentTheme: 'theme_jungle'
            });

            const mockContainer = { setAttribute: jest.fn(), removeAttribute: jest.fn() };
            global.document.getElementById = jest.fn(() => mockContainer);

            manager.applyTheme();

            expect(mockContainer.setAttribute).toHaveBeenCalledWith('data-theme', 'jungle');
        });

        test('should remove theme when default', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                inventory: {},
                currentTheme: 'default'
            });

            const mockContainer = { setAttribute: jest.fn(), removeAttribute: jest.fn() };
            global.document.getElementById = jest.fn(() => mockContainer);

            manager.applyTheme();

            expect(mockContainer.removeAttribute).toHaveBeenCalledWith('data-theme');
        });
    });

    describe('showFeedbackMessage', () => {
        test('should create and display feedback message', () => {
            const appendChildSpy = jest.spyOn(document.body, 'appendChild');
            const createElementSpy = jest.spyOn(document, 'createElement');

            manager.showFeedbackMessage('Test Message');

            expect(createElementSpy).toHaveBeenCalled();
            expect(appendChildSpy).toHaveBeenCalled();
            
            appendChildSpy.mockRestore();
            createElementSpy.mockRestore();
        });
    });

    describe('getStoreItems', () => {
        test('should return store items', () => {
            const items = manager.getStoreItems();
            expect(items).toBe(manager.storeItems);
            expect(items.length).toBe(5);
        });
    });
});
