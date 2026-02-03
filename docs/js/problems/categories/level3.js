/**
 * Nivel 3: Intermedios Avanzados
 * Problemas de lógica con trampas complejas
 * Para edades 11-12 años
 */

export const level3Problems = [
    {
        id: "manzanas_rotas_logica",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "manzanas_rotas_logica",
        generar: () => {
            const n1 = Math.floor(Math.random() * 10) + 5;
            const n2 = Math.floor(Math.random() * 4) + 1;
            const precio = 2;
            const nombres = ["Juan", "Pedro", "Luis", "Ana"];
            const p1 = nombres[Math.floor(Math.random() * 2)];
            const p2 = nombres[Math.floor(Math.random() * 2) + 2];

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
        id: "tren_electrico",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "tren_electrico",
        generar: () => {
            const velocidad_tren = Math.floor(Math.random() * 50) + 80;
            const velocidad_viento = Math.floor(Math.random() * 40) + 30;
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
        id: "despertador_antiguo",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "despertador_antiguo",
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
        id: "padre_rosa",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto'],
        i18n: "padre_rosa",
        generar: () => {
            const respuesta = 2;

            return {
                texto: `El padre de Rosa tiene 5 hijas: Lala, Lele, Lili, Lolo y... ¿cuál es el nombre de la quinta hija?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Rosa! El patrón de vocales (A, E, I, O) te distrae, pero la pregunta ya mencionó que la primera hija es Rosa.`,
                ecuacion: `Quinta hija = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, 1, 3, 4]
            };
        }
    },
    {
        id: "dias_sin_nombre",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "dias_sin_nombre",
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
    {
        id: "tarta_horno",
        tipo: "matematico",
        nivelMin: 3,
        categorias: ['explorador'],
        i18n: "tarta_horno",
        generar: () => {
            const hora_inicio = Math.floor(Math.random() * 9) + 10;
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
        id: "ascensor_loco",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "ascensor_loco",
        generar: () => {
            const inicio = 4;
            const sube1 = 5;
            const baja = 2;
            const sube2 = 3;
            const respuesta = inicio + sube1 - baja + sube2;

            return {
                texto: `Vives en el piso ${inicio}. Subes ${sube1} pisos para visitar a un amigo, luego bajas ${baja} para ir a la lavandería y finalmente subes otros ${sube2} para ir a la terraza. ¿En qué piso está la terraza?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Ejercicio de memoria secuencial! Debes seguir los movimientos: piso ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. El error común es olvidar el piso de origen.`,
                ecuacion: `${inicio} + ${sube1} - ${baja} + ${sube2} = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, inicio + sube1, inicio + sube1 + sube2, 12]
            };
        }
    },
    {
        id: "hermanos_balon",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "hermanos_balon",
        generar: () => {
            const hermanas = 3;
            const hermanos = 1;
            const respuesta = hermanas + hermanos;

            return {
                texto: `En una familia hay ${hermanas} hermanas. Cada hermana tiene un hermano varón. ¿Cuántas personas forman el grupo de hermanos en total?`,
                respuestaCorrecta: respuesta,
                explicacion: `¡Atención al truco! El cerebro tiende a sumar ${hermanas} + ${hermanas} = ${hermanas * 2}. Pero el hermano varón es el MISMO para las tres niñas. Total: ${hermanas} hermanas + ${hermanos} hermano = ${respuesta} personas.`,
                ecuacion: `${hermanas} hermanas + ${hermanos} hermano = __`,
                ecuacionValores: [respuesta],
                opciones: [respuesta, hermanas * 2, hermanas, hermanas + 2]
            };
        }
    },
    {
        id: "libro_aventuras",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "libro_aventuras",
        generar: () => {
            const paginas_totales = 100;
            const paginas_diarias = 10;
            const dias = paginas_totales / paginas_diarias;
            const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            const diaInicio = 0; // Lunes
            const diaFin = (diaInicio + dias - 1) % 7;
            const semana = Math.floor((diaInicio + dias - 1) / 7);

            return {
                texto: `Un libro tiene ${paginas_totales} páginas. Si lees ${paginas_diarias} páginas cada día, empezando un ${diasSemana[diaInicio]}, ¿qué día de la semana terminarás el libro?`,
                respuestaCorrecta: diasSemana[diaFin],
                explicacion: `Calcula los días: ${paginas_totales} / ${paginas_diarias} = ${dias} días. Luego cuenta desde el ${diasSemana[diaInicio]}: el día ${dias} es un ${diasSemana[diaFin]}${semana > 0 ? ` de la semana siguiente` : ''}.`,
                ecuacion: `${paginas_totales} / ${paginas_diarias} = __`,
                ecuacionValores: [dias],
                opciones: [diasSemana[diaFin], diasSemana[(diaFin + 1) % 7], diasSemana[(diaFin - 1 + 7) % 7], diasSemana[(diaFin + 2) % 7]]
            };
        }
    },
    {
        id: "caracoles_carrera",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "caracoles_carrera",
        generar: () => {
            const velocidad = 2; // metros por hora
            const distancia = 10; // metros
            const descanso = 0.5; // horas
            const tiempoSinDescanso = distancia / velocidad;
            const tiempoTotal = tiempoSinDescanso + descanso;
            const minutos = tiempoTotal * 60;

            return {
                texto: `Si un caracol recorre ${velocidad} metros en una hora, ¿cuánto tiempo tardará en recorrer ${distancia} metros si se para a descansar media hora a mitad del camino?`,
                respuestaCorrecta: `${tiempoTotal} horas`,
                explicacion: `El cálculo base es ${distancia} / ${velocidad} = ${tiempoSinDescanso} horas. Pero no olvides el tiempo de descanso: ${tiempoSinDescanso} + ${descanso} = ${tiempoTotal} horas (${minutos} minutos).`,
                ecuacion: `(${distancia} / ${velocidad}) + ${descanso} = __`,
                ecuacionValores: [tiempoTotal, minutos],
                opciones: [`${tiempoTotal} horas`, `${tiempoSinDescanso} horas`, `${tiempoTotal + 1} horas`, `${tiempoSinDescanso + 1} horas`]
            };
        }
    },
    {
        id: "peso_fruta",
        tipo: "logica",
        nivelMin: 3,
        categorias: ['arquitecto', 'cientifico'],
        i18n: "peso_fruta",
        generar: () => {
            const pesoDeManzana = 200; // gramos
            const pinasParaManzanas = 3;
            const numeroDePinas = 2;
            const pesoDePina = pinasParaManzanas * pesoDeManzana;
            const pesoTotal = pesoDePina * numeroDePinas;

            return {
                texto: `Una piña pesa lo mismo que ${pinasParaManzanas} manzanas. Si una manzana pesa ${pesoDeManzana} gramos, ¿cuánto pesará una cesta con ${numeroDePinas} piñas si la cesta vacía no pesa nada?`,
                respuestaCorrecta: pesoTotal,
                explicacion: `Es un problema de sustitución. Primero halla el peso de la piña: ${pinasParaManzanas} × ${pesoDeManzana} = ${pesoDePina} gramos. Luego multiplica por ${numeroDePinas} piñas: ${pesoDePina} × ${numeroDePinas} = ${pesoTotal} gramos.`,
                ecuacion: `(${pinasParaManzanas} × ${pesoDeManzana}) × ${numeroDePinas} = __`,
                ecuacionValores: [pesoTotal],
                opciones: [pesoTotal, pesoDePina, pesoDeManzana * numeroDePinas, pesoDeManzana * pinasParaManzanas]
            };
        }
    }
];

export default level3Problems;
