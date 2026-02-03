/**
 * Banco de Problemas - Index Central
 * Exporta todos los problemas y mantiene compatibilidad con código existente
 * 
 * Estructura modular:
 * - Level 1: Pequeños Detectives (12 problemas)
 * - Level 2-3: Intermedios (13 problemas)
 * - Level 4-5: Avanzados (21 problemas)
 * Total: 52 problemas
 */

import { level1Problems } from './categories/level1.js';
import { level2Problems, level3Problems } from './categories/level2_3.js';
import { level4Problems, level5Problems } from './categories/level4_5.js';
import { PROBLEM_LEVELS, PROBLEM_CATEGORIES, PROBLEM_TYPES, RESPONSE_TYPES } from './config.js';

// Combinar todos los problemas
const allProblems = [
    ...level1Problems,
    ...level2Problems,
    ...level3Problems,
    ...level4Problems,
    ...level5Problems
];

/**
 * Exportar como window.bancoProblemas para compatibilidad
 */
window.bancoProblemas = allProblems;

/**
 * Exportar configuraciones y constantes
 */
export {
    allProblems,
    level1Problems,
    level2Problems,
    level3Problems,
    level4Problems,
    level5Problems,
    PROBLEM_LEVELS,
    PROBLEM_CATEGORIES,
    PROBLEM_TYPES,
    RESPONSE_TYPES
};

/**
 * Funciones de utilidad
 */

/**
 * Obtener problemas por nivel
 * @param {number} nivel - Nivel mínimo
 * @returns {Array} Problemas del nivel especificado
 */
export function getProblemsByLevel(nivel) {
    return allProblems.filter(p => p.nivelMin === nivel);
}

/**
 * Obtener problemas por categoría
 * @param {string} categoria - Categoría del problema
 * @returns {Array} Problemas de la categoría
 */
export function getProblemsByCategory(categoria) {
    return allProblems.filter(p =>
        p.categorias && p.categorias.includes(categoria)
    );
}

/**
 * Obtener problemas por tipo
 * @param {string} tipo - Tipo de problema (logica, matematico)
 * @returns {Array} Problemas del tipo especificado
 */
export function getProblemsByType(tipo) {
    return allProblems.filter(p => p.tipo === tipo);
}

/**
 * Filtro avanzado
 * @param {object} filters - Filtros { nivel, categoria, tipo }
 * @returns {Array} Problemas que coinciden con los filtros
 */
export function filterProblems(filters = {}) {
    return allProblems.filter(p => {
        if (filters.nivel && p.nivelMin !== filters.nivel) return false;
        if (filters.categoria && (!p.categorias || !p.categorias.includes(filters.categoria))) return false;
        if (filters.tipo && p.tipo !== filters.tipo) return false;
        if (filters.search && !p.id.includes(filters.search.toLowerCase())) return false;
        return true;
    });
}

/**
 * Obtener estadísticas del banco de problemas
 * @returns {object} Estadísticas
 */
export function getBankStats() {
    const stats = {
        total: allProblems.length,
        byLevel: {},
        byCategory: {},
        byType: {}
    };

    allProblems.forEach(p => {
        // Por nivel
        stats.byLevel[p.nivelMin] = (stats.byLevel[p.nivelMin] || 0) + 1;

        // Por categoría
        if (p.categorias) {
            p.categorias.forEach(cat => {
                stats.byCategory[cat] = (stats.byCategory[cat] || 0) + 1;
            });
        }

        // Por tipo
        stats.byType[p.tipo] = (stats.byType[p.tipo] || 0) + 1;
    });

    return stats;
}

// Log de inicialización
console.log(`✅ Banco de Problemas cargado: ${allProblems.length} problemas`);
console.log(`📊 Estadísticas:`, getBankStats());
