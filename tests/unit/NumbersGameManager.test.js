const NumbersGameManager = require('../../docs/js/managers/NumbersGameManager');

describe('NumbersGameManager', () => {
    let manager;

    beforeEach(() => {
        manager = new NumbersGameManager();
    });

    test('generateLevel creates correct structure', () => {
        const level = manager.generateLevel();

        // Target check
        expect(level.target).toBeGreaterThanOrEqual(101);
        expect(level.target).toBeLessThanOrEqual(999);

        // Numbers check
        expect(level.numbers).toHaveLength(6);
        level.numbers.forEach(n => {
            expect(n).toBeGreaterThan(0);
        });

        // Check sorting
        const sorted = [...level.numbers].sort((a, b) => a - b);
        expect(level.numbers).toEqual(sorted);

        // Solution should be calculated async now, so it should be undefined here
        expect(level.solution).toBeUndefined();
    });

    test('findBestSolutionAsync returns valid solution', async () => {
        const level = manager.generateLevel();
        const solution = await manager.findBestSolutionAsync(level.target, level.numbers);

        expect(solution).toBeDefined();
        expect(solution.value).toBeDefined();

        if (solution.expression) {
            const check = manager.checkSolution(level.target, level.numbers, solution.expression);
            if (solution.diff === 0) {
                expect(check.valid).toBe(true);
                expect(check.exact).toBe(true);
                expect(check.value).toBe(level.target);
            }
        }
    });

    test('checkSolution validates correct exact solution', () => {
        const target = 150;
        const available = [100, 50, 1, 1, 1, 1];
        const expr = "100 + 50";

        const result = manager.checkSolution(target, available, expr);
        expect(result.valid).toBe(true);
        expect(result.value).toBe(150);
        expect(result.exact).toBe(true);
    });

    test('checkSolution detects invalid numbers (not in list)', () => {
        const target = 150;
        const available = [100, 50, 1, 1, 1, 1];
        // 5 is not in available
        const expr = "100 + 45 + 5";

        const result = manager.checkSolution(target, available, expr);
        expect(result.valid).toBe(false);
        expect(result.reason).toMatch(/no disponible/);
    });

    test('checkSolution detects repeated usage beyond available', () => {
        const target = 200;
        const available = [100, 50, 1, 1, 1, 1]; // Only one 100
        const expr = "100 + 100"; // Uses 100 twice

        const result = manager.checkSolution(target, available, expr);
        expect(result.valid).toBe(false);
        expect(result.reason).toMatch(/demasiadas veces/);
    });

    test('checkSolution validates safe characters', () => {
        const target = 150;
        const available = [100, 50];
        const expr = "alert('bonus')";

        const result = manager.checkSolution(target, available, expr);
        expect(result.valid).toBe(false);
        expect(result.reason).toMatch(/Caracteres inválidos/);
    });

    test('checkSolution allows parenthesis', () => {
        const target = 300;
        const available = [100, 50, 2];
        const expr = "(100 + 50) * 2";

        const result = manager.checkSolution(target, available, expr);
        expect(result.valid).toBe(true);
        expect(result.value).toBe(300);
    });
});
