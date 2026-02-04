const GameEngine = require('../../docs/js/managers/GameEngine');

describe('GameEngine', () => {
    let gameEngine;
    let mockUserManager;
    let mockTranslationManager;
    let mockAchievementManager;
    let mockDailyChallengeManager;
    let mockGenerateQuestion;
    let mockGenerateProblem;
    let mockToggleProblemUI;
    let mockUpdatePowerUpDisplay;
    let mockApplyTheme;
    let mockShowUsers;

    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
            <div id="screen-game" class="screen"></div>
            <div id="screen-users" class="screen"></div>
            <div id="app-container"></div>
            <div id="turn-indicator"></div>
            <div id="game-timer">30s</div>
            <div id="game-level">1</div>
            <div id="game-coins">0</div>
        `;

        // Mock UserManager
        mockUserManager = {
            getCurrentUser: jest.fn(() => ({
                ops: ['+'],
                totalCoins: 100,
                level: 5,
                inventory: { potions: 2, freezes: 1, shields: 3 }
            })),
            getUsers: jest.fn(() => ({
                'Player1': { totalCoins: 100, level: 5 },
                'Player2': { totalCoins: 200, level: 3 }
            })),
            selectUser: jest.fn(),
            initInventory: jest.fn(),
            updateRecordDisplay: jest.fn(),
            saveToStorage: jest.fn()
        };

        // Mock TranslationManager
        mockTranslationManager = {
            t: jest.fn((key) => {
                const translations = {
                    'alert_choose_operation': 'Choose an operation',
                    'alert_min_users': 'At least 2 users required',
                    'turn_of': 'Turn of ',
                    'alert_shield_used': 'Shield used!',
                    'alert_duel_end': 'Duel ended!\n',
                    'alert_good_job': 'Good job! You earned ',
                    'alert_coins': ' coins!'
                };
                return translations[key] || key;
            })
        };

        // Mock AchievementManager
        mockAchievementManager = {
            checkAchievements: jest.fn(() => []),
            showAchievementNotification: jest.fn(),
            updateStats: jest.fn()
        };

        // Mock DailyChallengeManager
        mockDailyChallengeManager = {
            updateProgress: jest.fn(() => [])
        };

        // Mock functions
        mockGenerateQuestion = jest.fn();
        mockGenerateProblem = jest.fn();
        mockToggleProblemUI = jest.fn();
        mockUpdatePowerUpDisplay = jest.fn();
        mockApplyTheme = jest.fn();
        mockShowUsers = jest.fn();

        // Mock confetti
        global.confetti = jest.fn();

        // Mock alert
        global.alert = jest.fn();

        // Create GameEngine instance
        gameEngine = new GameEngine(
            mockUserManager,
            mockTranslationManager,
            mockAchievementManager,
            mockDailyChallengeManager,
            mockGenerateQuestion,
            mockGenerateProblem,
            mockToggleProblemUI,
            mockUpdatePowerUpDisplay,
            mockApplyTheme,
            mockShowUsers
        );

        // Mock timers
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    describe('Constructor', () => {
        test('should initialize with correct default values', () => {
            expect(gameEngine.gameLevel).toBe(1);
            expect(gameEngine.gameCoins).toBe(0);
            expect(gameEngine.timeLeft).toBe(30);
            expect(gameEngine.duelMode).toBe(false);
            expect(gameEngine.problemMode).toBe(false);
        });

        test('should store manager references', () => {
            expect(gameEngine.userManager).toBe(mockUserManager);
            expect(gameEngine.translationManager).toBe(mockTranslationManager);
        });
    });

    describe('startSingleGame', () => {
        test('should start single game with valid operations', () => {
            const result = gameEngine.startSingleGame({ sum: true, res: false, mul: true });

            expect(result).toBe(true);
            expect(gameEngine.duelMode).toBe(false);
            expect(gameEngine.problemMode).toBe(false);
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
        });

        test('should alert and return false if no operations selected', () => {
            const result = gameEngine.startSingleGame({ sum: false, res: false, mul: false });

            expect(result).toBe(false);
            expect(global.alert).toHaveBeenCalledWith('Choose an operation');
        });

        test('should set user ops correctly', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                ops: [],
                totalCoins: 100,
                level: 5,
                inventory: { potions: 2, freezes: 1, shields: 3 }
            });

            gameEngine.startSingleGame({ sum: true, res: true, mul: false });
            const user = mockUserManager.getCurrentUser();

            expect(user.ops).toContain('+');
            expect(user.ops).toContain('-');
            expect(user.ops).not.toContain('*');
        });
    });

    describe('startProblemGame', () => {
        test('should start problem game with correct type', () => {
            gameEngine.startProblemGame('logica');

            expect(gameEngine.duelMode).toBe(false);
            expect(gameEngine.problemMode).toBe(true);
            expect(gameEngine.problemType).toBe('logica');
        });

        test('should initialize game session', () => {
            gameEngine.startProblemGame('matematico');

            expect(gameEngine.gameLevel).toBe(1);
            expect(gameEngine.gameCoins).toBe(0);
        });
    });

    describe('setupDuel', () => {
        test('should setup duel with multiple users', () => {
            const result = gameEngine.setupDuel();

            expect(result).toBe(true);
            expect(gameEngine.duelMode).toBe(true);
            expect(gameEngine.currentDuelIdx).toBe(0);
            expect(gameEngine.duelPlayers.length).toBe(2);
        });

        test('should alert and return false if less than 2 users', () => {
            mockUserManager.getUsers.mockReturnValue({ 'Player1': {} });

            const result = gameEngine.setupDuel();

            expect(result).toBe(false);
            expect(global.alert).toHaveBeenCalledWith('At least 2 users required');
        });
    });

    describe('startNextDuelTurn', () => {
        test('should start next player turn', () => {
            gameEngine.duelPlayers = ['Player1', 'Player2'];
            gameEngine.currentDuelIdx = 0;

            gameEngine.startNextDuelTurn();

            expect(mockUserManager.selectUser).toHaveBeenCalledWith('Player1');
            expect(document.getElementById('turn-indicator').innerText).toBe('Turn of Player1');
        });
    });

    describe('initGameSession', () => {
        test('should initialize game session with correct values', () => {
            gameEngine.initGameSession(3, 50);

            expect(gameEngine.gameLevel).toBe(3);
            expect(gameEngine.gameCoins).toBe(50);
            expect(gameEngine.timeLeft).toBe(30);
        });

        test('should activate game screen', () => {
            gameEngine.initGameSession(1, 0);

            expect(document.getElementById('screen-game').classList.contains('active')).toBe(true);
        });

        test('should call required setup functions', () => {
            gameEngine.initGameSession(1, 0);

            expect(mockUserManager.initInventory).toHaveBeenCalled();
            expect(mockUpdatePowerUpDisplay).toHaveBeenCalled();
            expect(mockUserManager.updateRecordDisplay).toHaveBeenCalledWith(1);
            expect(mockApplyTheme).toHaveBeenCalled();
        });

        test('should generate question for normal mode', () => {
            gameEngine.problemMode = false;
            gameEngine.initGameSession(1, 0);

            expect(mockToggleProblemUI).toHaveBeenCalledWith(false);
            expect(mockGenerateQuestion).toHaveBeenCalled();
            expect(mockGenerateProblem).not.toHaveBeenCalled();
        });

        test('should generate problem for problem mode', () => {
            gameEngine.problemMode = true;
            gameEngine.initGameSession(1, 0);

            expect(mockToggleProblemUI).toHaveBeenCalledWith(true);
            expect(mockGenerateProblem).toHaveBeenCalled();
            expect(mockGenerateQuestion).not.toHaveBeenCalled();
        });
    });

    describe('startTimer', () => {
        test('should start timer and decrement timeLeft', () => {
            gameEngine.timeLeft = 30;
            gameEngine.startTimer();

            jest.advanceTimersByTime(1000);
            expect(gameEngine.timeLeft).toBe(29);

            jest.advanceTimersByTime(1000);
            expect(gameEngine.timeLeft).toBe(28);
        });

        test('should update timer display', () => {
            gameEngine.timeLeft = 30;
            gameEngine.startTimer();

            jest.advanceTimersByTime(1000);
            expect(document.getElementById('game-timer').innerText).toBe('29s');
        });

        test('should end game when time reaches 0', () => {
            gameEngine.timeLeft = 1;
            gameEngine.endGameSession = jest.fn();
            gameEngine.startTimer();

            jest.advanceTimersByTime(1000);
            expect(gameEngine.endGameSession).toHaveBeenCalled();
        });

        test('should not start if timeLeft is 0 or negative', () => {
            gameEngine.timeLeft = 0;
            gameEngine.endGameSession = jest.fn();
            gameEngine.startTimer();

            expect(gameEngine.endGameSession).toHaveBeenCalled();
            expect(gameEngine.timerInterval).toBeNull();
        });
    });

    describe('check', () => {
        test('should award coins and time for correct answer', () => {
            gameEngine.currentAnswer = 42;
            gameEngine.gameCoins = 0;
            gameEngine.timeLeft = 30;

            gameEngine.check(42);

            expect(gameEngine.gameCoins).toBe(10);
            expect(gameEngine.timeLeft).toBe(32);
            expect(mockGenerateQuestion).toHaveBeenCalled();
        });

        test('should level up every 50 coins', () => {
            gameEngine.currentAnswer = 10;
            gameEngine.gameCoins = 40;
            gameEngine.gameLevel = 1;

            gameEngine.check(10);

            expect(gameEngine.gameCoins).toBe(50);
            expect(gameEngine.gameLevel).toBe(2);
        });

        test('should use shield on wrong answer if available', () => {
            gameEngine.currentAnswer = 42;
            gameEngine.timeLeft = 30;

            const userWithShields = {
                ops: ['+'],
                totalCoins: 100,
                level: 5,
                inventory: { potions: 2, freezes: 1, shields: 2 }
            };
            mockUserManager.getCurrentUser.mockReturnValue(userWithShields);

            // Mock showFeedbackMessage
            window.showFeedbackMessage = jest.fn();

            gameEngine.check(99); // Wrong answer

            expect(userWithShields.inventory.shields).toBe(1);
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
            expect(gameEngine.timeLeft).toBe(30); // No penalty
        });

        test('should apply time penalty for wrong answer without shield', () => {
            gameEngine.currentAnswer = 42;
            gameEngine.timeLeft = 30;

            const userNoShields = {
                ops: ['+'],
                totalCoins: 100,
                level: 5,
                inventory: { potions: 2, freezes: 1, shields: 0 }
            };
            mockUserManager.getCurrentUser.mockReturnValue(userNoShields);

            gameEngine.check(99); // Wrong answer

            expect(gameEngine.timeLeft).toBe(26); // -4 penalty
        });

        test('should add shake animation for wrong answer', () => {
            gameEngine.currentAnswer = 42;

            const userNoShields = {
                ops: ['+'],
                totalCoins: 100,
                level: 5,
                inventory: { potions: 2, freezes: 1, shields: 0 }
            };
            mockUserManager.getCurrentUser.mockReturnValue(userNoShields);

            gameEngine.check(99);

            const appContainer = document.getElementById('app-container');
            expect(appContainer.classList.contains('shake')).toBe(true);

            jest.advanceTimersByTime(400);
            expect(appContainer.classList.contains('shake')).toBe(false);
        });
    });

    describe('endGameSession', () => {
        test('should save coins and level in single-player mode', () => {
            gameEngine.duelMode = false;
            gameEngine.gameCoins = 50;
            gameEngine.gameLevel = 3;

            const userForSaving = {
                ops: ['+'],
                totalCoins: 100,
                level: 2,
                inventory: { potions: 2, freezes: 1, shields: 3 }
            };
            mockUserManager.getCurrentUser.mockReturnValue(userForSaving);

            gameEngine.endGameSession();

            expect(userForSaving.totalCoins).toBe(150);
            expect(userForSaving.level).toBe(3);
            expect(mockUserManager.saveToStorage).toHaveBeenCalled();
            expect(mockShowUsers).toHaveBeenCalled();
        });

        test('should continue to next player in duel mode', () => {
            gameEngine.duelMode = true;
            gameEngine.duelPlayers = ['Player1', 'Player2'];
            gameEngine.currentDuelIdx = 0;
            gameEngine.gameCoins = 40;
            gameEngine.startNextDuelTurn = jest.fn();

            gameEngine.endGameSession();

            expect(gameEngine.duelScores['Player1']).toBe(40);
            expect(gameEngine.currentDuelIdx).toBe(1);
            expect(gameEngine.startNextDuelTurn).toHaveBeenCalled();
        });

        test('should show final results after last duel player', () => {
            gameEngine.duelMode = true;
            gameEngine.duelPlayers = ['Player1', 'Player2'];
            gameEngine.currentDuelIdx = 1;
            gameEngine.duelScores = { 'Player1': 40 };
            gameEngine.gameCoins = 60;

            gameEngine.endGameSession();

            expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Duel ended!'));
            expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Player1: 40'));
            expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Player2: 60'));
            expect(mockShowUsers).toHaveBeenCalled();
        });
    });

    describe('Helper methods', () => {
        test('setCurrentAnswer should update current answer', () => {
            gameEngine.setCurrentAnswer(123);
            expect(gameEngine.currentAnswer).toBe(123);
        });

        test('getGameState should return game state', () => {
            gameEngine.gameLevel = 5;
            gameEngine.gameCoins = 80;
            gameEngine.timeLeft = 20;

            const state = gameEngine.getGameState();

            expect(state.gameLevel).toBe(5);
            expect(state.gameCoins).toBe(80);
            expect(state.timeLeft).toBe(20);
        });

        test('setTimeLeft should update time and display', () => {
            gameEngine.setTimeLeft(45);

            expect(gameEngine.timeLeft).toBe(45);
            expect(document.getElementById('game-timer').innerText).toBe('45s');
        });

        test('pauseTimer should clear timer interval', () => {
            gameEngine.startTimer();
            gameEngine.pauseTimer();

            expect(gameEngine.timerInterval).toBeNull();
        });

        test('resumeTimerAfterFreeze should restart timer after delay', () => {
            gameEngine.startTimer = jest.fn();
            gameEngine.resumeTimerAfterFreeze(5000);

            jest.advanceTimersByTime(5000);
            expect(gameEngine.startTimer).toHaveBeenCalled();
            expect(gameEngine.freezeTimeout).toBeNull();
        });
    });

    describe('updateGameDisplay', () => {
        test('should update level and coins display', () => {
            gameEngine.gameLevel = 7;
            gameEngine.gameCoins = 120;

            gameEngine.updateGameDisplay();

            expect(document.getElementById('game-level').innerText).toBe(7);
            expect(document.getElementById('game-coins').innerText).toBe(120);
            expect(mockUserManager.updateRecordDisplay).toHaveBeenCalledWith(7);
        });
    });

    describe('Problem tracking (anti-repetition system)', () => {
        test('markProblemAsSolved should add problem ID to solved set', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');

            expect(gameEngine.solvedProblemsInSession.has('problem_1')).toBe(true);
            expect(gameEngine.solvedProblemsInSession.has('problem_2')).toBe(true);
            expect(gameEngine.solvedProblemsInSession.size).toBe(2);
        });

        test('getSolvedProblems should return the solved problems set', () => {
            gameEngine.markProblemAsSolved('test_problem');

            const solvedSet = gameEngine.getSolvedProblems();

            expect(solvedSet).toBe(gameEngine.solvedProblemsInSession);
            expect(solvedSet.has('test_problem')).toBe(true);
        });

        test('resetSolvedProblems should clear all solved problems', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');

            expect(gameEngine.solvedProblemsInSession.size).toBe(3);

            gameEngine.resetSolvedProblems();

            expect(gameEngine.solvedProblemsInSession.size).toBe(0);
            expect(gameEngine.solvedProblemsInSession.has('problem_1')).toBe(false);
        });

        test('markProblemAsSolved should not add duplicate IDs', () => {
            gameEngine.markProblemAsSolved('same_problem');
            gameEngine.markProblemAsSolved('same_problem');
            gameEngine.markProblemAsSolved('same_problem');

            expect(gameEngine.solvedProblemsInSession.size).toBe(1);
        });

        test('resetSolvedProblems should work multiple times', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.resetSolvedProblems();
            expect(gameEngine.solvedProblemsInSession.size).toBe(0);

            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');
            expect(gameEngine.solvedProblemsInSession.size).toBe(2);

            gameEngine.resetSolvedProblems();
            expect(gameEngine.solvedProblemsInSession.size).toBe(0);
        });
    });
});
