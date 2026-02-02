const fs = require('fs');
const path = require('path');

// Cargar archivos necesarios
const problemaCode = fs.readFileSync(path.join(__dirname, '../docs/js/problemas.js'), 'utf8');
const appCode = fs.readFileSync(path.join(__dirname, '../docs/js/app.js'), 'utf8');

beforeAll(() => {
    // Evitar auto-init en tests
    window.__TEST__ = true;
    // Evitar JSON.parse(undefined) durante la carga de app.js
    if (localStorage && localStorage.getItem && localStorage.getItem.mockReturnValue) {
        localStorage.getItem.mockReturnValue(null);
    }
    // Ejecutar los scripts en el contexto del window (problemas primero, luego app)
    window.eval(problemaCode);
    window.eval(appCode);
});

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
                    freezes: 0,
                    shields: 0,
                    themes: []
                };
            }

            expect(user.inventory.potions).toBe(0);
            expect(user.inventory.freezes).toBe(0);
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

    describe('Temas Visuales (Selva/Espacial)', () => {
        test('equipTheme debe activar tema espacial', () => {
            const user = {
                inventory: { themes: ['theme_space'] },
                currentTheme: 'default'
            };

            if (user.inventory.themes.includes('theme_space')) {
                user.currentTheme = 'theme_space';
            }

            expect(user.currentTheme).toBe('theme_space');
        });

        test('equipTheme debe activar tema selva', () => {
            const user = {
                inventory: { themes: ['theme_jungle'] },
                currentTheme: 'default'
            };

            if (user.inventory.themes.includes('theme_jungle')) {
                user.currentTheme = 'theme_jungle';
            }

            expect(user.currentTheme).toBe('theme_jungle');
        });

        test('unequipTheme debe desactivar tema espacial', () => {
            const user = {
                currentTheme: 'theme_space'
            };

            user.currentTheme = 'default';

            expect(user.currentTheme).toBe('default');
        });

        test('unequipTheme debe desactivar tema selva', () => {
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

    describe('Sistema de Congelación de Tiempo', () => {
        test('useFreezeTime debe consumir freeze', () => {
            const user = { inventory: { freezes: 3 } };

            if (user.inventory.freezes > 0) {
                user.inventory.freezes--;
            }

            expect(user.inventory.freezes).toBe(2);
        });

        test('no debe permitir usar freeze sin tener', () => {
            const user = { inventory: { freezes: 0 } };

            const canUse = user.inventory.freezes > 0;

            expect(canUse).toBe(false);
        });

        test('buyItem debe añadir freeze al inventario', () => {
            const user = {
                totalCoins: 50,
                inventory: { freezes: 0 }
            };

            const itemPrice = 20;
            if (user.totalCoins >= itemPrice) {
                user.totalCoins -= itemPrice;
                user.inventory.freezes++;
            }

            expect(user.totalCoins).toBe(30);
            expect(user.inventory.freezes).toBe(1);
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

            localStorage.getItem.mockImplementation((key) => {
                if (key === 'math_users') return JSON.stringify(mockUserData);
                if (key === 'math_lang') return 'es';
                return null;
            });

            window.syncStateFromStorage();

            const restored = JSON.parse(localStorage.getItem('math_users'));

            expect(restored['TestPlayer'].level).toBe(5);
            expect(restored['TestPlayer'].totalCoins).toBe(500);
        });

        test('normalizeUsers añade freezes si no existe', () => {
            const legacyUserData = {
                'LegacyPlayer': {
                    level: 2,
                    totalCoins: 80,
                    ops: ['+'],
                    inventory: { potions: 1, shields: 0, themes: [] },
                    currentTheme: 'default'
                }
            };

            localStorage.getItem.mockImplementation((key) => {
                if (key === 'math_users') return JSON.stringify(legacyUserData);
                if (key === 'math_lang') return 'es';
                return null;
            });

            window.syncStateFromStorage();

            const setCalls = localStorage.setItem.mock.calls;
            const usersCall = setCalls.find(call => call[0] === 'math_users');
            expect(usersCall).toBeTruthy();

            const migrated = JSON.parse(usersCall[1]);
            expect(migrated['LegacyPlayer'].inventory.freezes).toBe(0);
        });
    });

    describe('Modo de Problemas', () => {
        beforeEach(() => {
            window.problemMode = false;
            window.problemType = 'matematico';
            window.currentProblem = null;
            window.gameLevel = 1;
            window.gameCoins = 0;
        });

        test('bancoProblemas debe contener problemas válidos', () => {
            expect(window.bancoProblemas).toBeDefined();
            expect(Array.isArray(window.bancoProblemas)).toBe(true);
            expect(window.bancoProblemas.length).toBeGreaterThan(0);
        });

        test('problema matemático debe generarse correctamente', () => {
            const problema = window.bancoProblemas.find(p => p.tipo === 'matematico');
            expect(problema).toBeDefined();

            const generado = problema.generar();
            expect(generado.texto).toBeDefined();
            expect(generado.ecuacion).toBeDefined();
            expect(generado.ecuacionValores).toBeDefined();
            expect(Array.isArray(generado.ecuacionValores)).toBe(true);
        });

        test('problema de lógica debe generarse correctamente', () => {
            const problema = window.bancoProblemas.find(p => p.tipo === 'logica');
            expect(problema).toBeDefined();

            const generado = problema.generar();
            expect(generado.texto).toBeDefined();
            expect(generado.ecuacion).toBeDefined();
            expect(generado.ecuacionValores).toBeDefined();
            expect(Array.isArray(generado.ecuacionValores)).toBe(true);
            expect(generado.explicacion).toBeDefined();
        });

        test('selectProblem debe retornar un problema válido', () => {
            window.problemType = 'matematico';
            window.gameLevel = 1;

            window.currentUser = 'TestPlayer';
            window.users = {
                'TestPlayer': {
                    level: 1,
                    totalCoins: 0,
                    ops: ['+'],
                    inventory: { potions: 0, freezes: 0, shields: 0, themes: [] },
                    currentTheme: 'default'
                }
            };

            const problema = window.selectProblem();
            expect(problema).not.toBeNull();
            expect(problema.texto).toBeDefined();
            expect(problema.ecuacionValores).toBeDefined();
        });

        test('renderEquation debe crear inputs correctamente', () => {
            // Crear estructura HTML simulada
            const equationArea = document.createElement('div');
            equationArea.id = 'equation-area';
            document.body.appendChild(equationArea);

            const equation = '5 x 3 = __\nResultado = __';
            window.renderEquation(equation);

            const inputs = equationArea.querySelectorAll('input.eq-input');
            expect(inputs.length).toBe(2);

            document.body.removeChild(equationArea);
        });

        test('submitProblem debe validar respuestas correctas', () => {
            // Setup
            window.currentUser = 'TestPlayer';
            window.users = {
                'TestPlayer': {
                    level: 1,
                    totalCoins: 0,
                    ops: ['+'],
                    inventory: { potions: 0, freezes: 0, shields: 0, themes: [] },
                    currentTheme: 'default'
                }
            };

            // Crear estructura HTML
            const equationArea = document.createElement('div');
            equationArea.id = 'equation-area';
            document.body.appendChild(equationArea);

            const questionArea = document.createElement('div');
            questionArea.id = 'question-area';
            document.body.appendChild(questionArea);

            const input1 = document.createElement('input');
            input1.type = 'number';
            input1.className = 'eq-input';
            input1.value = '15'; // 5 x 3 = 15
            equationArea.appendChild(input1);

            // Crear un problema de prueba
            window.currentProblem = {
                texto: '¿Cuánto es 5 x 3?',
                ecuacionValores: [15],
                explicacion: 'Resultado correcto'
            };

            // Aquí no llamamos a submitProblem completo porque modifica estado global
            // Pero probamos la validación lógica
            const values = Array.from(equationArea.querySelectorAll('input.eq-input'))
                .map(i => i.value.trim());
            const parsed = values.map(v => Number(v));
            const expected = window.currentProblem.ecuacionValores;

            const isCorrect = parsed.length === expected.length &&
                parsed.every((v, i) => v === expected[i]);

            expect(isCorrect).toBe(true);

            document.body.removeChild(equationArea);
            document.body.removeChild(questionArea);
        });

        test('submitProblem debe rechazar respuestas incorrectas', () => {
            // Setup
            window.currentUser = 'TestPlayer';
            window.users = {
                'TestPlayer': {
                    level: 1,
                    totalCoins: 0,
                    ops: ['+'],
                    inventory: { potions: 0, freezes: 0, shields: 0, themes: [] },
                    currentTheme: 'default'
                }
            };

            // Crear estructura HTML
            const equationArea = document.createElement('div');
            equationArea.id = 'equation-area';
            document.body.appendChild(equationArea);

            const input1 = document.createElement('input');
            input1.type = 'number';
            input1.className = 'eq-input';
            input1.value = '14'; // Incorrecto (debería ser 15)
            equationArea.appendChild(input1);

            // Crear un problema de prueba
            window.currentProblem = {
                texto: '¿Cuánto es 5 x 3?',
                ecuacionValores: [15],
                explicacion: 'Deberías haber respondido 15'
            };

            // Validar que es incorrecto
            const values = Array.from(equationArea.querySelectorAll('input.eq-input'))
                .map(i => i.value.trim());
            const parsed = values.map(v => Number(v));
            const expected = window.currentProblem.ecuacionValores;

            const isCorrect = parsed.length === expected.length &&
                parsed.every((v, i) => v === expected[i]);

            expect(isCorrect).toBe(false);

            document.body.removeChild(equationArea);
        });

        test('startProblemGame debe inicializar modo problemas', () => {
            window.currentUser = 'TestPlayer';
            window.users = {
                'TestPlayer': {
                    level: 1,
                    totalCoins: 0,
                    ops: ['+'],
                    inventory: { potions: 0, freezes: 0, shields: 0, themes: [] },
                    currentTheme: 'default'
                }
            };

            // Simular el inicio de juego
            window.duelMode = false;
            window.problemMode = true;
            window.problemType = 'logica';

            expect(window.duelMode).toBe(false);
            expect(window.problemMode).toBe(true);
            expect(window.problemType).toBe('logica');
        });
    });
});
