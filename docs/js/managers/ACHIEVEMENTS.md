# 🏆 Sistema de Logros - MathGame

## Descripción General

El sistema de logros de MathGame proporciona gamificación a través de **23 trofeos** distribuidos en **6 categorías**, con notificaciones animadas, sonidos Web Audio API y un panel modal elegante.

## Características

✅ **23 Logros únicos** en 6 categorías
✅ **Notificaciones animadas** con efectos flotantes
✅ **Sonidos personalizados** usando Web Audio API  
✅ **Panel modal** con categorías y progreso
✅ **Tracking en tiempo real** durante el juego
✅ **7 idiomas soportados** (ES/GL/EN/FR/CA/PT/DE)
✅ **Logros secretos** basados en horarios especiales
✅ **Persistencia** en localStorage

## Categorías de Logros

### 1. 📈 Progreso (4 logros)

- **Primeros Pasos**: Resolver tu primera operación
- **Graduado de Primaria**: Alcanzar Nivel 10
- **Señor de las Cifras**: Superar Nivel 50
- **Coleccionista**: Desbloquear todos los temas visuales

### 2. 🧠 Lógica (4 logros)

- **¡A mí no me pillas!**: 5 problemas de lógica seguidos sin fallar
- **Pensador Lateral**: Resolver primer problema Nivel Avanzado
- **Ojo de Lince**: Problema de lógica en <10 segundos
- **Detective Matemático**: 20 ecuaciones de problemas completadas

### 3. 🎯 Maestría (5 logros)

- **Racha de Fuego**: 10 operaciones seguidas sin errores
- **Inmortal**: Escudo en racha de +20 acertos
- **Velocidad de la Luz**: Operación difícil en <3 segundos
- **Cero Fallos**: Sesión de 20 preguntas con 100% precisión
- **Calculadora Humana**: 50 acertos consecutivos (SECRETO)

### 4. 💰 Economía (4 logros)

- **Ahorrador**: Acumular 1,000 monedas sin gastar
- **Cliente VIP**: Primer compra en la tienda
- **Equipado para la Guerra**: 5 pociones + 5 escudos simultáneamente
- **Cazador de Tesouros**: 10,000 monedas totales

### 5. 👥 Social (3 logros)

- **Primer Sangre**: Ganar primer duelo
- **Imbatible**: 5 duelos ganados seguidos
- **Invitación Enviada**: Conectar con otro dispositivo

### 6. 🔐 Secretos (3 logros)

- **El Elegido de Pitágoras**: Jugar lunes 8:00 AM
- **Curuxa Nocturna**: Jugar 5 veces a medianoche
- **Persistente**: Jugar 7 días consecutivos
- **Explorador Completo**: Completar problemas de todas las categorías

## Integración en el GameEngine

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

## API del AchievementManager

### Métodos principales

#### `initAchievements(user)`

Inicializa la estructura de logros en el usuario

```javascript
achievementManager.initAchievements(user);
```

#### `updateStats(user, updates)`

Actualiza estadísticas de logros

```javascript
achievementManager.updateStats(user, {
    streak: 5,
    coins: 150,
    duelsWon: 1,
});
```

#### `checkAchievements(user)`

Verifica y desbloquea nuevos logros

```javascript
const newAchievements = achievementManager.checkAchievements(user);
```

#### `getUserAchievements(user, includeSecret)`

Obtiene todos los logros del usuario

```javascript
const achievements = achievementManager.getUserAchievements(user, true);
```

#### `getProgressByCategory(user)`

Obtiene progreso por categoría

```javascript
const progress = achievementManager.getProgressByCategory(user);
// { progress: { total: 4, unlocked: 2 }, ... }
```

#### `showAchievementNotification(achievement)`

Muestra notificación animada

```javascript
achievementManager.showAchievementNotification(achievement);
```

#### `playAchievementSound()`

Reproduce sonido de logro desbloqueado

```javascript
achievementManager.playAchievementSound();
```

## Estructura de Datos

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

## Sistema de Notificaciones

Las notificaciones aparecen automáticamente cuando:

1. Se desbloquea un logro
2. Se alcanza un hito importante

### Características

- 🎨 Animación flotante desde la derecha
- ✨ Efecto de pulso en el ícono
- 🔊 Sonido Web Audio API personalizado
- ⏱️ Cola con delay de 500ms entre notificaciones
- 🌙 Respetuoso del modo oscuro/claro

## Persistencia

Los logros se guardan automáticamente en:

- **localStorage** bajo la clave `math_users`
- Se actualiza después de cada acción importante
- Sincronizado con el UserManager

## Traducciones

Las claves de traducción siguen el patrón:

```
achievements_{id}_name
achievements_{id}_description
achievements_category_{category}
achievements_title
achievements_unlocked
```

Ejemplo para "first_steps":

- ES: `achievements_first_steps_name` = "Primeros Pasos"
- EN: `achievements_first_steps_name` = "First Steps"
- GL: `achievements_first_steps_name` = "Primeiros Pasos"

## Testing

El sistema incluye tests completos:

- ✅ Unitarios para GameEngine (respuestas, duelos, tiempos)
- ✅ Integración con QuestionGenerator
- ✅ Cobertura de TranslationManager
- ✅ Mock completo en app.test.js

Ejecutar tests:

```bash
npm test
```

## Roadmap Futuro

- 🎮 Integración con leaderboards
- 🏅 Insignias especiales para colecciones
- 🌐 Sincronización multiplataforma
- 📊 Estadísticas avanzadas por logro
- 🎬 Animaciones más complejas

## Contribución

Para agregar nuevos logros:

1. Editar `defineAchievements()` en `AchievementManager.js`
2. Agregar claves de traducción en todos los idiomas
3. Integrar en `checkAchievements()` la lógica de desbloqueo
4. Actualizar tests correspondientes

---

**Última actualización:** 4 de febrero de 2026
**Versión:** 1.0 - Integración completa
**Status:** ✅ Producción
