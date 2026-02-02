/**
 * MateAventura - Página de Ayuda
 * Sistema de traducciones para la página de ayuda
 */

// Importar TranslationManager (se debe cargar antes en el HTML)
const translationManager = new TranslationManager();

// Obtener idioma actual
let currentLanguage = translationManager.getCurrentLanguage();

/**
 * Obtiene el texto traducido según el idioma actual
 * @param {string} key - Clave de traducción
 * @returns {string} Texto traducido
 */
function t(key) {
    return translationManager.t(key);
}

/**
 * Cambia el idioma de la página de ayuda
 * @param {string} lang - Código de idioma (es/gl/en/fr/ca/pt/de)
 */
async function changeLanguage(lang) {
    await translationManager.changeLanguage(lang);
    currentLanguage = translationManager.getCurrentLanguage();

    // Actualizar estilos de botones de idioma
    const languages = ['es', 'gl', 'en', 'fr', 'ca', 'pt', 'de'];
    languages.forEach(l => {
        const btn = document.getElementById(`btn-lang-${l}`);
        if (btn) {
            btn.style.borderColor = lang === l ? 'var(--primary)' : '#ddd';
            btn.style.background = lang === l ? '#f0f7ff' : 'white';
        }
    });
}

/**
 * Vuelve a la página principal
 */
function goBack() {
    window.location.href = 'index.html';
}

/**
 * Inicializa la página de ayuda
 */
async function initHelp() {
    // Cargar traducciones del idioma actual
    await translationManager.loadTranslations(currentLanguage);

    // Inicializar idioma
    await changeLanguage(currentLanguage);
}

// Inicializar la página
initHelp();
