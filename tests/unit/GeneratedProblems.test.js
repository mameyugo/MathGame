import { generatedProblems } from '../../docs/js/problems/categories/generated.js';
import generatedTranslations from '../../docs/js/problems/i18n/generated.js';
const QuestionGenerator = require('../../docs/js/managers/QuestionGenerator');

describe('Problemas generados', () => {
    const idiomas = ['es', 'gl', 'ca', 'pt', 'fr', 'en', 'de'];

    test.each(generatedProblems.map(p => [p.id, p]))('%s: respuesta entera y textos completos en todos los idiomas', (id, p) => {
        for (let k = 0; k < 100; k++) {
            const g = p.generar();
            const valores = g.tipoRespuesta === 'numero' ? g.ecuacionValores : [g.respuestaCorrecta];
            valores.filter(v => typeof v === 'number').forEach(v => {
                expect(Number.isInteger(v)).toBe(true);
                expect(v).toBeGreaterThanOrEqual(0);
            });
            if (g.opciones) {
                expect(g.opciones).toContain(g.respuestaCorrecta);
                expect(new Set(g.opciones).size).toBe(g.opciones.length);
            }
            for (const lang of idiomas) {
                const t = generatedTranslations[lang][id];
                expect(t).toBeDefined();
                const texto = t.texto(...g.data);
                expect(texto).not.toMatch(/undefined|NaN/);
                expect(t.explicacion(...g.data)).not.toMatch(/undefined|NaN/);
            }
        }
    });

    test('cada plantilla da enunciados distintos', () => {
        const p = generatedProblems.find(x => x.id === 'g_suma');
        const textos = new Set();
        for (let k = 0; k < 50; k++) textos.add(generatedTranslations.es.g_suma.texto(...p.generar().data));
        expect(textos.size).toBeGreaterThan(40);
    });
});

describe('Historial de problemas vistos', () => {
    let qg;
    beforeEach(() => {
        // setup.js deja localStorage como mock vacío: aquí hace falta que guarde
        const datos = {};
        localStorage.getItem.mockImplementation(k => (k in datos ? datos[k] : null));
        localStorage.setItem.mockImplementation((k, v) => { datos[k] = String(v); });
        qg = new QuestionGenerator({ getCurrentUser: () => ({ name: 'Prueba' }) }, null, () => {});
    });

    test('prefiere los problemas que nunca ha visto', () => {
        const pool = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
        qg.recordProblemSeen('a');
        qg.recordProblemSeen('b');
        qg.recordProblemSeen('c');
        for (let k = 0; k < 20; k++) {
            qg.lastProblemId = null;
            expect(qg.pickLeastRecent(pool).id).toBe('d');
        }
    });

    test('no repite el último aunque sea el único sin ver', () => {
        const pool = [{ id: 'a' }, { id: 'b' }];
        qg.recordProblemSeen('a');
        expect(qg.pickLeastRecent(pool).id).toBe('b');
        qg.recordProblemSeen('b');
        expect(qg.pickLeastRecent(pool).id).toBe('a');
    });

    test('el historial se guarda por jugador y sobrevive a una partida nueva', () => {
        qg.recordProblemSeen('x');
        const otra = new QuestionGenerator({ getCurrentUser: () => ({ name: 'Prueba' }) }, null, () => {});
        expect(otra.loadProblemHistory().x).toBeDefined();
        const ajena = new QuestionGenerator({ getCurrentUser: () => ({ name: 'Otro' }) }, null, () => {});
        expect(ajena.loadProblemHistory().x).toBeUndefined();
    });
});
