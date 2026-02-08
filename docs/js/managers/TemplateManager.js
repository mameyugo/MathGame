/**
 * TemplateManager - Gestión de plantillas HTML
 * Carga y cachea plantillas HTML para separar la vista de la lógica
 */
class TemplateManager {
    constructor() {
        this.cache = {};
        this.baseUrl = 'templates/'; // Relative to index.html
    }

    /**
     * Carga una plantilla por su nombre (sin extensión .html)
     * @param {string} templateName - Nombre del archivo en docs/templates/
     * @returns {Promise<string>} El contenido HTML de la plantilla
     */
    async loadTemplate(templateName) {
        if (this.cache[templateName]) {
            return this.cache[templateName];
        }

        try {
            // Diferente path si estamos en local/testing vs producción si fuera necesario
            // Asumimos que docs/ templates es accesible via fetch relativo
            const response = await fetch(`${this.baseUrl}${templateName}.html`);
            if (!response.ok) {
                throw new Error(`Error loading template ${templateName}: ${response.statusText}`);
            }
            const html = await response.text();
            this.cache[templateName] = html;
            return html;
        } catch (error) {
            console.error('TemplateManager error:', error);
            return ''; // Retornar string vacío para no romper la UI
        }
    }

    /**
     * Renderiza una plantilla reemplazando marcadores {{clave}} con datos
     * @param {string} templateName - Nombre de la plantilla
     * @param {Object} data - Objeto con datos para reemplazar
     * @returns {Promise<string>} HTML procesado
     */
    async render(templateName, data) {
        let html = await this.loadTemplate(templateName);
        if (!html) return '';

        // Reemplazo simple de {{key}}
        // Para lógica más compleja (bucles), se recomienda hacer el bucle en JS
        // y concatenar el resultado de renderizar la plantilla para cada item.
        for (const key in data) {
            const value = data[key];
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, value !== undefined && value !== null ? value : '');
        }
        return html;
    }
}

// Exportar para Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateManager;
}

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
    window.TemplateManager = TemplateManager;
}
