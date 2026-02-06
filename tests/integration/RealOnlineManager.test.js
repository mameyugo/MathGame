/**
 * @jest-environment node
 */
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

// Polyfill fetch if needed
if (!global.fetch) {
    try {
        global.fetch = require('node-fetch');
    } catch (e) {
        // Fallback or ignore if native fetch exists (Node 18+)
    }
}

// Mock browser environment globals for OnlineManager
global.WebSocket = WebSocket;
global.window = {
    location: {
        hostname: 'localhost'
    }
};

// Polyfill minimal localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    store: {}
};
localStorageMock.setItem.mockImplementation((key, value) => { localStorageMock.store[key] = value; });
localStorageMock.getItem.mockImplementation((key) => { return localStorageMock.store[key] || null; });
localStorageMock.removeItem.mockImplementation((key) => { delete localStorageMock.store[key]; });
global.localStorage = localStorageMock;

// Load OnlineManager source
const translationManagerCode = fs.readFileSync(path.join(__dirname, '../../docs/js/managers/TranslationManager.js'), 'utf8');
const onlineManagerCode = fs.readFileSync(path.join(__dirname, '../../docs/js/managers/OnlineManager.js'), 'utf8');

// Evaluate classes and assign to global
eval(translationManagerCode + '; global.TranslationManager = TranslationManager;');
eval(onlineManagerCode + '; global.OnlineManager = OnlineManager;');

describe('Real Environment Integration - OnlineManager', () => {
    let onlineManager;
    let translationManager;

    beforeAll(() => {
        translationManager = new TranslationManager();
    });

    beforeEach(() => {
        onlineManager = new OnlineManager(translationManager);
    });

    afterEach(() => {
        if (onlineManager.isConnected) {
            onlineManager.disconnect();
        }
    });

    test('should register and connect to real WebSocket server', (done) => {
        const testUser = 'user_' + Math.floor(Math.random() * 100000);
        const testPass = 'password123';

        console.log(`Registering user ${testUser}...`);

        onlineManager.register(testUser, testPass)
            .then(regResult => {
                console.log('Registration result:', regResult);
                if (!regResult.ok && !regResult.error?.includes('exists')) {
                    throw new Error('Registration failed: ' + regResult.error);
                }

                return onlineManager.login(testUser, testPass);
            })
            .then(loginResult => {
                console.log('Login API result:', loginResult);
                if (!loginResult.ok) throw new Error('Login API failed');

                console.log('Connecting via WebSocket...');
                return onlineManager.connect(testUser, testPass);
            })
            .then(response => {
                console.log('WS Connection response:', response);
                expect(response.type).toBe('login_success');
                expect(onlineManager.isConnected).toBe(true);
                done();
            })
            .catch(err => {
                console.error('Test failed:', err);
                done(err);
            });
    }, 20000);

    test('should sync user data with server', (done) => {
        const testUser = 'user_sync_' + Math.floor(Math.random() * 100000);
        const testPass = 'password123';
        const mockData = { level: 5, totalCoins: 100, inventory: { potions: 2 } };

        onlineManager.register(testUser, testPass)
            .then(() => onlineManager.login(testUser, testPass))
            .then(loginRes => {
                if (!loginRes.ok) throw new Error('Login failed');

                onlineManager.username = testUser;
                onlineManager.authToken = loginRes.token;
                onlineManager.saveCredentials(testUser, testPass);

                onlineManager.getUserData = () => mockData;

                return onlineManager.syncUserData(mockData);
            })
            .then(syncRes => {
                console.log('Sync response:', syncRes);
                expect(syncRes).toBeDefined();
                done();
            })
            .catch(err => {
                console.error('Sync failed:', err);
                done(err);
            });
    }, 20000);

    test('should create and join a room (User A & User B)', async () => {
        const userA = 'userA_' + Math.floor(Math.random() * 100000);
        const userB = 'userB_' + Math.floor(Math.random() * 100000);
        const pass = 'password123';

        console.log('Registering User A...');
        await onlineManager.register(userA, pass);
        const loginA = await onlineManager.login(userA, pass);
        expect(loginA.ok).toBe(true);
        const tokenA = loginA.token;

        onlineManager.authToken = tokenA;
        onlineManager.username = userA;

        console.log('User A creating room...');
        const roomRes = await onlineManager.createRoom();
        console.log('Create Room Result:', roomRes);
        expect(roomRes.ok).toBe(true);
        expect(roomRes.token).toBeDefined();

        const roomToken = roomRes.token;

        console.log('Registering User B...');
        await onlineManager.register(userB, pass);
        const loginB = await onlineManager.login(userB, pass);
        expect(loginB.ok).toBe(true);

        onlineManager.authToken = loginB.token;
        onlineManager.username = userB;

        console.log(`User B joining room ${roomToken}...`);
        const joinRes = await onlineManager.joinRoom(roomToken);
        console.log('Join Room Result:', joinRes);

        expect(joinRes.ok).toBe(true);
        expect(joinRes.roomId).toBe(roomRes.roomId);
        expect(joinRes.peers).toBeDefined();

    }, 40000);

    test('should restore online data to fresh device (download sync)', (done) => {
        const testUser = 'user_restore_' + Math.floor(Math.random() * 100000);
        const testPass = 'password123';
        const serverData = { level: 10, totalCoins: 500, inventory: { potions: 5 } };
        const emptyLocalData = { level: 1, totalCoins: 0, inventory: {} };

        // 1. Register & Initial Sync (Upload data)
        onlineManager.register(testUser, testPass)
            .then(() => onlineManager.login(testUser, testPass))
            .then(loginRes => {
                if (!loginRes.ok) throw new Error('Login failed');
                onlineManager.username = testUser;
                onlineManager.authToken = loginRes.token;
                onlineManager.saveCredentials(testUser, testPass);

                console.log('Uploading initial data to server...');
                return onlineManager.syncUserData(serverData);
            })
            .then(syncRes => {
                expect(syncRes.ok).toBe(true);
                // Simulate "Fresh Device": Clear everything
                onlineManager.username = null;
                onlineManager.authToken = null;
                onlineManager.clearCredentials(); // Clear localStorage

                console.log('Simulating fresh login...');
                return onlineManager.login(testUser, testPass);
            })
            .then(loginRes => {
                if (!loginRes.ok) throw new Error('Relogin failed');
                onlineManager.username = testUser;
                onlineManager.authToken = loginRes.token;
                onlineManager.saveCredentials(testUser, testPass);

                // Sync with empty local data - expects server data to win due to higher level/coins
                console.log('Syncing empty local data to download server state...');
                return onlineManager.syncUserData(emptyLocalData);
            })
            .then(restoreRes => {
                console.log('Restore Response:', restoreRes);
                expect(restoreRes.ok).toBe(true);
                expect(restoreRes.game_data).toBeDefined();
                expect(restoreRes.game_data.level).toBe(10);
                expect(restoreRes.game_data.totalCoins).toBe(500);
                expect(restoreRes.game_data.inventory.potions).toBe(5);
                done();
            })
            .catch(err => {
                console.error('Restore test failed:', err);
                done(err);
            });
    }, 30000);
});
