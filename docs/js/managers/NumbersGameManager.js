/**
 * NumbersGameManager - Gestión del modo de juego "Cifras"
 * Genera niveles y valida soluciones para el juego de obtener un número exacto
 * usando operaciones básicas (+, -, *, /) y un conjunto de números disponibles.
 */
class NumbersGameManager {
    constructor() {
        this.largeNumbers = [25, 50, 75, 100];
        this.smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
    }

    /**
     * Genera un nuevo nivel de Cifras
     * @returns {Object} { target: number, numbers: number[] }
     */
    generateLevel() {
        // 1. Generar objetivo (101 - 999)
        const target = Math.floor(Math.random() * 899) + 101;

        // 2. Seleccionar números disponibles
        // Estrategia clásica: 1-4 grandes, el resto pequeños
        const numLarge = Math.floor(Math.random() * 5); // 0 a 4 grandes
        const numSmall = 6 - numLarge;

        const selectedNumbers = [];

        // Mezclar y elegir grandes
        const shuffledLarge = [...this.largeNumbers].sort(() => Math.random() - 0.5);
        for (let i = 0; i < numLarge; i++) {
            selectedNumbers.push(shuffledLarge[i]);
        }

        // Mezclar y elegir pequeños
        const shuffledSmall = [...this.smallNumbers].sort(() => Math.random() - 0.5);
        for (let i = 0; i < numSmall; i++) {
            selectedNumbers.push(shuffledSmall[i]);
        }

        return {
            target: target,
            numbers: selectedNumbers.sort((a, b) => a - b), // Ordenar para presentación
            solution: this.findBestSolution(target, selectedNumbers)
        };
    }

    /**
     * Valida una solución propuesta por el usuario
     * @param {number} target - El número objetivo
     * @param {number[]} availableNumbers - Los números disponibles para jugar
     * @param {string} expression - La expresión matemática (ej: "25 * 4 + 10")
     * @returns {Object} { valid: boolean, value: number, exact: boolean, reason: string }
     */
    checkSolution(target, availableNumbers, expression) {
        if (!expression || expression.trim() === '') {
            return { valid: false, reason: 'Expresión vacía' };
        }

        // 1. Validar caracteres permitidos (números, +, -, *, /, (, ), espacios)
        if (!/^[\d\+\-\*\/\(\)\s]+$/.test(expression)) {
            return { valid: false, reason: 'Caracteres inválidos' };
        }

        // 2. Extraer todos los números usados en la expresión
        const usedNumbersMatches = expression.match(/\d+/g);
        if (!usedNumbersMatches) {
            return { valid: false, reason: 'No hay números' };
        }

        const usedNumbers = usedNumbersMatches.map(Number);

        // 3. Verificar que los números usados están disponibles (y contar repeticiones)
        const availableCount = {};
        availableNumbers.forEach(n => availableCount[n] = (availableCount[n] || 0) + 1);

        for (const num of usedNumbers) {
            if (!availableCount[num] || availableCount[num] === 0) {
                return { valid: false, reason: `Número ${num} no disponible o usado demasiadas veces` };
            }
            availableCount[num]--;
        }

        // 4. Evaluar la expresión de forma segura
        let result;
        try {
            // Usamos Function para evaluar, pero ya hemos sanitizado con regex arriba
            // Aún así, es mejor un evaluador paso a paso para verificar reglas de "Cifras" 
            // (no negativos, no fracciones en pasos intermedios), pero para MVP usaremos eval estándar.
            // NOTA: Para Cifras estricto, cada operación debe dar entero positivo. 
            // Eval JS estándar permite decimales y negativos.

            // Implementación simple con eval para prototipo
            result = new Function('return ' + expression)();

            // Verificar si es entero (algunas reglas de Cifras requieren pasos enteros)
            if (!Number.isInteger(result)) {
                return { valid: false, value: result, reason: 'El resultado no es un número entero' };
            }

        } catch (e) {
            return { valid: false, reason: 'Error de sintaxis en la ecuación' };
        }

        return {
            valid: true,
            value: result,
            exact: result === target
        };
    }

    /**
     * Intenta encontrar una solución (solver simple)
     * Utiliza búsqueda recursiva para encontrar la solución más cercana.
     * @param {number} target - Objetivo
     * @param {number[]} numbers - Números disponibles
     * @returns {Object} { value: number, expression: string, diff: number }
     */
    findBestSolution(target, numbers) {
        let bestSolution = {
            value: 0,
            expression: '',
            diff: Infinity
        };

        // Función auxiliar para recursión
        // currentNums: array de objetos { val: number, expr: string }
        const solve = (currentNums) => {
            // Verificar cada número actual
            for (const n of currentNums) {
                const diff = Math.abs(n.val - target);
                if (diff < bestSolution.diff) {
                    bestSolution = {
                        value: n.val,
                        expression: n.expr,
                        diff: diff
                    };
                }
                if (diff === 0) return; // Solución exacta encontrada
            }

            // Si solo queda 1 número, no podemos operar más
            if (currentNums.length <= 1) return;

            // Intentar combinar cada par de números
            for (let i = 0; i < currentNums.length; i++) {
                for (let j = 0; j < currentNums.length; j++) {
                    if (i === j) continue;

                    const a = currentNums[i];
                    const b = currentNums[j];

                    // Optimización: Conmutatividad (asumimos i < j para + y *)
                    // Pero necesitamos probar a-b y b-a, a/b y b/a

                    // Lista restante sin i ni j
                    const nextNumsBase = currentNums.filter((_, idx) => idx !== i && idx !== j);

                    const ops = [
                        { op: '+', res: a.val + b.val, expr: `(${a.expr} + ${b.expr})` },
                        { op: '-', res: a.val - b.val, expr: `(${a.expr} - ${b.expr})` },
                        { op: '*', res: a.val * b.val, expr: `(${a.expr} * ${b.expr})` },
                        { op: '/', res: b.val !== 0 && a.val % b.val === 0 ? a.val / b.val : null, expr: `(${a.expr} / ${b.expr})` }
                    ];

                    for (const op of ops) {
                        // Reglas Cifras: Resultados intermedios positivos y enteros
                        if (op.res !== null && op.res > 0 && Number.isInteger(op.res)) {
                            // Optimización: evitar x*1, x/1
                            if ((op.op === '*' || op.op === '/') && (a.val === 1 || b.val === 1)) continue;

                            // Optimización conmutativa para suma y mult: solo si i < j (evita duplicados simétricos)
                            if ((op.op === '+' || op.op === '*') && i > j) continue;

                            solve([...nextNumsBase, { val: op.res, expr: op.expr }]);
                            if (bestSolution.diff === 0) return;
                        }
                    }
                }
            }
        };

        // Iniciar recursión con números iniciales
        // Convertir a objetos { val, expr }
        const initialObjs = numbers.map(n => ({ val: n, expr: String(n) }));
        solve(initialObjs);

        return bestSolution;
    }
}

// Exportar para Node.js (tests) y browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumbersGameManager;
}
if (typeof window !== 'undefined') {
    window.NumbersGameManager = NumbersGameManager;
}
