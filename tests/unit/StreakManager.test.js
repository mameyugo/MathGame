const StreakManager = require('../../docs/js/managers/StreakManager');

describe('StreakManager', () => {
    let fecha;
    const sm = new StreakManager(() => new Date(fecha));

    test('el primer día empieza la racha y da el premio', () => {
        fecha = '2026-11-10T10:00:00';
        const user = { totalCoins: 0 };
        const r = sm.registerPlay(user);
        expect(r).toMatchObject({ isNew: true, count: 1, bonus: 10 });
        expect(user.totalCoins).toBe(10);
    });

    test('jugar dos veces el mismo día no suma ni premia otra vez', () => {
        fecha = '2026-11-10T10:00:00';
        const user = { totalCoins: 0 };
        sm.registerPlay(user);
        fecha = '2026-11-10T21:00:00';
        expect(sm.registerPlay(user)).toMatchObject({ isNew: false, count: 1, bonus: 0 });
        expect(user.totalCoins).toBe(10);
    });

    test('días seguidos suben la racha y el premio, con tope', () => {
        const user = { totalCoins: 0 };
        for (let d = 1; d <= 9; d++) {
            fecha = `2026-11-${String(d).padStart(2, '0')}T09:00:00`;
            sm.registerPlay(user);
        }
        expect(user.streak.count).toBe(9);
        expect(user.streak.best).toBe(9);
        // 10+20+...+70 y luego 70 dos veces más
        expect(user.totalCoins).toBe(280 + 70 + 70);
    });

    test('saltarse un día vuelve a 1 pero guarda la mejor racha', () => {
        const user = {};
        fecha = '2026-11-01T09:00:00'; sm.registerPlay(user);
        fecha = '2026-11-02T09:00:00'; sm.registerPlay(user);
        fecha = '2026-11-04T09:00:00';
        expect(sm.getStatus(user)).toMatchObject({ count: 0, best: 2, atRisk: false });
        sm.registerPlay(user);
        expect(user.streak).toMatchObject({ count: 1, best: 2 });
    });

    test('el día siguiente sin jugar la racha está en peligro', () => {
        const user = {};
        fecha = '2026-11-01T09:00:00'; sm.registerPlay(user);
        fecha = '2026-11-02T08:00:00';
        expect(sm.getStatus(user)).toMatchObject({ count: 1, playedToday: false, atRisk: true, nextBonus: 20 });
    });

    test('cruza meses y el cambio de hora', () => {
        const user = {};
        fecha = '2026-10-24T23:30:00'; sm.registerPlay(user);
        fecha = '2026-10-25T00:30:00'; sm.registerPlay(user);
        fecha = '2026-10-31T12:00:00'; sm.registerPlay(user);
        fecha = '2026-11-01T12:00:00'; sm.registerPlay(user);
        expect(user.streak.count).toBe(2);
        expect(user.streak.best).toBe(2);
    });
});
