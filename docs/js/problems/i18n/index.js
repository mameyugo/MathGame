/**
 * Inicializador de Traducciones Multiidioma
 * Mantiene español como fallback para todos los idiomas no disponibles
 */

import problemsES from './es.js';
import problemsGL from './gl.js';
import problemsEN from './en.js';
import problemsFR from './fr.js';
import problemsCA from './ca.js';
import problemsPT from './pt.js';
import problemsDE from './de.js';

export const translations = {
    es: problemsES,
    gl: problemsGL,
    en: problemsEN,
    fr: problemsFR,
    ca: problemsCA,
    pt: problemsPT,
    de: problemsDE
};

/**
 * Obtener texto traducido de un problema
 * @param {string} lang - Código de idioma (es/gl/en/fr/ca/pt/de)
 * @param {string} problemId - ID del problema
 * @param {string} field - Campo del texto (texto/explicacion)
 * @param {...args} args - Argumentos para la función de plantilla
 * @returns {string} Texto traducido
 */
export function getTranslation(lang, problemId, field, ...args) {
    const langTranslations = translations[lang] || translations.es;
    const problem = langTranslations[problemId];

    if (!problem) {
        console.warn(`⚠️ Traducción no encontrada: ${problemId} en idioma ${lang}`);
        return '';
    }

    const textFn = problem[field];
    if (typeof textFn === 'function') {
        return textFn(...args);
    }

    return textFn || '';
}

// Exponer función en window para acceso desde QuestionGenerator
if (typeof window !== 'undefined') {
    window.getTranslation = getTranslation;
}

export default translations;
