# Sistema de Usuarios

## 📍 Ubicación

`docs/js/managers/UserManager.js`

## 🎯 Propósito

Gestionar todos los datos y estadísticas del usuario, incluyendo progresión, monedas, avatares y datos persistentes.

## 🏗️ Estructura de Datos del Usuario

```javascript
{
  id: string,                    // UUID único
  name: string,                  // Nombre del jugador
  level: number,                 // Nivel actual (1-5)
  experience: number,            // XP acumulada
  coins: number,                 // Monedas virtuales
  avatar: string,                // Avatar seleccionado
  createdAt: Date,              // Fecha creación
  lastPlayed: Date,             // Última sesión
  stats: {
    gamesPlayed: number,        // Total de sesiones
    totalCorrectAnswers: number,// Respuestas correctas acumuladas
    totalAnswers: number,       // Total respuestas
    accuracy: number,           // Precisión (0-1)
    totalScore: number          // Puntuación acumulada
  },
  preferences: {
    language: string,           // Idioma (es, en, fr, etc.)
    theme: string,              // Tema visual
    soundEnabled: boolean       // Sonido activado
  },
  achievements: {
    unlockedIds: string[],     // IDs de logros desbloqueados
    progress: {
      [achievementId]: {
        unlocked: boolean,
        unlockedAt: Date,
        progress: number       // 0-100
      }
    }
  },
  inventory: {
    avatars: string[],         // Avatares comprados
    themes: string[],          // Temas comprados
    decorations: string[]      // Decoraciones compradas
  }
}
```

## 🎮 Métodos Principales

### `getUserData() → UserObject`

Obtiene los datos actuales del usuario.

```javascript
const userData = userManager.getUserData();
console.log(userData.level); // 2
console.log(userData.coins); // 150
console.log(userData.accuracy); // 0.85
```

### `createNewUser(name) → string`

Crea nuevo usuario y retorna su ID.

```javascript
const userId = userManager.createNewUser("Juan");
// Genera UUID y guarda en localStorage
```

### `setLevel(level) → void`

Actualiza el nivel del usuario.

```javascript
userManager.setLevel(3);
// Valida que sea 1-5
// Dispara evento de cambio de nivel
```

### `addCoins(amount) → void`

Suma monedas al usuario.

```javascript
userManager.addCoins(50); // Suma 50 monedas
userManager.addCoins(-10); // Resta 10 monedas
// No permite saldo negativo
```

### `addExperience(xp) → void`

Suma experiencia y maneja subidas de nivel.

```javascript
userManager.addExperience(100);
// Si XP >= threshold: sube de nivel automáticamente
// Dispara evento onLevelUp
```

### `updateStats(gameStats) → void`

Actualiza estadísticas después de una sesión.

```javascript
userManager.updateStats({
    gamesPlayed: 1,
    correctAnswers: 8,
    totalAnswers: 10,
    score: 150,
});
// Recalcula accuracy automáticamente
```

### `addAchievement(achievementId) → void`

Registra un logro desbloqueado.

```javascript
userManager.addAchievement("first_victory");
// Guarda fecha de desbloqueo
// Obtiene recompensa de logro (monedas, etc.)
```

### `changeLanguage(languageCode) → void`

Cambia idioma del usuario.

```javascript
userManager.changeLanguage("en"); // Cambia a inglés
userManager.changeLanguage("es"); // Vuelve a español
// Almacena preferencia en localStorage
```

### `purchaseItem(itemId, itemType) → boolean`

Compra un item en la tienda.

```javascript
const success = userManager.purchaseItem("avatar_ninja", "avatar");
// Valida si tiene suficientes monedas
// Deduce monedas
// Añade a inventario
// Retorna true si fue exitoso
```

## 📊 Progresión de Niveles

### Requisitos de XP por Nivel

| Nivel | XP Total | XP por Nivel | Descripción |
| ----- | -------- | ------------ | ----------- |
| 1     | 0        | -            | Inicio      |
| 2     | 500      | 500          | Fundamentos |
| 3     | 1500     | 1000         | Intermedio  |
| 4     | 3000     | 1500         | Avanzado    |
| 5     | 5000     | 2000         | Experto     |

```javascript
// En UserManager
const LEVEL_THRESHOLDS = {
  1: 0,
  2: 500,
  3: 1500,
  4: 3000,
  5: 5000
};

checkLevelUp() {
  const nextLevel = this.currentLevel + 1;
  if (this.experience >= LEVEL_THRESHOLDS[nextLevel]) {
    this.setLevel(nextLevel);
    this.onLevelUp.notify();  // Observer pattern
  }
}
```

## 💰 Sistema de Monedas

### Ganancias de Monedas

| Acción                    | Monedas  | Condición   |
| ------------------------- | -------- | ----------- |
| Respuesta correcta        | 10       | -           |
| Racha 5 correctas         | +15      | Bonus       |
| Desafío diario completado | 50       | -           |
| Logro desbloqueado        | Variable | Según logro |
| Venta de items            | Variable | -           |

### Gasto de Monedas

| Item        | Costo  |
| ----------- | ------ |
| Avatar      | 25-100 |
| Tema visual | 50     |
| Decoración  | 10-30  |

```javascript
// Método de compra seguro
purchaseItem(itemId, itemType) {
  const item = this.itemCatalog[itemType][itemId];

  if (!item) return false;
  if (this.coins < item.cost) return false;
  if (this.inventory[itemType].includes(itemId)) return false;

  this.coins -= item.cost;
  this.inventory[itemType].push(itemId);
  this.saveToLocalStorage();

  return true;
}
```

## 📈 Estadísticas y Análisis

### Métrica: Precisión (Accuracy)

```javascript
accuracy = correctAnswers / totalAnswers;
// Rango: 0-1 (0%-100%)
// Se actualiza después de cada sesión

// Clasificación
- 0.90-1.00: Excelente
- 0.80-0.89: Muy Bien
- 0.70-0.79: Bien
- 0.60-0.69: Aceptable
- < 0.60: Necesita práctica
```

### Progresión Típica

```
Sesión 1: 10 respuestas, 7 correctas, 70% accuracy
Sesión 2: 10 respuestas, 8 correctas, 80% accuracy
Sesión 3: 10 respuestas, 9 correctas, 90% accuracy
Sesión 4: 10 respuestas, 10 correctas, 100% accuracy

Accuracy promedio: 85%
Progresión: ↑ Mejorando
```

## 💾 Persistencia en LocalStorage

### Claves de almacenamiento

```javascript
localStorage["mathgame_user"] = JSON.stringify(userData);
localStorage["mathgame_user_prefs"] = JSON.stringify(preferences);
localStorage["mathgame_user_inventory"] = JSON.stringify(inventory);
localStorage["mathgame_user_stats"] = JSON.stringify(stats);

// Opcionales (para análisis)
localStorage["mathgame_game_sessions"] = JSON.stringify([]);
localStorage["mathgame_achievements_log"] = JSON.stringify([]);
```

### Estrategia de Guardado

```javascript
// Auto-save después de cada cambio
setLevel(level) {
  this.currentLevel = level;
  this.saveToLocalStorage();  // Guardado automático
}

// Guardado masivo
saveToLocalStorage() {
  const data = {
    user: this.getUserData(),
    timestamp: new Date()
  };
  localStorage['mathgame_user'] = JSON.stringify(data);
}

// Carga al iniciar
loadFromLocalStorage() {
  const data = JSON.parse(localStorage['mathgame_user'] || '{}');
  if (data.user) {
    this.applyUserData(data.user);
  }
}
```

## 🔄 Flujo de Actualización

```
GameEngine.endGame()
  ↓
Obtiene estadísticas de sesión
  ↓
userManager.updateStats(stats)
  ├→ Suma correctAnswers
  ├→ Suma totalAnswers
  ├→ Recalcula accuracy
  ├→ Suma experiencia
  ├→ Revisa nivel up
  └→ Guarda en localStorage
  ↓
Actualiza UI con nuevos datos
```

## 🎨 Avatar System

### Avatares Disponibles

```javascript
AVATARS = {
  'avatar_default': {
    name: 'Default',
    image: 'images/avatars/default.png',
    cost: 0,
    unlocked: true
  },
  'avatar_ninja': {
    name: 'Ninja',
    image: 'images/avatars/ninja.png',
    cost: 50,
    unlocked: false
  },
  'avatar_scientist': {
    name: 'Scientist',
    image: 'images/avatars/scientist.png',
    cost: 75,
    unlocked: false
  },
  // ... más avatares
};

setAvatar(avatarId) {
  if (this.inventory.avatars.includes(avatarId)) {
    this.currentAvatar = avatarId;
    this.saveToLocalStorage();
  }
}
```

## 🧪 Testing

```javascript
describe("UserManager", () => {
    it("should create new user", () => {
        const userId = userManager.createNewUser("Test");
        expect(userId).toBeDefined();
    });

    it("should add coins correctly", () => {
        userManager.addCoins(50);
        expect(userManager.coins).toBe(50);
    });

    it("should handle level up", () => {
        userManager.addExperience(500);
        expect(userManager.level).toBe(2);
    });

    it("should not allow negative coins", () => {
        userManager.addCoins(-1000);
        expect(userManager.coins).toBeGreaterThanOrEqual(0);
    });
});
```

Ver: `tests/unit/UserManager.test.js`

## 🔗 Archivos Relacionados

- `GameEngine.js` - Llamar updateStats() después de sesión
- `AchievementManager.js` - Obtener recompensas de logros
- `StoreManager.js` - Datos de items y compras
- `TranslationManager.js` - Cambiar idioma
