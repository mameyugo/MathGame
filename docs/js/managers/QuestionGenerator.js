/**
 * QuestionGenerator - Manages question and problem generation
 * Handles math questions, visual representations, and problem rendering
 */
class QuestionGenerator {
    /**
     * @param {UserManager} userManager - User management instance
     * @param {ProblemCategoryManager} problemCategoryManager - Problem category management instance
     * @param {Function} checkFn - Function to check answers
     */
    constructor(userManager, problemCategoryManager, checkFn) {
        this.userManager = userManager;
        this.problemCategoryManager = problemCategoryManager;
        this.check = checkFn;
        this.currentAnswer = 0;
        this.currentProblem = null;
        this.gameLevel = 1;
        this.problemType = 'matematico';
    }

    /**
     * Generates a random math question
     */
    generateQuestion() {
        const user = this.userManager.getCurrentUser();
        if (!user || !user.ops || user.ops.length === 0) {
            console.error('No user or operations available');
            return;
        }

        const ops = user.ops;
        const op = ops[Math.floor(Math.random() * ops.length)];
        const mode = Math.random();
        let n1 = Math.floor(Math.random() * (this.gameLevel + 5)) + 1;
        let n2 = Math.floor(Math.random() * (this.gameLevel + 5)) + 1;

        // Ensure subtraction doesn't result in negative
        if (op === '-' && n1 < n2) {
            [n1, n2] = [n2, n1];
        }

        this.currentAnswer = eval(`${n1}${op}${n2}`);

        const area = document.getElementById('question-area');
        if (!area) return;

        area.innerHTML = "";

        if (mode < 0.3 && this.gameLevel < 8) {
            // Visual mode
            area.appendChild(this.renderVisual(n1));
            const s = document.createElement('div');
            s.innerText = op.replace('*', '×');
            area.appendChild(s);
            area.appendChild(this.renderVisual(n2));
        } else if (mode < 0.6) {
            // Unknown mode (find first operand)
            area.innerText = `? ${op.replace('*', '×')} ${n2} = ${this.currentAnswer}`;
            this.currentAnswer = n1;
        } else {
            // Standard mode
            area.innerText = `${n1} ${op.replace('*', '×')} ${n2} = ?`;
        }

        this.renderOptions();
    }

    /**
     * Renders visual representation of a number (tens and units)
     * @param {number} num - Number to represent
     * @returns {HTMLElement} Div element with visual representation
     */
    renderVisual(num) {
        const div = document.createElement('div');
        div.className = 'visual-box';
        const tens = Math.floor(num / 10);
        const units = num % 10;

        // Get current theme
        const user = this.userManager.getCurrentUser();
        const theme = user?.currentTheme || 'default';
        let unitIcon = '🍎';

        if (theme === 'theme_space') {
            unitIcon = '⭐';
        } else if (theme === 'theme_jungle') {
            unitIcon = '🍌';
        }

        for (let i = 0; i < tens; i++) {
            div.innerHTML += '<div class="ten-block">📦x10</div>';
        }
        for (let i = 0; i < units; i++) {
            div.innerHTML += `<span class="unit">${unitIcon}</span>`;
        }

        return div;
    }

    /**
     * Renders answer options
     */
    renderOptions() {
        const grid = document.getElementById('answers-area');
        if (!grid) return;

        grid.innerHTML = "";
        let opts = new Set([this.currentAnswer]);

        const addOption = (val) => {
            if (typeof val !== 'number' || Number.isNaN(val)) return;
            if (val < 0) return;
            opts.add(val);
        };

        // 15%: add wrong option with correct result ±10
        if (Math.random() < 0.15) {
            const delta = Math.random() < 0.5 ? -10 : 10;
            addOption(this.currentAnswer + delta);
        }

        // 10%: add wrong option by reversing digits (14 -> 41)
        if (Math.random() < 0.10) {
            const reversed = parseInt(
                String(Math.abs(this.currentAnswer)).split('').reverse().join(''),
                10
            );
            if (!Number.isNaN(reversed) && reversed !== this.currentAnswer) {
                addOption(reversed);
            }
        }

        // Fill remaining options with nearby values
        let guard = 0;
        while (opts.size < 4 && guard < 100) {
            guard++;
            addOption(this.currentAnswer + (Math.floor(Math.random() * 10) - 5));
        }

        // Shuffle and render options
        Array.from(opts)
            .sort(() => Math.random() - 0.5)
            .forEach(o => {
                if (o >= 0) {
                    const b = document.createElement('button');
                    b.className = 'option-btn';
                    b.innerText = o;
                    b.onclick = () => this.check(o);
                    grid.appendChild(b);
                }
            });
    }

    /**
     * Selects a problem based on level, type and selected categories
     * @returns {Object|null} Selected problem
     */
    selectProblem() {
        if (typeof window.bancoProblemas === 'undefined' || !Array.isArray(window.bancoProblemas)) {
            return null;
        }

        // Obtener categorías seleccionadas por el usuario
        const selectedCategories = this.userManager.getProblemCategories();
        
        // Validar que hay al menos una categoría seleccionada
        if (!this.problemCategoryManager.hasValidSelection(selectedCategories)) {
            console.warn('No problem categories selected');
            return null;
        }

        // Filtrar problemas por tipo y nivel
        const candidates = window.bancoProblemas.filter(
            p => p.tipo === this.problemType && p.nivelMin <= this.gameLevel
        );
        
        // Filtrar por categorías seleccionadas
        const filteredByCategory = this.problemCategoryManager.filterProblemsByCategories(
            candidates,
            selectedCategories
        );
        
        // Si no hay problemas después de filtrar por categorías, usar todos los candidatos
        const pool = filteredByCategory.length ? filteredByCategory : candidates;
        
        if (pool.length === 0) {
            console.warn('No problems available for selected criteria');
            return null;
        }
        
        const pick = pool[Math.floor(Math.random() * pool.length)];
        return pick?.generar ? pick.generar() : null;
    }

    /**
     * Renders equation with empty inputs
     * @param {string} equation - Equation string with __ placeholders
     */
    renderEquation(equation) {
        const equationArea = document.getElementById('equation-area');
        if (!equationArea) return;

        equationArea.innerHTML = '';
        const lines = String(equation).split('\n');

        lines.forEach(line => {
            const row = document.createElement('div');
            row.className = 'equation-row';

            const parts = line.split('__');
            parts.forEach((part, idx) => {
                row.insertAdjacentText('beforeend', part);
                if (idx < parts.length - 1) {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'eq-input';
                    input.setAttribute('data-eq', '1');
                    row.appendChild(input);
                }
            });

            equationArea.appendChild(row);
        });
    }

    /**
     * Generates a problem
     */
    generateProblem() {
        this.currentProblem = this.selectProblem();
        if (!this.currentProblem) {
            // Show feedback if available
            if (typeof window.showFeedbackMessage === 'function') {
                window.showFeedbackMessage('No hay problemas disponibles');
            }
            return;
        }

        const area = document.getElementById('question-area');
        if (area) {
            area.innerText = this.currentProblem.texto;
        }

        this.renderEquation(this.currentProblem.ecuacion);

        // Focus first input for faster answering
        setTimeout(() => {
            const firstInput = document.querySelector('#equation-area .eq-input');
            if (firstInput) firstInput.focus();
        }, 0);
    }

    /**
     * Gets the current answer
     * @returns {number} Current answer
     */
    getCurrentAnswer() {
        return this.currentAnswer;
    }

    /**
     * Gets the current problem
     * @returns {Object|null} Current problem
     */
    getCurrentProblem() {
        return this.currentProblem;
    }

    /**
     * Sets the game level
     * @param {number} level - Game level
     */
    setGameLevel(level) {
        this.gameLevel = level;
    }

    /**
     * Sets the problem type
     * @param {string} type - Problem type ('logica' or 'matematico')
     */
    setProblemType(type) {
        this.problemType = type;
    }
}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionGenerator;
}
if (typeof window !== 'undefined') {
    window.QuestionGenerator = QuestionGenerator;
}
