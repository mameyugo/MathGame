# Sistema de Logros (Achievements)

## 📍 Ubicación

`docs/js/managers/AchievementManager.js`

## 🎯 Propósito

Sistema de logros desbloqueables que motiva al usuario y rastrea hitos importantes en su progresión.

## 🏆 Estructura de Logro

```javascript
{
  id: string,                  // ID único (ej: "first_victory")
  name: string,               // Nombre del logro
  description: string,        // Descripción
  icon: string,              // URL del icono
  category: string,          // "gameplay", "progression", "special"
  condition: Function,       // Función que evalúa si se desbloquea
  reward: {
    coins: number,           // Monedas obtenidas
    xp: number              // XP obtenida
  },
  difficulty: string,        // "easy", "medium", "hard"
  hidden: boolean           // ¿Es secreto hasta desbloquearse?
}
```

## 🎯 Categorías de Logros

### 1. **Gameplay** - Durante el juego

- Respuesta correcta
- Racha de respuestas correctas
- Completar nivel
- Desafío diario completado

### 2. **Progression** - Progresión general

- Alcanzar nivel 2, 3, 4, 5
- Acumular X respuestas correctas
- Acumular X puntuación
- Días consecutivos jugando

### 3. **Special** - Logros especiales

- Responder con 100% accuracy
- Desbloquear todo
- Logros secretos

## 📋 Logros Estándar

### Gameplay Logros

```javascript
{
  id: 'first_correct',
  name: 'Primer Acierto',
  description: 'Responde una pregunta correctamente',
  condition: (stats) => stats.correctAnswers >= 1,
  reward: { coins: 5, xp: 10 },
  difficulty: 'easy'
},
{
  id: 'five_streak',
  name: 'Racha Dorada',
  description: 'Obtén 5 respuestas correctas seguidas',
  condition: (stats) => stats.currentStreak >= 5,
  reward: { coins: 25, xp: 50 },
  difficulty: 'medium'
},
{
  id: 'daily_challenge',
  name: 'Desafío Diario',
  description: 'Completa el desafío diario',
  condition: (stats) => stats.dailyChallengeCompleted,
  reward: { coins: 50, xp: 100 },
  difficulty: 'medium'
}
```

### Progression Logros

```javascript
{
  id: 'level_2',
  name: 'En Ascenso',
  description: 'Alcanza nivel 2',
  condition: (stats) => stats.level >= 2,
  reward: { coins: 100, xp: 200 },
  difficulty: 'easy'
},
{
  id: 'level_5',
  name: 'Maestro Matemático',
  description: 'Alcanza nivel 5',
  condition: (stats) => stats.level >= 5,
  reward: { coins: 500, xp: 1000 },
  difficulty: 'hard'
},
{
  id: 'hundred_answers',
  name: 'Centenario',
  description: 'Responde 100 preguntas correctamente',
  condition: (stats) => stats.correctAnswers >= 100,
  reward: { coins: 250, xp: 500 },
  difficulty: 'hard'
}
```

### Special Logros

```javascript
{
  id: 'perfect_game',
  name: 'Perfección',
  description: 'Completa una sesión con 100% accuracy',
  condition: (stats) => stats.sessionAccuracy === 1.0,
  reward: { coins: 150, xp: 300 },
  difficulty: 'hard'
},
{
  id: 'speedrunner',
  name: 'Rayo de Velocidad',
  description: 'Completa 10 respuestas en menos de 2 minutos',
  condition: (stats) => stats.fastCompletion,
  reward: { coins: 100, xp: 200 },
  difficulty: 'medium',
  hidden: true  // Secreto
}
```

## 🔄 Métodos Principales

### `checkAchievements(stats) → Achievement[]`

Verifica y retorna logros desbloqueados en esta sesión.

```javascript
const achievementsUnlocked = achievementManager.checkAchievements({
    correctAnswers: 50,
    level: 2,
    sessionAccuracy: 0.95,
});

// Retorna solo logros nuevos desbloqueados
console.log(achievementsUnlocked[0].name); // "Maestro Nivel 2"
```

### `unlockAchievement(achievementId) → Achievement`

Desbloquea un logro específico.

```javascript
const achievement = achievementManager.unlockAchievement("first_correct");
console.log(achievement.reward.coins); // 5
console.log(achievement.reward.xp); // 10
```

### `getAchievementProgress(achievementId) → number`

Obtiene progreso hacia un logro (0-100).

```javascript
const progress = achievementManager.getAchievementProgress("hundred_answers");
// Si usuario ha respondido 70 correctas: 70
// Si usuario ha respondido 100+ correctas: 100
```

### `getUnlockedAchievements() → Achievement[]`

Retorna todos los logros desbloqueados.

```javascript
const unlocked = achievementManager.getUnlockedAchievements();
console.log(unlocked.length); // 5
```

### `getLockedAchievements() → Achievement[]`

Retorna logros no desbloqueados.

```javascript
const locked = achievementManager.getLockedAchievements();
// Útil para mostrar "próximos logros"
```

## 📊 Sistema de Progreso

### Progreso Numérico

Algunos logros muestran progreso:

```javascript
// Usuario ha respondido 70 de 100 correctamente
progress: {
  current: 70,
  target: 100,
  percentage: 70
}

// UI muestra: "Centenario: 70/100 ⬚⬚⬚⬚⬚⬚⬚■■■"
```

### Racha Actual

```javascript
// Sistema mantiene racha de respuestas correctas
currentStreak: 5;

// Si responde mal, se reinicia a 0
// Si llega a 5, desbloquea "Racha Dorada"
```

## 💰 Recompensas

### Recompensa Automática

Al desbloquear un logro:

```javascript
unlockAchievement(achievementId) {
  const achievement = this.achievements[achievementId];

  // Dar recompensas
  userManager.addCoins(achievement.reward.coins);
  userManager.addExperience(achievement.reward.xp);

  // Marcar como desbloqueado
  this.unlockedAchievements.add(achievementId);
  this.unlockTimes[achievementId] = new Date();

  // Guardar
  this.saveToLocalStorage();

  // Notificar UI
  this.onAchievementUnlocked.notify(achievement);
}
```

### Total de Recompensas Posibles

```
Monedas máximas: ~2000 (de todos los logros)
XP máximo: ~4000 (de todos los logros)
```

## 🔔 Sistema de Notificaciones

### Eventos de Logros

```javascript
achievementManager.onAchievementUnlocked.subscribe((achievement) => {
    // Mostrar popup
    // Reproducir sonido
    // Animar UI
    showAchievementNotification(achievement);
});

achievementManager.onMultipleAchievements.subscribe((achievements) => {
    // Si desbloquea múltiples
    // Mostrar "¡Triple Logro!"
    showMultipleAchievementNotification(achievements);
});
```

## 🎯 Ejemplos de Flujo

### Flujo 1: Desbloquear Logro

```
1. Usuario responde pregunta correctamente
   ↓
2. GameEngine.checkAnswer() retorna true
   ↓
3. GameEngine llama: achievementManager.checkAchievements(stats)
   ↓
4. AchievementManager evalúa todas las condiciones
   ↓
5. Identifica "first_correct" como desbloqueado
   ↓
6. Ejecuta unlockAchievement('first_correct')
   ↓
7. Suma 5 monedas y 10 XP al usuario
   ↓
8. Dispara evento onAchievementUnlocked
   ↓
9. UI muestra notificación
```

### Flujo 2: Racha de Respuestas

```
Usuario responde 5 correctas seguidas:

Respuesta 1 correcta → streak = 1
Respuesta 2 correcta → streak = 2
Respuesta 3 correcta → streak = 3
Respuesta 4 correcta → streak = 4
Respuesta 5 correcta → streak = 5
  ↓
  Dispara: checkAchievements()
  ↓
  Detecta: five_streak = true
  ↓
  Desbloquea logro + muestra notificación

Usuario responde mal → streak = 0 (se reinicia)
```

## 📈 Estadísticas de Logros

```javascript
getStatistics() {
  return {
    totalAchievements: 25,
    unlockedCount: 12,
    lockedCount: 13,
    completionPercentage: 48,  // 12/25
    totalRewardsEarned: {
      coins: 750,
      xp: 1500
    }
  };
}
```

## 💾 Persistencia

```javascript
// Guardar en localStorage
localStorage["mathgame_achievements"] = JSON.stringify({
    unlocked: ["first_correct", "level_2", "five_streak"],
    progress: {
        hundred_answers: 70,
        perfect_game: false,
    },
    unlockTimes: {
        first_correct: "2024-01-15T10:30:00Z",
    },
});
```

## 🧪 Testing

```javascript
describe("AchievementManager", () => {
    it("should unlock achievement on condition met", () => {
        manager.checkAchievements({ correctAnswers: 1 });
        expect(manager.getUnlockedAchievements()).toContain(
            expect.objectContaining({ id: "first_correct" }),
        );
    });

    it("should award coins and xp", () => {
        manager.unlockAchievement("first_correct");
        expect(userManager.coins).toBeGreaterThan(0);
    });

    it("should not unlock twice", () => {
        manager.unlockAchievement("first_correct");
        manager.unlockAchievement("first_correct");
        const count = manager
            .getUnlockedAchievements()
            .filter((a) => a.id === "first_correct").length;
        expect(count).toBe(1);
    });
});
```

## 📋 Logros Implementados (23 Total en 6 Categorías)

### 1. 📈 Progreso (4 logros)
- **first_steps**: Resolver tu primera operación
- **graduated_primary**: Alcanzar Nivel 10
- **master_numbers**: Superar Nivel 50
- **collector**: Desbloquear todos los temas visuales

### 2. 🧠 Lógica (4 logros)
- **logic_streak**: 5 problemas de lógica seguidos sin fallar
- **lateral_thinker**: Resolver primer problema Nivel Avanzado
- **quick_eye**: Problema de lógica en <10 segundos
- **math_detective**: 20 ecuaciones de problemas completadas

### 3. 🎯 Maestría (5 logros)
- **fire_streak**: 10 operaciones seguidas sin errores
- **immortal**: Escudo en racha de +20 acertos
- **speed_of_light**: Operación difícil en <3 segundos
- **zero_failures**: Sesión de 20 preguntas con 100% precisión
- **human_calculator**: 50 acertos consecutivos (SECRETO)

### 4. 💰 Economía (4 logros)
- **saver**: Acumular 1,000 monedas sin gastar
- **vip_customer**: Primer compra en la tienda
- **fully_equipped**: 5 pociones + 5 escudos simultáneamente
- **treasure_hunter**: 10,000 monedas totales

### 5. 👥 Social (3 logros)
- **first_blood**: Ganar primer duelo
- **unbeatable**: 5 duelos ganados seguidos
- **invite_sent**: Conectar con otro dispositivo

### 6. 🔐 Secretos (3 logros)
- **pythagoras_chosen**: Jugar lunes 8:00 AM
- **night_owl**: Jugar 5 veces a medianoche
- **persistent**: Jugar 7 días consecutivos
- **complete_explorer**: Completar problemas de todas las categorías

## 🔄 Integración en GameEngine

### Respuestas Correctas
```javascript
// En check() cuando respuesta es correcta
user.achievementStats.streak++;
user.achievementStats.correctAnswers++;
user.achievementStats.coins = this.gameCoins;

const newAchievements = this.achievementManager.checkAchievements(user);
```

### Problemas de Lógica
```javascript
// En submitProblem() cuando problema correcto
user.achievementStats.problemsSolved++;
const newAchievements = achievementManager.checkAchievements(user);
```

### Compras en la Tienda
```javascript
// En buyItem() después de compra exitosa
user.achievementStats.itemsBought++;
user.achievementStats.totalCoinsSpent++;
```

### Duelos Ganados
```javascript
// En endGameSession() cuando duelo termina
user.achievementStats.duelsWon++;
user.achievementStats.duelStreakMax++;
```

### Tiempos Especiales
```javascript
// En startTimer()
if (hour === 0) {
    // Medianoche
    user.achievementStats.midnightPlays++;
}
if (day === 1 && hour === 8) {
    // Lunes 8 AM
    user.achievementStats.mondayMorningPlays++;
}
```

## 💾 Estructura de Datos Completa

### user.achievements
```javascript
{
    first_steps: { unlocked: true, unlockedAt: 1707000000000 },
    fire_streak: { unlocked: false, unlockedAt: null },
    // ... más logros
}
```

### user.achievementStats
```javascript
{
    // Progreso
    level: 15,
    streakMax: 25,

    // Lógica
    logicProblems: 8,
    logicStreakMax: 5,

    // Economía
    coins: 5000,
    itemsBought: 3,
    potions: 2,
    shields: 3,

    // Social
    duelsWon: 3,
    duelStreakMax: 2,

    // Secretos
    midnightPlays: 2,
    mondayMorningPlays: 1,
    consecutiveDays: 5
}
```

## 📢 Sistema de Notificaciones

### Características
- 🎨 Animación flotante desde la derecha
- ✨ Efecto de pulso en el ícono
- 🔊 Sonido Web Audio API personalizado
- ⏱️ Cola con delay de 500ms entre notificaciones
- 🌙 Respetuoso del modo oscuro/claro

### Métodos
```javascript
showAchievementNotification(achievement)  // Muestra notificación animada
playAchievementSound()                    // Reproduce sonido
```

## 🚀 Roadmap Futuro

### Nivel 1: Experiencia del Usuario (3-4 horas)
- Panel de Progreso en Tiempo Real (barras de progreso por categoría)
- Categorías Colapsables en Modal
- Notificaciones Mejoradas (progreso en notificaciones, sonidos distintos)

### Nivel 2: Gamificación Avanzada (4-6 horas)
- Desafíos Diarios de Logros (3 nuevos cada día a las 6 AM)
- Logros Dinámicos por Temporada (5 nuevos cada mes)
- Hitos de Racha Mejorados (notificaciones especiales en hitos)

### Nivel 3: Social & Competencia (5-7 horas)
- Leaderboard de Logros (Top 10 por categoría)
- Insignias de Méritos (Medallas especiales)
- Desafíos Multijugador (Racha más larga, primero en desbloquear)

### Nivel 4: Analytics & Insights (3-5 horas)
- Panel de Estadísticas de Logros (gráficos de progreso)
- Análisis Personalizados (sugerencias, comparativas)
- Exportar Logros (PDF, Imagen compartible, JSON)

**Recomendación Inmediata**: Panel de Progreso en Tiempo Real (2-3 horas, alto impacto visual)

## 🔗 Archivos Relacionados

- `GameEngine.js` - Integración con sistema de logros
- `UserManager.js` - Gestión de recompensas y estadísticas
- `tests/unit/AchievementManager.test.js` - Pruebas unitarias
