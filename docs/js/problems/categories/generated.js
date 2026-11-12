/**
 * Problemas generados: plantillas con nombres, objetos y números al azar.
 *
 * Cada plantilla produce cientos de enunciados distintos. Los textos están en
 * i18n/generated.js; aquí solo se eligen los datos (data) y la respuesta.
 * Las plantillas llevan `variable: true`: el selector las deja repetir dentro
 * de una partida, porque el enunciado cambia cada vez.
 */

export const NOMBRES = [
    'Ana', 'Leo', 'Sara', 'Hugo', 'Nora', 'Pablo', 'Lucía', 'Martín',
    'Emma', 'Daniel', 'Julia', 'Iker', 'Noa', 'Mateo', 'Vera', 'Bruno',
    'Alba', 'Marco', 'Olivia', 'Adrián', 'Irene', 'Samuel', 'Carla', 'Óscar'
];

/** Número de objetos contables de cada idioma (i18n/generated.js, OBJETOS). */
export const NUM_OBJETOS = 16;

const azar = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];

/** Dos o más nombres distintos. */
export function nombres(n = 2) {
    const copia = [...NOMBRES];
    const salida = [];
    for (let i = 0; i < n; i++) {
        salida.push(copia.splice(Math.floor(Math.random() * copia.length), 1)[0]);
    }
    return salida;
}

const objeto = () => azar(0, NUM_OBJETOS - 1);

/** Cuatro opciones numéricas distintas y no negativas, con la correcta entre ellas, barajadas. */
export function opcionesNumericas(correcta, distractores) {
    const set = new Set([correcta]);
    for (const d of distractores) {
        if (set.size >= 4) break;
        if (Number.isFinite(d) && d >= 0 && d !== correcta) set.add(d);
    }
    let salto = 1;
    while (set.size < 4) {
        set.add(correcta + salto);
        salto = salto > 0 ? -salto : -salto + 1;
        if (correcta + salto < 0) salto = -salto + 1;
    }
    return [...set].sort(() => Math.random() - 0.5);
}

function numerico(respuesta, ecuacion, data) {
    return {
        texto: '',
        respuestaCorrecta: respuesta,
        ecuacion,
        ecuacionValores: [respuesta],
        tipoRespuesta: 'numero',
        data
    };
}

export const generatedProblems = [
    // ---------- Matemáticos ----------
    {
        id: 'g_suma', tipo: 'matematico', nivelMin: 1, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a, b] = nombres(2);
            const x = azar(2, 9), y = azar(2, 9);
            return numerico(x + y, `${x} + ${y} = __`, [a, b, objeto(), x, y]);
        }
    },
    {
        id: 'g_resta', tipo: 'matematico', nivelMin: 1, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a, b] = nombres(2);
            const x = azar(6, 15), y = azar(1, x - 2);
            return numerico(x - y, `${x} - ${y} = __`, [a, b, objeto(), x, y]);
        }
    },
    {
        id: 'g_falta', tipo: 'matematico', nivelMin: 1, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            const meta = azar(8, 20), tiene = azar(2, meta - 2);
            return numerico(meta - tiene, `${tiene} + __ = ${meta}`, [a, objeto(), meta, tiene]);
        }
    },
    {
        id: 'g_grupos', tipo: 'matematico', nivelMin: 2, categorias: ['explorador'], variable: true,
        generar: () => {
            const n = azar(2, 9), k = azar(2, 10);
            return numerico(n * k, `${n} × ${k} = __`, [objeto(), n, k, azar(0, 2)]);
        }
    },
    {
        id: 'g_reparto', tipo: 'matematico', nivelMin: 2, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            const n = azar(2, 8), cada = azar(2, 9);
            return numerico(cada, `${n * cada} ÷ ${n} = __`, [a, objeto(), n * cada, n]);
        }
    },
    {
        id: 'g_diferencia', tipo: 'matematico', nivelMin: 2, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a, b] = nombres(2);
            const y = azar(5, 40), x = y + azar(2, 25);
            return numerico(x - y, `${x} - ${y} = __`, [a, b, objeto(), x, y]);
        }
    },
    {
        id: 'g_compra', tipo: 'matematico', nivelMin: 2, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            const n = azar(2, 8), p = azar(2, 9);
            return numerico(n * p, `${n} × ${p} = __`, [a, objeto(), n, p]);
        }
    },
    {
        id: 'g_patas', tipo: 'matematico', nivelMin: 2, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const g = azar(2, 9), v = azar(2, 6);
            return numerico(g * 2 + v * 4, `${g} × 2 + ${v} × 4 = __`, [g, v]);
        }
    },
    {
        id: 'g_vuelta', tipo: 'matematico', nivelMin: 3, categorias: ['explorador'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            const n = azar(2, 6), p = azar(2, 8);
            const billete = [20, 50].find(b => b > n * p) || 50;
            return numerico(billete - n * p, `${billete} - ${n} × ${p} = __`, [a, objeto(), n, p, billete]);
        }
    },
    {
        id: 'g_dos_pasos', tipo: 'matematico', nivelMin: 3, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const [a, b] = nombres(2);
            const tiene = azar(3, 15), n = azar(2, 5), k = azar(3, 8);
            const regala = azar(2, tiene + n * k - 2);
            const total = tiene + n * k - regala;
            return numerico(total, `${tiene} + ${n} × ${k} - ${regala} = __`, [a, b, objeto(), tiene, n, k, regala]);
        }
    },
    {
        id: 'g_perimetro', tipo: 'matematico', nivelMin: 3, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const largo = azar(5, 20), ancho = azar(2, largo - 1);
            return numerico(2 * (largo + ancho), `2 × (${largo} + ${ancho}) = __`, [largo, ancho]);
        }
    },
    {
        id: 'g_velocidad', tipo: 'matematico', nivelMin: 3, categorias: ['cientifico'], variable: true,
        generar: () => {
            // Vehículo según la velocidad: 0 bici, 1 barco, 2 coche, 3 tren
            const v = elegir([12, 15, 20, 30, 40, 45, 60, 80, 90, 120]), h = azar(2, 5);
            const vehiculo = v <= 20 ? 0 : v <= 45 ? 1 : v <= 90 ? 2 : 3;
            return numerico(v * h, `${v} × ${h} = __`, [vehiculo, v, h]);
        }
    },
    {
        id: 'g_area', tipo: 'matematico', nivelMin: 4, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const a = azar(3, 12), b = azar(3, 12);
            return numerico(a * b, `${a} × ${b} = __`, [a, b]);
        }
    },
    {
        id: 'g_fraccion', tipo: 'matematico', nivelMin: 4, categorias: ['cientifico'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            const d = elegir([2, 3, 4, 6]), trozos = d * azar(2, 4);
            return numerico(trozos / d, `${trozos} ÷ ${d} = __`, [a, trozos, d]);
        }
    },
    {
        id: 'g_porcentaje', tipo: 'matematico', nivelMin: 5, categorias: ['cientifico'], variable: true,
        generar: () => {
            const p = elegir([10, 20, 25, 50]);
            const precio = 20 * azar(2, 15);
            const final = precio - precio * p / 100;
            return numerico(final, `${precio} - ${precio} × ${p} ÷ 100 = __`, [azar(0, 3), precio, p]);
        }
    },
    {
        id: 'g_edades', tipo: 'matematico', nivelMin: 5, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            // Pariente: 0 madre, 1 padre (25-40 años más), 2 abuela, 3 abuelo (50-65 más)
            const edad = azar(6, 12), pariente = azar(0, 3);
            const mayor = edad + (pariente < 2 ? azar(25, 40) : azar(50, 65));
            const futura = edad + azar(3, 15);
            return numerico(mayor + (futura - edad), `${mayor} + (${futura} - ${edad}) = __`, [a, pariente, edad, mayor, futura]);
        }
    },
    {
        id: 'g_media', tipo: 'matematico', nivelMin: 5, categorias: ['cientifico'], variable: true,
        generar: () => {
            const [a] = nombres(1);
            const media = azar(4, 9);
            const x = Math.min(10, media + azar(0, 2));
            const y = Math.max(0, media - azar(0, 2));
            const z = 3 * media - x - y;
            if (z < 0 || z > 10) return numerico(media, `(${media} + ${media} + ${media}) ÷ 3 = __`, [a, media, media, media]);
            return numerico(media, `(${x} + ${y} + ${z}) ÷ 3 = __`, [a, x, y, z]);
        }
    },

    // ---------- Lógica ----------
    {
        id: 'g_serie_suma', tipo: 'logica', nivelMin: 1, categorias: ['explorador'], variable: true,
        generar: () => {
            const inicio = azar(1, 10), paso = azar(1, 5);
            const serie = [0, 1, 2, 3].map(i => inicio + i * paso);
            const r = inicio + 4 * paso;
            return numerico(r, `${serie.join(', ')}, __`, [serie.join(', ')]);
        }
    },
    {
        id: 'g_serie_resta', tipo: 'logica', nivelMin: 2, categorias: ['explorador'], variable: true,
        generar: () => {
            const paso = azar(2, 9), inicio = paso * 5 + azar(0, 20);
            const serie = [0, 1, 2, 3].map(i => inicio - i * paso);
            return numerico(inicio - 4 * paso, `${serie.join(', ')}, __`, [serie.join(', ')]);
        }
    },
    {
        id: 'g_carrera', tipo: 'logica', nivelMin: 2, categorias: ['explorador'], variable: true,
        generar: () => {
            const orden = nombres(3);
            const pregunta = azar(0, 1); // 0 = último, 1 = primero
            const correcta = pregunta === 0 ? orden[2] : orden[0];
            return {
                texto: '',
                respuestaCorrecta: correcta,
                tipoRespuesta: 'opcion_multiple',
                opciones: [...orden].sort(() => Math.random() - 0.5),
                data: [orden[0], orden[1], orden[2], pregunta]
            };
        }
    },
    {
        id: 'g_postes', tipo: 'logica', nivelMin: 3, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const d = elegir([2, 3, 4, 5, 10]), tramos = azar(3, 10);
            const largo = d * tramos;
            return {
                texto: '',
                respuestaCorrecta: tramos + 1,
                tipoRespuesta: 'opcion_multiple',
                opciones: opcionesNumericas(tramos + 1, [tramos, tramos - 1, tramos + 2]),
                data: [largo, d]
            };
        }
    },
    {
        id: 'g_serie_doble', tipo: 'logica', nivelMin: 3, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const inicio = azar(1, 5), factor = elegir([2, 2, 3]);
            const serie = [0, 1, 2, 3].map(i => inicio * Math.pow(factor, i));
            return numerico(inicio * Math.pow(factor, 4), `${serie.join(', ')}, __`, [serie.join(', ')]);
        }
    },
    {
        id: 'g_dia_semana', tipo: 'logica', nivelMin: 3, categorias: ['cientifico'], variable: true,
        generar: () => {
            const hoy = azar(0, 6), n = azar(2, 30);
            const correcta = (hoy + n) % 7;
            const opciones = [correcta];
            while (opciones.length < 4) {
                const d = azar(0, 6);
                if (!opciones.includes(d)) opciones.push(d);
            }
            return {
                texto: '',
                respuestaCorrecta: correcta,
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                opciones: opciones.sort(() => Math.random() - 0.5),
                data: [hoy, n, correcta]
            };
        }
    },
    {
        id: 'g_reloj', tipo: 'logica', nivelMin: 3, categorias: ['cientifico'], variable: true,
        generar: () => {
            const h = azar(9, 19), m = elegir([0, 15, 30, 45]), dura = elegir([45, 60, 75, 90, 105, 120, 135]);
            const fin = h * 60 + m + dura;
            const hf = Math.floor(fin / 60) % 24, mf = fin % 60;
            const mm = String(m).padStart(2, '0');
            return {
                texto: '',
                respuestaCorrecta: hf * 100 + mf,
                ecuacion: '__ : __',
                ecuacionValores: [hf, mf],
                tipoRespuesta: 'numero',
                data: [`${h}:${mm}`, dura, `${hf}:${String(mf).padStart(2, '0')}`]
            };
        }
    },
    {
        id: 'g_carrera4', tipo: 'logica', nivelMin: 4, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const orden = nombres(4);
            // Pistas desordenadas: A antes que B, C después de B, D después de C
            return {
                texto: '',
                respuestaCorrecta: orden[3],
                tipoRespuesta: 'opcion_multiple',
                opciones: [...orden].sort(() => Math.random() - 0.5),
                data: [orden[0], orden[1], orden[2], orden[3]]
            };
        }
    },
    {
        id: 'g_cortes', tipo: 'logica', nivelMin: 4, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const trozos = azar(3, 9), min = azar(2, 6);
            const r = (trozos - 1) * min;
            return {
                texto: '',
                respuestaCorrecta: r,
                tipoRespuesta: 'opcion_multiple',
                opciones: opcionesNumericas(r, [trozos * min, r + min, r - min]),
                data: [trozos, min]
            };
        }
    },
    {
        id: 'g_calcetines', tipo: 'logica', nivelMin: 4, categorias: ['cientifico'], variable: true,
        generar: () => {
            const colores = azar(2, 6), cada = azar(colores + 2, 12);
            const r = colores + 1;
            return {
                texto: '',
                respuestaCorrecta: r,
                tipoRespuesta: 'opcion_multiple',
                opciones: opcionesNumericas(r, [2, colores, cada + 1, colores * 2]),
                data: [colores, cada]
            };
        }
    },
    {
        id: 'g_saludos', tipo: 'logica', nivelMin: 4, categorias: ['cientifico'], variable: true,
        generar: () => {
            const n = azar(3, 9);
            const r = n * (n - 1) / 2;
            return {
                texto: '',
                respuestaCorrecta: r,
                tipoRespuesta: 'opcion_multiple',
                opciones: opcionesNumericas(r, [n * (n - 1), n * n, n]),
                data: [n]
            };
        }
    },
    {
        id: 'g_serie_cuadrados', tipo: 'logica', nivelMin: 5, categorias: ['cientifico'], variable: true,
        generar: () => {
            const inicio = azar(1, 6);
            const serie = [0, 1, 2, 3].map(i => (inicio + i) * (inicio + i));
            return numerico((inicio + 4) * (inicio + 4), `${serie.join(', ')}, __`, [serie.join(', ')]);
        }
    },
    {
        id: 'g_cabezas_patas', tipo: 'logica', nivelMin: 5, categorias: ['cientifico'], variable: true,
        generar: () => {
            const gallinas = azar(2, 12), conejos = azar(2, 10);
            const cabezas = gallinas + conejos, patas = gallinas * 2 + conejos * 4;
            return numerico(conejos, `(${patas} - ${cabezas} × 2) ÷ 2 = __`, [cabezas, patas]);
        }
    },
    {
        id: 'g_serie_fibo', tipo: 'logica', nivelMin: 5, categorias: ['arquitecto'], variable: true,
        generar: () => {
            const a = azar(1, 5), b = azar(a, a + 5);
            const s = [a, b];
            while (s.length < 6) s.push(s[s.length - 1] + s[s.length - 2]);
            return numerico(s[5] + s[4], `${s.join(', ')}, __`, [s.join(', ')]);
        }
    }
];

export default generatedProblems;
