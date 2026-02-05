# GameEngine - Motor del Juego

## 📍 Ubicación
`docs/js/managers/GameEngine.js`

## 🎯 Propósito
GameEngine es el núcleo orquestador de toda la lógica del juego. Gestiona el flujo completo de una sesión de juego, desde el inicio hasta el final, coordinando con otros managers.

## 🔄 Responsabilidades Principales

1. **Inicialización y Control de Flujo**
   - Preparar juego
   - Controlar estado (activo, pausado, terminado)
   - Limpieza

2. **Generación de Preguntas**
   - Obtener preguntas del QuestionGenerator
   - Gestionar secuencia de preguntas
   - Evitar repetición

3. **Validación de Respuestas**
   - Evaluar respuestas del usuario
   - Calcular precisión
   - Proporcionar retroalimentación

4. **Progresión del Juego**
   - Rastrear turno actual
   - Gestionar cambios de nivel
   - Calcular puntuación

5. **Coordinación con Otros Managers**
   - Actualizar datos de usuario (UserManager)
   - Detectar logros (AchievementManager)
   - Guardar datos (Persistencia)

## 🏗️ Estructura de Clase

```javascript
class GameEngine {
  constructor() {
    this.gameActive = false
    this.currentQuestion = null
    this.score = 0
    this.turn = 0
    this.userLevel = 1
    this.correctAnswers = 0
    this.totalAnswers = 0
  }

  // Métodos principales
  startGame(level, category)
  nextQuestion()
  checkAnswer(answer)
  endGame()
  resetGame()
  
  // Métodos auxiliares
  calculateScore()
  getGameStats()
  isGameOver()
}
```

## 📌 Métodos Clave

### `startGame(level, category)`
Inicia una nueva sesión de juego.

**Parámetros**:
- `level` (number): Nivel seleccionado (1-5)
- `category` (string): Categoría de problemas

**Acciones**:
1. Valida nivel y categoría
2. Carga UserManager
3. Inicializa QuestionGenerator
4. Genera primera pregunta
5. Establece `gameActive = true`

**Ejemplo**:
```javascript
const engine = new GameEngine();
engine.startGame(2, 'explorador');
```

### `nextQuestion()`
Obtiene la siguiente pregunta.

**Acciones**:
1. Incrementa contador de turno
2. Obtiene pregunta del generador
3. Aplica validaciones
4. Retorna pregunta

**Retorno**:
```javascript
{
  id: "compra_estandar",
  texto: "Compramos 3 gomas...",
  opciones: [6, 8, 5, 7],
  respuestaCorrecta: 6
}
```

### `checkAnswer(answer)`
Valida la respuesta del usuario.

**Parámetros**:
- `answer`: Respuesta seleccionada por usuario

**Acciones**:
1. Compara con respuestaCorrecta
2. Actualiza contadores
3. Calcula puntos
4. Retorna resultado

**Retorno**:
```javascript
{
  isCorrect: true,
  points: 10,
  explanation: "¡Correcto! 5 × 3 = 15",
  nextQuestion: nextQuestionObj
}
```

### `endGame()`
Termina la sesión actual.

**Acciones**:
1. Calcula estadísticas finales
2. Guarda en UserManager
3. Detecta logros alcanzados
4. Establece `gameActive = false`

**Retorno**:
```javascript
{
  finalScore: 150,
  correctAnswers: 8,
  totalAnswers: 10,
  accuracy: 0.8,
  achievements: []
}
```

### `resetGame()`
Reinicia el juego actual.

**Acciones**:
1. Limpia estado
2. Mantiene nivel seleccionado
3. Cero puntuación
4. Lista para iniciar

## 🔀 Flujo de Estados

```
┌─────────────┐
│   INITIAL   │
└──────┬──────┘
       │ startGame()
       ▼
┌──────────────┐
│   RUNNING    │
│              │
│  ├─ Turn 1   │
│  ├─ Turn 2   │
│  ├─ ...      │
│  └─ Turn N   │
└──────┬───────┘
       │ endGame() o maxTurns
       ▼
┌──────────────┐
│   FINISHED   │
└──────────────┘
```

## 🎯 Interacción con Otros Managers

### Con QuestionGenerator
```javascript
// GameEngine.js
const question = this.questionGenerator.getQuestion(
  this.userLevel,
  this.currentCategory
);
```

### Con UserManager
```javascript
// Obtener datos del usuario
const userData = this.userManager.getUserData();
this.userLevel = userData.level;

// Actualizar puntuación
this.userManager.addCoins(points);
this.userManager.addExperience(points);
```

### Con AchievementManager
```javascript
// Después de responder
const newAchievements = this.achievementManager.checkAchievements(
  this.correctAnswers,
  this.totalAnswers,
  this.score
);
```

## 📊 Estructura de Datos de Sesión

```javascript
gameSession = {
  id: string,           // ID único de sesión
  level: number,        // Nivel seleccionado
  category: string,     // Categoría
  startTime: Date,      // Hora inicio
  endTime: Date,        // Hora fin
  turns: [
    {
      turnNumber: 1,
      question: QuestionObject,
      userAnswer: any,
      isCorrect: boolean,
      timeSpent: number  // ms
    },
    // ...más turnos
  ],
  stats: {
    correctAnswers: number,
    totalAnswers: number,
    accuracy: number,
    totalScore: number,
    averageTimePerTurn: number
  }
}
```

## ⏱️ Gestión de Tiempo

**Tiempo por pregunta**:
- Se registra automáticamente
- Se usa para estadísticas
- No hay límite de tiempo estricto

**Sesión de juego**:
- Duración total registrada
- Se usa para análisis de comportamiento

## 🎲 Anti-Repetición

GameEngine asegura que:
- No se repita la misma pregunta en una sesión
- Las preguntas dinámicas tienen variación
- Se rastrea el historial

**Implementación**:
```javascript
// Rastrear preguntas mostradas
this.shownQuestionIds = new Set();

// Al obtener siguiente pregunta
while (this.shownQuestionIds.has(question.id)) {
  question = this.questionGenerator.getQuestion(...);
}

this.shownQuestionIds.add(question.id);
```

## 💾 Persistencia

Después de `endGame()`, se guardan:
- Datos de usuario actualizados
- Estadísticas de sesión
- Logros desbloqueados
- Progreso general

```javascript
// En localStorage
localStorage['mathgame_game_sessions'] = JSON.stringify([...sessions]);
```

## 🧪 Testing

**Pruebas clave**:
```javascript
describe('GameEngine', () => {
  it('should initialize correctly', () => {});
  it('should start and end game', () => {});
  it('should handle correct answers', () => {});
  it('should handle incorrect answers', () => {});
  it('should track statistics', () => {});
  it('should integrate with UserManager', () => {});
});
```

**Ver**: `tests/unit/GameEngine.test.js`

## 🚀 Mejoras Potenciales

1. **Dificultad Dinámica**: Ajustar dificultad según desempeño
2. **Modo Modo Infinito**: Juego sin límite de turnos
3. **Multijugador Local**: Competencia entre usuarios
4. **Historial Detallado**: Guardar todas las sesiones
5. **Análisis**: Dashboard de progreso

## 📝 Ejemplo de Uso Completo

```javascript
// Inicializar
const engine = new GameEngine();

// Comenzar juego
engine.startGame(2, 'explorador');

// Obtener pregunta
let question = engine.nextQuestion();
console.log(question.texto); // Mostrar al usuario

// Usuario responde
const userAnswer = userSelectedOption; // Del UI
const result = engine.checkAnswer(userAnswer);

console.log(result.isCorrect);        // ¿Correcta?
console.log(result.points);           // Puntos ganados
console.log(result.explanation);      // Explicación

// Siguiente pregunta (si no es fin)
if (result.nextQuestion) {
  question = result.nextQuestion;
}

// Terminar sesión
const gameStats = engine.endGame();
console.log(gameStats.finalScore);    // Puntuación final
console.log(gameStats.accuracy);      // Precisión
```

## 🔗 Archivos Relacionados

- `QuestionGenerator.js` - Genera preguntas
- `UserManager.js` - Datos de usuario
- `AchievementManager.js` - Logros
- `GameEngine.test.js` - Pruebas unitarias
