const DailyChallengeManager = require('../../docs/js/managers/DailyChallengeManager.js');

describe('DailyChallengeManager', () => {
    const mockTranslationManager = {
        t: jest.fn((key) => key)
    };

    test('initDailyChallenges debe crear 3 desafíos', () => {
        const manager = new DailyChallengeManager(mockTranslationManager);
        const user = { totalCoins: 0 };

        manager.initDailyChallenges(user);
        expect(user.dailyChallenges).toBeDefined();
        expect(user.dailyChallenges.challenges.length).toBe(3);
    });

    test('updateProgress debe completar desafíos', () => {
        const manager = new DailyChallengeManager(mockTranslationManager);
        const user = { totalCoins: 0 };
        manager.initDailyChallenges(user);

        const challenge = user.dailyChallenges.challenges[0];
        const completed = manager.updateProgress(user, challenge.type, challenge.target);

        expect(completed.length).toBeGreaterThanOrEqual(1);
        expect(challenge.completed).toBe(true);
        expect(challenge.progress).toBe(challenge.target);
    });

    test('claimReward debe otorgar monedas', () => {
        const manager = new DailyChallengeManager(mockTranslationManager);
        const user = { totalCoins: 0 };
        manager.initDailyChallenges(user);

        const challenge = user.dailyChallenges.challenges[0];
        manager.updateProgress(user, challenge.type, challenge.target);

        const claimed = manager.claimReward(user, challenge.id);
        expect(claimed).toBe(true);
        expect(user.totalCoins).toBeGreaterThan(0);
        expect(challenge.claimed).toBe(true);
    });

    test('claimReward no debe permitir reclamar sin completar', () => {
        const manager = new DailyChallengeManager(mockTranslationManager);
        const user = { totalCoins: 0 };
        manager.initDailyChallenges(user);

        const challenge = user.dailyChallenges.challenges[0];
        const claimed = manager.claimReward(user, challenge.id);

        expect(claimed).toBe(false);
        expect(user.totalCoins).toBe(0);
        expect(challenge.claimed).toBe(false);
    });

    test('updateProgress debe ignorar tipo no coincidente', () => {
        const manager = new DailyChallengeManager(mockTranslationManager);
        const user = { totalCoins: 0 };
        manager.initDailyChallenges(user);

        const before = user.dailyChallenges.challenges.map(c => c.progress);
        manager.updateProgress(user, 'unknown_type', 5);
        const after = user.dailyChallenges.challenges.map(c => c.progress);

        expect(after).toEqual(before);
    });
});
