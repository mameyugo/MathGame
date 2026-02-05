/**
 * Problem Translations - ENGLISH (en)
 * Modular text system for all problems
 */

export const problemsEN = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `We buy ${cantidad} erasers. Each one costs ${precio}€. How much do we pay in total?`,
        explicacion: (cantidad, precio) => `You have to multiply the number of erasers by the price: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `If on one hand I have 5 fingers and on two hands I have 10 fingers, how many fingers are there on ${manos} hands?`,
        explicacion: (manos) => `Think carefully! Each hand has 5 fingers. Therefore: 5 × ${manos} = ${manos * 5} fingers in total.`
    },
    peces_ahogados: {
        texto: () => `In an aquarium there are 10 fish. If 5 of them drown, how many fish are left in the aquarium?`,
        explicacion: () => `Trap deactivated! Fish don't drown in water. It's their natural habitat. There are still 10 fish.`
    },
    gallo_huevos: {
        texto: () => `A rooster lays an egg right on the edge of a barn roof. If the wind blows to the right, which way will the egg fall?`,
        explicacion: () => `Trap deactivated! Roosters don't lay eggs, hens do. Therefore, there is no egg to fall.`
    },
    patas_mesa_gato: {
        texto: (patas) => `A table has ${patas} legs. If a cat gets on top of the table, how many legs are now touching the ground?`,
        explicacion: (patas) => `Trap deactivated! The cat's legs are on the table, not on the ground. Only the ${patas} table legs are touching the ground.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `You have a basket with ${inicial} pears. If you give me ${regaladas} pears, how many pears do you have left?`,
        explicacion: (inicial, regaladas) => `After giving ${regaladas} pears from your basket of ${inicial}, you have: ${inicial} - ${regaladas} = ${inicial - regaladas} pear(s).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `In a birthday cake there are ${iniciales} candles lit. If you blow out ${apagadas} candles, how many candles are left on the cake?`,
        explicacion: (iniciales, apagadas) => `Object permanence! Even though they're blown out, the candles are still physically on the cake. Blown out candles: ${apagadas}, Lit candles: ${iniciales - apagadas}, Total on cake: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} siblings (John, Louis and Anne) have a dog together. How many dogs are there in total in the house?`,
        explicacion: () => `Careful reading! The text says they have ONE dog "together", not that each one has theirs. Answer: 1 shared dog.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `There are ${mesa} oranges on a table. If you go and take ${coges} oranges, how many oranges do you have now?`,
        explicacion: (coges) => `Pay attention to the question! It's not asking how many are left on the table, but how many DO YOU have. Answer: The ${coges} you just took.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} children try to get under a very small umbrella, but none of them get wet at all. How much does it rain?`,
        explicacion: () => `Use the context! The brain searches for a complex physical explanation, but the answer is simple: it's not raining. That's why nobody gets wet.`
    },
    patas_pajaro: {
        texto: () => `A bird has 2 legs. If it leans on a branch with just one leg and hides the other between its feathers, how many legs does the bird have now?`,
        explicacion: () => `Object permanence! Even though it's not visible, the leg is still there. The bird still has 2 legs. Visible: 1, Hidden: 1, Total: 2.`
    },
    carrera_posicion: {
        texto: () => `You're in a race and you pass the one in second place. What position are you in now?`,
        explicacion: () => `Trap deactivated! If you pass the second place runner, you take their position and become second. The first place runner is still first.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `You go to the stationery store and buy ${articulo.toLowerCase()} that costs ${precio}€. If you pay with a ${billete}€ note, how much change do they give you?`,
        explicacion: (precio, billete) => `You have to subtract the price from the note: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `You have ${queso} cheese sandwiches in your backpack. Your mom arrives and puts in ${jamon} more ham sandwiches. How many sandwiches do you have for snack in total?`,
        explicacion: (queso, jamon) => `Add all the sandwiches together! ${queso} + ${jamon} = ${queso + jamon} sandwiches. 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `At recess you had ${inicial} shiny marbles. Playing with a friend, you lose ${perdidas} marbles. How many marbles are left in your bag?`,
        explicacion: (inicial, perdidas) => `Remember that losing is the same as subtracting! ${inicial} - ${perdidas} = ${inicial - perdidas} marbles. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Today you behaved very well and the teacher gave you ${estrellas} golden star stickers and ${corazones} red heart stickers. How many stickers do you have now?`,
        explicacion: (estrellas, corazones) => `Add the stars and the hearts! ${estrellas} + ${corazones} = ${estrellas + corazones} stickers. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `In your toy garage there are ${coches} parked cars. Suddenly, ${salen} cars speed out to a race. How many cars are left in the garage?`,
        explicacion: (coches, salen) => `If they leave, there are fewer cars inside. ${coches} - ${salen} = ${coches - salen} cars. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `There is a basket with ${total} red apples. Looking closely, you see that ${gusanitos} have a worm and cannot be eaten. How many good apples are left?`,
        explicacion: (total, gusanitos) => `Remove the wormy ones to know how many are left! ${total} - ${gusanitos} = ${total - gusanitos} good apples. 🍎`
    },

    // LEVEL 2
    pastor_ovejas: {
        texto: (totales, vivas) => `A shepherd has ${totales} sheep. Lightning strikes and all die except ${vivas}. How many sheep are left?`,
        explicacion: (totales, vivas) => `Trap deactivated! The problem says "all except ${vivas}", so he has exactly ${vivas} sheep left. It's not ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `If in a year there are months that have 30 days and others that have 31, how many months have 28 days?`,
        explicacion: () => `Trap deactivated! The question is not how many months have ONLY 28 days, but how many months HAVE 28 days (among others). All months of the year have at least 28 days, even February. The answer is 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `In the class library there are ${inicial} books. On Monday ${prestados} books were borrowed, but on Friday ${devueltos} were returned. How many books are there now?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `You have to subtract the borrowed and add the returned: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `A bus leaves the city at ${salida}:00 and arrives at its destination at ${llegada}:30. How long did the journey last?`,
        explicacion: (salida, llegada) => `From ${salida}:00 to ${llegada}:30 there are ${llegada - salida} hours and 30 minutes.`
    },
    la_cerilla: {
        texto: () => `You enter a dark and cold room. You only have one match. There is a coal stove, an oil lamp and a candle. What do you light first?`,
        explicacion: () => `The match, of course! Without lighting the match you can't light anything else.`
    },
    peso_algodón: {
        texto: () => `What weighs more? A kilogram of iron or a kilogram of cotton?`,
        explicacion: () => `They weigh the same! A kilogram is a kilogram, regardless of the material. The confusion comes from iron being denser, but we're talking about the same weight.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `A farmer has ${total} sheep. One day a wolf comes and all escape except ${quedan}. How many sheep does the farmer have left?`,
        explicacion: (total, quedan) => `Trap deactivated! The sentence says "all except ${quedan}", so the answer is literally in the problem. He has exactly ${quedan} sheep left. It's not ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `You're sick and the doctor gives you ${pastillas} pills. He tells you to take one every ${intervalo} minutes. How long will it take you to take them all?`,
        explicacion: (pastillas, intervalo) => `Visualize the time! The common error is doing ${pastillas}×${intervalo}=${pastillas * intervalo}. But: you take the first at minute 0, the second at ${intervalo} minutes, and the third at ${intervalo * (pastillas - 1)} minutes. Total: ${intervalo * (pastillas - 1)} minutes.`
    },
    hermano_tio: {
        texto: () => `My uncle's brother comes to visit me, but it turns out he's not my uncle. Who is he?`,
        explicacion: () => `Family logic! My uncle's brother is my father. If my father's uncle has a brother, and that brother is not my uncle, then he must be my father. The confusion comes from looking for a "distant" relative.`
    },
    reparto_cesta: {
        texto: () => `In a basket there are 5 apples. You have to distribute them among 5 friends so that each one has an apple, but at the end one apple remains in the basket. How do you do it?`,
        explicacion: () => `Lateral thinking! The solution is: give the last friend the basket WITH the apple inside. This way each one has an apple, and one remains in the basket. The trap is assuming that "distribute" means taking the object out of the container.`
    },
    pescadores_familia: {
        texto: () => `Two fathers and two sons go fishing. They catch 3 fish and each gets one with nothing left over. How many people are there in total?`,
        explicacion: () => `There are only 3 people! The grandfather and the father are "two fathers", and the father and the son are "two sons". In total: grandfather + father + son = 3 people. The common mistake is adding 2+2=4 people.`
    },

    // LEVEL 3
    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} has ${n1} apples. ${p2} bumps into him, ${p1} falls and ${n2} break. If each apple costs ${precio}€, how much money does ${p1} owe ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `Careful! The apples belong to ${p1}. It's ${p2} who should pay ${p1} ${n2 * precio}€.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `An electric train travels North at ${velocidad_tren} km/h. If the wind blows South at ${velocidad_viento} km/h, how much smoke does the train emit?`,
        explicacion: () => `Trap deactivated! It's an ELECTRIC train, not steam or diesel. Electric trains don't emit smoke, they're powered directly by electricity. All those speeds are distractors. The answer is 0.`
    },
    despertador_antiguo: {
        texto: () => `You go to bed at 8 PM and set an analog alarm clock to go off at 9 AM. How many hours will you have slept when the alarm goes off?`,
        explicacion: () => `Trap! Analog alarm clocks don't distinguish between AM and PM. When the hand reaches 9, it will go off at 9 PM (1 hour later), not 9 AM.`
    },
    padre_rosa: {
        texto: () => `Rosa's father has 5 daughters: Lala, Lele, Lili, Lolo and... what is the name of the fifth daughter?`,
        explicacion: () => `Rosa! The pattern of vowels (A, E, I, O) distracts you, but the question already mentioned that the first daughter is Rosa.`
    },
    dias_sin_nombre: {
        texto: () => `Name three consecutive days without using the words Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday.`,
        explicacion: () => `Yesterday, today and tomorrow! These are consecutive days but don't belong to the traditional week, but rather to relative time references.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `Mom put a cake in the oven at ${inicio}:00. If the cake takes ${duracion} minutes to bake, at what time should we take it out?`;
        },
        explicacion: (duracion, fin) => `We add ${duracion} minutes. Result: ${fin}.`
    },
    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `You live on the ${inicio}th floor. You go up ${sube1} floors to visit a friend, then down ${baja} to the laundry, and finally up ${sube2} more to the terrace. What floor is the terrace on?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `Sequential memory exercise! You must follow the movements: floor ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. The common mistake is forgetting the starting floor.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `In a family there are ${hermanas} sisters. Each sister has one brother. How many people are in the group of siblings in total?`,
        explicacion: (hermanas, hermanos, respuesta) => `Watch out for the trick! The brain tends to add ${hermanas} + ${hermanas} = ${hermanas * 2}. But the brother is the SAME for all three sisters. Total: ${hermanas} sisters + ${hermanos} brother = ${respuesta} people.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `A book has ${paginas} pages. If you read ${paginas_diarias} pages each day, starting on a Monday, what day of the week will you finish the book?`,
        explicacion: (paginas, paginas_diarias, dias) => `Calculate the days: ${paginas} / ${paginas_diarias} = ${dias} days. Then count from Monday: day ${dias} is a Wednesday (of the following week).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `If a snail travels ${velocidad} meters in one hour, how long will it take to travel ${distancia} meters if it stops to rest for half an hour halfway through?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `The basic calculation is ${distancia} / ${velocidad} = ${distancia / velocidad} hours. But don't forget the rest time: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} hours (${tiempoTotal * 60} minutes).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `A pineapple weighs the same as ${pinasParaManzanas} apples. If one apple weighs ${pesoDeManzana} grams, how much will a basket with ${numeroDePinas} pineapples weigh if the empty basket weighs nothing?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `It's a substitution problem. First find the weight of the pineapple: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} grams. Then multiply by ${numeroDePinas} pineapples: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} grams.`
    },
    // LEVEL 4
    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `In a room there are ${mesas} tables with ${patas_m} legs each and ${sillas} chairs with ${patas_s} legs. How many legs are there in total if ${perros} dogs enter?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `Trap! Many forget to count the dogs' legs. Tables: ${mesas}×${patas_m}=${mesas * patas_m}, Chairs: ${sillas}×${patas_s}=${sillas * patas_s}, Dogs: ${perros}×${patas_p}=${perros * patas_p}. Total: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomás has planted an orchard with ${filas} rows of apple trees. If each row has ${arboles} trees, how many trees does he have in total?`,
        explicacion: (filas, arboles, total) => `You have to multiply the number of rows by the trees in each row: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman trained for ${horas} hours today. How many minutes has he been training in total?`,
        explicacion: (horas, total) => `To convert hours to minutes we multiply by 60: ${horas} × 60 = ${total} minutes.`
    },
    reloj_espejo: {
        texto: (hora) => `You look at an analog clock through a mirror. The hands show ${hora} o'clock. What time is it really?`,
        explicacion: (hora, real) => `The mirror reverses horizontally. The position of ${hora} becomes ${real}. The real time is ${real} o'clock.`
    },
    arca_moises: {
        texto: () => `How many animals of each species did Moses carry on his ark?`,
        explicacion: () => `Zero! It was Noah who built the ark, not Moses. Many people answer "pairs" without noticing the name error.`
    },
    cesta_huevos: {
        texto: () => `In a basket there are 6 eggs. 6 people buy one egg each and in the end, one egg remains in the basket. How many eggs are left in the basket?`,
        explicacion: () => `One! The last person took the basket with the egg inside. It's not that an egg disappeared, but that it traveled inside its container.`
    },
    hermanos_juan: {
        texto: () => `John has 3 sisters. Each of his sisters has only one brother. How many male siblings does John have in total?`,
        explicacion: () => `Trick activated! The brain wants to add, but the answer is 0. The "only brother" of all his sisters is John himself. John has no other brothers.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `A plane crashes right on the border between ${pais1} and ${pais2}. In which country do they bury the survivors?`,
        explicacion: () => `Language trick! Survivors are NOT buried! The problem mentions "border" to distract you, but the key is that they are survivors.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `There are ${iniciales} lit candles on a table. A gust of wind blows out ${apagadas} of them. If no one lights them again, how many candles are left the next day?`,
        explicacion: (encendidas, apagadas) => `Temporal thinking! The ${encendidas} candles that remained lit will burn completely during the night. Only the ${apagadas} blown out candles remain, which stay intact.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `A basket full of apples weighs ${llena} kg. The empty basket weighs ${caja} kg. If you eat half the apples, how much does the basket weigh now?`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Step 1: Weight of apples = ${llena} - ${caja} = ${manzanas} kg. Step 2: Half the apples = ${manzanas} ÷ 2 = ${mitad} kg. Step 3: Basket + remaining apples = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `There are ${inicial} birds on a branch. A hunter shoots and hits one. How many birds are left on the branch?`,
        explicacion: (inicial) => `Logical realism! The wounded bird falls to the ground and the other ${inicial - 1} birds fly away scared by the shot. Result: 0 birds on the branch.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `A brick weighs 1 kg plus half a brick. How much do one and a half bricks weigh?`,
        explicacion: () => `Algebra: If a brick (x) = 1 + x/2, then x/2 = 1, therefore x = 2 kg. One and a half bricks = 2 + 1 = 3 kg. The common trap is answering 1.5 kg without solving the equation.`
    },

    // LEVEL 5
    peso_ladrillo: {
        texto: (extra) => `If a brick weighs ${extra} kg plus half a brick, how much do one and a half bricks weigh?`,
        explicacion: (extra, ladrillo, resultado) => `Challenge deactivated! If X = weight of a brick, then X = ${extra} + X/2, so X = ${ladrillo} kg. One and a half bricks weigh ${ladrillo} + ${ladrillo / 2} = ${resultado} kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `A shepherd must cross a river with a wolf, a sheep and a cabbage. The boat can only fit him and one more thing. If he leaves the wolf with the sheep, the wolf eats it. If he leaves the sheep with the cabbage, the sheep eats it. What is the minimum number of trips needed? (Each trip in or out counts as 1 trip)`,
        explicacion: () => `Solution: 1. Cross with sheep. 2. Return alone. 3. Cross with wolf (and bring sheep back). 4. Cross with cabbage. 5. Return alone. 6. Cross with sheep. Total: 6 trips.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `You look at an analog clock through a mirror. The hands show ${hora}:00. What time is it really?`,
        explicacion: (hora, real) => `The mirror reverses the horizontal position of the clock. The formula is: real time = 12 - time in mirror. So: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `A snail is at the bottom of a ${profundidad} meter well. During the day it climbs ${sube} meters, but at night it slips back ${resbala} meters. In how many days will it get out of the well?`,
        explicacion: (profundidad, sube, resbala, dias) => `Sequential logic! The instinctive calculation is ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} days. But on day ${dias}, the snail starts at ${profundidad - sube}m, climbs ${sube}m and reaches ${profundidad}m, so it gets out and doesn't slip that night!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `When I was ${edad_pasada} years old, my sister was half my age. Now that I'm ${edad_actual} years old, how old is my sister?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `Variable constant relationship! The mind searches for the "half" proportion (${edad_actual}/2=${edad_actual / 2}), but the age difference is constant. If there was ${diferencia} years difference back then, there's still ${diferencia} years now. Answer: ${edad_actual} - ${diferencia} = ${resultado} years.`
    },
    contar_digito_siete: {
        texto: (paginas) => `You're numbering the pages of a book that has exactly ${paginas} pages. How many times will you write the digit '7'?`,
        explicacion: () => `Numeric patterns! Many only count the 7s in units (7,17,27...97) = 10. But they forget the 7s in the tens place 70-79 (10 more). The number 77 has two 7s. Total: 10 + 10 = 20 times.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `A bat and a ball cost together ${total_costo.toFixed(2)}€. The bat costs ${diferencia.toFixed(2)}€ more than the ball. How much does the ball cost?`,
        explicacion: () => `Difference equation! The automatic answer is 0.10€, but if the ball cost 0.10€, the bat would cost 1.10€, and the total would be 1.20€. Correctly: If ball = x, then bat = x + 1. x + (x + 1) = 1.10 → 2x = 0.10 → x = 0.05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Two trains are on opposite tracks ${distancia} km apart and move toward each other at ${velocidad_t} km/h each. A bird leaves Train A at ${velocidad_p} km/h toward Train B, and when it reaches it, it returns to Train A, and so on until the trains collide. What is the total distance traveled by the bird?`,
        explicacion: (velocidad_p, tiempo, velocidad_t) => `The infinite calculation trap! Many try to calculate each trajectory of the bird (infinite series). The trick is to calculate the time: the trains will take ${tiempo} hour to meet (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h relative speed). If the bird flies at ${velocidad_p} km/h for that hour, it travels exactly ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `The day before yesterday I was ${edad_anteayer} years old and next year I will be ${edad_proximo}. How old am I today? (Knowing that today is January 1st)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `Temporal logic! It seems impossible to go from ${edad_anteayer} to ${edad_proximo} in such a short time. The solution: 1. Yesterday (December 31st) I turned ${edad_hoy}. 2. The day before yesterday (December 30th) I was still ${edad_anteayer}. 3. This year I will turn ${edad_hoy + 1} in December. 4. Next year I will turn ${edad_proximo}. Today: ${edad_hoy} years old.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `A wooden cube of ${tamano}×${tamano}×${tamano} cm is painted blue on the outside. Then it is cut into ${total} cubes of 1×1×1 cm. How many of these cubes will have exactly 2 faces painted blue?`,
        explicacion: (aristas, tamano, respuesta) => `Spatial visualization! The brain tries to count total faces, but the trick is knowing that cubes with 2 painted faces are those on the edges (but not at corners, which have 3). A cube has ${aristas} edges, and in this case there is 1 central cube per edge. Total: ${respuesta} cubes.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `Runner A beats Runner B by ${ventaja} meters. Runner B beats Runner C by ${ventaja} meters. If all three run ${distancia} meters, by how many meters does A beat C?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `The addition trap! The intuitive answer is ${ventaja + ventaja} meters (${ventaja}+${ventaja}). But distances are proportional to speed. C runs at ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% of A's speed. Real advantage: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `If ${monos_ini} monkeys take ${tiempo_ini} minutes to eat ${platanos_ini} bananas, how long will ${monos_fin} monkeys take to eat ${platanos_fin} bananas?`,
        explicacion: (tiempo_ini) => `The rule of three trap! A direct proportion is attempted. But the rate is 1 monkey per banana every ${tiempo_ini} minutes. If everyone starts eating at the same time, they finish at the same time. The monkeys:bananas ratio is the same (1:1), so time remains constant: ${tiempo_ini} minutes.`
    }
};

export default problemsEN;
