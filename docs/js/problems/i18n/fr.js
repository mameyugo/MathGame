/**
 * Traductions des Problèmes - FRANÇAIS (fr)
 * Système modulaire de textes pour tous les problèmes
 */

export const problemsFR = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `Nous achetons ${cantidad} gommes. Chacune coûte ${precio}€. Combien payons-nous au total?`,
        explicacion: (cantidad, precio) => `Tu dois multiplier le nombre de gommes par le prix: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `Si sur une main j'ai 5 doigts et sur deux mains j'ai 10 doigts, combien de doigts y a-t-il sur ${manos} mains?`,
        explicacion: (manos) => `Réfléchis bien! Chaque main a 5 doigts. Donc: 5 × ${manos} = ${manos * 5} doigts au total.`
    },
    peces_ahogados: {
        texto: () => `Dans un aquarium il y a 10 poissons. Si 5 d'entre eux se noient, combien de poissons restent dans l'aquarium?`,
        explicacion: () => `Piège désactivé! Les poissons ne se noient pas dans l'eau. C'est leur habitat naturel. Il y a toujours 10 poissons.`
    },
    gallo_huevos: {
        texto: () => `Un coq pond un œuf juste au bord du toit d'une grange. Si le vent souffle vers la droite, de quel côté l'œuf tombera-t-il?`,
        explicacion: () => `Piège désactivé! Les coqs ne pondent pas d'œufs, ce sont les poules. Par conséquent, il n'y a pas d'œuf qui tombe.`
    },
    patas_mesa_gato: {
        texto: (patas) => `Une table a ${patas} pieds. Si un chat monte sur la table, combien de pieds touchent maintenant le sol?`,
        explicacion: (patas) => `Piège désactivé! Les pattes du chat sont sur la table, pas sur le sol. Seuls les ${patas} pieds de la table touchent le sol.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `Tu as un panier avec ${inicial} poires. Si tu me donnes ${regaladas} poires, combien de poires as-tu maintenant?`,
        explicacion: (inicial, regaladas) => `Après avoir donné ${regaladas} poires de ton panier de ${inicial}, il t'en reste: ${inicial} - ${regaladas} = ${inicial - regaladas} poire(s).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `Dans un gâteau d'anniversaire il y a ${iniciales} bougies allumées. Si tu en souffles ${apagadas}, combien de bougies restent sur le gâteau?`,
        explicacion: (iniciales, apagadas) => `Permanence des objets! Même si elles sont éteintes, les bougies restent physiquement sur le gâteau. Bougies éteintes: ${apagadas}, Bougies allumées: ${iniciales - apagadas}, Total sur le gâteau: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} frères et sœurs (Jean, Louis et Anne) ont un chien ensemble. Combien de chiens y a-t-il au total à la maison?`,
        explicacion: () => `Lecture attentive! Le texte dit qu'ils ont UN chien "ensemble", pas que chacun en ait un. Réponse: 1 chien partagé.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `Il y a ${mesa} oranges sur une table. Si tu vas et en prends ${coges}, combien d'oranges as-tu maintenant?`,
        explicacion: (coges) => `Attention à la question! Elle ne demande pas combien en restent sur la table, mais combien EN AS-TU. Réponse: Les ${coges} que tu viens de prendre.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} enfants essaient de se mettre sous un très petit parapluie, mais aucun ne se mouille. Combien de pluie tombe?`,
        explicacion: () => `Utilise le contexte! Le cerveau cherche une explication physique complexe, mais la réponse est simple: il ne pleut pas. C'est pourquoi personne ne se mouille.`
    },
    patas_pajaro: {
        texto: () => `Un oiseau a 2 pattes. S'il s'appuie sur une branche avec une seule patte et cache l'autre dans ses plumes, combien de pattes a l'oiseau maintenant?`,
        explicacion: () => `Permanence des objets! Même si elle n'est pas visible, la patte est toujours là. L'oiseau a toujours 2 pattes. Visible: 1, Cachée: 1, Total: 2.`
    },
    carrera_posicion: {
        texto: () => `Tu es dans une course et tu dépasses celui qui est deuxième. À quelle position es-tu maintenant?`,
        explicacion: () => `Piège désactivé! Si tu dépasses le deuxième, tu prends sa place et tu deviens deuxième. Le premier reste premier.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `Tu vas à la papeterie et tu achètes ${articulo.toLowerCase()} qui coûte ${precio}€. Si tu paies avec un billet de ${billete}€, combien de monnaie te rendent-ils?`,
        explicacion: (precio, billete) => `Tu dois soustraire le prix du billet: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `Tu as ${queso} sandwichs au fromage dans ton sac. Ta maman arrive et t'ajoute ${jamon} sandwichs au jambon. Combien de sandwichs as-tu au total pour le goûter ?`,
        explicacion: (queso, jamon) => `Mets tous les sandwichs ensemble ! ${queso} + ${jamon} = ${queso + jamon} sandwichs. 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `À la récré, tu avais ${inicial} billes brillantes. En jouant avec un ami, tu perds ${perdidas} billes. Combien de billes te restent dans la poche ?`,
        explicacion: (inicial, perdidas) => `Souviens-toi que perdre, c'est comme soustraire ! ${inicial} - ${perdidas} = ${inicial - perdidas} billes. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Aujourd'hui tu t'es très bien comporté et la prof t'a donné ${estrellas} autocollants d'étoiles dorées et ${corazones} autocollants de cœurs rouges. Combien d'autocollants as-tu maintenant ?`,
        explicacion: (estrellas, corazones) => `Additionne les étoiles et les cœurs ! ${estrellas} + ${corazones} = ${estrellas + corazones} autocollants. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `Dans ton garage de jouets, il y a ${coches} voitures garées. Soudain, ${salen} voitures partent à toute vitesse pour une course. Combien de voitures restent dans le garage ?`,
        explicacion: (coches, salen) => `Si elles partent, il y a moins de voitures à l'intérieur. ${coches} - ${salen} = ${coches - salen} voitures. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `Il y a un panier avec ${total} pommes rouges. En regardant de près, tu vois que ${gusanitos} ont un ver et ne peuvent pas être mangées. Combien de bonnes pommes restent ?`,
        explicacion: (total, gusanitos) => `Enlève celles avec le ver pour savoir combien il en reste ! ${total} - ${gusanitos} = ${total - gusanitos} bonnes pommes. 🍎`
    },
    // NOUVEAUX L1 FR
    l1_suma_juguetes: {
        texto: (coches, motos) => `Tu as ${coches} petites voitures et on t'offre ${motos} motos. Combien de véhicules as-tu maintenant au total ?`,
        explicacion: (coches, motos) => `Additionne les voitures et les motos pour connaître le total : ${coches} + ${motos} = ${coches + motos}. 🚗🏍️`
    },
    l1_resta_caramelos: {
        texto: (inicial, comidos) => `Dans un sac, il y a ${inicial} bonbons. Si tu en manges ${comidos}, combien en reste-t-il dans le sac ?`,
        explicacion: (inicial, comidos) => `Si tu les manges, ils ne sont plus dans le sac. ${inicial} - ${comidos} = ${inicial - comidos}. 🍬`
    },
    l1_patas_bancos: {
        texto: (bancos) => `Dans le parc, il y a ${bancos} bancs pour s'asseoir. Si chaque banc a 4 pieds, combien de pieds y a-t-il au total ?`,
        explicacion: (bancos) => `Compte 4 pieds pour chaque banc : ${bancos} x 4 = ${bancos * 4}. 🪑`
    },
    l1_autobus_bajan: {
        texto: (total, bajan) => `Dans un bus, il y a ${total} personnes. À l'arrêt, ${bajan} personnes descendent. Combien de personnes restent dans le bus ?`,
        explicacion: (total, bajan) => `Soustrais les personnes qui sont descendues : ${total} - ${bajan} = ${total - bajan}. 🚌`
    },
    l1_total_libros: {
        texto: (rojos, azules) => `Sur une étagère, il y a ${rojos} livres rouges et ${azules} livres bleus. Combien de livres y a-t-il en tout ?`,
        explicacion: (rojos, azules) => `Mets les livres rouges et bleus ensemble pour trouver le total : ${rojos} + ${azules} = ${rojos + azules}. 📚`
    },
    l1_conductor_nombre: {
        opciones: ["Moi", "Pierre", "Le bus", "Personne"],
        texto: (pasajeros) => `Imagine que tu conduis un bus avec ${pasajeros} passagers. Qui est le conducteur ?`,
        explicacion: () => `Le conducteur, c'est TOI ! La question dit "Imagine que tu conduis...". 🚌`
    },
    l1_agujero_profundo: {
        texto: (metros) => `Tu creuses un trou de ${metros} mètres de profondeur dans le sable. Combien de terre y a-t-il à l'intérieur du trou ?`,
        explicacion: () => `C'est un trou ! S'il y avait de la terre dedans, ce ne serait pas un trou de cette profondeur. Il est vide (0).`
    },
    l1_caja_vacia: {
        texto: () => `Combien de melons tiennent dans une boîte vide ?`,
        explicacion: () => `Un seul tient. Après avoir mis le premier, la boîte n'est plus vide. 📦`
    },
    l1_dia_siguiente: {
        dias: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        texto: function (ayer, manana) {
            return `Si hier c'était ${this.dias[ayer]}, quel jour serons-nous demain ?`;
        },
        explicacion: function (ayer, manana) {
            const hoy = (ayer + 1) % 7;
            return `Si hier c'était ${this.dias[ayer]}, aujourd'hui c'est ${this.dias[hoy]}. Et si aujourd'hui c'est ${this.dias[hoy]}, demain ce sera ${this.dias[manana]} !`;
        },
        opciones: function (indice) {
            return this.dias[indice];
        }
    },
    l1_hijo_padre: {
        texto: () => `Thomas est le fils de mon père, mais ce n'est pas mon frère. Combien de frères ai-je ?`,
        explicacion: () => `Thomas, c'est MOI ! S'il est le fils de mon père et pas mon frère, je dois être lui-même. (0 frère).`
    },

    // LEVEL 2
    l2_suma_resta_dinero: {
        texto: (inicial, gasto, encontrado) => `Tu avais ${inicial}€, tu as dépensé ${gasto}€ pour un livre, puis tu as trouvé ${encontrado}€. Combien d'argent as-tu maintenant ?`,
        explicacion: (inicial, gasto, encontrado) => `Soustrais ce que tu as dépensé et ajoute ce que tu as trouvé : ${inicial} - ${gasto} + ${encontrado} = ${inicial - gasto + encontrado}. 💶`
    },
    l2_patas_animales: {
        texto: (perros, gatos) => `Dans une ferme, il y a ${perros} chiens et ${gatos} chats. Combien de pattes y a-t-il au total ?`,
        explicacion: (perros, gatos) => `Additionne les animaux (${perros} + ${gatos}) et multiplie par 4 pattes : (${perros + gatos}) x 4 = ${(perros + gatos) * 4}. 🐾`
    },
    l2_doble_cromos: {
        texto: (tuyos) => `Tu as ${tuyos} autocollants et ton ami en a le double. Combien d'autocollants a ton ami ?`,
        explicacion: (tuyos) => `Le double signifie multiplier par 2 : ${tuyos} x 2 = ${tuyos * 2}.`
    },
    l2_mitad_galletas: {
        texto: (total) => `Tu as ${total} biscuits et tu en manges la moitié. Combien de biscuits reste-t-il ?`,
        explicacion: (total) => `La moitié signifie diviser par 2 : ${total} / 2 = ${total / 2}. 🍪`
    },
    l2_bolsas_caramelos: {
        texto: (bolsas, caramelos) => `Tu as ${bolsas} sacs avec ${caramelos} bonbons dans chacun. Combien de bonbons as-tu au total ?`,
        explicacion: (bolsas, caramelos) => `Multiplie les sacs par les bonbons : ${bolsas} x ${caramelos} = ${bolsas * caramelos}. 🍬`
    },
    l2_secuencia_simple: {
        texto: (n1, n2, n3, n4) => `Quel nombre suit dans la suite ? ${n1}, ${n2}, ${n3}, ${n4}...`,
        explicacion: (n1, n2, n3, n4) => `Regarde de combien chaque nombre augmente. C'est le pas !`
    },
    l2_hermana_nosoy: {
        opciones: ["Sœur", "Frère", "Tante", "Cousine"],
        texto: () => `Si je suis ton frère, mais que tu n'es pas mon frère, qui es-tu ?`,
        explicacion: () => `Tu es ma SŒUR ! Si tu n'es pas mon frère (garçon), tu dois être une fille.`
    },
    l2_mapa_ciudades: {
        opciones: ["Carte", "Livre", "Rêve", "Télé"],
        texto: () => `J'ai des villes mais pas de maisons, des montagnes mais pas d'arbres, et de l'eau mais pas de poissons. Que suis-je ?`,
        explicacion: () => `Une carte. Elle représente tout cela sans l'avoir physiquement.`
    },
    l2_esponja_agua: {
        opciones: ["Éponge", "Seau", "Filet", "Bouteille"],
        texto: () => `Je suis plein de trous mais je peux encore retenir l'eau. Que suis-je ?`,
        explicacion: () => `Une éponge. Ses pores (trous) absorbent et retiennent l'eau.`
    },
    l2_romper_silencio: {
        opciones: ["Silence", "Verre", "Promesse", "Miroir"],
        texto: () => `Je suis si fragile que si tu dis mon nom, tu me brises. Que suis-je ?`,
        explicacion: () => `Le Silence. Quand tu parles (dis son nom), ce n'est plus le silence.`
    },

    pastor_ovejas: {
        texto: (totales, vivas) => `Un berger a ${totales} moutons. Un éclair frappe et tous meurent sauf ${vivas}. Combien de moutons lui restent-ils?`,
        explicacion: (totales, vivas) => `Piège désactivé! Le problème dit "tous sauf ${vivas}", donc il lui en reste exactement ${vivas}. Ce n'est pas ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Si dans une année il y a des mois qui ont 30 jours et d'autres qui en ont 31, combien de mois ont 28 jours?`,
        explicacion: () => `Piège désactivé! La question ne demande pas combien de mois ont SEULEMENT 28 jours, mais combien de mois ONT 28 jours (entre autres). Tous les mois de l'année ont au moins 28 jours, même février. La réponse est 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `À la bibliothèque de classe il y a ${inicial} livres. Lundi ${prestados} livres ont été empruntés, mais vendredi ${devueltos} ont été rendus. Combien de livres y a-t-il maintenant?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `Tu dois soustraire les livres empruntés et ajouter les rendus: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `Un bus quitte la ville à ${salida}:00 et arrive à destination à ${llegada}:30. Combien de temps le voyage a-t-il duré?`,
        explicacion: (salida, llegada) => `De ${salida}:00 à ${llegada}:30 il y a ${llegada - salida} heures et 30 minutes.`
    },
    la_cerilla: {
        texto: () => `Tu entres dans une pièce sombre et froide. Tu n'as qu'une allumette. Il y a un poêle à charbon, une lampe à huile et une bougie. Que allumes-tu d'abord?`,
        explicacion: () => `L'allumette, bien sûr! Sans allumer l'allumette tu ne peux allumer rien d'autre.`
    },
    peso_algodón: {
        texto: () => `Qu'est-ce qui pèse plus? Un kilogramme de fer ou un kilogramme de coton?`,
        explicacion: () => `Ils pèsent la même chose! Un kilogramme est un kilogramme, peu importe le matériau. La confusion vient du fait que le fer est plus dense, mais nous parlons du même poids.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `Un fermier a ${total} moutons. Un jour un loup arrive et tous s'échappent sauf ${quedan}. Combien de moutons le fermier a-t-il?`,
        explicacion: (total, quedan) => `Piège désactivé! La phrase dit "tous sauf ${quedan}", donc la réponse est littéralement dans le problème. Il lui en reste exactement ${quedan}. Ce n'est pas ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `Tu es malade et le médecin te donne ${pastillas} comprimés. Il te dit de prendre un chaque ${intervalo} minutes. Combien de temps te faudra-t-il pour les prendre tous?`,
        explicacion: (pastillas, intervalo) => `Visualise le temps! L'erreur commune est de faire ${pastillas}×${intervalo}=${pastillas * intervalo}. Mais: tu prends le premier à la minute 0, le second à ${intervalo} minutes, et le troisième à ${intervalo * (pastillas - 1)} minutes. Total: ${intervalo * (pastillas - 1)} minutes.`
    },
    hermano_tio: {
        texto: () => `Le frère de mon oncle vient me visiter, mais il s'avère que ce n'est pas mon oncle. Qui est-ce?`,
        explicacion: () => `Logique familiale! Le frère de mon oncle est mon père. Si l'oncle de mon père a un frère, et ce frère n'est pas mon oncle, alors c'est mon père. La confusion vient de chercher un parent "éloigné".`
    },
    reparto_cesta: {
        texto: () => `Il y a 5 pommes dans un panier. Tu dois les distribuer parmi 5 amis afin que chacun en ait une, mais à la fin il en reste une dans le panier. Comment fais-tu?`,
        explicacion: () => `Pensée latérale! La solution est: tu donnes le panier AU dernier ami AVEC la pomme dedans. Ainsi chacun a une pomme, et une reste dans le panier. Le piège est de supposer que "distribuer" signifie sortir l'objet du récipient.`
    },
    pescadores_familia: {
        texto: () => `Deux pères et deux fils vont à la pêche. Ils attrapent 3 poissons et chacun en reçoit un sans reste. Combien de personnes y a-t-il en total?`,
        explicacion: () => `Il n'y a que 3 personnes! Le grand-père et le père sont "deux pères", et le père et le fils sont "deux fils". Au total: grand-père + père + fils = 3 personnes. L'erreur commune est d'ajouter 2+2=4 personnes.`
    },

    // LEVEL 3
    // LEVEL 3
    l3_jerarquia_ops: {
        texto: (a, b, c) => `Résous : ${a} + ${b} × ${c} = ?`,
        explicacion: (a, b, c) => `Rappelle-toi la hiérarchie ! D'abord la multiplication, puis l'addition : ${b}×${c}=${b * c}, ensuite ${a}+${b * c}=${a + (b * c)}. Ne fais pas (${a}+${b})×${c}.`
    },
    l3_horas_minutos: {
        texto: (horas, minutos) => `Un film dure ${horas} heure(s) et ${minutos} minutes. Combien de minutes cela fait-il au total ?`,
        explicacion: (horas, minutos) => `1 heure fait 60 minutes. ${horas}h × 60 = ${horas * 60} min. Ajoute les ${minutos} min restants : ${horas * 60} + ${minutos} = ${(horas * 60) + minutos}. ⏱️`
    },
    l3_gramos_kilos: {
        texto: (kilos, gramos) => `Tu as acheté ${kilos}kg et ${gramos}g de farine. Combien de grammes cela fait-il au total ?`,
        explicacion: (kilos, gramos) => `1 kilo fait 1000 grammes. ${kilos}kg = ${kilos * 1000}g. Total : ${kilos * 1000} + ${gramos} = ${(kilos * 1000) + gramos}g.`
    },
    l3_triple_suma: {
        texto: (base) => `Un stylo coûte ${base}€. Un cahier coûte le triple. Combien coûtent les deux ensemble ?`,
        explicacion: (base) => `Cahier : ${base} x 3 = ${base * 3}€. Stylo : ${base}€. Total : ${base * 3} + ${base} = ${base * 4}€.`
    },
    l3_dias_semanas: {
        texto: (semanas, dias) => `Tu pars en vacances ${semanas} semaines et ${dias} jours. Combien de jours cela fait-il au total ?`,
        explicacion: (semanas, dias) => `Une semaine a 7 jours. ${semanas} semaines = ${semanas * 7} jours. Ajoute ${dias} : ${semanas * 7} + ${dias} = ${(semanas * 7) + dias}.`
    },
    l3_logica_carrera: {
        opciones: ["Deuxième", "Premier", "Avant-dernier", "Dernier"],
        texto: () => `Tu es dans une course et tu doubles le deuxième. À quelle position es-tu maintenant ?`,
        explicacion: () => `Deuxième ! Si tu doubles celui qui était deuxième, tu prends sa place. Tu n'es pas encore premier.`
    },
    l3_logica_meses_28: {
        opciones: ["12", "1", "6", "0"],
        texto: () => `Combien de mois de l'année ont 28 jours ?`,
        explicacion: () => `Tous les 12 ! Janvier en a 31 (donc il en a 28), Février en a 28, etc. La question ne disait pas "seulement" 28.`
    },
    l3_logica_padre_hijo: {
        opciones: ["Mère", "Père", "Grand-mère", "Oncle"],
        texto: () => `Le père de Juan dit à son fils : "Montre cette dame, c'est la mère de ta mère". Qui est la dame pour Juan ?`,
        explicacion: () => `La Grand-mère ! La mère de sa mère est sa grand-mère maternelle.`
    },
    l3_logica_paraguas: {
        opciones: ["Il ne pleuvait pas", "Ils avaient des parapluies", "Ils étaient des poissons", "Ils couraient vite"],
        texto: (personas) => `${personas} personnes marchent sous un petit parapluie mais aucune ne se mouille. Comment est-ce possible ?`,
        explicacion: () => `Parce qu'il ne pleuvait pas ! Le contexte suggère la pluie, mais ne le dit pas explicitement.`
    },
    l3_logica_globo: {
        opciones: ["Trous", "Air", "Pierres", "Eau"],
        texto: () => `Que peux-tu mettre dans un tonneau pour qu'il pèse moins lourd ?`,
        explicacion: () => `Des trous ! En enlevant de la matière pour faire le trou, le tonneau perd du poids.`
    },

    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} a ${n1} pommes. ${p2} le heurte, ${p1} tombe et ${n2} se cassent. Si chaque pomme coûte ${precio}€, combien d'argent ${p1} doit-il à ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `Attention! Les pommes appartiennent à ${p1}. C'est ${p2} qui devrait payer ${p1} ${n2 * precio}€.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Un train électrique voyage vers le Nord à ${velocidad_tren} km/h. Si le vent souffle vers le Sud à ${velocidad_viento} km/h, combien de fumée le train émet-il?`,
        explicacion: () => `Piège désactivé! C'est un train ÉLECTRIQUE, pas à vapeur ou diesel. Les trains électriques n'émettent pas de fumée, ils sont alimentés directement par l'électricité. Toutes ces vitesses sont des distracteurs. La réponse est 0.`
    },
    despertador_antiguo: {
        texto: () => `Tu vas au lit à 20h et tu mets un réveil analogique pour qu'il sonne à 9h du matin. Combien d'heures auras-tu dormi quand l'alarme sonne?`,
        explicacion: () => `Piège! Les réveils analogiques ne distinguent pas entre AM et PM. Quand la main atteint le 9, il sonnera à 21h (1 heure plus tard), pas à 9h du matin.`
    },
    padre_rosa: {
        texto: () => `Le père de Rose a 5 filles: Lala, Lele, Lili, Lolo et... quel est le nom de la cinquième fille?`,
        explicacion: () => `Rose! Le motif des voyelles (A, E, I, O) te distrait, mais la question mentionnait déjà que la première fille s'appelle Rose.`
    },
    dias_sin_nombre: {
        texto: () => `Nomme trois jours consécutifs sans utiliser les mots Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi ou Dimanche.`,
        explicacion: () => `Hier, aujourd'hui et demain! Ce sont des jours consécutifs mais ne font pas partie de la semaine traditionnelle, mais plutôt de références temporelles relatives.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `Maman a mis un gâteau au four à ${inicio}:00. Si le gâteau prend ${duracion} minutes pour cuire, à quelle heure devons-nous le sortir?`;
        },
        explicacion: (duracion, fin) => `Nous ajoutons ${duracion} minutes. Résultat: ${fin}.`
    },
    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `Tu habites au ${inicio}ème étage. Tu montes ${sube1} étages pour visiter un ami, puis tu descends ${baja} pour aller à la buanderie et enfin tu montes ${sube2} étages pour aller à la terrasse. À quel étage se trouve la terrasse?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `Exercice de mémoire séquentielle! Tu dois suivre les mouvements: étage ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. L'erreur courante est d'oublier l'étage de départ.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `Dans une famille il y a ${hermanas} sœurs. Chaque sœur a un frère. Combien de personnes forment le groupe de frères et sœurs au total?`,
        explicacion: (hermanas, hermanos, respuesta) => `Attention au piège! Le cerveau a tendance à ajouter ${hermanas} + ${hermanas} = ${hermanas * 2}. Mais le frère est le MÊME pour les trois filles. Total: ${hermanas} sœurs + ${hermanos} frère = ${respuesta} personnes.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `Un livre a ${paginas} pages. Si tu lis ${paginas_diarias} pages par jour, en commençant un lundi, quel jour de la semaine termineras-tu le livre?`,
        explicacion: (paginas, paginas_diarias, dias) => `Calcule les jours: ${paginas} / ${paginas_diarias} = ${dias} jours. Ensuite compte à partir de lundi: le jour ${dias} est un mercredi (de la semaine suivante).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `Si un escargot parcourt ${velocidad} mètres en une heure, combien de temps lui faudra-t-il pour parcourir ${distancia} mètres s'il s'arrête pour se reposer une demi-heure à mi-chemin?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `Le calcul de base est ${distancia} / ${velocidad} = ${distancia / velocidad} heures. Mais n'oublie pas le temps de repos: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} heures (${tiempoTotal * 60} minutes).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `Un ananas pèse autant que ${pinasParaManzanas} pommes. Si une pomme pèse ${pesoDeManzana} grammes, combien pèsera un panier avec ${numeroDePinas} ananas si le panier vide ne pèse rien?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `C'est un problème de substitution. D'abord, trouve le poids de l'ananas: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} grammes. Ensuite multiplie par ${numeroDePinas} ananas: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} grammes.`
    },
    // LEVEL 4
    // LEVEL 4
    l4_fracciones_visuales: {
        texto: (num) => `Tu as ${num} billes. Si tu en perds un quart (1/4), combien en as-tu perdu ?`,
        explicacion: (respuesta) => `Un quart signifie diviser par 4. La réponse est ${respuesta}.`
    },
    l4_decimales_dinero: {
        texto: (p1, p2) => `Tu achètes une glace pour ${p1}€ et un soda pour ${p2}€. Combien payes-tu au total ?`,
        explicacion: (total) => `Additionne les prix : ${total}€. N'oublie pas d'aligner la virgule.`
    },
    l4_ecuacion_simple: {
        texto: (suma, total) => `Je pense à un nombre. Si j'ajoute ${suma}, j'obtiens ${total}. À quel nombre ai-je pensé ?`,
        explicacion: (x, suma) => `Si ajouter ${suma} donne ${x + suma}, fais l'inverse : soustrais ${suma}.`
    },
    l4_area_rectangulo: {
        texto: (ancho, alto) => `Une pièce mesure ${ancho} mètres de large et ${alto} mètres de long. Quelle est son aire en m² ?`,
        explicacion: (area) => `L'aire est largeur x hauteur = ${area} m².`
    },
    l4_mitad_doble: {
        texto: (num) => `Si tu multiplies ${num} par 2 et que tu divises le résultat par 2, qu'obtiens-tu ?`,
        explicacion: () => `Le même nombre ! Multiplier et diviser par 2 s'annulent.`
    },
    l4_hija_teresa: {
        opciones: ["Ma fille", "Ma mère", "Moi", "Ma grand-mère"],
        texto: () => `La fille de Teresa est la mère de ma fille. Qui suis-je ? (Je suis une femme)`,
        explicacion: () => `Je suis Teresa ! Si la fille de Teresa est la mère de ma fille, et je suis la mère de ma fille... je suis la fille de Teresa. Donc je suis Teresa.`
    },
    l4_auto_ruedas: {
        opciones: ["Roue de secours", "Avant droite", "Arrière gauche", "Toutes tournent"],
        texto: () => `Une voiture roule sur une route droite vers le nord. Quelle roue ne tourne pas ?`,
        explicacion: () => `La roue de secours ! Les quatre autres doivent tourner pour avancer.`
    },
    l4_meses_frio: {
        opciones: ["Thermomètre", "Calendrier", "Neige", "Hiver"],
        texto: () => `Je monte quand il fait chaud et je descends quand il fait froid. Que suis-je ?`,
        explicacion: () => `Le thermomètre ! Le liquide se dilate avec la chaleur et monte.`
    },
    l4_pato_huevo: {
        opciones: ["Aucun", "Un", "Deux", "Trois"],
        texto: () => `Un canard pond un œuf juste à la frontière entre l'Espagne et la France. À quel pays appartient l'œuf ?`,
        explicacion: () => `Aucun ! Les canards (mâles) ne pondent pas d'œufs.`
    },
    l4_quien_soy: {
        opciones: ["Ton nom", "Ton âge", "Ta voix", "Ton ombre"],
        texto: () => `Il t'appartient, mais les autres l'utilisent plus que toi. Qu'est-ce que c'est ?`,
        explicacion: () => `Ton nom ! Les gens t'appellent par ton nom, tu t'appelles rarement toi-même.`
    },

    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `Dans une pièce il y a ${mesas} tables avec ${patas_m} pieds chacune et ${sillas} chaises avec ${patas_s} pieds. Combien de pieds y a-t-il au total si ${perros} chiens entrent?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `Piège! Beaucoup oublient de compter les pattes des chiens. Tables: ${mesas}×${patas_m}=${mesas * patas_m}, Chaises: ${sillas}×${patas_s}=${sillas * patas_s}, Chiens: ${perros}×${patas_p}=${perros * patas_p}. Total: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomás a planté un verger avec ${filas} rangées de pommiers. Si chaque rangée a ${arboles} arbres, combien d'arbres a-t-il au total?`,
        explicacion: (filas, arboles, total) => `Tu dois multiplier le nombre de rangées par le nombre d'arbres dans chaque rangée: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman s'est entraîné pendant ${horas} heures aujourd'hui. Combien de minutes a-t-il entraîné au total?`,
        explicacion: (horas, total) => `Pour convertir les heures en minutes nous multiplions par 60: ${horas} × 60 = ${total} minutes.`
    },
    reloj_espejo: {
        texto: (hora) => `Tu regardes une horloge analogique à travers un miroir. Les aiguilles indiquent ${hora}h. Quelle heure est-il réellement?`,
        explicacion: (hora, real) => `Le miroir inverse horizontalement. La position du ${hora} devient celle du ${real}. L'heure réelle est ${real}h.`
    },
    arca_moises: {
        texto: () => `Combien d'animaux de chaque espèce Moïse a-t-il emporté dans son arche?`,
        explicacion: () => `Zéro! C'est Noé qui a construit l'arche, pas Moïse. Beaucoup de gens répondent "des paires" sans remarquer l'erreur de nom.`
    },
    cesta_huevos: {
        texto: () => `Dans un panier il y a 6 œufs. 6 personnes achètent un œuf chacune et à la fin, il reste un œuf dans le panier. Combien d'œufs restent dans le panier?`,
        explicacion: () => `Un! La dernière personne a pris le panier avec l'œuf dedans. Ce n'est pas qu'un œuf ait disparu, mais qu'il a voyagé dans son contenant.`
    },
    hermanos_juan: {
        texto: () => `Jean a 3 sœurs. Chacune de ses sœurs n'a qu'un seul frère. Combien de frères Jean a-t-il au total?`,
        explicacion: () => `Piège activé! Le cerveau veut additionner, mais la réponse est 0. L'"unique frère" de toutes ses sœurs est Jean lui-même. Jean n'a pas d'autre frère.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `Un avion s'écrase juste à la frontière entre ${pais1} et ${pais2}. Dans quel pays enterre-t-on les survivants?`,
        explicacion: () => `Piège linguistique! On n'enterre PAS les survivants! Le problème mentionne "frontière" pour te distraire, mais la clé est qu'il y a des survivants.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `Il y a ${iniciales} bougies allumées sur une table. Un courant d'air en éteint ${apagadas}. Si personne ne les rallume, combien de bougies restent le jour suivant?`,
        explicacion: (encendidas, apagadas) => `Pensée temporelle! Les ${encendidas} bougies qui restent allumées se consommeront complètement pendant la nuit. Seules les ${apagadas} bougies éteintes restent, qui restent intactes.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `Un panier plein de pommes pèse ${llena} kg. Le panier vide pèse ${caja} kg. Si tu manges la moitié des pommes, combien pèse le panier maintenant?`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Étape 1: Poids des pommes = ${llena} - ${caja} = ${manzanas} kg. Étape 2: Moitié des pommes = ${manzanas} ÷ 2 = ${mitad} kg. Étape 3: Panier + pommes restantes = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Il y a ${inicial} oiseaux sur une branche. Un chasseur tire et en touche un. Combien d'oiseaux restent sur la branche?`,
        explicacion: (inicial) => `Réalisme logique! L'oiseau blessé tombe au sol et les autres ${inicial - 1} oiseaux s'envolent effrayés par le coup. Résultat: 0 oiseaux sur la branche.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Une brique pèse 1 kg plus une demi-brique. Combien pèsent une brique et demie?`,
        explicacion: () => `Algèbre: Si une brique (x) = 1 + x/2, alors x/2 = 1, donc x = 2 kg. Une brique et demie = 2 + 1 = 3 kg. Le piège courant est de répondre 1,5 kg sans résoudre l'équation.`
    },

    // LEVEL 5
    // LEVEL 5
    l5_sistema_ecuaciones: {
        texto: (A, B) => `Résous le système: \n2x + y = ${A} \nx - y = ${B} \nCombien vaut x?`,
        explicacion: (x) => `Additionne les équations: (2x + y) + (x - y) = 3x. Ensuite 3x divisé par 3 donne ${x}.`
    },
    l5_probabilidad_dados: {
        opciones: ["1/6", "1/12", "1/36", "5/36"],
        texto: () => `Tu lances deux dés à 6 faces. Quelle est la probabilité que la somme soit 7 ?`,
        explicacion: () => `Il y a 6 cas favorables et 36 au total. 6/36 se simplifie en 1/6.`
    },
    l5_velocidad_relativa: {
        texto: (v1, v2, dist) => `Un train part de A à ${v1} km/h vers B, un autre de B à ${v2} km/h vers A. Distance ${dist} km. Quand se croisent-ils ?`,
        explicacion: (t) => `Vitesse relative = ${v1 + v2} km/h. Temps = ${dist} / ${v1 + v2} = ${t} heures.`
    },
    l5_combinatoria_saludos: {
        texto: (p) => `${p} amis se rencontrent et se serrent la main. Combien de poignées de main ?`,
        explicacion: (s) => `Formule : n(n-1)/2. Chacun salue tout le monde, mais la relation est réciproque.`
    },
    l5_porcentaje_compuesto: {
        opciones: ["Baisse de 1%", "Pareil", "Monte de 1%", "Baisse de 10%"],
        texto: () => `Une action monte de 10% puis baisse de 10%. Résultat ?`,
        explicacion: () => `Exemple : 100 + 10% = 110. 110 - 10% = 99. Perte de 1% par rapport à 100.`
    },
    l5_logica_ascensor: {
        opciones: ["Il est petit", "Il est sportif", "Superstition", "En panne"],
        texto: () => `Un homme vit au 10ème. Il descend en ascenseur, mais ne monte qu'au 7ème et marche ensuite (sauf s'il pleut). Pourquoi ?`,
        explicacion: () => `Il est petit ! Il n'atteint pas le bouton 10. S'il pleut, il utilise son parapluie.`
    },
    l5_logica_meses: {},
    l5_logica_secuencia_letras: {
        opciones: ["D", "N", "O", "P"],
        texto: () => `Quelle lettre suit ? J, F, M, A, M, J, J, A, S, O, N ...`,
        explicacion: () => `D pour Décembre ! Initiales des mois.`
    },
    l5_logica_padre_juan: {
        opciones: ["Jean", "Quatrième", "Luc", "Paul"],
        texto: () => `Le père de Jean a 4 fils: Pierre, Paul, Jacques... Quel est le nom du quatrième?`,
        explicacion: () => `Jean ! La question le dit au début.`
    },
    l5_logica_interruptores: {
        opciones: ["Température", "Regarder", "Hasard", "Impossible"],
        texto: () => `3 interrupteurs pour 1 ampoule fermée. Une seule entrée. Comment savoir lequel fonctionne ?`,
        explicacion: () => `Touche l'ampoule. Allume le 1, attends, éteins. Allume le 2, entre. Allumée -> 2. Chaude -> 1. Froide -> 3.`
    },

    peso_ladrillo: {
        texto: (extra) => `Si une brique pèse ${extra} kg plus une demi-brique, combien pèsent une brique et demie?`,
        explicacion: (extra, ladrillo, resultado) => `Défi désactivé! Si X = poids d'une brique, alors X = ${extra} + X/2, donc X = ${ladrillo} kg. Une brique et demie pèse ${ladrillo} + ${ladrillo / 2} = ${resultado} kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `Un berger doit traverser une rivière avec un loup, une brebis et un chou. Le bateau ne peut contenir que lui et une chose de plus. S'il laisse le loup avec la brebis, le loup la mange. S'il laisse la brebis avec le chou, la brebis le mange. Quel est le nombre minimum de trajets nécessaires? (Chaque aller ou retour compte comme 1 trajet)`,
        explicacion: () => `Solution: 1. Traverse avec la brebis. 2. Reviens seul. 3. Traverse avec le loup (et ramène la brebis). 4. Traverse avec le chou. 5. Reviens seul. 6. Traverse avec la brebis. Total: 6 trajets.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `Tu regardes une horloge analogique à travers un miroir. Les aiguilles indiquent ${hora}:00. Quelle heure est-il réellement?`,
        explicacion: (hora, real) => `Le miroir inverse la position horizontale de l'horloge. La formule est: heure réelle = 12 - heure dans le miroir. Donc: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `Un escargot est au fond d'un puits de ${profundidad} mètres. Pendant la journée il monte ${sube} mètres, mais la nuit il glisse ${resbala} mètres. En combien de jours sortira-t-il du puits?`,
        explicacion: (profundidad, sube, resbala, dias) => `Logique séquentielle! Le calcul instinctif est ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} jours. Mais au jour ${dias}, l'escargot commence à ${profundidad - sube}m, monte ${sube}m et atteint ${profundidad}m, donc il sort et ne glisse pas cette nuit-là!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `Quand j'avais ${edad_pasada} ans, ma sœur avait la moitié de mon âge. Maintenant que j'ai ${edad_actual} ans, quel âge a ma sœur?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `Relation constante variable! L'esprit cherche la proportion "moitié" (${edad_actual}/2=${edad_actual / 2}), mais la différence d'âge est constante. S'il y avait ${diferencia} ans de différence à l'époque, il y a toujours ${diferencia} ans. Réponse: ${edad_actual} - ${diferencia} = ${resultado} ans.`
    },
    contar_digito_siete: {
        texto: (paginas) => `Tu numérotes les pages d'un livre qui a exactement ${paginas} pages. Combien de fois écriras-tu le chiffre '7'?`,
        explicacion: () => `Motifs numériques! Beaucoup ne comptent que les 7 dans les unités (7,17,27...97) = 10. Mais ils oublient les 7 dans la dizaine 70-79 (10 de plus). Le nombre 77 a deux 7. Total: 10 + 10 = 20 fois.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `Une raquette et une balle coûtent ensemble ${total_costo.toFixed(2)}€. La raquette coûte ${diferencia.toFixed(2)}€ de plus que la balle. Combien coûte la balle?`,
        explicacion: () => `Équation de différence! La réponse automatique est 0,10€, mais si la balle coûtait 0,10€, la raquette coûterait 1,10€, et le total serait 1,20€. Correctement: Si balle = x, alors raquette = x + 1. x + (x + 1) = 1,10 → 2x = 0,10 → x = 0,05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Deux trains sont sur des voies opposées à ${distancia} km de distance et se rapprochent l'un de l'autre à ${velocidad_t} km/h chacun. Un oiseau quitte le Train A à ${velocidad_p} km/h vers le Train B, et quand il l'atteint, il revient au Train A, et ainsi de suite jusqu'à ce que les trains se heurtent. Quelle est la distance totale parcourue par l'oiseau ?`,
        explicacion: (velocidad_p, tiempo, velocidad_t) => `Le piège du calcul infini ! Beaucoup essaient de calculer chaque trajectoire de l'oiseau (série infinie). L'astuce consiste à calculer le temps : les trains mettront ${tiempo} heure pour se rencontrer (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h de vitesse relative). Si l'oiseau vole à ${velocidad_p} km/h pendant cette heure, il parcourt exactement ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Avant-hier j'avais ${edad_anteayer} ans et l'année prochaine j'aurai ${edad_proximo}. Quel âge ai-je aujourd'hui ? (Sachant qu'aujourd'hui c'est le 1er janvier)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `Logique temporelle ! Il semble impossible de passer de ${edad_anteayer} à ${edad_proximo} en si peu de temps. La solution : 1. Hier (31 décembre) j'ai eu ${edad_hoy}. 2. Avant-hier (30 décembre) j'avais encore ${edad_anteayer}. 3. Cette année j'aurai ${edad_hoy + 1} en décembre. 4. L'année prochaine j'aurai ${edad_proximo}. Aujourd'hui : ${edad_hoy} ans.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Un cube en bois de ${tamano}×${tamano}×${tamano} cm est peint en bleu à l'extérieur. Ensuite, il est coupé en ${total} petits cubes de 1×1×1 cm. Combien de ces petits cubes auront exactement 2 faces peintes en bleu ?`,
        explicacion: (aristas, tamano, respuesta) => `Visualisation spatiale ! Le cerveau essaie de compter les faces totales, mais l'astuce est de savoir que les cubes avec 2 faces peintes sont ceux sur les arêtes (mais pas aux coins, qui en ont 3). Un cube a ${aristas} arêtes, et dans ce cas, il y a 1 petit cube central par arête. Total : ${respuesta} petits cubes.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `Le coureur A bat le coureur B de ${ventaja} mètres. Le coureur B bat le coureur C de ${ventaja} mètres. Si les trois courent ${distancia} mètres, de combien de mètres A bat-il C ?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `Le piège de l'addition ! La réponse intuitive est ${ventaja + ventaja} mètres (${ventaja}+${ventaja}). Mais les distances sont proportionnelles à la vitesse. C court à ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% de la vitesse de A. Avantage réel : 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Si ${monos_ini} singes mettent ${tiempo_ini} minutes à manger ${platanos_ini} bananes, combien de temps faudra-t-il à ${monos_fin} singes pour manger ${platanos_fin} bananes ?`,
        explicacion: (tiempo_ini) => `Le piège de la règle de trois ! Une proportion directe est tentée. Mais le taux est de 1 singe par banane toutes les ${tiempo_ini} minutes. Si tout le monde commence à manger en même temps, ils terminent en même temps. Le ratio singes:bananes est le même (1:1), donc le temps reste constant : ${tiempo_ini} minutes.`
    },
    // NOUVEAUX PROBLÈMES NIVEAU 2
    horno_galletas: {
        texto: (chocolate, vainilla, vendidas) => `À la pâtisserie, ils ont fait cuire ${chocolate} biscuits au chocolat et ${vainilla} biscuits à la vanille. S'ils en ont déjà vendu ${vendidas}, combien de biscuits restent sur le plateau ?`,
        explicacion: (chocolate, vainilla, vendidas) => `Additionne d'abord tous les biscuits : ${chocolate} + ${vainilla} = ${chocolate + vainilla}. Puis soustrait les vendus : ${chocolate + vainilla} - ${vendidas} = ${chocolate + vainilla - vendidas} biscuits.`
    },
    estantes_biblioteca: {
        texto: (estantes, libros_estante) => `À la bibliothèque de la classe, il y a ${estantes} rayons. Si chaque rayon contient exactement ${libros_estante} livres, combien y a-t-il de livres au total ?`,
        explicacion: (estantes, libros_estante) => `Tu peux additionner ${libros_estante} + ${libros_estante}... (${estantes} fois) ou utiliser la multiplication : ${estantes} × ${libros_estante} = ${estantes * libros_estante} livres.`
    },
    reparto_caramelos: {
        texto: (caramelos_total, amigos) => `Tu as ${caramelos_total} bonbons à la fraise et tu veux les partager équitablement entre tes ${amigos} meilleurs amis. Combien de bonbons recevra chaque ami ?`,
        explicacion: (caramelos_total, amigos) => `Quel nombre multiplié par ${amigos} nous donne ${caramelos_total} ? La réponse est : ${caramelos_total} ÷ ${amigos} = ${caramelos_total / amigos} bonbons pour chaque ami.`
    },
    ahorro_juguete: {
        texto: (precio, ahorros, regalo) => `Tu veux acheter une voiture télécommandée qui coûte ${precio}€. Si tu as déjà ${ahorros}€ d'économies dans ta tirelire et ta grand-mère t'en donne ${regalo}€ de plus, combien d'argent te manque-t-il encore pour la acheter ?`,
        explicacion: (precio, ahorros, regalo) => `Additionne ce que tu as : ${ahorros} + ${regalo} = ${ahorros + regalo}€. Maintenant soustrait du prix : ${precio} - ${ahorros + regalo} = ${precio - (ahorros + regalo)}€. Il te manque ${precio - (ahorros + regalo)}€.`
    },
    plantas_jardin: {
        texto: (medida_inicial, crecimiento_dia, dias) => `Chaque jour tu arroses ta plante et elle grandit de ${crecimiento_dia} centimètres. Si le lundi elle mesurait ${medida_inicial} centimètres, combien mesurera-t-elle après ${dias} jours si elle continue de grandir pareil chaque jour ?`,
        explicacion: (medida_inicial, crecimiento_dia, dias) => `Calcule la croissance totale : ${dias} jours × ${crecimiento_dia} cm/jour = ${dias * crecimiento_dia} cm de croissance. Ajoute la hauteur initiale : ${medida_inicial} + ${dias * crecimiento_dia} = ${medida_inicial + dias * crecimiento_dia} cm.`
    }
};

export default problemsFR;
