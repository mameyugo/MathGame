/**
 * MateAventura - Página de Ayuda
 * Sistema de traducciones para la página de ayuda
 */

// Sistema de traducciones (se cargará desde archivos JSON)
let translations = {};

// Obtener idioma desde localStorage
let currentLanguage = localStorage.getItem('math_lang') || 'es';

/**
 * Carga las traducciones desde un archivo JSON
 * @param {string} lang - Código de idioma (es/gl)
 */
async function loadTranslations(lang) {
    try {
        const response = await fetch(`./lang/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        translations[lang] = data;
    } catch (error) {
        console.error(`Error loading translations for ${lang}:`, error);
        // Si falla, intentar cargar español por defecto
        if (lang !== 'es') {
            await loadTranslations('es');
            currentLanguage = 'es';
        }
    }
}

/**
 * Obtiene el texto traducido según el idioma actual
 * @param {string} key - Clave de traducción
 * @returns {string} Texto traducido
 */
function t(key) {
    return translations[currentLanguage]?.[key] || translations['es']?.[key] || key;
}

/**
 * Cambia el idioma de la página de ayuda
 * @param {string} lang - Código de idioma (es/gl)
 */
async function changeLanguage(lang) {
    // Cargar traducciones si no están cargadas
    if (!translations[lang]) {
        await loadTranslations(lang);
    }

    currentLanguage = lang;
    localStorage.setItem('math_lang', lang);
    document.getElementById('html-root').setAttribute('lang', lang);

    // Actualizar estilos de botones de idioma
    document.getElementById('btn-lang-es').style.borderColor = lang === 'es' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-es').style.background = lang === 'es' ? '#f0f7ff' : 'white';
    document.getElementById('btn-lang-gl').style.borderColor = lang === 'gl' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-gl').style.background = lang === 'gl' ? '#f0f7ff' : 'white';

    // Actualizar todos los textos
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = t(key);
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
    await loadTranslations(currentLanguage);

    // Inicializar idioma
    await changeLanguage(currentLanguage);
}

// Sincronizar idioma cuando el usuario vuelve a la página
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // La página fue restaurada del bfcache
        currentLanguage = localStorage.getItem('math_lang') || 'es';
        changeLanguage(currentLanguage);
    }
});

// Guardar preferencias antes de descargar
window.addEventListener('beforeunload', function () {
    localStorage.setItem('math_lang', currentLanguage);
});

