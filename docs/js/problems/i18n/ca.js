/**
 * Traduccions dels Problemes - CATALÀ (ca)
 * Sistema modular de textos per a tots els problemes
 */

export const problemsCA = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `Comprem ${cantidad} gomes. Cadascuna costa ${precio}€. Quant paguem en total?`,
        explicacion: (cantidad, precio) => `Has de multiplicar el nombre de gomes pel preu: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `Si en una mà tinc 5 dits i en dues mans tinc 10 dits, quants dits hi ha en ${manos} mans?`,
        explicacion: (manos) => `Pensa bé! Cada mà té 5 dits. Per tant: 5 × ${manos} = ${manos * 5} dits en total.`
    },
    peces_ahogados: {
        texto: () => `En una pecera hi ha 10 peixos. Si 5 d'ells es neguen, quants peixos queden a la pecera?`,
        explicacion: () => `Trampa desactivada! Els peixos no es neguen a l'aigua. És el seu hàbitat natural. Segueixen havent-hi 10 peixos.`
    },
    gallo_huevos: {
        texto: () => `Un gall posa un ou just a la vora de la teulada d'un graner. Si el vent buffa cap a la dreta, cap a on caurà l'ou?`,
        explicacion: () => `Trampa desactivada! Els galls no ponen ous, són les gallines les que ponen ous. Per tant, no hi ha ou que caigui.`
    },
    patas_mesa_gato: {
        texto: (patas) => `Una taula té ${patas} potes. Si un gat puja dalt de la taula, quantes potes hi ha ara tocant el sòl?`,
        explicacion: (patas) => `Trampa desactivada! Les potes del gat estan sobre la taula, no sobre el sòl. Només les ${patas} potes de la taula toquen el sòl.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `Tens una cistella amb ${inicial} peres. Si me'n dones ${regaladas}, quantes peres tens ara?`,
        explicacion: (inicial, regaladas) => `Després de donar ${regaladas} peres de la teva cistella de ${inicial}, et queden: ${inicial} - ${regaladas} = ${inicial - regaladas} pera(s).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `En un pastís de compleanys hi ha ${iniciales} espelmes enceses. Si bufes i en pages ${apagadas}, quantes espelmes queden al pastís?`,
        explicacion: (iniciales, apagadas) => `Permanència dels objectes! Encara que estiguin apagades, les espelmes segueixen essent físicament al pastís. Espelmes apagades: ${apagadas}, Espelmes enceses: ${iniciales - apagadas}, Total al pastís: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} germans (Joan, Lluís i Anna) tenen un gos junts. Quants gos hi ha en total a casa?`,
        explicacion: () => `Lectura atenta! El text diu que tenen UN gos "junts", no que cadascun tingui el seu. Resposta: 1 gos compartit.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `Hi ha ${mesa} taronges sobre una taula. Si tu vas i en prens ${coges}, quantes taronges tens ara?`,
        explicacion: (coges) => `Atenció a la pregunta! No pregunta quantes en queden a la taula, sinó quantes EN TENS TU. Resposta: Les ${coges} que acabas de prendre.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} nens intenten entrar sota un paraigua molt petit, però cap no es mulla. Quanta pluja fa?`,
        explicacion: () => `Utilitza el context! El cervell busca una explicació física complexa, però la resposta és simple: no plou. Per això ninguém es mulla.`
    },
    patas_pajaro: {
        texto: () => `Un ocell té 2 potes. Si es recolza en una branca només amb una pota i amaga l'altra entre les seves plomes, quantes potes té l'ocell ara?`,
        explicacion: () => `Permanència dels objectes! Encara que no es vegi, la pota segueix allà. L'ocell segueix tenint 2 potes. Visible: 1, Amagada: 1, Total: 2.`
    },
    carrera_posicion: {
        texto: () => `Estàs en una carrera i avances al que va segon. A quina posició estàs ara?`,
        explicacion: () => `Trampa desactivada! Si avances al segon, tu ocupes el seu lloc i passes a anar segon. El primer segueix essent el primer.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `Vas a la papereria i compres ${articulo.toLowerCase()} que costa ${precio}€. Si paques amb un bitllet de ${billete}€, quant et donen de canvi?`,
        explicacion: (precio, billete) => `Has de restar el preu del bitllet: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `Tens ${queso} entrepans de formatge a la motxilla. La teva mare arriba i et posa ${jamon} entrepans més de pernil. Quants entrepans tens en total per berenar?`,
        explicacion: (queso, jamon) => `Ajunta tots els entrepans! ${queso} + ${jamon} = ${queso + jamon} entrepans. 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `Al pati tenies ${inicial} bales brillants. Jugant amb un amic, en perds ${perdidas}. Quantes bales et queden a la bossa?`,
        explicacion: (inicial, perdidas) => `Recorda que perdre és com restar! ${inicial} - ${perdidas} = ${inicial - perdidas} bales. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Avui t'has portat molt bé i la profe t'ha donat ${estrellas} enganxines d'estrelles daurades i ${corazones} enganxines de cors vermells. Quantes enganxines tens ara?`,
        explicacion: (estrellas, corazones) => `Suma les estrelles i els cors! ${estrellas} + ${corazones} = ${estrellas + corazones} enganxines. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `Al teu garatge de joguina hi ha ${coches} cotxes aparcats. De sobte, ${salen} cotxes surten a tota velocitat per anar a una cursa. Quants cotxes s'han quedat al garatge?`,
        explicacion: (coches, salen) => `Si surten, n'hi ha menys a dins. ${coches} - ${salen} = ${coches - salen} cotxes. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `Hi ha una cistella amb ${total} pomes vermelles. Mirant-les de prop, veus que ${gusanitos} tenen un cuc i no es poden menjar. Quantes pomes bones queden?`,
        explicacion: (total, gusanitos) => `Treu les del cuc per saber quantes en queden! ${total} - ${gusanitos} = ${total - gusanitos} pomes bones. 🍎`
    },

    // LEVEL 2
    pastor_ovejas: {
        texto: (totales, vivas) => `Un pastor té ${totales} ovelles. Un llamp colpeja i moren totes excepte ${vivas}. Quantes ovelles li queden?`,
        explicacion: (totales, vivas) => `Trampa desactivada! El problema diu "totes excepte ${vivas}", així que li en queden exactament ${vivas}. No és ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Si en un any hi ha mesos que tienen 30 dies i altres que en tinnen 31, quants mesos tinnen 28 dies?`,
        explicacion: () => `Trampa desactivada! La pregunta no és quants mesos tinnen NOMÉS 28 dies, sinó quants mesos TINNEN 28 dies (entre altres). Tots els mesos de l'any tinnen almenys 28 dies, fins i tot febrer. La resposta és 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `A la biblioteca de classe hi ha ${inicial} llibres. El dilluns es van prestar ${prestados} llibres, però el divendres se'n van devolver ${devueltos}. Quants llibres hi ha ara?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `Has de restar els llibres prestats i sumar els devolts: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `Un autobús surt de la ciutat a les ${salida}:00 i arriba a la seva destinació a les ${llegada}:30. Quant de temps ha durat el viatge?`,
        explicacion: (salida, llegada) => `Des de les ${salida}:00 fins a les ${llegada}:30 hi ha ${llegada - salida} hores i 30 minuts.`
    },
    la_cerilla: {
        texto: () => `Entres en una habitació fosca i freda. Només tens una cerilla. Hi ha una estufa de carbó, una llanterna d'oli i una vela. Què encens primer?`,
        explicacion: () => `La cerilla, per suposat! Sense encendre la cerilla no pots encendre res més.`
    },
    peso_algodón: {
        texto: () => `Qué pesa més? Un quilogra de ferro o un quilogra de cotó?`,
        explicacion: () => `Pesen el mateix! Un quilogra és un quilogra, sigui quin sigui el material. La confusió ve del fet que el ferro és més dens, però estem parlant del mateix pes.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `Un granger té ${total} ovelles. Un dia ve un llop i fúgeixen-se totes excepte ${quedan}. Quantes ovelles li queden al granger?`,
        explicacion: (total, quedan) => `Trampa desactivada! La frase diu "totes excepte ${quedan}", així que la resposta està literalment en el problema. Li en queden exactament ${quedan}. No és ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `Estàs malalt i el metge te dóna ${pastillas} pastilles. Te diu que en prenguis una cada ${intervalo} minuts. Quant temps tardaran a prendre-les totes?`,
        explicacion: (pastillas, intervalo) => `Visualitza el temps! L'error comú és fer ${pastillas}×${intervalo}=${pastillas * intervalo}. Però: la primera la prens en el minut 0, la segona als ${intervalo} minuts, i la tercera als ${intervalo * (pastillas - 1)} minuts. Total: ${intervalo * (pastillas - 1)} minuts.`
    },
    hermano_tio: {
        texto: () => `El germà del meu oncle ve a visitar-me, però resulta que no és meu oncle. Qui és?`,
        explicacion: () => `Lógica familiar! El germà del meu oncle és meu pare. Si l'oncle del meu pare té un germà, i aquest germà no és meu oncle, llavors ha de ser meu pare. La confusió ve de buscar un parent "distant".`
    },
    reparto_cesta: {
        texto: () => `En una cesta hi ha 5 pomes. Has de repartir-les entre 5 amics de manera que cadascun en tingui una, però que al final en quedi una a la cesta. Com ho fas?`,
        explicacion: () => `Pensament lateral! La solució és: al últim amic li dónes la cesta AMB la poma dins. Així cadascun té una poma, i una segueix a la cesta. La trampa és suposar que "repartir" significa treure l'objecte del recipient.`
    },
    pescadores_familia: {
        texto: () => `Dos pares i dos fills van a pescar. Pesquen 3 peixos i cadascun n'obté un sense que en sobri cap. Quantes persones hi ha en total?`,
        explicacion: () => `Només hi ha 3 persones! L'avi i el pare són "dos pares", i el pare i el fill són "dos fills". En total: avi + pare + fill = 3 persones. L'error comú és sumar 2+2=4 persones.`
    },

    // LEVEL 3
    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} té ${n1} pomes. ${p2} xoca amb ell, ${p1} cau i es trenquen ${n2}. Si cada poma costa ${precio}€, quants diners deu ${p1} a ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `Atenció! Les pomes són de ${p1}. És ${p2} qui hauria de pagar ${p1} ${n2 * precio}€.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Un tren elèctric viatja cap al Nord a ${velocidad_tren} km/h. Si el vent bufa cap al Sud a ${velocidad_viento} km/h, quanta fum emet el tren?`,
        explicacion: () => `Trampa desactivada! És un tren ELÈCTRIC, no a vapor ni dièsel. Els trens elèctrics no emeten fum, alimentats directament per l'electricitat. Totes aquestes velocitats són distractors. La resposta és 0.`
    },
    despertador_antiguo: {
        texto: () => `Vas al llit a les 8 de la nit i poses una despertador analógica per que soni a les 9 del matí. Quantes hores hauras dormit quan soni l'alarma?`,
        explicacion: () => `Trampa! Els despertadors analógics no distingeixen entre AM i PM. Quan la maneta arribi al 9, sonarà a les 9 de la nit (1 hora més tard), no a les 9 del matí.`
    },
    padre_rosa: {
        texto: () => `El pare de Rosa té 5 filles: Lala, Lele, Lili, Lolo i... quin és el nom de la cinquena filla?`,
        explicacion: () => `Rosa! El patró de vocals (A, E, I, O) et distreu, però la pregunta ja mencionava que la primera filla és Rosa.`
    },
    dias_sin_nombre: {
        texto: () => `Nomena tres dies consecutius sense utilitzar les paraules Dilluns, Dimarts, Dimecres, Dijous, Divendres, Dissabte o Diumenge.`,
        explicacion: () => `Ahir, avui i demà! Aquests són dies consecutius però no pertanyen a la setmana tradicional, sinó a referencias temporals relatives.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `La mare ha posat un pastís al forn a les ${inicio}:00. Si el pastís tarda ${duracion} minuts en fer-se, a quina hora hem de treure'l?`;
        },
        explicacion: (duracion, fin) => `Sumem ${duracion} minuts. Resultat: ${fin}.`
    },
    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `Vius a la planta ${inicio}. Puxes ${sube1} plantes per visitar un amic, llavors baixes ${baja} per anar a la bugaderia i finalment puxes ${sube2} més per anar a la terrassa. ¿A quina planta és la terrassa?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `¡Exercici de memòria seqüencial! Has de seguir els moviments: planta ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. L'error comú és oblidar la planta de partida.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `En una família hi ha ${hermanas} germanes. Cada germana té un germà. ¿Quantes persones formen el grup de germans en total?`,
        explicacion: (hermanas, hermanos, respuesta) => `¡Atenció a la trampa! El cervell tendeix a sumar ${hermanas} + ${hermanas} = ${hermanas * 2}. Però el germà és el MATEIX per a les tres nenes. Total: ${hermanas} germanes + ${hermanos} germà = ${respuesta} persones.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `Un llibre té ${paginas} pàgines. Si llegeixes ${paginas_diarias} pàgines cada dia, començant un dilluns, ¿quin dia de la setmana acabaràs el llibre?`,
        explicacion: (paginas, paginas_diarias, dias) => `Calcula els dies: ${paginas} / ${paginas_diarias} = ${dias} dies. Llavors compta des del dilluns: el dia ${dias} és un dimecres (de la setmana següent).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `Si un caragol recorre ${velocidad} metres en una hora, ¿quant de temps tardarà a recorre ${distancia} metres si es para a descansar mitja hora a mig camí?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `El càlcul base és ${distancia} / ${velocidad} = ${distancia / velocidad} hores. Però no oblidis el temps de descans: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} hores (${tiempoTotal * 60} minuts).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `Una pinya pesa el mateix que ${pinasParaManzanas} pomes. Si una poma pesa ${pesoDeManzana} grams, ¿quant pesarà una cesta amb ${numeroDePinas} pinyes si la cesta buida no pesa res?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `És un problema de substitució. Primer troba el pes de la pinya: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} grams. Llavors multiplica per ${numeroDePinas} pinyes: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} grams.`
    },
    // LEVEL 4
    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `En una habitació hi ha ${mesas} taules amb ${patas_m} potes cadascuna i ${sillas} cadires amb ${patas_s} potes. Quantes potes hi ha en total si entren ${perros} gossos?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `Trampa! Molts obliden comptar les potes dels gossos. Taules: ${mesas}×${patas_m}=${mesas * patas_m}, Cadires: ${sillas}×${patas_s}=${sillas * patas_s}, Gossos: ${perros}×${patas_p}=${perros * patas_p}. Total: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomàs ha plantat una horta amb ${filas} files de pomers. Si en cada fila hi ha ${arboles} arbres, quants arbres té en total?`,
        explicacion: (filas, arboles, total) => `Has de multiplicar el nombre de files pel nombre d'arbres en cada fila: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman ha entrenat durant ${horas} hores avui. Quants minuts ha estat entrenant en total?`,
        explicacion: (horas, total) => `Per convertir hores a minuts multipliquem per 60: ${horas} × 60 = ${total} minuts.`
    },
    reloj_espejo: {
        texto: (hora) => `Mires un relotge de manetes a través d'un espill. Les manetes mostren les ${hora} en punt. Quina hora és realment?`,
        explicacion: (hora, real) => `L'espill inverteix horitzontalment. La posició del ${hora} es converteix en la del ${real}. L'hora real és les ${real} en punt.`
    },
    arca_moises: {
        texto: () => `Quants animals de cada espècie va portar Moisès a la seva arca?`,
        explicacion: () => `Cap! Va ser Noé qui va construir l'arca, no Moisès. Moltes persones responen "parelles" sense notar l'error en el nom.`
    },
    cesta_huevos: {
        texto: () => `En una cistella hi ha 6 ous. 6 persones compren un ou cadascuna i, al final, queda un ou a la cistella. Quants ous queden a la cistella?`,
        explicacion: () => `Un! L'última persona es va portar la cistella amb l'ou dins. No és que un ou hagi desaparegut, sinó que va viatjar dins del seu contenidor.`
    },
    hermanos_juan: {
        texto: () => `Joan té 3 germanes. Cada una de les seves germanes té un únic germà. Quants germans varons té Joan en total?`,
        explicacion: () => `Trampa activada! El cervell vol sumar, però la resposta és 0. L'"únic germà" de totes les seves germanes és el propi Joan. Joan no té més germans.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `Un avió s'estrellen just a la frontera entre ${pais1} i ${pais2}. En quin país enterren als supervivents?`,
        explicacion: () => `Trampa del llenguatge! Els supervivents NO s'enterren! El problema esmentada "frontera" per distreure't, però la clau és que hi ha supervivents.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `Hi ha ${iniciales} espelmes enceses sobre una taula. Un corrent d'aire n'apaga ${apagadas}. Si ningú no les torna a encendre, quantes espelmes queden l'endemà?`,
        explicacion: (encendidas, apagadas) => `Pensament temporal! Les ${encendidas} espelmes que van quedar enceses es consumiran completament durant la nit. Només restaran les ${apagadas} espelmes apagades, que es mantenen intactes.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `Una cistella plena de pomes pesa ${llena} kg. La cistella buida pesa ${caja} kg. Si et menges la meitat de les pomes, quant pesa la cistella ara?`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Pas 1: Pes de les pomes = ${llena} - ${caja} = ${manzanas} kg. Pas 2: Meitat de pomes = ${manzanas} ÷ 2 = ${mitad} kg. Pas 3: Cistella + pomes restants = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Hi ha ${inicial} ocells en una branca. Un caçador dispara i n'acerta un. Quants ocells queden a la branca?`,
        explicacion: (inicial) => `Realisme lógic! L'ocell ferit cau al sòl i els altres ${inicial - 1} ocells s'envolten assustats pel tret. Resultat: 0 ocells a la branca.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Una rajola pesa 1 kg més mitja rajola. Quant pesen una rajola i mitja?`,
        explicacion: () => `Àlgebra: Si una rajola (x) = 1 + x/2, aleshores x/2 = 1, per tant x = 2 kg. Una rajola i mitja = 2 + 1 = 3 kg. La trampa comú és respondre 1.5 kg sense resoldre l'equació.`
    },

    // LEVEL 5
    peso_ladrillo: {
        texto: (extra) => `Si una rajola pesa ${extra} kg més mitja rajola, quant pesen una rajola i mitja?`,
        explicacion: (extra, ladrillo, resultado) => `Desafiament desactivat! Si X = pes d'una rajola, aleshores X = ${extra} + X/2, així que X = ${ladrillo} kg. Una rajola i mitja pesa ${ladrillo} + ${ladrillo / 2} = ${resultado} kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `Un pastor ha de creuar un riu amb un llop, una ovella i una col. La barca només pot contenir ell i una cosa més. Si deixa el llop amb l'ovella, el llop se la menja. Si deixa l'ovella amb la col, l'ovella se la menja. Quants viatges necessita fer com a mínim? (Cada anada o tornada compta com 1 viatge)`,
        explicacion: () => `Solució: 1. Cruem l'ovella. 2. Tornem sol. 3. Cruem el llop (i portem l'ovella de tornada). 4. Cruem la col. 5. Tornem sol. 6. Cruem l'ovella. Total: 6 viatges.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `Mires un relotge de manetes a través d'un espill. Les manetes mostren les ${hora}:00. Quina hora és realment?`,
        explicacion: (hora, real) => `L'espill inverteix la posició horitzontal del relotge. La fórmula és: hora real = 12 - hora en espill. Aleshores: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `Un cargol està al fons d'un pou de ${profundidad} metres. Durant el dia puja ${sube} metres, però a la nit rellisca ${resbala} metres. En quants dies sortirà del pou?`,
        explicacion: (profundidad, sube, resbala, dias) => `Lógica seqüencial! El càlcul instintiu és ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} dies. Però el dia ${dias}, el cargol comença a ${profundidad - sube}m, puja ${sube}m i arriba a ${profundidad}m, així que surt i no rellisca aquella nit!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `Quan jo tenia ${edad_pasada} anys, la meva germana tenia la meitat de la meva edat. Ara que tinc ${edad_actual} anys, quants anys té la meva germana?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `Relació variable constant! La ment busca la proporció "meitat" (${edad_actual}/2=${edad_actual / 2}), però la diferència d'edat és constant. Si fa temps havia ${diferencia} anys de diferència, ara segueix havent ${diferencia} anys. Resposta: ${edad_actual} - ${diferencia} = ${resultado} anys.`
    },
    contar_digito_siete: {
        texto: (paginas) => `Estàs numerant les pàgines d'un llibre que té exactament ${paginas} pàgines. Quantes vegades escriuràs el dígit '7'?`,
        explicacion: () => `Patrons numèrics! Molts només compten els 7s en les unitats (7,17,27...97) = 10. Però obliden els 7s a la desena 70-79 (10 més). El nombre 77 té dos 7s. Total: 10 + 10 = 20 vegades.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `Una raqueta i una pilota costen juntes ${total_costo.toFixed(2)}€. La raqueta costa ${diferencia.toFixed(2)}€ més que la pilota. Quant costa la pilota?`,
        explicacion: () => `Equació de diferència! La resposta automàtica és 0.10€, però si la pilota costés 0.10€, la raqueta costaria 1.10€, i el total seria 1.20€. Correctament: Si pilota = x, aleshores raqueta = x + 1. x + (x + 1) = 1.10 → 2x = 0.10 → x = 0.05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Dos trens estan en vies oposades a ${distancia} km de distància i s'acosten l'un a l'altre a ${velocidad_t} km/h cadascun. Un ocell surt del Tren A a ${velocidad_p} km/h cap al Tren B, i quan l'assoleix, torna al Tren A, i així successivament fins que els trens xoquen. Quina és la distància total recorreguda per l'ocell?`,
        explicacion: (velocidad_p, tiempo, velocidad_t) => `¡La trampa del càlcul infinit! Molts intenten calcular cada trajectòria de l'ocell (sèrie infinita). El truc és calcular el temps: els trens tardaran ${tiempo} hora a trobar-se (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h de velocitat relativa). Si l'ocell vola a ${velocidad_p} km/h durant aquesta hora, recorre exactament ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Abans d'ahir tenia ${edad_anteayer} anys i l'any que ve tindré ${edad_proximo}. Quants anys tinc avui? (Sabent que avui és 1 de gener)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `¡Lògica temporal! Sembla impossible passar de ${edad_anteayer} a ${edad_proximo} en tan poc temps. La solució: 1. Ahir (31 de desembre) vaig fer ${edad_hoy}. 2. Abans d'ahir (30 de desembre) encara tenia ${edad_anteayer}. 3. Enguany faré ${edad_hoy + 1} en desembre. 4. L'any que ve faré ${edad_proximo}. Avui: ${edad_hoy} anys.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Un cub de fusta de ${tamano}×${tamano}×${tamano} cm es pinta de blau per fora. Després es talla en ${total} cubets de 1×1×1 cm. Quants d'aquests cubets tindran exactament 2 cares pintades de blau?`,
        explicacion: (aristas, tamano, respuesta) => `¡Visualització espacial! El cervell intenta comptar les cares totals, però el truc és saber que els cubs amb 2 cares pintades són els que estan en les arestes (però no en les cantonades, que en tenen 3). Un cub té ${aristas} arestes, i en aquest cas hi ha 1 cubet central per aresta. Total: ${respuesta} cubets.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `El corredor A guanya el corredor B per ${ventaja} metres. El corredor B guanya el corredor C per ${ventaja} metres. Si els tres corren ${distancia} metres, per quants metres guanya A a C?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `¡La trampa de la suma! La resposta intuïtiva és ${ventaja + ventaja} metres (${ventaja}+${ventaja}). Però les distàncies són proporcionals a la velocitat. C corre al ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% de la velocitat de A. Avantatge real: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Si ${monos_ini} micos triguen ${tiempo_ini} minuts en menjar-se ${platanos_ini} plàtans, quant temps tardaran ${monos_fin} micos en menjar-se ${platanos_fin} plàtans?`,
        explicacion: (tiempo_ini) => `¡La trampa de la regla de tres! S'intenta aplicar una proporció directa. Però el ritme és d'1 mica per plàtan cada ${tiempo_ini} minuts. Si tots comencen a menjar al mateix temps, terminen al mateix temps. La relació micos:plàtans és la mateixa (1:1), així que el temps es manté constant: ${tiempo_ini} minuts.`
    },
    // NOUS PROBLEMES NIVELL 2
    horno_galletas: {
        texto: (chocolate, vainilla, vendidas) => `A la pastisseria han cuit al forn ${chocolate} galetes de xocolata i ${vainilla} galetes de vainilla. Si ja n'han venut ${vendidas}, quantes galetes queden a la safata ?`,
        explicacion: (chocolate, vainilla, vendidas) => `Primer suma totes les galetes: ${chocolate} + ${vainilla} = ${chocolate + vainilla}. Després resta les venudes: ${chocolate + vainilla} - ${vendidas} = ${chocolate + vainilla - vendidas} galetes.`
    },
    estantes_biblioteca: {
        texto: (estantes, libros_estante) => `A la biblioteca de la classe hi ha ${estantes} estants. Si cada estant té exactament ${libros_estante} llibres, quants llibres hi ha en total a la biblioteca?`,
        explicacion: (estantes, libros_estante) => `Pots sumar ${libros_estante} + ${libros_estante}... (${estantes} vegades) o usar la multiplicació: ${estantes} × ${libros_estante} = ${estantes * libros_estante} llibres.`
    },
    reparto_caramelos: {
        texto: (caramelos_total, amigos) => `Tens ${caramelos_total} caramels de mafressa i els vols repartir en parts iguals entre els teus ${amigos} millors amics. Quants caramels rebrà cada amic ?`,
        explicacion: (caramelos_total, amigos) => `Quin número multiplicat per ${amigos} ens dona ${caramelos_total}? La resposta és: ${caramelos_total} ÷ ${amigos} = ${caramelos_total / amigos} caramels per a cada amic.`
    },
    ahorro_juguete: {
        texto: (precio, ahorros, regalo) => `Vols comprar un cotxe teledirigit que costa ${precio}€. Si ja tens estalviats ${ahorros}€ a la teva poma i la teva àvia te'n regala ${regalo}€ més, quants diners te'n manquen encara per a poder comprar-lo?`,
        explicacion: (precio, ahorros, regalo) => `Suma el que tens: ${ahorros} + ${regalo} = ${ahorros + regalo}€. Ara resta-ho del preu: ${precio} - ${ahorros + regalo} = ${precio - (ahorros + regalo)}€. Te'n manquen ${precio - (ahorros + regalo)}€.`
    },
    plantas_jardin: {
        texto: (medida_inicial, crecimiento_dia, dias) => `Cada dia rellenes la teva planta i creix ${crecimiento_dia} centímetres. Si el dilluns mesura ${medida_inicial} centímetres, quant mesurarà després de ${dias} dies si continua creixent igual cada dia?`,
        explicacion: (medida_inicial, crecimiento_dia, dias) => `Calcula el creixement total: ${dias} dies × ${crecimiento_dia} cm/dia = ${dias * crecimiento_dia} cm de creixement. Suma l'altura inicial: ${medida_inicial} + ${dias * crecimiento_dia} = ${medida_inicial + dias * crecimiento_dia} cm.`
    }
};

export default problemsCA;
