# Arquitectura del Proyecto MathGame

## 📐 Visión General Técnica

MathGame es una aplicación educativa construida con vanilla JavaScript sin frameworks. La arquitectura sigue el patrón de **Manager Pattern** para separar responsabilidades.

## 🏛️ Arquitectura en Capas

```
┌─────────────────────────────────────┐
│      Interfaz de Usuario (UI)       │
│  (HTML/CSS en docs/index.html)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Capa de Presentación               │
│  (app.js, problemas.js, help.js)    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Capa de Lógica de Negocio (Core)   │
│  GameEngine + Managers               │
│                                      │
│  ├─ GameEngine (orquestador)        │
│  ├─ UserManager (perfil usuario)    │
│  ├─ QuestionGenerator (generador)   │
│  ├─ AchievementManager (logros)     │
│  ├─ DailyChallengeManager (retos)   │
│  ├─ StoreManager (tienda)           │
│  ├─ TranslationManager (i18n)       │
│  └─ ProblemCategoryManager (cats)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  Capa de Datos                       │
│  localStorage (navegador)            │
│  JSON files (idiomas)                │
└─────────────────────────────────────┘
```

## 🔧 Componentes Principales

### 1. **GameEngine** (Núcleo Orquestador)
**Ubicación**: `docs/js/managers/GameEngine.js`

**Responsabilidades**:
- Inicializar y controlar flujo del juego
- Gestionar turnos y progresión
- Coordinar entre managers
- Calcular puntuación y recompensas

**Métodos principales**:
```javascript
- startGame()
- nextQuestion()
- checkAnswer(answer)
- endGame()
- resetGame()
```

### 2. **UserManager** (Gestión de Usuarios)
**Ubicación**: `docs/js/managers/UserManager.js`

**Responsabilidades**:
- Almacenar datos del usuario
- Gestionar nivel y experiencia
- Administrar monedas virtuales
- Guardar/cargar datos en localStorage

**Estructura de datos**:
```javascript
{
  id: string,
  name: string,
  level: number,
  experience: number,
  coins: number,
  avatar: string,
  stats: {
    gamesPlayed: number,
    correctAnswers: number,
    accuracy: number
  }
}
```

### 3. **QuestionGenerator** (Generador de Preguntas)
**Ubicación**: `docs/js/managers/QuestionGenerator.js`

**Responsabilidades**:
- Generar preguntas dinámicamente
- Seleccionar problemas según nivel
- Crear opciones múltiples

**Flujo**:
```
selectProblem(level, category)
  → loadProblem()
  → generar() (función dinámica)
  → createOptions()
  → return Question
```

### 4. **ProblemCategoryManager** (Gestor de Categorías)
**Ubicación**: `docs/js/managers/ProblemCategoryManager.js`

**Responsabilidades**:
- Organizar problemas por nivel
- Mapear categorías
- Filtrar problemas disponibles

**Niveles**:
- Level 1: Edades 5-7 (básico)
- Level 2: Edades 7-8 (intermedio)
- Level 3: Edades 8-9 (intermedio-alto)
- Level 4: Edades 9-10 (avanzado)
- Level 5: Edades 10+ (experto)

### 5. **AchievementManager** (Logros)
**Ubicación**: `docs/js/managers/AchievementManager.js`

**Responsabilidades**:
- Definir criterios de logros
- Detectar logros desbloqueados
- Guardar progreso de logros

**Ejemplos de logros**:
- Primera respuesta correcta
- 10 respuestas correctas
- Racha de 5 correctas seguidas
- Desbloquear todos los niveles

### 6. **DailyChallengeManager** (Desafíos Diarios)
**Ubicación**: `docs/js/managers/DailyChallengeManager.js`

**Responsabilidades**:
- Generar desafío diario
- Rastrear progreso del día
- Calcular recompensas

**Características**:
- Se regenera cada 24 horas
- Recompensas aumentadas
- Seguimiento independiente

### 7. **StoreManager** (Tienda Virtual)
**Ubicación**: `docs/js/managers/StoreManager.js`

**Responsabilidades**:
- Gestionar catálogo de items
- Procesar compras
- Gestionar inventario

**Items disponibles**:
- Avatares
- Temas visuales
- Decoraciones

### 8. **TranslationManager** (Sistema Multiidioma)
**Ubicación**: `docs/js/managers/TranslationManager.js`

**Responsabilidades**:
- Cargar traducciones
- Cambiar idioma dinámicamente
- Traducir textos en tiempo real

**Idiomas soportados**: 7

**Fuentes de traducción**:
- `docs/js/problems/i18n/*.js` (problemas)
- `docs/lang/*.json` (UI general)

## 📚 Sistema de Problemas

### Estructura de Archivos
```
problems/
├── config.js              # Configuración global
├── index.js              # Exportador principal
├── categories/
│   ├── level1.js         # Nivel 1 (16 problemas)
│   ├── level2.js         # Nivel 2
│   ├── level3.js         # Nivel 3
│   ├── level4.js         # Nivel 4
│   └── level5.js         # Nivel 5
└── i18n/
    ├── es.js             # Traducciones español
    ├── en.js             # Traducciones inglés
    └── [otros idiomas]
```

### Anatomía de un Problema

```javascript
{
  id: "compra_estandar",           // ID único
  tipo: "matematico",              // Tipo: matemático, lógica
  nivelMin: 1,                     // Nivel mínimo
  categorias: ['explorador'],      // Categorías
  i18n: "compra_estandar",        // Clave i18n
  generar: () => {
    // Genera pregunta dinámica
    return {
      texto: "...",
      respuestaCorrecta: number,
      explicacion: "...",
      ecuacion: "...",
      ecuacionValores: [],
      opciones: [opt1, opt2, opt3, opt4]
    }
  }
}
```

### Variables en Traducciones (i18n)

Las funciones de traducción aceptan parámetros:

```javascript
// es.js
compra_estandar: {
  texto: (cantidad, precio) => `Compramos ${cantidad} gomas...`,
  explicacion: (cantidad, precio) => `...${cantidad} × ${precio}...`
}

// Uso
const text = es.compra_estandar.texto(5, 3);
```

## 🌍 Sistema de Traducciones (i18n)

### Estructura i18n

**Problemas**: `docs/js/problems/i18n/`
- Define textos y explicaciones de problemas
- Aceptan parámetros dinámicos
- Un archivo por idioma

**UI General**: `docs/lang/`
- Traducciones JSON para interfaz
- Textos estáticos de menús, botones, etc.

### Flujo de Traducción
```
1. TranslationManager detecta idioma actual
2. Carga i18n de problemas según idioma
3. Carga lang JSON según idioma
4. QuestionGenerator obtiene texto traducido
5. Reemplaza variables dinámicas
6. Muestra al usuario
```

## 💾 Persistencia de Datos

### LocalStorage
Todos los datos se guardan en localStorage del navegador:
- Datos de usuario
- Progreso de logros
- Configuración (idioma, tema)
- Estadísticas

**Estructura**:
```javascript
localStorage['mathgame_user'] = JSON.stringify(userData)
localStorage['mathgame_achievements'] = JSON.stringify(achievements)
localStorage['mathgame_settings'] = JSON.stringify(settings)
```

## 🧪 Patrones de Testing

### Unit Tests
- Prueban un manager en aislamiento
- Mock de dependencias
- Verifican métodos específicos

**Ejemplo**:
```javascript
describe('GameEngine', () => {
  it('should start game correctly', () => {
    const engine = new GameEngine();
    engine.startGame();
    expect(engine.gameActive).toBe(true);
  });
});
```

### Integration Tests
- Prueban múltiples managers juntos
- Prueba flujo completo
- Ejemplo: `antiRepetition.test.js`

## 🔄 Flujos Principales

### Flujo de Juego Completo
```
1. User selecciona nivel/categoría
2. GameEngine.startGame()
3. QuestionGenerator genera pregunta
4. Muestra pregunta al usuario
5. Usuario responde
6. GameEngine.checkAnswer()
7. AchievementManager detecta logros
8. DailyChallengeManager actualiza progreso
9. UserManager actualiza stats
10. Siguiente pregunta o fin
```

### Flujo de Cambio de Idioma
```
1. Usuario selecciona idioma
2. TranslationManager.setLanguage(lang)
3. Carga i18n/lang.js
4. Carga lang/lang.json
5. Re-renderiza UI
6. Guarda en localStorage
```

## 📊 Cobertura de Código

- **Tests**: 220 pruebas
- **Cobertura**: ~85%+
- **Suites**: 10 principales

## 🚀 Mejoras Futuras

1. **Backend**: API para guardar datos en servidor
2. **Multiplayer**: Competencia entre usuarios
3. **Analytics**: Seguimiento de aprendizaje
4. **Offline**: PWA para funcionar sin conexión
5. **More Games**: Expandir tipos de problemas

## 📖 Documentación Relacionada

Para detalles específicos, consulta:
- [GAME_ENGINE.md](GAME_ENGINE.md) - Detalles del motor
- [PROBLEM_SYSTEM.md](PROBLEM_SYSTEM.md) - Sistema de problemas
- [TRANSLATION_SYSTEM.md](TRANSLATION_SYSTEM.md) - i18n
- [USER_SYSTEM.md](USER_SYSTEM.md) - Usuarios
- [ACHIEVEMENT_SYSTEM.md](ACHIEVEMENT_SYSTEM.md) - Logros

## 🔗 Dependencias Principales

- **Jest**: Testing
- **Babel**: Transpilación ES6+
- **Vanilla JS**: Sin frameworks frontend

Ver `package.json` para lista completa.
