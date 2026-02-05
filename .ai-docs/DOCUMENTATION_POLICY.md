# 📋 Reglas de Documentación del Proyecto

## 📌 Política General

**Toda documentación técnica, de arquitectura, módulos y sistemas debe estar en las carpetas designadas, NO en la raíz del proyecto.**

## 📂 Ubicaciones Permitidas

### ✅ `.github/PROJECT_STRUCTURE.md`
**Ubicación**: `.github/PROJECT_STRUCTURE.md`

**Contenido permitido**:
- Estructura general de carpetas y archivos
- Descripción de qué contiene cada carpeta
- Mapa general del proyecto
- Diagrama ASCII de la estructura

### ✅ `.ai-docs/` (Documentación Técnica para IA)
**Ubicación**: `.ai-docs/*.md`

**Subdivisión**:
- `README.md` - Índice y guía rápida
- `PROJECT_ARCHITECTURE.md` - Visión técnica general
- `GAME_ENGINE.md` - Módulo GameEngine
- `PROBLEM_SYSTEM.md` - Sistema de problemas
- `USER_SYSTEM.md` - Sistema de usuarios
- `ACHIEVEMENT_SYSTEM.md` - Sistema de logros
- `DAILY_CHALLENGES.md` - Desafíos diarios
- `STORE_SYSTEM.md` - Tienda virtual
- `TRANSLATION_SYSTEM.md` - Sistema multiidioma
- `DEVELOPMENT_GUIDE.md` - Guía de desarrollo

**Contenido permitido**:
- Documentación técnica de módulos
- Métodos y funciones
- Estructuras de datos
- Patrones y arquitectura
- Ejemplos de código
- Guías para contribuidores
- Información sobre sistemas internos

## ❌ Ubicaciones NO Permitidas

**Raíz del proyecto (`/`)**:
- ❌ ESTRUCTURA_PROBLEMAS.md
- ❌ TESTS_ANTI_REPETITION.md
- ❌ CSS_MODULAR.md
- ❌ TEST_REPORT.md
- ❌ Cualquier documento `.md` técnico/arquitectura

**Razón**: La raíz del proyecto debe mantenerse limpia y enfocada solo en:
- `README.md` - Documentación principal del usuario
- `CODE_OF_CONDUCT.md` - Código de conducta
- `CONTRIBUTING.md` - Guía de contribución
- `LICENSE` - Licencia

## 📝 Cuándo Mover Documentación

### Casos que Requieren Actualizar Documentación en `.ai-docs/`

1. **Cambios en estructura de carpetas**
   - Actualizar: `.github/PROJECT_STRUCTURE.md`
   - Actualizar: `.ai-docs/PROJECT_ARCHITECTURE.md`

2. **Cambios en un módulo**
   - Actualizar: `.ai-docs/[MODULE_NAME].md`
   - Ejemplo: Si cambias `UserManager.js`, actualizar `USER_SYSTEM.md`

3. **Nuevos sistemas o características**
   - Crear nuevo archivo en `.ai-docs/`
   - Actualizar `.ai-docs/README.md` con entrada en índice
   - Actualizar `.ai-docs/PROJECT_ARCHITECTURE.md` si afecta visión general

4. **Cambios en flujos o reglas**
   - Actualizar: `.ai-docs/[RELEVANT_MODULE].md`
   - Ejemplo: Si cambias cómo funcionan los logros, actualizar `ACHIEVEMENT_SYSTEM.md`

5. **Nuevos problemas o idiomas**
   - Actualizar: `.ai-docs/PROBLEM_SYSTEM.md`
   - Actualizar: `.ai-docs/TRANSLATION_SYSTEM.md`

## 🔄 Flujo de Cambio

```
1. Modificas código en docs/js/
   ↓
2. ¿Cambia arquitectura/estructura?
   ├─ SÍ → Actualizar .ai-docs/*.md
   └─ NO → Solo actualizar pruebas
   ↓
3. ¿Es cambio importante?
   ├─ SÍ → Crear issue/commit explicativo
   └─ NO → Commit simple
   ↓
4. Nunca crearemos .md técnicos en raíz
   (Se actualiza .ai-docs/ en su lugar)
```

## 📊 Mantenimiento de Documentación

### Checklist Antes de Commit

- [ ] Si modifico módulo: ¿Actualicé `.ai-docs/[MODULE].md`?
- [ ] Si cambio estructura: ¿Actualicé `.github/PROJECT_STRUCTURE.md`?
- [ ] Si añado característica: ¿Documenté en `.ai-docs/`?
- [ ] ¿No creé archivos `.md` en la raíz?
- [ ] ¿Actualicé `.ai-docs/README.md` si es necesario?

### Auditoría Periódica

```
Trimestral:
- Revisar si .ai-docs/ está actualizado
- Buscar documentación en raíz (❌ no permitido)
- Verificar que no hay duplicación
- Eliminar documentos obsoletos
```

## 📚 Jerarquía de Documentación

```
Documentación del Proyecto (3 niveles)

NIVEL 1: Usuario Final
└─ README.md (raíz)
   - ¿Qué es MathGame?
   - Cómo jugar
   - Instalación básica

NIVEL 2: Contribuidor
└─ CONTRIBUTING.md (raíz)
   - Cómo contribuir
   - Código de conducta
   - Proceso básico

NIVEL 3: Técnico/IA
├─ .github/PROJECT_STRUCTURE.md
│  - Estructura de carpetas
│  - Ubicación de archivos
│
└─ .ai-docs/*
   - Arquitectura completa
   - Módulos y APIs
   - Patrones internos
   - Guía de desarrollo
```

## 🎯 Ejemplo: Añadir Nueva Característica

### Escenario: "Agregar sistema de Desafío Semanal"

**CORRECTO**:
```
1. Crear DailyChallengeManager.js (código)
2. Crear pruebas en tests/
3. Actualizar .ai-docs/DAILY_CHALLENGES.md
4. Actualizar .ai-docs/PROJECT_ARCHITECTURE.md (si es necesario)
5. Actualizar .ai-docs/README.md (índice)
6. Commit: "feat: Add weekly challenge system"
```

**INCORRECTO**:
```
1. Crear WEEKLY_CHALLENGES.md en raíz ❌
2. Crear SISTEMA_DESAFIOS.md en raíz ❌
```

## 🚨 Qué Pasa si Encuentro Documentación Antigua en Raíz

```
Si encuentras archivos .md técnicos fuera de .github y .ai-docs:

1. Leer y extraer información importante
2. Integrar en .ai-docs/ correspondiente
3. Eliminar archivo antiguo
4. Commit: "docs: Move [doc] to .ai-docs/, consolidate documentation"
```

## 📞 Preguntas Frecuentes

**P: ¿Dónde documento un bug fix?**
R: No necesita documentación en `.ai-docs/`. Hazlo en el commit message:
```bash
git commit -m "fix: Corregir cálculo de XP en GameEngine"
```

**P: ¿Y un cambio importante de arquitectura?**
R: Actualiza `.ai-docs/PROJECT_ARCHITECTURE.md` con los nuevos detalles.

**P: ¿Puedo crear nuevos archivos en `.ai-docs/`?**
R: Sí, si la información no cabe en los existentes. Actualiza `README.md` con el índice.

**P: ¿Qué pasa con la documentación de usuario?**
R: Va en `README.md` (raíz). Eso es documentación **para usuarios**, no para IA.

**P: ¿Documentación de CSS?**
R: Aunque existe `CSS_MODULAR.md`, debería estar en `.ai-docs/CSS_ARCHITECTURE.md` si es para IA. El CSS estructura se menciona en `PROJECT_STRUCTURE.md`.

## ✅ Conclusión

**Regla de Oro**: 
- Documentación técnica = `.ai-docs/` + `.github/PROJECT_STRUCTURE.md`
- Documentación usuario = `README.md`, `CONTRIBUTING.md`
- Documentación legal = `CODE_OF_CONDUCT.md`, `LICENSE`
- Raíz limpia = Mejor usabilidad

---

**Versión**: 1.0  
**Última actualización**: Febrero 2026  
**Responsable**: Maintenance Policy
