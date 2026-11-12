/**
 * StreakManager - Racha de días seguidos jugando
 *
 * La racha sube un día la primera vez que se juega cada día y vuelve a 1 si
 * se salta un día. Cada día que se juega da un premio que crece con la racha
 * (hasta un tope), para que merezca la pena volver mañana.
 *
 * Se guarda en el propio jugador: user.streak = { count, best, last } con
 * last = 'AAAA-MM-DD' en hora local del dispositivo.
 */
class StreakManager {
    /**
     * @param {Function} now - Devuelve la fecha actual (inyectable para tests)
     */
    constructor(now = () => new Date()) {
        this.now = now;
        this.BONUS_POR_DIA = 10;
        this.TOPE_DIAS = 7;
    }

    /** Fecha local en formato AAAA-MM-DD. */
    static dayKey(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    today() {
        return StreakManager.dayKey(this.now());
    }

    yesterday() {
        const d = this.now();
        // Mediodía para no tropezar con los cambios de hora
        const ayer = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1, 12);
        return StreakManager.dayKey(ayer);
    }

    /**
     * Premio en monedas de un día con esa racha.
     * @param {number} count
     */
    bonusFor(count) {
        return this.BONUS_POR_DIA * Math.min(Math.max(count, 1), this.TOPE_DIAS);
    }

    /**
     * Apunta que el jugador ha jugado hoy.
     * @param {Object} user
     * @returns {{isNew: boolean, count: number, best: number, bonus: number}}
     *          isNew = primera partida del día (se ha dado el premio)
     */
    registerPlay(user) {
        if (!user) return { isNew: false, count: 0, best: 0, bonus: 0 };
        const s = user.streak || { count: 0, best: 0, last: null };
        const hoy = this.today();

        if (s.last === hoy) {
            user.streak = s;
            return { isNew: false, count: s.count, best: s.best, bonus: 0 };
        }

        s.count = s.last === this.yesterday() ? (s.count || 0) + 1 : 1;
        s.best = Math.max(s.best || 0, s.count);
        s.last = hoy;
        user.streak = s;

        const bonus = this.bonusFor(s.count);
        user.totalCoins = (user.totalCoins || 0) + bonus;
        return { isNew: true, count: s.count, best: s.best, bonus };
    }

    /**
     * Estado de la racha para mostrarlo.
     * @param {Object} user
     * @returns {{count: number, best: number, playedToday: boolean, atRisk: boolean, nextBonus: number}}
     *          count = racha vigente (0 si ya se rompió); atRisk = hay racha y hoy aún no se ha jugado
     */
    getStatus(user) {
        const s = (user && user.streak) || { count: 0, best: 0, last: null };
        const hoy = this.today();
        const playedToday = s.last === hoy;
        const vigente = playedToday || s.last === this.yesterday();
        const count = vigente ? (s.count || 0) : 0;
        return {
            count,
            best: s.best || 0,
            playedToday,
            atRisk: !playedToday && count > 0,
            nextBonus: this.bonusFor(count + 1)
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StreakManager;
}
if (typeof window !== 'undefined') {
    window.StreakManager = StreakManager;
}
