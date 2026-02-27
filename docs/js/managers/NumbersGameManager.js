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
            numbers: selectedNumbers.sort((a, b) => a - b) // Ordenar para presentación
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
            // Implementación simple con eval para prototipo
            result = new Function('return ' + expression)();

            // Verificar si es entero
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
     * Intenta encontrar una solución de forma asíncrona (Promise)
     * para no bloquear el hilo principal de la UI.
     * @param {number} target 
     * @param {number[]} numbers 
     * @returns {Promise<Object>}
     */
    findBestSolutionAsync(target, numbers) {
        return new Promise((resolve) => {
            // Usamos setTimeout para mover la ejecución al final de la cola de eventos
            // permitiendo que la UI se renderice antes de procesar esto.
            setTimeout(() => {
                const solution = this.findBestSolution(target, numbers);
                resolve(solution);
            }, 100);
        });
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

            if (currentNums.length <= 1) return;

            // Intentar combinar cada par de números
            for (let i = 0; i < currentNums.length; i++) {
                for (let j = 0; j < currentNums.length; j++) {
                    if (i === j) continue;

                    const a = currentNums[i];
                    const b = currentNums[j];
                    const nextNumsBase = currentNums.filter((_, idx) => idx !== i && idx !== j);

                    const ops = [
                        { op: '+', res: a.val + b.val, expr: `(${a.expr} + ${b.expr})` },
                        { op: '-', res: a.val - b.val, expr: `(${a.expr} - ${b.expr})` },
                        { op: '*', res: a.val * b.val, expr: `(${a.expr} * ${b.expr})` },
                        { op: '/', res: b.val !== 0 && a.val % b.val === 0 ? a.val / b.val : null, expr: `(${a.expr} / ${b.expr})` }
                    ];

                    for (const op of ops) {
                        if (op.res !== null && op.res > 0 && Number.isInteger(op.res)) {
                            if ((op.op === '*' || op.op === '/') && (a.val === 1 || b.val === 1)) continue;
                            if ((op.op === '+' || op.op === '*') && i > j) continue;

                            solve([...nextNumsBase, { val: op.res, expr: op.expr }]);
                            if (bestSolution.diff === 0) return;
                        }
                    }
                }
            }
        };

        const initialObjs = numbers.map(n => ({ val: n, expr: String(n) }));
        solve(initialObjs);

        return bestSolution;
    }

    /**
     * Renderiza la interfaz del juego
     * @param {Object} level - Nivel generado
     * @returns {Promise<string>} HTML del área de juego
     */
    async renderGame(level) {
        if (!this.templateManager) {
            this.templateManager = new TemplateManager();
        }

        const numbersHtml = level.numbers.map(n => `<div class="number-card">${n}</div>`).join('');

        // Note: translation handling might need to be passed in or handled by TemplateManager if userManager/translationManager is available.
        // For now, hardcoding the fallback text or assuming TemplateManager might handle i18n later if expanded.
        // But since NumbersGameManager constructor is empty, we don't have translationManager instance here.
        // We'll leave the data-i18n attribute for the client-side translation logic (if any runs after render).
        // OR we can pass translationManager to renderGame if we want server-side-like rendering.
        // Given existing code, it seems translation happens via `data-i18n` replacement in some other pass or just CSS/JS?
        // Actually app.js has `translationManager`.

        return await this.templateManager.render('numbers-game', {
            target: level.target,
            numbers_html: numbersHtml,
            instruction_text: 'Escribe una operación exacta usando estos números (+, -, *, /, paréntesis)'
        });
    }

    /**
     * Muestra el modal de resultados
     * @param {Object} solution - La mejor solución encontrada
     * @param {Function} onHome - Callback para ir al inicio
     * @param {Function} onRetry - Callback para intentar de nuevo
     */
    showResult(solution, onHome, onRetry) {
        const isExact = solution.diff === 0;
        const title = isExact ? '¡Se acabó el tiempo!' : '¡Tiempo agotado!';
        const subTitle = isExact ? 'Solución exacta encontrada:' : `No se encontró exacto (Dif: ${solution.diff})`;

        const modalId = 'numbers-game-result-modal';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content result-content">
                <h2>${title}</h2>
                <p class="result-subtitle">${subTitle}</p>
                <div class="result-expression-box">
                    ${solution.expression} = ${solution.value}
                </div>
                <div class="result-actions">
                    <button id="btn-ng-home" class="btn-back">🏠 Inicio</button>
                    <button id="btn-ng-retry" class="main-btn">🔄 Nuevo Juego</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('btn-ng-home').onclick = () => {
            modal.remove();
            if (onHome) onHome();
        };

        document.getElementById('btn-ng-retry').onclick = () => {
            modal.remove();
            if (onRetry) onRetry();
        };
    }

    /**
     * Inicia una partida de Cifras
     * @param {Object} gameEngine - Referencia al motor del juego
     * @returns {Promise<Object>} El objeto problema generado
     */
    async startGame(gameEngine) {
        // Generar nivel
        const level = this.generateLevel();

        // Configurar entorno de problema en GameEngine
        gameEngine.problemMode = true;
        gameEngine.problemType = 'numbers_game';

        // initGameSession solo se llama al iniciar una sesión nueva (primera vez o retry).
        // Si ya hay una sesión activa (el jugador acaba de acertar), solo reiniciamos el timer
        // sin tocar monedas, nivel ni sessionEnded.
        const isNewSession = gameEngine.sessionEnded || !gameEngine.timerInterval;

        if (isNewSession) {
            gameEngine.initGameSession(gameEngine.gameLevel, gameEngine.gameCoins);
            // initGameSession ya configura el timer a 60s y llama startTimer().
            // Sobreescribimos a 90s específicos para Cifras.
            gameEngine.timeLeft = 90;
            gameEngine.setTimeLeft(90);
        } else {
            // Ronda siguiente dentro de la misma sesión: solo reiniciar el timer a 90s.
            gameEngine.timeLeft = 90;
            gameEngine.setTimeLeft(90);
            gameEngine.startTimer();
        }

        // Crear objeto problema
        const problem = {
            id: 'numbers_game_' + Date.now(),
            tipoRespuesta: 'numbers_game',
            target: level.target,
            numbers: level.numbers,
            solution: null,
            explicacion: `Objetivo: ${level.target} con [${level.numbers.join(', ')}]`
        };

        // Renderizar UI (zona de pregunta)
        const questionArea = document.getElementById('question-area');
        if (questionArea) {
            questionArea.innerHTML = await this.renderGame(level);
        }

        // Renderizar UI (zona de respuesta)
        const equationArea = document.getElementById('equation-area');
        if (equationArea) {
            equationArea.style.display = 'block';

            if (!this.templateManager) {
                this.templateManager = new TemplateManager();
            }

            equationArea.innerHTML = await this.templateManager.render('numbers-game-input', {
                placeholder: 'Ej: (25 * 4) + 1'
            });
        }

        // Gestionar visibilidad de botones
        const submitBtn = document.getElementById('btn-submit-problem');
        if (submitBtn) submitBtn.style.display = 'block';

        const answersArea = document.getElementById('answers-area');
        if (answersArea) answersArea.style.display = 'none';

        // Auto-focus (pequeño delay para asegurar renderizado)
        setTimeout(() => document.getElementById('numbers-game-input')?.focus(), 100);

        // Calcular solución asíncronamente
        this.findBestSolutionAsync(level.target, level.numbers)
            .then(solution => {
                if (problem && problem.id) {
                    problem.solution = solution;
                }
            })
            .catch(err => console.error('Error calculando solución:', err));

        return problem;
    }
}

// Exportar para Node.js (tests) y browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumbersGameManager;
}

if (typeof window !== 'undefined') {
    window.NumbersGameManager = NumbersGameManager;
}
