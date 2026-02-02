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
    }
];