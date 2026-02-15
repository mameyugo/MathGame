/**
 * Test to reproduce the bug: "sometimes after solving a problem, the next one doesn't appear"
 */

const QuestionGenerator = require('../docs/js/managers/QuestionGenerator');

describe('Bug Reproduction: Next problem doesn\'t appear', () => {
    let questionGenerator;
    let mockUserManager;
    let mockProblemCategoryManager;
    let mockGameEngine;
    let solvedProblems;

    beforeEach(() => {
        // Mock DOM elements with createElement support
        const mockElement = {
            innerHTML: '',
            innerText: '',
            style: {},
            className: '',
            type: '',
            value: '',
            classList: {
                add: jest.fn(),
                remove: jest.fn(),
                toggle: jest.fn()
            },
            appendChild: jest.fn(),
            addEventListener: jest.fn(),
            setAttribute: jest.fn(),
            focus: jest.fn()
        };

        document.body.innerHTML = `
            <div id="question-area"></div>
            <div id="equation-area"></div>
        `;

        // Mock createElement to return mockElement
        document.createElement = jest.fn((tag) => {
            const elem = {...mockElement};
            elem.tagName = tag.toUpperCase();
            return elem;
        });

        // Mock querySelectorAll and querySelector
        document.querySelectorAll = jest.fn(() => []);
        document.querySelector = jest.fn(() => null);

        // Create test problems
        global.window = global.window || {};
        window.bancoProblemas = [
                {
                    id: 'test1',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        texto: 'Test problem 1',
                        respuestaCorrecta: 5,
                        ecuacion: '2 + 3 = __',
                        ecuacionValores: [5],
                        tipoRespuesta: 'numero'
                    })
                },
                {
                    id: 'test2',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        texto: 'Test problem 2',
                        respuestaCorrecta: 10,
                        ecuacion: '5 + 5 = __',
                        ecuacionValores: [10],
                        tipoRespuesta: 'numero'
                    })
                },
                {
                    id: 'test3',
                    tipo: 'matematico',
                    nivelMin: 1,
                    categorias: ['explorador'],
                    generar: () => ({
                        texto: 'Test problem 3',
                        respuestaCorrecta: 15,
                        ecuacion: '10 + 5 = __',
                        ecuacionValores: [15],
                        tipoRespuesta: 'numero'
                    })
                }
            ];
        
        window.showFeedbackMessage = jest.fn();

        solvedProblems = new Set();

        mockUserManager = {
            getCurrentUser: jest.fn(() => ({
                idioma: 'es'
            })),
            getProblemCategories: jest.fn(() => ['explorador'])
        };

        mockProblemCategoryManager = {
            hasValidSelection: jest.fn(() => true),
            filterProblemsByCategories: jest.fn((probs) => probs)
        };

        mockGameEngine = {
            getSolvedProblems: jest.fn(() => solvedProblems)
        };

        questionGenerator = new QuestionGenerator(
            mockUserManager,
            mockProblemCategoryManager,
            jest.fn(),
            mockGameEngine
        );
    });

    test('should generate next problem after solving one', () => {
        // Setup
        questionGenerator.setProblemType('matematico');
        questionGenerator.setGameLevel(1);

        console.log('bancoProblemas:', global.window.bancoProblemas);
        console.log('problemType:', questionGenerator.problemType);
        console.log('gameLevel:', questionGenerator.gameLevel);

        // Generate first problem
        questionGenerator.generateProblem();
        const problem1 = questionGenerator.getCurrentProblem();
        console.log('Generated problem1:', problem1);
        
        expect(problem1).not.toBeNull();
        expect(problem1).toBeDefined();
        
        const id1 = problem1.id;
        expect(id1).toBeDefined();

        // Mark as solved
        solvedProblems.add(id1);

        // Generate second problem
        questionGenerator.generateProblem();
        const problem2 = questionGenerator.getCurrentProblem();
        expect(problem2).not.toBeNull();
        expect(problem2.id).not.toBe(id1); // Should be different

        // Mark as solved
        const id2 = problem2.id;
        solvedProblems.add(id2);

        // Generate third problem
        questionGenerator.generateProblem();
        const problem3 = questionGenerator.getCurrentProblem();
        expect(problem3).not.toBeNull();
        expect(problem3.id).not.toBe(id1);
        expect(problem3.id).not.toBe(id2);
    });

    test('should show completion message when all problems are solved', () => {
        questionGenerator.setProblemType('matematico');
        questionGenerator.setGameLevel(1);

        // Solve all 3 problems
        for (let i = 0; i < 3; i++) {
            questionGenerator.generateProblem();
            const problem = questionGenerator.getCurrentProblem();
            if (problem && problem.id) {
                solvedProblems.add(problem.id);
            }
        }

        // Try to generate one more - should show completion
        questionGenerator.generateProblem();
        const problem = questionGenerator.getCurrentProblem();
        expect(problem).toBeNull();
        
        // Check that completion message was shown
        const questionArea = document.getElementById('question-area');
        expect(questionArea.innerHTML).toContain('completado');
    });

    test('should handle empty category filter by falling back to candidates', () => {
        // Mock to return empty array for filtered categories
        mockProblemCategoryManager.filterProblemsByCategories = jest.fn(() => []);
        
        questionGenerator.setProblemType('matematico');
        questionGenerator.setGameLevel(1);

        questionGenerator.generateProblem();
        const problem = questionGenerator.getCurrentProblem();
        
        // Should still get a problem from the fallback to candidates
        expect(problem).not.toBeNull();
    });
});
