/**
 * TranslationManager - Gestión del sistema de traducciones multiidioma
 * Responsable de cargar, almacenar y proporcionar traducciones ES/GL
 */
class TranslationManager {
    constructor() {
        this.translations = {};
        this.currentLanguage = localStorage.getItem('math_lang') || 'es';
    }

    /**
     * Carga las traducciones desde archivos JSON
     * @param {string} lang - Código de idioma (es/gl)
     * @returns {Promise<void>}
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`./lang/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
            // Fallback a español si hay error
            if (lang !== 'es') {
                await this.loadTranslations('es');
            }
        }
    }

    /**
     * Obtiene el texto traducido según el idioma actual
     * @param {string} key - Clave de traducción
     * @returns {string} Texto traducido
     */
    t(key) {
        return this.translations[this.currentLanguage]?.[key] ||
            this.translations['es']?.[key] ||
            key;
    }

    /**
     * Cambia el idioma de la aplicación
     * @param {string} lang - Código de idioma (es/gl)
     * @returns {Promise<void>}
     */
    async changeLanguage(lang) {
        // Cargar traducciones si no están cargadas
        if (!this.translations[lang]) {
            await this.loadTranslations(lang);
        }

        this.currentLanguage = lang;
        localStorage.setItem('math_lang', lang);
        document.getElementById('html-root')?.setAttribute('lang', lang);

        // Actualizar estilos de botones de idioma
        const btnEs = document.getElementById('btn-lang-es');
        const btnGl = document.getElementById('btn-lang-gl');

        if (btnEs) {
            btnEs.style.borderColor = lang === 'es' ? 'var(--primary)' : '#ddd';
            btnEs.style.background = lang === 'es' ? '#f0f7ff' : 'white';
        }

        if (btnGl) {
            btnGl.style.borderColor = lang === 'gl' ? 'var(--primary)' : '#ddd';
            btnGl.style.background = lang === 'gl' ? '#f0f7ff' : 'white';
        }

        // Actualizar todos los textos con data-i18n
        this.updateTranslatedElements();
    }

    /**
     * Actualiza todos los elementos con atributos data-i18n
     */
    updateTranslatedElements() {
        // Actualizar todos los textos
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = this.t(key);
        });

        // Actualizar placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
    }

    /**
     * Obtiene el idioma actual
     * @returns {string}
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Verifica si un idioma está cargado
     * @param {string} lang - Código de idioma
     * @returns {boolean}
     */
    isLanguageLoaded(lang) {
        return !!this.translations[lang];
    }
}

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}

// Hacer disponible globalmente para navegadores y eval() en tests
if (typeof window !== 'undefined') {
    window.TranslationManager = TranslationManager;
}
