# Guía de Desarrollo

## 🎯 Para Nuevos Desarrolladores

Esta guía te ayudará a entender cómo contribuir al proyecto MathGame.

## 📋 Requisitos Previos

- Conocimiento de JavaScript (ES6+)
- HTML/CSS básico
- Git
- Node.js y npm
- Un navegador moderno

## 🚀 Setup Inicial

### 1. Clonar Repositorio

```bash
git clone https://github.com/usuario/MathGame.git
cd MathGame
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar Pruebas

```bash
npm test
```

### 4. Abrir en Navegador

```bash
# Opción 1: Servidor local (Python)
python -m http.server 8000

# Opción 2: Servidor local (Node)
npx http-server

# Luego abrir en navegador:
# http://localhost:8000/docs/index.html
```

## 📁 Estructura para Contribuir

### Para Añadir Problemas Matemáticos

**Ubicación**: `docs/js/problems/categories/level#.js`

**Pasos**:

1. Abre el archivo del nivel que quieres editar
2. Copia la estructura de un problema existente
3. Implementa la función `generar()`
4. Añade traducciones en todos los archivos `i18n/*.js`
5. Testea que funciona
6. Commit y Pull Request

**Ejemplo**:

```javascript
// En level1.js
{
  id: "mi_nuevo_problema",
  tipo: "matematico",
  nivelMin: 1,
  categorias: ['explorador'],
  i18n: "mi_nuevo_problema",
  generar: () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const resultado = num1 + num2;

    return {
      texto: `${num1} + ${num2} = ?`,
      respuestaCorrecta: resultado,
      explicacion: `${num1} más ${num2} es ${resultado}`,
      ecuacion: `${num1} + ${num2} = __`,
      ecuacionValores: [resultado],
      opciones: [resultado, resultado + 1, resultado - 1, resultado + 2]
    };
  }
}

// En i18n/es.js
mi_nuevo_problema: {
  texto: (num1, num2) => `${num1} + ${num2} = ?`,
  explicacion: (num1, num2, resultado) => `${num1} más ${num2} es ${resultado}`
}

// Repite para todos los idiomas
```

### Para Modificar un Manager

**Ubicación**: `docs/js/managers/`

**Pasos**:

1. Identifica qué manager afecta (GameEngine, UserManager, etc.)
2. Lee la documentación en `.ai-docs/`
3. Modifica el método necesario
4. Actualiza/crea pruebas en `tests/unit/`
5. Ejecuta `npm test` para validar
6. Commit y Pull Request

### Para Arreglar un Bug

**Pasos**:

1. Crea una rama descriptiva: `git checkout -b fix/descripcion-del-bug`
2. Localiza el código problemático
3. Añade prueba que reproduce el bug
4. Arregla el bug
5. Verifica que la prueba pase
6. Commit: `git commit -m "Fix: Descripción del arreglo"`
7. Push y Pull Request

## 🧪 Testing

### Ejecutar Todas las Pruebas

```bash
npm test
```

### Ejecutar Pruebas de un Módulo

```bash
npm test -- GameEngine.test.js
```

### Ejecutar con Cobertura

```bash
npm test -- --coverage
```

### Escribir Nueva Prueba

**Ubicación**: `tests/unit/` o `tests/integration/`

**Estructura**:

```javascript
describe("NombreDelModulo", () => {
    let manager;

    beforeEach(() => {
        manager = new NombreDelModulo();
    });

    it("debería hacer algo", () => {
        const resultado = manager.metodo();
        expect(resultado).toBeDefined();
    });

    it("debería manejar error", () => {
        expect(() => {
            manager.metodoConError();
        }).toThrow();
    });
});
```

## 💬 Convenciones de Código

### Nombres de Variables

```javascript
// ✅ BIEN
const userLevel = 3;
const totalScore = 150;
const achievementUnlocked = true;

// ❌ MAL
const ul = 3;
const ts = 150;
const au = true;
```

### Funciones

```javascript
// ✅ BIEN
function checkAnswerCorrectness(userAnswer, correctAnswer) {
    return userAnswer === correctAnswer;
}

// ❌ MAL
function check(a, b) {
    return a === b;
}
```

### Comentarios

```javascript
// ✅ BIEN
// Valida que el nivel esté en rango permitido (1-5)
if (level >= 1 && level <= 5) {
    // ...
}

// ❌ MAL
// Esto valida el nivel
if (level >= 1 && level <= 5) {
    // ...
}
```

## 📝 Proceso de Pull Request

### 1. Fork el Repositorio

```bash
git clone https://github.com/TU_USUARIO/MathGame.git
cd MathGame
git remote add upstream https://github.com/REPO_ORIGINAL/MathGame.git
```

### 2. Crear Rama

```bash
git checkout -b feature/tu-caracteristica
# o
git checkout -b fix/tu-arreglo
```

### 3. Hacer Cambios

- Edita archivos necesarios
- Crea/actualiza pruebas
- Ejecuta `npm test` para validar

### 4. Commit

```bash
git add .
git commit -m "type: Descripción concisa

Descripción más detallada de los cambios.
Por qué se hace este cambio.
"
```

**Tipos de commits**:

- `feat:` Nueva característica
- `fix:` Arreglo de bug
- `docs:` Cambios de documentación
- `test:` Nuevas pruebas
- `refactor:` Reestructuración de código
- `perf:` Mejora de rendimiento

### 5. Push

```bash
git push origin feature/tu-caracteristica
```

### 6. Pull Request

- Ve a GitHub
- Crea PR con descripción clara
- Referencia issues relacionados (#123)
- Espera revisión

## 🐛 Debugging

### Usar Console

```javascript
console.log("Valor:", variable);
console.warn("Advertencia:", mensaje);
console.error("Error:", error);
```

### Usar Debugger

```javascript
debugger; // El navegador pausará aquí

// En DevTools (F12)
// - Puedes inspeccionar variables
// - Pisar código línea por línea
// - Evaluar expresiones
```

### Testing para Debugging

```javascript
// A veces es mejor escribir test para entender qué falla
test("debería calcular correctamente", () => {
    const resultado = calcular(5, 3);
    console.log("Resultado:", resultado);
    expect(resultado).toBe(8);
});

// npm test -- --watch
// Se ejecutará cada vez que guardes
```

## 📚 Recursos

### Documentación del Proyecto

- [PROJECT_STRUCTURE.md](../.github/PROJECT_STRUCTURE.md) - Estructura general
- [PROJECT_ARCHITECTURE.md](PROJECT_ARCHITECTURE.md) - Arquitectura técnica
- [PROBLEM_SYSTEM.md](PROBLEM_SYSTEM.md) - Sistema de problemas
- [GAME_ENGINE.md](GAME_ENGINE.md) - Motor del juego

### Managers Específicos

- [USER_SYSTEM.md](USER_SYSTEM.md) - Gestión de usuarios
- [ACHIEVEMENT_SYSTEM.md](ACHIEVEMENT_SYSTEM.md) - Logros
- [DAILY_CHALLENGES.md](DAILY_CHALLENGES.md) - Desafíos diarios
- [STORE_SYSTEM.md](STORE_SYSTEM.md) - Tienda
- [TRANSLATION_SYSTEM.md](TRANSLATION_SYSTEM.md) - Traducciones

### Recursos Externos

- [MDN JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/)
- [Jest Testing](https://jestjs.io/)
- [Git Guide](https://rogerdudler.github.io/git-guide/index.es.html)

## ✅ Checklist Antes de PR

- [ ] Código sigue las convenciones del proyecto
- [ ] He ejecutado `npm test` y todo pasa
- [ ] He añadido pruebas para cambios nuevos
- [ ] He actualizado documentación si es necesario
- [ ] Commits tienen mensajes descriptivos
- [ ] No hay archivos innecesarios commiteados
- [ ] He hecho rebase con `main` si es necesario

## 🚫 Cosas a Evitar

### ❌ No Hagas

```javascript
// Usar var
var x = 5;

// Métodos en lugar de funciones flecha en clases
class Mi {
  metodo() { }  // ❌ Cambiar a:
  metodo = () => { }  // ✅
}

// Ignorar errores
try { ... } catch(e) { }  // ❌ Sin hacer nada

// Variables globales
window.miVariable = 5;  // ❌

// Magic numbers
if (score > 1500) {  // ¿Por qué 1500?
  // Usar constantes:
  const LEVEL_UP_THRESHOLD = 1500;
}
```

## 🤝 Pedir Ayuda

- **GitHub Issues**: Para bugs y características
- **Discussions**: Para preguntas
- **Code Review**: Los mantainers ayudarán

## 📖 Ejemplo: Añadir un Nuevo Problema

### Paso 1: Crear Problema en level1.js

```javascript
{
  id: "suma_tres_numeros",
  tipo: "matematico",
  nivelMin: 1,
  categorias: ['explorador'],
  i18n: "suma_tres_numeros",
  generar: () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const c = Math.floor(Math.random() * 10) + 1;
    const total = a + b + c;

    return {
      texto: `${a} + ${b} + ${c} = ?`,
      respuestaCorrecta: total,
      explicacion: `${a} + ${b} + ${c} = ${total}`,
      ecuacion: `${a} + ${b} + ${c} = __`,
      ecuacionValores: [total],
      opciones: [total, total + 1, total - 1, total + 2]
    };
  }
}
```

### Paso 2: Añadir en i18n/es.js

```javascript
suma_tres_numeros: {
  texto: (a, b, c) => `${a} + ${b} + ${c} = ?`,
  explicacion: (a, b, c, total) =>
    `${a} + ${b} = ${a + b}, luego ${a + b} + ${c} = ${total}`
}
```

### Paso 3: Repetir para Otros Idiomas

Copiar estructura a:

- i18n/en.js
- i18n/fr.js
- i18n/ca.js
- i18n/de.js
- i18n/pt.js
- i18n/gl.js

### Paso 4: Probar

```bash
npm test
```

### Paso 5: Commit

```bash
git add docs/js/problems
git commit -m "feat: Add suma_tres_numeros problem to level 1

- Adds new problem for adding three numbers
- Supports all 7 languages
- Includes dynamic generation
- All tests passing"

git push origin feature/suma-tres-numeros
```

## 🎓 Aprender del Código Existente

1. Lee un manager completo (ej: UserManager)
2. Lee sus pruebas (tests/unit/UserManager.test.js)
3. Entiende cómo se llama desde GameEngine
4. Prueba modificarlo localmente
5. Escribe una prueba para lo que cambies

## 🏆 Buen Código = Código Testeado

Recuerda: Si no está testeado, no está funcionando.

```javascript
// ✅ BUENO: Código con tests
function calculate(a, b) {
    return a + b;
}

test("should add two numbers", () => {
    expect(calculate(2, 3)).toBe(5);
});

// ❌ MALO: Sin tests
function calculate(a, b) {
    return a + b;
}
// ¿Y si alguien lo cambia sin querer?
```

## 📞 Contacto

- Issues en GitHub
- Discusiones en GitHub
- Email en README.md

¡Gracias por contribuir! 🎉
