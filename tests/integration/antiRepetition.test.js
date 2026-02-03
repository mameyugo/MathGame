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

        // Initialize GameEngine
        gameEngine = new GameEngine(
            mockUserManager,
            mockTranslationManager,
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
            expect(html).toContain('MateAventura es software libre');
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
});
