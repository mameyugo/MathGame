const UserManager = require('../../docs/js/managers/UserManager');
const QuestionGenerator = require('../../docs/js/managers/QuestionGenerator');

describe('Settings Modal and Hints Logic', () => {
    let userManager;
    let questionGenerator;
    let mockTranslationManager;

    beforeEach(() => {
        // Mock translation manager
        mockTranslationManager = {
            t: jest.fn(key => key)
        };

        // Mock localStorage
        let storage = {};
        global.localStorage = {
            getItem: jest.fn(key => storage[key] || null),
            setItem: jest.fn((key, value) => { storage[key] = value }),
            clear: jest.fn(() => { storage = {} }),
            removeItem: jest.fn(key => { delete storage[key] })
        };

        // Mock TemplateManager (global for child classes)
        global.TemplateManager = jest.fn().mockImplementation(() => ({
            render: jest.fn().mockResolvedValue('<div>Mock User</div>')
        }));

        // Use real DOM elements where possible for test reliability
        document.body.innerHTML = `
            <div id="screen-users" class="screen">
                <div id="user-list"></div>
                <div id="leader-list"></div>
                <div class="intro-text" data-i18n="intro"></div>
            </div>
            <div id="screen-config" class="screen">
                <div id="config-title"></div>
                <input type="checkbox" id="cfg-sum">
                <input type="checkbox" id="cfg-res">
                <input type="checkbox" id="cfg-mul">
                <input type="checkbox" id="cfg-div">
            </div>
            <div id="question-area"></div>
            <div id="equation-area"></div>
            <div id="answers-area"></div>
            <input id="new-user-name" value="">
            <button id="btn-submit-problem"></button>
        `;

        userManager = new UserManager(mockTranslationManager);
        questionGenerator = new QuestionGenerator(userManager, null, jest.fn());
    });

    test('UserManager should initialize hints with default values', () => {
        document.getElementById('new-user-name').value = 'TestUser';
        userManager.createUser();

        const user = userManager.getUsers()['TestUser'];
        expect(user.hintsEnabled).toBe(false);
        expect(user.hintsDelay).toBe(12);
    });

    test('UserManager should save and retrieve hints config', () => {
        userManager.users['Alice'] = { hintsEnabled: false, hintsDelay: 5 };
        userManager.currentUser = 'Alice';

        userManager.setHintsConfig(true, 15);

        const config = userManager.getHintsConfig();
        expect(config.enabled).toBe(true);
        expect(config.delay).toBe(15);
        expect(userManager.users['Alice'].hintsEnabled).toBe(true);
    });

    test('QuestionGenerator should hide equation if hints enabled', () => {
        userManager.users = {
            'Alice': {
                hintsEnabled: true,
                hintsDelay: 10,
                ops: ['+'],
                problemCategories: ['explorador']
            }
        };
        userManager.currentUser = 'Alice';

        const problem = {
            tipoRespuesta: 'numero',
            ecuacion: '5 + 5 = __',
            id: 'p1'
        };

        questionGenerator.renderProblemUI(problem);

        const equationTexts = document.querySelectorAll('.eq-text');
        expect(equationTexts.length).toBeGreaterThan(0);
        expect(equationTexts[0].style.opacity).toBe('0');
    });

    test('QuestionGenerator should NOT hide equation if hints disabled', () => {
        userManager.users = {
            'Alice': {
                hintsEnabled: false,
                hintsDelay: 10,
                ops: ['+'],
                problemCategories: ['explorador']
            }
        };
        userManager.currentUser = 'Alice';

        const problem = {
            tipoRespuesta: 'numero',
            ecuacion: '5 + 5 = __',
            id: 'p1'
        };

        questionGenerator.renderProblemUI(problem);

        const equationTexts = document.querySelectorAll('.eq-text');
        expect(equationTexts.length).toBeGreaterThan(0);
        expect(equationTexts[0].style.opacity).not.toBe('0');
    });
});
