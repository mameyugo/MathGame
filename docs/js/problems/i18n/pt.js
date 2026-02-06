/**
 * Traduções dos Problemas - PORTUGUÊS (pt)
 * Sistema modular de textos para todos os problemas
 */

export const problemsPT = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `Compramos ${cantidad} borrachas. Cada uma custa ${precio}€. Quanto pagamos no total?`,
        explicacion: (cantidad, precio) => `Você deve multiplicar o número de borrachas pelo preço: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `Se em uma mão tenho 5 dedos e em duas mãos tenho 10 dedos, quantos dedos há em ${manos} mãos?`,
        explicacion: (manos) => `Pense bem! Cada mão tem 5 dedos. Portanto: 5 × ${manos} = ${manos * 5} dedos no total.`
    },
    peces_ahogados: {
        texto: () => `Em um aquário há 10 peixes. Se 5 deles se afogam, quantos peixes restam no aquário?`,
        explicacion: () => `Armadilha desativada! Os peixes não se afogam na água. É seu habitat natural. Ainda há 10 peixes.`
    },
    gallo_huevos: {
        texto: () => `Um galo coloca um ovo bem na beira do telhado de um celeiro. Se o vento sopra para a direita, para que lado o ovo cai?`,
        explicacion: () => `Armadilha desativada! Os galos não colocam ovos, as galinhas colocam. Portanto, não há ovo que caia.`
    },
    patas_mesa_gato: {
        texto: (patas) => `Uma mesa tem ${patas} pernas. Se um gato sobe na mesa, quantas pernas estão tocando o chão agora?`,
        explicacion: (patas) => `Armadilha desativada! As patas do gato estão na mesa, não no chão. Apenas as ${patas} pernas da mesa tocam o chão.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `Você tem uma cesta com ${inicial} peras. Se me der ${regaladas} peras, quantas peras você tem agora?`,
        explicacion: (inicial, regaladas) => `Depois de dar ${regaladas} peras da sua cesta de ${inicial}, você tem: ${inicial} - ${regaladas} = ${inicial - regaladas} pera(s).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `Em um bolo de aniversário há ${iniciales} velas acesas. Se você apagar ${apagadas} velas, quantas velas restam no bolo?`,
        explicacion: (iniciales, apagadas) => `Permanência de objetos! Mesmo que estejam apagadas, as velas ainda estão fisicamente no bolo. Velas apagadas: ${apagadas}, Velas acesas: ${iniciales - apagadas}, Total no bolo: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} irmãos (João, Luís e Ana) têm um cachorro juntos. Quantos cães há no total em casa?`,
        explicacion: () => `Leitura cuidadosa! O texto diz que eles têm UM cachorro "juntos", não que cada um tenha o seu. Resposta: 1 cachorro compartilhado.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `Há ${mesa} laranjas em uma mesa. Se você vai e pega ${coges} laranjas, quantas laranjas você tem agora?`,
        explicacion: (coges) => `Atenção à pergunta! Ela não pergunta quantas restam na mesa, mas quantas VOCÊ TEM. Resposta: As ${coges} que você acabou de pegar.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} crianças tentam entrar sob um guarda-chuva muito pequeno, mas nenhuma se molha. Quanto cai de chuva?`,
        explicacion: () => `Use o contexto! O cérebro procura uma explicação física complexa, mas a resposta é simples: não está chovendo. É por isso que ninguém se molha.`
    },
    patas_pajaro: {
        texto: () => `Um pássaro tem 2 patas. Se se apoia em um galho com apenas uma pata e esconde a outra entre suas penas, quantas patas o pássaro tem agora?`,
        explicacion: () => `Permanência de objetos! Mesmo que não seja visível, a pata ainda está lá. O pássaro ainda tem 2 patas. Visível: 1, Oculta: 1, Total: 2.`
    },
    carrera_posicion: {
        texto: () => `Você está em uma corrida e passa o que está em segundo lugar. Em que posição você está agora?`,
        explicacion: () => `Armadilha desativada! Se você passa o segundo lugar, você assume seu lugar e passa a estar em segundo. O primeiro continua primeiro.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `Você vai à papelaria e compra ${articulo.toLowerCase()} que custa ${precio}€. Se pagar com uma nota de ${billete}€, quanto de troco você recebe?`,
        explicacion: (precio, billete) => `Você deve subtrair o preço da nota: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `Você tem ${queso} sanduíches de queijo na mochila. Sua mãe chega e coloca mais ${jamon} sanduíches de presunto. Quantos sanduíches você tem no total para o lanche?`,
        explicacion: (queso, jamon) => `Junte todos os sanduíches! ${queso} + ${jamon} = ${queso + jamon} sanduíches. 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `No recreio você tinha ${inicial} bolinhas brilhantes. Jogando com um amigo, você perde ${perdidas} bolinhas. Quantas bolinhas restam na sua bolsa?`,
        explicacion: (inicial, perdidas) => `Lembre que perder é como subtrair! ${inicial} - ${perdidas} = ${inicial - perdidas} bolinhas. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Hoje você se comportou muito bem e a professora te deu ${estrellas} adesivos de estrelas douradas e ${corazones} adesivos de corações vermelhos. Quantos adesivos você tem agora?`,
        explicacion: (estrellas, corazones) => `Some as estrelas e os corações! ${estrellas} + ${corazones} = ${estrellas + corazones} adesivos. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `Na sua garagem de brinquedo há ${coches} carros estacionados. De repente, ${salen} carros saem em alta velocidade para uma corrida. Quantos carros ficaram na garagem?`,
        explicacion: (coches, salen) => `Se eles saem, ficam menos carros dentro. ${coches} - ${salen} = ${coches - salen} carros. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `Há uma cesta com ${total} maçãs vermelhas. Ao olhar de perto, você vê que ${gusanitos} têm um verme e não podem ser comidas. Quantas maçãs boas restam?`,
        explicacion: (total, gusanitos) => `Tire as que têm verme para saber quantas restam! ${total} - ${gusanitos} = ${total - gusanitos} maçãs boas. 🍎`
    },
    // NOVOS L1 PT
    l1_suma_juguetes: {
        texto: (coches, motos) => `Tens ${coches} carros de brincar e oferecem-te ${motos} motas. Quantos veículos tens agora no total?`,
        explicacion: (coches, motos) => `Soma os carros e as motas para saber o total: ${coches} + ${motos} = ${coches + motos}. 🚗🏍️`
    },
    l1_resta_caramelos: {
        texto: (inicial, comidos) => `Num saco há ${inicial} rebuçados. Se comeres ${comidos}, quantos ficam dentro do saco?`,
        explicacion: (inicial, comidos) => `Se os comeres, já não estão no saco. ${inicial} - ${comidos} = ${inicial - comidos}. 🍬`
    },
    l1_patas_bancos: {
        texto: (bancos) => `No parque há ${bancos} bancos para sentar. Se cada banco tiver 4 pernas, quantas pernas há no total?`,
        explicacion: (bancos) => `Conta 4 pernas por cada banco: ${bancos} x 4 = ${bancos * 4}. 🪑`
    },
    l1_autobus_bajan: {
        texto: (total, bajan) => `Num autocarro vão ${total} pessoas. Na paragem descem ${bajan} pessoas. Quantas pessoas ficam no autocarro?`,
        explicacion: (total, bajan) => `Subtrai as pessoas que desceram: ${total} - ${bajan} = ${total - bajan}. 🚌`
    },
    l1_total_libros: {
        texto: (rojos, azules) => `Numa estante há ${rojos} livros vermelhos e ${azules} livros azuis. Quantos livros há ao todo?`,
        explicacion: (rojos, azules) => `Junta os livros vermelhos e azuis para saber o total: ${rojos} + ${azules} = ${rojos + azules}. 📚`
    },
    l1_conductor_nombre: {
        opciones: ["Eu", "João", "O autocarro", "Ninguém"],
        texto: (pasajeros) => `Imagina que conduzes um autocarro com ${pasajeros} passageiros. Quem é o condutor?`,
        explicacion: () => `O condutor és TU! A pergunta diz "Imagina que conduzes...". 🚌`
    },
    l1_agujero_profundo: {
        texto: (metros) => `Fazes um buraco de ${metros} metros de profundidade na areia. Quanta terra há dentro do buraco?`,
        explicacion: () => `É um buraco! Se tivesse terra dentro, não seria um buraco dessa profundidade. Está vazio (0).`
    },
    l1_caja_vacia: {
        texto: () => `Quantos melões cabem numa caixa vazia?`,
        explicacion: () => `Só cabe 1. Depois de meteres o primeiro, a caixa já não está vazia. 📦`
    },
    l1_dia_siguiente: {
        dias: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"],
        texto: function (ayer, manana) {
            return `Se ontem foi ${this.dias[ayer]}, que dia será amanhã?`;
        },
        explicacion: function (ayer, manana) {
            const hoy = (ayer + 1) % 7;
            return `Se ontem foi ${this.dias[ayer]}, hoje é ${this.dias[hoy]}. E se hoje é ${this.dias[hoy]}, amanhã será ${this.dias[manana]}!`;
        },
        opciones: function (indice) {
            return this.dias[indice];
        }
    },
    l1_hijo_padre: {
        texto: () => `O Tomás é filho do meu pai, mas não é meu irmão. Quantos irmãos tenho?`,
        explicacion: () => `O Tomás sou EU! Se é filho do meu pai e não é meu irmão, tenho de ser eu mesmo. (0 irmãos).`
    },

    // LEVEL 2
    l2_suma_resta_dinero: {
        texto: (inicial, gasto, encontrado) => `Tinhas ${inicial}€, gastaste ${gasto}€ num livro e depois encontraste ${encontrado}€. Quanto dinheiro tens agora?`,
        explicacion: (inicial, gasto, encontrado) => `Subtrai o que gastaste e soma o que encontraste: ${inicial} - ${gasto} + ${encontrado} = ${inicial - gasto + encontrado}. 💶`
    },
    l2_patas_animales: {
        texto: (perros, gatos) => `Numa quinta há ${perros} cães e ${gatos} gatos. Quantas patas há no total?`,
        explicacion: (perros, gatos) => `Soma os animais (${perros} + ${gatos}) e multiplica por 4 patas: (${perros + gatos}) x 4 = ${(perros + gatos) * 4}. 🐾`
    },
    l2_doble_cromos: {
        texto: (tuyos) => `Tens ${tuyos} autocolantes e o teu amigo tem o dobro que tu. Quantos autocolantes tem o teu amigo?`,
        explicacion: (tuyos) => `O dobro significa multiplicar por 2: ${tuyos} x 2 = ${tuyos * 2}.`
    },
    l2_mitad_galletas: {
        texto: (total) => `Tens ${total} bolachas e comes metade. Quantas bolachas ficam?`,
        explicacion: (total) => `Metade significa dividir por 2: ${total} / 2 = ${total / 2}. 🍪`
    },
    l2_bolsas_caramelos: {
        texto: (bolsas, caramelos) => `Tens ${bolsas} sacos com ${caramelos} rebuçados em cada um. Quantos rebuçados tens no total?`,
        explicacion: (bolsas, caramelos) => `Multiplica sacos por rebuçados: ${bolsas} x ${caramelos} = ${bolsas * caramelos}. 🍬`
    },
    l2_secuencia_simple: {
        texto: (n1, n2, n3, n4) => `Que número segue na série? ${n1}, ${n2}, ${n3}, ${n4}...`,
        explicacion: (n1, n2, n3, n4) => `Vê quanto aumenta cada número. Esse é o salto!`
    },
    l2_hermana_nosoy: {
        opciones: ["Irmã", "Irmão", "Tia", "Prima"],
        texto: () => `Se eu sou teu irmão, mas tu não és meu irmão, o que és?`,
        explicacion: () => `És a minha IRMÃ! Se não és meu irmão (rapaz), tens de ser rapariga.`
    },
    l2_mapa_ciudades: {
        opciones: ["Mapa", "Livro", "Sonho", "TV"],
        texto: () => `Tenho cidades mas não casas, montanhas mas não árvores, e água mas não peixes. O que sou?`,
        explicacion: () => `Um mapa. Representa tudo isso sem o ter fisicamente.`
    },
    l2_esponja_agua: {
        opciones: ["Esponja", "Balde", "Rede", "Garrafa"],
        texto: () => `Estou cheia de buracos mas ainda assim consigo reter água. O que sou?`,
        explicacion: () => `Uma esponja. Os seus poros (buracos) absorvem e retêm a água.`
    },
    l2_romper_silencio: {
        opciones: ["O Silêncio", "Um Vidro", "Uma Promessa", "Um Espelho"],
        texto: () => `Sou tão frágil que se dizes o meu nome, quebras-me. O que sou?`,
        explicacion: () => `O Silêncio. Ao falar (dizer o seu nome), deixas de estar em silêncio.`
    },

    pastor_ovejas: {
        texto: (totales, vivas) => `Um pastor tem ${totales} ovelhas. Um raio atinge e todas morrem exceto ${vivas}. Quantas ovelhas lhe restam?`,
        explicacion: (totales, vivas) => `Armadilha desativada! O problema diz "todas exceto ${vivas}", então ele tem exatamente ${vivas} ovelhas. Não é ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Se em um ano há meses que têm 30 dias e outros que têm 31, quantos meses têm 28 dias?`,
        explicacion: () => `Armadilha desativada! A pergunta não é quantos meses têm APENAS 28 dias, mas quantos meses TÊM 28 dias (entre outros). Todos os meses do ano têm pelo menos 28 dias, até fevereiro. A resposta é 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `Na biblioteca da sala há ${inicial} livros. Segunda-feira ${prestados} livros foram emprestados, mas sexta-feira ${devueltos} foram devolvidos. Quantos livros há agora?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `Você deve subtrair os livros emprestados e adicionar os devolvidos: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `Um ônibus sai da cidade às ${salida}:00 e chega ao seu destino às ${llegada}:30. Quanto tempo durou a viagem?`,
        explicacion: (salida, llegada) => `Das ${salida}:00 até as ${llegada}:30 há ${llegada - salida} horas e 30 minutos.`
    },
    la_cerilla: {
        texto: () => `Você entra em um quarto escuro e frio. Você tem apenas um fósforo. Há um fogão de carvão, uma lâmpada de óleo e uma vela. O que você acende primeiro?`,
        explicacion: () => `O fósforo, claro! Sem acender o fósforo você não pode acender mais nada.`
    },
    peso_algodón: {
        texto: () => `O que pesa mais? Um quilo de ferro ou um quilo de algodão?`,
        explicacion: () => `Pesam a mesma coisa! Um quilo é um quilo, independentemente do material. A confusão vem do ferro ser mais denso, mas estamos falando do mesmo peso.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `Um agricultor tem ${total} ovelhas. Um dia um lobo vem e todas fogem exceto ${quedan}. Quantas ovelhas o agricultor tem?`,
        explicacion: (total, quedan) => `Armadilha desativada! A frase diz "todas exceto ${quedan}", então a resposta está literalmente no problema. Ele tem exatamente ${quedan} ovelhas. Não é ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `Você está doente e o médico lhe dá ${pastillas} comprimidos. Ele diz que você deve tomar um a cada ${intervalo} minutos. Quanto tempo levará para tomar todos?`,
        explicacion: (pastillas, intervalo) => `Visualize o tempo! O erro comum é fazer ${pastillas}×${intervalo}=${pastillas * intervalo}. Mas: você toma o primeiro no minuto 0, o segundo aos ${intervalo} minutos, e o terceiro aos ${intervalo * (pastillas - 1)} minutos. Total: ${intervalo * (pastillas - 1)} minutos.`
    },
    hermano_tio: {
        texto: () => `O irmão do meu tio vem me visitar, mas é descoberto que não é meu tio. Quem é?`,
        explicacion: () => `Lógica familiar! O irmão do meu tio é meu pai. Se o tio do meu pai tem um irmão, e esse irmão não é meu tio, então deve ser meu pai. A confusão vem de procurar um parente "distante".`
    },
    reparto_cesta: {
        texto: () => `Em um cesto há 5 maçãs. Você deve distribuí-las entre 5 amigos para que cada um tenha uma maçã, mas no final uma maçã fica no cesto. Como você faz?`,
        explicacion: () => `Pensamento lateral! A solução é: você dá ao último amigo o cesto COM a maçã dentro. Assim cada um tem uma maçã, e uma permanece no cesto. A armadilha é assumir que "distribuir" significa tirar o objeto do recipiente.`
    },
    pescadores_familia: {
        texto: () => `Dois pais e dois filhos vão pescar. Eles pegam 3 peixes e cada um recebe um sem sobras. Quantas pessoas há no total?`,
        explicacion: () => `Há apenas 3 pessoas! O avô e o pai são "dois pais", e o pai e o filho são "dois filhos". No total: avô + pai + filho = 3 pessoas. O erro comum é somar 2+2=4 pessoas.`
    },

    // LEVEL 3
    // LEVEL 3
    l3_jerarquia_ops: {
        texto: (a, b, c) => `Resolve: ${a} + ${b} × ${c} = ?`,
        explicacion: (a, b, c) => `Lembra a hierarquia! Primeiro a multiplicação, depois a soma: ${b}×${c}=${b * c}, depois ${a}+${b * c}=${a + (b * c)}. Não faças (${a}+${b})×${c}.`
    },
    l3_horas_minutos: {
        texto: (horas, minutos) => `Um filme dura ${horas} hora(s) e ${minutos} minutos. Quantos minutos dura no total?`,
        explicacion: (horas, minutos) => `1 hora são 60 minutos. ${horas}h × 60 = ${horas * 60} min. Soma os ${minutos} min restantes: ${horas * 60} + ${minutos} = ${(horas * 60) + minutos}. ⏱️`
    },
    l3_gramos_kilos: {
        texto: (kilos, gramos) => `Compraste ${kilos}kg e ${gramos}g de farinha. Quantos gramas são no total?`,
        explicacion: (kilos, gramos) => `1 quilo são 1000 gramas. ${kilos}kg = ${kilos * 1000}g. Total: ${kilos * 1000} + ${gramos} = ${(kilos * 1000) + gramos}g.`
    },
    l3_triple_suma: {
        texto: (base) => `Uma caneta custa ${base}€. Um caderno custa o triplo. Quanto custam as duas coisas juntas?`,
        explicacion: (base) => `Caderno: ${base} x 3 = ${base * 3}€. Caneta: ${base}€. Total: ${base * 3} + ${base} = ${base * 4}€.`
    },
    l3_dias_semanas: {
        texto: (semanas, dias) => `Vais de férias ${semanas} semanas e ${dias} dias. Quantos dias são no total?`,
        explicacion: (semanas, dias) => `Uma semana tem 7 dias. ${semanas} semanas = ${semanas * 7} dias. Soma ${dias}: ${semanas * 7} + ${dias} = ${(semanas * 7) + dias}.`
    },
    l3_logica_carrera: {
        opciones: ["Segundo", "Primeiro", "Penúltimo", "Último"],
        texto: () => `Vais numa corrida e ultrapassas o segundo. Em que posição vais agora?`,
        explicacion: () => `Segundo! Se passas o que ia em segundo, tu ocupas o lugar dele. Não és o primeiro ainda.`
    },
    l3_logica_meses_28: {
        opciones: ["12", "1", "6", "0"],
        texto: () => `Quantos meses do ano têm 28 dias?`,
        explicacion: () => `Todos os 12! Janeiro tem 31 (por isso tem 28), Fevereiro tem 28, etc. A pergunta não dizia "apenas" 28.`
    },
    l3_logica_padre_hijo: {
        opciones: ["Mãe", "Pai", "Avó", "Tio"],
        texto: () => `O pai do João diz ao seu filho: "Aponta para aquela senhora, é a mãe da tua mãe". Quem é a senhora para o João?`,
        explicacion: () => `A Avó! A mãe da sua mãe é a sua avó materna.`
    },
    l3_logica_paraguas: {
        opciones: ["Não chovia", "Tinham guarda-chuvas", "Eram peixes", "Corriam muito"],
        texto: (personas) => `${personas} pessoas vão debaixo de um mesmo guarda-chuva pequeno mas nenhuma se molha. Como é possível?`,
        explicacion: () => `Porque não chovia! O contexto sugere chuva, mas não o diz explicitamente.`
    },
    l3_logica_globo: {
        opciones: ["Buracos", "Ar", "Pedras", "Água"],
        texto: () => `O que podes pôr num barril para que pese menos?`,
        explicacion: () => `Buracos! Ao tirar material para fazer o buraco, o barril perde peso.`
    },

    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} tem ${n1} maçãs. ${p2} bate nele, ${p1} cai e ${n2} quebram. Se cada maçã custa ${precio}€, quanto dinheiro ${p1} deve a ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `Cuidado! As maçãs pertencem a ${p1}. É ${p2} quem deveria pagar a ${p1} ${n2 * precio}€.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Um trem elétrico viaja para o Norte a ${velocidad_tren} km/h. Se o vento sopra para o Sul a ${velocidad_viento} km/h, quanto de fumaça o trem emite?`,
        explicacion: () => `Armadilha desativada! É um trem ELÉTRICO, não a vapor ou diesel. Os trens elétricos não emitem fumaça, alimentados diretamente por eletricidade. Todas essas velocidades são distrações. A resposta é 0.`
    },
    despertador_antiguo: {
        texto: () => `Você vai para a cama às 20h e coloca um despertador analógico para tocar às 9 da manhã. Quantas horas você terá dormido quando o alarme soar?`,
        explicacion: () => `Armadilha! Os despertadores analógicos não distinguem entre AM e PM. Quando o ponteiro chegar a 9, tocará às 21h (1 hora depois), não às 9 da manhã.`
    },
    padre_rosa: {
        texto: () => `O pai de Rosa tem 5 filhas: Lala, Lele, Lili, Lolo e... qual é o nome da quinta filha?`,
        explicacion: () => `Rosa! O padrão de vogais (A, E, I, O) te distrai, mas a pergunta já mencionava que a primeira filha é Rosa.`
    },
    dias_sin_nombre: {
        texto: () => `Nomeie três dias consecutivos sem usar as palavras Segunda, Terça, Quarta, Quinta, Sexta, Sábado ou Domingo.`,
        explicacion: () => `Ontem, hoje e amanhã! Estes são dias consecutivos mas não fazem parte da semana tradicional, mas sim de referências de tempo relativas.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `A mãe colocou um bolo no forno às ${inicio}:00. Se o bolo leva ${duracion} minutos para assar, a que horas devemos tirá-lo?`;
        },
        explicacion: (duracion, fin) => `Adicionamos ${duracion} minutos. Resultado: ${fin}.`
    },
    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `Você mora no andar ${inicio}. Você sobe ${sube1} andares para visitar um amigo, depois desce ${baja} para ir à lavanderia e finalmente sobe mais ${sube2} andares para ir ao terraço. Em qual andar fica o terraço?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `Exercício de memória sequencial! Você deve seguir os movimentos: andar ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. O erro comum é esquecer o andar inicial.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `Em uma família há ${hermanas} irmãs. Cada irmã tem um irmão. Quantas pessoas formam o grupo de irmãos no total?`,
        explicacion: (hermanas, hermanos, respuesta) => `Cuidado com a armadilha! O cérebro tende a somar ${hermanas} + ${hermanas} = ${hermanas * 2}. Mas o irmão é o MESMO para as três meninas. Total: ${hermanas} irmãs + ${hermanos} irmão = ${respuesta} pessoas.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `Um livro tem ${paginas} páginas. Se você ler ${paginas_diarias} páginas por dia, começando segunda-feira, em que dia da semana terminará o livro?`,
        explicacion: (paginas, paginas_diarias, dias) => `Calcule os dias: ${paginas} / ${paginas_diarias} = ${dias} dias. Depois conte a partir de segunda-feira: o dia ${dias} é uma quarta-feira (da semana seguinte).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `Se um caracol percorre ${velocidad} metros em uma hora, quanto tempo levará para percorrer ${distancia} metros se parar para descansar meia hora no meio do caminho?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `O cálculo básico é ${distancia} / ${velocidad} = ${distancia / velocidad} horas. Mas não esqueça o tempo de descanso: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} horas (${tiempoTotal * 60} minutos).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `Um abacaxi pesa o mesmo que ${pinasParaManzanas} maçãs. Se uma maçã pesa ${pesoDeManzana} gramas, quanto pesará um cesto com ${numeroDePinas} abacaxis se o cesto vazio não pesa nada?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `É um problema de substituição. Primeiro encontre o peso do abacaxi: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} gramas. Depois multiplique por ${numeroDePinas} abacaxis: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} gramas.`
    },
    // LEVEL 4
    // LEVEL 4
    l4_fracciones_visuales: {
        texto: (num) => `Tens ${num} berlindes. Se perdes um quarto (1/4) deles, quantos perdeste?`,
        explicacion: (respuesta) => `Um quarto significa dividir por 4. A resposta é ${respuesta}.`
    },
    l4_decimales_dinero: {
        texto: (p1, p2) => `Compras um gelado por ${p1}€ e um refrigerante por ${p2}€. Quanto pagas no total?`,
        explicacion: (total) => `Soma os preços: ${total}€. Lembra alinhar a vírgula decimal.`
    },
    l4_ecuacion_simple: {
        texto: (suma, total) => `Penso num número. Se lhe somo ${suma}, obtenho ${total}. Em que número pensei?`,
        explicacion: (x, suma) => `Se ao somar ${suma} ao número dá ${x + suma}, faz o inverso: subtrai ${suma}.`
    },
    l4_area_rectangulo: {
        texto: (ancho, alto) => `Um quarto mede ${ancho} metros de largura e ${alto} metros de comprimento. Qual é a sua área em m²?`,
        explicacion: (area) => `A área é largura x altura = ${area} m².`
    },
    l4_mitad_doble: {
        texto: (num) => `Se multiplicas ${num} por 2 e depois divides o resultado por 2, o que obténs?`,
        explicacion: () => `O mesmo número! Multiplicar e dividir por 2 anulam-se mutuamente.`
    },
    l4_hija_teresa: {
        opciones: ["A minha filha", "A minha mãe", "Eu", "A minha avó"],
        texto: () => `A filha da Teresa é a mãe da minha filha. Quem sou eu? (Sou uma mulher)`,
        explicacion: () => `Sou a Teresa! Se a filha da Teresa é a mãe da minha filha, e eu sou a mãe da minha filha... eu sou a filha da Teresa.`
    },
    l4_auto_ruedas: {
        opciones: ["A de substituição", "Dianteira direita", "Traseira esquerda", "Todas giram"],
        texto: () => `Um carro vai numa estrada reta para norte. Que roda não gira?`,
        explicacion: () => `A roda de substituição! As outras quatro precisam de girar para avançar.`
    },
    l4_meses_frio: {
        opciones: ["O termómetro", "O calendário", "A neve", "O inverno"],
        texto: () => `Subo quando faz calor e desço quando faz frio. O que sou?`,
        explicacion: () => `O termómetro! O líquido dilata-se com o calor e sobe.`
    },
    l4_pato_huevo: {
        opciones: ["Nenhum", "Um", "Dois", "Três"],
        texto: () => `Um pato põe um ovo mesmo na fronteira entre Espanha e França. A que país pertence o ovo?`,
        explicacion: () => `A nenhum! Os patos (machos) não põem ovos.`
    },
    l4_quien_soy: {
        opciones: ["O teu nome", "A tua idade", "A tua voz", "A tua sombra"],
        texto: () => `Pertence-te, mas os outros usam-no mais do que tu. O que é?`,
        explicacion: () => `O teu nome! As pessoas chamam-te por ele, tu raramente te chamas a ti mesmo.`
    },

    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `Em um quarto há ${mesas} mesas com ${patas_m} pernas cada uma e ${sillas} cadeiras com ${patas_s} pernas. Quantas pernas há no total se ${perros} cães entram?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `Armadilha! Muitos esquecem de contar as patas dos cães. Mesas: ${mesas}×${patas_m}=${mesas * patas_m}, Cadeiras: ${sillas}×${patas_s}=${sillas * patas_s}, Cães: ${perros}×${patas_p}=${perros * patas_p}. Total: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomás plantou um pomar com ${filas} fileiras de macieiras. Se cada fileira tem ${arboles} árvores, quantas árvores ele tem no total?`,
        explicacion: (filas, arboles, total) => `Você deve multiplicar o número de fileiras pelo número de árvores em cada fileira: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman treinou por ${horas} horas hoje. Quantos minutos ele treinou no total?`,
        explicacion: (horas, total) => `Para converter horas em minutos multiplicamos por 60: ${horas} × 60 = ${total} minutos.`
    },
    reloj_espejo: {
        texto: (hora) => `Você olha para um relógio analógico através de um espelho. Os ponteiros mostram ${hora}h. Que horas são realmente?`,
        explicacion: (hora, real) => `O espelho inverte horizontalmente. A posição do ${hora} se torna ${real}. A hora real é ${real}h.`
    },
    arca_moises: {
        texto: () => `Quantos animais de cada espécie Moisés levou em sua arca?`,
        explicacion: () => `Nenhum! Foi Noé quem construiu a arca, não Moisés. Muitas pessoas respondem "casais" sem notar o erro no nome.`
    },
    cesta_huevos: {
        texto: () => `Em uma cesta há 6 ovos. 6 pessoas compram um ovo cada uma e, no final, sobra um ovo na cesta. Quantos ovos restam na cesta?`,
        explicacion: () => `Um! A última pessoa levou a cesta com o ovo dentro. Não é que um ovo desapareceu, mas que viajou dentro de seu recipiente.`
    },
    hermanos_juan: {
        texto: () => `João tem 3 irmãs. Cada uma de suas irmãs tem apenas um irmão. Quantos irmãos João tem no total?`,
        explicacion: () => `Armadilha ativada! O cérebro quer somar, mas a resposta é 0. O "único irmão" de todas as suas irmãs é João mesmo. João não tem outros irmãos.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `Um avião cai bem na fronteira entre ${pais1} e ${pais2}. Em que país enterram os sobreviventes?`,
        explicacion: () => `Armadilha de linguagem! Os sobreviventes NÃO são enterrados! O problema menciona "fronteira" para te distrair, mas a chave é que são sobreviventes.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `Há ${iniciales} velas acesas em uma mesa. Uma corrente de ar apaga ${apagadas} delas. Se ninguém as acende novamente, quantas velas restam no próximo dia?`,
        explicacion: (encendidas, apagadas) => `Pensamento temporal! As ${encendidas} velas que permaneceram acesas queimar-se-ão completamente durante a noite. Apenas as ${apagadas} velas apagadas permanecem, que se mantêm intactas.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `Uma cesta cheia de maçãs pesa ${llena} kg. A cesta vazia pesa ${caja} kg. Se você comer metade das maçãs, quanto pesa a cesta agora?`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Passo 1: Peso das maçãs = ${llena} - ${caja} = ${manzanas} kg. Passo 2: Metade das maçãs = ${manzanas} ÷ 2 = ${mitad} kg. Passo 3: Cesta + maçãs restantes = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Há ${inicial} pássaros em um galho. Um caçador dispara e acerta um. Quantos pássaros restam no galho?`,
        explicacion: (inicial) => `Realismo lógico! O pássaro ferido cai no chão e os outros ${inicial - 1} pássaros voam assustados pelo tiro. Resultado: 0 pássaros no galho.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Um tijolo pesa 1 kg mais meio tijolo. Quanto pesam um tijolo e meio?`,
        explicacion: () => `Álgebra: Se um tijolo (x) = 1 + x/2, então x/2 = 1, portanto x = 2 kg. Um tijolo e meio = 2 + 1 = 3 kg. A armadilha comum é responder 1,5 kg sem resolver a equação.`
    },

    // LEVEL 5
    // LEVEL 5
    l5_sistema_ecuaciones: {
        texto: (A, B) => `Resolve o sistema: \n2x + y = ${A} \nx - y = ${B} \nQuanto vale x?`,
        explicacion: (x) => `Soma as equações: (2x + y) + (x - y) = 3x. Então 3x dividido por 3 dá ${x}.`
    },
    l5_probabilidad_dados: {
        opciones: ["1/6", "1/12", "1/36", "5/36"],
        texto: () => `Lanças dois dados de 6 faces. Qual é a probabilidade de a soma ser 7?`,
        explicacion: () => `Há 6 casos favoráveis e 36 totais. 6/36 simplificado é 1/6.`
    },
    l5_velocidad_relativa: {
        texto: (v1, v2, dist) => `Um comboio parte de A a ${v1} km/h para B, outro de B a ${v2} km/h para A. Distância ${dist} km. Quando se cruzam?`,
        explicacion: (t) => `Velocidade relativa = ${v1 + v2} km/h. Tempo = ${dist} / ${v1 + v2} = ${t} horas.`
    },
    l5_combinatoria_saludos: {
        texto: (p) => `${p} amigos reúnem-se e apertam as mãos a todos. Quantos apertos de mão existem?`,
        explicacion: (s) => `Fórmula: n(n-1)/2. Cada um cumprimenta todos os outros, mas a relação é recíproca.`
    },
    l5_porcentaje_compuesto: {
        opciones: ["Desce 1%", "Igual", "Sobee 1%", "Desce 10%"],
        texto: () => `Uma ação sobe 10% e depois desce 10%. Como fica?`,
        explicacion: () => `Exemplo: 100 + 10% = 110. 110 - 10% = 99. Perde 1% em relação a 100.`
    },
    l5_logica_ascensor: {
        opciones: ["É baixinho", "Desportista", "Superstição", "Avariado"],
        texto: () => `Um homem vive no 10º andar. Desce de elevador, mas para subir só vai até ao 7º e vai a pé (a não ser que chova). Porquê?`,
        explicacion: () => `É baixinho! Não chega ao botão do 10. Se chove, usa o guarda-chuva.`
    },
    l5_logica_meses: {},
    l5_logica_secuencia_letras: {
        opciones: ["D", "N", "O", "P"],
        texto: () => `Que letra se segue? J, F, M, A, M, J, J, A, S, O, N ...`,
        explicacion: () => `D de Dezembro! Iniciais dos meses.`
    },
    l5_logica_padre_juan: {
        opciones: ["João", "Quarto", "Lucas", "José"],
        texto: () => `O pai do João tem 4 filhos: Um, Dois, Três... Como se chama o quarto?`,
        explicacion: () => `João! A pergunta o diz no início.`
    },
    l5_logica_interruptores: {
        opciones: ["Por temperatura", "Olhando", "Ao acaso", "Impossível"],
        texto: () => `3 interruptores fora de uma sala fechada. Só um acende a luz. Entrando uma só vez, como sabes qual é?`,
        explicacion: () => `Toca a lâmpada. Liga o 1 um pouco, desliga. Liga o 2 e entra. Acesa -> 2. Quente -> 1. Fria -> 3.`
    },

    peso_ladrillo: {
        texto: (extra) => `Se um tijolo pesa ${extra} kg mais meio tijolo, quanto pesam um tijolo e meio?`,
        explicacion: (extra, ladrillo, resultado) => `Desafio desativado! Se X = peso de um tijolo, então X = ${extra} + X/2, então X = ${ladrillo} kg. Um tijolo e meio pesa ${ladrillo} + ${ladrillo / 2} = ${resultado} kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `Um pastor deve atravessar um rio com um lobo, uma ovelha e uma couve. O barco pode conter apenas ele e mais uma coisa. Se ele deixa o lobo com a ovelha, o lobo a come. Se ele deixa a ovelha com a couve, a ovelha a come. Qual é o número mínimo de viagens necessárias? (Cada ida ou volta conta como 1 viagem)`,
        explicacion: () => `Solução: 1. Atravessa a ovelha. 2. Volta sozinho. 3. Atravessa o lobo (e traz a ovelha de volta). 4. Atravessa a couve. 5. Volta sozinho. 6. Atravessa a ovelha. Total: 6 viagens.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `Você olha para um relógio analógico através de um espelho. Os ponteiros mostram ${hora}:00. Que horas são realmente?`,
        explicacion: (hora, real) => `O espelho inverte a posição horizontal do relógio. A fórmula é: hora real = 12 - hora no espelho. Então: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `Um caracol está no fundo de um poço de ${profundidad} metros. Durante o dia sobe ${sube} metros, mas à noite escorrega ${resbala} metros. Em quantos dias sairá do poço?`,
        explicacion: (profundidad, sube, resbala, dias) => `Lógica sequencial! O cálculo instintivo é ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} dias. Mas no dia ${dias}, o caracol começa em ${profundidad - sube}m, sobe ${sube}m e atinge ${profundidad}m, então sai e não escorrega aquela noite!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `Quando eu tinha ${edad_pasada} anos, minha irmã tinha a metade da minha idade. Agora que tenho ${edad_actual} anos, quantos anos minha irmã tem?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `Relação variável constante! A mente procura a proporção "metade" (${edad_actual}/2=${edad_actual / 2}), mas a diferença de idade é constante. Se havia ${diferencia} anos de diferença naquela época, agora ainda há ${diferencia} anos. Resposta: ${edad_actual} - ${diferencia} = ${resultado} anos.`
    },
    contar_digito_siete: {
        texto: (paginas) => `Você está numerando as páginas de um livro que tem exatamente ${paginas} páginas. Quantas vezes você escreverá o dígito '7'?`,
        explicacion: () => `Padrões numéricos! Muitos contam apenas os 7s nas unidades (7,17,27...97) = 10. Mas esquecem os 7s na dezena 70-79 (10 mais). O número 77 tem dois 7s. Total: 10 + 10 = 20 vezes.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `Um taco e uma bola custam juntos ${total_costo.toFixed(2)}€. O taco custa ${diferencia.toFixed(2)}€ a mais que a bola. Quanto custa a bola?`,
        explicacion: () => `Equação de diferença! A resposta automática é 0,10€, mas se a bola custasse 0,10€, o taco custaria 1,10€, e o total seria 1,20€. Corretamente: Se bola = x, então taco = x + 1. x + (x + 1) = 1,10 → 2x = 0,10 → x = 0,05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Dois trens estão em trilhos opostos a ${distancia} km de distância e se aproximam um do outro a ${velocidad_t} km/h cada um. Um pássaro sai do Trem A a ${velocidad_p} km/h em direção ao Trem B, e quando o atinge, volta ao Trem A, e assim sucessivamente até que os trens colidem. Qual é a distância total percorrida pelo pássaro?`,
        explicacion: (velocidad_p, tiempo, velocidad_t) => `A armadilha do cálculo infinito! Muitos tentam calcular cada trajetória do pássaro (série infinita). O truque é calcular o tempo: os trens levarão ${tiempo} hora para se encontrar (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h de velocidade relativa). Se o pássaro voa a ${velocidad_p} km/h durante essa hora, percorre exatamente ${velocidad_p * tiempo} km.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Anteontem eu tinha ${edad_anteayer} anos e no próximo ano terei ${edad_proximo}. Quantos anos tenho hoje? (Sabendo que hoje é 1º de janeiro)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `Lógica temporal! Parece impossível passar de ${edad_anteayer} para ${edad_proximo} em tão pouco tempo. A solução: 1. Ontem (31 de dezembro) fiz ${edad_hoy}. 2. Anteontem (30 de dezembro) ainda tinha ${edad_anteayer}. 3. Este ano farei ${edad_hoy + 1} em dezembro. 4. No próximo ano farei ${edad_proximo}. Hoje: ${edad_hoy} anos.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Um cubo de madeira de ${tamano}×${tamano}×${tamano} cm é pintado de azul por fora. Em seguida, é cortado em ${total} cubinhos de 1×1×1 cm. Quantos desses cubinhos terão exatamente 2 faces pintadas de azul?`,
        explicacion: (aristas, tamano, respuesta) => `Visualização espacial! O cérebro tenta contar as faces totais, mas o truque é saber que os cubos com 2 faces pintadas são aqueles nas arestas (mas não nos cantos, que têm 3). Um cubo tem ${aristas} arestas, e neste caso há 1 cubinho central por aresta. Total: ${respuesta} cubinhos.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `O corredor A vence o corredor B por ${ventaja} metros. O corredor B vence o corredor C por ${ventaja} metros. Se os três correm ${distancia} metros, por quantos metros A vence C?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `A armadilha da soma! A resposta intuitiva é ${ventaja + ventaja} metros (${ventaja}+${ventaja}). Mas as distâncias são proporcionais à velocidade. C corre a ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% da velocidade de A. Vantagem real: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Se ${monos_ini} macacos levam ${tiempo_ini} minutos para comer ${platanos_ini} bananas, quanto tempo levarão ${monos_fin} macacos para comer ${platanos_fin} bananas?`,
        explicacion: (tiempo_ini) => `A armadilha da regra de três! Tenta-se aplicar uma proporção direta. Mas a taxa é de 1 macaco por banana a cada ${tiempo_ini} minutos. Se todos começam a comer ao mesmo tempo, terminam ao mesmo tempo. A razão macacos:bananas é a mesma (1:1), então o tempo permanece constante: ${tiempo_ini} minutos.`
    },
    // NOVOS PROBLEMAS NÍVEL 2
    horno_galletas: {
        texto: (chocolate, vainilla, vendidas) => `Na padaria assaram ${chocolate} biscoitos de chocolate e ${vainilla} biscoitos de baunilha. Se já venderam ${vendidas} biscoitos, quantos biscoitos ainda restam na bandeja?`,
        explicacion: (chocolate, vainilla, vendidas) => `Primeiro some todos os biscoitos: ${chocolate} + ${vainilla} = ${chocolate + vainilla}. Depois subtraia os vendidos: ${chocolate + vainilla} - ${vendidas} = ${chocolate + vainilla - vendidas} biscoitos.`
    },
    estantes_biblioteca: {
        texto: (estantes, libros_estante) => `Na biblioteca da escola há ${estantes} prateleiras. Se cada prateleira tem exatamente ${libros_estante} livros, quantos livros há ao total na biblioteca?`,
        explicacion: (estantes, libros_estante) => `Você pode somar ${libros_estante} + ${libros_estante}... (${estantes} vezes) ou usar multiplicação: ${estantes} × ${libros_estante} = ${estantes * libros_estante} livros.`
    },
    reparto_caramelos: {
        texto: (caramelos_total, amigos) => `Você tem ${caramelos_total} balas de morango e quer reparti-las igualmente entre seus ${amigos} melhores amigos. Quantas balas cada amigo receberá?`,
        explicacion: (caramelos_total, amigos) => `Qual número multiplicado por ${amigos} dá ${caramelos_total}? A resposta é: ${caramelos_total} ÷ ${amigos} = ${caramelos_total / amigos} balas para cada amigo.`
    },
    ahorro_juguete: {
        texto: (precio, ahorros, regalo) => `Você quer comprar um carro com controle remoto que custa ${precio}€. Se já tem ${ahorros}€ poupados e sua avó lhe dá mais ${regalo}€, quanto dinheiro ainda falta para comprar?`,
        explicacion: (precio, ahorros, regalo) => `Some o que tem: ${ahorros} + ${regalo} = ${ahorros + regalo}€. Agora subtraia do preço: ${precio} - ${ahorros + regalo} = ${precio - (ahorros + regalo)}€. Ainda faltam ${precio - (ahorros + regalo)}€.`
    },
    plantas_jardin: {
        texto: (medida_inicial, crecimiento_dia, dias) => `Todos os dias você rega sua planta e ela cresce ${crecimiento_dia} centímetros. Se segunda-feira media ${medida_inicial} centímetros, quanto medirá após ${dias} dias se continuar crescendo igualmente?`,
        explicacion: (medida_inicial, crecimiento_dia, dias) => `Calcule o crescimento total: ${dias} dias × ${crecimiento_dia} cm/dia = ${dias * crecimiento_dia} cm de crescimento. Some a altura inicial: ${medida_inicial} + ${dias * crecimiento_dia} = ${medida_inicial + dias * crecimiento_dia} cm.`
    }
};

export default problemsPT;
