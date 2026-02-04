/**
 * DailyChallengeManager - Gestión de desafíos diarios
 * Genera desafíos diarios y gestiona progreso y recompensas
 */
class DailyChallengeManager {
    constructor(translationManager) {
        this.translationManager = translationManager;
        this.challengePool = [
            { id: 'correct_answers', i18nKey: 'daily_challenge_correct', type: 'correct_answer', targets: [10, 20, 30], rewards: [50, 100, 150] },
            { id: 'problems_solved', i18nKey: 'daily_challenge_problems', type: 'problem_solved', targets: [3, 5, 8], rewards: [60, 120, 180] },
            { id: 'items_bought', i18nKey: 'daily_challenge_items', type: 'item_bought', targets: [1, 2, 3], rewards: [40, 80, 120] },
            { id: 'duels_won', i18nKey: 'daily_challenge_duels', type: 'duel_won', targets: [1, 2, 3], rewards: [80, 140, 200] },
            { id: 'coins_earned', i18nKey: 'daily_challenge_coins', type: 'coins_earned', targets: [200, 500, 800], rewards: [50, 120, 200] }
        ];
    }

    getTodayKey() {
        const now = new Date();
        return now.toISOString().slice(0, 10);
    }

    initDailyChallenges(user) {
        if (!user.dailyChallenges || user.dailyChallenges.date !== this.getTodayKey()) {
            user.dailyChallenges = {
                date: this.getTodayKey(),
                challenges: this.generateDailyChallenges()
            };
        }
    }

    generateDailyChallenges() {
        const pool = [...this.challengePool];
        const challenges = [];

        while (challenges.length < 3 && pool.length > 0) {
            const idx = Math.floor(Math.random() * pool.length);
            const base = pool.splice(idx, 1)[0];
            const difficultyIdx = Math.floor(Math.random() * base.targets.length);

            challenges.push({
                id: base.id,
                i18nKey: base.i18nKey,
                type: base.type,
                target: base.targets[difficultyIdx],
                reward: base.rewards[difficultyIdx],
                progress: 0,
                completed: false,
                claimed: false
            });
        }

        return challenges;
    }

    getDailyChallenges(user) {
        this.initDailyChallenges(user);
        return user.dailyChallenges.challenges;
    }

    updateProgress(user, type, amount = 1) {
        this.initDailyChallenges(user);
        const completed = [];

        user.dailyChallenges.challenges.forEach(challenge => {
            if (challenge.type !== type || challenge.completed) return;
            challenge.progress = Math.min(challenge.target, challenge.progress + amount);
            if (challenge.progress >= challenge.target) {
                challenge.completed = true;
                completed.push(challenge);
            }
        });

        return completed;
    }

    claimReward(user, challengeId) {
        this.initDailyChallenges(user);
        const challenge = user.dailyChallenges.challenges.find(c => c.id === challengeId);
        if (!challenge || !challenge.completed || challenge.claimed) return false;

        user.totalCoins = (user.totalCoins || 0) + challenge.reward;
        challenge.claimed = true;
        return true;
    }

    formatChallengeText(challenge) {
        return {
            name: this.translationManager.t(`${challenge.i18nKey}_name`),
            description: this.translationManager.t(`${challenge.i18nKey}_desc`).replace('{target}', challenge.target)
        };
    }
}

// Export for testing environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DailyChallengeManager;
}
