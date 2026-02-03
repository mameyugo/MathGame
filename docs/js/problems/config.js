/**
 * Configuración global del banco de problemas
 * Mapeo de problemas por nivel y categoría
 */

export const PROBLEM_LEVELS = {
    LEVEL_1: 1,   // Pequeños Detectives (5-7 años)
    LEVEL_2: 2,   // Intermedios (8-10 años)
    LEVEL_3: 3,   // Intermedios avanzados (11-12 años)
    LEVEL_4: 4,   // Avanzados (13-15 años)
    LEVEL_5: 5    // Expertos (16+ años)
};

export const PROBLEM_CATEGORIES = {
    EXPLORER: 'explorador',
    ARCHITECT: 'arquitecto',
    SCIENTIST: 'cientifico'
};

export const PROBLEM_TYPES = {
    LOGIC: 'logica',
    MATHEMATICAL: 'matematico'
};

export const RESPONSE_TYPES = {
    NUMERIC: 'numero',
    MULTIPLE_CHOICE: 'opcion_multiple',
    TEXT: 'texto',
    DRAG_DROP: 'drag_drop'
};

// Información sobre niveles para UI
export const LEVEL_INFO = {
    1: { name: 'Pequeños Detectives', minAge: 5, maxAge: 7 },
    2: { name: 'Exploradores', minAge: 8, maxAge: 10 },
    3: { name: 'Investigadores', minAge: 11, maxAge: 12 },
    4: { name: 'Pensadores', minAge: 13, maxAge: 15 },
    5: { name: 'Expertos', minAge: 16, maxAge: 99 }
};

// Información sobre categorías
export const CATEGORY_INFO = {
    explorador: { name: 'Explorador', icon: '🧭', color: '#4CAF50' },
    arquitecto: { name: 'Arquitecto', icon: '🏗️', color: '#2196F3' },
    cientifico: { name: 'Científico', icon: '🔬', color: '#9C27B0' }
};
