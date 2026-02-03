window.bancoProblemas = [
    {
        id: "manzanas_rotas_logica",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
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
        categorias: ['explorador'],
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
        categorias: ['explorador', 'arquitecto'],
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
        categorias: ['arquitecto'],
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
        categorias: ['cientifico'],
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
        categorias: ['explorador', 'arquitecto'],
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
        categorias: ['arquitecto', 'cientifico'],
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
        categorias: ['explorador'],
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
        categorias: ['explorador', 'arquitecto'],
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
        categorias: ['explorador'],
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
        categorias: ['arquitecto', 'cientifico'],
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
        categorias: ['cientifico'],
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
        categorias: ['explorador'],
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
        categorias: ['explorador', 'arquitecto'],
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
        categorias: ['arquitecto'],
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
    },
    // Problemas de lógica y pensamiento lateral - Nivel 1
    {
        id: "dedos_manos_logica",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const manos = Math.floor(Math.random() * 5) + 2; // 2-6 manos
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
        id: "carrera_posicion",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
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
    // Problemas de lógica y pensamiento lateral - Nivel 2
    {
        id: "la_cerilla",
        tipo: "logica",
        nivelMin: 2,
        categorias: ['explorador', 'arquitecto'],
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
        generar: () => {
            const peso = Math.floor(Math.random() * 3) + 1; // 1-3 kilos
            const respuesta = peso;

            return {
                texto: `¿Qué pesa más? ¿Un kilo de hierro o un kilo de paja?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Pesan lo mismo! Un kilo es un kilo, sin importar el material. La confusión viene de que el hierro es más denso, pero estamos hablando del mismo peso.`,
                ecuacion: `Diferencia de peso = __`,
                ecuacionValores: [0],
                opciones: [0, peso, peso * 2, peso / 2]
            };
        }
    },
    // Problemas de lógica y pensamiento lateral - Nivel 3
    {
        id: "padre_rosa",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto'],
        generar: () => {
            const respuesta = 5;

            return {
                texto: `El padre de Rosa tiene 5 hijas: Lala, Lele, Lili, Lolo y... ¿cuál es el nombre de la quinta hija?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Rosa! El patrón de vocales (A, E, I, O) te distrae, pero la pregunta ya mencionó que la primera hija es Rosa.`,
                ecuacion: `Quinta hija = __ (1=Lulu, 2=Rosa, 3=Lala, 4=Otro)`,
                ecuacionValores: [2],
                opciones: [2, 1, 3, 4]
            };
        }
    },
    {
        id: "dias_sin_nombre",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        generar: () => {
            const respuesta = 3;

            return {
                texto: `Nombra tres días consecutivos sin usar las palabras Lunes, Martes, Miércoles, Jueves, Viernes, Sábado o Domingo.`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Ayer, hoy y mañana! Estos son días consecutivos pero no pertenecen a la semana tradicional, sino a referencias temporales relativas.`,
                ecuacion: `Días consecutivos = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, 2, 7]
            };
        }
    },
    // Problemas de lógica y pensamiento lateral - Nivel 4
    {
        id: "arca_moises",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
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
    // Problemas de lógica y pensamiento lateral - Nivel 5
    {
        id: "pastor_lobo_oveja",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        generar: () => {
            const respuesta = 6; // Número de viajes/movimientos

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
        generar: () => {
            const hora = [3, 6, 9][Math.floor(Math.random() * 3)]; // Horas especiales en el espejo
            const hora_real = 12 - hora; // Fórmula de inversión de espejo
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
        id: "peces_ahogados",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const total_peces = 10;
            const respuesta = 10; // Los peces no se ahogan en el agua

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
        generar: () => {
            const respuesta = 0; // Los gallos no ponen huevos

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
        generar: () => {
            const patas_mesa = 4;
            const respuesta = 4; // Solo las patas de la mesa tocan el suelo

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
        generar: () => {
            const inicial = 3;
            const regaladas = 2;
            const respuesta = inicial - regaladas;

            return {
                texto: `Tienes una cesta con ${inicial} peras. Si me das ${regaladas} peras, ¿cuántas peras tienes tú ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `Después de dar ${regaladas} peras de tu cesta de ${inicial}, te quedan: ${inicial} - ${regaladas} = ${respuesta} pera(s).`,
                ecuacion: `${inicial} - ${regaladas} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, regaladas, inicial, inicial + regaladas]
            };
        }
    },
    {
        id: "nombre_tercer_hijo",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            return {
                texto: `La mamá de Juan tiene 3 hijos. El primero se llama Primero, el segundo se llama Segundo. ¿Cómo se llama el tercer hijo?`,
                respuestaCorrecta: "Juan",
                tipoRespuesta: "opcion_multiple",
                explicacion: `¡Trampa desactivada! El patrón numérico "Primero, Segundo, Tercero" intenta engañarte. Pero la pregunta dice "la mamá de Juan", así que Juan es el tercer hijo.`,
                opciones: [
                    { id: "Juan", texto: "Juan", icon: "👦" },
                    { id: "Primero", texto: "Primero", icon: "1️⃣" },
                    { id: "Segundo", texto: "Segundo", icon: "2️⃣" },
                    { id: "Tercero", texto: "Tercero", icon: "3️⃣" }
                ]
            };
        }
    },
    {
        id: "hermanos_juan",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['explorador', 'arquitecto'],
        generar: () => {
            return {
                texto: `Juan tiene 3 hermanas. Cada una de sus hermanas tiene un solo hermano varón. ¿Cuántos hermanos varones tiene Juan en total?`,
                respuestaCorrecta: 0,
                explicacion: `¡Truco activado! El cerebro quiere sumar, pero la respuesta es 0. El "único hermano varón" de todas sus hermanas es Juan mismo. Juan no tiene más hermanos varones.`,
                ecuacion: `Hermanos de Juan = __`,
                ecuacionValores: [0],
                tipoRespuesta: "numero",
                opciones: [0, 3, 1, 4]
            };
        }
    },
    {
        id: "avion_frontera",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
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
                tipoRespuesta: "numero",
                opciones: [0, 1, 2, -1]
            };
        }
    },
    {
        id: "velas_viento",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['cientifico'],
        generar: () => {
            const velas_iniciales = 10;
            const velas_apagadas = 3;
            const velas_encendidas = velas_iniciales - velas_apagadas;
            const respuesta = velas_apagadas; // Las encendidas se consumen completamente

            return {
                texto: `Hay ${velas_iniciales} velas encendidas en una mesa. Una corriente de aire apaga ${velas_apagadas} de ellas. Si nadie las vuelve a encender, ¿cuántas velas quedan al día siguiente?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Pensamiento temporal! Las ${velas_encendidas} velas que se quedaron encendidas se consumirán completamente durante la noche. Solo quedarán las ${velas_apagadas} velas apagadas, que se mantienen intactas.`,
                ecuacion: `Velas restantes = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, velas_encendidas, velas_iniciales, velas_encendidas + velas_apagadas]
            };
        }
    },
    {
        id: "peso_manzanas",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
        generar: () => {
            const peso_llena = 15;
            const peso_caja = 2;
            const peso_manzanas = peso_llena - peso_caja; // 13 kg
            const peso_manzanas_mitad = peso_manzanas / 2; // 6.5 kg
            const respuesta = peso_manzanas_mitad + peso_caja; // 8.5 kg

            return {
                texto: `Una caja llena de manzanas pesa ${peso_llena} kg. La caja vacía pesa ${peso_caja} kg. Si te comes la mitad de las manzanas, ¿cuánto pesa la caja ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `Paso 1: Peso de las manzanas = ${peso_llena} - ${peso_caja} = ${peso_manzanas} kg. Paso 2: Mitad de manzanas = ${peso_manzanas} ÷ 2 = ${peso_manzanas_mitad} kg. Paso 3: Caja + manzanas restantes = ${peso_caja} + ${peso_manzanas_mitad} = ${respuesta} kg`,
                ecuacion: `((${peso_llena} - ${peso_caja}) ÷ 2) + ${peso_caja} = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, peso_manzanas_mitad, peso_llena / 2, peso_manzanas]
            };
        }
    },
    {
        id: "pajaro_cazador",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador', 'cientifico'],
        generar: () => {
            const pajaro_inicial = 5;
            const pajaro_herido = 1;
            const respuesta = 0; // El herido cae y los otros salen volando

            return {
                texto: `Hay ${pajaro_inicial} pájaros en una rama. Un cazador dispara y acierta a uno. ¿Cuántos pájaros quedan en la rama?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Realismo lógico! El pájaro herido cae al suelo y los otros ${pajaro_inicial - pajaro_herido} pájaros salen volando asustados por el disparo. Resultado: 0 pájaros en la rama.`,
                ecuacion: `Pájaros en rama = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, pajaro_inicial - pajaro_herido, pajaro_herido, pajaro_inicial]
            };
        }
    },
    {
        id: "ladrillo_peso",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['arquitecto', 'cientifico'],
        generar: () => {
            // Un ladrillo pesa 1 kg más medio ladrillo
            // x = 1 + x/2
            // x/2 = 1
            // x = 2
            // Ladrillo y medio = 2 + 1 = 3
            const peso_ladrillo = 2;
            const respuesta = 3;

            return {
                texto: `Un ladrillo pesa 1 kg más medio ladrillo. ¿Cuánto pesan un ladrillo y medio?`,
                respuestaCorrecta: respuesta,
                explicacion: `Álgebra: Si un ladrillo (x) = 1 + x/2, entonces x/2 = 1, por lo tanto x = 2 kg. Un ladrillo y medio = 2 + 1 = 3 kg. La trampa común es responder 1.5 kg sin resolver la ecuación.`,
                ecuacion: `x = 1 + (x/2) → x = __; Respuesta = 1.5x = __`,
                ecuacionValores: [2, 3],
                tipoRespuesta: "numero",
                opciones: [respuesta, 1.5, 2, 2.5]
            };
        }
    },
    {
        id: "caracol_pozo",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        generar: () => {
            const profundidad = 10;
            const sube_dia = 3;
            const resbala_noche = 2;
            const progreso_neto = sube_dia - resbala_noche;

            // En el día 8: comienza a 7m, sube 3m = 10m (sale sin resbalar)
            const dias = 8;

            return {
                texto: `Un caracol está en el fondo de un pozo de ${profundidad} metros. Durante el día sube ${sube_dia} metros, pero por la noche resbala ${resbala_noche} metros. ¿En cuántos días saldrá del pozo?`,
                respuestaCorrecta: dias,
                explicacion: `¡Lógica secuencial! El cálculo instintivo es ${profundidad}/${progreso_neto}=${profundidad / progreso_neto} días. Pero en el día ${dias}, el caracol comienza a ${profundidad - sube_dia}m, sube ${sube_dia}m y llega a ${profundidad}m, ¡por lo que sale y no resbala esa noche!`,
                ecuacion: `Día ${dias}: ${profundidad - sube_dia}m + ${sube_dia}m = ${profundidad}m (¡SALIDA!)`,
                ecuacionValores: [dias],
                tipoRespuesta: "numero",
                opciones: [dias, 10, 9, 7]
            };
        }
    },
    {
        id: "edad_hermana",
        tipo: "logica",
        nivelMin: 4,
        categorias: ['explorador', 'arquitecto'],
        generar: () => {
            const edad_pasada = 6;
            const hermana_edad_pasada = edad_pasada / 2; // 3 años
            const diferencia_edad = edad_pasada - hermana_edad_pasada; // 3 años
            const edad_actual = 70;
            const respuesta = edad_actual - diferencia_edad;

            return {
                texto: `Cuando yo tenía ${edad_pasada} años, mi hermana tenía la mitad de mi edad. Ahora que tengo ${edad_actual} años, ¿cuántos años tiene mi hermana?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Relación variable constante! La mente busca la proporción "mitad" (${edad_actual}/2=${edad_actual / 2}), pero la diferencia de edad es constante. Si hace tiempo había ${diferencia_edad} años de diferencia, ahora sigue habiendo ${diferencia_edad} años. Respuesta: ${edad_actual} - ${diferencia_edad} = ${respuesta} años.`,
                ecuacion: `Diferencia de edad = ${edad_pasada} - ${hermana_edad_pasada} = ${diferencia_edad}; Edad hermana = ${edad_actual} - ${diferencia_edad} = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, Math.floor(edad_actual / 2), edad_actual - 3, edad_actual - 5]
            };
        }
    },
    {
        id: "contar_digito_siete",
        tipo: "logica",
        nivelMin: 5,
        categorias: ['cientifico'],
        generar: () => {
            const total_paginas = 100;
            const digito_buscado = 7;

            // Contar 7s en unidades: 7,17,27,37,47,57,67,77,87,97 = 10
            // Contar 7s en decenas: 70,71,72,73,74,75,76,77,78,79 = 10
            // Total = 20 (nota que 77 cuenta dos veces)
            const respuesta = 20;

            return {
                texto: `Estás numerando las páginas de un libro que tiene exactamente ${total_paginas} páginas. ¿Cuántas veces escribirás el dígito '${digito_buscado}'?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Patrones numéricos! Muchos solo cuentan los 7s en unidades (7,17,27...${total_paginas - 30}) = 10. Pero olvidan los 7s en la decena 70-79 (10 más). El número 77 tiene dos 7s. Total: 10 + 10 = ${respuesta} veces.`,
                ecuacion: `Unidades: 7,17,27...97 = __; Decenas: 70-79 = __; Total = __`,
                ecuacionValores: [10, 10, respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, 10, 11, 19]
            };
        }
    },
    {
        id: "bate_pelota",
        tipo: "matematico",
        nivelMin: 4,
        categorias: ['cientifico'],
        generar: () => {
            const total_costo = 1.10;
            const diferencia = 1.00;

            // bate + pelota = 1.10
            // bate = pelota + 1
            // (pelota + 1) + pelota = 1.10
            // 2*pelota = 0.10
            // pelota = 0.05
            const respuesta = 0.05;
            const bate = total_costo - respuesta;

            return {
                texto: `Un bate y una pelota cuestan juntos ${total_costo.toFixed(2)}€. El bate cuesta ${diferencia.toFixed(2)}€ más que la pelota. ¿Cuánto cuesta la pelota?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Ecuación de diferencia! La respuesta automática es 0.10€, pero si la pelota costara 0.10€, el bate costaría 1.10€, y el total sería 1.20€. Correctamente: Si pelota = x, entonces bate = x + 1. x + (x + 1) = 1.10 → 2x = 0.10 → x = 0.05€`,
                ecuacion: `x + (x + 1) = ${total_costo.toFixed(2)} → x = __€`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, 0.10, 0.55, 1.05]
            };
        }
    },
    {
        id: "velas_pastel",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const velas_iniciales = 6;
            const velas_apagadas = 2;
            const respuesta = velas_iniciales; // Siguen en el pastel aunque estén apagadas
            
            return {
                texto: `En un pastel de cumpleaños hay ${velas_iniciales} velas encendidas. Si soplas y apagas ${velas_apagadas} velas, ¿cuántas velas quedan en el pastel?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Permanencia de objetos! Aunque estén apagadas, las velas siguen estando físicamente sobre el pastel. Velas apagadas: ${velas_apagadas}, Velas encendidas: ${velas_iniciales - velas_apagadas}, Total en el pastel: ${respuesta}`,
                ecuacion: `${velas_apagadas} (apagadas) + ${velas_iniciales - velas_apagadas} (encendidas) = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, velas_iniciales - velas_apagadas, velas_apagadas, 0]
            };
        }
    },
    {
        id: "perro_hermanos",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const hermanos = 3;
            const respuesta = 1; // Un perro compartido, no uno para cada hermano
            
            return {
                texto: `${hermanos} hermanos (Juan, Luis y Ana) tienen un perro juntos. ¿Cuántos perros hay en total en la casa?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Lectura cuidadosa! El texto dice que tienen UN perro "juntos", no que cada uno tenga el suyo. Respuesta: ${respuesta} perro compartido.`,
                ecuacion: `${hermanos} hermanos × 0 (cada uno) + 1 (compartido) = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, hermanos, hermanos + 1, 0]
            };
        }
    },
    {
        id: "naranjas_llevas",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const naranjas_mesa = 5;
            const naranjas_coges = 3;
            const respuesta = naranjas_coges; // Las que TÚ tienes, no las que quedan
            
            return {
                texto: `Hay ${naranjas_mesa} naranjas en una mesa. Si tú vas y quitas ${naranjas_coges} naranjas, ¿cuántas naranjas tienes tú ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Atención a la pregunta! No pregunta cuántas quedan en la mesa, sino cuántas TIENES TÚ. Respuesta: Las ${naranjas_coges} que acabas de coger.`,
                ecuacion: `Naranjas que tienes = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, naranjas_mesa - naranjas_coges, naranjas_mesa, 0]
            };
        }
    },
    {
        id: "paraguas_magico",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const ninos = 4;
            const respuesta = 0; // No está lloviendo
            
            return {
                texto: `${ninos} niños intentan entrar bajo un paraguas muy pequeño, pero ninguno se moja nada de nada. ¿Cuánta agua llueve?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Usa el contexto! El cerebro busca una explicación física compleja, pero la respuesta es simple: no está lloviendo. Por eso nadie se moja.`,
                ecuacion: `Lluvia = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, 1, ninos, 10]
            };
        }
    },
    {
        id: "patas_pajaro",
        tipo: "logica",
        nivelMin: 1,
        categorias: ['explorador'],
        generar: () => {
            const patas_pajaro = 2;
            const respuesta = patas_pajaro; // Sigue teniendo 2 patas aunque una esté escondida
            
            return {
                texto: `Un pájaro tiene ${patas_pajaro} patas. Si se apoya en una rama solo con una pata y esconde la otra entre sus plumas, ¿cuántas patas tiene el pájaro ahora?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Permanencia de objetos! Aunque no se vea, la pata sigue ahí. El pájaro sigue teniendo ${patas_pajaro} patas. Visible: 1, Escondida: 1, Total: ${respuesta}.`,
                ecuacion: `1 (visible) + 1 (escondida) = __`,
                ecuacionValores: [respuesta],
                tipoRespuesta: "numero",
                opciones: [respuesta, 1, 3, 0]
            };
        }
    }
];


