/**
 * Traducciones de Problemas - ESPAÑOL (es)
 * Sistema modular de textos para todos los problemas
 */

export const problemsES = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `Compramos ${cantidad} gomas de borrar. Cada una cuesta ${precio}€. ¿Cuánto pagamos en total?`,
        explicacion: (cantidad, precio) => `Tienes que multiplicar el número de gomas por el precio: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `Si en una mano tengo 5 dedos y en dos manos tengo 10 dedos, ¿cuántos dedos hay en ${manos} manos?`,
        explicacion: (manos) => `¡Piensa bien! Cada mano tiene 5 dedos. Por lo tanto: 5 × ${manos} = ${manos * 5} dedos en total.`
    },
    peces_ahogados: {
        texto: () => `En un acuario hay 10 peces. Si 5 de ellos se ahogan, ¿cuántos peces quedan en el acuario?`,
        ecuacion: () => `Peces restantes = __`,
        explicacion: () => `¡Trampa desactivada! Los peces no se ahogan en el agua. Es su medio natural. Siguen quedando 10 peces.`
    },
    gallo_huevos: {
        texto: () => `Un gallo pone un huevo justo en la punta del tejado de un granero. Si el viento sopla hacia la derecha, ¿hacia qué lado caerá el huevo?`,
        explicacion: () => `¡Trampa desactivada! Los gallos no ponen huevos, son las gallinas las que ponen huevos. Por lo tanto, no hay huevo que caiga.`
    },
    patas_mesa_gato: {
        texto: (patas) => `Una mesa tiene ${patas} patas. Si un gato se sube encima de la mesa, ¿cuántas patas hay ahora tocando el suelo?`,
        explicacion: (patas) => `¡Trampa desactivada! Las patas del gato están sobre la mesa, no sobre el suelo. Solo las ${patas} patas de la mesa tocan el suelo.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `Tienes una cesta con ${inicial} peras. Si me das ${regaladas} peras, ¿cuántas peras tienes tú ahora?`,
        explicacion: (inicial, regaladas) => `Después de dar ${regaladas} peras de tu cesta de ${inicial}, te quedan: ${inicial} - ${regaladas} = ${inicial - regaladas} pera(s).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `En un pastel de cumpleaños hay ${iniciales} velas encendidas. Si soplas y apagas ${apagadas} velas, ¿cuántas velas quedan en el pastel?`,
        explicacion: (iniciales, apagadas) => `¡Permanencia de objetos! Aunque estén apagadas, las velas siguen estando físicamente sobre el pastel. Velas apagadas: ${apagadas}, Velas encendidas: ${iniciales - apagadas}, Total en el pastel: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} hermanos (Juan, Luis y Ana) tienen un perro juntos. ¿Cuántos perros hay en total en la casa?`,
        explicacion: () => `¡Lectura cuidadosa! El texto dice que tienen UN perro "juntos", no que cada uno tenga el suyo. Respuesta: 1 perro compartido.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `Hay ${mesa} naranjas en una mesa. Si vas y coges ${coges} naranjas, ¿cuántas naranjas tienes ahora?`,
        ecuacion: () => `Naranjas que tienes = __`,
        explicacion: (coges) => `¡Fíjate en la pregunta! No pregunta cuántas quedan en la mesa, sino cuántas TIENES TÚ. Respuesta: Las ${coges} que acabas de coger.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} niños intentan meterse debajo de un paraguas muy pequeño, pero ninguno se moja nada de nada. ¿Cuánto llueve?`,
        ecuacion: () => `Cantidad de lluvia = __`,
        explicacion: () => `¡Usa el contexto! El cerebro busca una explicación física compleja, pero la respuesta es simple: no está lloviendo. Por eso nadie se moja.`
    },
    patas_pajaro: {
        texto: () => `Un pájaro tiene 2 patas. Si se apoya en una rama solo con una pata y esconde la otra entre sus plumas, ¿cuántas patas tiene el pájaro ahora?`,
        explicacion: () => `¡Permanencia de objetos! Aunque no se vea, la pata sigue ahí. El pájaro sigue teniendo 2 patas. Visible: 1, Escondida: 1, Total: 2.`
    },
    carrera_posicion: {
        texto: () => `Estás en una carrera y adelantas al que va segundo. ¿En qué posición estás ahora?`,
        explicacion: () => `¡Trampa desactivada! Si adelantas al segundo, tú ocupas su lugar y pasas a ir segundo. El primero sigue siendo el primero.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `Vas a la papelería y compras ${articulo.toLowerCase()} que cuesta ${precio}€. Si pagas con un billete de ${billete}€, ¿cuánto dinero te tienen que devolver?`,
        explicacion: (precio, billete) => `Tienes que restar el precio del billete: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `Tienes ${queso} sándwiches de queso en tu mochila. Tu mamá llega y te guarda otros ${jamon} sándwiches de jamón. ¿Cuántos sándwiches tienes para merendar en total?`,
        explicacion: (queso, jamon) => `¡Junta todos los sándwiches: ${queso} + ${jamon} = ${queso + jamon} sándwiches! 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `En el recreo tenías ${inicial} canicas brillantes. Jugando con un amigo, pierdes ${perdidas} canicas. ¿Cuántas canicas te quedan en la bolsa?`,
        explicacion: (inicial, perdidas) => `¡Recuerda que perder es como restar! ${inicial} - ${perdidas} = ${inicial - perdidas} canicas. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Hoy te has portado muy bien y la profe te ha dado ${estrellas} pegatinas de estrellas doradas y ${corazones} pegatinas de corazones rojos. ¿Cuántas pegatinas tienes ahora en tu cuaderno?`,
        explicacion: (estrellas, corazones) => `¡Suma las estrellas y los corazones! ${estrellas} + ${corazones} = ${estrellas + corazones} pegatinas. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `En tu garaje de juguete hay ${coches} coches aparcados. De repente, ${salen} coches salen a toda velocidad para ir a una carrera. ¿Cuántos coches se han quedado en el garaje?`,
        explicacion: (coches, salen) => `Si ${salen} salen, hay menos coches dentro. ${coches} - ${salen} = ${coches - salen} coches. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `Hay una cesta con ${total} manzanas rojas. Al mirarlas de cerca, ves que ${gusanitos} tienen un gusanito y no se pueden comer. ¿Cuántas manzanas ricas quedan?`,
        explicacion: (total, gusanitos) => `¡Quita las del gusanito para saber cuántas quedan! ${total} - ${gusanitos} = ${total - gusanitos} manzanas ricas. 🍎`
    },
    // NUEVOS L1 ES
    l1_suma_juguetes: {
        texto: (coches, motos) => `Tienes ${coches} coches de juguete y te regalan ${motos} motos. ¿Cuántos vehículos tienes ahora en total?`,
        explicacion: (coches, motos) => `Suma los coches y las motos para saber el total: ${coches} + ${motos} = ${coches + motos}. 🚗🏍️`
    },
    l1_resta_caramelos: {
        texto: (inicial, comidos) => `En una bolsa hay ${inicial} caramelos. Si te comes ${comidos}, ¿cuántos quedan dentro de la bolsa?`,
        explicacion: (inicial, comidos) => `Si te los comes, ya no están en la bolsa. ${inicial} - ${comidos} = ${inicial - comidos}. 🍬`
    },
    l1_patas_bancos: {
        texto: (bancos) => `En el parque hay ${bancos} bancos para sentarse. Si cada banco tiene 4 patas, ¿cuántas patas hay en total?`,
        explicacion: (bancos) => `Cuenta 4 patas por cada banco: ${bancos} x 4 = ${bancos * 4}. 🪑`
    },
    l1_autobus_bajan: {
        texto: (total, bajan) => `En un autobús van ${total} personas. En la parada bajan ${bajan} personas. ¿Cuántas personas quedan en el autobús?`,
        explicacion: (total, bajan) => `Resta a las personas que se han bajado: ${total} - ${bajan} = ${total - bajan}. 🚌`
    },
    l1_total_libros: {
        texto: (rojos, azules) => `En un estante hay ${rojos} libros rojos y ${azules} libros azules. ¿Cuántos libros hay por todo?`,
        explicacion: (rojos, azules) => `Junta los libros rojos y azules para saber el total: ${rojos} + ${azules} = ${rojos + azules}. 📚`
    },
    l1_conductor_nombre: {
        opciones: ["Yo", "Juan", "El autobús", "Nadie"],
        texto: (pasajeros) => `Imagina que conduces un autobús con ${pasajeros} pasajeros. ¿Quién es el conductor?`,
        ecuacion: () => `Conductor = __ (0=Yo, 1=Juan, 2=Autobús)`,
        explicacion: () => `¡El conductor eres TÚ! El problema dice "Imagina que conduces...". 🚌`
    },
    l1_agujero_profundo: {
        texto: (metros) => `Haces un agujero de ${metros} metros de profundidad en la arena. ¿Cuánta tierra hay dentro del agujero?`,
        explicacion: () => `¡Es un agujero! Si tuviera tierra dentro, no sería un agujero de esa profundidad. Está vacío (0).`
    },
    l1_caja_vacia: {
        texto: () => `¿Cuántos melones caben en una caja vacía?`,
        explicacion: () => `Solo cabe 1. Después de meter el primero, la caja ya no está vacía. 📦`
    },
    l1_dia_siguiente: {
        dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        texto: function (ayer, manana) {
            return `Si ayer fue ${this.dias[ayer]}, ¿qué día será mañana?`;
        },
        explicacion: function (ayer, manana) {
            const hoy = (ayer + 1) % 7;
            return `Si ayer fue ${this.dias[ayer]}, hoy es ${this.dias[hoy]}. Y si hoy es ${this.dias[hoy]}, ¡mañana será ${this.dias[manana]}!`;
        },
        opciones: function (indice) {
            return this.dias[indice];
        }
    },
    l1_hijo_padre: {
        texto: () => `Tomás es hijo de mi padre, pero no es mi hermano. ¿Cuántos hermanos tengo?`,
        explicacion: () => `¡Tomás soy YO! Si es hijo de mi padre y no es mi hermano, tengo que ser yo mismo. (0 hermanos).`
    },

    // LEVEL 2
    l2_suma_resta_dinero: {
        texto: (inicial, gasto, encontrado) => `Tenías ${inicial}€, gastaste ${gasto}€ en un libro y luego te encontraste ${encontrado}€. ¿Cuánto dinero tienes ahora?`,
        explicacion: (inicial, gasto, encontrado) => `Resta lo gastado y suma lo encontrado: ${inicial} - ${gasto} + ${encontrado} = ${inicial - gasto + encontrado}. 💶`
    },
    l2_patas_animales: {
        texto: (perros, gatos) => `En una granja hay ${perros} perros y ${gatos} gatos. ¿Cuántas patas hay en total?`,
        explicacion: (perros, gatos) => `Suma los animales (${perros} + ${gatos}) y multiplica por 4 patas: (${perros + gatos}) x 4 = ${(perros + gatos) * 4}. 🐾`
    },
    l2_doble_cromos: {
        texto: (tuyos) => `Tienes ${tuyos} cromos y tu amigo tiene el doble que tú. ¿Cuántos cromos tiene tu amigo?`,
        explicacion: (tuyos) => `El doble significa multiplicar por 2: ${tuyos} x 2 = ${tuyos * 2}.`
    },
    l2_mitad_galletas: {
        texto: (total) => `Tienes ${total} galletas y te comes la mitad. ¿Cuántas galletas quedan?`,
        explicacion: (total) => `La mitad es dividir por 2: ${total} / 2 = ${total / 2}. 🍪`
    },
    l2_bolsas_caramelos: {
        texto: (bolsas, caramelos) => `Tienes ${bolsas} bolsas con ${caramelos} caramelos en cada una. ¿Cuántos caramelos tienes en total?`,
        explicacion: (bolsas, caramelos) => `Multiplica bolsas por caramelos: ${bolsas} x ${caramelos} = ${bolsas * caramelos}. 🍬`
    },
    l2_secuencia_simple: {
        texto: (n1, n2, n3, n4) => `¿Qué número sigue en la serie? ${n1}, ${n2}, ${n3}, ${n4}...`,
        explicacion: (n1, n2, n3, n4) => `Fíjate en cuánto aumenta cada número. ¡Ese es el salto!`
    },
    l2_hermana_nosoy: {
        opciones: ["Hermana", "Hermano", "Tía", "Prima"],
        texto: () => `Si soy tu hermano, pero tú no eres mi hermano, ¿qué eres?`,
        explicacion: () => `¡Eres mi HERMANA! Si no eres mi hermano (chico), tienes que ser chica.`
    },
    l2_mapa_ciudades: {
        opciones: ["Mapa", "Libro", "Sueño", "Televisión"],
        texto: () => `Tengo ciudades pero no casas, montañas pero no árboles, y agua pero no peces. ¿Qué soy?`,
        explicacion: () => `Un mapa. Representa todo eso sin tenerlo físicamente.`
    },
    l2_esponja_agua: {
        opciones: ["Esponja", "Cubo", "Red", "Botella"],
        texto: () => `Estoy llena de agujeros pero aun así puedo retener el agua. ¿Qué soy?`,
        explicacion: () => `Una esponja. Sus poros (agujeros) absorben y mantienen el agua.`
    },
    l2_romper_silencio: {
        opciones: ["El Silencio", "Un Cristal", "Una Promesa", "Un Espejo"],
        texto: () => `Es tan frágil que si dices su nombre, se rompe. ¿Qué es?`,
        explicacion: () => `El Silencio. Al hablar (decir su nombre), dejas de estar en silencio.`
    },

    pastor_ovejas: {
        texto: (totales, vivas) => `Un pastor tiene ${totales} ovejas. Un rayo cae y mueren todas menos ${vivas}. ¿Cuántas ovejas le quedan?`,
        ecuacion: () => `Le quedan = __`,
        explicacion: (totales, vivas) => `¡Trampa desactivada! El problema dice "todas menos ${vivas}", así que le quedan exactamente ${vivas} ovejas. No es ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Si en un año hay meses que tienen 30 días y otros tienen 31, ¿cuántos meses tienen 28 días?`,
        ecuacion: () => `Meses con 28+ días = __`,
        explicacion: () => `¡Trampa desactivada! La pregunta no es cuántos meses tienen SOLO 28 días, sino cuántos meses TIENEN 28 días (entre otros). Todos los meses del año tienen al menos 28 días, incluso febrero. La respuesta es 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `En la biblioteca de clase hay ${inicial} libros. El lunes se prestaron ${prestados} libros, pero el viernes se devolvieron ${devueltos}. ¿Cuántos libros hay ahora?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `Tienes que restar los prestados y sumar los devueltos: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `Un autobús sale de la ciudad a las ${salida}:00 y llega a su destino a las ${llegada}:30. ¿Cuánto tiempo ha durado el viaje?`,
        explicacion: (salida, llegada) => `Desde las ${salida}:00 hasta las ${llegada}:30 hay ${llegada - salida} horas y 30 minutos.`
    },
    la_cerilla: {
        texto: () => `Entras en una habitación oscura y fría. Solo tienes una cerilla. Hay una estufa de carbón, una lámpara de aceite y una vela. ¿Qué enciendes primero?`,
        ecuacion: () => `Primero enciendes = __ (1=cerilla, 2=estufa, 3=lámpara)`,
        explicacion: () => `¡La cerilla, por supuesto! Sin encender la cerilla no puedes encender nada más.`
    },
    peso_algodón: {
        texto: () => `¿Qué pesa más? ¿Un kilo de hierro o un kilo de algodón?`,
        explicacion: () => `¡Pesan lo mismo! Un kilo es un kilo, sin importar el material. La confusión viene de que el hierro es más denso, pero estamos hablando del mismo peso.`
    },

    // LEVEL 3
    // LEVEL 3
    l3_jerarquia_ops: {
        texto: (a, b, c) => `Resuelve: ${a} + ${b} × ${c} = ?`,
        explicacion: (a, b, c) => `¡Recuerda la jerarquía! Primero la multiplicación, luego la suma: ${b}×${c}=${b * c}, luego ${a}+${b * c}=${a + (b * c)}. No hagas (${a}+${b})×${c}.`
    },
    l3_horas_minutos: {
        texto: (horas, minutos) => `Una película dura ${horas} hora(s) y ${minutos} minutos. ¿Cuántos minutos dura en total?`,
        explicacion: (horas, minutos) => `1 hora son 60 minutos. ${horas}h × 60 = ${horas * 60} min. Suma los ${minutos} min restantes: ${horas * 60} + ${minutos} = ${(horas * 60) + minutos}. ⏱️`
    },
    l3_gramos_kilos: {
        texto: (kilos, gramos) => `Las comprado ${kilos}kg y ${gramos}g de harina. ¿Cuántos gramos son en total?`,
        explicacion: (kilos, gramos) => `1 kilo son 1000 gramos. ${kilos}kg = ${kilos * 1000}g. Total: ${kilos * 1000} + ${gramos} = ${(kilos * 1000) + gramos}g.`
    },
    l3_triple_suma: {
        texto: (base) => `Un bolígrafo cuesta ${base}€. Un cuaderno cuesta el triple. ¿Cuánto cuestan las dos cosas juntas?`,
        explicacion: (base) => `Cuaderno: ${base} x 3 = ${base * 3}€. Bolígrafo: ${base}€. Total: ${base * 3} + ${base} = ${base * 4}€.`
    },
    l3_dias_semanas: {
        texto: (semanas, dias) => `Te vas de vacaciones ${semanas} semanas y ${dias} días. ¿Cuántos días son en total?`,
        explicacion: (semanas, dias) => `Una semana tiene 7 días. ${semanas} semanas = ${semanas * 7} días. Suma ${dias}: ${semanas * 7} + ${dias} = ${(semanas * 7) + dias}.`
    },
    l3_logica_carrera: {
        opciones: ["Segundo", "Primero", "Penúltimo", "Último"],
        texto: () => `Vas en una carrera y adelantas al segundo. ¿En qué posición vas ahora?`,
        explicacion: () => `¡Segundo! Si pasas al que iba segundo, tú ocupas su lugar. No eres el primero todavía.`
    },
    l3_logica_meses_28: {
        opciones: ["12", "1", "6", "0"],
        texto: () => `¿Cuántos meses del año tienen 28 días?`,
        explicacion: () => `¡Todos los 12! Enero tiene 31 (así que tiene 28), Febrero tiene 28, etc. La pregunta no decía "sólo" 28.`
    },
    l3_logica_padre_hijo: {
        opciones: ["Madre", "Padre", "Abuelo", "Tío"],
        texto: () => `El padre de Juan le dice a su hijo: "Señale a esa señora, es la madre de su madre". ¿Quién es la señora para Juan?`,
        explicacion: () => `¡La Abuela! La madre de su madre es su abuela materna.`
    },
    l3_logica_paraguas: {
        opciones: ["No llovía", "Tenían paraguas", "Eran peces", "Corrían mucho"],
        texto: (personas) => `${personas} personas van bajo un mismo paraguas pequeño pero ninguna se moja. ¿Cómo es posible?`,
        explicacion: () => `¡Porque no llovía! El contexto sugiere lluvia, pero no lo dice explícitamente.`
    },
    l3_logica_globo: {
        opciones: ["Agujeros", "Aire", "Piedras", "Agua"],
        texto: () => `¿Qué puedes poner en un barril para que pese menos?`,
        explicacion: () => `¡Agujeros! Al quitar material para hacer el agujero, el barril pierde peso.`
    },

    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} tiene ${n1} manzanas. ${p2} tropieza con él, ${p1} cae y se le rompen ${n2}. Si cada manzana cuesta ${precio}€, ¿cuánto dinero le debe ${p1} a ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `¡Cuidado! Las manzanas son de ${p1}. Es ${p2} quien debería pagarle ${n2 * precio}€ a ${p1}.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Un tren eléctrico viaja hacia el Norte a ${velocidad_tren} km/h. Si el viento sopla hacia el Sur a ${velocidad_viento} km/h, ¿cuánto humo echa el tren?`,
        ecuacion: () => `Humo del tren = __`,
        explicacion: () => `¡Trampa desactivada! Es un tren ELÉCTRICO, no a vapor o diesel. Los trenes eléctricos no echan humo, alimentados directamente por electricidad. Todas esas velocidades son distractores. La respuesta es 0.`
    },
    despertador_antiguo: {
        texto: () => `Te vas a la cama a las 8 de la noche y pones un despertador de agujas (analógico) para que suene a las 9 de la mañana. ¿Cuántas horas habrás dormido cuando suene la alarma?`,
        explicacion: () => `¡Trampa! Los despertadores analógicos no distinguen entre AM y PM. Cuando la aguja llegue al 9, sonará a las 9 de la noche (1 hora después), no a las 9 de la mañana.`
    },
    padre_rosa: {
        texto: () => `El padre de Rosa tiene 5 hijas: Lala, Lele, Lili, Lolo y... ¿cuál es el nombre de la quinta hija?`,
        ecuacion: () => `Quinta hija = __`,
        explicacion: () => `¡Rosa! El patrón de vocales (A, E, I, O) te distrae, pero la pregunta ya mencionó que la primera hija es Rosa.`
    },
    dias_sin_nombre: {
        texto: () => `Nombra tres días consecutivos sin usar las palabras Lunes, Martes, Miércoles, Jueves, Viernes, Sábado o Domingo.`,
        ecuacion: () => `Días consecutivos = __`,
        explicacion: () => `¡Ayer, hoy y mañana! Estos son días consecutivos pero no pertenecen a la semana tradicional, sino a referencias temporales relativas.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `Mamá ha metido una tarta al horno a las ${inicio}:00. Si la tarta tarda ${duracion} minutos en hacerse, ¿a qué hora debemos sacarla?`;
        },
        explicacion: (duracion, fin) => `Sumamos ${duracion} minutos. Resultado: ${fin}.`
    },

    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `Vives en el piso ${inicio}. Subes ${sube1} pisos para visitar a un amigo, luego bajas ${baja} para ir a la lavandería y finalmente subes otros ${sube2} para ir a la terraza. ¿En qué piso está la terraza?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `¡Ejercicio de memoria secuencial! Debes seguir los movimientos: piso ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. El error común es olvidar el piso de origen.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `En una familia hay ${hermanas} hermanas. Cada hermana tiene un hermano varón. ¿Cuántas personas forman el grupo de hermanos en total?`,
        explicacion: (hermanas, hermanos, respuesta) => `¡Atención al truco! El cerebro tiende a sumar ${hermanas} + ${hermanas} = ${hermanas * 2}. Pero el hermano varón es el MISMO para las tres niñas. Total: ${hermanas} hermanas + ${hermanos} hermano = ${respuesta} personas.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `Un libro tiene ${paginas} páginas. Si lees ${paginas_diarias} páginas cada día, empezando un lunes, ¿qué día de la semana terminarás el libro?`,
        explicacion: (paginas, paginas_diarias, dias) => `Calcula los días: ${paginas} / ${paginas_diarias} = ${dias} días. Luego cuenta desde el lunes: el día ${dias} es un miércoles (de la semana siguiente).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `Si un caracol recorre ${velocidad} metros en una hora, ¿cuánto tiempo tardará en recorrer ${distancia} metros si se para a descansar media hora a mitad del camino?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `El cálculo base es ${distancia} / ${velocidad} = ${distancia / velocidad} horas. Pero no olvides el tiempo de descanso: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} horas (${tiempoTotal * 60} minutos).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `Una piña pesa lo mismo que ${pinasParaManzanas} manzanas. Si una manzana pesa ${pesoDeManzana} gramos, ¿cuánto pesará una cesta con ${numeroDePinas} piñas si la cesta vacía no pesa nada?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `Es un problema de sustitución. Primero halla el peso de la piña: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} gramos. Luego multiplica por ${numeroDePinas} piñas: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} gramos.`
    },

    // LEVEL 4
    // LEVEL 4
    l4_fracciones_visuales: {
        texto: (num) => `Tienes ${num} canicas. Si pierdes un cuarto (1/4) de ellas, ¿cuántas has perdido?`,
        explicacion: (respuesta) => `Un cuarto significa dividir por 4. La respuesta es ${respuesta}.`
    },
    l4_decimales_dinero: {
        texto: (p1, p2) => `Compras un helado por ${p1}€ y un refresco por ${p2}€. ¿Cuánto pagas en total?`,
        explicacion: (total) => `Suma los precios: ${total}€. Recuerda alinear la coma decimal.`
    },
    l4_ecuacion_simple: {
        texto: (suma, total) => `Pienso en un número. Si le sumo ${suma}, obtengo ${total}. ¿En qué número pensé?`,
        explicacion: (x, suma) => `Si al número le sumas ${suma}, te da ${x + suma}. Haz la operación inversa: resta ${suma}.`
    },
    l4_area_rectangulo: {
        texto: (ancho, alto) => `Una habitación mide ${ancho} metros de ancho y ${alto} metros de largo. ¿Cuál es su área en m²?`,
        explicacion: (area) => `El área es ancho x alto = ${area} m².`
    },
    l4_mitad_doble: {
        texto: (num) => `Si multiplicas ${num} por 2 y luego divides el resultado entre 2, ¿qué obtienes?`,
        explicacion: () => `¡El mismo número! Multiplicar y dividir por 2 se anulan entre sí.`
    },
    l4_hija_teresa: {
        opciones: ["Mi hija", "Mi madre", "Yo", "Mi abuela"],
        texto: () => `La hija de Teresa es la madre de mi hija. ¿Quién soy yo? (Soy una mujer)`,
        explicacion: () => `¡Soy Teresa! Si la hija de Teresa es la madre de mi hija, y yo soy la madre de mi hija... yo soy la hija de Teresa. O sea, soy Teresa.`
    },
    l4_auto_ruedas: {
        opciones: ["La de repuesto", "Delantera derecha", "Trasera izquierda", "Todas giran"],
        texto: () => `Un coche va por una carretera recta hacia el norte. ¿Qué rueda no gira?`,
        explicacion: () => `¡La rueda de repuesto! Las otras cuatro necesitan girar para avanzar.`
    },
    l4_meses_frio: {
        opciones: ["El termómetro", "El calendario", "La nieve", "El invierno"],
        texto: () => `Subo cuando hace calor y bajo cuando hace frío. ¿Qué soy?`,
        explicacion: () => `El termómetro! El líquido se dilata con el calor y sube.`
    },
    l4_pato_huevo: {
        opciones: ["Ninguno", "Uno", "Dos", "Tres"],
        texto: () => `Un pato pone un huevo justo en la frontera entre España y Francia. ¿A qué país pertenece el huevo?`,
        explicacion: () => `¡A ninguno! Los patos no ponen huevos, son las patas. (Y si fuera una pata, pertenecería al dueño de la pata).`
    },
    l4_quien_soy: {
        opciones: ["Tu nombre", "Tu edad", "Tu voz", "Tu sombra"],
        texto: () => `Es tuyo, pero los demás lo usan más que tú. ¿Qué es?`,
        explicacion: () => `¡Tu nombre! La gente te llama por él, tú raramente te llamas a ti mismo.`
    },

    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `En una habitación hay ${mesas} mesas de ${patas_m} patas cada una y ${sillas} sillas de ${patas_s} patas. ¿Cuántas patas hay en total si entran ${perros} perros?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `¡Trampa! Muchos olvidan contar las patas de los perros. Mesas: ${mesas}×${patas_m}=${mesas * patas_m}, Sillas: ${sillas}×${patas_s}=${sillas * patas_s}, Perros: ${perros}×${patas_p}=${perros * patas_p}. Total: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomás ha plantado un huerto con ${filas} filas de manzanos. Si en cada fila hay ${arboles} árboles, ¿cuántos árboles tiene en total?`,
        explicacion: (filas, arboles, total) => `Tienes que multiplicar el número de filas por los árboles en cada fila: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman ha entrenado durante ${horas} horas hoy. ¿Cuántos minutos ha estado entrenando en total?`,
        explicacion: (horas, total) => `Para convertir horas a minutos multiplicamos por 60: ${horas} × 60 = ${total} minutos.`
    },
    reloj_espejo: {
        texto: (hora) => `Miras un reloj de agujas a través de un espejo. Las agujas marcan las ${hora} en punto. ¿Qué hora es en realidad?`,
        explicacion: (hora, real) => `El espejo invierte horizontalmente. La posición del ${hora} se convierte en la del ${real}. La hora real es las ${real} en punto.`
    },
    arca_moises: {
        texto: () => `¿Cuántos animales de cada especie llevó Moisés en su arca?`,
        explicacion: () => `¡Cero! Fue Noé quien construyó el arca, no Moisés. Muchas personas responden "parejas" sin notar el error en el nombre.`
    },
    cesta_huevos: {
        texto: () => `En una cesta hay 6 huevos. 6 personas compran un huevo cada una y, al final, queda un huevo en la cesta. ¿Cuántos huevos quedan en la cesta?`,
        explicacion: () => `¡Uno! La última persona se llevó la cesta con el huevo dentro. No es que desapareciese un huevo, sino que viajó dentro de su contenedor.`
    },
    hermanos_juan: {
        texto: () => `Juan tiene 3 hermanas. Cada una de sus hermanas tiene un solo hermano varón. ¿Cuántos hermanos varones tiene Juan en total?`,
        explicacion: () => `¡Truco activado! El cerebro quiere sumar, pero la respuesta es 0. El "único hermano varón" de todas sus hermanas es Juan mismo. Juan no tiene más hermanos varones.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `Un avión se estrella justo en la frontera entre ${pais1} y ${pais2}. ¿En qué país entierran a los supervivientes?`,
        explicacion: () => `¡Trampa del lenguaje! ¡A los supervivientes NO se les entierra! El problema menciona "frontera" para distraerte, pero la clave es que son supervivientes.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `Hay ${iniciales} velas encendidas en una mesa. Una corriente de aire apaga ${apagadas} de ellas. Si nadie las vuelve a encender, ¿cuántas velas quedan al día siguiente?`,
        explicacion: (encendidas, apagadas) => `¡Pensamiento temporal! Las ${encendidas} velas que se quedaron encendidas se consumirán completamente durante la noche. Solo quedarán las ${apagadas} velas apagadas, que se mantienen intactas.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `Una caja llena de manzanas pesa ${llena} kg. La caja vacía pesa ${caja} kg. Si te comes la mitad de las manzanas, ¿cuánto pesa la caja ahora?`,
        ecuacion: (llena, caja) => `(${llena} - ${caja}) / 2 + ${caja} = __`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Paso 1: Peso de las manzanas = ${llena} - ${caja} = ${manzanas} kg. Paso 2: Mitad de manzanas = ${manzanas} ÷ 2 = ${mitad} kg. Paso 3: Caja + manzanas restantes = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Hay ${inicial} pájaros en una rama. Un cazador dispara y acierta a uno. ¿Cuántos pájaros quedan en la rama?`,
        ecuacion: () => `Pájaros en la rama = __`,
        explicacion: (inicial) => `¡Realismo lógico! El pájaro herido cae al suelo y los otros ${inicial - 1} pájaros salen volando asustados por el disparo. Resultado: 0 pájaros en la rama.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Un ladrillo pesa 1 kg más medio ladrillo. ¿Cuánto pesan un ladrillo y medio?`,
        ecuacion: () => `Peso = __`,
        explicacion: () => `Álgebra: Si un ladrillo (x) = 1 + x/2, entonces x/2 = 1, por lo tanto x = 2 kg. Un ladrillo y medio = 2 + 1 = 3 kg. La trampa común es responder 1.5 kg sin resolver la ecuación.`
    },

    // LEVEL 5
    // LEVEL 5
    l5_sistema_ecuaciones: {
        texto: (A, B) => `Resuelve el sistema: \n2x + y = ${A} \nx - y = ${B} \n¿Cuánto vale x?`,
        explicacion: (x) => `Suma las ecuaciones: (2x + y) + (x - y) = 3x. Luego 3x dividido por 3 da ${x}.`
    },
    l5_probabilidad_dados: {
        opciones: ["1/6", "1/12", "1/36", "5/36"],
        texto: () => `Lanzas dos dados de 6 caras. ¿Cuál es la probabilidad de que la suma sea 7?`,
        explicacion: () => `Hay 6 casos favorables (1+6, 2+5, 3+4, 4+3, 5+2, 6+1) y 36 totales. 6/36 simplificado es 1/6.`
    },
    l5_velocidad_relativa: {
        texto: (v1, v2, dist) => `Un tren sale de A a ${v1} km/h hacia B y otro de B a ${v2} km/h hacia A. Si hay ${dist} km, ¿cuánto tardan en cruzarse?`,
        explicacion: (t) => `Velocidad relativa = ${v1 + v2} km/h. Tiempo = ${dist} / ${v1 + v2} = ${t} horas.`
    },
    l5_combinatoria_saludos: {
        texto: (p) => `${p} amigos se reúnen y todos se estrechan la mano una vez. ¿Cuántos saludos hay?`,
        explicacion: (s) => `Fórmula: n(n-1)/2. Cada uno saluda a todos los demás, pero los saludos son recíprocos.`
    },
    l5_porcentaje_compuesto: {
        opciones: ["Baja un 1%", "Queda igual", "Sube un 1%", "Baja un 10%"],
        texto: () => `El precio de una acción sube un 10% y luego baja un 10%. ¿Cómo queda respecto al inicial?`,
        explicacion: () => `Ejemplo: 100 + 10% = 110. 110 - 10% = 99. Pierde un 1% respecto a 100.`
    },
    l5_logica_ascensor: {
        opciones: ["Es bajito", "Hace deporte", "Superstición", "Fallo técnico"],
        texto: () => `Un hombre vive en el 10º piso. Baja en ascensor, pero para subir solo llega al 7º y sube andando (salvo que llueva). ¿Por qué?`,
        explicacion: () => `¡Es una persona bajita! No llega al botón del 10. Si llueve, lleva paraguas y puede pulsarlo con él.`
    },
    l5_logica_meses: {
        // Opción única no requiere i18nOptions array
    },
    l5_logica_secuencia_letras: {
        opciones: ["D", "N", "O", "P"],
        texto: () => `¿Qué letra sigue? E, F, M, A, M, J, J, A, S, O, N ...`,
        explicacion: () => `¡D de Diciembre! Son las iniciales de los meses.`
    },
    l5_logica_padre_juan: {
        opciones: ["Juan", "Cuarto", "Lucas", "José"],
        texto: () => `El cuarto hijo del padre de Juan se llama... (Sus hermanos son Ene, Hene, Hine)`,
        explicacion: () => `¡Juan! La pregunta ya dice de quién es el padre.`
    },
    l5_logica_interruptores: {
        opciones: ["Por temperatura", "Mirando", "Al azar", "Imposible"],
        texto: () => `Hai 3 interruptores fuera de una sala cerrada. Solo uno enciende la luz. Entrando una sola vez, ¿cómo sabes cuál es?`,
        explicacion: () => `Tocas la bombilla. Enciendes el 1 un rato y apagas. Enciendes el 2 y entras. Si luce -> 2. Si no luce pero quema -> 1. Si fría -> 3.`
    },

    peso_ladrillo: {
        texto: (extra) => `Si un ladrillo pesa ${extra}kg más medio ladrillo, ¿cuánto pesa un ladrillo y medio?`,
        explicacion: (extra, ladrillo, resultado) => `¡Reto desactivado! Si X = peso de un ladrillo, entonces X = ${extra} + X/2, así que X = ${ladrillo}kg. Un ladrillo y medio pesa ${ladrillo} + ${ladrillo / 2} = ${resultado}kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `Un pastor debe cruzar un río con un lobo, una oveja y una col. En la barca solo caben él y una cosa más. Si deja al lobo con la oveja, el lobo se la come. Si deja a la oveja con la col, la oveja se la come. ¿Cuántos viajes necesita hacer como mínimo? (Cada ida o vuelta cuenta como 1 viaje)`,
        explicacion: () => `Solución: 1. Cruza la oveja. 2. Vuelve solo. 3. Cruza el lobo (y trae a la oveja de vuelta). 4. Cruza la col. 5. Vuelve solo. 6. Cruza la oveja. Total: 6 viajes.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `Miras un reloj de agujas a través de un espejo. Las agujas marcan las ${hora}:00. ¿Qué hora es en realidad?`,
        explicacion: (hora, real) => `El espejo invierte la posición horizontal del reloj. La fórmula es: hora real = 12 - hora en espejo. Entonces: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `Un caracol está en el fondo de un pozo de ${profundidad} metros. Durante el día sube ${sube} metros, pero por la noche resbala ${resbala} metros. ¿En cuántos días saldrá del pozo?`,
        explicacion: (profundidad, sube, resbala, dias) => `¡Lógica secuencial! El cálculo instintivo es ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} días. Pero en el día ${dias}, el caracol comienza a ${profundidad - sube}m, sube ${sube}m y llega a ${profundidad}m, ¡por lo que sale y no resbala esa noche!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `Cuando yo tenía ${edad_pasada} años, mi hermana tenía la mitad de mi edad. Ahora que tengo ${edad_actual} años, ¿cuántos años tiene mi hermana?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `¡Relación variable constante! La mente busca la proporción "mitad" (${edad_actual}/2=${edad_actual / 2}), pero la diferencia de edad es constante. Si hace tiempo había ${diferencia} años de diferencia, ahora sigue habiendo ${diferencia} años. Respuesta: ${edad_actual} - ${diferencia} = ${resultado} años.`
    },
    contar_digito_siete: {
        texto: (paginas) => `Estás numerando las páginas de un libro que tiene exactamente ${paginas} páginas. ¿Cuántas veces escribirás el dígito '7'?`,
        explicacion: () => `¡Patrones numéricos! Muchos solo cuentan los 7s en unidades (7,17,27...97) = 10. Pero olvidan los 7s en la decena 70-79 (10 más). El número 77 tiene dos 7s. Total: 10 + 10 = 20 veces.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `Un bate y una pelota cuestan juntos ${total_costo.toFixed(2)}€. El bate cuesta ${diferencia.toFixed(2)}€ más que la pelota. ¿Cuánto cuesta la pelota?`,
        explicacion: () => `¡Ecuación de diferencia! La respuesta automática es 0.10€, pero si la pelota costara 0.10€, el bate costaría 1.10€, y el total sería 1.20€. Correctamente: Si pelota = x, entonces bate = x + 1. x + (x + 1) = 1.10 → 2x = 0.10 → x = 0.05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Dos trenes están en vías opuestas a ${distancia} km de distancia y avanzan el uno hacia el otro a ${velocidad_t} km/h cada uno. Un pájaro sale del Tren A a ${velocidad_p} km/h hacia el Tren B, y cuando llega a este, vuelve al Tren A, y así sucesivamente hasta que los trenes chocan. ¿Qué distancia total habrá recorrido el pájaro?`,
        explicacion: (distancia, velocidad_t, velocidad_p, tiempo) => `¡La trampa del cálculo infinito! Muchos intentan calcular cada trayecto del pájaro (serie infinita). El truco es calcular el tiempo: los trenes tardarán ${tiempo} hora en encontrarse (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h de velocidad relativa). Si el pájaro vuela a ${velocidad_p} km/h durante esa hora, recorre exactamente ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Anteayer tenía ${edad_anteayer} años y el año que viene tendré ${edad_proximo}. ¿Cuántos años tengo hoy? (Sabiendo que hoy es 1 de enero)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `¡Lógica temporal! Parece imposible pasar de ${edad_anteayer} a ${edad_proximo} en poco tiempo. La solución: 1. Ayer (31 de diciembre) cumplí ${edad_hoy}. 2. Anteayer (30 de diciembre) aún tenía ${edad_anteayer}. 3. Este año cumpliré ${edad_hoy + 1} en diciembre. 4. El año que viene cumpliré ${edad_proximo}. Hoy: ${edad_hoy} años.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Un cubo de madera de ${tamano}×${tamano}×${tamano} cm se pinta de azul por fuera. Luego se corta en ${total} cubitos de 1×1×1 cm. ¿Cuántos de esos cubitos tendrán exactamente 2 caras pintadas de azul?`,
        explicacion: (tamano, total, respuesta, aristas) => `¡Visualización espacial! El cerebro intenta contar caras totales, pero el truco es saber que los cubos con 2 caras pintadas son los que están en las aristas (pero no en las esquinas, que tienen 3). Un cubo tiene ${aristas} aristas, y en este caso hay 1 cubito central por arista. Total: ${respuesta} cubitos.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `El corredor A vence al corredor B por ${ventaja} metros. El corredor B vence al corredor C por ${ventaja} metros. Si los tres corren ${distancia} metros, ¿por cuántos metros vence A a C?`,
        explicacion: (distancia, ventaja, velocidad_c_porcent, respuesta) => `¡La trampa de la suma! La respuesta intuitiva es ${ventaja + ventaja} metros (${ventaja}+${ventaja}). Pero las distancias son proporcionales a la velocidad. C corre al ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% de la velocidad de A. Ventaja real: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Si ${monos_ini} monos tardan ${tiempo_ini} minutos en comerse ${platanos_ini} plátanos, ¿cuánto tiempo tardarán ${monos_fin} monos en comerse ${platanos_fin} plátanos?`,
        explicacion: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `¡La trampa de la regla de tres! Se intenta aplicar proporción directa. Pero el ritmo es de 1 mono por plátano cada ${tiempo_ini} minutos. Si todos empiezan a comer a la vez, terminan a la vez. La relación monos:plátanos es la misma (1:1), así que el tiempo permanece constante: ${tiempo_ini} minutos.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `Un granjero tiene ${total} ovejas. Un día viene un lobo y se escapan todas menos ${quedan}. ¿Cuántas ovejas le quedan al granjero?`,
        explicacion: (total, quedan) => `¡Trampa desactivada! La frase dice "todas menos ${quedan}", así que la respuesta está literalmente en el problema. Le quedan exactamente ${quedan} ovejas. No es ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `Estás malito y el médico te da ${pastillas} pastillas. Te dice que te tomes una cada ${intervalo} minutos. ¿Cuánto tiempo tardarás en tomártelas todas?`,
        explicacion: (pastillas, intervalo) => `¡Visualiza el tiempo! El error común es hacer ${pastillas}×${intervalo}=${pastillas * intervalo}. Pero: la primera la tomas en el minuto 0, la segunda a los ${intervalo} min, y la tercera a los ${intervalo * (pastillas - 1)} min. Total: ${intervalo * (pastillas - 1)} minutos.`
    },
    hermano_tio: {
        texto: () => `El hermano de mi tío ha venido a visitarme, pero resulta que no es mi tío. ¿Quién es?`,
        ecuacion: () => `Respuesta = __`,
        explicacion: () => `¡Lógica familiar! El hermano de mi tío es mi padre. Si el tío de mi padre tiene un hermano, y ese hermano no es mi tío, entonces debe ser mi padre. La confusión viene de buscar un pariente "lejano".`
    },
    reparto_cesta: {
        texto: () => `En una cesta hay 5 manzanas. Tienes que repartirlas entre 5 amigos de modo que cada uno tenga una manzana, pero que al final quede una manzana en la cesta. ¿Cómo lo haces?`,
        ecuacion: () => `Respuesta = __`,
        explicacion: () => `¡Pensamiento lateral! La solución es: al último amigo le das la cesta CON la manzana dentro. Así cada uno tiene una manzana, y una sigue en la cesta. La trampa es asumir que "repartir" significa sacar el objeto del recipiente.`
    },
    pescadores_familia: {
        texto: () => `Dos padres y dos hijos van de pesca. Pescan 3 peces y se reparten uno para cada uno sin que sobre ninguno. ¿Cuántas personas hay en total?`,
        explicacion: () => `¡Solo hay 3 personas! El abuelo y el padre son "dos padres", y el padre y el hijo son "dos hijos". En total: abuelo + padre + hijo = 3 personas. El error común es sumar 2+2=4 personas.`
    },
    // NUEVOS PROBLEMAS NIVEL 2
    horno_galletas: {
        texto: (chocolate, vainilla, vendidas) => `En la pastelería han horneado ${chocolate} galletas de chocolate y ${vainilla} galletas de vainilla. Si ya han vendido ${vendidas} galletas, ¿cuántas galletas quedan todavía en la bandeja?`,
        explicacion: (chocolate, vainilla, vendidas) => `¡Primero junta todas las galletas: ${chocolate} + ${vainilla} = ${chocolate + vainilla}. Luego resta las vendidas: ${chocolate + vainilla} - ${vendidas} = ${chocolate + vainilla - vendidas} galletas.`
    },
    estantes_biblioteca: {
        texto: (estantes, libros_estante) => `En la biblioteca de clase hay ${estantes} estantes. Si en cada estante hay exactamente ${libros_estante} libros, ¿cuántos libros hay en total en la biblioteca?`,
        explicacion: (estantes, libros_estante) => `Puedes sumar ${libros_estante} + ${libros_estante}... (${estantes} veces) o usar la multiplicación: ${estantes} × ${libros_estante} = ${estantes * libros_estante} libros.`
    },
    reparto_caramelos: {
        texto: (caramelos_total, amigos) => `Tienes ${caramelos_total} caramelos de fresa y quieres repartirlos en partes iguales entre tus ${amigos} mejores amigos. ¿Cuántos caramelos recibirá cada amigo?`,
        explicacion: (caramelos_total, amigos) => `¿Qué número multiplicado por ${amigos} nos da ${caramelos_total}? La respuesta es: ${caramelos_total} ÷ ${amigos} = ${caramelos_total / amigos} caramelos para cada amigo.`
    },
    ahorro_juguete: {
        texto: (precio, ahorros, regalo) => `Quieres comprar un coche teledirigido que cuesta ${precio}€. Si ya tienes ahorrados ${ahorros}€ en tu hucha y tu abuela te regala ${regalo}€ más, ¿cuánto dinero te falta todavía para poder comprarlo?`,
        explicacion: (precio, ahorros, regalo) => `Suma lo que tienes: ${ahorros} + ${regalo} = ${ahorros + regalo}€. Ahora réstaselo al precio: ${precio} - ${ahorros + regalo} = ${precio - (ahorros + regalo)}€. Te falta ${precio - (ahorros + regalo)}€.`
    },
    plantas_jardin: {
        texto: (medida_inicial, crecimiento_dia, dias) => `Cada día riegas tu planta y crece ${crecimiento_dia} centímetros. Si el lunes medía ${medida_inicial} centímetros, ¿cuánto medirá después de ${dias} días si sigue creciendo igual todos los días?`,
        explicacion: (medida_inicial, crecimiento_dia, dias) => `Cuenta el crecimiento total: ${dias} días × ${crecimiento_dia} cm/día = ${dias * crecimiento_dia} cm de crecimiento. Suma la medida inicial: ${medida_inicial} + ${dias * crecimiento_dia} = ${medida_inicial + dias * crecimiento_dia} cm.`
    }
};

export default problemsES;

