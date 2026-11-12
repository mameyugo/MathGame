/**
 * TranslationManager - Gestión del sistema de traducciones multiidioma
 * Responsable de cargar, almacenar y proporcionar traducciones en 7 idiomas:
 * ES (Español), GL (Galego), EN (English), FR (Français), CA (Català), PT (Português), DE (Deutsch)
 */
class TranslationManager {
    constructor() {
        this.translations = {};
        this.currentLanguage = TranslationManager.detectLanguage();
    }

    /**
     * Idioma inicial: el de la URL (?lang=en, enlazable e indexable por los buscadores),
     * el último elegido o español. No se mira el idioma del navegador: Googlebot navega
     * en inglés y vería en inglés la portada que hreflang declara en español.
     * @returns {string}
     */
    static detectLanguage() {
        const supported = TranslationManager.SUPPORTED;
        let lang = null;
        try {
            const fromUrl = new URLSearchParams(window.location.search).get('lang');
            if (fromUrl && supported.includes(fromUrl)) {
                lang = fromUrl;
                localStorage.setItem('math_lang', lang);
            }
        } catch (e) { /* sin window (tests) */ }
        if (!lang) {
            const stored = localStorage.getItem('math_lang');
            if (stored && supported.includes(stored)) lang = stored;
        }
        return lang || 'es';
    }

    /**
     * Pone el idioma en la URL (sin recargar) y actualiza título, descripción,
     * canónica e idioma de Open Graph, para que cada idioma sea una página propia.
     * @param {string} lang
     */
    updatePageMeta(lang) {
        if (typeof window === 'undefined' || !window.history) return;
        try {
            const url = new URL(window.location.href);
            if (lang === 'es') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
            window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
            // La canónica solo lleva el idioma, no otros parámetros (campañas, pruebas…)
            const path = url.pathname.replace(/index\.html$/, '');
            const pageUrl = url.origin + path + (lang === 'es' ? '' : `?lang=${lang}`);
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.href = pageUrl;
            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.content = pageUrl;
        } catch (e) { /* URL no disponible */ }
        const locales = { es: 'es_ES', gl: 'gl_ES', en: 'en_GB', fr: 'fr_FR', ca: 'ca_ES', pt: 'pt_PT', de: 'de_DE' };
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.content = locales[lang] || 'es_ES';
        // Enlaces entre páginas del juego: conservan el idioma
        document.querySelectorAll('a[data-lang-link]').forEach(a => {
            const base = a.getAttribute('href').split('?')[0];
            a.setAttribute('href', lang === 'es' ? base : `${base}?lang=${lang}`);
        });
        document.querySelectorAll('[data-i18n-content]').forEach(el => {
            const text = this.t(el.getAttribute('data-i18n-content'));
            if (text) el.setAttribute('content', text);
        });
    }

    /**
     * Carga las traducciones desde archivos JSON
     * @param {string} lang - Código de idioma (es/gl/en/fr/ca/pt/de)
     * @returns {Promise<void>}
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`./lang/${lang}.json?v=${new Date().getTime()}`);
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
     * @param {string} lang - Código de idioma (es/gl/en/fr/ca/pt/de)
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
        this.updatePageMeta(lang);

        // Actualizar estilos de botones de idioma
        const languages = ['es', 'gl', 'en', 'fr', 'ca', 'pt', 'de'];
        languages.forEach(l => {
            const btn = document.getElementById(`btn-lang-${l}`);
            if (btn && btn.classList) {
                // El aspecto lo pone la clase .active (css/14-diseno.css)
                btn.classList.toggle('active', lang === l);
                if (btn.setAttribute) btn.setAttribute('aria-pressed', lang === l ? 'true' : 'false');
            }
        });

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
            const translation = this.t(key);

            if (el.hasAttribute('data-i18n-safe')) {
                // Actualización segura: modificar solo el primer nodo si es texto, para no destruir hijos
                const textNode = el.childNodes[0];
                if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                    textNode.textContent = translation + ' ';
                } else {
                    el.prepend(document.createTextNode(translation + ' '));
                }
            } else {
                el.innerHTML = translation;
            }
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

TranslationManager.SUPPORTED = ['es', 'gl', 'en', 'fr', 'ca', 'pt', 'de'];

// Exportar para uso en Node.js (tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}

// Hacer disponible globalmente para navegadores y eval() en tests
if (typeof window !== 'undefined') {
    window.TranslationManager = TranslationManager;
}
