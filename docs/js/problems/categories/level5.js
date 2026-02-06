/**
 * Nivel 5: Experto (edades 16+)
 * Problemas con lógica complexa y matemática avanzada
 */

export const level5Problems = [
    {
        id: "peso_ladrillo",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "peso_ladrillo",
        generar: () => {
            const peso_extra = Math.floor(Math.random() * 3) + 1;
            const peso_ladrillo = peso_extra * 2;
            const respuesta = peso_ladrillo + peso_ladrillo / 2;
            const opcion_trampa = peso_ladrillo + peso_extra;

            return {
                texto: `Si un ladrillo pesa ${peso_extra}kg más medio ladrillo, ¿cuánto pesa un ladrillo y medio?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Reto desactivado! Si X = peso de un ladrillo, entonces X = ${peso_extra} + X/2, así que X = ${peso_ladrillo}kg. Un ladrillo y medio pesa ${peso_ladrillo} + ${peso_ladrillo / 2} = ${respuesta}kg.`,
                ecuacion: `Un ladrillo y medio pesa = __ kg`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, peso_ladrillo, opcion_trampa, respuesta + 1.5]
            };
        }
    },
    {
        id: "pastor_lobo_oveja",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "pastor_lobo_oveja",
        generar: () => {
            const respuesta = 6;

            return {
                texto: `Un pastor debe cruzar un río con un lobo, una oveja y una col. En la barca solo caben él y una cosa más. Si deja al lobo con la oveja, el lobo se la come. Si deja a la oveja con la col, la oveja se la come. ¿Cuántos viajes necesita hacer como mínimo? (Cada ida o vuelta cuenta como 1 viaje)`,
                respuestaCorrecta: respuesta,
                explicacion: `Solución: 1. Cruza la oveja. 2. Vuelve solo. 3. Cruza el lobo (y trae a la oveja de vuelta). 4. Cruza la col. 5. Vuelve solo. 6. Cruza la oveja. Total: 6 viajes.`,
                ecuacion: `Viajes mínimos = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 3, 4, 5]
            };
        }
    },
    {
        id: "reloj_espejo_avanzado",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "reloj_espejo_avanzado",
        generar: () => {
            const hora = [3, 6, 9][Math.floor(Math.random() * 3)];
            const hora_real = 12 - hora;
            const respuesta = hora_real;

            return {
                texto: `Miras un reloj de agujas a través de un espejo. Las agujas marcan las ${hora}:00. ¿Qué hora es en realidad?`,
                respuestaCorrecta: respuesta,
                explicacion: `El espejo invierte la posición horizontal del reloj. La fórmula es: hora real = 12 - hora en espejo. Entonces: 12 - ${hora} = ${respuesta}:00.`,
                ecuacion: `12 - ${hora} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, hora, 12 - hora + 6, 6]
            };
        }
    },
    {
        id: "caracol_pozo",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "caracol_pozo",
        generar: () => {
            const profundidad = 10;
            const sube_dia = 3;
            const resbala_noche = 2;
            const dias = 8;

            return {
                texto: `Un caracol está en el fondo de un pozo de ${profundidad} metros. Durante el día sube ${sube_dia} metros, pero por la noche resbala ${resbala_noche} metros. ¿En cuántos días saldrá del pozo?`,
                respuestaCorrecta: dias,
                explicacion: `¡Lógica secuencial! El cálculo instintivo es ${profundidad}/${sube_dia - resbala_noche}=${profundidad / (sube_dia - resbala_noche)} días. Pero en el día ${dias}, el caracol comienza a ${profundidad - sube_dia}m, sube ${sube_dia}m y llega a ${profundidad}m, ¡por lo que sale y no resbala esa noche!`,
                ecuacion: `Día ${dias}: ${profundidad - sube_dia}m + ${sube_dia}m = ${profundidad}m (¡SALIDA!)`,
                ecuacionValores: [dias],
                opciones: [dias, 10, 9, 7]
            };
        }
    },
    {
        id: "edad_hermana",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['explorador', 'arquitecto'],
        i18n: "edad_hermana",
        generar: () => {
            const edad_pasada = 6;
            const hermana_edad_pasada = edad_pasada / 2;
            const diferencia_edad = edad_pasada - hermana_edad_pasada;
            const edad_actual = 70;
            const respuesta = edad_actual - diferencia_edad;

            return {
                texto: `Cuando yo tenía ${edad_pasada} años, mi hermana tenía la mitad de mi edad. Ahora que tengo ${edad_actual} años, ¿cuántos años tiene mi hermana?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Relación variable constante! La mente busca la proporción "mitad" (${edad_actual}/2=${edad_actual / 2}), pero la diferencia de edad es constante. Si hace tiempo había ${diferencia_edad} años de diferencia, ahora sigue habiendo ${diferencia_edad} años. Respuesta: ${edad_actual} - ${diferencia_edad} = ${respuesta} años.`,
                ecuacion: `Diferencia de edad = ${edad_pasada} - ${hermana_edad_pasada} = ${diferencia_edad}; Edad hermana = ${edad_actual} - ${diferencia_edad} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, Math.floor(edad_actual / 2), edad_actual - 3, edad_actual - 5]
            };
        }
    },
    {
        id: "contar_digito_siete",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "contar_digito_siete",
        generar: () => {
            const total_paginas = 100;
            const respuesta = 20;

            return {
                texto: `Estás numerando las páginas de un libro que tiene exactamente ${total_paginas} páginas. ¿Cuántas veces escribirás el dígito '7'?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Patrones numéricos! Muchos solo cuentan los 7s en unidades (7,17,27...97) = 10. Pero olvidan los 7s en la decena 70-79 (10 más). El número 77 tiene dos 7s. Total: 10 + 10 = ${respuesta} veces.`,
                ecuacion: `Unidades: 7,17,27...97 = __; Decenas: 70-79 = __; Total = __`,
                ecuacionValores: [10, 10, respuesta],
                opciones: [respuesta, 10, 11, 19]
            };
        }
    },
    {
        id: "bate_pelota",
        tipo: "matematico",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "bate_pelota",
        generar: () => {
            const total_costo = 1.10;
            const diferencia = 1.00;
            const respuesta = 0.05;
            const bate = total_costo - respuesta;

            return {
                texto: `Un bate y una pelota cuestan juntos ${total_costo.toFixed(2)}€. El bate cuesta ${diferencia.toFixed(2)}€ más que la pelota. ¿Cuánto cuesta la pelota?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Ecuación de diferencia! La respuesta automática es 0.10€, pero si la pelota costara 0.10€, el bate costaría 1.10€, y el total sería 1.20€. Correctamente: Si pelota = x, entonces bate = x + 1. x + (x + 1) = 1.10 → 2x = 0.10 → x = 0.05€`,
                ecuacion: `x + (x + 1) = ${total_costo.toFixed(2)} → x = __€`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 0.10, 0.55, 1.05]
            };
        }
    },
    {
        id: "vuelo_pajaro",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "vuelo_pajaro",
        generar: () => {
            const distancia_inicial = 100;
            const velocidad_trenes = 50;
            const velocidad_pajaro = 100;
            const tiempo_encuentro = 1;
            const respuesta = velocidad_pajaro * tiempo_encuentro;

            return {
                texto: `Dos trenes están en vías opuestas a ${distancia_inicial} km de distancia y avanzan el uno hacia el otro a ${velocidad_trenes} km/h cada uno. Un pájaro sale del Tren A a ${velocidad_pajaro} km/h hacia el Tren B, y cuando llega a este, vuelve al Tren A, y así sucesivamente hasta que los trenes chocan. ¿Qué distancia total habrá recorrido el pájaro?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡La trampa del cálculo infinito! Muchos intentan calcular cada trayecto del pájaro (serie infinita). El truco es calcular el tiempo: los trenes tardarán ${tiempo_encuentro} hora en encontrarse (${velocidad_trenes}+${velocidad_trenes}=${velocidad_trenes * 2} km/h de velocidad relativa). Si el pájaro vuela a ${velocidad_pajaro} km/h durante esa hora, recorre exactamente ${respuesta} km.`,
                ecuacion: `d = v × t = ${velocidad_pajaro} × ${tiempo_encuentro} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, distancia_inicial / 2, 50, 150]
            };
        }
    },
    {
        id: "cumpleaños_imposible",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "cumpleaños_imposible",
        generar: () => {
            const edad_anteayer = 25;
            const edad_hoy = 26;
            const edad_proximo_ano = 28;
            const respuesta = 26;

            return {
                texto: `Anteayer tenía ${edad_anteayer} años y el año que viene tendré ${edad_proximo_ano}. ¿Cuántos años tengo hoy? (Sabiendo que hoy es 1 de enero)`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Lógica temporal! Parece imposible pasar de ${edad_anteayer} a ${edad_proximo_ano} en poco tiempo. La solución: 1. Ayer (31 de diciembre) cumplí ${edad_hoy}. 2. Anteayer (30 de diciembre) aún tenía ${edad_anteayer}. 3. Este año cumpliré ${edad_hoy + 1} en diciembre. 4. El año que viene cumpliré ${edad_proximo_ano}. Hoy: ${respuesta} años.`,
                ecuacion: `Edad hoy = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, edad_anteayer, edad_proximo_ano - 2, 25]
            };
        }
    },
    {
        id: "cubo_pintado",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "cubo_pintado",
        generar: () => {
            const tamano_cubo = 3;
            const total_cubitos = 27;
            const aristas = 12;
            const respuesta = aristas;

            return {
                texto: `Un cubo de madera de ${tamano_cubo}×${tamano_cubo}×${tamano_cubo} cm se pinta de azul por fuera. Luego se corta en ${total_cubitos} cubitos de 1×1×1 cm. ¿Cuántos de esos cubitos tendrán exactamente 2 caras pintadas de azul?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Visualización espacial! El cerebro intenta contar caras totales, pero el truco es saber que los cubos con 2 caras pintadas son los que están en las aristas (pero no en las esquinas, que tienen 3). Un cubo tiene ${aristas} aristas, y en este caso hay 1 cubito central por arista. Total: ${respuesta} cubitos.`,
                ecuacion: `Aristas × (n - 2) = ${aristas} × (${tamano_cubo} - 2) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 8, 20, 6]
            };
        }
    },
    {
        id: "carrera_100m",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "carrera_100m",
        generar: () => {
            const distancia = 100;
            const ventaja = 10;
            const velocidad_b_porcent = 0.9;
            const velocidad_c_porcent = velocidad_b_porcent * velocidad_b_porcent;
            const respuesta = Math.round((distancia - (distancia * velocidad_c_porcent)) * 10) / 10;

            return {
                texto: `El corredor A vence al corredor B por ${ventaja} metros. El corredor B vence al corredor C por ${ventaja} metros. Si los tres corren ${distancia} metros, ¿por cuántos metros vence A a C?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡La trampa de la suma! La respuesta intuitiva es ${ventaja + ventaja} metros (${ventaja}+${ventaja}). Pero las distancias son proporcionales a la velocidad. Cuando A llega a los ${distancia}m, B está en los ${distancia - ventaja}m (B corre al ${ventaja === 10 ? 90 : 'X'}% de A). Cuando B llega a los ${distancia}m, C está en los ${distancia - ventaja}m (C corre al ${ventaja === 10 ? 90 : 'X'}% de B). Por tanto, C corre al ${velocidad_c_porcent}×100=${velocidad_c_porcent * 100}% de la velocidad de A. Ventaja real: ${distancia} - (${distancia}×${velocidad_c_porcent}) ≈ ${respuesta}m`,
                ecuacion: `${distancia} - (${distancia} × ${velocidad_c_porcent}) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 20, 15, 18]
            };
        }
    },
    {
        id: "monos_platanos",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "monos_platanos",
        generar: () => {
            const monos_iniciales = 3;
            const platanos_iniciales = 3;
            const tiempo_inicial = 3;
            const monos_finales = 100;
            const platanos_finales = 100;
            const respuesta = tiempo_inicial;

            return {
                texto: `Si ${monos_iniciales} monos tardan ${tiempo_inicial} minutos en comerse ${platanos_iniciales} plátanos, ¿cuánto tiempo tardarán ${monos_finales} monos en comerse ${platanos_finales} plátanos?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡La trampa de la regla de tres! Se intenta aplicar proporción directa (${(monos_finales * tiempo_inicial) / monos_iniciales} minutos). Pero el ritmo es de 1 mono por plátano cada ${tiempo_inicial} minutos. Si todos empiezan a comer a la vez, terminan a la vez. La relación monos:plátanos es la misma (1:1), así que el tiempo permanece constante: ${respuesta} minutos.`,
                ecuacion: `Tiempo = constante si ratio_monos = ratio_plátanos = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 100, 300, 10]
            };
        }
    },
    // NUEVOS PROBLEMAS L5 (Pack 2)
    {
        id: "l5_sistema_ecuaciones",
        tipo: "matematico",
        nivelMin: 5,
        categorias: ['cientifico', 'arquitecto'],
        i18n: "l5_sistema_ecuaciones",
        generar: () => {
            // 2x + y = A
            // x - y = B
            // Suma: 3x = A+B -> x = (A+B)/3
            const x = Math.floor(Math.random() * 5) + 3; // 3 to 7
            const y = Math.floor(Math.random() * 5) + 1; // 1 to 5
            const A = 2 * x + y;
            const B = x - y;
            return {
                texto: `Resuelve el sistema: \n1) 2x + y = ${A} \n2) x - y = ${B} \n¿Cuánto vale x?`,
                respuestaCorrecta: x,
                explicacion: `Suma ambas ecuaciones: (2x+y) + (x-y) = ${A}+${B} → 3x = ${A + B} → x = ${x}.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `3x = ${A + B} → x = __`,
                ecuacionValores: [x],
                opciones: [x, y, x + y, Math.floor((A + B) / 2)].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l5_probabilidad_dados",
        tipo: "matematico",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "l5_probabilidad_dados",
        generar: () => {
            // Suma 7 siempre es 1/6
            // Suma 2 (1+1) es 1/36
            const targets = [
                { val: 7, prob: "1/6", cases: 6 }, // 1+6, 2+5, 3+4, 4+3, 5+2, 6+1
                { val: 2, prob: "1/36", cases: 1 },
                { val: 12, prob: "1/36", cases: 1 },
                { val: 3, prob: "1/18", cases: 2 } // 1+2, 2+1 -> 2/36 = 1/18
            ];
            const t = targets[Math.floor(Math.random() * 2)]; // 7 or 2/12/3 to keep it simple? Let's stick to 7 mostly or mix.
            // Let's force sum 7 for consistency in difficulty or random.
            // Simplified: Always sum 7 for clarity in MC options distraction
            return {
                texto: `Lanzas dos dados de 6 caras. ¿Cuál es la probabilidad de que la suma sea 7?`,
                respuestaCorrecta: 0, // Index 0 is correct
                explicacion: `Hay 6 combinaciones que suman 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total combinaciones: 6x6=36. Probabilidad: 6/36 = 1/6.`,
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true, // Options are strings "1/6", etc.
                ecuacion: `Casos farobables / Casos totales = __`,
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l5_velocidad_relativa",
        tipo: "matematico",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "l5_velocidad_relativa",
        generar: () => {
            const v1 = (Math.floor(Math.random() * 3) + 4) * 10; // 40, 50, 60
            const v2 = (Math.floor(Math.random() * 3) + 4) * 10;
            const t = Math.floor(Math.random() * 2) + 1; // 1 or 2 hours
            const dist = (v1 + v2) * t;
            return {
                texto: `Un tren sale de A a ${v1} km/h hacia B. Otro sale de B a ${v2} km/h hacia A. Si están a ${dist} km, ¿cuánto tardan en cruzarse?`,
                respuestaCorrecta: t,
                explicacion: `Velocidad relativa: se acercan a ${v1}+${v2} = ${v1 + v2} km/h. Tiempo = Distancia / Velocidad = ${dist} / ${v1 + v2} = ${t} horas.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `${dist} / (${v1}+${v2}) = __ h`,
                ecuacionValores: [t],
                opciones: [t, t + 0.5, t * 2, dist / 100].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l5_combinatoria_saludos",
        tipo: "matematico",
        nivelMin: 5,
        categorias: ['explorador'],
        i18n: "l5_combinatoria_saludos",
        generar: () => {
            const personas = Math.floor(Math.random() * 3) + 4; // 4, 5, 6
            const saludos = (personas * (personas - 1)) / 2;
            return {
                texto: `${personas} amigos se reúnen y todos se estrechan la mano entre sí una vez. ¿Cuántos apretones de manos hay en total?`,
                respuestaCorrecta: saludos,
                explicacion: `Fórmula: n(n-1)/2. Cada una de las ${personas} personas saluda a las otras ${personas - 1}. Pero el saludo A-B es el mismo que B-A, así que dividimos por 2. ${personas}x${personas - 1}/2 = ${saludos}.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: `(${personas} × ${personas - 1}) / 2 = __`,
                ecuacionValores: [saludos],
                opciones: [saludos, personas * (personas - 1), personas * 2, saludos + 2].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l5_porcentaje_compuesto",
        tipo: "matematico",
        nivelMin: 5,
        categorias: ['cientifico', 'arquitecto'],
        i18n: "l5_porcentaje_compuesto",
        generar: () => {
            return {
                texto: ``, // i18n handled
                respuestaCorrecta: 0, // "Baja un 1%"
                explicacion: ``, // i18n
                tipoRespuesta: 'opcion_multiple',
                i18nOptions: true,
                ecuacion: `100 + 10% = 110; 110 - 10% = 99`,
                ecuacionValores: [],
                opciones: [0, 1, 2, 3].sort(() => Math.random() - 0.5)
            };
        }
    },
    // LOGICA NIVEL 5
    {
        id: "l5_logica_ascensor",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['explorador'],
        i18n: "l5_logica_ascensor",
        generar: () => {
            return {
                texto: "",
                respuestaCorrecta: 0, // Bajito
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
        id: "l5_logica_meses",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "l5_logica_meses",
        generar: () => {
            const respuesta = 12;
            return {
                texto: `Algunos meses tienen 31 días, otros tienen 30. ¿Cuántos meses tienen 28 días?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Todos! Los 12 meses tienen al menos 28 días.`,
                tipoRespuesta: 'opcion_multiple',
                ecuacion: "",
                ecuacionValores: [],
                opciones: [12, 1, 6, 11].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l5_logica_secuencia_letras",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        i18n: "l5_logica_secuencia_letras",
        generar: () => {
            return {
                texto: "", // i18n needs to differ per language! Warning: Sequence U, D, T depends on language.
                // We will handle this by making the problem language-specific in translation or choosing a universal sequence?
                // Universal sequence: Months? J, F, M, A, M, J, J, A, S, O, N, __ (D) - Works in EN, ES, FR, PT, CA, GL usually starts same.
                // DE: J, F, M, A, M, J, J, A, S, O, N, __ (D - Dezember).
                // Let's use Months sequence.
                respuestaCorrecta: 0, // D
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
        id: "l5_logica_padre_juan",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['explorador'],
        i18n: "l5_logica_padre_juan",
        generar: () => {
            return {
                texto: "",
                respuestaCorrecta: 0, // Juan
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
        id: "l5_logica_interruptores",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico', 'arquitecto'],
        i18n: "l5_logica_interruptores",
        generar: () => {
            return {
                texto: "",
                respuestaCorrecta: 0, // Temperatura
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

export default level5Problems;
