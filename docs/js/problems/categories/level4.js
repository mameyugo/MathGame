/**
 * Nivel 4: Avanzado (edades 13-15)
 * Problemas con lógica profunda y matemática intermedia
 */

export const level4Problems = [
    {
        id: "patas_mesa",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['arquitecto'],
        i18n: "patas_mesa",
        generar: () => {
            const mesas = Math.floor(Math.random() * 3) + 2;
            const patas_mesa = 4;
            const sillas = Math.floor(Math.random() * 3) + 1;
            const patas_silla = 3;
            const perros = Math.floor(Math.random() * 3) + 1;
            const patas_perro = 4;
            const total = (mesas * patas_mesa) + (sillas * patas_silla) + (perros * patas_perro);
            const trampa_opcion = (mesas * patas_mesa) + (sillas * patas_silla);

            return {
                texto: `En una habitación hay ${mesas} mesas de ${patas_mesa} patas cada una y ${sillas} sillas de ${patas_silla} patas. ¿Cuántas patas hay en total si entran ${perros} perros?`,
                respuestaCorrecta: total,
                explicacion: `¡Trampa! Muchos olvidan contar las patas de los perros. Mesas: ${mesas}×${patas_mesa}=${mesas * patas_mesa}, Sillas: ${sillas}×${patas_silla}=${sillas * patas_silla}, Perros: ${perros}×${patas_perro}=${perros * patas_perro}. Total: ${total}`,
                ecuacion: `${mesas * patas_mesa} + ${sillas * patas_silla} + ${perros * patas_perro} = __`,
                ecuacionValores: [total],
                opciones: [total, trampa_opcion, total - (perros * 2), total + 2]
            };
        }
    },
    {
        id: "huerto_manzanas",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['explorador', 'arquitecto'],
        i18n: "huerto_manzanas",
        generar: () => {
            const F = Math.floor(Math.random() * 7) + 3;
            const A = Math.floor(Math.random() * 7) + 4;
            const respuesta = F * A;

            return {
                texto: `Don Tomás ha plantado un huerto con ${F} filas de manzanos. Si en cada fila hay ${A} árboles, ¿cuántos árboles tiene en total?`,
                respuestaCorrecta: respuesta,
                explicacion: `Tienes que multiplicar el número de filas por los árboles en cada fila: ${F} × ${A} = ${respuesta}.`,
                ecuacion: `${F} × ${A} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, F + A, (F + A) * 2, F * (A - 1)]
            };
        }
    },
    {
        id: "entrenamiento_batman",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['arquitecto'],
        i18n: "entrenamiento_batman",
        generar: () => {
            const horas = Math.floor(Math.random() * 4) + 2;
            const respuesta = horas * 60;

            return {
                texto: `Batman ha entrenado durante ${horas} horas hoy. ¿Cuántos minutos ha estado entrenando en total?`,
                respuestaCorrecta: respuesta,
                explicacion: `Para convertir horas a minutos multiplicamos por 60: ${horas} × 60 = ${respuesta} minutos.`,
                ecuacion: `${horas} × 60 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, horas * 30, horas * 100, respuesta + 60]
            };
        }
    },
    {
        id: "reloj_espejo",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "reloj_espejo",
        generar: () => {
            const hora_espejo = 9;
            const respuesta = 12 - hora_espejo;

            return {
                texto: `Miras un reloj de agujas a través de un espejo. Las agujas marcan las ${hora_espejo} en punto. ¿Qué hora es en realidad?`,
                respuestaCorrecta: respuesta,
                explicacion: `El espejo invierte horizontalmente. La posición del 9 se convierte en la del 3. La hora real es las ${respuesta} en punto.`,
                ecuacion: `12 - ${hora_espejo} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, hora_espejo, 6, 12]
            };
        }
    },
    {
        id: "arca_moises",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "arca_moises",
        generar: () => {
            const respuesta = 0;

            return {
                texto: `¿Cuántos animales de cada especie llevó Moisés en su arca?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Cero! Fue Noé quien construyó el arca, no Moisés. Muchas personas responden "parejas" sin notar el error en el nombre.`,
                ecuacion: `Animales en el arca de Moisés = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 2, 7, 1]
            };
        }
    },
    {
        id: "cesta_huevos",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "cesta_huevos",
        generar: () => {
            const respuesta = 1;

            return {
                texto: `En una cesta hay 6 huevos. 6 personas compran un huevo cada una y, al final, queda un huevo en la cesta. ¿Cuántos huevos quedan en la cesta?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Uno! La última persona se llevó la cesta con el huevo dentro. No es que desapareciese un huevo, sino que viajó dentro de su contenedor.`,
                ecuacion: `Huevos en cesta = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 0, 2, 6]
            };
        }
    },
    {
        id: "hermanos_juan",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador', 'arquitecto'],
        i18n: "hermanos_juan",
        generar: () => {
            return {
                texto: `Juan tiene 3 hermanas. Cada una de sus hermanas tiene un solo hermano varón. ¿Cuántos hermanos varones tiene Juan en total?`,
                respuestaCorrecta: 0,
                explicacion: `¡Truco activado! El cerebro quiere sumar, pero la respuesta es 0. El "único hermano varón" de todas sus hermanas es Juan mismo. Juan no tiene más hermanos varones.`,
                ecuacion: `Hermanos de Juan = __`,
                ecuacionValores: [0],
                opciones: [0, 3, 1, 4]
            };
        }
    },
    {
        id: "avion_frontera",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "avion_frontera",
        generar: () => {
            const paises = [
                { pais1: "España", pais2: "Portugal" },
                { pais1: "Francia", pais2: "Italia" },
                { pais1: "Brasil", pais2: "Argentina" },
                { pais1: "USA", pais2: "Canada" },
                { pais1: "Mexico", pais2: "Guatemala" }
            ];
            const loc = paises[Math.floor(Math.random() * paises.length)];

            return {
                texto: `Un avión se estrella justo en la frontera entre ${loc.pais1} y ${loc.pais2}. ¿En qué país entierran a los supervivientes?`,
                respuestaCorrecta: 0,
                explicacion: `¡Trampa del lenguaje! ¡A los supervivientes NO se les entierra! El problema menciona "frontera" para distraerte, pero la clave es que son supervivientes.`,
                ecuacion: `Entierros = __`,
                ecuacionValores: [0],
                opciones: [0, 1, 2, -1]
            };
        }
    },
    {
        id: "velas_viento",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "velas_viento",
        generar: () => {
            const velas_iniciales = 10;
            const velas_apagadas = 3;
            const velas_encendidas = velas_iniciales - velas_apagadas;
            const respuesta = velas_apagadas;

            return {
                texto: `Hay ${velas_iniciales} velas encendidas en una mesa. Una corriente de aire apaga ${velas_apagadas} de ellas. Si nadie las vuelve a encender, ¿cuántas velas quedan al día siguiente?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Pensamiento temporal! Las ${velas_encendidas} velas que se quedaron encendidas se consumirán completamente durante la noche. Solo quedarán las ${velas_apagadas} velas apagadas, que se mantienen intactas.`,
                ecuacion: `Velas restantes = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, velas_encendidas, velas_iniciales, velas_encendidas + velas_apagadas]
            };
        }
    },
    {
        id: "peso_manzanas",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "peso_manzanas",
        generar: () => {
            const peso_llena = 15;
            const peso_caja = 2;
            const peso_manzanas = peso_llena - peso_caja;
            const peso_manzanas_mitad = peso_manzanas / 2;
            const respuesta = peso_manzanas_mitad + peso_caja;

            return {
                texto: `Una caja llena de manzanas pesa ${peso_llena} kg. La caja vacía pesa ${peso_caja} kg. Si te comes la mitad de las manzanas, ¿cuánto pesa la caja ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `Paso 1: Peso de las manzanas = ${peso_llena} - ${peso_caja} = ${peso_manzanas} kg. Paso 2: Mitad de manzanas = ${peso_manzanas} ÷ 2 = ${peso_manzanas_mitad} kg. Paso 3: Caja + manzanas restantes = ${peso_caja} + ${peso_manzanas_mitad} = ${respuesta} kg`,
                ecuacion: `((${peso_llena} - ${peso_caja}) ÷ 2) + ${peso_caja} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, peso_manzanas_mitad, peso_llena / 2, peso_manzanas]
            };
        }
    },
    {
        id: "pajaro_cazador",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador', 'cientifico'],
        i18n: "pajaro_cazador",
        generar: () => {
            const pajaro_inicial = 5;
            const pajaro_herido = 1;
            const respuesta = 0;

            return {
                texto: `Hay ${pajaro_inicial} pájaros en una rama. Un cazador dispara y acierta a uno. ¿Cuántos pájaros quedan en la rama?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Realismo lógico! El pájaro herido cae al suelo y los otros ${pajaro_inicial - pajaro_herido} pájaros salen volando asustados por el disparo. Resultado: 0 pájaros en la rama.`,
                ecuacion: `Pájaros en rama = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, pajaro_inicial - pajaro_herido, pajaro_herido, pajaro_inicial]
            };
        }
    },
    {
        id: "ladrillo_peso",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "ladrillo_peso",
        generar: () => {
            const peso_ladrillo = 2;
            const respuesta = 3;

            return {
                texto: `Un ladrillo pesa 1 kg más medio ladrillo. ¿Cuánto pesan un ladrillo y medio?`,
                respuestaCorrecta: respuesta,
                explicacion: `Álgebra: Si un ladrillo (x) = 1 + x/2, entonces x/2 = 1, por lo tanto x = 2 kg. Un ladrillo y medio = 2 + 1 = 3 kg. La trampa común es responder 1.5 kg sin resolver la ecuación.`,
                ecuacion: `x = 1 + (x/2) → x = __; Respuesta = 1.5x = __`,
                ecuacionValores: [2, 3],
                opciones: [respuesta, 1.5, 2, 2.5]
            };
        }
    },
    // NUEVOS PROBLEMAS L4 (Pack 2)
    {
        id: "l4_fracciones_visuales",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['cientifico', 'arquitecto'],
        i18n: "l4_fracciones_visuales",
        generar: () => {
            const total = Math.floor(Math.random() * 8) + 4; // 4 a 12
            // Aseguramos que sea par para media fácil o múltiplo de 4 para cuarto
            const num = total * 4;
            const cuarto = num / 4;
            const mitad = num / 2;
            const respuesta = cuarto;
            return {
                texto: `Tienes ${num} canicas. Si pierdes un cuarto (1/4) de ellas, ¿cuántas has perdido?`,
                respuestaCorrecta: respuesta,
                explicacion: `Un cuarto significa dividir por 4. ${num} ÷ 4 = ${respuesta}.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `${num} × 1/4 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, mitad, num - cuarto, 4].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_decimales_dinero",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['explorador'],
        i18n: "l4_decimales_dinero",
        generar: () => {
            const precio1 = (Math.floor(Math.random() * 50) + 50) / 10; // 5.0 - 10.0
            const precio2 = (Math.floor(Math.random() * 50) + 10) / 10;
            const total = Math.round((precio1 + precio2) * 10) / 10;
            return {
                texto: `Compras un helado por ${precio1}€ y un refresco por ${precio2}€. ¿Cuánto pagas en total?`,
                respuestaCorrecta: total,
                explicacion: `Suma los precios: ${precio1} + ${precio2} = ${total}€.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `${precio1} + ${precio2} = __`,
                ecuacionValores: [total],
                opciones: [total, Math.round((precio1 + precio2 + 0.5) * 10) / 10, Math.round((total - 1) * 10) / 10, Math.round((precio1 * 2) * 10) / 10].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_ecuacion_simple",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "l4_ecuacion_simple",
        generar: () => {
            const x = Math.floor(Math.random() * 10) + 2;
            const suma = Math.floor(Math.random() * 10) + 5;
            const total = x + suma;
            return {
                texto: `Pienso en un número. Si le sumo ${suma}, obtengo ${total}. ¿En qué número pensé?`,
                respuestaCorrecta: x,
                explicacion: `Es una ecuación: x + ${suma} = ${total}. Para despejar x, restamos ${suma}: ${total} - ${suma} = ${x}.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `x + ${suma} = ${total} → x = __`,
                ecuacionValores: [x],
                opciones: [x, total + suma, total, x + 1].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_area_rectangulo",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['arquitecto'],
        i18n: "l4_area_rectangulo",
        generar: () => {
            const ancho = Math.floor(Math.random() * 5) + 3;
            const alto = Math.floor(Math.random() * 5) + 3;
            const area = ancho * alto;
            const perimetro = (ancho + alto) * 2;
            return {
                texto: `Una habitación mide ${ancho} metros de ancho y ${alto} metros de largo. ¿Cuál es su área en metros cuadrados?`,
                respuestaCorrecta: area,
                explicacion: `El área de un rectángulo es base x altura: ${ancho} x ${alto} = ${area} m².`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `${ancho}m × ${alto}m = __ m²`,
                ecuacionValores: [area],
                opciones: [area, perimetro, ancho + alto, area * 2].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_mitad_doble",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "l4_mitad_doble",
        generar: () => {
            const num = Math.floor(Math.random() * 10) + 4;
            const respuesta = num; // (x * 2) / 2 = x
            return {
                texto: `Si multiplicas un número por 2 y luego divides el resultado entre 2, ¿qué obtienes? (El número es ${num})`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Vuelves al principio! Multiplicar por 2 y dividir entre 2 son operaciones opuestas que se cancelan.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `(${num} × 2) ÷ 2 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, num * 2, num / 2, 0].sort(() => Math.random() - 0.5)
            };
        }
    },
    // LOGICA NIVEL 4
    {
        id: "l4_hija_teresa",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "l4_hija_teresa",
        generar: () => {
            return {
                texto: "", // i18n
                respuestaCorrecta: 0, // "Mi hija"
                explicacion: "",
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                ecuacion: "",
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_auto_ruedas",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador'],
        i18n: "l4_auto_ruedas",
        generar: () => {
            return {
                texto: "", // i18n
                respuestaCorrecta: 0, // "La de repuesto"
                explicacion: "",
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                ecuacion: "",
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_meses_frio",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador'],
        i18n: "l4_meses_frio",
        generar: () => {
            return {
                texto: "", // i18n
                respuestaCorrecta: 0,
                explicacion: "",
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                ecuacion: "",
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_pato_huevo",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador'],
        i18n: "l4_pato_huevo",
        generar: () => {
            return {
                texto: "", // i18n
                respuestaCorrecta: 0,
                explicacion: "",
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                ecuacion: "",
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l4_quien_soy",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
        i18n: "l4_quien_soy",
        generar: () => {
            return {
                texto: "", // i18n
                respuestaCorrecta: 0,
                explicacion: "",
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                ecuacion: "",
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    }
];

export default level4Problems;