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
    }
];
