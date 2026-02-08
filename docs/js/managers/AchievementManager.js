/**
 * AchievementManager - Sistema de logros y trofeos
 * Gestiona el desbloqueo, verificación y notificación de logros
 */
class AchievementManager {
    constructor(translationManager) {
        this.translationManager = translationManager;
        this.achievements = this.defineAchievements();
        this.pendingNotifications = [];
    }

    /**
     * Define todos los logros del juego
     * @returns {Object} Diccionario de logros
     */
    defineAchievements() {
        return {
            // 🏆 Categoría 1: Progreso y Nivel (El Camino del Héroe)

            // 🔢 Categoría: Cifras y Letras
            exact_count: {
                id: 'exact_count',
                category: 'logic',
                i18nKey: 'exact_count',
                icon: '🎯',
                condition: (stats) => stats.exactSolutions >= 1,
                secret: false
            },
            math_wizard: {
                id: 'math_wizard',
                category: 'mastery',
                i18nKey: 'math_wizard',
                icon: '🧙‍♂️',
                condition: (stats) => stats.numbersGameStreak >= 5,
                secret: false
            },
            full_house: {
                id: 'full_house',
                category: 'logic',
                i18nKey: 'full_house',
                icon: '🃏',
                condition: (stats) => stats.fullHouseSolutions >= 1,
                secret: true
            },

            first_steps: {
                id: 'first_steps',
                category: 'progress',
                i18nKey: 'first_steps',
                icon: '👶',
                condition: (stats) => stats.totalAnswered >= 1,
                secret: false
            },
            elementary_graduate: {
                id: 'elementary_graduate',
                category: 'progress',
                i18nKey: 'elementary_graduate',
                icon: '🎓',
                condition: (stats) => stats.level >= 10,
                secret: false
            },
            lord_of_numbers: {
                id: 'lord_of_numbers',
                category: 'progress',
                i18nKey: 'lord_of_numbers',
                icon: '👑',
                condition: (stats) => stats.level >= 50,
                secret: false
            },
            collector: {
                id: 'collector',
                category: 'progress',
                i18nKey: 'collector',
                icon: '🖼️',
                condition: (stats) => {
                    const availableThemes = ['theme_space', 'theme_jungle', 'theme_underwater', 'theme_forest', 'theme_desert', 'theme_arctic'];
                    return availableThemes.every(theme => (stats.themes || []).includes(theme));
                },
                secret: false,
            },

            // 🧠 Categoría 2: Lógica y Astucia (Los "Sherlock")
            no_fooling_me: {
                id: 'no_fooling_me',
                category: 'logic',
                i18nKey: 'no_fooling_me',
                icon: '🕵️',
                condition: (stats) => stats.logicStreakMax >= 5,
                secret: false
            },
            lateral_thinker: {
                id: 'lateral_thinker',
                category: 'logic',
                i18nKey: 'lateral_thinker',
                icon: '🧩',
                condition: (stats) => stats.advancedProblemsCompleted >= 1,
                secret: false
            },
            lynx_eye: {
                id: 'lynx_eye',
                category: 'logic',
                i18nKey: 'lynx_eye',
                icon: '👁️',
                condition: (stats) => stats.fastestLogicTime > 0 && stats.fastestLogicTime <= 10,
                secret: false
            },
            math_detective: {
                id: 'math_detective',
                category: 'logic',
                i18nKey: 'math_detective',
                icon: '🔍',
                condition: (stats) => stats.equationsCompleted >= 20,
                secret: false
            },

            // ⚡ Categoría 3: Maestría y Precisión (Los "Matemagos")
            fire_streak: {
                id: 'fire_streak',
                category: 'mastery',
                i18nKey: 'fire_streak',
                icon: '🔥',
                condition: (stats) => stats.streakMax >= 10,
                secret: false
            },
            immortal: {
                id: 'immortal',
                category: 'mastery',
                i18nKey: 'immortal',
                icon: '🛡️',
                condition: (stats) => stats.shieldUsedInStreak >= 20,
                secret: false
            },
            light_speed: {
                id: 'light_speed',
                category: 'mastery',
                i18nKey: 'light_speed',
                icon: '⚡',
                condition: (stats) => stats.fastestHardTime > 0 && stats.fastestHardTime <= 3,
                secret: false
            },
            zero_fails: {
                id: 'zero_fails',
                category: 'mastery',
                i18nKey: 'zero_fails',
                icon: '💯',
                condition: (stats) => stats.perfectSessions >= 1,
                secret: false
            },
            calculator_human: {
                id: 'calculator_human',
                category: 'mastery',
                i18nKey: 'calculator_human',
                icon: '🧮',
                condition: (stats) => stats.streakMax >= 50,
                secret: true
            },

            // 💰 Categoría 4: Economía y Estilo (Los "Magnates")
            saver: {
                id: 'saver',
                category: 'economy',
                i18nKey: 'saver',
                icon: '💰',
                condition: (stats) => stats.coins >= 1000,
                secret: false
            },
            vip_customer: {
                id: 'vip_customer',
                category: 'economy',
                i18nKey: 'vip_customer',
                icon: '🛍️',
                condition: (stats) => stats.itemsBought >= 1,
                secret: false
            },
            war_ready: {
                id: 'war_ready',
                category: 'economy',
                i18nKey: 'war_ready',
                icon: '⚔️',
                condition: (stats) => {
                    return stats.potions >= 5 && stats.shields >= 5;
                },
                secret: false
            },
            treasure_hunter: {
                id: 'treasure_hunter',
                category: 'economy',
                i18nKey: 'treasure_hunter',
                icon: '💎',
                condition: (stats) => stats.totalCoinsEarned >= 10000,
                secret: false
            },

            // ⚔️ Categoría 5: Duelos y Social (Los "Gladiadores")
            first_blood: {
                id: 'first_blood',
                category: 'social',
                i18nKey: 'first_blood',
                icon: '⚔️',
                condition: (stats) => stats.duelsWon >= 1,
                secret: false
            },
            unbeatable: {
                id: 'unbeatable',
                category: 'social',
                i18nKey: 'unbeatable',
                icon: '🏆',
                condition: (stats) => stats.duelStreakMax >= 5,
                secret: false
            },
            connected: {
                id: 'connected',
                category: 'social',
                i18nKey: 'connected',
                icon: '🌐',
                condition: (stats) => stats.multiplayerConnections >= 1,
                secret: false
            },

            // 🎯 Logros Secretos
            pythagoras_chosen: {
                id: 'pythagoras_chosen',
                category: 'secret',
                i18nKey: 'pythagoras_chosen',
                icon: '📐',
                condition: (stats) => {
                    // Jugar un lunes a las 8:00 AM
                    const now = new Date();
                    return now.getDay() === 1 && now.getHours() === 8 && stats.mondayMorningPlays >= 1;
                },
                secret: true
            },
            night_owl: {
                id: 'night_owl',
                category: 'secret',
                i18nKey: 'night_owl',
                icon: '🦉',
                condition: (stats) => stats.midnightPlays >= 5,
                secret: true
            },
            persistent: {
                id: 'persistent',
                category: 'secret',
                i18nKey: 'persistent',
                icon: '💪',
                condition: (stats) => stats.consecutiveDays >= 7,
                secret: true
            },
            explorer: {
                id: 'explorer',
                category: 'secret',
                i18nKey: 'explorer',
                icon: '🗺️',
                condition: (stats) => stats.categoriesCompleted >= 5,
                secret: true
            }
        };
    }

    /**
     * Inicializa los logros de un usuario
     * @param {Object} user - Usuario
     */
    initAchievements(user) {
        if (!user.achievements) {
            user.achievements = {};
        }

        const defaultStats = {
            // Progreso
            totalAnswered: 0,
            level: 1,
            themes: [],

            // Lógica
            logicStreakMax: 0,
            advancedProblemsCompleted: 0,
            fastestLogicTime: 0,
            equationsCompleted: 0,

            // Cifras
            exactSolutions: 0,
            numbersGameStreak: 0,
            fullHouseSolutions: 0,

            // Maestría
            streakMax: 0,
            shieldUsedInStreak: 0,
            fastestHardTime: 0,
            perfectSessions: 0,

            // Economía
            coins: 0,
            totalCoinsEarned: 0,
            itemsBought: 0,
            potions: 0,
            shields: 0,
            totalCoinsSpent: 0, // Added missing field

            // Social
            duelsWon: 0,
            duelStreakMax: 0,
            multiplayerConnections: 0,

            // Secretos
            mondayMorningPlays: 0,
            midnightPlays: 0,
            consecutiveDays: 0,
            categoriesCompleted: 0,
            lastPlayDate: null
        };

        if (!user.achievementStats) {
            user.achievementStats = defaultStats;
        } else {
            // Merge defaults for existing users (migration)
            user.achievementStats = { ...defaultStats, ...user.achievementStats };
            // Ensure array fields are arrays (in case of corruption or strict merge issues with null)
            if (!Array.isArray(user.achievementStats.themes)) user.achievementStats.themes = [];
        }

        // Inicializar todos los logros como no conseguidos
        Object.keys(this.achievements).forEach(achievementId => {
            if (user.achievements[achievementId] === undefined) {
                user.achievements[achievementId] = {
                    unlocked: false,
                    unlockedAt: null
                };
            }
        });
    }

    /**
     * Actualiza estadísticas del usuario
     * @param {Object} user - Usuario
     * @param {Object} updates - Actualizaciones de estadísticas
     */
    updateStats(user, updates) {
        if (!user.achievementStats) {
            this.initAchievements(user);
        }

        Object.keys(updates).forEach(key => {
            if (key.endsWith('Max')) {
                // Para valores máximos, solo actualizar si es mayor
                user.achievementStats[key] = Math.max(
                    user.achievementStats[key] || 0,
                    updates[key]
                );
            } else if (key === 'themes' && Array.isArray(updates[key])) {
                // Para temas, unir arrays sin duplicados
                user.achievementStats[key] = [...new Set([
                    ...(user.achievementStats[key] || []),
                    ...updates[key]
                ])];
            } else if (typeof updates[key] === 'number') {
                // Para contadores, incrementar
                user.achievementStats[key] = (user.achievementStats[key] || 0) + updates[key];
            } else {
                // Para otros valores, reemplazar
                user.achievementStats[key] = updates[key];
            }
        });

        // Actualizar nivel si está en updates
        if (updates.level !== undefined) {
            user.achievementStats.level = updates.level;
        }

        // Actualizar monedas si está en updates
        if (updates.coins !== undefined) {
            user.achievementStats.coins = updates.coins;
        }

        // Actualizar inventario
        if (updates.potions !== undefined) {
            user.achievementStats.potions = updates.potions;
        }
        if (updates.shields !== undefined) {
            user.achievementStats.shields = updates.shields;
        }
    }

    /**
     * Verifica y desbloquea logros
     * @param {Object} user - Usuario
     * @returns {Array} Logros desbloqueados
     */
    checkAchievements(user) {
        if (!user.achievements || !user.achievementStats) {
            this.initAchievements(user);
        }

        const unlockedNow = [];

        Object.values(this.achievements).forEach(achievement => {
            const userAchievement = user.achievements[achievement.id];

            // Si ya está desbloqueado, saltar
            if (userAchievement && userAchievement.unlocked) {
                return;
            }

            // Verificar condición
            if (achievement.condition(user.achievementStats)) {
                user.achievements[achievement.id] = {
                    unlocked: true,
                    unlockedAt: new Date().toISOString()
                };
                unlockedNow.push(achievement);
            }
        });

        return unlockedNow;
    }

    /**
     * Obtiene todos los logros de un usuario
     * @param {Object} user - Usuario
     * @param {Boolean} includeSecret - Incluir logros secretos no desbloqueados
     * @returns {Array} Logros con información
     */
    getUserAchievements(user, includeSecret = false) {
        if (!user.achievements) {
            this.initAchievements(user);
        }

        return Object.values(this.achievements).map(achievement => {
            const userAchievement = user.achievements[achievement.id];
            const unlocked = userAchievement ? userAchievement.unlocked : false;

            // Ocultar logros secretos no desbloqueados
            if (achievement.secret && !unlocked && !includeSecret) {
                return null;
            }

            return {
                ...achievement,
                unlocked,
                unlockedAt: userAchievement ? userAchievement.unlockedAt : null,
                name: this.translationManager.t(`achievements_${achievement.i18nKey}_name`),
                description: this.translationManager.t(`achievements_${achievement.i18nKey}_description`)
            };
        }).filter(a => a !== null);
    }

    /**
     * Obtiene el progreso de logros por categoría
     * @param {Object} user - Usuario
     * @returns {Object} Progreso por categoría
     */
    getProgressByCategory(user) {
        if (!user.achievements) {
            this.initAchievements(user);
        }

        const categories = {
            progress: { total: 0, unlocked: 0, name: 'Progreso' },
            logic: { total: 0, unlocked: 0, name: 'Lógica' },
            mastery: { total: 0, unlocked: 0, name: 'Maestría' },
            economy: { total: 0, unlocked: 0, name: 'Economía' },
            social: { total: 0, unlocked: 0, name: 'Social' },
            secret: { total: 0, unlocked: 0, name: 'Secretos' }
        };

        Object.values(this.achievements).forEach(achievement => {
            const category = achievement.category;
            const userAchievement = user.achievements[achievement.id];
            const unlocked = userAchievement ? userAchievement.unlocked : false;

            categories[category].total++;
            if (unlocked) {
                categories[category].unlocked++;
            }
        });

        return categories;
    }

    /**
     * Obtiene el total de logros desbloqueados
     * @param {Object} user - Usuario
     * @returns {Object} Total y desbloqueados
     */
    getTotalProgress(user) {
        if (!user.achievements) {
            this.initAchievements(user);
        }

        const total = Object.keys(this.achievements).length;
        const unlocked = Object.values(user.achievements).filter(a => a.unlocked).length;

        return { total, unlocked, percentage: Math.round((unlocked / total) * 100) };
    }

    /**
     * Muestra notificación de logro
     * @param {Object} achievement - Logro desbloqueado
     */
    async showAchievementNotification(achievement) {
        if (!this.templateManager) {
            this.templateManager = new TemplateManager();
        }

        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';

        notification.innerHTML = await this.templateManager.render('achievement-notification', {
            icon: achievement.icon,
            title_text: this.translationManager.t('achievements_unlocked'),
            name: this.translationManager.t(`achievements_${achievement.i18nKey}_name`),
            description: this.translationManager.t(`achievements_${achievement.i18nKey}_description`)
        });

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Reproducir sonido (si está disponible)
        this.playAchievementSound();

        // Eliminar después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }

    /**
     * Reproduce sonido de logro
     */
    playAchievementSound() {
        // Crear un sonido simple con Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);

            // Segundo tono
            const oscillator2 = audioContext.createOscillator();
            const gainNode2 = audioContext.createGain();
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioContext.destination);

            oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator2.type = 'sine';

            gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);

            oscillator2.start(audioContext.currentTime + 0.1);
            oscillator2.stop(audioContext.currentTime + 0.6);
        } catch (e) {
            console.log('No se pudo reproducir sonido de logro');
        }
    }

    /**
     * Actualiza racha de días consecutivos
     * @param {Object} user - Usuario
     */
    updateConsecutiveDays(user) {
        if (!user.achievementStats) {
            this.initAchievements(user);
        }

        const today = new Date().toDateString();
        const lastPlay = user.achievementStats.lastPlayDate;

        if (!lastPlay) {
            user.achievementStats.consecutiveDays = 1;
        } else {
            const lastDate = new Date(lastPlay);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate.toDateString() === yesterday.toDateString()) {
                user.achievementStats.consecutiveDays++;
            } else if (lastDate.toDateString() !== today) {
                user.achievementStats.consecutiveDays = 1;
            }
        }

        user.achievementStats.lastPlayDate = today;
    }

    /**
     * Registra juego en horario especial
     * @param {Object} user - Usuario
     */
    trackSpecialTime(user) {
        if (!user.achievementStats) {
            this.initAchievements(user);
        }

        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();

        // Medianoche (00:00)
        if (hour === 0) {
            user.achievementStats.midnightPlays = (user.achievementStats.midnightPlays || 0) + 1;
        }

        // Lunes a las 8 AM
        if (day === 1 && hour === 8) {
            user.achievementStats.mondayMorningPlays = (user.achievementStats.mondayMorningPlays || 0) + 1;
        }
    }

    /**
     * Calcula el progreso hacia un logro específico
     * @param {Object} achievement - Logro a verificar
     * @param {Object} user - Usuario
     * @returns {Object} {current, target, percentage}
     */
    getAchievementProgress(achievement, user) {
        if (!user.achievementStats) {
            return { current: 0, target: 1, percentage: 0, hint: '' };
        }

        const stats = user.achievementStats;
        let current = 0;
        let target = 1;
        let hint = '';

        // Analizar logros por ID para calcular progreso
        switch (achievement.id) {
            case 'fire_streak':
                current = stats.streak || 0;
                target = 10;
                hint = current + '/10 acertos seguidos';
                break;
            case 'immortal':
                current = stats.streak || 0;
                target = 20;
                hint = current + '/20 acertos + escudo';
                break;
            case 'speed_of_light':
                current = stats.fastestTime || 0;
                target = 3;
                hint = 'Mejor: ' + current + 's (necesitas <3s)';
                break;
            case 'zero_errors':
                current = stats.accuracyPercentage || 0;
                target = 100;
                hint = current + '% precisión (necesitas 100%)';
                break;
            case 'imbatible':
                current = stats.duelStreakMax || 0;
                target = 5;
                hint = current + '/5 duelos ganados';
                break;
            case 'treasure_hunter':
                current = stats.totalCoinsEarned || 0;
                target = 10000;
                hint = current + '/10000 monedas';
                break;
            case 'collector':
                current = stats.themes ? stats.themes.length : 0;
                target = 6;
                hint = current + '/6 temas';
                break;
            case 'math_detective':
                current = stats.equationsCompleted || 0;
                target = 20;
                hint = current + '/20 ecuaciones';
                break;
            default:
                current = 0;
                target = 1;
                hint = 'Progreso desconocido';
        }

        const percentage = Math.min(100, Math.round((current / target) * 100));
        return { current, target, percentage, hint };
    }

    /**
     * Renderiza los logros del usuario
     * @param {Object} user - Usuario actual
     * @param {DailyChallengeManager} dailyChallengeManager - Manager de desafíos diarios
     */
    async renderAchievements(user, dailyChallengeManager) {
        if (!user) return;

        const content = document.getElementById('achievements-content');
        if (!content) return;

        // Ensure TemplateManager is initialized
        if (!this.templateManager) {
            this.templateManager = new TemplateManager();
        }

        const progress = this.getTotalProgress(user);
        const achievements = this.getUserAchievements(user, false);
        const dailyChallenges = dailyChallengeManager ? dailyChallengeManager.getDailyChallenges(user) : [];

        // 1. Render Summary
        let html = await this.templateManager.render('achievements-summary', {
            summary_title: 'Progreso Total',
            unlocked_count: progress.unlocked,
            unlocked_label: 'Desbloqueados',
            total_count: progress.total,
            total_label: 'Total',
            percentage: progress.percentage,
            completed_label: 'Completado'
        });

        // 2. Render Daily Challenges
        if (dailyChallenges && dailyChallenges.length > 0) {
            let challengesHtml = '';

            for (const challenge of dailyChallenges) {
                const progressPercent = Math.round((challenge.progress / challenge.target) * 100);
                const text = dailyChallengeManager.formatChallengeText(challenge);
                const isClaimable = challenge.completed && !challenge.claimed;

                const buttonLabel = challenge.claimed
                    ? this.translationManager.t('daily_challenge_claimed')
                    : (isClaimable ? this.translationManager.t('daily_challenge_claim') : this.translationManager.t('daily_challenge_progress'));

                challengesHtml += await this.templateManager.render('daily-challenge-card', {
                    completed_class: challenge.completed ? 'completed' : '',
                    name: text.name,
                    description: text.description,
                    reward_text: this.translationManager.t('daily_challenge_reward'),
                    reward_amount: challenge.reward,
                    progress_percent: progressPercent,
                    id: challenge.id,
                    disabled_attr: isClaimable ? '' : 'disabled',
                    button_label: buttonLabel
                });
            }

            html += await this.templateManager.render('daily-challenges-section', {
                title: this.translationManager.t('daily_challenges_title'),
                challenges_html: challengesHtml
            });
        }

        // 3. Render Filters
        html += await this.templateManager.render('achievement-filters', {
            filter_all: 'Todas',
            filter_progress: 'Progreso',
            filter_logic: 'Lógica',
            filter_mastery: 'Maestría',
            filter_economy: 'Economía',
            filter_social: 'Social',
            filter_secret: 'Secretos'
        });

        // Lista de logros
        html += '<div class="achievements-list"></div>'; // Create an empty div for achievements-list

        content.innerHTML = html; // Render everything up to the empty achievements-list div

        // Now get the achievements-list element and populate it using templateManager
        const achievementsListElement = content.querySelector('.achievements-list');

        if (!this.templateManager) {
            this.templateManager = new TemplateManager();
        }

        // Sort achievements (unlocked first) before rendering
        achievements.sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0));

        // Generar HTML de las tarjetas
        for (const achievement of achievements) {
            const progressData = this.getAchievementProgress(achievement, user);
            const userAchievement = user.achievements ? user.achievements[achievement.id] : null;
            const unlocked = userAchievement ? userAchievement.unlocked : false;

            const cardHtml = await this.templateManager.render('achievement-card', {
                unlocked_class: unlocked ? 'unlocked' : 'locked',
                category: achievement.category,
                icon: achievement.icon,
                name: achievement.name,
                description: achievement.description,
                percentage: progressData.percentage,
                hint: unlocked ? '' : progressData.hint, // Only show hint if not unlocked
                status_icon: unlocked ? '✅' : '🔒'
            });

            achievementsListElement.innerHTML += cardHtml;
        }

        // Añadir listeners para filtros
        const filters = content.querySelectorAll('.achievement-filter');
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Actualizar estado activo
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                // Filtrar tarjetas
                const category = filter.dataset.filter;
                const cards = content.querySelectorAll('.achievement-card');

                cards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

}

// Export for testing environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementManager;
}
