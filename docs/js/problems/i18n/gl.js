/**
 * Traducciones de Problemas - GALEGO (gl)
 * Sistema modular de textos para todos os problemas
 */

export const problemsGL = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `Compramos ${cantidad} gomas de borrar. Cada unha custa ${precio}€. ¿Canto pagamos en total?`,
        explicacion: (cantidad, precio) => `Tes que multiplicar o número de gomas polo prezo: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `Se nunha man teño 5 dedos e en dúas mans teño 10 dedos, ¿cantos dedos hai en ${manos} mans?`,
        explicacion: (manos) => `¡Pensa ben! Cada man ten 5 dedos. Por o tanto: 5 × ${manos} = ${manos * 5} dedos en total.`
    },
    peces_ahogados: {
        texto: () => `Nunha pecera hai 10 peixes. Se 5 deles se afoguian, ¿cantos peixes quedan na pecera?`,
        explicacion: () => `¡Trampa desactivada! Os peixes non se afoguian na auga. É o seu hábitat natural. Seguen habendo 10 peixes.`
    },
    gallo_huevos: {
        texto: () => `Un galo pon un ovo xusto na punta do tellado dunha granxa. Se o vento sopla cara a dereita, ¿cara a que lado caerá o ovo?`,
        explicacion: () => `¡Trampa desactivada! Os galos non pon ovos, son as galas as que pon ovos. Por o tanto, non hai ovo que caía.`
    },
    patas_mesa_gato: {
        texto: (patas) => `Unha mesa ten ${patas} patas. Se un gato sube enriba da mesa, ¿cantas patas hai agora tocando o solo?`,
        explicacion: (patas) => `¡Trampa desactivada! As patas do gato están sobre a mesa, non sobre o solo. Só as ${patas} patas da mesa tocan o solo.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `Tes unha cesta con ${inicial} peras. Se me das ${regaladas} peras, ¿cantas peras tes ti agora?`,
        explicacion: (inicial, regaladas) => `Despois de dar ${regaladas} peras da túa cesta de ${inicial}, quédante: ${inicial} - ${regaladas} = ${inicial - regaladas} pera(s).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `Nun bolo de cumpleaños hai ${iniciales} velas encendidas. Se soplas e apaxas ${apagadas} velas, ¿cantas velas quedan no bolo?`,
        explicacion: (iniciales, apagadas) => `¡Permanencia de obxectos! Aínda que estean apagadas, as velas seguen estando fisicamente sobre o bolo. Velas apagadas: ${apagadas}, Velas encendidas: ${iniciales - apagadas}, Total no bolo: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} irmáns (Xuan, Luis e Ana) teñen un can xuntos. ¿Cantos cans hai en total na casa?`,
        explicacion: () => `¡Lectura cuidadosa! O texto di que teñen UN can "xuntos", non que cada un teña o seu. Resposta: 1 can compartido.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `Hai ${mesa} laranxas nunha mesa. Se ti vas e quitas ${coges} laranxas, ¿cantas laranxas tes ti agora?`,
        explicacion: (coges) => `¡Atención á pregunta! Non pregunta cantas quedan na mesa, senón cantas TÉNCHE TI. Resposta: As ${coges} que acabas de coller.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} nenos intentan entrar baixo un paraugas moi pequeno, pero ningún se mollaba nada de nada. ¿Canta auga chove?`,
        explicacion: () => `¡Usa o contexto! O cerebro busca unha explicación física complexa, pero a resposta é simple: non está chover. Por iso ninguén se molló.`
    },
    patas_pajaro: {
        texto: () => `Un paxaro ten 2 patas. Se se apoia nunha rama só cunha pata e esconde a outra entre as súas plumas, ¿cantas patas ten o paxaro agora?`,
        explicacion: () => `¡Permanencia de obxectos! Aínda que non se vexa, a pata segue aí. O paxaro segue tendo 2 patas. Visible: 1, Escondida: 1, Total: 2.`
    },
    carrera_posicion: {
        texto: () => `Estás nunha carreira e adelantas ao que vai segundo. ¿En que posición estás agora?`,
        explicacion: () => `¡Trampa desactivada! Se adelantas ao segundo, ti ocupas o seu lugar e pasas a ir segundo. O primeiro segue siendo o primeiro.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `Vas á papelería e compras ${articulo.toLowerCase()} que custa ${precio}€. Se pagas cun billete de ${billete}€, ¿canto diñeiro te teñen que devolver?`,
        explicacion: (precio, billete) => `Tes que restar o prezo do billete: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `Tes ${queso} bocadillos de queixo na mochila. A túa nai chega e gárdache outros ${jamon} bocadillos de xamón. Cantos bocadillos tes para merendar en total?`,
        explicacion: (queso, jamon) => `Xunta todos os bocadillos! ${queso} + ${jamon} = ${queso + jamon} bocadillos. 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `No recreo tiñas ${inicial} canicas brillantes. Xogando cun amigo, perdes ${perdidas} canicas. Cantas canicas che quedan na bolsa?`,
        explicacion: (inicial, perdidas) => `Lembra que perder é como restar! ${inicial} - ${perdidas} = ${inicial - perdidas} canicas. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Hoxe portácheste moi ben e a profe deuche ${estrellas} pegatinas de estrelas douradas e ${corazones} pegatinas de corazóns vermellos. Cantas pegatinas tes agora?`,
        explicacion: (estrellas, corazones) => `Suma as estrelas e os corazóns! ${estrellas} + ${corazones} = ${estrellas + corazones} pegatinas. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `No teu garaxe de xoguete hai ${coches} coches aparcados. De repente, ${salen} coches saen a toda velocidade para ir a unha carreira. Cantos coches quedaron no garaxe?`,
        explicacion: (coches, salen) => `Se saen, hai menos coches dentro. ${coches} - ${salen} = ${coches - salen} coches. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `Hai unha cesta con ${total} mazás vermellas. Ao miralas de preto, ves que ${gusanitos} teñen un verme e non se poden comer. Cantas mazás boas quedan?`,
        explicacion: (total, gusanitos) => `Quita as do verme para saber cantas quedan! ${total} - ${gusanitos} = ${total - gusanitos} mazás boas. 🍎`
    },

    // LEVEL 2
    pastor_ovejas: {
        texto: (totales, vivas) => `Un pastor ten ${totales} ovejas. Un raiomata cae e moren todas menos ${vivas}. ¿Cantas ovejas lle quedan?`,
        explicacion: (totales, vivas) => `¡Trampa desactivada! O problema di "todas menos ${vivas}", así que lle quedan exactamente ${vivas} ovejas. Non é ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Se nun ano hai meses que teñen 30 días e outros teñen 31, ¿cantos meses teñen 28 días?`,
        explicacion: () => `¡Trampa desactivada! A pregunta non é cantos meses teñen SÓ 28 días, senón cantos meses TEN 28 días (entre outros). Todos os meses do ano teñen polo menos 28 días, incluso febreiro. A resposta é 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `Na biblioteca de clase hai ${inicial} libros. O luns preitáronse ${prestados} libros, pero o venres devolveronse ${devueltos}. ¿Cantos libros hai agora?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `Tes que restar os prestados e sumar os devueltos: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `Un autobús sae da cidade ás ${salida}:00 e chega o seu destino ás ${llegada}:30. ¿Canto tempo durouthe a viaxe?`,
        explicacion: (salida, llegada) => `Desde as ${salida}:00 ata as ${llegada}:30 hai ${llegada - salida} horas e 30 minutos.`
    },
    la_cerilla: {
        texto: () => `Entras nunha habitación escura e fría. Só tes unha cerilla. Hai unha estufa de carbón, unha lámpara de aceite e unha vela. ¿Que encendes primeiro?`,
        explicacion: () => `¡A cerilla, por suposto! Sen encender a cerilla non podes encender nada máis.`
    },
    peso_algodón: {
        texto: () => `¿Que pesa máis? ¿Un kilo de ferro ou un kilo de algodón?`,
        explicacion: () => `¡Pesan o mesmo! Un kilo é un kilo, sen importar o material. A confusión vén de que o ferro é máis denso, pero estamos a falar do mesmo peso.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `Un granxeiro ten ${total} ovejas. Un día ven un lobo e fúxenselle todas menos ${quedan}. ¿Cantas ovejas lle quedan ao granxeiro?`,
        explicacion: (total, quedan) => `¡Trampa desactivada! A frase di "todas menos ${quedan}", así que a resposta está literalmente no problema. Quédanlle exactamente ${quedan} ovejas. Non é ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `Estás enfermo e o médico che da ${pastillas} pastillas. Díche que te tome unha cada ${intervalo} minutos. ¿Canto tempo tardarás en tomálas todas?`,
        explicacion: (pastillas, intervalo) => `¡Visualiza o tempo! O erro común é facer ${pastillas}×${intervalo}=${pastillas * intervalo}. Pero: a primeira a tomas no minuto 0, a segunda aos ${intervalo} min, e a terceira aos ${intervalo * (pastillas - 1)} min. Total: ${intervalo * (pastillas - 1)} minutos.`
    },
    hermano_tio: {
        texto: () => `O irmán do meu tío ven a visitarme, pero resulta que non é meu tío. ¿Quen é?`,
        explicacion: () => `¡Lóxica familiar! O irmán do meu tío é meu pai. Se o tío do meu pai ten un irmán, e ese irmán non é meu tío, entón debe ser meu pai. A confusión vén de buscar un parente "afastado".`
    },
    reparto_cesta: {
        texto: () => `Nunha cesta hai 5 mazás. Tes que repartilas entre 5 amigos de forma que cada un teña unha mazá, pero que ao final quede unha mazá na cesta. ¿Como o fas?`,
        explicacion: () => `¡Pensamento lateral! A solución é: ao último amigo che das a cesta CO mazá dentro. Así cada un ten unha mazá, e unha segue na cesta. A trampa é asumir que "repartir" significa sacar o obxeto do recipiente.`
    },
    pescadores_familia: {
        texto: () => `Dous pais e dous fillos van de pesca. Pescano 3 peixes e repártenseo un para cada un sen que sobre ningún. ¿Cantas persoas hai en total?`,
        explicacion: () => `¡Só hai 3 persoas! O avó e o pai son "dous pais", e o pai e o fillo son "dous fillos". En total: avó + pai + fillo = 3 persoas. O erro común é sumar 2+2=4 persoas.`
    },

    // LEVEL 3
    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} ten ${n1} mazás. ${p2} tropieza con el, ${p1} cae e rómpeselle ${n2}. Se cada mazá custa ${precio}€, ¿canto diñeiro lle debe ${p1} a ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `¡Coidado! As mazás son de ${p1}. É ${p2} quen lle tería que pagar ${n2 * precio}€ a ${p1}.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Un tren eléctrico viaxe cara o Norte a ${velocidad_tren} km/h. Se o vento sopla cara o Sur a ${velocidad_viento} km/h, ¿canto fume echa o tren?`,
        explicacion: () => `¡Trampa desactivada! É un tren ELÉCTRICO, non a vapor ou gasóleo. Os trens eléctricos non echan fume, alimentados directamente por electricidade. Todas esas velocidades son distractores. A resposta é 0.`
    },
    despertador_antiguo: {
        texto: () => `Vaste á cama ás 8 da noite e pones un despertador de agullas (analóxico) para que soe ás 9 da mañá. ¿Cantas horas haberás dormido cando soe a alarma?`,
        explicacion: () => `¡Trampa! Os despertadores analóxicos non distinguen entre AM e PM. Cando a agulla chegue o 9, soará ás 9 da noite (1 hora despois), non ás 9 da mañá.`
    },
    padre_rosa: {
        texto: () => `O pai de Rosa ten 5 fillas: Lala, Lele, Lili, Lolo e... ¿cal é o nome da quinta filla?`,
        explicacion: () => `¡Rosa! O patrón de vocais (A, E, I, O) te distrae, pero a pregunta xa mencionou que a primeira filla é Rosa.`
    },
    dias_sin_nombre: {
        texto: () => `Nomea tres días consecutivos sen usar as palabras Lunes, Martes, Miércoles, Jueves, Viernes, Sábado ou Domingo.`,
        explicacion: () => `¡Onte, hoxe e mañá! Estos son días consecutivos pero non pertencen á semana tradicional, senón a referencias temporais relativas.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `Mamá meteu un bolo no forno ás ${inicio}:00. Se o bolo tarda ${duracion} minutos en facerse, ¿a que hora debemos sacalo?`;
        },
        explicacion: (duracion, fin) => `Sumamos ${duracion} minutos. Resultado: ${fin}.`
    },

    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `Vives no piso ${inicio}. Subes ${sube1} pisos para visitar a un amigo, luego bajas ${baja} para ir á lavandería e finalmente subes outros ${sube2} para ir á terraza. ¿En que piso está a terraza?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `¡Exercicio de memoria secuencial! Debes seguir os movementos: piso ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. O erro común é olvidar o piso de orixe.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `Nunha familia hai ${hermanas} irmás. Cada irmá ten un irmán varón. ¿Cantas persoas forman o grupo de irmáns en total?`,
        explicacion: (hermanas, hermanos, respuesta) => `¡Atención ao truco! O cerebro tende a sumar ${hermanas} + ${hermanas} = ${hermanas * 2}. Pero o irmán varón é o MESMO para as tres nenas. Total: ${hermanas} irmás + ${hermanos} irmán = ${respuesta} persoas.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `Un libro ten ${paginas} páxinas. Se les ${paginas_diarias} páxinas cada día, empezando un lunes, ¿que día da semana terminarás o libro?`,
        explicacion: (paginas, paginas_diarias, dias) => `Calcula os días: ${paginas} / ${paginas_diarias} = ${dias} días. Luego conta desde o lunes: o día ${dias} é un mércores (da semana seguinte).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `Se un caracol percorre ${velocidad} metros nunha hora, ¿canto tempo tardará en percorrer ${distancia} metros se se para a descansar media hora a mitad do camiño?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `O cálculo base é ${distancia} / ${velocidad} = ${distancia / velocidad} horas. Pero non olvides o tempo de descanso: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} horas (${tiempoTotal * 60} minutos).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `Unha piña pesa o mesmo que ${pinasParaManzanas} mazás. Se unha mazá pesa ${pesoDeManzana} gramos, ¿canto pesará unha cesta con ${numeroDePinas} piñas se a cesta baleira non pesa nada?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `É un problema de substitución. Primeiro acha o peso da piña: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} gramos. Luego multiplica por ${numeroDePinas} piñas: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} gramos.`
    },

    // LEVEL 4
    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `Nunha habitación hai ${mesas} mesas de ${patas_m} patas cada unha e ${sillas} sillas de ${patas_s} patas. ¿Cantas patas hai en total se entran ${perros} cans?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `¡Trampa! Moitos esquecen contar as patas dos cans. Mesas: ${mesas}×${patas_m}=${mesas * patas_m}, Sillas: ${sillas}×${patas_s}=${sillas * patas_s}, Cans: ${perros}×${patas_p}=${perros * patas_p}. Total: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomás plantou un horto con ${filas} filas de mazaneiras. Se en cada fila hai ${arboles} árbores, ¿cantas árbores ten en total?`,
        explicacion: (filas, arboles, total) => `Tes que multiplicar o número de filas polas árbores en cada fila: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman adestrou durante ${horas} horas hoxe. ¿Cantos minutos leva adestrado en total?`,
        explicacion: (horas, total) => `Para converter horas a minutos multiplicamos por 60: ${horas} × 60 = ${total} minutos.`
    },
    reloj_espejo: {
        texto: (hora) => `Miras un reloxo de agullas a través dun espello. As agullas marcan as ${hora} en punto. ¿Que hora é en realidade?`,
        explicacion: (hora, real) => `O espello inverte horizontalmente. A posición do ${hora} convértese na do ${real}. A hora real é as ${real} en punto.`
    },
    arca_moises: {
        texto: () => `¿Cantos animais de cada especie levou Moisés na súa arca?`,
        explicacion: () => `¡Ningún! Foi Noé quen construíu a arca, non Moisés. Moitas persoas responden "parejas" sen notar o erro no nome.`
    },
    cesta_huevos: {
        texto: () => `Nunha cesta hai 6 ovos. 6 persoas compran un ovo cada unha e, ao final, queda un ovo na cesta. ¿Cantos ovos quedan na cesta?`,
        explicacion: () => `¡Unha! A última persoa levouethe a cesta co ovo dentro. Non é que desaparecese un ovo, senón que viaxoutha dentro do seu contedor.`
    },
    hermanos_juan: {
        texto: () => `Xuan ten 3 irmás. Cada unha das súas irmás ten un só irmán varón. ¿Cantos irmáns varóns ten Xuan en total?`,
        explicacion: () => `¡Truco activado! O cerebro quere sumar, pero a resposta é 0. O "único irmán varón" de todas as súas irmás é Xuan mesmo. Xuan non ten máis irmáns varóns.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `Un avión se estrela xusto na frontera entre ${pais1} e ${pais2}. ¿En que país entierran aos superviventes?`,
        explicacion: () => `¡Trampa da linguaxe! ¡Aos superviventes NON se lles entierra! O problema menciona "frontera" para te distraer, pero a chave é que son superviventes.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `Hai ${iniciales} velas encendidas nunha mesa. Unha corrente de aire apaxaas ${apagadas} delas. Se ninguén as vuelve a encender, ¿cantas velas quedan ao día seguinte?`,
        explicacion: (encendidas, apagadas) => `¡Pensamento temporal! As ${encendidas} velas que quedaron encendidas consumiránsecomplamente durante a noite. Só quedarán as ${apagadas} velas apagadas, que se manteñen intactas.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `Unha cesta chea de mazás pesa ${llena} kg. A cesta baleira pesa ${caja} kg. Se te comes a metade das mazás, ¿canto pesa a cesta agora?`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Paso 1: Peso das mazás = ${llena} - ${caja} = ${manzanas} kg. Paso 2: Metade de mazás = ${manzanas} ÷ 2 = ${mitad} kg. Paso 3: Cesta + mazás restantes = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Hai ${inicial} paxaros nunha rama. Un cazador dispara e acerta a un. ¿Cantos paxaros quedan na rama?`,
        explicacion: (inicial) => `¡Realismo lóxico! O paxaro ferido cae o solo e os outros ${inicial - 1} paxaros saen voando asustados polo disparo. Resultado: 0 paxaros na rama.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Un ladrillo pesa 1 kg máis medio ladrillo. ¿Canto pesan un ladrillo e medio?`,
        explicacion: () => `Álxebra: Se un ladrillo (x) = 1 + x/2, entón x/2 = 1, polo tanto x = 2 kg. Un ladrillo e medio = 2 + 1 = 3 kg. A trampa común é responder 1.5 kg sen resolver a ecuación.`
    },

    // LEVEL 5
    peso_ladrillo: {
        texto: (extra) => `Se un ladrillo pesa ${extra}kg máis medio ladrillo, ¿canto pesan un ladrillo e medio?`,
        explicacion: (extra, ladrillo, resultado) => `¡Reto desactivado! Se X = peso dun ladrillo, entón X = ${extra} + X/2, así que X = ${ladrillo}kg. Un ladrillo e medio pesa ${ladrillo} + ${ladrillo / 2} = ${resultado}kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `Un pastor debe cruzar un río cun lobo, unha ovella e unha col. Na barca só caben el e unha cousa máis. Se deixa o lobo coa ovella, o lobo cómea. Se deixa a ovella coa col, a ovella cómea. ¿Cantos viaxes necesita facer como mínimo? (Cada ida ou volta conta como 1 viaxe)`,
        explicacion: () => `Solución: 1. Cruza a ovella. 2. Volve só. 3. Cruza o lobo (e trae a ovella de volta). 4. Cruza a col. 5. Volve só. 6. Cruza a ovella. Total: 6 viaxes.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `Miras un reloxo de agullas a través dun espello. As agullas marcan as ${hora}:00. ¿Que hora é en realidade?`,
        explicacion: (hora, real) => `O espello inverte a posición horizontal do reloxo. A fórmula é: hora real = 12 - hora en espello. Entón: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `Un caracol está no fondo dun pozo de ${profundidad} metros. Durante o día sube ${sube} metros, pero pola noite resbala ${resbala} metros. ¿En cantos días sairá do pozo?`,
        explicacion: (profundidad, sube, resbala, dias) => `¡Lóxica secuencial! O cálculo instintivo é ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} días. Pero no día ${dias}, o caracol comeza a ${profundidad - sube}m, sube ${sube}m e chega a ${profundidad}m, ¡polo que sae e non resbala esa noite!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `Cando eu tiña ${edad_pasada} anos, miña irmá tiña a metade da miña idade. Agora que teño ${edad_actual} anos, ¿cantos anos ten miña irmá?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `¡Relación variable constante! A mente busca a proporción "metade" (${edad_actual}/2=${edad_actual / 2}), pero a diferenza de idade é constante. Se fai tempo había ${diferencia} anos de diferenza, agora segue habendo ${diferencia} anos. Resposta: ${edad_actual} - ${diferencia} = ${resultado} anos.`
    },
    contar_digito_siete: {
        texto: (paginas) => `Estás numerando as páxinas dun libro que ten exactamente ${paginas} páxinas. ¿Cantas veces escribirás o díxito '7'?`,
        explicacion: () => `¡Patróns numéricos! Moitos só contan os 7s en unidades (7,17,27...97) = 10. Pero esquecen os 7s na decena 70-79 (10 máis). O número 77 ten dous 7s. Total: 10 + 10 = 20 veces.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `Un bate e unha pelota custan xuntos ${total_costo.toFixed(2)}€. O bate custa ${diferencia.toFixed(2)}€ máis que a pelota. ¿Canto custa a pelota?`,
        explicacion: () => `¡Ecuación de diferenza! A resposta automática é 0.10€, pero se a pelota custase 0.10€, o bate custaría 1.10€, e o total sería 1.20€. Correctamente: Se pelota = x, entón bate = x + 1. x + (x + 1) = 1.10 → 2x = 0.10 → x = 0.05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Dous trens están en vías opostas a ${distancia} km de distancia e avanzan o un cara ao outro a ${velocidad_t} km/h cada un. Un paxaro sae do Tren A a ${velocidad_p} km/h cara ao Tren B, e cando chega a este, volve ao Tren A, e así sucesivamente ata que os trens chocan. ¿Que distancia total haberá percorrido o paxaro?`,
        explicacion: (velocidad_p, tiempo, velocidad_t) => `¡A trampa do cálculo infinito! Moitos intentan calcular cada traxecto do paxaro (serie infinita). O truco é calcular o tempo: os trens tardarán ${tiempo} hora en encontrarse (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h de velocidade relativa). Se o paxaro voa a ${velocidad_p} km/h durante esa hora, percorre exactamente ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Anteonte tiña ${edad_anteayer} anos e o ano que vén terei ${edad_proximo}. ¿Cantos anos teño hoxe? (Sabendo que hoxe é 1 de xaneiro)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `¡Lóxica temporal! Parece imposible pasar de ${edad_anteayer} a ${edad_proximo} en pouco tempo. A solución: 1. Onte (31 de decembro) cumprin ${edad_hoy}. 2. Anteonte (30 de decembro) aínda tiña ${edad_anteayer}. 3. Este ano cumprirei ${edad_hoy + 1} en decembro. 4. O ano que vén cumprirei ${edad_proximo}. Hoxe: ${edad_hoy} anos.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Un cubo de madeira de ${tamano}×${tamano}×${tamano} cm píntase de azul por fora. Despois córtase en ${total} cubitos de 1×1×1 cm. ¿Cantos deses cubitos terán exactamente 2 caras pintadas de azul?`,
        explicacion: (aristas, tamano, respuesta) => `¡Visualización espacial! O cerebro intenta contar caras totais, pero o truco é saber que os cubos con 2 caras pintadas son os que están nas aristas (pero non nas esquinas, que teñen 3). Un cubo ten ${aristas} aristas, e neste caso hai 1 cubito central por arista. Total: ${respuesta} cubitos.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `O corredor A vence ao corredor B por ${ventaja} metros. O corredor B vence ao corredor C por ${ventaja} metros. Se os tres corren ${distancia} metros, ¿por cantos metros vence A a C?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `¡A trampa da suma! A resposta intuitiva é ${ventaja + ventaja} metros (${ventaja}+${ventaja}). Pero as distancias son proporcionais á velocidade. C corre ao ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% da velocidade de A. Vantaxe real: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Se ${monos_ini} monos tardan ${tiempo_ini} minutos en comerse ${platanos_ini} plátanos, ¿canto tempo tardarán ${monos_fin} monos en comerse ${platanos_fin} plátanos?`,
        explicacion: (tiempo_ini) => `¡A trampa da regra de tres! Intenta aplicarse proporción directa. Pero o ritmo é de 1 mono por plátano cada ${tiempo_ini} minutos. Se todos comezas a comer á vez, rematan á vez. A relación monos:plátanos é a mesma (1:1), así que o tempo permanece constante: ${tiempo_ini} minutos.`
    }
};

export default problemsGL;
