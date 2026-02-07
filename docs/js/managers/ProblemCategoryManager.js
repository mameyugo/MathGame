/**
 * ProblemCategoryManager - Gestión de categorías de problemas por dificultad
 * Clasifica problemas en 3 "Sacos": Explorador (fácil), Arquitecto (medio), Científico (difícil)
 */
class ProblemCategoryManager {
    /**
     * @param {TranslationManager} translationManager - Manager de traducciones
     */
    constructor(translationManager) {
        this.translationManager = translationManager;

        // Definición de las 3 categorías de problemas
        this.categories = {
            explorador: {
                id: 'explorador',
                icon: '🧭',
                difficulty: 'easy',
                ageRange: '6-9',
                themes: ['medidas', 'conteo', 'basico'],
                color: '#4CAF50'
            },
            arquitecto: {
                id: 'arquitecto',
                icon: '🏗️',
                difficulty: 'medium',
                ageRange: '10-12',
                themes: ['areas', 'perimetros', 'fracciones'],
                color: '#FF9800'
            },
            cientifico: {
                id: 'cientifico',
                icon: '🔬',
                difficulty: 'hard',
                ageRange: '12-14',
                themes: ['algebra', 'probabilidad', 'logica_avanzada'],
                color: '#F44336'
            }
        };
    }

    /**
     * Obtiene todas las categorías disponibles
     * @returns {Array<Object>} Array de categorías
     */
    getCategories() {
        return Object.values(this.categories);
    }

    /**
     * Obtiene una categoría por su ID
     * @param {string} id - ID de la categoría
     * @returns {Object|null}
     */
    getCategoryById(id) {
        return this.categories[id] || null;
    }

    /**
     * Filtra problemas según las categorías seleccionadas
     * @param {Array<Object>} problems - Array de problemas del banco
     * @param {Array<string>} selectedCategories - IDs de categorías seleccionadas
     * @returns {Array<Object>} Problemas filtrados
     */
    filterProblemsByCategories(problems, selectedCategories) {
        // Si no hay categorías seleccionadas, no devolver problemas
        if (!selectedCategories || selectedCategories.length === 0) {
            return [];
        }

        return problems.filter(problem => {
            // Los problemas sin categoría no se muestran
            if (!problem.categorias || problem.categorias.length === 0) {
                return false;
            }

            // El problema debe estar en al menos una categoría seleccionada
            return problem.categorias.some(cat =>
                selectedCategories.includes(cat)
            );
        });
    }

    /**
     * Renderiza las tarjetas de categorías en el DOM
     * @param {string} containerId - ID del contenedor donde renderizar
     * @param {Array<string>} selectedCategories - Categorías actualmente seleccionadas
     * @param {Function} onToggle - Callback al cambiar selección
     */
    async renderCategoryCards(containerId, selectedCategories = [], onToggle) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        if (!this.templateManager) {
            this.templateManager = new TemplateManager();
        }

        console.log('Rendering problem categories:', selectedCategories);
        container.innerHTML = '';

        for (const category of this.getCategories()) {
            const isSelected = selectedCategories.includes(category.id);
            console.log(`Category ${category.id}: ${isSelected ? 'selected' : 'not selected'}`);

            const card = document.createElement('div');
            card.className = `category-card difficulty-${category.difficulty} ${isSelected ? 'selected' : ''}`;

            // Inline styles backup logic handled by CSS classes ideally, but keeping JS logic minimal if css handles it.
            // Assuming CSS classes handle the styling now as per refactor goals.
            // If main.css doesn't have these, we might need to rely on the template or ensure CSS is there.
            // The template itself doesn't have the wrapper div, so we create it here or move wrapper to template.
            // The template content is INSIDE the card.

            card.onclick = () => {
                if (onToggle) {
                    onToggle(category.id);
                }
            };

            card.innerHTML = await this.templateManager.render('problem-category-card', {
                icon: category.icon,
                id: category.id,
                name: this.translationManager.t(`category_${category.id}_name`),
                description: this.translationManager.t(`category_${category.id}_desc`),
                checked_attr: isSelected ? 'checked' : ''
            });

            container.appendChild(card);
        }

        console.log(`Rendered ${this.getCategories().length} category cards`);
    }

    /**
     * Valida que al menos una categoría esté seleccionada
     * @param {Array<string>} selectedCategories - Categorías seleccionadas
     * @returns {boolean}
     */
    hasValidSelection(selectedCategories) {
        return selectedCategories && selectedCategories.length > 0;
    }

    /**
     * Obtiene el nombre traducido de una categoría
     * @param {string} categoryId - ID de la categoría
     * @returns {string}
     */
    getCategoryName(categoryId) {
        return this.translationManager.t(`category_${categoryId}_name`);
    }
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProblemCategoryManager;
}

// Hacer disponible globalmente para navegadores
if (typeof window !== 'undefined') {
    window.ProblemCategoryManager = ProblemCategoryManager;
}
