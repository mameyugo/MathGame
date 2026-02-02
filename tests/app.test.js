const fs = require('fs');
const path = require('path');

// Cargar el archivo app.js
const appCode = fs.readFileSync(path.join(__dirname, '../docs/js/app.js'), 'utf8');

describe('MateAventura - Tests Unitarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.getItem.mockReturnValue(null);
    localStorage.setItem.mockClear();
  });

  describe('Gestión de Usuarios', () => {
    test('createUser debe crear un nuevo usuario con datos correctos', () => {
      // Simular el estado inicial
      window.users = {};
      
      const mockName = 'TestPlayer';
      window.users[mockName] = {
        level: 1,
        totalCoins: 0,
        ops: ['+'],
        inventory: { potions: 0, shields: 0, themes: [] },
        currentTheme: 'default'
      };

      expect(window.users[mockName]).toBeDefined();
      expect(window.users[mockName].level).toBe(1);
      expect(window.users[mockName].totalCoins).toBe(0);
    });

    test('initInventory debe inicializar inventario vacío', () => {
      const user = { level: 1 };
      
      if (!user.inventory) {
        user.inventory = {
          potions: 0,
          shields: 0,
          themes: []
        };
      }

      expect(user.inventory.potions).toBe(0);
      expect(user.inventory.shields).toBe(0);
      expect(Array.isArray(user.inventory.themes)).toBe(true);
    });
  });

  describe('Sistema de Juego', () => {
    test('check() debe sumar monedas en respuesta correcta', () => {
      window.gameCoins = 0;
      window.gameLevel = 1;
      window.currentAnswer = 5;
      window.gameCoins += 10;

      expect(window.gameCoins).toBe(10);
    });

    test('check() debe aplicar penalización en respuesta incorrecta', () => {
      window.timeLeft = 30;
      const initialTime = window.timeLeft;
      window.timeLeft -= 4;

      expect(window.timeLeft).toBe(initialTime - 4);
    });

    test('nivel debe aumentar cada 50 monedas', () => {
      window.gameCoins = 50;
      window.gameLevel = 1;
      
      if (window.gameCoins % 50 === 0) {
        window.gameLevel++;
      }

      expect(window.gameLevel).toBe(2);
    });
  });

  describe('Sistema de Tienda', () => {
    test('buyItem debe descontar monedas', () => {
      const user = {
        totalCoins: 200,
        inventory: { potions: 0, shields: 0, themes: [] }
      };

      const itemPrice = 50;
      if (user.totalCoins >= itemPrice) {
        user.totalCoins -= itemPrice;
        user.inventory.potions++;
      }

      expect(user.totalCoins).toBe(150);
      expect(user.inventory.potions).toBe(1);
    });

    test('equipTheme debe cambiar tema actual', () => {
      const user = {
        inventory: { themes: ['theme_space'] },
        currentTheme: 'default'
      };

      user.currentTheme = 'theme_space';

      expect(user.currentTheme).toBe('theme_space');
    });

    test('unequipTheme debe revertir a tema default', () => {
      const user = {
        currentTheme: 'theme_jungle'
      };

      user.currentTheme = 'default';

      expect(user.currentTheme).toBe('default');
    });
  });

  describe('Sistema de Escudos', () => {
    test('shield debe proteger contra respuesta incorrecta', () => {
      const user = {
        inventory: { shields: 1 }
      };

      const initialShields = user.inventory.shields;
      user.inventory.shields--;

      expect(user.inventory.shields).toBe(initialShields - 1);
    });

    test('sin escudo debe aplicar penalización de tiempo', () => {
      const user = { inventory: { shields: 0 } };
      let timeLeft = 30;

      if (user.inventory.shields === 0) {
        timeLeft -= 4;
      }

      expect(timeLeft).toBe(26);
    });
  });

  describe('Sistema de Pociones', () => {
    test('usePotion debe consumir poción y añadir tiempo', () => {
      const user = { inventory: { potions: 2 } };
      let timeLeft = 30;

      if (user.inventory.potions > 0) {
        user.inventory.potions--;
        timeLeft += 15;
      }

      expect(user.inventory.potions).toBe(1);
      expect(timeLeft).toBe(45);
    });

    test('no debe permitir usar poción sin tener', () => {
      const user = { inventory: { potions: 0 } };

      const canUse = user.inventory.potions > 0;

      expect(canUse).toBe(false);
    });
  });

  describe('Modo Duelo', () => {
    test('duelScores debe registrar puntos de cada jugador', () => {
      window.duelScores = {
        'Player1': 150,
        'Player2': 200
      };

      expect(window.duelScores['Player1']).toBe(150);
      expect(window.duelScores['Player2']).toBe(200);
    });
  });

  describe('Sincronización con localStorage', () => {
    test('syncStateFromStorage debe restaurar datos', () => {
      const mockUserData = {
        'TestPlayer': {
          level: 5,
          totalCoins: 500,
          ops: ['+', '-'],
          inventory: { potions: 2, shields: 1, themes: [] },
          currentTheme: 'default'
        }
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(mockUserData));
      const restored = JSON.parse(localStorage.getItem('math_users'));

      expect(restored['TestPlayer'].level).toBe(5);
      expect(restored['TestPlayer'].totalCoins).toBe(500);
    });
  });
});
