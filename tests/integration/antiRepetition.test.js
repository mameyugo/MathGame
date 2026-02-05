const GameEngine = require('../../docs/js/managers/GameEngine');
const QuestionGenerator = require('../../docs/js/managers/QuestionGenerator');

describe('Anti-Repetition System Integration', () => {
    let gameEngine;
    let questionGenerator;
    let mockUserManager;
    let mockProblemCategoryManager;
    let mockTranslationManager;

    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
            <div id="screen-game" class="screen"></div>
            <div id="screen-users" class="screen"></div>
            <div id="app-container"></div>
            <div id="turn-indicator"></div>
            <div id="game-timer">60s</div>
            <div id="game-level">1</div>
            <div id="game-coins">0</div>
            <div id="question-area"></div>
            <div id="equation-area"></div>
            <div id="btn-submit-problem"></div>
        `;

        // Mock managers
        mockUserManager = {
            getCurrentUser: jest.fn(() => ({
                ops: ['+'],
                totalCoins: 100,
                level: 1,
                inventory: { potions: 2, freezes: 1, shields: 3 }
            })),
            getProblemCategories: jest.fn(() => ['explorador']),
            saveToStorage: jest.fn(),
            updateRecordDisplay: jest.fn(),
            initInventory: jest.fn()
        };

        mockTranslationManager = {
            t: jest.fn((key) => {
                const translations = {
                    'alert_good_job': 'Good job! You earned ',
                    'alert_coins': ' coins!'
                };
                return translations[key] || key;
            })
        };

        mockProblemCategoryManager = {
            getProblemCategory: jest.fn(() => 'explorador'),
            hasValidSelection: jest.fn(() => true),
            filterProblemsByCategories: jest.fn((problems) => problems)
        };

        // Mock AchievementManager
        const mockAchievementManager = {
            checkAchievements: jest.fn(() => []),
            showAchievementNotification: jest.fn(),
            updateStats: jest.fn()
        };

        const mockDailyChallengeManager = {
            updateProgress: jest.fn(() => [])
        };

        // Initialize GameEngine
        gameEngine = new GameEngine(
            mockUserManager,
            mockTranslationManager,
            mockAchievementManager,
            mockDailyChallengeManager,
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn(),
            jest.fn()
        );

        // Initialize QuestionGenerator with GameEngine
        questionGenerator = new QuestionGenerator(
            mockUserManager,
            mockProblemCategoryManager,
            jest.fn(),
            gameEngine
        );

        // Mock problema bank
        window.bancoProblemas = [
            {
                id: 'problem_1',
                tipo: 'matematico',
                nivelMin: 1,
                generar: () => ({
                    id: 'problem_1',
                    texto: 'First problem',
                    ecuacion: '1+1=__'
                })
            },
            {
                id: 'problem_2',
                tipo: 'matematico',
                nivelMin: 1,
                generar: () => ({
                    id: 'problem_2',
                    texto: 'Second problem',
                    ecuacion: '2+2=__'
                })
            },
            {
                id: 'problem_3',
                tipo: 'matematico',
                nivelMin: 1,
                generar: () => ({
                    id: 'problem_3',
                    texto: 'Third problem',
                    ecuacion: '3+3=__'
                })
            }
        ];

        questionGenerator.problemType = 'matematico';
        questionGenerator.gameLevel = 1;
    });

    describe('Problem Tracking Flow', () => {
        test('should track solved problem IDs when marked as solved', () => {
            gameEngine.markProblemAsSolved('problem_1');

            const solvedProblems = gameEngine.getSolvedProblems();
            expect(solvedProblems.has('problem_1')).toBe(true);
        });

        test('should filter out solved problems from selection pool', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_3');

            const problem = questionGenerator.selectProblem();

            expect(problem).toBeDefined();
            expect(problem.texto).toBe('Second problem');
        });

        test('should show completion message when all problems are solved', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');

            const problem = questionGenerator.selectProblem();

            expect(problem).toBeNull();
            const questionArea = document.getElementById('question-area');
            expect(questionArea.innerHTML).toContain('¡Enhorabuena!');
            expect(questionArea.innerHTML).toContain('github.com');
        });

        test('should allow problem replay after resetting solved problems', () => {
            // Mark all as solved
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');

            // Verify all are solved
            expect(gameEngine.getSolvedProblems().size).toBe(3);

            // Reset and verify can select again
            gameEngine.resetSolvedProblems();

            const problem = questionGenerator.selectProblem();
            expect(problem).toBeDefined();
            expect(gameEngine.getSolvedProblems().size).toBe(0);
        });
    });

    describe('Game Session Integration', () => {
        test('initGameSession should reset solved problems', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');

            expect(gameEngine.getSolvedProblems().size).toBe(2);

            gameEngine.initGameSession(1, 0);

            expect(gameEngine.getSolvedProblems().size).toBe(0);
        });

        test('should track multiple problems correctly', () => {
            const problems = ['p1', 'p2', 'p3', 'p4', 'p5'];

            problems.forEach(id => gameEngine.markProblemAsSolved(id));

            expect(gameEngine.getSolvedProblems().size).toBe(5);
            problems.forEach(id => {
                expect(gameEngine.getSolvedProblems().has(id)).toBe(true);
            });
        });
    });

    describe('Completion Message Content', () => {
        test('completion message should include all required elements', () => {
            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');

            questionGenerator.selectProblem();

            const questionArea = document.getElementById('question-area');
            const html = questionArea.innerHTML;

            expect(html).toContain('🎉');
            expect(html).toContain('¡Enhorabuena!');
            expect(html).toContain('Has completado todos los problemas disponibles');
            expect(html).toContain('MathQix es software libre');
            expect(html).toContain('Puedes colaborar');
            expect(html).toContain('github.com/mameyugo/MathGame/issues/new');
            expect(html).toContain('Enviar Nuevo Acertijo');
            expect(html).toContain('rápido posible');
        });

        test('submit button should be hidden after completion message', () => {
            const submitBtn = document.getElementById('btn-submit-problem');
            submitBtn.style.display = 'block';

            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');

            questionGenerator.selectProblem();

            expect(submitBtn.style.display).toBe('none');
        });

        test('equation area should be cleared when showing completion message', () => {
            document.getElementById('equation-area').innerHTML = '<input type="number" />';

            gameEngine.markProblemAsSolved('problem_1');
            gameEngine.markProblemAsSolved('problem_2');
            gameEngine.markProblemAsSolved('problem_3');

            questionGenerator.selectProblem();

            expect(document.getElementById('equation-area').innerHTML).toBe('');
        });
    });

    describe('Set-based Tracking Performance', () => {
        test('should efficiently handle large number of solved problems', () => {
            // Add many problems to tracking
            for (let i = 0; i < 100; i++) {
                gameEngine.markProblemAsSolved(`problem_${i}`);
            }

            expect(gameEngine.getSolvedProblems().size).toBe(100);

            // Verify that Set operations work correctly for many items
            for (let i = 0; i < 100; i++) {
                expect(gameEngine.getSolvedProblems().has(`problem_${i}`)).toBe(true);
            }

            // Verify non-existent items return false
            expect(gameEngine.getSolvedProblems().has('non_existent')).toBe(false);
        });

        test('should prevent duplicate tracking', () => {
            gameEngine.markProblemAsSolved('unique_problem');
            gameEngine.markProblemAsSolved('unique_problem');
            gameEngine.markProblemAsSolved('unique_problem');

            expect(gameEngine.getSolvedProblems().size).toBe(1);
        });
    });

    describe('Backward Compatibility', () => {
        test('QuestionGenerator should work without GameEngine', () => {
            const qg = new QuestionGenerator(
                mockUserManager,
                mockProblemCategoryManager,
                jest.fn()
            );

            expect(qg.gameEngine).toBeNull();

            const problem = qg.selectProblem();
            expect(problem).toBeDefined();
        });

        test('selectProblem should not filter if GameEngine is not provided', () => {
            const qg = new QuestionGenerator(
                mockUserManager,
                mockProblemCategoryManager,
                jest.fn()
            );

            const problem = qg.selectProblem();
            expect(problem).toBeDefined();
        });
    });

    describe('Fixed Problem Pool (Issue Fix)', () => {
        test('problem pool should remain constant despite level increases', () => {
            // Setup: Create problem bank with level 1 and level 2 problems
            window.bancoProblemas = [
                {
                    id: 'level1_problem1',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level1_problem1',
                        texto: 'Level 1 Problem 1',
                        ecuacion: '1+1=__'
                    })
                },
                {
                    id: 'level1_problem2',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level1_problem2',
                        texto: 'Level 1 Problem 2',
                        ecuacion: '2+2=__'
                    })
                },
                {
                    id: 'level1_problem3',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level1_problem3',
                        texto: 'Level 1 Problem 3',
                        ecuacion: '3+3=__'
                    })
                },
                {
                    id: 'level2_problem1',
                    tipo: 'matematico',
                    nivelMin: 2,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level2_problem1',
                        texto: 'Level 2 Problem 1',
                        ecuacion: '4+4=__'
                    })
                },
                {
                    id: 'level2_problem2',
                    tipo: 'matematico',
                    nivelMin: 2,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level2_problem2',
                        texto: 'Level 2 Problem 2',
                        ecuacion: '5+5=__'
                    })
                }
            ];

            questionGenerator.problemType = 'matematico';
            questionGenerator.gameLevel = 1;

            // Select first problem at level 1
            const problem1 = questionGenerator.selectProblem();
            expect(problem1).toBeDefined();
            expect(problem1.id).toMatch(/^level1_/);

            // Mark as solved
            gameEngine.markProblemAsSolved(problem1.id);

            // Simulate level increase (this happens during gameplay)
            questionGenerator.gameLevel = 2;

            // Select second problem - should still only get level 1 problems
            const problem2 = questionGenerator.selectProblem();
            expect(problem2).toBeDefined();
            expect(problem2.id).toMatch(/^level1_/);
            expect(problem2.id).not.toBe(problem1.id);

            // Continue - should still only get level 1 problems
            gameEngine.markProblemAsSolved(problem2.id);
            const problem3 = questionGenerator.selectProblem();
            expect(problem3).toBeDefined();
            expect(problem3.id).toMatch(/^level1_/);
            expect(problem3.id).not.toBe(problem1.id);
            expect(problem3.id).not.toBe(problem2.id);

            // After all level 1 problems solved, should show completion
            gameEngine.markProblemAsSolved(problem3.id);
            const problem4 = questionGenerator.selectProblem();
            expect(problem4).toBeNull();

            // Verify completion message is shown
            const questionArea = document.getElementById('question-area');
            expect(questionArea.innerHTML).toContain('¡Enhorabuena!');
        });

        test('resetProblemSession should allow new problem pool after session restart', () => {
            // Setup same problem bank as previous test
            window.bancoProblemas = [
                {
                    id: 'level1_problem',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level1_problem',
                        texto: 'Level 1 Problem',
                        ecuacion: '1+1=__'
                    })
                },
                {
                    id: 'level2_problem',
                    tipo: 'matematico',
                    nivelMin: 2,
                    categorias: ['explorador'],
                    generar: () => ({
                        id: 'level2_problem',
                        texto: 'Level 2 Problem',
                        ecuacion: '2+2=__'
                    })
                }
            ];

            // Session 1: Start at level 1
            questionGenerator.problemType = 'matematico';
            questionGenerator.gameLevel = 1;

            const problem1 = questionGenerator.selectProblem();
            expect(problem1.id).toBe('level1_problem');

            // Session 2: Reset and start at level 2
            questionGenerator.resetProblemSession();
            gameEngine.resetSolvedProblems();
            questionGenerator.gameLevel = 2;

            const problem2 = questionGenerator.selectProblem();
            // After reset at level 2, should now have access to both level 1 and 2 problems
            expect(problem2).toBeDefined();
            expect(problem2.id).toMatch(/^level[12]_problem$/);
            
            // Verify the pool now includes level 2 problems by attempting to select multiple times
            const selectedIds = new Set();
            for (let i = 0; i < 10; i++) {
                questionGenerator.resetProblemSession();
                gameEngine.resetSolvedProblems();
                questionGenerator.gameLevel = 2;
                const p = questionGenerator.selectProblem();
                if (p) selectedIds.add(p.id);
            }
            // Should be able to find both level 1 and level 2 problems in the pool
            expect(selectedIds.size).toBeGreaterThan(1);
        });
    });
});
