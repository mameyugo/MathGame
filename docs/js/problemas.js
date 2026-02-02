window.bancoProblemas = [
    {
        id: "manzanas_rotas_logica",
        tipo: "logica",
        nivelMin: 3,
        // Usamos variables que se rellenan al azar
        generar: () => {
            const n1 = Math.floor(Math.random() * 10) + 5; // Manzanas iniciales
            const n2 = Math.floor(Math.random() * 4) + 1; // Manzanas rotas
            const precio = 2;
            const nombres = ["Juan", "Pedro", "Luis", "Ana"];
            const p1 = nombres[Math.floor(Math.random() * 2)]; // Dueño
            const p2 = nombres[Math.floor(Math.random() * 2) + 2]; // El que tropieza

            return {
                texto: `${p1} tiene ${n1} manzanas. ${p2} tropieza con él, ${p1} cae y se le rompen ${n2}. Si cada manzana cuesta ${precio}€, ¿cuánto dinero le debe ${p1} a ${p2}?`,
                respuestaCorrecta: 0,
                explicacion: `¡Cuidado! Las manzanas son de ${p1}. Es ${p2} quien debería pagarle ${n2 * precio}€ a ${p1}.`,
                ecuacion: `${n2} x ${precio} = __`,
                ecuacionValores: [n2 * precio],
                opciones: [0, n2 * precio, n1 * precio, (n1 - n2) * precio]
            };
        }
    },
    {
        id: "compra_estandar",
        tipo: "matematico",
        nivelMin: 1,
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
        id: "pastor_ovejas",
        tipo: "logica",
        nivelMin: 2,
        generar: () => {
            // Números aleatorios coherentes: entre 10-30 ovejas totales
            const ovejas_totales = Math.floor(Math.random() * 21) + 10; // 10-30
            // Ovejas vivas: entre 4 y total-2 (para que siempre mueran algunas)
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
        id: "patas_mesa",
        tipo: "matematico",
        nivelMin: 4,
        generar: () => {
            // Números aleatorios coherentes
            const mesas = Math.floor(Math.random() * 3) + 2; // 2-4 mesas
            const patas_mesa = 4; // Las mesas siempre tienen 4 patas
            const sillas = Math.floor(Math.random() * 3) + 1; // 1-3 sillas
            const patas_silla = 3; // Las sillas siempre tienen 3 patas (estándar)
            const perros = Math.floor(Math.random() * 3) + 1; // 1-3 perros
            const patas_perro = 4; // Los perros siempre tienen 4 patas
            const total = (mesas * patas_mesa) + (sillas * patas_silla) + (perros * patas_perro);
            const trampa_opcion = (mesas * patas_mesa) + (sillas * patas_silla); // Sin contar perros

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
        id: "peso_ladrillo",
        tipo: "logica",
        nivelMin: 5,
        generar: () => {
            // X = peso_extra + X/2
            // X - X/2 = peso_extra
            // X/2 = peso_extra
            // X = peso_extra * 2
            const peso_extra = Math.floor(Math.random() * 3) + 1; // 1-3 kg de diferencia
            const peso_ladrillo = peso_extra * 2; // El ladrillo pesa el doble
            const respuesta = peso_ladrillo + peso_ladrillo / 2; // Ladrillo y medio
            const opcion_trampa = peso_ladrillo + peso_extra; // Los que restan directamente

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
        id: "meses_ano",
        tipo: "logica",
        nivelMin: 2,
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
        id: "tren_electrico",
        tipo: "logica",
        nivelMin: 3,
        generar: () => {
            // Números aleatorios para hacer más realista, pero la respuesta siempre es 0
            const velocidad_tren = Math.floor(Math.random() * 50) + 80; // 80-130 km/h
            const velocidad_viento = Math.floor(Math.random() * 40) + 30; // 30-70 km/h
            const respuesta = 0;

            return {
                texto: `Un tren eléctrico viaja hacia el Norte a ${velocidad_tren} km/h. Si el viento sopla hacia el Sur a ${velocidad_viento} km/h, ¿cuánto humo echa el tren?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa desactivada! Es un tren ELÉCTRICO, no a vapor o diesel. Los trenes eléctricos no echan humo, alimentados directamente por electricidad. Todas esas velocidades son distractores. La respuesta es 0.`,
                ecuacion: `Humo del tren = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, velocidad_tren, velocidad_viento, velocidad_tren - velocidad_viento]
            };
        }
    },
    {
        id: "biblioteca",
        tipo: "matematico",
        nivelMin: 2,
        generar: () => {
            const X = Math.floor(Math.random() * 51) + 50; // 50-100 libros iniciales
            const Y = Math.floor(Math.random() * 21) + 10; // 10-30 libros prestados
            const Z = Math.floor(Math.random() * 11) + 5;  // 5-15 libros devueltos
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
        id: "huerto_manzanas",
        tipo: "matematico",
        nivelMin: 4,
        generar: () => {
            const F = Math.floor(Math.random() * 7) + 3; // 3-9 filas
            const A = Math.floor(Math.random() * 7) + 4; // 4-10 árboles por fila
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
        id: "vuelta_compra",
        tipo: "matematico",
        nivelMin: 1,
        generar: () => {
            const articulos = ["Libreta", "Goma", "Lápiz", "Cuaderno", "Bolígrafo"];
            const articulo = articulos[Math.floor(Math.random() * articulos.length)];
            const precio = Math.floor(Math.random() * 5) + 1; // 1-5€
            const billete = Math.random() > 0.5 ? 10 : 20; // 10€ o 20€
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
        id: "despertador_antiguo",
        tipo: "logica",
        nivelMin: 3,
        generar: () => {
            const respuesta = 1;

            return {
                texto: `Te vas a la cama a las 8 de la noche y pones un despertador de agujas (analógico) para que suene a las 9 de la mañana. ¿Cuántas horas habrás dormido cuando suene la alarma?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Trampa! Los despertadores analógicos no distinguen entre AM y PM. Cuando la aguja llegue al 9, sonará a las 9 de la noche (1 hora después), no a las 9 de la mañana.`,
                ecuacion: `9 - 8 = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 13, 12, 14]
            };
        }
    },
    {
        id: "reloj_espejo",
        tipo: "logica",
        nivelMin: 4,
        generar: () => {
            const hora_espejo = 9;
            const respuesta = 12 - hora_espejo; // 3

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
        id: "tarta_horno",
        tipo: "matematico",
        nivelMin: 1,
        generar: () => {
            const hora_inicio = Math.floor(Math.random() * 9) + 10; // 10-18
            const duracion = [15, 30, 45, 60][Math.floor(Math.random() * 4)];
            const hora_fin = hora_inicio + Math.floor(duracion / 60);
            const minutos_fin = duracion % 60;
            const respuesta = minutos_fin === 0 ? hora_fin : `${hora_fin}:${minutos_fin.toString().padStart(2, '0')}`;

            return {
                texto: `Mamá ha metido una tarta al horno a las ${hora_inicio}:00. Si la tarta tarda ${duracion} minutos en hacerse, ¿a qué hora debemos sacarla?`,
                respuestaCorrecta: respuesta,
                explicacion: `Sumamos ${duracion} minutos a las ${hora_inicio}:00. Resultado: ${respuesta}.`,
                ecuacion: minutos_fin === 0 
                    ? `${hora_inicio} + ${duracion / 60} hora(s) = __`
                    : `${hora_inicio}:00 + ${duracion} min = __ : __`,
                ecuacionValores: minutos_fin === 0 ? [hora_fin] : [hora_fin, minutos_fin],
                opciones: minutos_fin === 0 
                    ? [hora_fin, hora_fin + 1, hora_inicio, hora_fin - 1]
                    : [respuesta, `${hora_fin + 1}:00`, `${hora_inicio}:${duracion}`, `${hora_fin}:00`]
            };
        }
    },
    {
        id: "viaje_autobus",
        tipo: "matematico",
        nivelMin: 2,
        generar: () => {
            const hora_salida = Math.floor(Math.random() * 4) + 8; // 8-11
            const hora_llegada = Math.floor(Math.random() * 9) + 12; // 12-20
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
        id: "entrenamiento_batman",
        tipo: "matematico",
        nivelMin: 4,
        generar: () => {
            const horas = Math.floor(Math.random() * 4) + 2; // 2-5 horas
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
    }
];