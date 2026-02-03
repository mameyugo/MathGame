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

    // LEVEL 2
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

    // LEVEL 3
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

    // LEVEL 4
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
    }
};

export default problemsFR;
