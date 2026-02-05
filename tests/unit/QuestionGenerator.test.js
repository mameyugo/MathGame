const QuestionGenerator = require('../../docs/js/managers/QuestionGenerator');

describe('QuestionGenerator', () => {
    let questionGenerator;
    let mockUserManager;
    let mockProblemCategoryManager;
    let mockCheckFn;
    let mockGameEngine;

    beforeEach(() => {
        // Mock DOM
        document.body.innerHTML = `
            <div id="question-area"></div>
            <div id="answers-area"></div>
            <div id="equation-area"></div>
        `;

        mockUserManager = {
            getCurrentUser: jest.fn(() => ({
                ops: ['+', '-'],
                currentTheme: 'default',
                idioma: 'es'
            })),
            getProblemCategories: jest.fn(() => ['explorador'])
        };

        mockProblemCategoryManager = {
            hasValidSelection: jest.fn(() => true),
            filterProblemsByCategories: jest.fn((probs) => probs)
        };

        mockCheckFn = jest.fn();
        mockGameEngine = {
            getSolvedProblems: jest.fn(() => new Set())
        };

        questionGenerator = new QuestionGenerator(
            mockUserManager,
            mockProblemCategoryManager,
            mockCheckFn,
            mockGameEngine
        );

        // Spy on Math.random
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should initialize correctly', () => {
        expect(questionGenerator).toBeDefined();
        expect(questionGenerator.currentAnswer).toBe(0);
    });

    test('should generate math question params safely', () => {
        const params = questionGenerator.generateMathQuestionParams();
        expect(params).toBeDefined();
        expect(params.n1).toBeGreaterThan(0);
        expect(params.n2).toBeGreaterThan(0);
        expect(['+', '-']).toContain(params.op);
    });

    test('should render question to DOM', () => {
        // Override random for specific op
        global.Math.random.mockReturnValueOnce(0.1)  // op index 0 (+)
            .mockReturnValueOnce(0.8)  // mode (standard)
            .mockReturnValueOnce(0.5)  // n1
            .mockReturnValueOnce(0.5); // n2

        questionGenerator.generateQuestion();

        const area = document.getElementById('question-area');
        // Check logical execution
        expect(questionGenerator.currentAnswer).toBeGreaterThan(0);
    });

    test('should calculate answer correctly with new switch logic', () => {
        const params = { n1: 5, n2: 3, op: '+', mode: 0.9 };
        questionGenerator.renderQuestionFromParams(params);
        expect(questionGenerator.currentAnswer).toBe(8);

        const params2 = { n1: 5, n2: 3, op: '-', mode: 0.9 };
        questionGenerator.renderQuestionFromParams(params2);
        expect(questionGenerator.currentAnswer).toBe(2);
    });

    test('should render visual elements', () => {
        const visual = questionGenerator.renderVisual(12);
        expect(visual.innerHTML).toContain('📦x10');
        expect(visual.innerHTML).toContain('🍎');
    });

    test('should render options', () => {
        questionGenerator.currentAnswer = 10;
        questionGenerator.renderOptions();
        const btns = document.querySelectorAll('#answers-area button');
        expect(btns.length).toBeGreaterThan(0);
    });

    test('should select problem from pool', () => {
        window.bancoProblemas = [
            { tipo: 'matematico', nivelMin: 1, generar: () => ({ texto: 'Test Problem', ecuacion: '1+1=__' }) }
        ];

        const problem = questionGenerator.selectProblem();
        expect(problem).toBeDefined();
        expect(problem.texto).toBe('Test Problem');
    });

    test('should render equation inputs', () => {
        questionGenerator.renderEquation('1 + __ = 2');
        const inputs = document.querySelectorAll('#equation-area input');
        expect(inputs.length).toBe(1);
    });
});
