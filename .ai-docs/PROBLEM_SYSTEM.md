# Sistema de Problemas

## 📍 Ubicación
`docs/js/problems/`

## 🎯 Propósito
Sistema modular para definir, generar y traducir problemas matemáticos y de lógica con dificultad graduada.

## 🏗️ Estructura

```
problems/
├── config.js              # Configuración global
├── index.js              # Exportador principal
├── categories/           # Problemas por nivel
│   ├── level1.js        # 16 problemas nivel 1 (5-7 años)
│   ├── level2.js        # Nivel 2 (7-8 años)
│   ├── level2_3.js      # Nivel 2-3 (transición)
│   ├── level3.js        # Nivel 3 (8-9 años)
│   ├── level4.js        # Nivel 4 (9-10 años)
│   ├── level4_5.js      # Nivel 4-5 (transición)
│   └── level5.js        # Nivel 5 (10+ años)
└── i18n/                # Traducciones
    ├── index.js         # Exportador i18n
    ├── es.js            # Español
    ├── en.js            # English
    ├── fr.js            # Français
    ├── ca.js            # Català
    ├── de.js            # Deutsch
    ├── pt.js            # Português
    └── gl.js            # Galego
```

## 📋 Anatomía de un Problema

### Estructura Base

```javascript
{
  id: string,              // ID único (ej: "compra_estandar")
  tipo: string,            // "matematico" o "logica"
  nivelMin: number,        // Nivel mínimo requerido (1-5)
  categorias: string[],    // Categorías (ej: ['explorador'])
  i18n: string,           // Clave de traducción
  generar: Function       // Función que genera pregunta dinámica
}
```

### Función `generar()`

Retorna un objeto con la pregunta generada:

```javascript
{
  texto: string,              // Enunciado del problema
  respuestaCorrecta: number,  // Respuesta correcta
  explicacion: string,        // Explicación de la solución
  ecuacion: string,          // Representación visual
  ecuacionValores: number[], // Valores para la ecuación
  opciones: number[]         // 4 opciones múltiples
}
```

## 📚 Tipos de Problemas

### Problemas Matemáticos (`tipo: "matematico"`)
Requieren cálculos aritméticos.

**Ejemplos**:
- Multiplicación básica
- Sumas y restas
- Fracciones y decimales
- Cálculo de vueltas

### Problemas de Lógica (`tipo: "logica"`)
Requieren razonamiento y pensamiento crítico.

**Ejemplos**:
- Problemas con trampa
- Acertijos matemáticos
- Razonamiento espacial
- Análisis de patrones

## 🎯 Niveles de Dificultad

| Nivel | Rango Edad | Características | Cantidad Problemas |
|-------|-----------|-----------------|-------------------|
| 1     | 5-7 años  | Básico, sumas/restas simples, lógica básica | 16+ |
| 2     | 7-8 años  | Multiplicación, problemas más complejos | Expandible |
| 2-3   | Transición | Mix de nivel 2 y 3 | Expandible |
| 3     | 8-9 años  | División, fracciones simples, lógica avanzada | Expandible |
| 4     | 9-10 años | Operaciones combinadas, problemas multi-paso | Expandible |
| 4-5   | Transición | Mix de nivel 4 y 5 | Expandible |
| 5     | 10+ años  | Álgebra básica, problemas complejos | Expandible |

## 🔄 Flujo de Generación de Preguntas

```
1. QuestionGenerator.getQuestion(level, category)
   ↓
2. Obtiene lista de problemas por nivel
   ↓
3. Selecciona problema aleatorio
   ↓
4. Ejecuta problema.generar()
   ↓
5. Obtiene traducciones de i18n
   ↓
6. Reemplaza variables en texto
   ↓
7. Retorna pregunta completa al GameEngine
```

## 💬 Sistema i18n (Internacionalización)

### Estructura de Archivo i18n

```javascript
// i18n/es.js
export const problemsES = {
  compra_estandar: {
    texto: (cantidad, precio) => 
      `Compramos ${cantidad} gomas de borrar. Cada una cuesta ${precio}€...`,
    explicacion: (cantidad, precio) => 
      `Tienes que multiplicar: ${cantidad} × ${precio} = ${cantidad * precio}€...`
  },
  // ... más problemas
}
```

### Parámetros Dinámicos

Las funciones i18n aceptan parámetros que se generan dinámicamente:

```javascript
// En level1.js - generar()
const cantidad = Math.floor(Math.random() * 5) + 2;
const precio = Math.floor(Math.random() * 3) + 1;

// En i18n/es.js
texto: (cantidad, precio) => 
  `Compramos ${cantidad} gomas de borrar...`

// Uso en QuestionGenerator
const textoFinal = problemsES.compra_estandar.texto(cantidad, precio);
```

### 7 Idiomas Soportados

| Idioma | Código | Archivo | Estado |
|--------|--------|---------|--------|
| Español | es | es.js | ✅ Completo |
| English | en | en.js | ✅ Completo |
| Français | fr | fr.js | ✅ Completo |
| Català | ca | ca.js | ✅ Completo |
| Deutsch | de | de.js | ✅ Completo |
| Português | pt | pt.js | ✅ Completo |
| Galego | gl | gl.js | ✅ Completo |

## 📝 Ejemplo Completo: Problema "compra_estandar"

### Definición en level1.js

```javascript
{
  id: "compra_estandar",
  tipo: "matematico",
  nivelMin: 1,
  categorias: ['explorador'],
  i18n: "compra_estandar",
  generar: () => {
    const cantidad = Math.floor(Math.random() * 5) + 2;    // 2-6
    const precio = Math.floor(Math.random() * 3) + 1;      // 1-3
    const total = cantidad * precio;
    
    return {
      texto: `Compramos ${cantidad} gomas de borrar. Cada una cuesta ${precio}€. ¿Cuánto pagamos en total?`,
      respuestaCorrecta: total,
      ecuacion: `${cantidad} × ${precio} = __`,
      ecuacionValores: [total],
      opciones: [total, total + 2, cantidad + precio, total - 1]
    };
  }
}
```

### Traducción en i18n/es.js

```javascript
compra_estandar: {
  texto: (cantidad, precio) => 
    `Compramos ${cantidad} gomas de borrar. Cada una cuesta ${precio}€. ¿Cuánto pagamos en total?`,
  explicacion: (cantidad, precio) => 
    `Tienes que multiplicar el número de gomas por el precio: ${cantidad} × ${precio} = ${cantidad * precio}€.`
}
```

### Flujo de Ejecución

```javascript
// 1. Se selecciona el problema
const problema = level1Problems.find(p => p.id === "compra_estandar");

// 2. Se ejecuta generar()
const pregunta = problema.generar();
// ↓ resultado:
// {
//   texto: "Compramos 3 gomas de borrar. Cada una cuesta 2€...",
//   respuestaCorrecta: 6,
//   ...
// }

// 3. Se obtienen traducciones
const i18nTexto = problemsES.compra_estandar.texto(3, 2);
// ↓ resultado: "Compramos 3 gomas de borrar..."

// 4. Se reemplaza en la pregunta (si usa i18n)
pregunta.texto = i18nTexto;  // Si el problema usa i18n
```

## 🎲 Variación Dinámica

### Sin Variación (Problema con Datos Fijos)

```javascript
{
  id: "peces_ahogados",
  generar: () => {
    const total_peces = 10;  // FIJO
    const respuesta = 10;     // FIJO
    return {
      texto: `En una pecera hay ${total_peces} peces...`,
      respuestaCorrecta: respuesta,
      // ...
    };
  }
}
```

### Con Variación (Problema Dinámico)

```javascript
{
  id: "cesta_peras",
  generar: () => {
    // DINÁMICO - varía cada vez
    const inicial = Math.floor(Math.random() * 6) + 4;    // 4-10
    const regaladas = Math.floor(Math.random() * 3) + 1;  // 1-3
    const respuesta = inicial - regaladas;
    return {
      texto: `Tienes una cesta con ${inicial} peras...`,
      respuestaCorrecta: respuesta,
      // ...
    };
  }
}
```

## 🔍 Validación de Opciones

Las opciones múltiples incluyen:
1. **Respuesta correcta**
2. **Distractores razonables**: Errores comunes de cálculo
3. **Distractores comunes**: Sumas o restas simples

```javascript
opciones: [
  respuestaCorrecta,        // 6
  respuestaCorrecta + 2,    // 8 (error común)
  cantidad + precio,        // 5 (error común)
  respuestaCorrecta - 1     // 5 (error común)
]
```

## 📊 Estructura de Datos

### Archivo config.js

```javascript
export const problemsConfig = {
  totalLevels: 5,
  problemsPerLevel: {
    1: 'expandible',    // Expandible
    2: 'expandible',
    3: 'expandible',
    4: 'expandible',
    5: 'expandible'
  },
  languages: ['es', 'en', 'fr', 'ca', 'de', 'pt', 'gl']
};
```

### Exportador index.js

```javascript
// index.js
import { level1Problems } from './categories/level1.js';
import { level2Problems } from './categories/level2.js';
// ... más niveles

export const allProblems = {
  1: level1Problems,
  2: level2Problems,
  3: level3Problems,
  4: level4Problems,
  5: level5Problems
};
```

## 🧪 Testing

**Validaciones**:
- Cada problema genera una respuesta válida
- Las opciones contienen la respuesta correcta
- Las traducciones tienen los parámetros requeridos
- Sin repeticiones en opción múltiple

**Ver**: `tests/unit/QuestionGenerator.test.js`

## 📈 Estadísticas Actuales (Level 1)

- **Problemas**: 16
- **Tipos**: Matemática (8), Lógica (8)
- **Dinámicos**: 11 (varían en cada generación)
- **Fijos**: 5 (siempre igual)
- **Idiomas**: 7 (100% traducidos)

## ✅ Checklist para Añadir Nuevo Problema

```
☐ Crear problema en level#.js
☐ Asignar id único
☐ Definir tipo (matematico/logica)
☐ Implementar generar()
☐ Crear entrada i18n en todos los 7 idiomas
☐ Validar respuestaCorrecta
☐ Crear opciones múltiples interesantes
☐ Añadir explicación clara
☐ Testear en todos los idiomas
☐ Validar no-repetición de opciones
```

## 🔗 Archivos Relacionados

- `QuestionGenerator.js` - Carga y genera problemas
- `ProblemCategoryManager.js` - Organiza por categoría
- `TranslationManager.js` - Gestiona i18n
- `tests/unit/QuestionGenerator.test.js` - Pruebas
- `ESTRUCTURA_PROBLEMAS.md` - Documentación detallada
