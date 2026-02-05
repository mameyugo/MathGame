# Sistema de Traducciones (i18n)

## 📍 Ubicación

- **Problemas**: `docs/js/problems/i18n/`
- **UI General**: `docs/lang/`

## 🎯 Propósito

Soportar múltiples idiomas (7 actualmente) para la interfaz y problemas matemáticos.

## 🌍 Idiomas Soportados

| Código | Idioma    | Archivos                 |
| ------ | --------- | ------------------------ |
| es     | Español   | i18n/es.js, lang/es.json |
| en     | English   | i18n/en.js, lang/en.json |
| fr     | Français  | i18n/fr.js, lang/fr.json |
| ca     | Català    | i18n/ca.js, lang/ca.json |
| de     | Deutsch   | i18n/de.js, lang/de.json |
| pt     | Português | i18n/pt.js, lang/pt.json |
| gl     | Galego    | i18n/gl.js, lang/gl.json |

## 🏗️ Estructura del Sistema

### Dos Capas de Traducción

```
TranslationManager
  │
  ├─ Problemas (i18n/*.js)
  │  └─ Textos dinámicos con parámetros
  │     (ej: compra_estandar)
  │
  └─ UI General (lang/*.json)
     └─ Textos estáticos
        (ej: "Siguiente", "Puntuación")
```

## 📚 Capa 1: Problemas (i18n)

### Estructura de Archivo i18n

```javascript
// i18n/es.js
export const problemsES = {
    compra_estandar: {
        texto: (cantidad, precio) => `Compramos ${cantidad} gomas de borrar...`,
        explicacion: (cantidad, precio) =>
            `Tienes que multiplicar: ${cantidad} × ${precio}...`,
    },

    dedos_manos_logica: {
        texto: (manos) => `Si en una mano tengo 5 dedos...`,
        explicacion: (manos) => `¡Piensa bien! Cada mano tiene 5 dedos...`,
    },

    // ... más problemas
};
```

### Características

- **Funciones dinámicas**: Aceptan parámetros
- **Pares texto/explicación**: Cada problema tiene ambos
- **Reutilizable**: Mismo objeto para múltiples idiomas

### Exportador i18n

```javascript
// i18n/index.js
import { problemsES } from "./es.js";
import { problemsEN } from "./en.js";
import { problemsFR } from "./fr.js";
// ... más idiomas

export const allProblemTranslations = {
    es: problemsES,
    en: problemsEN,
    fr: problemsFR,
    ca: problemsCA,
    de: problemsDE,
    pt: problemsPT,
    gl: problemsGL,
};
```

## 🎨 Capa 2: UI General (lang)

### Estructura JSON

```json
// lang/es.json
{
    "app_title": "MathGame",
    "start_game": "Comenzar Juego",
    "next_question": "Siguiente Pregunta",
    "score": "Puntuación",
    "level": "Nivel",
    "coins": "Monedas",
    "achievements": "Logros",
    "language": "Idioma",
    "settings": "Configuración",
    "help": "Ayuda",
    "about": "Acerca de",
    "correct": "¡Correcto!",
    "incorrect": "Incorrecto",
    "try_again": "Intenta de nuevo"
}
```

### Categorización de Strings

```json
{
    "menu": {
        "play": "Jugar",
        "settings": "Configuración",
        "achievements": "Logros"
    },
    "game": {
        "score": "Puntuación",
        "level": "Nivel",
        "answer": "Respuesta"
    },
    "messages": {
        "correct": "¡Muy bien!",
        "incorrect": "Intenta de nuevo"
    }
}
```

## 🔄 TranslationManager

### Ubicación

`docs/js/managers/TranslationManager.js`

### Métodos Principales

```javascript
class TranslationManager {
  // Obtener idioma actual
  getCurrentLanguage() → string

  // Cambiar idioma
  setLanguage(languageCode) → void

  // Traducir string de UI
  translate(key) → string

  // Traducir con parámetros
  translateWithParams(key, params) → string

  // Obtener problema traducido
  getProblemTranslation(problemId) → Object

  // Obtener todos los idiomas disponibles
  getAvailableLanguages() → string[]
}
```

### Ejemplos de Uso

```javascript
const tm = new TranslationManager();

// Cambiar idioma
tm.setLanguage("en");

// Traducir string simple
const buttonText = tm.translate("menu.play");
// → "Play"

// Traducir con parámetros (si fuera necesario)
const message = tm.translateWithParams("game.level", { level: 3 });
// → "Level 3"

// Obtener problema traducido
const problemTrans = tm.getProblemTranslation("compra_estandar");
const texto = problemTrans.texto(5, 3);
// → "Compramos 5 gomas de borrar. Cada una cuesta 3€..."
```

## 🔄 Flujo de Traducción Completo

### Durante Generación de Pregunta

```
1. QuestionGenerator selecciona problema
   ↓
2. Ejecuta problema.generar()
   ↓ Obtiene: {
     texto: "Compramos ${cantidad} gomas...",
     respuestaCorrecta: 15,
     ...
   }
   ↓
3. TranslationManager.getProblemTranslation('compra_estandar')
   ↓
4. Obtiene traducción en idioma actual
   ↓ Retorna función:
   texto: (cantidad, precio) => `Compramos ${cantidad} gomas...`
   ↓
5. Ejecuta función con parámetros (5, 3)
   ↓
6. Reemplaza en pregunta: "Compramos 5 gomas..."
   ↓
7. Muestra al usuario en su idioma
```

### Durante Cambio de Idioma

```
1. Usuario selecciona nuevo idioma
   ↓
2. TranslationManager.setLanguage('en')
   ↓
3. Carga idioma en localStorage
   ↓ localStorage['lang'] = 'en'
   ↓
4. Re-carga traducc. de UI
   ↓
5. Re-genera pregunta actual (si existe)
   ↓
6. Re-renderiza toda la UI
   ↓
7. Muestra en nuevo idioma
```

## 💾 Persistencia de Idioma

```javascript
// Guardar preferencia
localStorage["mathgame_language"] = "es";

// Cargar al iniciar
const savedLanguage = localStorage["mathgame_language"];
if (savedLanguage) {
    translationManager.setLanguage(savedLanguage);
}
```

## ✅ Verificación de Traducciones

### Checklist para Nuevo Idioma

```
☐ Crear archivo i18n/xx.js
☐ Importar en i18n/index.js
☐ Traducir TODOS los problemasES (mín. 16 de level1)
☐ Validar parámetros en funciones
☐ Crear archivo lang/xx.json
☐ Importar en TranslationManager
☐ Traducir todas las claves de UI
☐ Probar cambio de idioma
☐ Validar que no haya variables faltantes
☐ Agregar código de idioma a lista de soportados
```

### Validación de Variables

Cada función de traducción debe aceptar los parámetros necesarios:

```javascript
// ❌ MALO - Falta parámetro
compra_estandar: {
    texto: (cantidad) => `Compramos ${cantidad} gomas...`;
    // ↑ Falta 'precio'
}

// ✅ CORRECTO - Parámetros completos
compra_estandar: {
    texto: (cantidad, precio) =>
        `Compramos ${cantidad} gomas de borrar. Cada una cuesta ${precio}€...`;
}
```

## 📊 Estadísticas de Traducción

### Cobertura Actual

```
Total de problemas (Level 1): 16
Traducidos a 7 idiomas: 16/16 ✅

Total de strings UI: ~150
Traducidos a 7 idiomas: 140/150 ⚠️

Cobertura general: 93%
```

### Archivos de Traducción

```
i18n/*.js: 7 archivos × ~200 líneas cada = 1,400 líneas
lang/*.json: 7 archivos × ~100 claves cada = 700 claves

Total: 2,100+ líneas traducidas
```

## 🧪 Testing de Traducciones

### Pruebas de Cobertura

```javascript
describe("TranslationManager", () => {
    it("should load all languages", () => {
        const langs = tm.getAvailableLanguages();
        expect(langs).toContain("es");
        expect(langs).toContain("en");
        // ... más idiomas
    });

    it("should have all problem translations", () => {
        for (const lang of tm.getAvailableLanguages()) {
            tm.setLanguage(lang);
            const trans = tm.getProblemTranslation("compra_estandar");
            expect(trans.texto).toBeDefined();
            expect(trans.explicacion).toBeDefined();
        }
    });

    it("should handle language switching", () => {
        tm.setLanguage("es");
        let text = tm.translate("menu.play");
        expect(text).toBe("Jugar");

        tm.setLanguage("en");
        text = tm.translate("menu.play");
        expect(text).toBe("Play");
    });
});
```

Ver: `tests/unit/TranslationManager.test.js`
Ver: `tests/unit/TranslationsCoverage.test.js`

## 🚀 Mejoras Futuras

1. **RTL Support**: Soporte para idiomas de derecha a izquierda
2. **Plurales**: Manejo automático de singular/plural
3. **Fechas y Números**: Localización según idioma
4. **Interpolación**: Soporte para variables más complejas
5. **Namespace**: Organización por módulos

## 📖 Ejemplo: Agregar Nuevo Idioma

### Paso 1: Crear i18n/xx.js

```javascript
// i18n/xx.js
export const problemsXX = {
    compra_estandar: {
        texto: (cantidad, precio) =>
            `[Traducción nuevo idioma con ${cantidad} y ${precio}]`,
        explicacion: (cantidad, precio) => `[Explicación]`,
    },
    // ... copiar estructura completa
};
```

### Paso 2: Crear lang/xx.json

```json
{
    "menu": {
        "play": "[Traducción]",
        "settings": "[Traducción]"
    }
    // ... copiar estructura completa
}
```

### Paso 3: Actualizar i18n/index.js

```javascript
import { problemsXX } from "./xx.js";

export const allProblemTranslations = {
    // ... existentes
    xx: problemsXX,
};
```

### Paso 4: Actualizar TranslationManager

```javascript
const AVAILABLE_LANGUAGES = ["es", "en", "fr", "ca", "de", "pt", "gl", "xx"];
```

### Paso 5: Testear

```bash
npm test
```

## 🔗 Archivos Relacionados

- `QuestionGenerator.js` - Usa traducciones de problemas
- `app.js` - Usa traducciones de UI
- `TranslationManager.test.js` - Pruebas
- `TranslationsCoverage.test.js` - Cobertura
