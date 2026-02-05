/**
 * OnlineGameController.test.js
 * Unit Verification for Online Controller
 */
const OnlineGameController = require('../../docs/js/managers/OnlineGameController');

// Mock Dependencies
class MockOnlineManager {
    constructor() {
        this.connectedPeer = false;
        this.roomCreated = false;
        this.roomJoined = false;
    }
    async createRoom() {
        this.roomCreated = true;
        return { ok: true, token: 'ABC-123' };
    }
    async joinRoom(code) {
        if (code === 'BAD') return { ok: false, error: 'Fail' };
        this.roomJoined = true;
        return { ok: true };
    }
    async registerOrLogin() { return { ok: true }; }
    initPeerConnection(isInit) { this.peerInit = isInit; }
}

class MockGameEngine {
    setOnlineCallbacks() { }
    startOnlineGameSession() { }
}

// Test Suite
describe('OnlineGameController', () => {
    let controller;
    let mockOnlineManager;
    let mockGameEngine;

    beforeEach(() => {
        mockOnlineManager = new MockOnlineManager();
        mockGameEngine = new MockGameEngine();

        // Mock DOM elements
        document.body.innerHTML = `
            <div id="online-credentials-message"></div>
            <div id="online-credentials-modal"></div>
            <div id="share-room-modal" style="display:none">
                <div id="room-code-display"></div>
            </div>
            <div id="app-container"></div>
        `;

        controller = new OnlineGameController(
            mockOnlineManager,
            mockGameEngine,
            {}, // QuestionGenerator
            {}, // UserManager
            (k) => k
        );
    });

    // Test 1: Create Room Success
    test('createAndShareGameRoom() flow', async () => {
        await controller.createAndShareGameRoom();

        if (!controller.isHost) {
            throw new Error('FAIL: Should be host after creating room');
        }
        const tokenDisplay = document.getElementById('room-code-display').textContent;
        if (tokenDisplay !== 'ABC-123') {
            throw new Error('FAIL: Room token not displayed');
        }
        console.log('PASS: createAndShareGameRoom flow');
    });

    // Test 2: Join Room Validation
    test('joinRoomByCode() validation', async () => {
        await controller.joinRoomByCode('');

        const msg = document.getElementById('online-credentials-message').textContent;
        if (msg !== 'Ingresa el código de la sala') {
            throw new Error('FAIL: Empty code validation failed');
        }
        console.log('PASS: joinRoomByCode validation');
    });

    // Test 3: Join Room Success
    test('joinRoomByCode() success', async () => {
        // Mock setTimeout
        const originalTimeout = setTimeout;
        window.setTimeout = (fn) => fn();

        await controller.joinRoomByCode('XYZ-789');

        if (controller.isHost) {
            throw new Error('FAIL: Joiner should not be host');
        }
        if (!mockOnlineManager.roomJoined) {
            throw new Error('FAIL: onlineManager.joinRoom not called');
        }
        if (mockOnlineManager.peerInit !== true) {
            throw new Error('FAIL: Joiner should initiate peer connection');
        }

        window.setTimeout = originalTimeout;
        console.log('PASS: joinRoomByCode success flow');
    });
});
