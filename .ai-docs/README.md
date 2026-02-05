# 📚 .ai-docs - Documentación para Agentes IA

Bienvenido a la documentación técnica de MathGame. Esta carpeta contiene guías detalladas para entender y contribuir al proyecto.

## 📖 Índice de Documentos

### 🏗️ Arquitectura General
- **[PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md)** - Visión técnica completa, capas, componentes, flujos principales
  - Arquitectura en capas
  - Componentes principales
  - Patrones de diseño
  - Flujos de datos

### 🎮 Módulos Principales

#### Core Engine
- **[GAME_ENGINE.md](GAME_ENGINE.md)** - Motor central que orquesta todo
  - Métodos principales
  - Gestión de estados
  - Interacción con otros managers
  - Ejemplo de uso completo

#### Sistema de Problemas
- **[PROBLEM_SYSTEM.md](PROBLEM_SYSTEM.md)** - Problemas matemáticos y lógicos
  - Estructura de problemas
  - Generación dinámica
  - Sistema i18n integrado
  - 7 idiomas soportados
  - Variación de contenido

#### Gestión de Usuarios
- **[USER_SYSTEM.md](USER_SYSTEM.md)** - Datos, progresión y estadísticas
  - Estructura de datos del usuario
  - Sistema de niveles y XP
  - Gestión de monedas virtuales
  - Avatares y preferencias
  - Persistencia en localStorage

#### Logros
- **[ACHIEVEMENT_SYSTEM.md](ACHIEVEMENT_SYSTEM.md)** - Sistema de logros desbloqueables
  - Estructura de logros
  - Categorías (Gameplay, Progression, Special)
  - Sistema de recompensas
  - Detección automática
  - 20+ logros definidos

#### Desafíos Diarios
- **[DAILY_CHALLENGES.md](DAILY_CHALLENGES.md)** - Desafíos únicos cada 24 horas
  - Tipos de desafíos
  - Generación automática
  - Sistema de racha
  - Recompensas aumentadas
  - Ciclo diario

#### Tienda Virtual
- **[STORE_SYSTEM.md](STORE_SYSTEM.md)** - Sistema de compra con monedas virtuales
  - Catálogo de items (avatares, temas, decoraciones)
  - Gestión de compras
  - Validación de requisitos
  - Sistema de rareza
  - Inventario del usuario

#### Traducciones
- **[TRANSLATION_SYSTEM.md](TRANSLATION_SYSTEM.md)** - Sistema multiidioma (7 idiomas)
  - i18n de problemas
  - i18n de UI general
  - Cambio de idioma dinámico
  - Verificación de traducciones
  - Cobertura 93%

### 🚀 Desarrollo
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Guía completa para contribuidores
  - Setup inicial
  - Cómo añadir problemas
  - Cómo modificar managers
  - Testing
  - Convenciones de código
  - Proceso de Pull Request
  - Debugging
  - Checklist pre-PR

### 📁 Documentos Relacionados
- **[.github/PROJECT_STRUCTURE.md](../.github/PROJECT_STRUCTURE.md)** - Estructura de carpetas y archivos
- **[../ESTRUCTURA_PROBLEMAS.md](../ESTRUCTURA_PROBLEMAS.md)** - Detalles del sistema de problemas
- **[../TESTS_ANTI_REPETITION.md](../TESTS_ANTI_REPETITION.md)** - Anti-repetición de preguntas
- **[../README.md](../README.md)** - Documentación principal del proyecto

## 🎯 Guía Rápida por Tarea

### Quiero...

**Añadir un nuevo problema matemático**
1. Lee [PROBLEM_SYSTEM.md](PROBLEM_SYSTEM.md) - Sección "Anatomía de un Problema"
2. Ve a `docs/js/problems/categories/level#.js`
3. Sigue el checklist en [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)

**Entender cómo funciona el juego completo**
1. Lee [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) - Sección "Arquitectura en Capas"
2. Lee [GAME_ENGINE.md](GAME_ENGINE.md) - Sección "Flujo de Estados"
3. Mira el "Flujo Principal de la Aplicación" en [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md)

**Modificar el sistema de usuarios**
1. Lee [USER_SYSTEM.md](USER_SYSTEM.md) completamente
2. Lee las pruebas en `tests/unit/UserManager.test.js`
3. Modifica `docs/js/managers/UserManager.js`
4. Actualiza/crea pruebas
5. Ejecuta `npm test`

**Agregar un nuevo idioma**
1. Lee [TRANSLATION_SYSTEM.md](TRANSLATION_SYSTEM.md) - Sección "Ejemplo: Agregar Nuevo Idioma"
2. Copia estructura de archivos
3. Traduce todos los strings
4. Ejecuta `npm test` para validar cobertura

**Implementar una característica nueva**
1. Lee [GAME_ENGINE.md](GAME_ENGINE.md) para entender el flujo
2. Identifica qué managers necesitas modificar
3. Lee documentación de esos managers
4. Actualiza el código
5. Escribe tests
6. Sigue [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) para PR

**Arreglar un bug**
1. Crea test que reproduzca el problema
2. Ejecuta `npm test` para confirmar el fallo
3. Arregla el código
4. Verifica que el test pase
5. Ejecuta suite completa: `npm test`

**Entender cómo funcionan los logros**
1. Lee [ACHIEVEMENT_SYSTEM.md](ACHIEVEMENT_SYSTEM.md) completamente
2. Mira ejemplos de logros en la sección "Logros Estándar"
3. Lee `docs/js/managers/ACHIEVEMENTS.md` para lista completa

**Trabajar con desafíos diarios**
1. Lee [DAILY_CHALLENGES.md](DAILY_CHALLENGES.md)
2. Entiende el ciclo de 24 horas
3. Mira ejemplos en sección "Ejemplo Completo"

## 📊 Estadísticas del Proyecto

```
Problemas definidos: 16+ (level 1, expandible)
Idiomas soportados: 7
Managers implementados: 8
Tests totales: 220
Cobertura: ~85%
Líneas de documentación i18n: 2,100+
Logros definidos: 20+
```

## 🔍 Búsqueda Rápida de Conceptos

| Concepto | Documento | Sección |
|----------|-----------|---------|
| Estructura de proyecto | PROJECT_STRUCTURE.md | Estructura de Carpetas |
| Capas de arquitectura | PROJECT_ARCHITECTURE.md | Arquitectura en Capas |
| GameEngine | GAME_ENGINE.md | Métodos Clave |
| Problemas | PROBLEM_SYSTEM.md | Anatomía de un Problema |
| Niveles de dificultad | PROBLEM_SYSTEM.md | Niveles de Dificultad |
| Usuarios | USER_SYSTEM.md | Métodos Principales |
| Monedas | USER_SYSTEM.md | Sistema de Monedas |
| Avatares | USER_SYSTEM.md, STORE_SYSTEM.md | Avatar System / Categorías |
| Logros | ACHIEVEMENT_SYSTEM.md | Logros Estándar |
| Desafío diario | DAILY_CHALLENGES.md | Tipos de Desafíos |
| Tienda | STORE_SYSTEM.md | Métodos Principales |
| Traducciones | TRANSLATION_SYSTEM.md | Estructura del Sistema |
| Testing | DEVELOPMENT_GUIDE.md | Testing |
| Pull Request | DEVELOPMENT_GUIDE.md | Proceso de Pull Request |

## 🚀 Flujos Clave Documentados

### Flujos en GAME_ENGINE.md
- Inicialización de juego
- Obtención de pregunta
- Validación de respuesta
- Fin de sesión

### Flujos en USER_SYSTEM.md
- Actualización de estadísticas
- Subida de nivel
- Compra de items

### Flujos en ACHIEVEMENT_SYSTEM.md
- Desbloqueo de logro
- Racha de respuestas
- Recompensas

### Flujos en DAILY_CHALLENGES.md
- Generación diaria
- Actualización de progreso
- Finalización del desafío

### Flujos en TRANSLATION_SYSTEM.md
- Generación de pregunta con traducción
- Cambio de idioma

## 📝 Código Importante a Conocer

Estos archivos son fundamentales para entender el proyecto:

```
docs/js/
├── managers/
│   ├── GameEngine.js          ⭐ CORE
│   ├── QuestionGenerator.js   ⭐ IMPORTANTE
│   ├── UserManager.js         ⭐ IMPORTANTE
│   ├── AchievementManager.js
│   ├── DailyChallengeManager.js
│   ├── StoreManager.js
│   ├── TranslationManager.js
│   ├── ProblemCategoryManager.js
│   └── ACHIEVEMENTS.md
│
├── problems/
│   ├── categories/
│   │   └── level1.js          ⭐ REFERENCIA
│   └── i18n/
│       └── es.js              ⭐ REFERENCIA
│
├── app.js                     ⭐ ENTRADA
└── problemas.js
```

## 🧪 Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests de un módulo
npm test -- GameEngine.test.js

# Con cobertura
npm test -- --coverage

# En modo watch
npm test -- --watch
```

## 💡 Tips Importantes

1. **Siempre testea**: Cada cambio debe tener pruebas
2. **Lee la documentación**: Antes de modificar un módulo, lee su doc
3. **Sigue convenciones**: El código debe ser legible y consistente
4. **Pequeños commits**: Commits pequeños y descriptivos
5. **Validar antes de PR**: `npm test` debe pasar siempre

## ❓ Preguntas Frecuentes

**P: ¿Dónde empiezo a leer?**
R: Comienza con [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) para visión general, luego los módulos específicos que necesites.

**P: ¿Cómo se estructura un problema?**
R: Lee [PROBLEM_SYSTEM.md](PROBLEM_SYSTEM.md) sección "Anatomía de un Problema".

**P: ¿Cómo añado un nuevo idioma?**
R: Lee [TRANSLATION_SYSTEM.md](TRANSLATION_SYSTEM.md) sección "Ejemplo: Agregar Nuevo Idioma".

**P: ¿Cuál es el flujo completo del juego?**
R: [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) sección "Flujo Principal de la Aplicación".

**P: ¿Cómo testeo mi código?**
R: [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) sección "Testing".

## 🔗 Enlaces Útiles Internos

- [Ver estructura completa de carpetas](../.github/PROJECT_STRUCTURE.md)
- [Guía para contribuidores](DEVELOPMENT_GUIDE.md)
- [Lista completa de logros](../docs/js/managers/ACHIEVEMENTS.md)
- [Detalles de problemas](../ESTRUCTURA_PROBLEMAS.md)

## 📞 Soporte

Si necesitas ayuda:
1. Busca en estos documentos
2. Mira los tests existentes como ejemplos
3. Lee el código fuente
4. Abre un issue en GitHub

---

**Última actualización**: Febrero 2026  
**Versión de documentación**: 1.0  
**Cobertura**: Todos los módulos principales
