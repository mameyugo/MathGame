/**
 * Nivel 1: Pequeños Detectives
 * Problemas simples de lógica básica y observación
 * Para edades 5-7 años
 */

export const level1Problems = [
    {
        id: "compra_estandar",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "compra_estandar",
        generar: () => {
            const cantidad = Math.floor(Math.random() * 5) + 2;
            const precio = Math.floor(Math.random() * 3) + 1;
            const total = cantidad * precio;
            return {
                texto: `Compramos ${cantidad} gomas de borrar. Cada una cuesta ${precio}€. ¿Cuánto pagamos en total?`,
                respuestaCorrecta: total,
                ecuacion: `${cantidad} x ${precio} = __`,
                ecuacionValores: [total],
                opciones: [total, total + 2, cantidad + precio, total - 1]
            };
        }
    },
    {
        id: "dedos_manos_logica",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "dedos_manos_logica",
        generar: () => {
            const manos = Math.floor(Math.random() * 5) + 2;
            const respuesta = manos * 5;

            return {
                texto: `Si en una mano tengo 5 dedos y en dos manos tengo 10 dedos, ¿cuántos dedos hay en ${manos} manos?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Piensa bien! Cada mano tiene 5 dedos. Por lo tanto: 5 × ${manos} = ${respuesta} dedos en total.`,
                ecuacion: `5 × ${manos} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, manos * manos, manos * 10, respuesta - 5]
            };
        }
    },
    {
        id: "peces_ahogados",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "peces_ahogados",
        generar: () => {
            const total_peces = 10;
            const respuesta = 10;

            return {
                texto: `En una pecera hay ${total_peces} peces. Si 5 de ellos se ahogan, ¿cuántos peces quedan en la pecera?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! Los peces no se ahogan en el agua. Es su hábitat natural. Siguen habiendo ${total_peces} peces.`,
                ecuacion: `${total_peces} - 0 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 5, 15, 0]
            };
        }
    },
    {
        id: "gallo_huevos",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "gallo_huevos",
        generar: () => {
            const respuesta = 0;

            return {
                texto: `Un gallo pone un huevo justo en la punta del tejado de un granero. Si el viento sopla hacia la derecha, ¿hacia qué lado caerá el huevo?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! Los gallos no ponen huevos, son las gallinas las que ponen huevos. Por lo tanto, no hay huevo que caiga.`,
                ecuacion: `Huevos del gallo = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, 2, -1]
            };
        }
    },
    {
        id: "patas_mesa_gato",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "patas_mesa_gato",
        generar: () => {
            const patas_mesa = 4;
            const respuesta = 4;

            return {
                texto: `Una mesa tiene ${patas_mesa} patas. Si un gato se sube encima de la mesa, ¿cuántas patas hay ahora tocando el suelo?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! Las patas del gato están sobre la mesa, no sobre el suelo. Solo las ${patas_mesa} patas de la mesa tocan el suelo.`,
                ecuacion: `${patas_mesa} (mesa) + 0 (gato) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 8, 4, 4]
            };
        }
    },
    {
        id: "cesta_peras",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "cesta_peras",
        generar: () => {
            const inicial = Math.floor(Math.random() * 6) + 4;
            const regaladas = Math.floor(Math.random() * Math.min(3, inicial - 1)) + 1;
            const respuesta = inicial - regaladas;

            return {
                texto: `Tienes una cesta con ${inicial} peras. Si me das ${regaladas} peras, ¿cuántas peras tienes tú ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `Después de dar ${regaladas} peras de tu cesta de ${inicial}, te quedan: ${inicial} - ${regaladas} = ${respuesta} pera(s).`,
                ecuacion: `${inicial} - ${regaladas} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, respuesta + 1, inicial, inicial + regaladas]
            };
        }
    },
    {
        id: "velas_pastel",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "velas_pastel",
        generar: () => {
            const velas_iniciales = 6;
            const velas_apagadas = 2;
            const respuesta = velas_iniciales;

            return {
                texto: `En un pastel de cumpleaños hay ${velas_iniciales} velas encendidas. Si soplas y apagas ${velas_apagadas} velas, ¿cuántas velas quedan en el pastel?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Permanencia de objetos! Aunque estén apagadas, las velas siguen estando físicamente sobre el pastel. Velas apagadas: ${velas_apagadas}, Velas encendidas: ${velas_iniciales - velas_apagadas}, Total en el pastel: ${respuesta}`,
                ecuacion: `${velas_apagadas} (apagadas) + ${velas_iniciales - velas_apagadas} (encendidas) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, velas_iniciales - velas_apagadas, velas_apagadas, 0]
            };
        }
    },
    {
        id: "perro_hermanos",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "perro_hermanos",
        generar: () => {
            const hermanos = 3;
            const respuesta = 1;

            return {
                texto: `${hermanos} hermanos (Juan, Luis y Ana) tienen un perro juntos. ¿Cuántos perros hay en total en la casa?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Lectura cuidadosa! El texto dice que tienen UN perro "juntos", no que cada uno tenga el suyo. Respuesta: ${respuesta} perro compartido.`,
                ecuacion: `${hermanos} hermanos × 0 (cada uno) + 1 (compartido) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, hermanos, hermanos + 1, 0]
            };
        }
    },
    {
        id: "naranjas_llevas",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "naranjas_llevas",
        generar: () => {
            const naranjas_mesa = 5;
            const naranjas_coges = 3;
            const respuesta = naranjas_coges;

            return {
                texto: `Hay ${naranjas_mesa} naranjas en una mesa. Si tú vas y quitas ${naranjas_coges} naranjas, ¿cuántas naranjas tienes tú ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Atención a la pregunta! No pregunta cuántas quedan en la mesa, sino cuántas TIENES TÚ. Respuesta: Las ${naranjas_coges} que acabas de coger.`,
                ecuacion: `Naranjas que tienes = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, naranjas_mesa - naranjas_coges, naranjas_mesa, 0]
            };
        }
    },
    {
        id: "paraguas_magico",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "paraguas_magico",
        generar: () => {
            const ninos = 4;
            const respuesta = 0;

            return {
                texto: `${ninos} niños intentan entrar bajo un paraguas muy pequeño, pero ninguno se moja nada de nada. ¿Cuánta agua llueve?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Usa el contexto! El cerebro busca una explicación física compleja, pero la respuesta es simple: no está lloviendo. Por eso nadie se moja.`,
                ecuacion: `Lluvia = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, ninos, 10]
            };
        }
    },
    {
        id: "patas_pajaro",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "patas_pajaro",
        generar: () => {
            const patas_pajaro = 2;
            const respuesta = patas_pajaro;

            return {
                texto: `Un pájaro tiene ${patas_pajaro} patas. Si se apoya en una rama solo con una pata y esconde la otra entre sus plumas, ¿cuántas patas tiene el pájaro ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Permanencia de objetos! Aunque no se vea, la pata sigue ahí. El pájaro sigue teniendo ${patas_pajaro} patas. Visible: 1, Escondida: 1, Total: ${respuesta}.`,
                ecuacion: `1 (visible) + 1 (escondida) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, 3, 0]
            };
        }
    },
    {
        id: "carrera_posicion",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "carrera_posicion",
        generar: () => {
            const respuesta = 2;

            return {
                texto: `Estás en una carrera y adelantas al que va segundo. ¿En qué posición estás ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! Si adelantas al segundo, tú ocupas su lugar y pasas a ir segundo. El primero sigue siendo el primero.`,
                ecuacion: `Posición = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, 3, 0]
            };
        }
    },
    {
        id: "vuelta_compra",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "vuelta_compra",
        generar: () => {
            const articulos = ["Libreta", "Goma", "Lápiz", "Cuaderno", "Bolígrafo"];
            const articulo = articulos[Math.floor(Math.random() * articulos.length)];
            const precio = Math.floor(Math.random() * 5) + 1;
            const billete = Math.random() > 0.5 ? 10 : 20;
            const respuesta = billete - precio;

            return {
                texto: `Vas a la papelería y compras ${articulo.toLowerCase()} que cuesta ${precio}€. Si pagas con un billete de ${billete}€, ¿cuánto dinero te tienen que devolver?`,
                respuestaCorrecta: respuesta,
                explicacion: `Tienes que restar el precio del billete: ${billete} - ${precio} = ${respuesta}€.`,
                ecuacion: `${billete} - ${precio} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, precio, billete, billete + precio]
            };
        }
    },
    {
        id: "merienda_mates",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "merienda_mates",
        generar: () => {
            const queso = Math.floor(Math.random() * 4) + 2;
            const jamon = Math.floor(Math.random() * 4) + 1;
            const respuesta = queso + jamon;
            return {
                texto: `Tienes ${queso} sándwiches de queso en tu mochila. Tu mamá llega y te guarda otros ${jamon} sándwiches de jamón. ¿Cuántos sándwiches tienes para merendar en total?`,
                respuestaCorrecta: respuesta,
                explicacion: "¡Junta todos los sándwiches y cuéntalos! 🥪",
                ecuacion: `${queso} + ${jamon} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, respuesta + 1, respuesta + 2, respuesta - 1]
            };
        }
    },
    {
        id: "tesoro_canicas",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "tesoro_canicas",
        generar: () => {
            const inicial = Math.floor(Math.random() * 7) + 6;
            const perdidas = Math.floor(Math.random() * Math.min(5, inicial - 1)) + 1;
            const respuesta = inicial - perdidas;
            return {
                texto: `En el recreo tenías ${inicial} canicas brillantes. Jugando con un amigo, pierdes ${perdidas} canicas. ¿Cuántas canicas te quedan en la bolsa?`,
                respuestaCorrecta: respuesta,
                explicacion: "¡Recuerda que perder es como restar! 🔵",
                ecuacion: `${inicial} − ${perdidas} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, respuesta + 1, respuesta + 2, respuesta - 1]
            };
        }
    },
    {
        id: "estrellas_pegatina",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "estrellas_pegatina",
        generar: () => {
            const estrellas = Math.floor(Math.random() * 5) + 3;
            const corazones = Math.floor(Math.random() * 4) + 1;
            const respuesta = estrellas + corazones;
            return {
                texto: `Hoy te has portado muy bien y la profe te ha dado ${estrellas} pegatinas de estrellas doradas y ${corazones} pegatinas de corazones rojos. ¿Cuántas pegatinas tienes ahora en tu cuaderno?`,
                respuestaCorrecta: respuesta,
                explicacion: "¡Suma las estrellas y los corazones! ⭐",
                ecuacion: `${estrellas} + ${corazones} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, respuesta + 1, respuesta + 2, respuesta - 1]
            };
        }
    },
    {
        id: "garaje_juguete",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "garaje_juguete",
        generar: () => {
            const coches = Math.floor(Math.random() * 6) + 5;
            const salen = Math.floor(Math.random() * Math.min(4, coches - 1)) + 1;
            const respuesta = coches - salen;
            return {
                texto: `En tu garaje de juguete hay ${coches} coches aparcados. De repente, ${salen} coches salen a toda velocidad para ir a una carrera. ¿Cuántos coches se han quedado en el garaje?`,
                respuestaCorrecta: respuesta,
                explicacion: "Si salen, hay menos coches dentro. 🏎️",
                ecuacion: `${coches} − ${salen} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, respuesta + 1, respuesta + 2, respuesta - 1]
            };
        }
    },
    {
        id: "manzanas_cesta",
        tipo: "matematico",
        nivelMin: 1,
        categorias: ['explorador'],
        i18n: "manzanas_cesta",
        generar: () => {
            const total = Math.floor(Math.random() * 5) + 8;
            const gusano = Math.floor(Math.random() * Math.min(5, total - 1)) + 1;
            const respuesta = total - gusano;
            return {
                texto: `Hay una cesta con ${total} manzanas rojas. Al mirarlas de cerca, ves que ${gusano} tienen un gusanito y no se pueden comer. ¿Cuántas manzanas ricas quedan?`,
                respuestaCorrecta: respuesta,
                explicacion: "¡Quita las del gusanito para saber cuántas quedan! 🍎",
                ecuacion: `${total} − ${gusano} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, respuesta + 1, respuesta + 2, respuesta - 1]
            };
        }
    }
];
