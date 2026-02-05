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
        texto: () => `En una pecera hay 10 peces. Si 5 de ellos se ahogan, ¿cuántos peces quedan en la pecera?`,
        explicacion: () => `¡Trampa desactivada! Los peces no se ahogan en el agua. Es su hábitat natural. Siguen habiendo 10 peces.`
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
        texto: (mesa, coges) => `Hay ${mesa} naranjas en una mesa. Si tú vas y quitas ${coges} naranjas, ¿cuántas naranjas tienes tú ahora?`,
        explicacion: (coges) => `¡Atención a la pregunta! No pregunta cuántas quedan en la mesa, sino cuántas TIENES TÚ. Respuesta: Las ${coges} que acabas de coger.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} niños intentan entrar bajo un paraguas muy pequeño, pero ninguno se moja nada de nada. ¿Cuánta agua llueve?`,
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
        texto: () => "Tienes 3 sándwiches de queso en tu mochila. Tu mamá llega y te guarda otros 2 sándwiches de jamón. ¿Cuántos sándwiches tienes para merendar en total?",
        explicacion: () => "¡Junta todos los sándwiches y cuéntalos! 🥪"
    },
    tesoro_canicas: {
        texto: () => "En el recreo tenías 8 canicas brillantes. Jugando con un amigo, pierdes 3 canicas. ¿Cuántas canicas te quedan en la bolsa?",
        explicacion: () => "¡Recuerda que perder es como restar! 🔵"
    },
    estrellas_pegatina: {
        texto: () => "Hoy te has portado muy bien y la profe te ha dado 5 pegatinas de estrellas doradas y 2 pegatinas de corazones rojos. ¿Cuántas pegatinas tienes ahora en tu cuaderno?",
        explicacion: () => "¡Suma las estrellas y los corazones! ⭐"
    },
    garaje_juguete: {
        texto: () => "En tu garaje de juguete hay 7 coches aparcados. De repente, 2 coches salen a toda velocidad para ir a una carrera. ¿Cuántos coches se han quedado en el garaje?",
        explicacion: () => "Si salen, hay menos coches dentro. 🏎️"
    },
    manzanas_cesta: {
        texto: () => "Hay una cesta con 10 manzanas rojas. Al mirarlas de cerca, ves que 4 tienen un gusanito y no se pueden comer. ¿Cuántas manzanas ricas quedan?",
        explicacion: () => "¡Quita las del gusanito para saber cuántas quedan! 🍎"
    },

    // LEVEL 2
    pastor_ovejas: {
        texto: (totales, vivas) => `Un pastor tiene ${totales} ovejas. Un rayo cae y mueren todas menos ${vivas}. ¿Cuántas ovejas le quedan?`,
        explicacion: (totales, vivas) => `¡Trampa desactivada! El problema dice "todas menos ${vivas}", así que le quedan exactamente ${vivas} ovejas. No es ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Si en un año hay meses que tienen 30 días y otros tienen 31, ¿cuántos meses tienen 28 días?`,
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
        explicacion: () => `¡La cerilla, por supuesto! Sin encender la cerilla no puedes encender nada más.`
    },
    peso_algodón: {
        texto: () => `¿Qué pesa más? ¿Un kilo de hierro o un kilo de algodón?`,
        explicacion: () => `¡Pesan lo mismo! Un kilo es un kilo, sin importar el material. La confusión viene de que el hierro es más denso, pero estamos hablando del mismo peso.`
    },

    // LEVEL 3
    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} tiene ${n1} manzanas. ${p2} tropieza con él, ${p1} cae y se le rompen ${n2}. Si cada manzana cuesta ${precio}€, ¿cuánto dinero le debe ${p1} a ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `¡Cuidado! Las manzanas son de ${p1}. Es ${p2} quien debería pagarle ${n2 * precio}€ a ${p1}.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Un tren eléctrico viaja hacia el Norte a ${velocidad_tren} km/h. Si el viento sopla hacia el Sur a ${velocidad_viento} km/h, ¿cuánto humo echa el tren?`,
        explicacion: () => `¡Trampa desactivada! Es un tren ELÉCTRICO, no a vapor o diesel. Los trenes eléctricos no echan humo, alimentados directamente por electricidad. Todas esas velocidades son distractores. La respuesta es 0.`
    },
    despertador_antiguo: {
        texto: () => `Te vas a la cama a las 8 de la noche y pones un despertador de agujas (analógico) para que suene a las 9 de la mañana. ¿Cuántas horas habrás dormido cuando suene la alarma?`,
        explicacion: () => `¡Trampa! Los despertadores analógicos no distinguen entre AM y PM. Cuando la aguja llegue al 9, sonará a las 9 de la noche (1 hora después), no a las 9 de la mañana.`
    },
    padre_rosa: {
        texto: () => `El padre de Rosa tiene 5 hijas: Lala, Lele, Lili, Lolo y... ¿cuál es el nombre de la quinta hija?`,
        explicacion: () => `¡Rosa! El patrón de vocales (A, E, I, O) te distrae, pero la pregunta ya mencionó que la primera hija es Rosa.`
    },
    dias_sin_nombre: {
        texto: () => `Nombra tres días consecutivos sin usar las palabras Lunes, Martes, Miércoles, Jueves, Viernes, Sábado o Domingo.`,
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
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Paso 1: Peso de las manzanas = ${llena} - ${caja} = ${manzanas} kg. Paso 2: Mitad de manzanas = ${manzanas} ÷ 2 = ${mitad} kg. Paso 3: Caja + manzanas restantes = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Hay ${inicial} pájaros en una rama. Un cazador dispara y acierta a uno. ¿Cuántos pájaros quedan en la rama?`,
        explicacion: (inicial) => `¡Realismo lógico! El pájaro herido cae al suelo y los otros ${inicial - 1} pájaros salen volando asustados por el disparo. Resultado: 0 pájaros en la rama.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Un ladrillo pesa 1 kg más medio ladrillo. ¿Cuánto pesan un ladrillo y medio?`,
        explicacion: () => `Álgebra: Si un ladrillo (x) = 1 + x/2, entonces x/2 = 1, por lo tanto x = 2 kg. Un ladrillo y medio = 2 + 1 = 3 kg. La trampa común es responder 1.5 kg sin resolver la ecuación.`
    },

    // LEVEL 5
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
        explicacion: (velocidad_p, tiempo, velocidad_t) => `¡La trampa del cálculo infinito! Muchos intentan calcular cada trayecto del pájaro (serie infinita). El truco es calcular el tiempo: los trenes tardarán ${tiempo} hora en encontrarse (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h de velocidad relativa). Si el pájaro vuela a ${velocidad_p} km/h durante esa hora, recorre exactamente ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Anteayer tenía ${edad_anteayer} años y el año que viene tendré ${edad_proximo}. ¿Cuántos años tengo hoy? (Sabiendo que hoy es 1 de enero)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `¡Lógica temporal! Parece imposible pasar de ${edad_anteayer} a ${edad_proximo} en poco tiempo. La solución: 1. Ayer (31 de diciembre) cumplí ${edad_hoy}. 2. Anteayer (30 de diciembre) aún tenía ${edad_anteayer}. 3. Este año cumpliré ${edad_hoy + 1} en diciembre. 4. El año que viene cumpliré ${edad_proximo}. Hoy: ${edad_hoy} años.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Un cubo de madera de ${tamano}×${tamano}×${tamano} cm se pinta de azul por fuera. Luego se corta en ${total} cubitos de 1×1×1 cm. ¿Cuántos de esos cubitos tendrán exactamente 2 caras pintadas de azul?`,
        explicacion: (aristas, tamano, respuesta) => `¡Visualización espacial! El cerebro intenta contar caras totales, pero el truco es saber que los cubos con 2 caras pintadas son los que están en las aristas (pero no en las esquinas, que tienen 3). Un cubo tiene ${aristas} aristas, y en este caso hay 1 cubito central por arista. Total: ${respuesta} cubitos.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `El corredor A vence al corredor B por ${ventaja} metros. El corredor B vence al corredor C por ${ventaja} metros. Si los tres corren ${distancia} metros, ¿por cuántos metros vence A a C?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `¡La trampa de la suma! La respuesta intuitiva es ${ventaja + ventaja} metros (${ventaja}+${ventaja}). Pero las distancias son proporcionales a la velocidad. C corre al ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% de la velocidad de A. Ventaja real: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Si ${monos_ini} monos tardan ${tiempo_ini} minutos en comerse ${platanos_ini} plátanos, ¿cuánto tiempo tardarán ${monos_fin} monos en comerse ${platanos_fin} plátanos?`,
        explicacion: (tiempo_ini) => `¡La trampa de la regla de tres! Se intenta aplicar proporción directa. Pero el ritmo es de 1 mono por plátano cada ${tiempo_ini} minutos. Si todos empiezan a comer a la vez, terminan a la vez. La relación monos:plátanos es la misma (1:1), así que el tiempo permanece constante: ${tiempo_ini} minutos.`
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
        explicacion: () => `¡Lógica familiar! El hermano de mi tío es mi padre. Si el tío de mi padre tiene un hermano, y ese hermano no es mi tío, entonces debe ser mi padre. La confusión viene de buscar un pariente "lejano".`
    },
    reparto_cesta: {
        texto: () => `En una cesta hay 5 manzanas. Tienes que repartirlas entre 5 amigos de modo que cada uno tenga una manzana, pero que al final quede una manzana en la cesta. ¿Cómo lo haces?`,
        explicacion: () => `¡Pensamiento lateral! La solución es: al último amigo le das la cesta CON la manzana dentro. Así cada uno tiene una manzana, y una sigue en la cesta. La trampa es asumir que "repartir" significa sacar el objeto del recipiente.`
    },
    pescadores_familia: {
        texto: () => `Dos padres y dos hijos van de pesca. Pescan 3 peces y se reparten uno para cada uno sin que sobre ninguno. ¿Cuántas personas hay en total?`,
        explicacion: () => `¡Solo hay 3 personas! El abuelo y el padre son "dos padres", y el padre y el hijo son "dos hijos". En total: abuelo + padre + hijo = 3 personas. El error común es sumar 2+2=4 personas.`
    }
};

export default problemsES;
