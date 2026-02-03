/**
 * Nivel 2: Intermedios Básicos
 * Problemas de lógica con trampas moderadas
 * Para edades 8-10 años
 */

export const level2Problems = [
    {
        id: "pastor_ovejas",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "pastor_ovejas",
        generar: () => {
            const ovejas_totales = Math.floor(Math.random() * 21) + 10;
            const ovejas_vivas = Math.floor(Math.random() * (ovejas_totales - 5)) + 4;
            const respuesta = ovejas_vivas;

            return {
                texto: `Un pastor tiene ${ovejas_totales} ovejas. Un rayo cae y mueren todas menos ${ovejas_vivas}. ¿Cuántas ovejas le quedan?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! El problema dice "todas menos ${ovejas_vivas}", así que le quedan exactamente ${ovejas_vivas} ovejas. No es ${ovejas_totales} - ${ovejas_vivas} = ${ovejas_totales - ovejas_vivas}.`,
                ecuacion: `Le quedan = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, ovejas_totales - ovejas_vivas, ovejas_totales, Math.max(1, ovejas_vivas - 1)]
            };
        }
    },
    {
        id: "meses_ano",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "meses_ano",
        generar: () => {
            const respuesta = 12;

            return {
                texto: `Si en un año hay meses que tienen 30 días y otros tienen 31, ¿cuántos meses tienen 28 días?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! La pregunta no es cuántos meses tienen SOLO 28 días, sino cuántos meses TIENEN 28 días (entre otros). Todos los meses del año tienen al menos 28 días, incluso febrero. La respuesta es 12.`,
                ecuacion: `Meses con 28+ días = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, 11, 2]
            };
        }
    },
    {
        id: "biblioteca",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "biblioteca",
        generar: () => {
            const X = Math.floor(Math.random() * 51) + 50;
            const Y = Math.floor(Math.random() * 21) + 10;
            const Z = Math.floor(Math.random() * 11) + 5;
            const respuesta = X - Y + Z;

            return {
                texto: `En la biblioteca de clase hay ${X} libros. El lunes se prestaron ${Y} libros, pero el viernes se devolvieron ${Z}. ¿Cuántos libros hay ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `Tienes que restar los prestados y sumar los devueltos: ${X} - ${Y} + ${Z} = ${respuesta}.`,
                ecuacion: `${X} - ${Y} + ${Z} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, X - Y, X + Z - Y, X - Y - Z]
            };
        }
    },
    {
        id: "viaje_autobus",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "viaje_autobus",
        generar: () => {
            const hora_salida = Math.floor(Math.random() * 4) + 8;
            const hora_llegada = Math.floor(Math.random() * 9) + 12;
            const horas_viaje = hora_llegada - hora_salida;
            const respuesta = `${horas_viaje}:30`;

            return {
                texto: `Un autobús sale de la ciudad a las ${hora_salida}:00 y llega a su destino a las ${hora_llegada}:30. ¿Cuánto tiempo ha durado el viaje?`,
                respuestaCorrecta: respuesta,
                explicacion: `Desde las ${hora_salida}:00 hasta las ${hora_llegada}:30 hay ${horas_viaje} horas y 30 minutos.`,
                ecuacion: `${hora_llegada}:30 - ${hora_salida}:00 = __ : __`,
                ecuacionValores: [horas_viaje, 30],
                opciones: [respuesta, `${horas_viaje}:00`, `${horas_viaje + 1}:00`, `${horas_viaje}:15`]
            };
        }
    },
    {
        id: "la_cerilla",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "la_cerilla",
        generar: () => {
            const respuesta = 1;

            return {
                texto: `Entras en una habitación oscura y fría. Solo tienes una cerilla. Hay una estufa de carbón, una lámpara de aceite y una vela. ¿Qué enciendes primero?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡La cerilla, por supuesto! Sin encender la cerilla no puedes encender nada más.`,
                ecuacion: `Primero enciendes = __ (1=cerilla, 2=estufa, 3=lámpara)`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 2, 3, 0]
            };
        }
    },
    {
        id: "peso_algodón",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "peso_algodón",
        generar: () => {
            const peso = Math.floor(Math.random() * 3) + 1;
            const respuesta = 0;

            return {
                texto: `¿Qué pesa más? ¿Un kilo de hierro o un kilo de algodón?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Pesan lo mismo! Un kilo es un kilo, sin importar el material. La confusión viene de que el hierro es más denso, pero estamos hablando del mismo peso.`,
                ecuacion: `Diferencia de peso = __`,
                ecuacionValores: [0],
                opciones: [0, peso, peso * 2, peso / 2]
            };
        }
    }
];

export default level2Problems;
