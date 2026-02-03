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
    }
};

export default problemsEN;
