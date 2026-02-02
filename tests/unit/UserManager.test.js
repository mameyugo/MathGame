const UserManager = require('../../docs/js/managers/UserManager');

describe('UserManager', () => {
    let manager;
    let mockTranslationManager;

    beforeEach(() => {
        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(() => null),
            setItem: jest.fn()
        };

        // Mock document
        global.document = {
            getElementById: jest.fn(),
            querySelectorAll: jest.fn(() => [])
        };

        // Mock translationManager
        mockTranslationManager = {
            t: jest.fn((key) => key)
        };

        manager = new UserManager(mockTranslationManager);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Constructor', () => {
        test('should initialize with empty users object', () => {
            expect(manager.users).toEqual({});
        });

        test('should load users from localStorage if available', () => {
            const mockUsers = { Alice: { level: 5, totalCoins: 100 } };
            global.localStorage.getItem = jest.fn(() => JSON.stringify(mockUsers));

            const newManager = new UserManager(mockTranslationManager);
            expect(newManager.users).toEqual(mockUsers);
        });

        test('should set currentUser to null initially', () => {
            expect(manager.currentUser).toBeNull();
        });
    });

    describe('initInventory', () => {
        test('should create inventory if it does not exist', () => {
            const user = { level: 1 };
            manager.initInventory(user);

            expect(user.inventory).toBeDefined();
            expect(user.inventory.potions).toBe(0);
            expect(user.inventory.freezes).toBe(0);
            expect(user.inventory.shields).toBe(0);
            expect(user.inventory.themes).toEqual([]);
        });

        test('should fix invalid inventory values', () => {
            const user = {
                inventory: {
                    potions: NaN,
                    freezes: 'invalid',
                    shields: null,
                    themes: 'not-array'
                }
            };

            manager.initInventory(user);

            expect(user.inventory.potions).toBe(0);
            expect(user.inventory.freezes).toBe(0);
            expect(user.inventory.shields).toBe(0);
            expect(user.inventory.themes).toEqual([]);
        });

        test('should set default theme if not present', () => {
            const user = { inventory: {} };
            manager.initInventory(user);

            expect(user.currentTheme).toBe('default');
        });
    });

    describe('normalizeUsers', () => {
        test('should normalize invalid user levels', () => {
            manager.users = {
                Alice: { level: NaN, totalCoins: 50 },
                Bob: { level: 'invalid', totalCoins: 100 }
            };

            manager.normalizeUsers();

            expect(manager.users.Alice.level).toBe(1);
            expect(manager.users.Bob.level).toBe(1);
            expect(localStorage.setItem).toHaveBeenCalled();
        });

        test('should initialize missing inventories', () => {
            manager.users = {
                Charlie: { level: 3, totalCoins: 75 }
            };

            manager.normalizeUsers();

            expect(manager.users.Charlie.inventory).toBeDefined();
            expect(manager.users.Charlie.currentTheme).toBe('default');
        });
    });

    describe('syncStateFromStorage', () => {
        test('should reload users from localStorage', () => {
            const mockUsers = { Dave: { level: 2, totalCoins: 150 } };
            global.localStorage.getItem = jest.fn(() => JSON.stringify(mockUsers));

            manager.syncStateFromStorage();

            // After normalization, inventory and theme are added
            expect(manager.users.Dave.level).toBe(2);
            expect(manager.users.Dave.totalCoins).toBe(150);
            expect(manager.users.Dave.inventory).toBeDefined();
            expect(manager.users.Dave.currentTheme).toBe('default');
        });

        test('should call normalizeUsers after loading', () => {
            const spy = jest.spyOn(manager, 'normalizeUsers');
            global.localStorage.getItem = jest.fn(() => '{}');

            manager.syncStateFromStorage();

            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });
    });

    describe('saveToStorage', () => {
        test('should save users to localStorage', () => {
            manager.users = { Eve: { level: 4, totalCoins: 200 } };

            manager.saveToStorage();

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'math_users',
                JSON.stringify(manager.users)
            );
        });
    });

    describe('createUser', () => {
        let mockInput;

        beforeEach(() => {
            mockInput = { value: '', innerHTML: '' };
            global.document.getElementById = jest.fn(() => mockInput);
            global.alert = jest.fn();
        });

        test('should create a new user with default values', () => {
            mockInput.value = '  Alice  ';
            manager.renderUserList = jest.fn();

            manager.createUser();

            expect(manager.users.Alice).toBeDefined();
            expect(manager.users.Alice.level).toBe(1);
            expect(manager.users.Alice.totalCoins).toBe(0);
            expect(manager.users.Alice.ops).toEqual(['+']);
            expect(mockInput.value).toBe('');
            expect(manager.renderUserList).toHaveBeenCalled();
        });

        test('should not create user with empty name', () => {
            mockInput.value = '   ';

            manager.createUser();

            expect(Object.keys(manager.users).length).toBe(0);
            expect(alert).toHaveBeenCalled();
        });

        test('should not create user with duplicate name', () => {
            manager.users.Bob = { level: 1, totalCoins: 0 };
            mockInput.value = 'Bob';

            manager.createUser();

            expect(alert).toHaveBeenCalled();
        });
    });

    describe('selectUser', () => {
        beforeEach(() => {
            manager.users = {
                Alice: { level: 3, totalCoins: 150, ops: ['+', '-'] }
            };

            const mockElements = {
                'config-title': { innerText: '' },
                'cfg-sum': { checked: false },
                'cfg-res': { checked: false },
                'cfg-mul': { checked: false },
                'username-edit-section': { style: { display: '' } },
                'btn-edit-username': { style: { display: '' } },
                'edit-user-name': { value: '' },
                'screen-config': { classList: { add: jest.fn() } }
            };

            global.document.getElementById = jest.fn((id) => mockElements[id]);
            global.document.querySelectorAll = jest.fn(() => [
                { classList: { remove: jest.fn() } }
            ]);
        });

        test('should set currentUser and update config screen', () => {
            manager.selectUser('Alice');

            expect(manager.currentUser).toBe('Alice');
            expect(mockTranslationManager.t).toHaveBeenCalledWith('config_title_user');
        });

        test('should check correct operation checkboxes', () => {
            manager.selectUser('Alice');

            const cfgSum = document.getElementById('cfg-sum');
            const cfgRes = document.getElementById('cfg-res');
            const cfgMul = document.getElementById('cfg-mul');

            expect(cfgSum.checked).toBe(true);
            expect(cfgRes.checked).toBe(true);
            expect(cfgMul.checked).toBe(false);
        });
    });

    describe('showEditName', () => {
        test('should show edit section and hide button', () => {
            manager.currentUser = 'Alice';

            const mockElements = {
                'username-edit-section': { style: { display: 'none' } },
                'btn-edit-username': { style: { display: 'block' } },
                'edit-user-name': { value: '', focus: jest.fn() }
            };

            global.document.getElementById = jest.fn((id) => mockElements[id]);

            manager.showEditName();

            expect(mockElements['username-edit-section'].style.display).toBe('block');
            expect(mockElements['btn-edit-username'].style.display).toBe('none');
            expect(mockElements['edit-user-name'].value).toBe('Alice');
            expect(mockElements['edit-user-name'].focus).toHaveBeenCalled();
        });
    });

    describe('cancelEditName', () => {
        test('should hide edit section and show button', () => {
            const mockElements = {
                'username-edit-section': { style: { display: 'block' } },
                'btn-edit-username': { style: { display: 'none' } },
                'edit-user-name': { value: 'SomeName' }
            };

            global.document.getElementById = jest.fn((id) => mockElements[id]);

            manager.cancelEditName();

            expect(mockElements['username-edit-section'].style.display).toBe('none');
            expect(mockElements['btn-edit-username'].style.display).toBe('block');
            expect(mockElements['edit-user-name'].value).toBe('');
        });
    });

    describe('saveUserName', () => {
        beforeEach(() => {
            manager.users = {
                Alice: { level: 5, totalCoins: 200, ops: ['+'] }
            };
            manager.currentUser = 'Alice';

            global.alert = jest.fn();
            manager.cancelEditName = jest.fn();
            manager.renderUserList = jest.fn();
            manager.renderLeaderboard = jest.fn();
        });

        test('should rename user successfully', () => {
            const mockInput = { value: 'Alicia' };
            global.document.getElementById = jest.fn(() => mockInput);

            manager.saveUserName();

            expect(manager.users.Alicia).toBeDefined();
            expect(manager.users.Alice).toBeUndefined();
            expect(manager.currentUser).toBe('Alicia');
            expect(manager.renderUserList).toHaveBeenCalled();
        });

        test('should not rename if name is empty', () => {
            const mockInput = { value: '   ' };
            global.document.getElementById = jest.fn(() => mockInput);

            manager.saveUserName();

            expect(alert).toHaveBeenCalled();
            expect(manager.users.Alice).toBeDefined();
        });

        test('should not rename if name already exists', () => {
            manager.users.Bob = { level: 1, totalCoins: 0 };
            const mockInput = { value: 'Bob' };
            global.document.getElementById = jest.fn(() => mockInput);

            manager.saveUserName();

            expect(alert).toHaveBeenCalled();
            expect(manager.users.Alice).toBeDefined();
        });

        test('should cancel if new name equals old name', () => {
            const mockInput = { value: 'Alice' };
            global.document.getElementById = jest.fn(() => mockInput);

            manager.saveUserName();

            expect(manager.cancelEditName).toHaveBeenCalled();
            expect(manager.renderUserList).not.toHaveBeenCalled();
        });
    });

    describe('renderUserList', () => {
        test('should render user cards', () => {
            manager.users = {
                Alice: { level: 3, totalCoins: 150 },
                Bob: { level: 5, totalCoins: 250 }
            };

            const mockList = { innerHTML: '' };
            global.document.getElementById = jest.fn(() => mockList);
            global.document.querySelectorAll = jest.fn(() => []);

            manager.renderUserList();

            expect(mockList.innerHTML).toContain('Alice');
            expect(mockList.innerHTML).toContain('Bob');
            expect(mockList.innerHTML).toContain('Lvl 3');
            expect(mockList.innerHTML).toContain('💰 150');
        });

        test('should handle empty user list', () => {
            const mockList = { innerHTML: 'old content' };
            global.document.getElementById = jest.fn(() => mockList);

            manager.renderUserList();

            expect(mockList.innerHTML).toBe('');
        });
    });

    describe('renderLeaderboard', () => {
        test('should render top 3 users sorted by coins', () => {
            manager.users = {
                Alice: { level: 3, totalCoins: 150 },
                Bob: { level: 5, totalCoins: 300 },
                Charlie: { level: 2, totalCoins: 200 },
                Dave: { level: 1, totalCoins: 50 }
            };

            const mockList = { innerHTML: '' };
            global.document.getElementById = jest.fn(() => mockList);

            manager.renderLeaderboard();

            expect(mockList.innerHTML).toContain('🥇');
            expect(mockList.innerHTML).toContain('Bob');
            expect(mockList.innerHTML).toContain('300');
            expect(mockList.innerHTML).not.toContain('Dave');
        });

        test('should show empty message when no users', () => {
            const mockList = { innerHTML: '' };
            global.document.getElementById = jest.fn(() => mockList);

            manager.renderLeaderboard();

            expect(mockTranslationManager.t).toHaveBeenCalledWith('hall_of_fame_empty');
        });
    });

    describe('updateRecordDisplay', () => {
        test('should update record display with max level', () => {
            manager.users = { Alice: { level: 5 } };
            manager.currentUser = 'Alice';

            const mockRecord = { innerText: '' };
            global.document.getElementById = jest.fn(() => mockRecord);

            manager.updateRecordDisplay(7);

            expect(mockRecord.innerText).toBe(7);
        });

        test('should use user level if higher than game level', () => {
            manager.users = { Alice: { level: 10 } };
            manager.currentUser = 'Alice';

            const mockRecord = { innerText: '' };
            global.document.getElementById = jest.fn(() => mockRecord);

            manager.updateRecordDisplay(5);

            expect(mockRecord.innerText).toBe(10);
        });

        test('should handle missing record element', () => {
            manager.currentUser = 'Alice';
            global.document.getElementById = jest.fn(() => null);

            expect(() => manager.updateRecordDisplay(5)).not.toThrow();
        });
    });

    describe('Getter methods', () => {
        test('getCurrentUser should return user object', () => {
            manager.users = { Alice: { level: 3 } };
            manager.currentUser = 'Alice';

            expect(manager.getCurrentUser()).toEqual({ level: 3 });
        });

        test('getCurrentUser should return null if no user selected', () => {
            expect(manager.getCurrentUser()).toBeNull();
        });

        test('getCurrentUserName should return username', () => {
            manager.currentUser = 'Bob';
            expect(manager.getCurrentUserName()).toBe('Bob');
        });

        test('getUsers should return all users', () => {
            manager.users = { Alice: { level: 1 }, Bob: { level: 2 } };
            expect(manager.getUsers()).toEqual(manager.users);
        });
    });
});
