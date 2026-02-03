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
    }
];
