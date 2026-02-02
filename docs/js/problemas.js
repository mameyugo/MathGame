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
                ecuacion: `${n2} x ${precio} = __\nDeuda de ${p1} = __`,
                ecuacionValores: [n2 * precio, 0],
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
    }
];