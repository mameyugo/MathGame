/**
 * Niveles 4-5: Avanzados
 * Problemas complejos con lógica profunda y ecuaciones
 * Para edades 12+ años
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
        nivelMin: 3,
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
    }
];

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
        nivelMin: 4,
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
        nivelMin: 4,
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
