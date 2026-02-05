# Desafíos Diarios (Daily Challenges)

## 📍 Ubicación

`docs/js/managers/DailyChallengeManager.js`

## 🎯 Propósito

Generar un desafío único diario que incentiva al usuario a jugar regularmente con recompensas especiales.

## 🌟 Características

- **Regeneración Diaria**: Nuevo desafío cada 24 horas
- **Recompensas Aumentadas**: Mayor ganancia que juego normal
- **Seguimiento Independiente**: Progreso separado por día
- **Racha de Días**: Bonificación por días consecutivos

## 📊 Estructura del Desafío Diario

```javascript
{
  id: string,                    // UUID único del desafío
  date: Date,                    // Fecha del desafío
  difficulty: number,            // 1-5 (corresponde a nivel)
  target: number,                // Objetivo (ej: 10 respuestas correctas)
  completed: boolean,            // ¿Completado hoy?
  progress: number,              // Progreso actual (0-target)
  reward: {
    coins: number,              // Monedas (aumentadas)
    xp: number,                 // XP (aumentada)
    bonus: number               // Bonus por racha
  },
  description: string,           // Descripción del desafío
  startTime: Date,              // Cuando comenzó el día
  endTime: Date                 // Cuando termina el día
}
```

## 🔄 Métodos Principales

### `getDailyChallenge() → DailyChallenge`

Obtiene el desafío del día actual (o genera si no existe).

```javascript
const challenge = dailyChallengeManager.getDailyChallenge();
console.log(challenge.target); // 10
console.log(challenge.progress); // 5 (progresión actual)
console.log(challenge.description); // "Responde 10 preguntas correctamente"
```

### `updateProgress(increment) → void`

Actualiza progreso del desafío diario.

```javascript
// Usuario responde correctamente
dailyChallengeManager.updateProgress(1);
// progress pasa de 5 a 6

// Verifica si se completó
if (challenge.progress >= challenge.target) {
    completeDailyChallenge();
}
```

### `completeDailyChallenge() → Reward`

Marca el desafío como completado y otorga recompensas.

```javascript
const reward = dailyChallengeManager.completeDailyChallenge();
console.log(reward.coins); // 75 (50 base + 25 bonus)
console.log(reward.xp); // 150

// Actualiza usuario
userManager.addCoins(reward.coins);
userManager.addExperience(reward.xp);

// Dispara evento
onDailyChallengeCompleted.notify(reward);
```

### `getStreak() → number`

Obtiene días consecutivos completando desafío.

```javascript
const streak = dailyChallengeManager.getStreak();
console.log(streak); // 5 (5 días seguidos)

// Mostrar en UI: "¡Racha de 5 días!"
```

### `isExpired() → boolean`

Verifica si el desafío del día ha expirado.

```javascript
if (dailyChallengeManager.isExpired()) {
    // Generar nuevo desafío
    dailyChallengeManager.generateNewChallenge();
}
```

## 📈 Tipos de Desafíos

### Tipo 1: Respuestas Correctas

```javascript
{
  type: 'correct_answers',
  description: 'Responde 10 preguntas correctamente',
  target: 10,
  difficulty: 2,
  reward: { coins: 75, xp: 150 }
}
```

### Tipo 2: Racha de Respuestas

```javascript
{
  type: 'streak',
  description: 'Obtén una racha de 5 respuestas correctas',
  target: 5,
  difficulty: 2,
  reward: { coins: 100, xp: 200 }
}
```

### Tipo 3: Puntuación Total

```javascript
{
  type: 'score_target',
  description: 'Acumula 200 puntos',
  target: 200,
  difficulty: 3,
  reward: { coins: 125, xp: 250 }
}
```

### Tipo 4: Precisión

```javascript
{
  type: 'accuracy',
  description: 'Mantén 80% de precisión en 10 preguntas',
  target: 0.8,
  difficulty: 3,
  reward: { coins: 150, xp: 300 }
}
```

## 💰 Sistema de Recompensas

### Recompensa Base por Tipo

| Tipo            | Monedas Base | XP Base | Dificultad |
| --------------- | ------------ | ------- | ---------- |
| correct_answers | 50           | 100     | 2          |
| streak          | 75           | 150     | 2          |
| score_target    | 100          | 200     | 3          |
| accuracy        | 150          | 300     | 3          |

### Bonus por Racha

```javascript
const streakBonus = {
    1: 0, // Sin bonus primer día
    2: 10, // 10 monedas extra en día 2
    3: 20, // 20 monedas extra en día 3
    4: 30, // 30 monedas extra en día 4
    5: 50, // 50 monedas extra en día 5
    10: 100, // 100 monedas extra en día 10
    30: 500, // 500 monedas extra en día 30
};

function getStreakBonus(streak) {
    return streakBonus[streak] || streakBonus[Math.min(streak, 30)];
}

// Ejemplo: Desafío día 5 con racha de 5 días
recompensa = {
    coins: 75 + 50, // 125 total
    xp: 150,
    bonus: 50,
};
```

## 🔄 Ciclo Diario

```
Medianoche
  ↓
Sistema detecta nuevo día
  ↓
Verifica si último desafío se completó
  ├─ SI: Suma a racha
  └─ NO: Reinicia racha a 0
  ↓
Genera nuevo desafío
  ├─ Selecciona tipo aleatorio
  ├─ Asigna dificultad basada en nivel usuario
  ├─ Calcula recompensas con bonus de racha
  └─ Guarda en localStorage
  ↓
Muestra desafío diario al usuario
  ↓
Usuario juega y progresa desafío
  ↓
Completa desafío → Obtiene recompensas
  ↓
Guarda estado hasta próximo ciclo
```

## 📍 Ciclo por Hora

```
Hora local del usuario: 00:00:00
  ↓ Se considera día nuevo
  ↓
Carga desafío anterior
  ↓
Verifica si está expirado (>24h)
  ↓ YES
  ↓
Genera nuevo desafío
```

## 💾 Persistencia

```javascript
// Guardar en localStorage
localStorage["mathgame_daily_challenge"] = JSON.stringify({
    id: "2024-02-05-c7a9e...",
    date: "2024-02-05",
    type: "correct_answers",
    target: 10,
    progress: 7,
    completed: false,
    reward: {
        coins: 75,
        xp: 150,
        bonus: 50,
    },
    streak: 5,
    startTime: "2024-02-05T00:00:00Z",
    endTime: "2024-02-06T00:00:00Z",
});

// También guardar historial
localStorage["mathgame_challenge_history"] = JSON.stringify([
    { date: "2024-02-04", completed: true, reward: { coins: 75, xp: 150 } },
    { date: "2024-02-03", completed: true, reward: { coins: 70, xp: 150 } },
    { date: "2024-02-02", completed: false, streak_broken: true },
]);
```

## 🎯 Ejemplo Completo

### Escenario: Usuario Completa Desafío

```javascript
// 1. Usuario carga la app
const challenge = dailyChallengeManager.getDailyChallenge();
// → Desafío: "Responde 10 preguntas correctamente"
// → Progreso: 0/10
// → Recompensa: 75 monedas + 150 XP + 50 bonus (racha día 5)

// 2. Usuario responde pregunta 1 correctamente
gameEngine.checkAnswer(userAnswer); // true
dailyChallengeManager.updateProgress(1);
// → Progreso: 1/10

// 3. Usuario responde preguntas 2-10 correctamente
for (let i = 2; i <= 10; i++) {
    dailyChallengeManager.updateProgress(1);
}
// → Progreso: 10/10

// 4. Sistema detecta desafío completado
const reward = dailyChallengeManager.completeDailyChallenge();
// → {
//     coins: 125,  // 75 + 50 bonus
//     xp: 150,
//     bonus: 50,
//     completed: true
//   }

// 5. Otorga recompensas
userManager.addCoins(125);
userManager.addExperience(150);
achievementManager.checkAchievements({
    dailyChallengeCompleted: true,
});

// 6. Actualiza racha
// → Racha pasa de 4 a 5 días

// 7. Muestra notificación
onDailyChallengeCompleted.notify({
    message: "¡Desafío Diario Completado!",
    reward: reward,
    streak: 5,
});
```

## 🧪 Testing

```javascript
describe("DailyChallengeManager", () => {
    it("should generate daily challenge", () => {
        const challenge = manager.getDailyChallenge();
        expect(challenge).toBeDefined();
        expect(challenge.target).toBeGreaterThan(0);
    });

    it("should update progress", () => {
        manager.updateProgress(1);
        expect(manager.getDailyChallenge().progress).toBe(1);
    });

    it("should complete challenge", () => {
        // Set progress to target
        manager.getDailyChallenge().progress =
            manager.getDailyChallenge().target;

        const reward = manager.completeDailyChallenge();
        expect(reward.coins).toBeGreaterThan(0);
        expect(manager.getDailyChallenge().completed).toBe(true);
    });

    it("should increment streak on completion", () => {
        const streakBefore = manager.getStreak();
        manager.completeDailyChallenge();
        // Simular nuevo día
        manager.generateNewChallenge();
        const streakAfter = manager.getStreak();
        expect(streakAfter).toBe(streakBefore + 1);
    });
});
```

Ver: `tests/unit/DailyChallengeManager.test.js`

## 🎮 Integración con UI

### Mostrar Desafío en UI

```javascript
function renderDailyChallenge() {
    const challenge = dailyChallengeManager.getDailyChallenge();

    const html = `
    <div class="daily-challenge">
      <h3>🎯 Desafío Diario</h3>
      <p>${challenge.description}</p>
      <progress value="${challenge.progress}" 
                max="${challenge.target}"></progress>
      <span>${challenge.progress}/${challenge.target}</span>
      
      <div class="reward">
        <span>💰 ${challenge.reward.coins}</span>
        <span>⭐ ${challenge.reward.xp}</span>
      </div>
      
      ${
          challenge.completed
              ? '<p class="completed">✅ ¡Completado!</p>'
              : "<p>Falta: ${challenge.target - challenge.progress}</p>"
      }
    </div>
  `;

    document.getElementById("challenge-container").innerHTML = html;
}

// Llamar cuando inicia app o cambia desafío
renderDailyChallenge();
```

## 🚀 Mejoras Futuras

1. **Desafío Semanal**: Un desafío más grande por semana
2. **Desafío de Amigo**: Competir con otro usuario
3. **Desafío Personalizado**: Basado en nivel del usuario
4. **Bonificación Hora**: Doblar recompensa en cierta hora
5. **Historial Gráfico**: Mostrar racha en gráfico

## 🔗 Archivos Relacionados

- `GameEngine.js` - Actualiza progreso de desafío
- `UserManager.js` - Otorga recompensas
- `AchievementManager.js` - Desbloquea logro "Daily Challenge"
- `DailyChallengeManager.test.js` - Pruebas unitarias
