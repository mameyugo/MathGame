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
                    return availableThemes.every(theme => stats.themes.includes(theme));
                },
                secret: false
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
        if (!user.achievementStats) {
            user.achievementStats = {
                // Progreso
                totalAnswered: 0,
                level: 1,
                themes: [],

                // Lógica
                logicStreakMax: 0,
                advancedProblemsCompleted: 0,
                fastestLogicTime: 0,
                equationsCompleted: 0,

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
                name: this.translationManager.translate(`achievements_${achievement.i18nKey}_name`),
                description: this.translationManager.translate(`achievements_${achievement.i18nKey}_description`)
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
    showAchievementNotification(achievement) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <div class="achievement-title">🏆 ${this.translationManager.translate('achievements.unlocked')}</div>
                <div class="achievement-name">${this.translationManager.translate(`achievements.${achievement.i18nKey}.name`)}</div>
                <div class="achievement-description">${this.translationManager.translate(`achievements.${achievement.i18nKey}.description`)}</div>
            </div>
        `;

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
}
