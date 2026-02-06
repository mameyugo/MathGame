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
    },
    {
        id: "ovejas_granjero",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "ovejas_granjero",
        generar: () => {
            const ovejas_total = 17;
            const respuesta = 9;

            return {
                texto: `Un granjero tiene ${ovejas_total} ovejas. Un día viene un lobo y se escapan todas menos ${respuesta}. ¿Cuántas ovejas le quedan al granjero?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! La frase dice "todas menos ${respuesta}", así que la respuesta está literalmente en el problema. Le quedan exactamente ${respuesta} ovejas. No es ${ovejas_total} − 9 = ${ovejas_total - respuesta}.`,
                ecuacion: `Ovejas restantes = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, ovejas_total - respuesta, ovejas_total, 1]
            };
        }
    },
    {
        id: "pastillas_medico",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "pastillas_medico",
        generar: () => {
            const pastillas = 3;
            const minutos_intervalo = 30;
            const respuesta = 60;

            return {
                texto: `Estás malito y el médico te da ${pastillas} pastillas. Te dice que te tomes una cada ${minutos_intervalo} minutos. ¿Cuánto tiempo tardarás en tomártelas todas?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Visualiza el tiempo! El error común es hacer ${pastillas}×${minutos_intervalo}=${pastillas * minutos_intervalo}. Pero: la primera la tomas en el minuto 0, la segunda a los ${minutos_intervalo} min, y la tercera a los ${respuesta} min. Total: ${respuesta} minutos.`,
                ecuacion: `Tiempo total = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, pastillas * minutos_intervalo, minutos_intervalo, 90]
            };
        }
    },
    {
        id: "hermano_tio",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "hermano_tio",
        generar: () => {
            const respuesta = 1; // 1=padre, 2=primo, 3=tío, 4=abuelo

            return {
                texto: `El hermano de mi tío ha venido a visitarme, pero resulta que no es mi tío. ¿Quién es? (1=Padre, 2=Primo, 3=Tío, 4=Abuelo)`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Lógica familiar! El hermano de mi tío es mi padre. Si el tío de mi padre tiene un hermano, y ese hermano no es mi tío, entonces debe ser mi padre. La confusión viene de buscar un pariente "lejano".`,
                ecuacion: `Respuesta = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 2, 3, 4]
            };
        }
    },
    {
        id: "reparto_cesta",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "reparto_cesta",
        generar: () => {
            const respuesta = 1; // 1=Con cesta, 2=Partir manzanas, 3=Compartir, 4=Imposible

            return {
                texto: `En una cesta hay 5 manzanas. Tienes que repartirlas entre 5 amigos de modo que cada uno tenga una manzana, pero que al final quede una manzana en la cesta. ¿Cómo lo haces? (1=Al último le das la cesta con la manzana, 2=Partir las manzanas, 3=Cada uno comparte, 4=Es imposible)`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Pensamiento lateral! La solución es: al último amigo le das la cesta CON la manzana dentro. Así cada uno tiene una manzana, y una sigue en la cesta. La trampa es asumir que "repartir" significa sacar el objeto del recipiente.`,
                ecuacion: `Respuesta = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 2, 3, 4]
            };
        }
    },
    {
        id: "pescadores_familia",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "pescadores_familia",
        generar: () => {
            const peces = 3;
            const personas = 3;
            const respuesta = personas;

            return {
                texto: `Dos padres y dos hijos van de pesca. Pescan ${peces} peces y se reparten uno para cada uno sin que sobre ninguno. ¿Cuántas personas hay? (Respuesta: número de personas)`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Solo hay ${personas} personas! El abuelo y el padre son "dos padres", y el padre y el hijo son "dos hijos". En total: abuelo + padre + hijo = ${personas} personas. El error común es sumar 2+2=4 personas.`,
                ecuacion: `Total de personas = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 4, 5, 6]
            };
        }
    },
    // 5 NUEVOS PROBLEMAS DE NIVEL 2 - MATEMÁTICOS
    {
        id: "horno_galletas",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "horno_galletas",
        generar: () => {
            const chocolate = Math.floor(Math.random() * 20) + 15;     // 15-34
            const vainilla = Math.floor(Math.random() * 15) + 10;      // 10-24
            const vendidas = Math.floor(Math.random() * 10) + 5;       // 5-14
            const total = chocolate + vainilla;
            const respuesta = total - vendidas;

            return {
                texto: `En la pastelería han horneado ${chocolate} galletas de chocolate y ${vainilla} galletas de vainilla. Si ya han vendido ${vendidas} galletas, ¿cuántas galletas quedan todavía en la bandeja?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Primero junta todas las galletas: ${chocolate} + ${vainilla} = ${total}. Luego resta las vendidas: ${total} - ${vendidas} = ${respuesta} galletas.`,
                ecuacion: `${chocolate} + ${vainilla} - ${vendidas} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, total, vendidas, chocolate + vendidas]
            };
        }
    },
    {
        id: "estantes_biblioteca",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "estantes_biblioteca",
        generar: () => {
            const estantes = Math.floor(Math.random() * 4) + 2;        // 2-5 estantes
            const libros_estante = Math.floor(Math.random() * 8) + 6;  // 6-13 libros por estante
            const respuesta = estantes * libros_estante;

            return {
                texto: `En la biblioteca de clase hay ${estantes} estantes. Si en cada estante hay exactamente ${libros_estante} libros, ¿cuántos libros hay en total en la biblioteca?`,
                respuestaCorrecta: respuesta,
                explicacion: `Puedes sumar ${libros_estante} + ${libros_estante}... (${estantes} veces) o usar la multiplicación: ${estantes} × ${libros_estante} = ${respuesta} libros.`,
                ecuacion: `${estantes} × ${libros_estante} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, estantes + libros_estante, estantes * (libros_estante - 1), estantes * libros_estante + 2]
            };
        }
    },
    {
        id: "reparto_caramelos",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "reparto_caramelos",
        generar: () => {
            const amigos = Math.floor(Math.random() * 4) + 3;          // 3-6 amigos
            const caramelos_total = amigos * (Math.floor(Math.random() * 5) + 4); // Asegurar división exacta
            const respuesta = caramelos_total / amigos;

            return {
                texto: `Tienes ${caramelos_total} caramelos de fresa y quieres repartirlos en partes iguales entre tus ${amigos} mejores amigos. ¿Cuántos caramelos recibirá cada amigo?`,
                respuestaCorrecta: respuesta,
                explicacion: `¿Qué número multiplicado por ${amigos} nos da ${caramelos_total}? La respuesta es: ${caramelos_total} ÷ ${amigos} = ${respuesta} caramelos para cada amigo.`,
                ecuacion: `${caramelos_total} ÷ ${amigos} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, caramelos_total - amigos, amigos, caramelos_total / 2]
            };
        }
    },
    {
        id: "ahorro_juguete",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "ahorro_juguete",
        generar: () => {
            const precio = Math.floor(Math.random() * 30) + 30;        // 30-59€
            const ahorros = Math.floor(Math.random() * 15) + 10;       // 10-24€
            const regalo = Math.floor(Math.random() * 12) + 5;         // 5-16€
            const tengo = ahorros + regalo;
            const respuesta = precio - tengo;

            return {
                texto: `Quieres comprar un coche teledirigido que cuesta ${precio}€. Si ya tienes ahorrados ${ahorros}€ en tu hucha y tu abuela te regala ${regalo}€ más, ¿cuánto dinero te falta todavía para poder comprarlo?`,
                respuestaCorrecta: respuesta,
                explicacion: `Suma lo que tienes: ${ahorros} + ${regalo} = ${tengo}€. Ahora réstaselo al precio: ${precio} - ${tengo} = ${respuesta}€. Te falta ${respuesta}€.`,
                ecuacion: `${precio} - (${ahorros} + ${regalo}) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, precio - ahorros, regalo, tengo]
            };
        }
    },
    {
        id: "plantas_jardin",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
        i18n: "plantas_jardin",
        generar: () => {
            const medida_inicial = Math.floor(Math.random() * 8) + 8;  // 8-15 cm
            const crecimiento_dia = Math.floor(Math.random() * 3) + 2; // 2-4 cm/día
            const dias = Math.floor(Math.random() * 4) + 3;            // 3-6 días
            const respuesta = medida_inicial + (crecimiento_dia * dias);

            return {
                texto: `Cada día riegas tu planta y crece ${crecimiento_dia} centímetros. Si el lunes medía ${medida_inicial} centímetros, ¿cuánto medirá después de ${dias} días si sigue creciendo igual todos los días?`,
                respuestaCorrecta: respuesta,
                explicacion: `Cuenta el crecimiento total: ${dias} días × ${crecimiento_dia} cm/día = ${dias * crecimiento_dia} cm de crecimiento. Suma la medida inicial: ${medida_inicial} + ${dias * crecimiento_dia} = ${respuesta} cm.`,
                ecuacion: `${medida_inicial} + (${crecimiento_dia} × ${dias}) = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, medida_inicial + crecimiento_dia, medida_inicial * dias, dias * crecimiento_dia]
            };
        }
    },
    // NUEVOS PROBLEMAS L2 (Pack 2)
    {
        id: "l2_suma_resta_dinero",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_suma_resta_dinero",
        generar: () => {
            const inicial = Math.floor(Math.random() * 40) + 30; // 30-69
            const gasto = Math.floor(Math.random() * 15) + 5;   // 5-19
            const encontrado = Math.floor(Math.random() * 10) + 5; // 5-14
            const respuesta = inicial - gasto + encontrado;
            return {
                texto: `Tenías ${inicial}€, gastaste ${gasto}€ en un libro y luego te encontraste ${encontrado}€. ¿Cuánto dinero tienes ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `Resta lo gastado y suma lo encontrado: ${inicial} - ${gasto} + ${encontrado} = ${respuesta}. 💶`,
                ecuacion: `${inicial} - ${gasto} + ${encontrado} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, inicial - gasto, inicial + encontrado, respuesta - 10]
            };
        }
    },
    {
        id: "l2_patas_animales",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_patas_animales",
        generar: () => {
            const perros = Math.floor(Math.random() * 4) + 2; // 2-5
            const gatos = Math.floor(Math.random() * 4) + 2;  // 2-5
            const respuesta = (perros + gatos) * 4;
            return {
                texto: `En una granja hay ${perros} perros y ${gatos} gatos. ¿Cuántas patas hay en total?`,
                respuestaCorrecta: respuesta,
                explicacion: `Suma los animales (${perros} + ${gatos} = ${perros + gatos}) y multiplica por 4 patas: ${perros + gatos} x 4 = ${respuesta}. 🐾`,
                ecuacion: `(${perros} + ${gatos}) x 4 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, perros * 4, gatos * 4, respuesta + 2]
            };
        }
    },
    {
        id: "l2_doble_cromos",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_doble_cromos",
        generar: () => {
            const tuyos = Math.floor(Math.random() * 10) + 5; // 5-14
            const respuesta = tuyos * 2;
            return {
                texto: `Tienes ${tuyos} cromos y tu amigo tiene el doble que tú. ¿Cuántos cromos tiene tu amigo?`,
                respuestaCorrecta: respuesta,
                explicacion: `El doble significa multiplicar por 2: ${tuyos} x 2 = ${respuesta}.`,
                ecuacion: `${tuyos} x 2 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, tuyos + 2, tuyos * 3, 10]
            };
        }
    },
    {
        id: "l2_mitad_galletas",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_mitad_galletas",
        generar: () => {
            const total = (Math.floor(Math.random() * 10) + 2) * 2; // Par 4-22
            const respuesta = total / 2;
            return {
                texto: `Tienes ${total} galletas y te comes la mitad. ¿Cuántas galletas quedan?`,
                respuestaCorrecta: respuesta,
                explicacion: `La mitad es dividir por 2: ${total} / 2 = ${respuesta}. 🍪`,
                ecuacion: `${total} / 2 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, total - 1, total * 2, 0]
            };
        }
    },
    {
        id: "l2_bolsas_caramelos",
        tipo: "matematico",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_bolsas_caramelos",
        generar: () => {
            const bolsas = Math.floor(Math.random() * 4) + 3; // 3-6
            const caramelos = Math.floor(Math.random() * 5) + 3; // 3-7
            const respuesta = bolsas * caramelos;
            return {
                texto: `Tienes ${bolsas} bolsas con ${caramelos} caramelos en cada una. ¿Cuántos caramelos tienes en total?`,
                respuestaCorrecta: respuesta,
                explicacion: `Multiplica bolsas por caramelos: ${bolsas} x ${caramelos} = ${respuesta}. 🍬`,
                ecuacion: `${bolsas} x ${caramelos} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, bolsas + caramelos, respuesta + 5, 10]
            };
        }
    },
    {
        id: "l2_secuencia_simple",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_secuencia_simple",
        generar: () => {
            const inicio = Math.floor(Math.random() * 5) + 2; // 2-6
            const salto = Math.floor(Math.random() * 4) + 2; // 2-5
            const n1 = inicio;
            const n2 = inicio + salto;
            const n3 = inicio + salto * 2;
            const n4 = inicio + salto * 3;
            const respuesta = inicio + salto * 4;
            return {
                texto: `¿Qué número sigue en la serie? ${n1}, ${n2}, ${n3}, ${n4}...`,
                respuestaCorrecta: respuesta,
                explicacion: `La serie va saltando de ${salto} en ${salto}. ${n4} + ${salto} = ${respuesta}.`,
                tipoRespuesta: 'opcion_multiple',
                data: [n1, n2, n3, n4], // Para i18n si se necesita
                ecuacion: "",
                ecuacionValores: [],
                opciones: [respuesta, respuesta - 1, respuesta + salto, n4 + 1].sort(() => Math.random() - 0.5)
            };
        }
    },
    {
        id: "l2_hermana_nosoy",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_hermana_nosoy",
        generar: () => {
            // 0: Hermana, 1: Hermano, 2: Tía, 3: Prima
            const respuesta = 0;
            return {
                texto: "", // i18n lo llenará
                respuestaCorrecta: respuesta,
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
        id: "l2_mapa_ciudades",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_mapa_ciudades",
        generar: () => {
            // 0: Mapa, 1: Libro, 2: Sueño, 3: Televisión
            const respuesta = 0;
            return {
                texto: "", // i18n
                respuestaCorrecta: respuesta,
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
        id: "l2_esponja_agua",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_esponja_agua",
        generar: () => {
            // 0: Esponja, 1: Cubo, 2: Red, 3: Botella
            const respuesta = 0;
            return {
                texto: "", // i18n
                respuestaCorrecta: respuesta,
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
        id: "l2_romper_silencio",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador'],
        i18n: "l2_romper_silencio",
        generar: () => {
            // 0: Silencio, 1: Cristal, 2: Promesa, 3: Espejo
            const respuesta = 0;
            return {
                texto: "", // i18n
                respuestaCorrecta: respuesta,
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

export default level2Problems;
