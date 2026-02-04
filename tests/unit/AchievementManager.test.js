const AchievementManager = require('../../docs/js/managers/AchievementManager');

describe('AchievementManager', () => {
    const mockTranslationManager = {
        t: jest.fn((key) => key)
    };

    test('initAchievements debe inicializar stats y logros', () => {
        const manager = new AchievementManager(mockTranslationManager);
        const user = {};

        manager.initAchievements(user);

        expect(user.achievementStats).toBeDefined();
        expect(user.achievements).toBeDefined();
        expect(Object.keys(user.achievements).length).toBe(Object.keys(manager.achievements).length);
    });

    test('updateStats debe combinar temas sin duplicados', () => {
        const manager = new AchievementManager(mockTranslationManager);
        const user = { achievementStats: { themes: ['theme_space'] } };

        manager.updateStats(user, { themes: ['theme_space', 'theme_jungle'] });

        expect(user.achievementStats.themes.sort()).toEqual(['theme_jungle', 'theme_space'].sort());
    });

    test('checkAchievements debe desbloquear first_steps', () => {
        const manager = new AchievementManager(mockTranslationManager);
        const user = {
            achievementStats: { totalAnswered: 1, level: 1, themes: [] },
            achievements: {}
        };

        manager.initAchievements(user);
        const unlocked = manager.checkAchievements(user);

        const ids = unlocked.map(a => a.id);
        expect(ids).toContain('first_steps');
        expect(user.achievements.first_steps.unlocked).toBe(true);
    });

    test('getProgressByCategory debe contar desbloqueados', () => {
        const manager = new AchievementManager(mockTranslationManager);
        const user = {};

        manager.initAchievements(user);
        user.achievementStats.totalAnswered = 1;
        manager.checkAchievements(user);

        const progress = manager.getProgressByCategory(user);
        expect(progress.progress.unlocked).toBeGreaterThan(0);
        expect(progress.progress.total).toBeGreaterThan(0);
    });

    test('getAchievementProgress devuelve progreso para collector', () => {
        const manager = new AchievementManager(mockTranslationManager);
        const user = { achievementStats: { themes: ['theme_space', 'theme_jungle'] } };

        const achievement = manager.achievements.collector;
        const progress = manager.getAchievementProgress(achievement, user);

        expect(progress.current).toBe(2);
        expect(progress.target).toBe(6);
        expect(progress.percentage).toBeGreaterThan(0);
    });
});
