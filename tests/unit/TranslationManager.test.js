const TranslationManager = require('../../docs/js/managers/TranslationManager');

describe('TranslationManager', () => {
    let manager;

    beforeEach(() => {
        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(() => 'es'),
            setItem: jest.fn()
        };

        // Mock document
        global.document = {
            getElementById: jest.fn(),
            querySelectorAll: jest.fn(() => [])
        };

        // Mock fetch (default OK to avoid console noise)
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: async () => ({})
        });

        manager = new TranslationManager();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Constructor', () => {
        test('should initialize with empty translations', () => {
            expect(manager.translations).toEqual({});
        });

        test('should set default language to "es"', () => {
            expect(manager.currentLanguage).toBe('es');
        });

        test('should load language from localStorage if available', () => {
            global.localStorage.getItem = jest.fn(() => 'gl');
            const newManager = new TranslationManager();
            expect(newManager.currentLanguage).toBe('gl');
        });
    });

    describe('loadTranslations', () => {
        test('should load translations successfully', async () => {
            const mockTranslations = { app_title: 'Test Title' };
            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => mockTranslations
            });

            await manager.loadTranslations('es');

            expect(fetch).toHaveBeenCalledWith('./lang/es.json');
            expect(manager.translations.es).toEqual(mockTranslations);
        });

        test('should handle fetch errors and fallback to Spanish', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
            global.fetch
                .mockRejectedValueOnce(new Error('Network error'))
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ app_title: 'Título' })
                });

            await manager.loadTranslations('gl');

            expect(fetch).toHaveBeenCalledTimes(2);
            expect(fetch).toHaveBeenNthCalledWith(1, './lang/gl.json');
            expect(fetch).toHaveBeenNthCalledWith(2, './lang/es.json');

            consoleErrorSpy.mockRestore();
        });

        test('should not recurse if Spanish fails', async () => {
            global.fetch.mockRejectedValue(new Error('Network error'));
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            await manager.loadTranslations('es');

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });
    });

    describe('t (translate)', () => {
        beforeEach(() => {
            manager.translations = {
                es: { hello: 'Hola', goodbye: 'Adiós' },
                gl: { hello: 'Ola' }
            };
            manager.currentLanguage = 'es';
        });

        test('should return translation for current language', () => {
            expect(manager.t('hello')).toBe('Hola');
        });

        test('should fallback to Spanish if key not found in current language', () => {
            manager.currentLanguage = 'gl';
            expect(manager.t('goodbye')).toBe('Adiós');
        });

        test('should return key itself if not found in any language', () => {
            expect(manager.t('unknown_key')).toBe('unknown_key');
        });

        test('should handle undefined translations gracefully', () => {
            manager.translations = {};
            expect(manager.t('hello')).toBe('hello');
        });
    });

    describe('changeLanguage', () => {
        beforeEach(() => {
            manager.translations = {
                es: { test: 'Prueba' }
            };

            const mockElement = {
                style: {},
                setAttribute: jest.fn()
            };

            global.document.getElementById = jest.fn(() => mockElement);
            manager.updateTranslatedElements = jest.fn();
        });

        test('should change current language', async () => {
            await manager.changeLanguage('gl');
            expect(manager.currentLanguage).toBe('gl');
        });

        test('should save language to localStorage', async () => {
            await manager.changeLanguage('gl');
            expect(localStorage.setItem).toHaveBeenCalledWith('math_lang', 'gl');
        });

        test('should update html lang attribute', async () => {
            const mockRoot = { setAttribute: jest.fn() };
            global.document.getElementById = jest.fn((id) =>
                id === 'html-root' ? mockRoot : { style: {} }
            );

            await manager.changeLanguage('gl');
            expect(mockRoot.setAttribute).toHaveBeenCalledWith('lang', 'gl');
        });

        test('should load translations if not already loaded', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: async () => ({ test: 'Proba' })
            });

            await manager.changeLanguage('gl');

            expect(fetch).toHaveBeenCalledWith('./lang/gl.json');
            expect(manager.translations.gl).toBeDefined();
        });

        test('should not reload if language already loaded', async () => {
            manager.translations.gl = { test: 'Proba' };

            await manager.changeLanguage('gl');

            expect(fetch).not.toHaveBeenCalled();
        });

        test('should update UI elements after changing language', async () => {
            await manager.changeLanguage('es');
            expect(manager.updateTranslatedElements).toHaveBeenCalled();
        });
    });

    describe('updateTranslatedElements', () => {
        test('should update elements with data-i18n attribute', () => {
            const mockElements = [
                { getAttribute: jest.fn(() => 'hello'), innerHTML: '' },
                { getAttribute: jest.fn(() => 'goodbye'), innerHTML: '' }
            ];

            global.document.querySelectorAll = jest.fn((selector) => {
                if (selector === '[data-i18n]') return mockElements;
                return [];
            });

            manager.translations = { es: { hello: 'Hola', goodbye: 'Adiós' } };
            manager.currentLanguage = 'es';

            manager.updateTranslatedElements();

            expect(mockElements[0].innerHTML).toBe('Hola');
            expect(mockElements[1].innerHTML).toBe('Adiós');
        });

        test('should update placeholders with data-i18n-placeholder attribute', () => {
            const mockInputs = [
                { getAttribute: jest.fn(() => 'input_name'), placeholder: '' }
            ];

            global.document.querySelectorAll = jest.fn((selector) => {
                if (selector === '[data-i18n-placeholder]') return mockInputs;
                return [];
            });

            manager.translations = { es: { input_name: 'Nombre...' } };
            manager.currentLanguage = 'es';

            manager.updateTranslatedElements();

            expect(mockInputs[0].placeholder).toBe('Nombre...');
        });
    });

    describe('Utility methods', () => {
        test('getCurrentLanguage should return current language', () => {
            manager.currentLanguage = 'gl';
            expect(manager.getCurrentLanguage()).toBe('gl');
        });

        test('isLanguageLoaded should return true if language is loaded', () => {
            manager.translations.es = { test: 'value' };
            expect(manager.isLanguageLoaded('es')).toBe(true);
        });

        test('isLanguageLoaded should return false if language is not loaded', () => {
            expect(manager.isLanguageLoaded('fr')).toBe(false);
        });
    });
});
