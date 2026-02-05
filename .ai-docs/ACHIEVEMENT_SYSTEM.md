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
  sessionAccuracy: 0.95
});

// Retorna solo logros nuevos desbloqueados
console.log(achievementsUnlocked[0].name);  // "Maestro Nivel 2"
```

### `unlockAchievement(achievementId) → Achievement`
Desbloquea un logro específico.

```javascript
const achievement = achievementManager.unlockAchievement('first_correct');
console.log(achievement.reward.coins);  // 5
console.log(achievement.reward.xp);     // 10
```

### `getAchievementProgress(achievementId) → number`
Obtiene progreso hacia un logro (0-100).

```javascript
const progress = achievementManager.getAchievementProgress('hundred_answers');
// Si usuario ha respondido 70 correctas: 70
// Si usuario ha respondido 100+ correctas: 100
```

### `getUnlockedAchievements() → Achievement[]`
Retorna todos los logros desbloqueados.

```javascript
const unlocked = achievementManager.getUnlockedAchievements();
console.log(unlocked.length);  // 5
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
currentStreak: 5

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
localStorage['mathgame_achievements'] = JSON.stringify({
  unlocked: ['first_correct', 'level_2', 'five_streak'],
  progress: {
    'hundred_answers': 70,
    'perfect_game': false
  },
  unlockTimes: {
    'first_correct': '2024-01-15T10:30:00Z'
  }
});
```

## 🧪 Testing

```javascript
describe('AchievementManager', () => {
  it('should unlock achievement on condition met', () => {
    manager.checkAchievements({ correctAnswers: 1 });
    expect(manager.getUnlockedAchievements()).toContain(
      expect.objectContaining({ id: 'first_correct' })
    );
  });
  
  it('should award coins and xp', () => {
    manager.unlockAchievement('first_correct');
    expect(userManager.coins).toBeGreaterThan(0);
  });
  
  it('should not unlock twice', () => {
    manager.unlockAchievement('first_correct');
    manager.unlockAchievement('first_correct');
    const count = manager.getUnlockedAchievements()
      .filter(a => a.id === 'first_correct').length;
    expect(count).toBe(1);
  });
});
```

Ver: `tests/unit/AchievementManager.test.js`

## 📖 Documentación Detallada

Ver: `docs/js/managers/ACHIEVEMENTS.md` para lista completa de logros.

## 🔗 Archivos Relacionados

- `GameEngine.js` - Llama checkAchievements() después de sesión
- `UserManager.js` - Gestiona recompensas
- `ACHIEVEMENTS.md` - Lista completa de logros
