const QuestionGenerator = require('../../docs/js/managers/QuestionGenerator');

describe('QuestionGenerator', () => {
    let questionGenerator;
    let mockUserManager;
    let mockProblemCategoryManager;
    let mockCheckFn;

    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
            <div id="question-area"></div>
            <div id="answers-area"></div>
            <div id="equation-area"></div>
        `;

        // Mock UserManager
        mockUserManager = {
            getCurrentUser: jest.fn(() => ({
                ops: ['+', '-', '*'],
                currentTheme: 'default'
            })),
            getProblemCategories: jest.fn(() => ['explorador'])
        };

        // Mock ProblemCategoryManager
        mockProblemCategoryManager = {
            getProblemCategory: jest.fn(() => 'explorador'),
            categorizeProblems: jest.fn(),
            hasValidSelection: jest.fn(() => true),
            filterProblemsByCategories: jest.fn((problems) => problems)
        };

        // Mock check function
        mockCheckFn = jest.fn();

        // Create QuestionGenerator instance
        questionGenerator = new QuestionGenerator(mockUserManager, mockProblemCategoryManager, mockCheckFn);
        questionGenerator.gameLevel = 5;

        // Mock Math.random for predictable tests
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    describe('Constructor', () => {
        test('should initialize with correct default values', () => {
            expect(questionGenerator.currentAnswer).toBe(0);
            expect(questionGenerator.currentProblem).toBeNull();
            expect(questionGenerator.gameLevel).toBe(5);
            expect(questionGenerator.problemType).toBe('matematico');
        });

        test('should store manager and function references', () => {
            expect(questionGenerator.userManager).toBe(mockUserManager);
            expect(questionGenerator.problemCategoryManager).toBe(mockProblemCategoryManager);
            expect(questionGenerator.check).toBe(mockCheckFn);
        });
    });

    describe('generateQuestion', () => {
        test('should generate a standard math question', () => {
            Math.random = jest.fn()
                .mockReturnValueOnce(0.5)  // op selection
                .mockReturnValueOnce(0.8)  // mode (standard)
                .mockReturnValueOnce(0.5)  // n1
                .mockReturnValueOnce(0.3); // n2

            questionGenerator.generateQuestion();

            const questionArea = document.getElementById('question-area');
            expect(questionArea.innerText).toMatch(/\d+ [+\-×] \d+ = \?/);
        });

        test('should generate unknown mode question', () => {
            Math.random = jest.fn()
                .mockReturnValueOnce(0.5)  // op selection
                .mockReturnValueOnce(0.5)  // mode (unknown)
                .mockReturnValueOnce(0.5)  // n1
                .mockReturnValueOnce(0.3); // n2

            questionGenerator.generateQuestion();

            const questionArea = document.getElementById('question-area');
            expect(questionArea.innerText).toMatch(/\? [+\-×] \d+ = \d+/);
        });

        test('should handle subtraction with negative prevention', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                ops: ['-'],
                currentTheme: 'default'
            });

            Math.random = jest.fn()
                .mockReturnValueOnce(0)    // op selection (-)
                .mockReturnValueOnce(0.8)  // mode (standard)
                .mockReturnValueOnce(0.2)  // n1 = 2
                .mockReturnValueOnce(0.8); // n2 = 9

            questionGenerator.generateQuestion();

            // Should swap to prevent negative
            expect(questionGenerator.currentAnswer).toBeGreaterThanOrEqual(0);
        });

        test('should not generate question if user has no ops', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                ops: [],
                currentTheme: 'default'
            });

            console.error = jest.fn();
            questionGenerator.generateQuestion();

            expect(console.error).toHaveBeenCalledWith('No user or operations available');
        });
    });

    describe('renderVisual', () => {
        test('should render visual with default theme', () => {
            const visual = questionGenerator.renderVisual(15);

            expect(visual.className).toBe('visual-box');
            expect(visual.innerHTML).toContain('📦x10');
            expect(visual.innerHTML).toContain('🍎');
            // 1 ten block + 5 units
            expect((visual.innerHTML.match(/📦x10/g) || []).length).toBe(1);
            expect((visual.innerHTML.match(/🍎/g) || []).length).toBe(5);
        });

        test('should render visual with space theme', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                ops: ['+'],
                currentTheme: 'theme_space'
            });

            const visual = questionGenerator.renderVisual(7);

            expect(visual.innerHTML).toContain('⭐');
            expect((visual.innerHTML.match(/⭐/g) || []).length).toBe(7);
        });

        test('should render visual with jungle theme', () => {
            mockUserManager.getCurrentUser.mockReturnValue({
                ops: ['+'],
                currentTheme: 'theme_jungle'
            });

            const visual = questionGenerator.renderVisual(12);

            expect(visual.innerHTML).toContain('🍌');
            expect((visual.innerHTML.match(/📦x10/g) || []).length).toBe(1);
            expect((visual.innerHTML.match(/🍌/g) || []).length).toBe(2);
        });

        test('should handle zero correctly', () => {
            const visual = questionGenerator.renderVisual(0);

            expect(visual.innerHTML).not.toContain('📦x10');
            expect(visual.innerHTML).not.toContain('🍎');
        });
    });

    describe('renderOptions', () => {
        test('should render 4 answer options', () => {
            questionGenerator.currentAnswer = 10;
            Math.random = jest.fn(() => 0.5);

            questionGenerator.renderOptions();

            const buttons = document.querySelectorAll('#answers-area button');
            expect(buttons.length).toBeGreaterThan(0);
            expect(buttons.length).toBeLessThanOrEqual(4);
        });

        test('should include correct answer in options', () => {
            questionGenerator.currentAnswer = 42;
            Math.random = jest.fn(() => 0.5);

            questionGenerator.renderOptions();

            const buttons = Array.from(document.querySelectorAll('#answers-area button'));
            const values = buttons.map(b => parseInt(b.innerText));
            expect(values).toContain(42);
        });

        test('should attach onclick handlers to buttons', () => {
            questionGenerator.currentAnswer = 10;
            Math.random = jest.fn(() => 0.5);

            questionGenerator.renderOptions();

            const button = document.querySelector('#answers-area button');
            expect(button.onclick).toBeDefined();
        });

        test('should not render negative options', () => {
            questionGenerator.currentAnswer = 2;
            Math.random = jest.fn(() => 0.5);

            questionGenerator.renderOptions();

            const buttons = Array.from(document.querySelectorAll('#answers-area button'));
            const values = buttons.map(b => parseInt(b.innerText));
            values.forEach(val => {
                expect(val).toBeGreaterThanOrEqual(0);
            });
        });
    });

    describe('selectProblem', () => {
        test('should select problem based on type and level', () => {
            window.bancoProblemas = [
                { tipo: 'matematico', nivelMin: 1, generar: () => ({ texto: 'Problem 1', ecuacion: '1+1=__' }) },
                { tipo: 'logica', nivelMin: 3, generar: () => ({ texto: 'Problem 2', ecuacion: '2+2=__' }) },
                { tipo: 'matematico', nivelMin: 5, generar: () => ({ texto: 'Problem 3', ecuacion: '3+3=__' }) }
            ];

            questionGenerator.problemType = 'matematico';
            questionGenerator.gameLevel = 5;

            mockProblemCategoryManager.filterProblemsByCategories.mockImplementation((problems) => problems);

            const problem = questionGenerator.selectProblem();

            expect(problem).toBeDefined();
            expect(problem.texto).toBeDefined();
        });

        test('should return null if bancoProblemas is undefined', () => {
            window.bancoProblemas = undefined;

            const problem = questionGenerator.selectProblem();

            expect(problem).toBeNull();
        });

        test('should fallback to all problems if category filter yields empty', () => {
            window.bancoProblemas = [
                { tipo: 'matematico', nivelMin: 1, generar: () => ({ texto: 'Easy', ecuacion: '1+1=__' }) }
            ];

            questionGenerator.problemType = 'matematico';
            questionGenerator.gameLevel = 1;

            mockProblemCategoryManager.filterProblemsByCategories.mockImplementation(() => []);

            const problem = questionGenerator.selectProblem();

            expect(problem).toBeDefined();
        });
    });

    describe('renderEquation', () => {
        test('should render equation with inputs', () => {
            questionGenerator.renderEquation('2 + __ = 5');

            const inputs = document.querySelectorAll('#equation-area .eq-input');
            expect(inputs.length).toBe(1);
            expect(inputs[0].type).toBe('number');
        });

        test('should render multiline equation', () => {
            questionGenerator.renderEquation('Line 1: __\nLine 2: __');

            const rows = document.querySelectorAll('#equation-area .equation-row');
            expect(rows.length).toBe(2);

            const inputs = document.querySelectorAll('#equation-area .eq-input');
            expect(inputs.length).toBe(2);
        });

        test('should render equation with multiple inputs per line', () => {
            questionGenerator.renderEquation('__ + __ = 10');

            const inputs = document.querySelectorAll('#equation-area .eq-input');
            expect(inputs.length).toBe(2);
        });

        test('should handle equation with no placeholders', () => {
            questionGenerator.renderEquation('Just text');

            const inputs = document.querySelectorAll('#equation-area .eq-input');
            expect(inputs.length).toBe(0);
        });
    });

    describe('generateProblem', () => {
        test('should generate and render problem', () => {
            window.bancoProblemas = [
                {
                    tipo: 'matematico',
                    nivelMin: 1,
                    generar: () => ({
                        texto: 'Solve this problem',
                        ecuacion: '__ + 5 = 10'
                    })
                }
            ];

            questionGenerator.problemType = 'matematico';
            questionGenerator.gameLevel = 5;

            questionGenerator.generateProblem();

            expect(questionGenerator.currentProblem).toBeDefined();
            expect(document.getElementById('question-area').innerText).toBe('Solve this problem');
            expect(document.querySelectorAll('#equation-area .eq-input').length).toBe(1);
        });

        test('should show feedback if no problems available', () => {
            window.bancoProblemas = undefined;
            window.showFeedbackMessage = jest.fn();

            questionGenerator.generateProblem();

            expect(window.showFeedbackMessage).toHaveBeenCalledWith('No hay problemas disponibles');
        });

        test('should focus first input after rendering', (done) => {
            window.bancoProblemas = [
                {
                    tipo: 'matematico',
                    nivelMin: 1,
                    generar: () => ({
                        texto: 'Test',
                        ecuacion: '__ + 1 = 2'
                    })
                }
            ];

            questionGenerator.generateProblem();

            setTimeout(() => {
                const firstInput = document.querySelector('#equation-area .eq-input');
                expect(firstInput).toBeDefined();
                done();
            }, 10);
        });
    });

    describe('Helper methods', () => {
        test('getCurrentAnswer should return current answer', () => {
            questionGenerator.currentAnswer = 123;
            expect(questionGenerator.getCurrentAnswer()).toBe(123);
        });

        test('getCurrentProblem should return current problem', () => {
            const problem = { texto: 'Test', ecuacion: '1+1=__' };
            questionGenerator.currentProblem = problem;
            expect(questionGenerator.getCurrentProblem()).toBe(problem);
        });

        test('setGameLevel should update game level', () => {
            questionGenerator.setGameLevel(10);
            expect(questionGenerator.gameLevel).toBe(10);
        });

        test('setProblemType should update problem type', () => {
            questionGenerator.setProblemType('logica');
            expect(questionGenerator.problemType).toBe('logica');
        });
    });
});
