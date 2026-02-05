/**
 * LocalDuelManager.test.js
 * Unit Verification for Local Duel Logic
 */
const LocalDuelManager = require('../../docs/js/managers/LocalDuelManager');

// Mock Dependencies
class MockGameEngine {
    constructor() {
        this.setupCalled = false;
        this.nextTurnCalled = false;
    }
    setupDuel() { this.setupCalled = true; }
    startNextDuelTurn() { this.nextTurnCalled = true; }
}

class MockUserManager {
    constructor() {
        this.users = {};
        this.currentUserName = 'player1';
    }
    getUsers() { return this.users; }
    getCurrentUserName() { return this.currentUserName; }
}

const mockT = (key) => key;

// Test Suite
describe('LocalDuelManager', () => {
    let localDuelManager;
    let mockGameEngine;
    let mockUserManager;

    beforeEach(() => {
        mockGameEngine = new MockGameEngine();
        mockUserManager = new MockUserManager();
        localDuelManager = new LocalDuelManager(mockGameEngine, mockUserManager, mockT);
    });

    // Test 1: Minimum Users Check
    test('startDuel() alerts if less than 2 users', () => {
        mockUserManager.users = { 'p1': {} };
        let alertMsg = '';
        window.alert = (msg) => { alertMsg = msg; };

        localDuelManager.startDuel();

        if (mockGameEngine.setupCalled) {
            throw new Error('FAIL: setupDuel() should not be called with < 2 users');
        }
        if (alertMsg !== 'alert_min_users') {
            throw new Error('FAIL: Expected alert for min users');
        }
        console.log('PASS: startDuel() alerts correctly');
    });

    // Test 2: Successful Start
    test('startDuel() starts game with 2 users', () => {
        mockUserManager.users = { 'p1': {}, 'p2': {} };

        const result = localDuelManager.startDuel();

        if (!mockGameEngine.setupCalled) {
            throw new Error('FAIL: setupDuel() was not called');
        }
        if (result !== 'player1') {
            throw new Error('FAIL: Did not return current user name');
        }
        console.log('PASS: startDuel() starts correctly');
    });

    // Test 3: Next Turn
    test('startNextTurn() delegates to engine', () => {
        const result = localDuelManager.startNextTurn();

        if (!mockGameEngine.nextTurnCalled) {
            throw new Error('FAIL: startNextDuelTurn() not called on engine');
        }
        if (result !== 'player1') {
            throw new Error('FAIL: Did not return current user name');
        }
        console.log('PASS: startNextTurn() delegates correctly');
    });
});
