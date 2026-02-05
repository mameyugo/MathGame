# Estructura del Proyecto MathGame

## 📋 Descripción General
**MathGame** es una aplicación educativa de juegos matemáticos interactivos para niños. El proyecto está estructurado de forma modular con separación clara entre problemas matemáticos, gestión de usuarios, logros, tienda y sistema de traducciones.

## 🏗️ Estructura de Carpetas

```
MathGame/
├── .github/                    # Configuración de GitHub
│   ├── FUNDING.yml            # Información de patrocinio
│   └── PROJECT_STRUCTURE.md   # Este archivo
│
├── .ai-docs/                  # Documentación para agentes IA
│   ├── PROJECT_ARCHITECTURE.md
│   ├── GAME_ENGINE.md
│   ├── PROBLEM_SYSTEM.md
│   ├── USER_SYSTEM.md
│   ├── ACHIEVEMENT_SYSTEM.md
│   ├── TRANSLATION_SYSTEM.md
│   ├── DAILY_CHALLENGES.md
│   ├── STORE_SYSTEM.md
│   └── DEVELOPMENT_GUIDE.md
│
├── docs/                      # Archivos públicos del proyecto
│   ├── index.html            # Página principal
│   ├── help.html             # Página de ayuda
│   ├── ROADMAP.md            # Mapa de ruta
│   │
│   ├── css/                  # Estilos CSS modulares
│   │   ├── 1-variables.css   # Variables y temas
│   │   ├── 2-base.css        # Estilos base
│   │   ├── 3-buttons.css     # Botones
│   │   ├── 4-users.css       # Interfaz de usuarios
│   │   ├── 5-game.css        # Interfaz del juego
│   │   ├── 6-problems.css    # Estilos de problemas
│   │   ├── 7-config.css      # Configuración
│   │   ├── 8-store.css       # Tienda
│   │   ├── 9-help.css        # Ayuda
│   │   ├── 10-responsive.css # Responsive design
│   │   ├── 11-animations.css # Animaciones
│   │   ├── 12-achievements.css # Logros
│   │   └── styles.css        # Agregador de estilos
│   │
│   ├── images/               # Recursos gráficos
│   │
│   ├── js/                   # Código JavaScript principal
│   │   ├── app.js           # Aplicación principal
│   │   ├── help.js          # Lógica de ayuda
│   │   ├── problemas.js     # Interfaz de problemas
│   │   │
│   │   ├── managers/        # Gestores de lógica (Core)
│   │   │   ├── GameEngine.js
│   │   │   ├── QuestionGenerator.js
│   │   │   ├── ProblemCategoryManager.js
│   │   │   ├── AchievementManager.js
│   │   │   ├── DailyChallengeManager.js
│   │   │   ├── StoreManager.js
│   │   │   ├── UserManager.js
│   │   │   ├── TranslationManager.js
│   │   │   └── ACHIEVEMENTS.md  # Documentación de logros
│   │   │
│   │   └── problems/         # Sistema de problemas
│   │       ├── config.js     # Configuración de problemas
│   │       ├── index.js      # Exportador principal
│   │       │
│   │       ├── categories/   # Categorías por nivel
│   │       │   ├── level1.js   # Nivel 1 (5-7 años)
│   │       │   ├── level2.js   # Nivel 2 (7-8 años)
│   │       │   ├── level2_3.js # Nivel 2-3
│   │       │   ├── level3.js   # Nivel 3 (8-9 años)
│   │       │   ├── level4.js   # Nivel 4 (9-10 años)
│   │       │   ├── level4_5.js # Nivel 4-5
│   │       │   └── level5.js   # Nivel 5 (10+ años)
│   │       │
│   │       └── i18n/         # Sistema de traducciones
│   │           ├── index.js      # Exportador i18n
│   │           ├── es.js         # Español
│   │           ├── en.js         # English
│   │           ├── fr.js         # Français
│   │           ├── ca.js         # Català
│   │           ├── de.js         # Deutsch
│   │           ├── pt.js         # Português
│   │           └── gl.js         # Galego
│   │
│   └── lang/                 # Archivos de idiomas JSON
│       ├── es.json
│       ├── en.json
│       ├── fr.json
│       ├── ca.json
│       ├── de.json
│       ├── pt.json
│       └── gl.json
│
├── tests/                    # Suite de pruebas
│   ├── setup.js             # Configuración de pruebas
│   ├── app.test.js          # Pruebas de app general
│   │
│   ├── unit/                # Pruebas unitarias
│   │   ├── GameEngine.test.js
│   │   ├── QuestionGenerator.test.js
│   │   ├── UserManager.test.js
│   │   ├── AchievementManager.test.js
│   │   ├── DailyChallengeManager.test.js
│   │   ├── StoreManager.test.js
│   │   ├── TranslationManager.test.js
│   │   └── TranslationsCoverage.test.js
│   │
│   └── integration/         # Pruebas de integración
│       └── antiRepetition.test.js
│
├── scripts/                 # Scripts de utilidad
│   └── bump-cache-version.js
│
├── .babelrc                 # Configuración de Babel
├── .gitignore              # Archivos ignorados por Git
├── jest.config.js          # Configuración de Jest
├── package.json            # Dependencias del proyecto
├── README.md               # Documentación principal
├── LICENSE                 # Licencia del proyecto
└── [Otros archivos de documentación]
```

## 🎮 Módulos Principales

### 1. **GameEngine** (`managers/GameEngine.js`)
Núcleo de la aplicación. Gestiona el flujo del juego, turnos, puntuación y progresión del usuario.

### 2. **QuestionGenerator** (`managers/QuestionGenerator.js`)
Genera preguntas y problemas dinámicamente según el nivel y categoría seleccionada.

### 3. **ProblemCategoryManager** (`managers/ProblemCategoryManager.js`)
Gestiona categorías de problemas y niveles de dificultad.

### 4. **UserManager** (`managers/UserManager.js`)
Gestiona datos de usuarios: nivel, puntuación, monedas, avatares.

### 5. **AchievementManager** (`managers/AchievementManager.js`)
Sistema de logros desbloqueables por alcanzar metas específicas.

### 6. **DailyChallengeManager** (`managers/DailyChallengeManager.js`)
Desafíos diarios que se regeneran cada 24 horas.

### 7. **StoreManager** (`managers/StoreManager.js`)
Tienda virtual donde comprar avatares y decoraciones con monedas.

### 8. **TranslationManager** (`managers/TranslationManager.js`)
Sistema multiidioma (7 idiomas soportados).

## 🌍 Idiomas Soportados
- 🇪🇸 Español (es)
- 🇬🇧 English (en)
- 🇫🇷 Français (fr)
- 🇪🇸 Català (ca)
- 🇩🇪 Deutsch (de)
- 🇵🇹 Português (pt)
- 🇪🇸 Galego (gl)

## 📚 Sistema de Problemas

### Estructura de Problemas
Cada problema tiene:
- `id`: Identificador único
- `tipo`: matemático, lógica
- `nivelMin`: Nivel mínimo requerido
- `categorias`: Tipos de problemas
- `i18n`: Clave de traducción
- `generar()`: Función que genera la pregunta dinámicamente

### Respuesta de Problema
```javascript
{
  texto: "Pregunta generada",
  respuestaCorrecta: valor,
  explicacion: "Explicación de la respuesta",
  ecuacion: "Representación visual",
  ecuacionValores: [valor1, valor2],
  opciones: [opcion1, opcion2, opcion3, opcion4]
}
```

## 🧪 Testing

### Cobertura
- **220 pruebas totales**
- **10 suites de pruebas**
- Incluye pruebas unitarias e integración

### Ejecutar pruebas
```bash
npm test
```

## 🛠️ Desarrollo

### Instalar dependencias
```bash
npm install
```

### Ejecutar en desarrollo
Abrir `docs/index.html` en navegador (requiere servidor local)

### Construir/Empaquetar
```bash
npm run build
```

### Ver cambios de cache
```bash
npm run bump-cache
```

## 📖 Para Agentes IA

Para entender mejor cómo contribuir:
1. Lee [PROJECT_ARCHITECTURE.md](.ai-docs/PROJECT_ARCHITECTURE.md) para visión técnica completa
2. Consulta los módulos específicos en `.ai-docs/` según lo que necesites modificar
3. Revisa [DEVELOPMENT_GUIDE.md](.ai-docs/DEVELOPMENT_GUIDE.md) para mejores prácticas
4. Las pruebas en `tests/` muestran cómo se espera que funcionen los módulos

## 📝 Archivos Clave de Documentación

- `README.md` - Documentación principal
- `CONTRIBUTING.md` - Guía de contribución
- `CODE_OF_CONDUCT.md` - Código de conducta
- `ESTRUCTURA_PROBLEMAS.md` - Detalle del sistema de problemas
- `TESTS_ANTI_REPETITION.md` - Documentación de anti-repetición
- `TEST_REPORT.md` - Reporte de pruebas

## 🔄 Flujo Principal de la Aplicación

```
app.js (entrada)
  ↓
GameEngine (core logic)
  ├→ UserManager (datos usuario)
  ├→ QuestionGenerator (genera preguntas)
  ├→ AchievementManager (logros)
  ├→ DailyChallengeManager (desafíos)
  ├→ StoreManager (tienda)
  ├→ TranslationManager (idiomas)
  └→ ProblemCategoryManager (categorías)
```

## 📞 Contacto y Contribución

Consulta `CONTRIBUTING.md` para políticas de contribución.
