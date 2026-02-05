/**
 * QuestionGenerator - Manages question and problem generation
 * Handles math questions, visual representations, and problem rendering
 */
class QuestionGenerator {
    /**
     * @param {UserManager} userManager - User management instance
     * @param {ProblemCategoryManager} problemCategoryManager - Problem category management instance
     * @param {Function} checkFn - Function to check answers
     * @param {GameEngine} gameEngine - Game engine instance for tracking
     */
    constructor(userManager, problemCategoryManager, checkFn, gameEngine = null) {
        this.userManager = userManager;
        this.problemCategoryManager = problemCategoryManager;
        this.check = checkFn;
        this.currentAnswer = 0;
        this.currentProblem = null;
        this.gameLevel = 1;
        this.problemType = 'matematico';
        this.gameEngine = gameEngine;
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

        // Ensure division results in an integer (n1 must be divisible by n2)
        if (op === '/') {
            n2 = Math.max(1, Math.floor(Math.random() * (this.gameLevel + 3)) + 1);
            const quotient = Math.floor(Math.random() * (this.gameLevel + 3)) + 1;
            n1 = n2 * quotient; // Ensure exact division
        }

        this.currentAnswer = eval(`${n1}${op}${n2}`);

        const area = document.getElementById('question-area');
        if (!area) return;

        area.innerHTML = "";

        if (mode < 0.3 && this.gameLevel < 8 && op !== '/') {
            // Visual mode (not for division)
            area.appendChild(this.renderVisual(n1));
            const s = document.createElement('div');
            s.innerText = op.replace('*', '×');
            area.appendChild(s);
            area.appendChild(this.renderVisual(n2));
        } else if (mode < 0.6) {
            // Unknown mode (find first operand)
            const opSymbol = op.replace('*', '×').replace('/', '÷');
            area.innerText = `? ${opSymbol} ${n2} = ${this.currentAnswer}`;
            this.currentAnswer = n1;
        } else {
            // Standard mode
            const opSymbol = op.replace('*', '×').replace('/', '÷');
            area.innerText = `${n1} ${opSymbol} ${n2} = ?`;
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
        let pool = filteredByCategory.length ? filteredByCategory : candidates;

        // Filtrar problemas ya resueltos en esta sesión
        if (this.gameEngine) {
            const solvedProblems = this.gameEngine.getSolvedProblems();
            const unsolvedProblems = pool.filter(p => !solvedProblems.has(p.id));

            // Si quedan problemas sin resolver, usarlos
            if (unsolvedProblems.length > 0) {
                pool = unsolvedProblems;
            } else if (pool.length > 0) {
                // Todos los problemas disponibles ya fueron resueltos
                this.showCompletionMessage();
                return null;
            }
        }

        if (pool.length === 0) {
            console.warn('No problems available for selected criteria');
            return null;
        }

        const pick = pool[Math.floor(Math.random() * pool.length)];
        const generated = pick?.generar ? pick.generar() : null;

        // Add the problem ID to the generated problem so it can be tracked
        if (generated && pick.id) {
            generated.id = pick.id;
        }

        return generated;
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
                // Envolver el texto en un span para poder ocultarlo independientemente
                if (part.trim()) {
                    const textSpan = document.createElement('span');
                    textSpan.className = 'eq-text';
                    textSpan.textContent = part;
                    row.appendChild(textSpan);
                } else if (part) {
                    row.insertAdjacentText('beforeend', part);
                }

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
            // Get current user language
            const user = this.userManager.getCurrentUser();
            const userLanguage = user?.idioma || 'es';

            // Try to get translated text using i18n system
            const translatedText = this.getTranslatedProblemText(
                this.currentProblem.id || '',
                userLanguage
            );

            // Use translated text if available, otherwise use original
            area.innerText = translatedText || this.currentProblem.texto;
        }

        // Usar el nuevo renderProblemUI para soportar diferentes tipos de respuesta
        this.renderProblemUI(this.currentProblem);
    }

    /**
     * Gets translated text for a problem using i18n system
     * @param {string} problemId - ID of the problem
     * @param {string} language - Language code (es/gl/en/fr/ca/pt/de)
     * @returns {string|null} Translated text or null if not available
     */
    getTranslatedProblemText(problemId, language) {
        if (!window.getTranslation || typeof window.getTranslation !== 'function') {
            return null;
        }

        try {
            // Get the generated problem data to extract parameters
            // For now, return the base text without parameters
            // In a future enhancement, we could parse the generar() function
            // to extract and pass the correct parameters
            const baseText = window.getTranslation(language, problemId, 'texto');
            return baseText || null;
        } catch (error) {
            console.warn(`Translation not available for problem: ${problemId}, language: ${language}`);
            return null;
        }
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
     * Renders UI for problem answers based on response type
     * @param {Object} problem - Problem object
     */
    renderProblemUI(problem) {
        const equationArea = document.getElementById('equation-area');
        if (!equationArea) return;

        const tipoRespuesta = problem.tipoRespuesta || 'numero';

        // Limpiar área
        equationArea.innerHTML = '';

        if (tipoRespuesta === 'numero') {
            // Renderizar ecuación con inputs numéricos (comportamiento actual)
            this.renderEquation(problem.ecuacion);

            // Ocultar solo el texto de la ecuación inicialmente
            const equationTexts = document.querySelectorAll('#equation-area .eq-text');
            equationTexts.forEach(text => {
                text.style.opacity = '0';
            });

            // Focus first input inmediatamente
            const firstInput = document.querySelector('#equation-area .eq-input');
            if (firstInput) firstInput.focus();

            // Mostrar texto de la ecuación después de 10 segundos
            setTimeout(() => {
                equationTexts.forEach(text => {
                    text.style.transition = 'opacity 0.5s ease';
                    text.style.opacity = '1';
                });
            }, 10000);

        } else if (tipoRespuesta === 'opcion_multiple') {
            this.renderMultipleChoice(problem);
        } else if (tipoRespuesta === 'texto') {
            this.renderTextInput(problem);
        }
    }

    /**
     * Renders multiple choice buttons
     * @param {Object} problem - Problem object
     */
    renderMultipleChoice(problem) {
        const equationArea = document.getElementById('equation-area');

        const container = document.createElement('div');
        container.className = 'multiple-choice-container';

        problem.opciones.forEach((opcion, idx) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.dataset.value = opcion.id || opcion;
            btn.dataset.index = idx;

            // Soportar objetos con propiedades o strings simples
            if (typeof opcion === 'object') {
                btn.innerHTML = `<span class="choice-icon">${opcion.icon || ''}</span> ${opcion.texto}`;
            } else {
                btn.textContent = opcion;
            }

            btn.addEventListener('click', () => {
                // Deseleccionar otros
                document.querySelectorAll('.choice-btn').forEach(b => {
                    b.classList.remove('selected');
                });
                // Seleccionar este
                btn.classList.add('selected');
                // Guardar respuesta
                window.selectedChoice = opcion.id || opcion;
            });

            container.appendChild(btn);
        });

        equationArea.appendChild(container);
    }

    /**
     * Renders text input field
     * @param {Object} problem - Problem object
     */
    renderTextInput(problem) {
        const equationArea = document.getElementById('equation-area');

        const container = document.createElement('div');
        container.className = 'text-input-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'text-answer-input';
        input.placeholder = problem.placeholder || 'Escribe tu respuesta...';
        input.className = 'text-answer-input';

        container.appendChild(input);
        equationArea.appendChild(container);

        // Focus automático
        setTimeout(() => input.focus(), 100);
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

    /**
     * Shows completion message when all problems are solved
     */
    showCompletionMessage() {
        const questionArea = document.getElementById('question-area');
        const equationArea = document.getElementById('equation-area');

        if (questionArea) {
            questionArea.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎉 ¡Enhorabuena! 🎉</div>
                    <p style="font-size: 1.3rem; margin-bottom: 15px;">Has completado todos los problemas disponibles</p>
                    <p style="font-size: 1rem; color: #666; margin-bottom: 25px;">
                        ¿Tienes más acertijos o problemas de lógica?<br>
                        <strong>MathQix es software libre</strong>
                    </p>
                    <div style="background: #f0f8ff; padding: 15px; border-radius: 12px; border: 2px solid #3498db; margin: 20px 0;">
                        <p style="font-size: 0.95rem; margin-bottom: 10px;">
                            💡 Puedes colaborar enviando nuevos problemas:
                        </p>
                        <a href="https://github.com/mameyugo/MathGame/issues/new" 
                           target="_blank" 
                           style="display: inline-block; background: #27ae60; color: white; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: bold; margin: 10px 0;">
                            📝 Enviar Nuevo Acertijo
                        </a>
                        <p style="font-size: 0.85rem; color: #666; margin-top: 10px;">
                            Lo implementaré lo más rápido posible 🚀
                        </p>
                    </div>
                    <button id="btn-play-again" onclick="location.reload()" style="background: #3498db; color: white; padding: 12px 24px; border: none; border-radius: 10px; font-weight: bold; font-size: 1rem; cursor: pointer; margin-top: 20px; transition: background 0.3s;">
                        🔄 Volver a Jugar
                    </button>
                </div>
            `;
        }

        if (equationArea) {
            equationArea.innerHTML = '';
        }

        // Ocultar botón de submit
        const submitBtn = document.getElementById('btn-submit-problem');
        if (submitBtn) {
            submitBtn.style.display = 'none';
        }

        // Finalizar la sesión de juego para sumar monedas y actualizar logros
        // Solo si estamos en el navegador y gameEngine está disponible
        if (typeof window !== 'undefined' && this.gameEngine && typeof endGameSession === 'function') {
            endGameSession();
        }
    }
}

// Export for both Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionGenerator;
}
if (typeof window !== 'undefined') {
    window.QuestionGenerator = QuestionGenerator;
}
