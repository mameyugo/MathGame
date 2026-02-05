# Sistema de Tienda (Store)

## 📍 Ubicación
`docs/js/managers/StoreManager.js`

## 🎯 Propósito
Gestionar catálogo de items, procesar compras y mantener inventario del usuario con monedas virtuales.

## 🏪 Estructura de Item

```javascript
{
  id: string,                    // ID único (ej: "avatar_ninja")
  name: string,                  // Nombre mostrable
  description: string,           // Descripción
  type: string,                  // "avatar", "theme", "decoration"
  cost: number,                  // Precio en monedas
  icon: string,                  // URL de imagen/icono
  rarity: string,               // "common", "rare", "epic", "legendary"
  unlocked: boolean,            // ¿Disponible para compra?
  requiredLevel: number,        // Nivel mínimo para comprar
  tags: string[]                // Categorías ["festivo", "especial"]
}
```

## 📂 Categorías de Items

### 1. **Avatares** (type: "avatar")
Personajes que representan al jugador.

```javascript
{
  id: 'avatar_default',
  name: 'Default',
  type: 'avatar',
  cost: 0,
  rarity: 'common',
  requiredLevel: 1,
  unlocked: true
},
{
  id: 'avatar_ninja',
  name: 'Ninja',
  type: 'avatar',
  cost: 50,
  rarity: 'rare',
  requiredLevel: 2,
  unlocked: false
},
{
  id: 'avatar_scientist',
  name: 'Scientist',
  type: 'avatar',
  cost: 75,
  rarity: 'epic',
  requiredLevel: 3,
  unlocked: false
}
// ... más avatares
```

### 2. **Temas Visuales** (type: "theme")
Temas de color y diseño para la interfaz.

```javascript
{
  id: 'theme_dark',
  name: 'Oscuro',
  type: 'theme',
  cost: 50,
  rarity: 'common',
  requiredLevel: 1
},
{
  id: 'theme_neon',
  name: 'Neon',
  type: 'theme',
  cost: 100,
  rarity: 'epic',
  requiredLevel: 4
}
// ... más temas
```

### 3. **Decoraciones** (type: "decoration")
Accesorios para personalizar el perfil.

```javascript
{
  id: 'deco_badges',
  name: 'Insignias Doradas',
  type: 'decoration',
  cost: 25,
  rarity: 'rare',
  requiredLevel: 2
},
{
  id: 'deco_effects',
  name: 'Efectos Especiales',
  type: 'decoration',
  cost: 150,
  rarity: 'legendary',
  requiredLevel: 5
}
```

## 🔄 Métodos Principales

### `getCatalog() → Item[]`
Obtiene todo el catálogo disponible.

```javascript
const catalog = storeManager.getCatalog();
console.log(catalog.length);  // 25 items totales

// Filtrar solo avatares
const avatars = catalog.filter(item => item.type === 'avatar');
```

### `getItemsByType(type) → Item[]`
Obtiene items de un tipo específico.

```javascript
const avatars = storeManager.getItemsByType('avatar');
const themes = storeManager.getItemsByType('theme');
const decorations = storeManager.getItemsByType('decoration');
```

### `getAvailableItems(userLevel) → Item[]`
Obtiene items disponibles para comprar según nivel del usuario.

```javascript
const availableItems = storeManager.getAvailableItems(3);
// Retorna solo items con requiredLevel <= 3
```

### `purchaseItem(userId, itemId) → boolean`
Realiza compra de un item.

```javascript
const success = storeManager.purchaseItem('user_123', 'avatar_ninja');

if (success) {
  console.log('¡Compra exitosa!');
  // Item añadido al inventario
  // Monedas deducidas
} else {
  console.log('Compra fallida');
  // Razones posibles:
  // - Monedas insuficientes
  // - Ya posee el item
  // - No cumple nivel requerido
}
```

### `getUserInventory(userId) → Inventory`
Obtiene inventario del usuario.

```javascript
const inventory = storeManager.getUserInventory('user_123');
console.log(inventory.avatars);      // ["avatar_default", "avatar_ninja"]
console.log(inventory.themes);       // ["theme_dark"]
console.log(inventory.decorations);  // ["deco_badges"]
```

### `getItemDetails(itemId) → Item`
Obtiene detalles completos de un item.

```javascript
const item = storeManager.getItemDetails('avatar_ninja');
console.log(item.name);              // "Ninja"
console.log(item.cost);              // 50
console.log(item.rarity);            // "rare"
console.log(item.description);       // "Ninja silencioso..."
```

### `setActiveItem(userId, itemId, type) → void`
Activa un item para el usuario (ej: cambiar avatar).

```javascript
storeManager.setActiveItem('user_123', 'avatar_ninja', 'avatar');
// Usuario ahora usa avatar ninja

storeManager.setActiveItem('user_123', 'theme_neon', 'theme');
// Usuario ahora usa tema neon
```

## 💰 Validación de Compra

```javascript
purchaseItem(userId, itemId) {
  const user = userManager.getUserData(userId);
  const item = this.getItemDetails(itemId);
  const inventory = this.getUserInventory(userId);
  
  // Validación 1: Item existe
  if (!item) {
    return {
      success: false,
      reason: 'ITEM_NOT_FOUND'
    };
  }
  
  // Validación 2: Nivel suficiente
  if (user.level < item.requiredLevel) {
    return {
      success: false,
      reason: 'LEVEL_TOO_LOW',
      required: item.requiredLevel
    };
  }
  
  // Validación 3: No ya posee
  if (inventory[item.type + 's'].includes(itemId)) {
    return {
      success: false,
      reason: 'ALREADY_OWNED'
    };
  }
  
  // Validación 4: Monedas suficientes
  if (user.coins < item.cost) {
    return {
      success: false,
      reason: 'INSUFFICIENT_COINS',
      have: user.coins,
      need: item.cost
    };
  }
  
  // Realizar compra
  userManager.addCoins(-item.cost);
  inventory[item.type + 's'].push(itemId);
  this.saveInventory(userId, inventory);
  
  return {
    success: true,
    coinsRemaining: user.coins - item.cost,
    message: 'Item comprado exitosamente'
  };
}
```

## 📊 Rareza y Precio

| Rareza | Multiplicador Precio | Color | Símbolo |
|--------|---------------------|-------|---------|
| Common | 1x | Gris | ▢ |
| Rare | 1.5x | Azul | ◆ |
| Epic | 2.5x | Púrpura | ✦ |
| Legendary | 5x+ | Dorado | ★ |

### Ejemplo de Precios

```javascript
AVATARES_PRECIOS = {
  common: 25,
  rare: 50,
  epic: 75,
  legendary: 150
};

TEMAS_PRECIOS = {
  common: 50,
  rare: 75,
  epic: 100,
  legendary: 250
};

DECORACIONES_PRECIOS = {
  common: 10,
  rare: 25,
  epic: 50,
  legendary: 100
};
```

## 📈 Catálogo Inicial

### Avatares (8 items)
```
Nivel 1: Default (gratis)
Nivel 2: Ninja (50), Wizard (50)
Nivel 3: Scientist (75), Astronaut (75)
Nivel 4: Detective (100), Chef (100)
Nivel 5: Superhero (150)
```

### Temas (5 items)
```
Nivel 1: Light (predeterminado)
Nivel 2: Dark (50)
Nivel 3: Ocean (75)
Nivel 4: Forest (75)
Nivel 5: Neon (100)
```

### Decoraciones (5 items)
```
Nivel 1: Basic Badge (10)
Nivel 2: Golden Badge (25), Stars (25)
Nivel 3: Particles (50)
Nivel 4: Special Effects (100)
```

## 💾 Persistencia

```javascript
// Guardar inventario
localStorage['mathgame_inventory'] = JSON.stringify({
  avatars: ['avatar_default', 'avatar_ninja'],
  themes: ['theme_light', 'theme_dark'],
  decorations: ['deco_badge_golden']
});

// Guardar items activos
localStorage['mathgame_active_items'] = JSON.stringify({
  avatar: 'avatar_ninja',
  theme: 'theme_dark',
  decoration: 'deco_badge_golden'
});

// Histórico de compras (opcional)
localStorage['mathgame_purchase_history'] = JSON.stringify([
  {
    itemId: 'avatar_ninja',
    timestamp: '2024-02-05T15:30:00Z',
    cost: 50,
    level: 2
  }
]);
```

## 🎮 Integración con UI

### Mostrar Tienda

```javascript
function renderStore() {
  const user = userManager.getUserData();
  const availableItems = storeManager.getAvailableItems(user.level);
  
  const html = `
    <div class="store">
      <h2>🏪 Tienda</h2>
      <p>Monedas: ${user.coins}</p>
      
      <div class="store-items">
        ${availableItems.map(item => `
          <div class="item ${item.rarity}">
            <img src="${item.icon}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">💰 ${item.cost}</span>
            <button onclick="buyItem('${item.id}')">
              ${isOwned(item.id) ? 'Usar' : 'Comprar'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.getElementById('store').innerHTML = html;
}

function buyItem(itemId) {
  const result = storeManager.purchaseItem(userManager.getCurrentUserId(), itemId);
  
  if (result.success) {
    showNotification('¡Compra exitosa!');
    userManager.updateUI();
    renderStore();
  } else {
    showError(`Error: ${result.reason}`);
  }
}
```

## 🧪 Testing

```javascript
describe('StoreManager', () => {
  it('should get catalog', () => {
    const catalog = manager.getCatalog();
    expect(catalog.length).toBeGreaterThan(0);
  });
  
  it('should filter items by type', () => {
    const avatars = manager.getItemsByType('avatar');
    expect(avatars.every(i => i.type === 'avatar')).toBe(true);
  });
  
  it('should not allow purchase without coins', () => {
    const result = manager.purchaseItem('user', 'expensive_item');
    if (user.coins < item.cost) {
      expect(result.success).toBe(false);
      expect(result.reason).toBe('INSUFFICIENT_COINS');
    }
  });
  
  it('should not allow purchase below level', () => {
    const result = manager.purchaseItem('user_level1', 'level5_item');
    expect(result.success).toBe(false);
  });
});
```

Ver: `tests/unit/StoreManager.test.js`

## 🚀 Mejoras Futuras

1. **Bundle**: Paquetes de items con descuento
2. **Limited Time**: Items disponibles por tiempo limitado
3. **Combos**: Conjuntos de items combinables
4. **Venta**: Revender items por monedas (50% del precio)
5. **Wishlist**: Marcar items deseados
6. **Recomendaciones**: Sugerir items basado en gustos

## 🔗 Archivos Relacionados

- `UserManager.js` - Gestiona monedas e inventario
- `AchievementManager.js` - Desbloquear logros de compra
- `StoreManager.test.js` - Pruebas unitarias
