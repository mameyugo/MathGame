/**
 * Textos de los problemas generados (categories/generated.js) en todos los idiomas.
 *
 * Cada problema recibe en `data` nombres, índices de objeto y números; aquí se
 * montan las frases. OBJETOS de cada idioma tiene NUM_OBJETOS entradas
 * [plural, género] en el mismo orden; el género (m/f) concuerda los «cuántos».
 */

const OBJETOS = {
    es: [['canicas', 'f'], ['cromos', 'm'], ['caramelos', 'm'], ['lápices', 'm'], ['globos', 'm'], ['galletas', 'f'], ['pegatinas', 'f'], ['manzanas', 'f'], ['libros', 'm'], ['coches de juguete', 'm'], ['conchas', 'f'], ['flores', 'f'], ['castañas', 'f'], ['piezas de puzle', 'f'], ['plátanos', 'm'], ['rotuladores', 'm']],
    gl: [['bólas', 'f'], ['cromos', 'm'], ['caramelos', 'm'], ['lapis', 'm'], ['globos', 'm'], ['galletas', 'f'], ['adhesivos', 'm'], ['mazás', 'f'], ['libros', 'm'], ['coches de xoguete', 'm'], ['cunchas', 'f'], ['flores', 'f'], ['castañas', 'f'], ['pezas de crebacabezas', 'f'], ['plátanos', 'm'], ['rotuladores', 'm']],
    ca: [['bales', 'f'], ['cromos', 'm'], ['caramels', 'm'], ['llapis', 'm'], ['globus', 'm'], ['galetes', 'f'], ['adhesius', 'm'], ['pomes', 'f'], ['llibres', 'm'], ['cotxes de joguina', 'm'], ['petxines', 'f'], ['flors', 'f'], ['castanyes', 'f'], ['peces de trencaclosques', 'f'], ['plàtans', 'm'], ['retoladors', 'm']],
    pt: [['berlindes', 'm'], ['cromos', 'm'], ['rebuçados', 'm'], ['lápis', 'm'], ['balões', 'm'], ['bolachas', 'f'], ['autocolantes', 'm'], ['maçãs', 'f'], ['livros', 'm'], ['carrinhos de brincar', 'm'], ['conchas', 'f'], ['flores', 'f'], ['castanhas', 'f'], ['peças de puzzle', 'f'], ['bananas', 'f'], ['marcadores', 'm']],
    fr: [['billes', 'f'], ['images à collectionner', 'f'], ['bonbons', 'm'], ['crayons', 'm'], ['ballons', 'm'], ['biscuits', 'm'], ['autocollants', 'm'], ['pommes', 'f'], ['livres', 'm'], ['petites voitures', 'f'], ['coquillages', 'm'], ['fleurs', 'f'], ['châtaignes', 'f'], ['pièces de puzzle', 'f'], ['bananes', 'f'], ['feutres', 'm']],
    en: [['marbles'], ['trading cards'], ['sweets'], ['pencils'], ['balloons'], ['biscuits'], ['stickers'], ['apples'], ['books'], ['toy cars'], ['seashells'], ['flowers'], ['chestnuts'], ['puzzle pieces'], ['bananas'], ['felt-tip pens']],
    de: [['Murmeln'], ['Sammelbilder'], ['Bonbons'], ['Buntstifte'], ['Luftballons'], ['Kekse'], ['Aufkleber'], ['Äpfel'], ['Bücher'], ['Spielzeugautos'], ['Muscheln'], ['Blumen'], ['Kastanien'], ['Puzzleteile'], ['Bananen'], ['Filzstifte']]
};

const o = (lang, i) => (OBJETOS[lang][i] || OBJETOS[lang][0])[0];
const g = (lang, i) => (OBJETOS[lang][i] || OBJETOS[lang][0])[1];
// «cuántos / cuántas» y equivalentes
const cuantos = {
    es: (i) => g('es', i) === 'f' ? 'cuántas' : 'cuántos',
    gl: (i) => g('gl', i) === 'f' ? 'cantas' : 'cantos',
    ca: (i) => g('ca', i) === 'f' ? 'quantes' : 'quants',
    pt: (i) => g('pt', i) === 'f' ? 'quantas' : 'quantos'
};
const uno = {
    es: (i) => g('es', i) === 'f' ? 'una' : 'uno',
    gl: (i) => g('gl', i) === 'f' ? 'unha' : 'un',
    ca: (i) => g('ca', i) === 'f' ? 'una' : 'un',
    pt: (i) => g('pt', i) === 'f' ? 'uma' : 'um'
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const DIAS = {
    es: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    gl: ['luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado', 'domingo'],
    ca: ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte', 'diumenge'],
    pt: ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'],
    fr: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    de: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
};

const ES = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} tiene ${x} ${o('es', i)}. ${b} le regala ${y} más. ¿${cap(cuantos.es(i))} ${o('es', i)} tiene ${a} ahora?`,
        explicacion: (a, b, i, x, y) => `Se juntan las dos cantidades: ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} tenía ${x} ${o('es', i)} y le dio ${y} a ${b}. ¿${cap(cuantos.es(i))} le quedan a ${a}?`,
        explicacion: (a, b, i, x, y) => `Al dar, se quita: ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} quiere reunir ${meta} ${o('es', i)}. Ya tiene ${tiene}. ¿${cap(cuantos.es(i))} le faltan?`,
        explicacion: (a, i, meta, tiene) => `Lo que falta es la diferencia: ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `Hay ${n} ${['cajas', 'bolsas', 'cestas'][c]} con ${k} ${o('es', i)} en cada una. ¿${cap(cuantos.es(i))} ${o('es', i)} hay en total?`,
        explicacion: (i, n, k) => `${n} grupos de ${k}: ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} reparte ${total} ${o('es', i)} entre ${n} amigos, a partes iguales. ¿${cap(cuantos.es(i))} recibe cada amigo?`,
        explicacion: (a, i, total, n) => `Repartir es dividir: ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} tiene ${x} ${o('es', i)} y ${b} tiene ${y}. ¿${cap(cuantos.es(i))} más tiene ${a}?`,
        explicacion: (a, b, i, x, y) => `Se resta la cantidad menor a la mayor: ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} compra ${n} ${o('es', i)} a ${p} € cada ${uno.es(i)}. ¿Cuántos euros paga?`,
        explicacion: (a, i, n, p) => `${n} veces ${p} €: ${n} × ${p} = ${n * p} €.`
    },
    g_patas: {
        texto: (ga, v) => `En una granja hay ${ga} gallinas y ${v} vacas. ¿Cuántas patas hay en total?`,
        explicacion: (ga, v) => `Las gallinas tienen 2 patas y las vacas 4: ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} compra ${n} ${o('es', i)} a ${p} € cada ${uno.es(i)} y paga con un billete de ${b} €. ¿Cuántos euros le devuelven?`,
        explicacion: (a, i, n, p, b) => `Primero el precio: ${n} × ${p} = ${n * p} €. Después la vuelta: ${b} - ${n * p} = ${b - n * p} €.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} tiene ${t} ${o('es', i)}. Compra ${n} paquetes de ${k} y después le regala ${r} a ${b}. ¿${cap(cuantos.es(i))} tiene ${a} al final?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k}; y al regalar ${r}: ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `Un huerto rectangular mide ${l} metros de largo y ${an} de ancho. ¿Cuántos metros de valla hacen falta para rodearlo entero?`,
        explicacion: (l, an) => `La valla recorre los cuatro lados: 2 × (${l} + ${an}) = ${2 * (l + an)} metros.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['Una bici', 'Un barco', 'Un coche', 'Un tren'][ve]} avanza ${v} kilómetros cada hora. ¿Cuántos kilómetros recorre en ${h} horas?`,
        explicacion: (ve, v, h) => `${h} horas a ${v} km cada una: ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `Una habitación mide ${a} metros por ${b} metros. ¿Cuántas baldosas de 1 metro cuadrado hacen falta para cubrir el suelo?`,
        explicacion: (a, b) => `El área es largo por ancho: ${a} × ${b} = ${a * b} baldosas.`
    },
    g_fraccion: {
        texto: (a, t, d) => `Una pizza está cortada en ${t} trozos iguales. ${a} se come 1/${d} de la pizza. ¿Cuántos trozos se come?`,
        explicacion: (a, t, d) => `1/${d} de ${t} es ${t} ÷ ${d} = ${t / d} trozos.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['Una bici', 'Un patinete', 'Una tienda de campaña', 'Unos patines'][c]} cuesta ${precio} €. Hoy tiene un descuento del ${p} %. ¿Cuántos euros cuesta con el descuento?`,
        explicacion: (c, precio, p) => `El ${p} % de ${precio} es ${precio * p / 100} €. Precio final: ${precio} - ${precio * p / 100} = ${precio - precio * p / 100} €.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} tiene ${e} años y ${['su madre', 'su padre', 'su abuela', 'su abuelo'][pa]} tiene ${m}. ¿Cuántos años tendrá ${['su madre', 'su padre', 'su abuela', 'su abuelo'][pa]} cuando ${a} tenga ${f}?`,
        explicacion: (a, pa, e, m, f) => `Pasan ${f - e} años para los dos: ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} ha sacado un ${x}, un ${y} y un ${z} en tres exámenes. ¿Cuál es su nota media?`,
        explicacion: (a, x, y, z) => `Se suman las notas y se divide entre 3: (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: {
        texto: (s) => `Mira la serie: ${s}… ¿Qué número viene después?`,
        explicacion: (s) => `Cada número es el anterior más la misma cantidad.`
    },
    g_serie_resta: {
        texto: (s) => `Mira la serie: ${s}… ¿Qué número viene después?`,
        explicacion: (s) => `Cada número es el anterior menos la misma cantidad.`
    },
    g_serie_doble: {
        texto: (s) => `Mira la serie: ${s}… ¿Qué número viene después?`,
        explicacion: (s) => `Cada número se multiplica siempre por lo mismo para obtener el siguiente.`
    },
    g_serie_cuadrados: {
        texto: (s) => `Mira la serie: ${s}… ¿Qué número viene después?`,
        explicacion: (s) => `Son cuadrados de números seguidos (n × n).`
    },
    g_serie_fibo: {
        texto: (s) => `Mira la serie: ${s}… ¿Qué número viene después?`,
        explicacion: (s) => `Cada número es la suma de los dos anteriores.`
    },
    g_carrera: {
        texto: (a, b, c, q) => `En una carrera, ${a} llega antes que ${b}, y ${b} llega antes que ${c}. ¿Quién llega ${q === 0 ? 'en último lugar' : 'en primer lugar'}?`,
        explicacion: (a, b, c) => `El orden de llegada es ${a}, ${b} y ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `En una carrera, ${c} llega después que ${b}. ${a} llega antes que ${b}. ${d} llega después que ${c}. ¿Quién llega en último lugar?`,
        explicacion: (a, b, c, d) => `Ordenando las pistas: ${a}, ${b}, ${c} y ${d}.`
    },
    g_postes: {
        texto: (l, d) => `Quieres poner una valla recta de ${l} metros con un poste cada ${d} metros, también en los dos extremos. ¿Cuántos postes necesitas?`,
        explicacion: (l, d) => `Hay ${l / d} tramos, pero siempre hay un poste más que tramos: ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.es,
        texto: (hoy, n) => `Hoy es ${DIAS.es[hoy]}. ¿Qué día de la semana será dentro de ${n} días?`,
        explicacion: (hoy, n, r) => `Cada 7 días se repite el mismo día. ${n} días son ${Math.floor(n / 7)} semanas y ${n % 7} días más: ${DIAS.es[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `Una película empieza a las ${ini} y dura ${dura} minutos. ¿A qué hora termina? (horas : minutos)`,
        explicacion: (ini, dura, fin) => `${dura} minutos son ${Math.floor(dura / 60)} h y ${dura % 60} min. Termina a las ${fin}.`
    },
    g_cortes: {
        texto: (t, m) => `Para cortar un tronco en ${t} trozos, cada corte lleva ${m} minutos. ¿Cuántos minutos tardas en total?`,
        explicacion: (t, m) => `Para ${t} trozos bastan ${t - 1} cortes: ${t - 1} × ${m} = ${(t - 1) * m} minutos.`
    },
    g_calcetines: {
        texto: (col, cada) => `En un cajón hay calcetines de ${col} colores, ${cada} de cada color, y está a oscuras. ¿Cuántos tienes que sacar, como mínimo, para estar seguro de tener dos del mismo color?`,
        explicacion: (col) => `En el peor caso sacas uno de cada color (${col}); el siguiente ya repite: ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} amigos se saludan dándose la mano, una vez cada pareja. ¿Cuántos apretones de manos hay?`,
        explicacion: (n) => `Cada uno saluda a ${n - 1}, pero así se cuenta cada apretón dos veces: ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `En un corral hay gallinas y conejos. Entre todos tienen ${c} cabezas y ${p} patas. ¿Cuántos conejos hay?`,
        explicacion: (c, p) => `Si todos fueran gallinas habría ${c * 2} patas. Las ${p - c * 2} que sobran son 2 por conejo: ${(p - c * 2) / 2} conejos.`
    }
};

const GL = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} ten ${x} ${o('gl', i)}. ${b} regálalle ${y} máis. ${cap(cuantos.gl(i))} ${o('gl', i)} ten ${a} agora?`,
        explicacion: (a, b, i, x, y) => `Xúntanse as dúas cantidades: ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} tiña ${x} ${o('gl', i)} e deulle ${y} a ${b}. ${cap(cuantos.gl(i))} lle quedan a ${a}?`,
        explicacion: (a, b, i, x, y) => `Ao dar, quítase: ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} quere xuntar ${meta} ${o('gl', i)}. Xa ten ${tiene}. ${cap(cuantos.gl(i))} lle faltan?`,
        explicacion: (a, i, meta, tiene) => `O que falta é a diferenza: ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `Hai ${n} ${['caixas', 'bolsas', 'cestas'][c]} con ${k} ${o('gl', i)} en cada unha. ${cap(cuantos.gl(i))} ${o('gl', i)} hai en total?`,
        explicacion: (i, n, k) => `${n} grupos de ${k}: ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} reparte ${total} ${o('gl', i)} entre ${n} amigos, a partes iguais. ${cap(cuantos.gl(i))} recibe cada amigo?`,
        explicacion: (a, i, total, n) => `Repartir é dividir: ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} ten ${x} ${o('gl', i)} e ${b} ten ${y}. ${cap(cuantos.gl(i))} máis ten ${a}?`,
        explicacion: (a, b, i, x, y) => `Réstase a cantidade menor da maior: ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} compra ${n} ${o('gl', i)} a ${p} € cada ${uno.gl(i)}. Cantos euros paga?`,
        explicacion: (a, i, n, p) => `${n} veces ${p} €: ${n} × ${p} = ${n * p} €.`
    },
    g_patas: {
        texto: (ga, v) => `Nunha granxa hai ${ga} galiñas e ${v} vacas. Cantas patas hai en total?`,
        explicacion: (ga, v) => `As galiñas teñen 2 patas e as vacas 4: ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} compra ${n} ${o('gl', i)} a ${p} € cada ${uno.gl(i)} e paga cun billete de ${b} €. Cantos euros lle devolven?`,
        explicacion: (a, i, n, p, b) => `Primeiro o prezo: ${n} × ${p} = ${n * p} €. Despois a volta: ${b} - ${n * p} = ${b - n * p} €.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} ten ${t} ${o('gl', i)}. Compra ${n} paquetes de ${k} e despois regálalle ${r} a ${b}. ${cap(cuantos.gl(i))} ten ${a} ao final?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k}; e ao regalar ${r}: ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `Unha horta rectangular mide ${l} metros de longo e ${an} de ancho. Cantos metros de valado fan falta para rodeala enteira?`,
        explicacion: (l, an) => `O valado percorre os catro lados: 2 × (${l} + ${an}) = ${2 * (l + an)} metros.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['Unha bici', 'Un barco', 'Un coche', 'Un tren'][ve]} avanza ${v} quilómetros cada hora. Cantos quilómetros percorre en ${h} horas?`,
        explicacion: (ve, v, h) => `${h} horas a ${v} km cada unha: ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `Un cuarto mide ${a} metros por ${b} metros. Cantas baldosas de 1 metro cadrado fan falta para cubrir o chan?`,
        explicacion: (a, b) => `A área é longo por ancho: ${a} × ${b} = ${a * b} baldosas.`
    },
    g_fraccion: {
        texto: (a, t, d) => `Unha pizza está cortada en ${t} anacos iguais. ${a} come 1/${d} da pizza. Cantos anacos come?`,
        explicacion: (a, t, d) => `1/${d} de ${t} é ${t} ÷ ${d} = ${t / d} anacos.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['Unha bici', 'Un patinete', 'Unha tenda de campaña', 'Uns patíns'][c]} custa ${precio} €. Hoxe ten un desconto do ${p} %. Cantos euros custa co desconto?`,
        explicacion: (c, precio, p) => `O ${p} % de ${precio} é ${precio * p / 100} €. Prezo final: ${precio} - ${precio * p / 100} = ${precio - precio * p / 100} €.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} ten ${e} anos e ${['a súa nai', 'o seu pai', 'a súa avoa', 'o seu avó'][pa]} ten ${m}. Cantos anos terá ${['a súa nai', 'o seu pai', 'a súa avoa', 'o seu avó'][pa]} cando ${a} teña ${f}?`,
        explicacion: (a, pa, e, m, f) => `Pasan ${f - e} anos para os dous: ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} sacou un ${x}, un ${y} e un ${z} en tres exames. Cal é a súa nota media?`,
        explicacion: (a, x, y, z) => `Súmanse as notas e divídese entre 3: (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: { texto: (s) => `Mira a serie: ${s}… Que número vén despois?`, explicacion: () => `Cada número é o anterior máis a mesma cantidade.` },
    g_serie_resta: { texto: (s) => `Mira a serie: ${s}… Que número vén despois?`, explicacion: () => `Cada número é o anterior menos a mesma cantidade.` },
    g_serie_doble: { texto: (s) => `Mira a serie: ${s}… Que número vén despois?`, explicacion: () => `Cada número multiplícase sempre polo mesmo para obter o seguinte.` },
    g_serie_cuadrados: { texto: (s) => `Mira a serie: ${s}… Que número vén despois?`, explicacion: () => `Son cadrados de números seguidos (n × n).` },
    g_serie_fibo: { texto: (s) => `Mira a serie: ${s}… Que número vén despois?`, explicacion: () => `Cada número é a suma dos dous anteriores.` },
    g_carrera: {
        texto: (a, b, c, q) => `Nunha carreira, ${a} chega antes ca ${b}, e ${b} chega antes ca ${c}. Quen chega ${q === 0 ? 'en último lugar' : 'en primeiro lugar'}?`,
        explicacion: (a, b, c) => `A orde de chegada é ${a}, ${b} e ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `Nunha carreira, ${c} chega despois ca ${b}. ${a} chega antes ca ${b}. ${d} chega despois ca ${c}. Quen chega en último lugar?`,
        explicacion: (a, b, c, d) => `Ordenando as pistas: ${a}, ${b}, ${c} e ${d}.`
    },
    g_postes: {
        texto: (l, d) => `Queres poñer un valado recto de ${l} metros cun poste cada ${d} metros, tamén nos dous extremos. Cantos postes necesitas?`,
        explicacion: (l, d) => `Hai ${l / d} tramos, pero sempre hai un poste máis ca tramos: ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.gl,
        texto: (hoy, n) => `Hoxe é ${DIAS.gl[hoy]}. Que día da semana será dentro de ${n} días?`,
        explicacion: (hoy, n, r) => `Cada 7 días repítese o mesmo día. ${n} días son ${Math.floor(n / 7)} semanas e ${n % 7} días máis: ${DIAS.gl[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `Unha película comeza ás ${ini} e dura ${dura} minutos. A que hora remata? (horas : minutos)`,
        explicacion: (ini, dura, fin) => `${dura} minutos son ${Math.floor(dura / 60)} h e ${dura % 60} min. Remata ás ${fin}.`
    },
    g_cortes: {
        texto: (t, m) => `Para cortar un tronco en ${t} anacos, cada corte leva ${m} minutos. Cantos minutos tardas en total?`,
        explicacion: (t, m) => `Para ${t} anacos chegan ${t - 1} cortes: ${t - 1} × ${m} = ${(t - 1) * m} minutos.`
    },
    g_calcetines: {
        texto: (col, cada) => `Nun caixón hai calcetíns de ${col} cores, ${cada} de cada cor, e está ás escuras. Cantos tes que sacar, como mínimo, para estar seguro de ter dous da mesma cor?`,
        explicacion: (col) => `No peor caso sacas un de cada cor (${col}); o seguinte xa repite: ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} amigos salúdanse dándose a man, unha vez cada parella. Cantos apertóns de mans hai?`,
        explicacion: (n) => `Cada un saúda a ${n - 1}, pero así cóntase cada apertón dúas veces: ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `Nun curral hai galiñas e coellos. Entre todos teñen ${c} cabezas e ${p} patas. Cantos coellos hai?`,
        explicacion: (c, p) => `Se todos fosen galiñas habería ${c * 2} patas. As ${p - c * 2} que sobran son 2 por coello: ${(p - c * 2) / 2} coellos.`
    }
};

const CA = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} té ${x} ${o('ca', i)}. ${b} li'n regala ${y} més. ${cap(cuantos.ca(i))} ${o('ca', i)} té ${a} ara?`,
        explicacion: (a, b, i, x, y) => `S'ajunten les dues quantitats: ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} tenia ${x} ${o('ca', i)} i n'ha donat ${y} a ${b}. ${cap(cuantos.ca(i))} li'n queden a ${a}?`,
        explicacion: (a, b, i, x, y) => `Quan dones, treus: ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} vol reunir ${meta} ${o('ca', i)}. Ja en té ${tiene}. ${cap(cuantos.ca(i))} li'n falten?`,
        explicacion: (a, i, meta, tiene) => `El que falta és la diferència: ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `Hi ha ${n} ${['capses', 'bosses', 'cistelles'][c]} amb ${k} ${o('ca', i)} a cadascuna. ${cap(cuantos.ca(i))} ${o('ca', i)} hi ha en total?`,
        explicacion: (i, n, k) => `${n} grups de ${k}: ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} reparteix ${total} ${o('ca', i)} entre ${n} amics, a parts iguals. ${cap(cuantos.ca(i))} en rep cada amic?`,
        explicacion: (a, i, total, n) => `Repartir és dividir: ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} té ${x} ${o('ca', i)} i ${b} en té ${y}. ${cap(cuantos.ca(i))} més en té ${a}?`,
        explicacion: (a, b, i, x, y) => `Es resta la quantitat petita de la gran: ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} compra ${n} ${o('ca', i)} a ${p} € cada ${uno.ca(i)}. Quants euros paga?`,
        explicacion: (a, i, n, p) => `${n} vegades ${p} €: ${n} × ${p} = ${n * p} €.`
    },
    g_patas: {
        texto: (ga, v) => `En una granja hi ha ${ga} gallines i ${v} vaques. Quantes potes hi ha en total?`,
        explicacion: (ga, v) => `Les gallines tenen 2 potes i les vaques 4: ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} compra ${n} ${o('ca', i)} a ${p} € cada ${uno.ca(i)} i paga amb un bitllet de ${b} €. Quants euros li tornen?`,
        explicacion: (a, i, n, p, b) => `Primer el preu: ${n} × ${p} = ${n * p} €. Després el canvi: ${b} - ${n * p} = ${b - n * p} €.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} té ${t} ${o('ca', i)}. Compra ${n} paquets de ${k} i després en regala ${r} a ${b}. ${cap(cuantos.ca(i))} en té ${a} al final?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k}; i en regalar-ne ${r}: ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `Un hort rectangular fa ${l} metres de llarg i ${an} d'ample. Quants metres de tanca calen per envoltar-lo sencer?`,
        explicacion: (l, an) => `La tanca recorre els quatre costats: 2 × (${l} + ${an}) = ${2 * (l + an)} metres.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['Una bici', 'Un vaixell', 'Un cotxe', 'Un tren'][ve]} avança ${v} quilòmetres cada hora. Quants quilòmetres recorre en ${h} hores?`,
        explicacion: (ve, v, h) => `${h} hores a ${v} km cadascuna: ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `Una habitació fa ${a} metres per ${b} metres. Quantes rajoles d'1 metre quadrat calen per cobrir el terra?`,
        explicacion: (a, b) => `L'àrea és llarg per ample: ${a} × ${b} = ${a * b} rajoles.`
    },
    g_fraccion: {
        texto: (a, t, d) => `Una pizza està tallada en ${t} trossos iguals. ${a} es menja 1/${d} de la pizza. Quants trossos es menja?`,
        explicacion: (a, t, d) => `1/${d} de ${t} és ${t} ÷ ${d} = ${t / d} trossos.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['Una bici', 'Un patinet', 'Una tenda de campanya', 'Uns patins'][c]} costa ${precio} €. Avui té un descompte del ${p} %. Quants euros costa amb el descompte?`,
        explicacion: (c, precio, p) => `El ${p} % de ${precio} és ${precio * p / 100} €. Preu final: ${precio} - ${precio * p / 100} = ${precio - precio * p / 100} €.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} té ${e} anys i ${['la seva mare', 'el seu pare', 'la seva àvia', 'el seu avi'][pa]} en té ${m}. Quants anys tindrà ${['la seva mare', 'el seu pare', 'la seva àvia', 'el seu avi'][pa]} quan ${a} en tingui ${f}?`,
        explicacion: (a, pa, e, m, f) => `Passen ${f - e} anys per a tots dos: ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} ha tret un ${x}, un ${y} i un ${z} en tres exàmens. Quina és la seva nota mitjana?`,
        explicacion: (a, x, y, z) => `Se sumen les notes i es divideix entre 3: (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: { texto: (s) => `Mira la sèrie: ${s}… Quin número ve després?`, explicacion: () => `Cada número és l'anterior més la mateixa quantitat.` },
    g_serie_resta: { texto: (s) => `Mira la sèrie: ${s}… Quin número ve després?`, explicacion: () => `Cada número és l'anterior menys la mateixa quantitat.` },
    g_serie_doble: { texto: (s) => `Mira la sèrie: ${s}… Quin número ve després?`, explicacion: () => `Cada número es multiplica sempre pel mateix per obtenir el següent.` },
    g_serie_cuadrados: { texto: (s) => `Mira la sèrie: ${s}… Quin número ve després?`, explicacion: () => `Són quadrats de números seguits (n × n).` },
    g_serie_fibo: { texto: (s) => `Mira la sèrie: ${s}… Quin número ve després?`, explicacion: () => `Cada número és la suma dels dos anteriors.` },
    g_carrera: {
        texto: (a, b, c, q) => `En una cursa, ${a} arriba abans que ${b}, i ${b} arriba abans que ${c}. Qui arriba ${q === 0 ? 'en darrer lloc' : 'en primer lloc'}?`,
        explicacion: (a, b, c) => `L'ordre d'arribada és ${a}, ${b} i ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `En una cursa, ${c} arriba després que ${b}. ${a} arriba abans que ${b}. ${d} arriba després que ${c}. Qui arriba en darrer lloc?`,
        explicacion: (a, b, c, d) => `Ordenant les pistes: ${a}, ${b}, ${c} i ${d}.`
    },
    g_postes: {
        texto: (l, d) => `Vols posar una tanca recta de ${l} metres amb un pal cada ${d} metres, també als dos extrems. Quants pals necessites?`,
        explicacion: (l, d) => `Hi ha ${l / d} trams, però sempre hi ha un pal més que trams: ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.ca,
        texto: (hoy, n) => `Avui és ${DIAS.ca[hoy]}. Quin dia de la setmana serà d'aquí a ${n} dies?`,
        explicacion: (hoy, n, r) => `Cada 7 dies es repeteix el mateix dia. ${n} dies són ${Math.floor(n / 7)} setmanes i ${n % 7} dies més: ${DIAS.ca[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `Una pel·lícula comença a les ${ini} i dura ${dura} minuts. A quina hora acaba? (hores : minuts)`,
        explicacion: (ini, dura, fin) => `${dura} minuts són ${Math.floor(dura / 60)} h i ${dura % 60} min. Acaba a les ${fin}.`
    },
    g_cortes: {
        texto: (t, m) => `Per tallar un tronc en ${t} trossos, cada tall dura ${m} minuts. Quants minuts hi trigues en total?`,
        explicacion: (t, m) => `Per a ${t} trossos n'hi ha prou amb ${t - 1} talls: ${t - 1} × ${m} = ${(t - 1) * m} minuts.`
    },
    g_calcetines: {
        texto: (col, cada) => `En un calaix hi ha mitjons de ${col} colors, ${cada} de cada color, i és fosc. Quants n'has de treure, com a mínim, per estar segur de tenir-ne dos del mateix color?`,
        explicacion: (col) => `En el pitjor cas en treus un de cada color (${col}); el següent ja repeteix: ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} amics se saluden donant-se la mà, un cop cada parella. Quantes encaixades de mans hi ha?`,
        explicacion: (n) => `Cadascú en saluda ${n - 1}, però així cada encaixada es compta dos cops: ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `En un corral hi ha gallines i conills. Entre tots tenen ${c} caps i ${p} potes. Quants conills hi ha?`,
        explicacion: (c, p) => `Si tots fossin gallines hi hauria ${c * 2} potes. Les ${p - c * 2} que sobren són 2 per conill: ${(p - c * 2) / 2} conills.`
    }
};

const PT = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} tem ${x} ${o('pt', i)}. ${b} dá-lhe mais ${y}. ${cap(cuantos.pt(i))} ${o('pt', i)} tem ${a} agora?`,
        explicacion: (a, b, i, x, y) => `Juntam-se as duas quantidades: ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} tinha ${x} ${o('pt', i)} e deu ${y} a ${b}. ${cap(cuantos.pt(i))} ficaram a ${a}?`,
        explicacion: (a, b, i, x, y) => `Quando se dá, tira-se: ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} quer juntar ${meta} ${o('pt', i)}. Já tem ${tiene}. ${cap(cuantos.pt(i))} faltam?`,
        explicacion: (a, i, meta, tiene) => `O que falta é a diferença: ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `Há ${n} ${['sacos', 'cestos', 'pacotes'][c]} com ${k} ${o('pt', i)} em cada um. ${cap(cuantos.pt(i))} ${o('pt', i)} há no total?`,
        explicacion: (i, n, k) => `${n} grupos de ${k}: ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} reparte ${total} ${o('pt', i)} por ${n} amigos, em partes iguais. ${cap(cuantos.pt(i))} recebe cada amigo?`,
        explicacion: (a, i, total, n) => `Repartir é dividir: ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} tem ${x} ${o('pt', i)} e ${b} tem ${y}. ${cap(cuantos.pt(i))} tem ${a} a mais?`,
        explicacion: (a, b, i, x, y) => `Subtrai-se a quantidade menor à maior: ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} compra ${n} ${o('pt', i)} a ${p} € cada ${uno.pt(i)}. Quantos euros paga?`,
        explicacion: (a, i, n, p) => `${n} vezes ${p} €: ${n} × ${p} = ${n * p} €.`
    },
    g_patas: {
        texto: (ga, v) => `Numa quinta há ${ga} galinhas e ${v} vacas. Quantas patas há no total?`,
        explicacion: (ga, v) => `As galinhas têm 2 patas e as vacas 4: ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} compra ${n} ${o('pt', i)} a ${p} € cada ${uno.pt(i)} e paga com uma nota de ${b} €. Quantos euros recebe de troco?`,
        explicacion: (a, i, n, p, b) => `Primeiro o preço: ${n} × ${p} = ${n * p} €. Depois o troco: ${b} - ${n * p} = ${b - n * p} €.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} tem ${t} ${o('pt', i)}. Compra ${n} pacotes de ${k} e depois oferece ${r} a ${b}. ${cap(cuantos.pt(i))} tem ${a} no fim?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k}; e ao oferecer ${r}: ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `Uma horta retangular mede ${l} metros de comprimento e ${an} de largura. Quantos metros de vedação são precisos para a rodear toda?`,
        explicacion: (l, an) => `A vedação percorre os quatro lados: 2 × (${l} + ${an}) = ${2 * (l + an)} metros.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['Uma bicicleta', 'Um barco', 'Um carro', 'Um comboio'][ve]} avança ${v} quilómetros por hora. Quantos quilómetros percorre em ${h} horas?`,
        explicacion: (ve, v, h) => `${h} horas a ${v} km cada uma: ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `Um quarto mede ${a} metros por ${b} metros. Quantos mosaicos de 1 metro quadrado são precisos para cobrir o chão?`,
        explicacion: (a, b) => `A área é comprimento vezes largura: ${a} × ${b} = ${a * b} mosaicos.`
    },
    g_fraccion: {
        texto: (a, t, d) => `Uma piza está cortada em ${t} fatias iguais. ${a} come 1/${d} da piza. Quantas fatias come?`,
        explicacion: (a, t, d) => `1/${d} de ${t} é ${t} ÷ ${d} = ${t / d} fatias.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['Uma bicicleta', 'Uma trotinete', 'Uma tenda de campismo', 'Uns patins'][c]} custa ${precio} €. Hoje tem um desconto de ${p} %. Quantos euros custa com o desconto?`,
        explicacion: (c, precio, p) => `${p} % de ${precio} são ${precio * p / 100} €. Preço final: ${precio} - ${precio * p / 100} = ${precio - precio * p / 100} €.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} tem ${e} anos e ${['a mãe', 'o pai', 'a avó', 'o avô'][pa]} tem ${m}. Quantos anos terá ${['a mãe', 'o pai', 'a avó', 'o avô'][pa]} quando ${a} tiver ${f}?`,
        explicacion: (a, pa, e, m, f) => `Passam ${f - e} anos para os dois: ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} teve ${x}, ${y} e ${z} em três testes. Qual é a nota média?`,
        explicacion: (a, x, y, z) => `Somam-se as notas e divide-se por 3: (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: { texto: (s) => `Observa a sequência: ${s}… Que número vem a seguir?`, explicacion: () => `Cada número é o anterior mais a mesma quantidade.` },
    g_serie_resta: { texto: (s) => `Observa a sequência: ${s}… Que número vem a seguir?`, explicacion: () => `Cada número é o anterior menos a mesma quantidade.` },
    g_serie_doble: { texto: (s) => `Observa a sequência: ${s}… Que número vem a seguir?`, explicacion: () => `Cada número multiplica-se sempre pelo mesmo para dar o seguinte.` },
    g_serie_cuadrados: { texto: (s) => `Observa a sequência: ${s}… Que número vem a seguir?`, explicacion: () => `São quadrados de números seguidos (n × n).` },
    g_serie_fibo: { texto: (s) => `Observa a sequência: ${s}… Que número vem a seguir?`, explicacion: () => `Cada número é a soma dos dois anteriores.` },
    g_carrera: {
        texto: (a, b, c, q) => `Numa corrida, ${a} chega antes de ${b}, e ${b} chega antes de ${c}. Quem chega ${q === 0 ? 'em último lugar' : 'em primeiro lugar'}?`,
        explicacion: (a, b, c) => `A ordem de chegada é ${a}, ${b} e ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `Numa corrida, ${c} chega depois de ${b}. ${a} chega antes de ${b}. ${d} chega depois de ${c}. Quem chega em último lugar?`,
        explicacion: (a, b, c, d) => `Ordenando as pistas: ${a}, ${b}, ${c} e ${d}.`
    },
    g_postes: {
        texto: (l, d) => `Queres pôr uma vedação reta de ${l} metros com um poste a cada ${d} metros, também nas duas pontas. Quantos postes precisas?`,
        explicacion: (l, d) => `Há ${l / d} troços, mas há sempre mais um poste do que troços: ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.pt,
        texto: (hoy, n) => `Hoje é ${DIAS.pt[hoy]}. Que dia da semana será daqui a ${n} dias?`,
        explicacion: (hoy, n, r) => `De 7 em 7 dias repete-se o mesmo dia. ${n} dias são ${Math.floor(n / 7)} semanas e mais ${n % 7} dias: ${DIAS.pt[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `Um filme começa às ${ini} e dura ${dura} minutos. A que horas acaba? (horas : minutos)`,
        explicacion: (ini, dura, fin) => `${dura} minutos são ${Math.floor(dura / 60)} h e ${dura % 60} min. Acaba às ${fin}.`
    },
    g_cortes: {
        texto: (t, m) => `Para cortar um tronco em ${t} pedaços, cada corte demora ${m} minutos. Quantos minutos demoras no total?`,
        explicacion: (t, m) => `Para ${t} pedaços bastam ${t - 1} cortes: ${t - 1} × ${m} = ${(t - 1) * m} minutos.`
    },
    g_calcetines: {
        texto: (col, cada) => `Numa gaveta há meias de ${col} cores, ${cada} de cada cor, e está escuro. Quantas tens de tirar, no mínimo, para teres a certeza de ter duas da mesma cor?`,
        explicacion: (col) => `No pior caso tiras uma de cada cor (${col}); a seguinte já repete: ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} amigos cumprimentam-se com um aperto de mão, uma vez cada par. Quantos apertos de mão há?`,
        explicacion: (n) => `Cada um cumprimenta ${n - 1}, mas assim cada aperto conta-se duas vezes: ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `Num galinheiro há galinhas e coelhos. Ao todo têm ${c} cabeças e ${p} patas. Quantos coelhos há?`,
        explicacion: (c, p) => `Se fossem todos galinhas haveria ${c * 2} patas. As ${p - c * 2} que sobram são 2 por coelho: ${(p - c * 2) / 2} coelhos.`
    }
};

const FR = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} a ${x} ${o('fr', i)}. ${b} lui en donne ${y} de plus. Combien de ${o('fr', i)} a maintenant ${a} ?`,
        explicacion: (a, b, i, x, y) => `On réunit les deux quantités : ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} avait ${x} ${o('fr', i)} et en a donné ${y} à ${b}. Combien lui en reste-t-il ?`,
        explicacion: (a, b, i, x, y) => `Donner, c'est enlever : ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} veut réunir ${meta} ${o('fr', i)} et en a déjà ${tiene}. Combien lui en manque-t-il ?`,
        explicacion: (a, i, meta, tiene) => `Ce qui manque, c'est la différence : ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `Il y a ${n} ${['boîtes', 'sacs', 'paniers'][c]} avec ${k} ${o('fr', i)} dans chacun. Combien de ${o('fr', i)} y a-t-il en tout ?`,
        explicacion: (i, n, k) => `${n} groupes de ${k} : ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} partage ${total} ${o('fr', i)} entre ${n} amis, à parts égales. Combien chaque ami en reçoit-il ?`,
        explicacion: (a, i, total, n) => `Partager, c'est diviser : ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} a ${x} ${o('fr', i)} et ${b} en a ${y}. Combien en a ${a} de plus ?`,
        explicacion: (a, b, i, x, y) => `On soustrait la petite quantité de la grande : ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} achète ${n} ${o('fr', i)} à ${p} € pièce. Combien d'euros faut-il payer ?`,
        explicacion: (a, i, n, p) => `${n} fois ${p} € : ${n} × ${p} = ${n * p} €.`
    },
    g_patas: {
        texto: (ga, v) => `Dans une ferme, il y a ${ga} poules et ${v} vaches. Combien de pattes y a-t-il en tout ?`,
        explicacion: (ga, v) => `Les poules ont 2 pattes et les vaches 4 : ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} achète ${n} ${o('fr', i)} à ${p} € pièce et paie avec un billet de ${b} €. Combien d'euros lui rend-on ?`,
        explicacion: (a, i, n, p, b) => `D'abord le prix : ${n} × ${p} = ${n * p} €. Puis la monnaie : ${b} - ${n * p} = ${b - n * p} €.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} a ${t} ${o('fr', i)}. ${a} achète ensuite ${n} paquets de ${k}, puis en offre ${r} à ${b}. Combien lui en reste-t-il à la fin ?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k} ; puis en offrant ${r} : ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `Un potager rectangulaire mesure ${l} mètres de long et ${an} de large. Combien de mètres de clôture faut-il pour en faire tout le tour ?`,
        explicacion: (l, an) => `La clôture suit les quatre côtés : 2 × (${l} + ${an}) = ${2 * (l + an)} mètres.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['Un vélo', 'Un bateau', 'Une voiture', 'Un train'][ve]} parcourt ${v} kilomètres par heure. Combien de kilomètres parcourt-il en ${h} heures ?`,
        explicacion: (ve, v, h) => `${h} heures à ${v} km chacune : ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `Une chambre mesure ${a} mètres sur ${b} mètres. Combien de carreaux de 1 mètre carré faut-il pour couvrir le sol ?`,
        explicacion: (a, b) => `L'aire, c'est longueur fois largeur : ${a} × ${b} = ${a * b} carreaux.`
    },
    g_fraccion: {
        texto: (a, t, d) => `Une pizza est coupée en ${t} parts égales. ${a} mange 1/${d} de la pizza. Combien de parts cela fait-il ?`,
        explicacion: (a, t, d) => `1/${d} de ${t}, c'est ${t} ÷ ${d} = ${t / d} parts.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['Un vélo', 'Une trottinette', 'Une tente', 'Des rollers'][c]} coûte ${precio} €. Aujourd'hui, il y a ${p} % de réduction. Combien d'euros faut-il payer avec la réduction ?`,
        explicacion: (c, precio, p) => `${p} % de ${precio}, c'est ${precio * p / 100} €. Prix final : ${precio} - ${precio * p / 100} = ${precio - precio * p / 100} €.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} a ${e} ans et ${['sa mère', 'son père', 'sa grand-mère', 'son grand-père'][pa]} a ${m} ans. Quel âge aura ${['sa mère', 'son père', 'sa grand-mère', 'son grand-père'][pa]} quand ${a} aura ${f} ans ?`,
        explicacion: (a, pa, e, m, f) => `${f - e} ans passent pour les deux : ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} a eu ${x}, ${y} et ${z} à trois contrôles (sur 10). Quelle est sa moyenne ?`,
        explicacion: (a, x, y, z) => `On additionne les notes et on divise par 3 : (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: { texto: (s) => `Regarde la suite : ${s}… Quel nombre vient ensuite ?`, explicacion: () => `Chaque nombre est le précédent plus la même quantité.` },
    g_serie_resta: { texto: (s) => `Regarde la suite : ${s}… Quel nombre vient ensuite ?`, explicacion: () => `Chaque nombre est le précédent moins la même quantité.` },
    g_serie_doble: { texto: (s) => `Regarde la suite : ${s}… Quel nombre vient ensuite ?`, explicacion: () => `On multiplie toujours par le même nombre pour obtenir le suivant.` },
    g_serie_cuadrados: { texto: (s) => `Regarde la suite : ${s}… Quel nombre vient ensuite ?`, explicacion: () => `Ce sont les carrés de nombres qui se suivent (n × n).` },
    g_serie_fibo: { texto: (s) => `Regarde la suite : ${s}… Quel nombre vient ensuite ?`, explicacion: () => `Chaque nombre est la somme des deux précédents.` },
    g_carrera: {
        texto: (a, b, c, q) => `Dans une course, ${a} arrive avant ${b}, et ${b} arrive avant ${c}. Qui arrive ${q === 0 ? 'en dernier' : 'en premier'} ?`,
        explicacion: (a, b, c) => `L'ordre d'arrivée est ${a}, ${b} et ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `Dans une course, ${c} arrive après ${b}. ${a} arrive avant ${b}. ${d} arrive après ${c}. Qui arrive en dernier ?`,
        explicacion: (a, b, c, d) => `En ordonnant les indices : ${a}, ${b}, ${c} et ${d}.`
    },
    g_postes: {
        texto: (l, d) => `Tu veux poser une clôture droite de ${l} mètres avec un poteau tous les ${d} mètres, y compris aux deux bouts. Combien de poteaux te faut-il ?`,
        explicacion: (l, d) => `Il y a ${l / d} intervalles, mais toujours un poteau de plus : ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.fr,
        texto: (hoy, n) => `Aujourd'hui, c'est ${DIAS.fr[hoy]}. Quel jour de la semaine serons-nous dans ${n} jours ?`,
        explicacion: (hoy, n, r) => `Tous les 7 jours, le même jour revient. ${n} jours, c'est ${Math.floor(n / 7)} semaines et ${n % 7} jours de plus : ${DIAS.fr[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `Un film commence à ${ini} et dure ${dura} minutes. À quelle heure se termine-t-il ? (heures : minutes)`,
        explicacion: (ini, dura, fin) => `${dura} minutes, c'est ${Math.floor(dura / 60)} h et ${dura % 60} min. Il se termine à ${fin}.`
    },
    g_cortes: {
        texto: (t, m) => `Pour couper un tronc en ${t} morceaux, chaque coupe prend ${m} minutes. Combien de minutes faut-il en tout ?`,
        explicacion: (t, m) => `Pour ${t} morceaux, ${t - 1} coupes suffisent : ${t - 1} × ${m} = ${(t - 1) * m} minutes.`
    },
    g_calcetines: {
        texto: (col, cada) => `Dans un tiroir, il y a des chaussettes de ${col} couleurs, ${cada} de chaque couleur, et il fait noir. Combien dois-tu en prendre, au minimum, pour être sûr d'en avoir deux de la même couleur ?`,
        explicacion: (col) => `Au pire, tu en prends une de chaque couleur (${col}) ; la suivante fait forcément une paire : ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} amis se serrent la main, une fois par paire. Combien de poignées de main y a-t-il ?`,
        explicacion: (n) => `Chacun serre ${n - 1} mains, mais ainsi chaque poignée est comptée deux fois : ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `Dans une basse-cour, il y a des poules et des lapins. En tout, ils ont ${c} têtes et ${p} pattes. Combien y a-t-il de lapins ?`,
        explicacion: (c, p) => `Si c'étaient toutes des poules, il y aurait ${c * 2} pattes. Les ${p - c * 2} en trop font 2 par lapin : ${(p - c * 2) / 2} lapins.`
    }
};

const EN = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} has ${x} ${o('en', i)}. ${b} gives ${a} ${y} more. How many ${o('en', i)} does ${a} have now?`,
        explicacion: (a, b, i, x, y) => `Put the two amounts together: ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} had ${x} ${o('en', i)} and gave ${y} to ${b}. How many does ${a} have left?`,
        explicacion: (a, b, i, x, y) => `Giving away means taking away: ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} wants to collect ${meta} ${o('en', i)} and already has ${tiene}. How many more are needed?`,
        explicacion: (a, i, meta, tiene) => `What is missing is the difference: ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `There are ${n} ${['boxes', 'bags', 'baskets'][c]} with ${k} ${o('en', i)} in each. How many ${o('en', i)} are there altogether?`,
        explicacion: (i, n, k) => `${n} groups of ${k}: ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} shares ${total} ${o('en', i)} equally among ${n} friends. How many does each friend get?`,
        explicacion: (a, i, total, n) => `Sharing means dividing: ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} has ${x} ${o('en', i)} and ${b} has ${y}. How many more does ${a} have?`,
        explicacion: (a, b, i, x, y) => `Subtract the smaller amount from the bigger one: ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} buys ${n} ${o('en', i)} at €${p} each. How many euros does ${a} pay?`,
        explicacion: (a, i, n, p) => `${n} times €${p}: ${n} × ${p} = €${n * p}.`
    },
    g_patas: {
        texto: (ga, v) => `On a farm there are ${ga} hens and ${v} cows. How many legs are there altogether?`,
        explicacion: (ga, v) => `Hens have 2 legs and cows have 4: ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} buys ${n} ${o('en', i)} at €${p} each and pays with a €${b} note. How many euros of change does ${a} get?`,
        explicacion: (a, i, n, p, b) => `First the price: ${n} × ${p} = €${n * p}. Then the change: ${b} - ${n * p} = €${b - n * p}.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} has ${t} ${o('en', i)}, buys ${n} packs of ${k} and then gives ${r} to ${b}. How many does ${a} have in the end?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k}; after giving away ${r}: ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `A rectangular vegetable garden is ${l} metres long and ${an} metres wide. How many metres of fence are needed to go all the way round it?`,
        explicacion: (l, an) => `The fence runs along all four sides: 2 × (${l} + ${an}) = ${2 * (l + an)} metres.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['A bike', 'A boat', 'A car', 'A train'][ve]} travels ${v} kilometres every hour. How many kilometres does it travel in ${h} hours?`,
        explicacion: (ve, v, h) => `${h} hours at ${v} km each: ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `A room measures ${a} metres by ${b} metres. How many 1-square-metre tiles are needed to cover the floor?`,
        explicacion: (a, b) => `Area is length times width: ${a} × ${b} = ${a * b} tiles.`
    },
    g_fraccion: {
        texto: (a, t, d) => `A pizza is cut into ${t} equal slices. ${a} eats 1/${d} of the pizza. How many slices is that?`,
        explicacion: (a, t, d) => `1/${d} of ${t} is ${t} ÷ ${d} = ${t / d} slices.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['A bike', 'A scooter', 'A tent', 'A pair of roller skates'][c]} costs €${precio}. Today it is ${p}% off. How many euros does it cost with the discount?`,
        explicacion: (c, precio, p) => `${p}% of ${precio} is €${precio * p / 100}. Final price: ${precio} - ${precio * p / 100} = €${precio - precio * p / 100}.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} is ${e} years old and ${a}'s ${['mum', 'dad', 'grandma', 'grandad'][pa]} is ${m}. How old will the ${['mum', 'dad', 'grandma', 'grandad'][pa]} be when ${a} is ${f}?`,
        explicacion: (a, pa, e, m, f) => `${f - e} years pass for both of them: ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} scored ${x}, ${y} and ${z} (out of 10) in three tests. What is the average mark?`,
        explicacion: (a, x, y, z) => `Add the marks and divide by 3: (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: { texto: (s) => `Look at the sequence: ${s}… What number comes next?`, explicacion: () => `Each number is the previous one plus the same amount.` },
    g_serie_resta: { texto: (s) => `Look at the sequence: ${s}… What number comes next?`, explicacion: () => `Each number is the previous one minus the same amount.` },
    g_serie_doble: { texto: (s) => `Look at the sequence: ${s}… What number comes next?`, explicacion: () => `Each number is multiplied by the same amount to get the next one.` },
    g_serie_cuadrados: { texto: (s) => `Look at the sequence: ${s}… What number comes next?`, explicacion: () => `They are the squares of consecutive numbers (n × n).` },
    g_serie_fibo: { texto: (s) => `Look at the sequence: ${s}… What number comes next?`, explicacion: () => `Each number is the sum of the two before it.` },
    g_carrera: {
        texto: (a, b, c, q) => `In a race, ${a} finishes before ${b}, and ${b} finishes before ${c}. Who finishes ${q === 0 ? 'last' : 'first'}?`,
        explicacion: (a, b, c) => `The finishing order is ${a}, ${b} and ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `In a race, ${c} finishes after ${b}. ${a} finishes before ${b}. ${d} finishes after ${c}. Who finishes last?`,
        explicacion: (a, b, c, d) => `Putting the clues in order: ${a}, ${b}, ${c} and ${d}.`
    },
    g_postes: {
        texto: (l, d) => `You want to build a straight fence ${l} metres long with a post every ${d} metres, including both ends. How many posts do you need?`,
        explicacion: (l, d) => `There are ${l / d} gaps, but always one more post than gaps: ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.en,
        texto: (hoy, n) => `Today is ${DIAS.en[hoy]}. What day of the week will it be in ${n} days?`,
        explicacion: (hoy, n, r) => `Every 7 days the same day comes back. ${n} days are ${Math.floor(n / 7)} weeks and ${n % 7} more days: ${DIAS.en[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `A film starts at ${ini} and lasts ${dura} minutes. What time does it end? (hours : minutes)`,
        explicacion: (ini, dura, fin) => `${dura} minutes is ${Math.floor(dura / 60)} h ${dura % 60} min. It ends at ${fin}.`
    },
    g_cortes: {
        texto: (t, m) => `To cut a log into ${t} pieces, each cut takes ${m} minutes. How many minutes does it take altogether?`,
        explicacion: (t, m) => `For ${t} pieces you only need ${t - 1} cuts: ${t - 1} × ${m} = ${(t - 1) * m} minutes.`
    },
    g_calcetines: {
        texto: (col, cada) => `A drawer holds socks in ${col} colours, ${cada} of each colour, and it is dark. What is the smallest number you must take out to be sure of having two of the same colour?`,
        explicacion: (col) => `At worst you take one of each colour (${col}); the next one must match: ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} friends shake hands, once for each pair. How many handshakes are there?`,
        explicacion: (n) => `Each person shakes ${n - 1} hands, but that counts every handshake twice: ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `A yard has hens and rabbits. Together they have ${c} heads and ${p} legs. How many rabbits are there?`,
        explicacion: (c, p) => `If they were all hens there would be ${c * 2} legs. The ${p - c * 2} extra legs are 2 per rabbit: ${(p - c * 2) / 2} rabbits.`
    }
};

const DE = {
    g_suma: {
        texto: (a, b, i, x, y) => `${a} hat ${x} ${o('de', i)}. ${b} schenkt ${a} noch ${y} dazu. Wie viele ${o('de', i)} hat ${a} jetzt?`,
        explicacion: (a, b, i, x, y) => `Beide Mengen zusammen: ${x} + ${y} = ${x + y}.`
    },
    g_resta: {
        texto: (a, b, i, x, y) => `${a} hatte ${x} ${o('de', i)} und hat ${b} ${y} davon gegeben. Wie viele hat ${a} noch?`,
        explicacion: (a, b, i, x, y) => `Hergeben heißt abziehen: ${x} - ${y} = ${x - y}.`
    },
    g_falta: {
        texto: (a, i, meta, tiene) => `${a} möchte ${meta} ${o('de', i)} sammeln und hat schon ${tiene}. Wie viele fehlen noch?`,
        explicacion: (a, i, meta, tiene) => `Was fehlt, ist der Unterschied: ${meta} - ${tiene} = ${meta - tiene}.`
    },
    g_grupos: {
        texto: (i, n, k, c) => `Es gibt ${n} ${['Kisten', 'Tüten', 'Körbe'][c]} mit je ${k} ${o('de', i)}. Wie viele ${o('de', i)} sind es insgesamt?`,
        explicacion: (i, n, k) => `${n} Gruppen zu ${k}: ${n} × ${k} = ${n * k}.`
    },
    g_reparto: {
        texto: (a, i, total, n) => `${a} verteilt ${total} ${o('de', i)} gerecht an ${n} Freunde. Wie viele bekommt jeder?`,
        explicacion: (a, i, total, n) => `Verteilen heißt teilen: ${total} ÷ ${n} = ${total / n}.`
    },
    g_diferencia: {
        texto: (a, b, i, x, y) => `${a} hat ${x} ${o('de', i)} und ${b} hat ${y}. Wie viele hat ${a} mehr?`,
        explicacion: (a, b, i, x, y) => `Die kleinere Menge von der größeren abziehen: ${x} - ${y} = ${x - y}.`
    },
    g_compra: {
        texto: (a, i, n, p) => `${a} kauft ${n} ${o('de', i)} zu je ${p} €. Wie viele Euro bezahlt ${a}?`,
        explicacion: (a, i, n, p) => `${n}-mal ${p} €: ${n} × ${p} = ${n * p} €.`
    },
    g_patas: {
        texto: (ga, v) => `Auf einem Bauernhof gibt es ${ga} Hühner und ${v} Kühe. Wie viele Beine sind es zusammen?`,
        explicacion: (ga, v) => `Hühner haben 2 Beine, Kühe 4: ${ga} × 2 + ${v} × 4 = ${ga * 2 + v * 4}.`
    },
    g_vuelta: {
        texto: (a, i, n, p, b) => `${a} kauft ${n} ${o('de', i)} zu je ${p} € und bezahlt mit einem ${b}-€-Schein. Wie viele Euro bekommt ${a} zurück?`,
        explicacion: (a, i, n, p, b) => `Zuerst der Preis: ${n} × ${p} = ${n * p} €. Dann das Wechselgeld: ${b} - ${n * p} = ${b - n * p} €.`
    },
    g_dos_pasos: {
        texto: (a, b, i, t, n, k, r) => `${a} hat ${t} ${o('de', i)}, kauft ${n} Packungen mit je ${k} und schenkt dann ${b} ${r} davon. Wie viele hat ${a} am Ende?`,
        explicacion: (a, b, i, t, n, k, r) => `${t} + ${n} × ${k} = ${t + n * k}; nach dem Verschenken: ${t + n * k} - ${r} = ${t + n * k - r}.`
    },
    g_perimetro: {
        texto: (l, an) => `Ein rechteckiger Gemüsegarten ist ${l} Meter lang und ${an} Meter breit. Wie viele Meter Zaun braucht man, um ihn ganz einzuzäunen?`,
        explicacion: (l, an) => `Der Zaun läuft um alle vier Seiten: 2 × (${l} + ${an}) = ${2 * (l + an)} Meter.`
    },
    g_velocidad: {
        texto: (ve, v, h) => `${['Ein Fahrrad', 'Ein Schiff', 'Ein Auto', 'Ein Zug'][ve]} fährt ${v} Kilometer pro Stunde. Wie viele Kilometer schafft es in ${h} Stunden?`,
        explicacion: (ve, v, h) => `${h} Stunden mit je ${v} km: ${v} × ${h} = ${v * h} km.`
    },
    g_area: {
        texto: (a, b) => `Ein Zimmer ist ${a} Meter lang und ${b} Meter breit. Wie viele Fliesen von 1 Quadratmeter braucht man für den Boden?`,
        explicacion: (a, b) => `Fläche ist Länge mal Breite: ${a} × ${b} = ${a * b} Fliesen.`
    },
    g_fraccion: {
        texto: (a, t, d) => `Eine Pizza ist in ${t} gleiche Stücke geschnitten. ${a} isst 1/${d} der Pizza. Wie viele Stücke sind das?`,
        explicacion: (a, t, d) => `1/${d} von ${t} ist ${t} ÷ ${d} = ${t / d} Stücke.`
    },
    g_porcentaje: {
        texto: (c, precio, p) => `${['Ein Fahrrad', 'Ein Roller', 'Ein Zelt', 'Ein Paar Rollschuhe'][c]} kostet ${precio} €. Heute gibt es ${p} % Rabatt. Wie viele Euro kostet es mit Rabatt?`,
        explicacion: (c, precio, p) => `${p} % von ${precio} sind ${precio * p / 100} €. Endpreis: ${precio} - ${precio * p / 100} = ${precio - precio * p / 100} €.`
    },
    g_edades: {
        texto: (a, pa, e, m, f) => `${a} ist ${e} Jahre alt, ${['die Mutter', 'der Vater', 'die Oma', 'der Opa'][pa]} ist ${m}. Wie alt ist ${['die Mutter', 'der Vater', 'die Oma', 'der Opa'][pa]}, wenn ${a} ${f} ist?`,
        explicacion: (a, pa, e, m, f) => `Für beide vergehen ${f - e} Jahre: ${m} + ${f - e} = ${m + f - e}.`
    },
    g_media: {
        texto: (a, x, y, z) => `${a} hat in drei Tests ${x}, ${y} und ${z} von 10 Punkten erreicht. Wie hoch ist der Durchschnitt?`,
        explicacion: (a, x, y, z) => `Punkte addieren und durch 3 teilen: (${x} + ${y} + ${z}) ÷ 3 = ${(x + y + z) / 3}.`
    },
    g_serie_suma: { texto: (s) => `Sieh dir die Folge an: ${s}… Welche Zahl kommt als Nächstes?`, explicacion: () => `Jede Zahl ist die vorige plus immer dieselbe Menge.` },
    g_serie_resta: { texto: (s) => `Sieh dir die Folge an: ${s}… Welche Zahl kommt als Nächstes?`, explicacion: () => `Jede Zahl ist die vorige minus immer dieselbe Menge.` },
    g_serie_doble: { texto: (s) => `Sieh dir die Folge an: ${s}… Welche Zahl kommt als Nächstes?`, explicacion: () => `Jede Zahl wird immer mit derselben Zahl malgenommen.` },
    g_serie_cuadrados: { texto: (s) => `Sieh dir die Folge an: ${s}… Welche Zahl kommt als Nächstes?`, explicacion: () => `Es sind Quadratzahlen aufeinanderfolgender Zahlen (n × n).` },
    g_serie_fibo: { texto: (s) => `Sieh dir die Folge an: ${s}… Welche Zahl kommt als Nächstes?`, explicacion: () => `Jede Zahl ist die Summe der beiden vorigen.` },
    g_carrera: {
        texto: (a, b, c, q) => `Bei einem Wettlauf kommt ${a} vor ${b} ins Ziel und ${b} vor ${c}. Wer kommt ${q === 0 ? 'zuletzt' : 'zuerst'} ins Ziel?`,
        explicacion: (a, b, c) => `Die Reihenfolge ist ${a}, ${b} und ${c}.`
    },
    g_carrera4: {
        texto: (a, b, c, d) => `Bei einem Wettlauf kommt ${c} nach ${b} ins Ziel. ${a} kommt vor ${b}. ${d} kommt nach ${c}. Wer kommt zuletzt ins Ziel?`,
        explicacion: (a, b, c, d) => `Die Hinweise geordnet: ${a}, ${b}, ${c} und ${d}.`
    },
    g_postes: {
        texto: (l, d) => `Du willst einen geraden Zaun von ${l} Metern bauen, mit einem Pfosten alle ${d} Meter, auch an beiden Enden. Wie viele Pfosten brauchst du?`,
        explicacion: (l, d) => `Es gibt ${l / d} Abstände, aber immer einen Pfosten mehr: ${l / d} + 1 = ${l / d + 1}.`
    },
    g_dia_semana: {
        opciones: DIAS.de,
        texto: (hoy, n) => `Heute ist ${DIAS.de[hoy]}. Welcher Wochentag ist in ${n} Tagen?`,
        explicacion: (hoy, n, r) => `Alle 7 Tage kommt derselbe Tag wieder. ${n} Tage sind ${Math.floor(n / 7)} Wochen und ${n % 7} Tage: ${DIAS.de[r]}.`
    },
    g_reloj: {
        texto: (ini, dura) => `Ein Film beginnt um ${ini} Uhr und dauert ${dura} Minuten. Um wie viel Uhr ist er zu Ende? (Stunden : Minuten)`,
        explicacion: (ini, dura, fin) => `${dura} Minuten sind ${Math.floor(dura / 60)} h und ${dura % 60} min. Er endet um ${fin} Uhr.`
    },
    g_cortes: {
        texto: (t, m) => `Um einen Baumstamm in ${t} Stücke zu sägen, dauert jeder Schnitt ${m} Minuten. Wie viele Minuten dauert es insgesamt?`,
        explicacion: (t, m) => `Für ${t} Stücke reichen ${t - 1} Schnitte: ${t - 1} × ${m} = ${(t - 1) * m} Minuten.`
    },
    g_calcetines: {
        texto: (col, cada) => `In einer Schublade liegen Socken in ${col} Farben, ${cada} von jeder Farbe, und es ist dunkel. Wie viele musst du mindestens herausnehmen, um sicher zwei gleiche Farben zu haben?`,
        explicacion: (col) => `Im schlimmsten Fall nimmst du von jeder Farbe eine (${col}); die nächste passt sicher: ${col} + 1 = ${col + 1}.`
    },
    g_saludos: {
        texto: (n) => `${n} Freunde geben sich die Hand, jedes Paar einmal. Wie oft wird insgesamt die Hand gegeben?`,
        explicacion: (n) => `Jeder gibt ${n - 1} Personen die Hand, so zählt man aber jeden Handschlag doppelt: ${n} × ${n - 1} ÷ 2 = ${n * (n - 1) / 2}.`
    },
    g_cabezas_patas: {
        texto: (c, p) => `In einem Stall gibt es Hühner und Kaninchen. Zusammen haben sie ${c} Köpfe und ${p} Beine. Wie viele Kaninchen sind es?`,
        explicacion: (c, p) => `Wären alle Hühner, gäbe es ${c * 2} Beine. Die ${p - c * 2} übrigen Beine sind 2 pro Kaninchen: ${(p - c * 2) / 2} Kaninchen.`
    }
};

export const generatedTranslations = { es: ES, gl: GL, ca: CA, pt: PT, fr: FR, en: EN, de: DE };
export { OBJETOS };
export default generatedTranslations;
