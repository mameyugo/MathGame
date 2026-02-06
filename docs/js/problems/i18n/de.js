/**
 * Problemübersetzungen - DEUTSCH (de)
 * Modulares Textsystem für alle Probleme
 */

export const problemsDE = {
    // LEVEL 1
    compra_estandar: {
        texto: (cantidad, precio) => `Wir kaufen ${cantidad} Radiergummis. Jeder kostet ${precio}€. Wie viel zahlen wir insgesamt?`,
        explicacion: (cantidad, precio) => `Du musst die Anzahl der Radiergummis mit dem Preis multiplizieren: ${cantidad} × ${precio} = ${cantidad * precio}€.`
    },
    dedos_manos_logica: {
        texto: (manos) => `Wenn ich an einer Hand 5 Finger habe und an zwei Händen 10 Finger, wie viele Finger sind an ${manos} Händen?`,
        explicacion: (manos) => `Denk gut nach! Jede Hand hat 5 Finger. Also: 5 × ${manos} = ${manos * 5} Finger insgesamt.`
    },
    peces_ahogados: {
        texto: () => `In einem Aquarium sind 10 Fische. Wenn 5 davon ertrinken, wie viele Fische bleiben im Aquarium?`,
        explicacion: () => `Falle entschärft! Fische ertrinken nicht im Wasser. Es ist ihr natürlicher Lebensraum. Es sind noch 10 Fische da.`
    },
    gallo_huevos: {
        texto: () => `Ein Hahn legt ein Ei direkt auf die Kante eines Scheunenddaches. Wenn der Wind nach rechts bläst, auf welche Seite fällt das Ei?`,
        explicacion: () => `Falle entschärft! Hähne legen keine Eier, das tun Hennen. Also gibt es kein Ei, das fallen kann.`
    },
    patas_mesa_gato: {
        texto: (patas) => `Ein Tisch hat ${patas} Beine. Wenn eine Katze auf den Tisch springt, wie viele Beine berühren jetzt den Boden?`,
        explicacion: (patas) => `Falle entschärft! Die Katzenbeine sind auf dem Tisch, nicht auf dem Boden. Nur die ${patas} Tischbeine berühren den Boden.`
    },
    cesta_peras: {
        texto: (inicial, regaladas) => `Du hast einen Korb mit ${inicial} Birnen. Wenn du mir ${regaladas} Birnen gibst, wie viele Birnen hast du jetzt?`,
        explicacion: (inicial, regaladas) => `Nachdem du ${regaladas} Birnen aus deinem Korb mit ${inicial} gegeben hast, bleiben dir: ${inicial} - ${regaladas} = ${inicial - regaladas} Birne(n).`
    },
    velas_pastel: {
        texto: (iniciales, apagadas) => `In einem Geburtstagskuchen sind ${iniciales} brennende Kerzen. Wenn du ${apagadas} Kerzen ausbläst, wie viele Kerzen bleiben auf dem Kuchen?`,
        explicacion: (iniciales, apagadas) => `Objektpermanenz! Auch wenn sie aus sind, sind die Kerzen noch physisch auf dem Kuchen. Ausgeblasene Kerzen: ${apagadas}, Brennende Kerzen: ${iniciales - apagadas}, Gesamt auf Kuchen: ${iniciales}`
    },
    perro_hermanos: {
        texto: (hermanos) => `${hermanos} Geschwister (Hans, Ludwig und Anna) haben einen Hund zusammen. Wie viele Hunde gibt es insgesamt im Haus?`,
        explicacion: () => `Sorgfältiges Lesen! Der Text sagt, dass sie EINEN Hund "zusammen" haben, nicht dass jeder einen hat. Antwort: 1 gemeinsamer Hund.`
    },
    naranjas_llevas: {
        texto: (mesa, coges) => `Es gibt ${mesa} Orangen auf einem Tisch. Wenn du gehst und ${coges} Orangen nimmst, wie viele Orangen hast du jetzt?`,
        explicacion: (coges) => `Achte auf die Frage! Sie fragt nicht, wie viele auf dem Tisch bleiben, sondern wie viele HAST DU. Antwort: Die ${coges}, die du gerade genommen hast.`
    },
    paraguas_magico: {
        texto: (ninos) => `${ninos} Kinder versuchen, unter einen sehr kleinen Regenschirm zu gehen, aber niemand wird nass. Wie viel Regen fällt?`,
        explicacion: () => `Nutze den Kontext! Das Gehirn sucht nach einer komplexen physikalischen Erklärung, aber die Antwort ist einfach: Es regnet nicht. Deshalb wird niemand nass.`
    },
    patas_pajaro: {
        texto: () => `Ein Vogel hat 2 Beine. Wenn er sich auf einem Ast mit nur einem Bein abstützt und das andere zwischen seinen Federn versteckt, wie viele Beine hat der Vogel jetzt?`,
        explicacion: () => `Objektpermanenz! Auch wenn es nicht sichtbar ist, das Bein ist noch da. Der Vogel hat noch 2 Beine. Sichtbar: 1, Versteckt: 1, Gesamt: 2.`
    },
    carrera_posicion: {
        texto: () => `Du bist in einem Rennen und überholst den Zweiten. Welche Position hast du jetzt?`,
        explicacion: () => `Falle entschärft! Wenn du den Zweiten überholst, nimmst du seinen Platz ein und wirst Zweiter. Der Erste bleibt Erster.`
    },
    vuelta_compra: {
        texto: (articulo, precio, billete) => `Du gehst ins Schreibwarengeschäft und kaufst ${articulo.toLowerCase()}, das ${precio}€ kostet. Wenn du mit einem ${billete}€-Schein bezahlst, wie viel Wechselgeld bekommst du?`,
        explicacion: (precio, billete) => `Du musst den Preis vom Schein abziehen: ${billete} - ${precio} = ${billete - precio}€.`
    },
    merienda_mates: {
        texto: (queso, jamon) => `Du hast ${queso} Käsesandwiches in deinem Rucksack. Deine Mutter kommt und legt ${jamon} Schinkensandwiches dazu. Wie viele Sandwiches hast du insgesamt für den Snack?`,
        explicacion: (queso, jamon) => `Lege alle Sandwiches zusammen! ${queso} + ${jamon} = ${queso + jamon} Sandwiches. 🥪`
    },
    tesoro_canicas: {
        texto: (inicial, perdidas) => `In der Pause hattest du ${inicial} glänzende Murmeln. Beim Spielen mit einem Freund verlierst du ${perdidas} Murmeln. Wie viele Murmeln bleiben in deiner Tasche?`,
        explicacion: (inicial, perdidas) => `Denk daran: Verlieren ist wie Subtrahieren! ${inicial} - ${perdidas} = ${inicial - perdidas} Murmeln. 🔵`
    },
    estrellas_pegatina: {
        texto: (estrellas, corazones) => `Heute warst du sehr brav und die Lehrerin hat dir ${estrellas} goldene Sternaufkleber und ${corazones} rote Herzaufkleber gegeben. Wie viele Aufkleber hast du jetzt?`,
        explicacion: (estrellas, corazones) => `Addiere die Sterne und die Herzen! ${estrellas} + ${corazones} = ${estrellas + corazones} Aufkleber. ⭐`
    },
    garaje_juguete: {
        texto: (coches, salen) => `In deiner Spielzeuggarage stehen ${coches} Autos. Plötzlich fahren ${salen} Autos mit hoher Geschwindigkeit zu einem Rennen los. Wie viele Autos bleiben in der Garage?`,
        explicacion: (coches, salen) => `Wenn sie losfahren, sind weniger Autos drinnen. ${coches} - ${salen} = ${coches - salen} Autos. 🏎️`
    },
    manzanas_cesta: {
        texto: (total, gusanitos) => `Es gibt einen Korb mit ${total} roten Äpfeln. Beim genauen Hinsehen siehst du, dass ${gusanitos} einen Wurm haben und nicht gegessen werden können. Wie viele gute Äpfel bleiben übrig?`,
        explicacion: (total, gusanitos) => `Nimm die mit dem Wurm weg, um zu wissen, wie viele übrig bleiben! ${total} - ${gusanitos} = ${total - gusanitos} gute Äpfel. 🍎`
    },
    // NEUE L1 DE
    l1_suma_juguetes: {
        texto: (coches, motos) => `Du hast ${coches} Spielzeugautos und bekommst ${motos} Motorräder geschenkt. Wie viele Fahrzeuge hast du jetzt insgesamt?`,
        explicacion: (coches, motos) => `Addiere die Autos und die Motorräder, um die Gesamtzahl zu kennen: ${coches} + ${motos} = ${coches + motos}. 🚗🏍️`
    },
    l1_resta_caramelos: {
        texto: (inicial, comidos) => `In einer Tüte sind ${inicial} Bonbons. Wenn du ${comidos} isst, wie viele bleiben in der Tüte?`,
        explicacion: (inicial, comidos) => `Wenn du sie isst, sind sie nicht mehr in der Tüte. ${inicial} - ${comidos} = ${inicial - comidos}. 🍬`
    },
    l1_patas_bancos: {
        texto: (bancos) => `Im Park gibt es ${bancos} Bänke zum Sitzen. Wenn jede Bank 4 Beine hat, wie viele Beine gibt es insgesamt?`,
        explicacion: (bancos) => `Zähle 4 Beine für jede Bank: ${bancos} x 4 = ${bancos * 4}. 🪑`
    },
    l1_autobus_bajan: {
        texto: (total, bajan) => `In einem Bus sitzen ${total} Personen. An der Haltestelle steigen ${bajan} Personen aus. Wie viele Personen bleiben im Bus?`,
        explicacion: (total, bajan) => `Subtrahiere die Personen, die ausgestiegen sind: ${total} - ${bajan} = ${total - bajan}. 🚌`
    },
    l1_total_libros: {
        texto: (rojos, azules) => `In einem Regal stehen ${rojos} rote Bücher und ${azules} blaue Bücher. Wie viele Bücher gibt es insgesamt?`,
        explicacion: (rojos, azules) => `Füge die roten und blauen Bücher zusammen, um die Gesamtzahl zu finden: ${rojos} + ${azules} = ${rojos + azules}. 📚`
    },
    l1_conductor_nombre: {
        opciones: ["Ich", "Hans", "Der Bus", "Niemand"],
        texto: (pasajeros) => `Stell dir vor, du fährst einen Bus mit ${pasajeros} Fahrgästen. Wer ist der Fahrer?`,
        explicacion: () => `Der Fahrer bist DU! Die Frage sagt "Stell dir vor, du fährst...". 🚌`
    },
    l1_agujero_profundo: {
        texto: (metros) => `Du gräbst ein ${metros} Meter tiefes Loch in den Sand. Wie viel Erde ist in dem Loch?`,
        explicacion: () => `Es ist ein Loch! Wenn Erde darin wäre, wäre es kein Loch dieser Tiefe. Es ist leer (0).`
    },
    l1_caja_vacia: {
        texto: () => `Wie viele Melonen passen in eine leere Kiste?`,
        explicacion: () => `Es passt nur 1. Nachdem du die erste hineingelegt hast, ist die Kiste nicht mehr leer. 📦`
    },
    l1_dia_siguiente: {
        dias: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        texto: function (ayer, manana) {
            return `Wenn gestern ${this.dias[ayer]} war, welcher Tag ist morgen?`;
        },
        explicacion: function (ayer, manana) {
            const hoy = (ayer + 1) % 7;
            return `Wenn gestern ${this.dias[ayer]} war, ist heute ${this.dias[hoy]}. Und wenn heute ${this.dias[hoy]} ist, ist morgen ${this.dias[manana]}!`;
        },
        opciones: function (indice) {
            return this.dias[indice];
        }
    },
    l1_hijo_padre: {
        texto: () => `Thomas ist der Sohn meines Vaters, aber er ist nicht mein Bruder. Wie viele Brüder habe ich?`,
        explicacion: () => `Thomas bin ICH! Wenn er der Sohn meines Vaters und nicht mein Bruder, muss ich es selbst sein. (0 Brüder).`
    },

    // LEVEL 2
    l2_suma_resta_dinero: {
        texto: (inicial, gasto, encontrado) => `Du hattest ${inicial}€, hast ${gasto}€ für ein Buch ausgegeben und dann ${encontrado}€ gefunden. Wie viel Geld hast du jetzt?`,
        explicacion: (inicial, gasto, encontrado) => `Subtrahiere das Ausgegebene und addiere das Gefundene: ${inicial} - ${gasto} + ${encontrado} = ${inicial - gasto + encontrado}. 💶`
    },
    l2_patas_animales: {
        texto: (perros, gatos) => `Auf einem Bauernhof gibt es ${perros} Hunde und ${gatos} Katzen. Wie viele Beine gibt es insgesamt?`,
        explicacion: (perros, gatos) => `Addiere die Tiere (${perros} + ${gatos}) und multipliziere mit 4 Beinen: (${perros + gatos}) x 4 = ${(perros + gatos) * 4}. 🐾`
    },
    l2_doble_cromos: {
        texto: (tuyos) => `Du hast ${tuyos} Sticker und dein Freund hat doppelt so viele wie du. Wie viele Sticker hat dein Freund?`,
        explicacion: (tuyos) => `Das Doppelte bedeutet mit 2 multiplizieren: ${tuyos} x 2 = ${tuyos * 2}.`
    },
    l2_mitad_galletas: {
        texto: (total) => `Du hast ${total} Kekse und isst die Hälfte. Wie viele Kekse bleiben übrig?`,
        explicacion: (total) => `Die Hälfte bedeutet durch 2 teilen: ${total} / 2 = ${total / 2}. 🍪`
    },
    l2_bolsas_caramelos: {
        texto: (bolsas, caramelos) => `Du hast ${bolsas} Tüten mit je ${caramelos} Bonbons. Wie viele Bonbons hast du insgesamt?`,
        explicacion: (bolsas, caramelos) => `Multipliziere Tüten mit Bonbons: ${bolsas} x ${caramelos} = ${bolsas * caramelos}. 🍬`
    },
    l2_secuencia_simple: {
        texto: (n1, n2, n3, n4) => `Welche Zahl folgt in der Reihe? ${n1}, ${n2}, ${n3}, ${n4}...`,
        explicacion: (n1, n2, n3, n4) => `Schau, um wie viel jede Zahl steigt. Das ist der Schritt!`
    },
    l2_hermana_nosoy: {
        opciones: ["Schwester", "Bruder", "Tante", "Cousine"],
        texto: () => `Wenn ich dein Bruder bin, aber du nicht mein Bruder bist, was bist du?`,
        explicacion: () => `Du bist meine SCHWESTER! Wenn du nicht mein Bruder (Junge) bist, musst du ein Mädchen sein.`
    },
    l2_mapa_ciudades: {
        opciones: ["Karte", "Buch", "Traum", "Fernseher"],
        texto: () => `Ich habe Städte, aber keine Häuser, Berge, aber keine Bäume, und Wasser, aber keine Fische. Was bin ich?`,
        explicacion: () => `Eine Karte. Sie stellt all das dar, ohne es physisch zu haben.`
    },
    l2_esponja_agua: {
        opciones: ["Schwamm", "Eimer", "Netz", "Flasche"],
        texto: () => `Ich bin voller Löcher, kann aber trotzdem Wasser halten. Was bin ich?`,
        explicacion: () => `Ein Schwamm. Seine Poren (Löcher) saugen das Wasser auf und halten es.`
    },
    l2_romper_silencio: {
        opciones: ["Die Stille", "Ein Glas", "Ein Versprechen", "Ein Spiegel"],
        texto: () => `Ich bin so zerbrechlich, dass du mich zerbrichst, wenn du meinen Namen sagst. Was bin ich?`,
        explicacion: () => `Die Stille. Wenn du sprichst (ihren Namen sagst), ist es nicht mehr still.`
    },

    pastor_ovejas: {
        texto: (totales, vivas) => `Ein Schafhirt hat ${totales} Schafe. Ein Blitz schlägt ein und alle sterben außer ${vivas}. Wie viele Schafe bleiben ihm?`,
        explicacion: (totales, vivas) => `Falle entschärft! Das Problem sagt "alle außer ${vivas}", also bleiben ihm genau ${vivas} Schafe. Es ist nicht ${totales} - ${vivas} = ${totales - vivas}.`
    },
    meses_ano: {
        texto: () => `Wenn es in einem Jahr Monate gibt, die 30 Tage haben, und andere mit 31, wie viele Monate haben 28 Tage?`,
        explicacion: () => `Falle entschärft! Die Frage ist nicht, wie viele Monate NUR 28 Tage haben, sondern wie viele Monate HABEN 28 Tage (unter anderen). Alle Monate des Jahres haben mindestens 28 Tage, auch Februar. Die Antwort ist 12.`
    },
    biblioteca: {
        texto: (inicial, prestados, devueltos) => `In der Schulbibliothek sind ${inicial} Bücher. Montag wurden ${prestados} Bücher ausgeliehen, aber Freitag wurden ${devueltos} zurückgegeben. Wie viele Bücher sind jetzt da?`,
        explicacion: (inicial, prestados, devueltos, resultado) => `Du musst die ausgeliehenen Bücher abziehen und die zurückgegebenen addieren: ${inicial} - ${prestados} + ${devueltos} = ${resultado}.`
    },
    viaje_autobus: {
        texto: (salida, llegada) => `Ein Bus fährt um ${salida}:00 Uhr aus der Stadt ab und kommt um ${llegada}:30 Uhr an seinem Ziel an. Wie lange dauerte die Fahrt?`,
        explicacion: (salida, llegada) => `Von ${salida}:00 Uhr bis ${llegada}:30 Uhr sind ${llegada - salida} Stunden und 30 Minuten.`
    },
    la_cerilla: {
        texto: () => `Du betrittst ein dunkles und kaltes Zimmer. Du hast nur ein Streichholz. Es gibt einen Kohleofen, eine Öllampe und eine Kerze. Was zündest du zuerst an?`,
        explicacion: () => `Das Streichholz, natürlich! Ohne das Streichholz anzuzünden kannst du nichts anderes anzünden.`
    },
    peso_algodón: {
        texto: () => `Was wiegt mehr? Ein Kilogramm Eisen oder ein Kilogramm Baumwolle?`,
        explicacion: () => `Sie wiegen das Gleiche! Ein Kilogramm ist ein Kilogramm, unabhängig vom Material. Die Verwirrung kommt daher, dass Eisen dichter ist, aber wir sprechen vom gleichen Gewicht.`
    },
    ovejas_granjero: {
        texto: (total, quedan) => `Ein Landwirt hat ${total} Schafe. Eines Tages kommt ein Wolf und alle fliehen außer ${quedan}. Wie viele Schafe hat der Landwirt?`,
        explicacion: (total, quedan) => `Falle entschärft! Der Satz sagt "alle außer ${quedan}", also ist die Antwort wörtlich im Problem. Er hat genau ${quedan} Schafe. Es ist nicht ${total} − ${quedan} = ${total - quedan}.`
    },
    pastillas_medico: {
        texto: (pastillas, intervalo) => `Du bist krank und der Arzt gibt dir ${pastillas} Pillen. Er sagt dir, dass du alle ${intervalo} Minuten eine nehmen sollst. Wie lange dauert es, bis du alle nimmst?`,
        explicacion: (pastillas, intervalo) => `Visualisiere die Zeit! Der häufige Fehler ist ${pastillas}×${intervalo}=${pastillas * intervalo}. Aber: Die erste nimmst du in Minute 0, die zweite nach ${intervalo} Minuten, und die dritte nach ${intervalo * (pastillas - 1)} Minuten. Gesamt: ${intervalo * (pastillas - 1)} Minuten.`
    },
    hermano_tio: {
        texto: () => `Der Bruder meines Onkels kommt mich besuchen, aber es stellt sich heraus, dass er nicht mein Onkel ist. Wer ist er?`,
        explicacion: () => `Familienlogik! Der Bruder meines Onkels ist mein Vater. Wenn der Onkel meines Vaters einen Bruder hat, und dieser Bruder ist nicht mein Onkel, dann muss es mein Vater sein. Die Verwirrung kommt daher, dass man nach einem "entfernten" Verwandten sucht.`
    },
    reparto_cesta: {
        texto: () => `In einem Korb sind 5 Äpfel. Du musst sie unter 5 Freunden so verteilen, dass jeder einen Apfel hat, aber am Ende bleibt ein Apfel im Korb. Wie machst du das?`,
        explicacion: () => `Laterales Denken! Die Lösung ist: Du gibst dem letzten Freund den Korb MIT dem Apfel darin. So hat jeder einen Apfel, und einer bleibt im Korb. Die Falle ist anzunehmen, dass "verteilen" bedeutet, das Objekt aus dem Behälter zu nehmen.`
    },
    pescadores_familia: {
        texto: () => `Zwei Väter und zwei Söhne gehen angeln. Sie fangen 3 Fische und jeder bekommt einen ohne Reste. Wie viele Personen gibt es insgesamt?`,
        explicacion: () => `Es gibt nur 3 Personen! Der Großvater und der Vater sind "zwei Väter", und der Vater und der Sohn sind "zwei Söhne". Insgesamt: Großvater + Vater + Sohn = 3 Personen. Der häufige Fehler ist, 2+2=4 Personen zu addieren.`
    },

    // LEVEL 3
    // LEVEL 3
    l3_jerarquia_ops: {
        texto: (a, b, c) => `Löse: ${a} + ${b} × ${c} = ?`,
        explicacion: (a, b, c) => `Denk an die Rangfolge! Erst Multiplikation, dann Addition: ${b}×${c}=${b * c}, dann ${a}+${b * c}=${a + (b * c)}. Mach nicht (${a}+${b})×${c}.`
    },
    l3_horas_minutos: {
        texto: (horas, minutos) => `Ein Film dauert ${horas} Stunde(n) und ${minutos} Minuten. Wie viele Minuten sind das insgesamt?`,
        explicacion: (horas, minutos) => `1 Stunde sind 60 Minuten. ${horas}h × 60 = ${horas * 60} min. Addiere die restlichen ${minutos} min: ${horas * 60} + ${minutos} = ${(horas * 60) + minutos}. ⏱️`
    },
    l3_gramos_kilos: {
        texto: (kilos, gramos) => `Du hast ${kilos}kg und ${gramos}g Mehl gekauft. Wie viele Gramm sind das insgesamt?`,
        explicacion: (kilos, gramos) => `1 Kilo sind 1000 Gramm. ${kilos}kg = ${kilos * 1000}g. Gesamt: ${kilos * 1000} + ${gramos} = ${(kilos * 1000) + gramos}g.`
    },
    l3_triple_suma: {
        texto: (base) => `Ein Stift kostet ${base}€. Ein Heft kostet das Dreifache. Wie viel kosten beide zusammen?`,
        explicacion: (base) => `Heft: ${base} x 3 = ${base * 3}€. Stift: ${base}€. Gesamt: ${base * 3} + ${base} = ${base * 4}€.`
    },
    l3_dias_semanas: {
        texto: (semanas, dias) => `Du fährst für ${semanas} Wochen und ${dias} Tage in den Urlaub. Wie viele Tage sind das insgesamt?`,
        explicacion: (semanas, dias) => `Eine Woche hat 7 Tage. ${semanas} Wochen = ${semanas * 7} Tage. Addiere ${dias}: ${semanas * 7} + ${dias} = ${(semanas * 7) + dias}.`
    },
    l3_logica_carrera: {
        opciones: ["Zweiter", "Erster", "Vorletzter", "Letzter"],
        texto: () => `Du bist in einem Rennen und überholst den Zweiten. An welcher Position bist du jetzt?`,
        explicacion: () => `Zweiter! Wenn du den Zweiten überholst, nimmst du seinen Platz ein. Du bist noch nicht Erster.`
    },
    l3_logica_meses_28: {
        opciones: ["12", "1", "6", "0"],
        texto: () => `Wie viele Monate im Jahr haben 28 Tage?`,
        explicacion: () => `Alle 12! Januar hat 31 (also hat er 28), Februar hat 28, usw. Die Frage sagte nicht "nur" 28.`
    },
    l3_logica_padre_hijo: {
        opciones: ["Mutter", "Vater", "Großmutter", "Onkel"],
        texto: () => `Juans Vater sagt zu seinem Sohn: "Zeig auf diese Dame, sie ist die Mutter deiner Mutter". Wer ist die Dame für Juan?`,
        explicacion: () => `Die Großmutter! Die Mutter seiner Mutter ist seine Großmutter mütterlicherseits.`
    },
    l3_logica_paraguas: {
        opciones: ["Es regnete nicht", "Sie hatten Schirme", "Sie waren Fische", "Sie rannten schnell"],
        texto: (personas) => `${personas} Personen gehen unter einem kleinen Regenschirm, aber niemand wird nass. Wie ist das möglich?`,
        explicacion: () => `Weil es nicht regnete! Der Kontext deutet auf Regen hin, sagt es aber nicht ausdrücklich.`
    },
    l3_logica_globo: {
        opciones: ["Löcher", "Luft", "Steine", "Wasser"],
        texto: () => `Was kannst du in ein Fass geben, damit es weniger wiegt?`,
        explicacion: () => `Löcher! Indem man Material entfernt, um das Loch zu machen, verliert das Fass an Gewicht.`
    },

    manzanas_rotas_logica: {
        texto: (n1, n2, precio, p1, p2) => `${p1} hat ${n1} Äpfel. ${p2} stößt ihn an, ${p1} fällt und ${n2} zerbrechen. Wenn jeder Apfel ${precio}€ kostet, wie viel Geld schuldet ${p1} dem ${p2}?`,
        explicacion: (n2, precio, p1, p2) => `Achtung! Die Äpfel gehören ${p1}. Es ist ${p2}, der ${p1} ${n2 * precio}€ zahlen sollte.`
    },
    tren_electrico: {
        texto: (velocidad_tren, velocidad_viento) => `Ein Elektrozug fährt mit ${velocidad_tren} km/h nach Norden. Wenn der Wind mit ${velocidad_viento} km/h nach Süden bläst, wie viel Rauch stößt der Zug aus?`,
        explicacion: () => `Falle entschärft! Es ist ein ELEKTROZUG, kein Dampf- oder Dieselzug. Elektrozüge stoßen keinen Rauch aus, sie werden direkt mit Strom betrieben. All diese Geschwindigkeiten sind Ablenkungen. Die Antwort ist 0.`
    },
    despertador_antiguo: {
        texto: () => `Du gehst um 20 Uhr ins Bett und stellst einen analogen Wecker, um um 9 Uhr morgens zu klingeln. Wie viele Stunden wirst du geschlafen haben, wenn der Wecker klingelt?`,
        explicacion: () => `Falle! Analoge Wecker unterscheiden nicht zwischen AM und PM. Wenn der Zeiger auf 9 trifft, klingelt er um 21 Uhr (1 Stunde später), nicht um 9 Uhr morgens.`
    },
    padre_rosa: {
        texto: () => `Rosas Vater hat 5 Töchter: Lala, Lele, Lili, Lolo und... wie heißt die fünfte Tochter?`,
        explicacion: () => `Rosa! Das Vokalmuster (A, E, I, O) lenkt dich ab, aber die Frage erwähnte bereits, dass die erste Tochter Rosa heißt.`
    },
    dias_sin_nombre: {
        texto: () => `Nenne drei aufeinanderfolgende Tage, ohne die Wörter Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag oder Sonntag zu benutzen.`,
        explicacion: () => `Gestern, heute und morgen! Dies sind aufeinanderfolgende Tage, gehören aber nicht zur traditionellen Woche, sondern zu relativen Zeitreferenzen.`
    },
    tarta_horno: {
        texto: (inicio, duracion, fin_hora, fin_min) => {
            const fin = fin_min === 0 ? `${fin_hora}:00` : `${fin_hora}:${fin_min.toString().padStart(2, '0')}`;
            return `Mutti hat einen Kuchen um ${inicio}:00 Uhr in den Ofen gestellt. Wenn der Kuchen ${duracion} Minuten zum Backen braucht, wann sollten wir ihn herausnehmen?`;
        },
        explicacion: (duracion, fin) => `Wir addieren ${duracion} Minuten. Ergebnis: ${fin}.`
    },

    ascensor_loco: {
        texto: (inicio, sube1, baja, sube2, respuesta) => `Du lebst in der ${inicio}. Etage. Du gehst ${sube1} Stockwerke hinauf, um einen Freund zu besuchen, dann ${baja} hinunter zur Waschküche und schließlich ${sube2} hinauf zur Terrasse. In welcher Etage ist die Terrasse?`,
        explicacion: (inicio, sube1, baja, sube2, respuesta) => `Sequenzielles Gedächtnisübung! Du musst den Bewegungen folgen: Etage ${inicio} + ${sube1} - ${baja} + ${sube2} = ${respuesta}. Der häufige Fehler ist, die Ausgangsebene zu vergessen.`
    },
    hermanos_balon: {
        texto: (hermanas, hermanos, respuesta) => `In einer Familie gibt es ${hermanas} Schwestern. Jede Schwester hat einen Bruder. Wie viele Personen bilden die Gruppe der Geschwister insgesamt?`,
        explicacion: (hermanas, hermanos, respuesta) => `Vorsicht vor der Falle! Das Gehirn neigt dazu, ${hermanas} + ${hermanas} = ${hermanas * 2} zu addieren. Aber der Bruder ist derselbe für alle drei Mädchen. Insgesamt: ${hermanas} Schwestern + ${hermanos} Bruder = ${respuesta} Personen.`
    },
    libro_aventuras: {
        texto: (paginas, paginas_diarias) => `Ein Buch hat ${paginas} Seiten. Wenn du ${paginas_diarias} Seiten pro Tag liest und an einem Montag anfängst, an welchem Wochentag wirst du das Buch fertig lesen?`,
        explicacion: (paginas, paginas_diarias, dias) => `Berechne die Tage: ${paginas} / ${paginas_diarias} = ${dias} Tage. Dann zähle ab Montag: Tag ${dias} ist ein Mittwoch (der nächsten Woche).`
    },
    caracoles_carrera: {
        texto: (velocidad, distancia, descanso) => `Wenn eine Schnecke ${velocidad} Meter in einer Stunde zurücklegt, wie lange braucht sie, um ${distancia} Meter zu gehen, wenn sie auf halbem Weg eine halbe Stunde Rast macht?`,
        explicacion: (velocidad, distancia, descanso, tiempoTotal) => `Die Grundberechnung ist ${distancia} / ${velocidad} = ${distancia / velocidad} Stunden. Aber vergiss nicht die Ruhezeit: ${distancia / velocidad} + ${descanso} = ${tiempoTotal} Stunden (${tiempoTotal * 60} Minuten).`
    },
    peso_fruta: {
        texto: (pinasParaManzanas, pesoDeManzana, numeroDePinas) => `Eine Ananas wiegt genauso viel wie ${pinasParaManzanas} Äpfel. Wenn ein Apfel ${pesoDeManzana} Gramm wiegt, wie viel wiegt ein Korb mit ${numeroDePinas} Ananas, wenn der leere Korb nichts wiegt?`,
        explicacion: (pinasParaManzanas, pesoDeManzana, numeroDePinas, pesoTotal) => `Es ist ein Substitutionsproblem. Finde zuerst das Gewicht der Ananas: ${pinasParaManzanas} × ${pesoDeManzana} = ${pinasParaManzanas * pesoDeManzana} Gramm. Dann multipliziere mit ${numeroDePinas} Ananas: ${pinasParaManzanas * pesoDeManzana} × ${numeroDePinas} = ${pesoTotal} Gramm.`
    },

    // LEVEL 4
    // LEVEL 4
    l4_fracciones_visuales: {
        texto: (num) => `Du hast ${num} Murmeln. Wenn du ein Viertel (1/4) davon verlierst, wie viele hast du verloren?`,
        explicacion: (respuesta) => `Ein Viertel bedeutet durch 4 teilen. Die Antwort ist ${respuesta}.`
    },
    l4_decimales_dinero: {
        texto: (p1, p2) => `Du kaufst ein Eis für ${p1}€ und eine Limo für ${p2}€. Wie viel zahlst du insgesamt?`,
        explicacion: (total) => `Addiere die Preise: ${total}€. Denk daran, das Komma auszurichten.`
    },
    l4_ecuacion_simple: {
        texto: (suma, total) => `Ich denke an eine Zahl. Wenn ich ${suma} addiere, erhalte ich ${total}. An welche Zahl habe ich gedacht?`,
        explicacion: (x, suma) => `Wenn das Hinzufügen von ${suma} ${x + suma} ergibt, mach das Gegenteil: subtrahiere ${suma}.`
    },
    l4_area_rectangulo: {
        texto: (ancho, alto) => `Ein Zimmer ist ${ancho} Meter breit und ${alto} Meter lang. Was ist seine Fläche in m²?`,
        explicacion: (area) => `Die Fläche ist Breite x Höhe = ${area} m².`
    },
    l4_mitad_doble: {
        texto: (num) => `Wenn du ${num} mit 2 multiplizierst und das Ergebnis dann durch 2 teilst, was erhältst du?`,
        explicacion: () => `Dieselbe Zahl! Multiplizieren und Dividieren durch 2 heben sich gegenseitig auf.`
    },
    l4_hija_teresa: {
        opciones: ["Meine Tochter", "Meine Mutter", "Ich", "Meine Großmutter"],
        texto: () => `Teresas Tochter ist die Mutter meiner Tochter. Wer bin ich? (Ich bin eine Frau)`,
        explicacion: () => `Ich bin Teresa! Wenn Teresas Tochter die Mutter meiner Tochter ist, und ich die Mutter meiner Tochter bin... bin ich Teresas Tochter. Also bin ich Teresa.`
    },
    l4_auto_ruedas: {
        opciones: ["Das Reserverad", "Vorne rechts", "Hinten links", "Alle drehen sich"],
        texto: () => `Ein Auto fährt auf einer geraden Straße nach Norden. Welches Rad dreht sich nicht?`,
        explicacion: () => `Das Reserverad! Die anderen vier müssen sich drehen, um vorwärts zu kommen.`
    },
    l4_meses_frio: {
        opciones: ["Das Thermometer", "Der Kalender", "Der Schnee", "Der Winter"],
        texto: () => `Ich steige, wenn es heiß ist, und falle, wenn es kalt ist. Was bin ich?`,
        explicacion: () => `Das Thermometer! Die Flüssigkeit dehnt sich bei Hitze aus und steigt.`
    },
    l4_pato_huevo: {
        opciones: ["Keines", "Eines", "Zwei", "Drei"],
        texto: () => `Eine Ente legt ein Ei genau auf die Grenze zwischen Spanien und Frankreich. Zu welchem Land gehört das Ei?`,
        explicacion: () => `Zu keinem! Enten (Erpel) legen keine Eier.`
    },
    l4_quien_soy: {
        opciones: ["Dein Name", "Dein Alter", "Deine Stimme", "Dein Schatten"],
        texto: () => `Es gehört dir, aber andere benutzen es öfter als du. Was ist es?`,
        explicacion: () => `Dein Name! Leute rufen dich dabei, du rufst dich selten selbst.`
    },

    patas_mesa: {
        texto: (mesas, patas_m, sillas, patas_s, perros, patas_p) =>
            `In einem Zimmer sind ${mesas} Tische mit je ${patas_m} Beinen und ${sillas} Stühle mit je ${patas_s} Beinen. Wie viele Beine sind es insgesamt, wenn ${perros} Hunde eintreten?`,
        explicacion: (mesas, patas_m, sillas, patas_s, perros, patas_p, total) =>
            `Falle! Viele vergessen, die Hundebeine zu zählen. Tische: ${mesas}×${patas_m}=${mesas * patas_m}, Stühle: ${sillas}×${patas_s}=${sillas * patas_s}, Hunde: ${perros}×${patas_p}=${perros * patas_p}. Gesamt: ${total}`
    },
    huerto_manzanas: {
        texto: (filas, arboles) => `Don Tomás hat einen Obstgarten mit ${filas} Reihen von Apfelbäumen gepflanzt. Wenn jede Reihe ${arboles} Bäume hat, wie viele Bäume hat er insgesamt?`,
        explicacion: (filas, arboles, total) => `Du musst die Anzahl der Reihen mit der Anzahl der Bäume in jeder Reihe multiplizieren: ${filas} × ${arboles} = ${total}.`
    },
    entrenamiento_batman: {
        texto: (horas) => `Batman hat heute ${horas} Stunden lang trainiert. Wie viele Minuten hat er insgesamt trainiert?`,
        explicacion: (horas, total) => `Um Stunden in Minuten umzurechnen, multiplizieren wir mit 60: ${horas} × 60 = ${total} Minuten.`
    },
    reloj_espejo: {
        texto: (hora) => `Du schaust auf eine analoge Uhr durch einen Spiegel. Die Zeiger zeigen ${hora} Uhr. Wie viel Uhr ist es wirklich?`,
        explicacion: (hora, real) => `Der Spiegel dreht die Richtung um. Die Position von ${hora} wird zu ${real}. Die wahre Zeit ist ${real} Uhr.`
    },
    arca_moises: {
        texto: () => `Wie viele Tiere jeder Art brachte Moses in seine Arche?`,
        explicacion: () => `Keine! Es war Noah, der die Arche baute, nicht Moses. Viele Leute antworten "Paare", ohne den Namensfehler zu bemerken.`
    },
    cesta_huevos: {
        texto: () => `In einem Korb sind 6 Eier. 6 Personen kaufen je ein Ei und am Ende bleibt noch ein Ei im Korb. Wie viele Eier bleiben im Korb?`,
        explicacion: () => `Eins! Die letzte Person nahm den Korb mit dem Ei darin. Es ist nicht so, dass ein Ei verschwunden ist, sondern dass es in seinem Behälter mitgenommen wurde.`
    },
    hermanos_juan: {
        texto: () => `Hans hat 3 Schwestern. Jede seiner Schwestern hat einen Bruder. Wie viele Brüder hat Hans insgesamt?`,
        explicacion: () => `Falle aktiviert! Das Gehirn will addieren, aber die Antwort ist 0. Der "einzige Bruder" aller seiner Schwestern ist Hans selbst. Hans hat keine anderen Brüder.`
    },
    avion_frontera: {
        texto: (pais1, pais2) => `Ein Flugzeug stürzt genau an der Grenze zwischen ${pais1} und ${pais2} ab. In welchem Land werden die Überlebenden begraben?`,
        explicacion: () => `Sprachfalle! Die Überlebenden werden NICHT begraben! Das Problem erwähnt "Grenze", um dich abzulenken, aber der Schlüssel ist, dass es Überlebende gibt.`
    },
    velas_viento: {
        texto: (iniciales, apagadas, encendidas) => `Es sind ${iniciales} brennende Kerzen auf einem Tisch. Ein Windhauch bläst ${apagadas} aus. Wenn sie niemand wieder anzündet, wie viele Kerzen bleiben am nächsten Tag?`,
        explicacion: (encendidas, apagadas) => `Zeitliches Denken! Die ${encendidas} brennenden Kerzen werden sich in der Nacht vollständig verbrauchen. Nur die ${apagadas} erloschenen Kerzen bleiben, die intakt bleiben.`
    },
    peso_manzanas: {
        texto: (llena, caja, mitad) => `Ein Korb voller Äpfel wiegt ${llena} kg. Der leere Korb wiegt ${caja} kg. Wenn du die Hälfte der Äpfel isst, wie viel wiegt der Korb jetzt?`,
        explicacion: (llena, caja, manzanas, mitad, resultado) => `Schritt 1: Gewicht der Äpfel = ${llena} - ${caja} = ${manzanas} kg. Schritt 2: Hälfte der Äpfel = ${manzanas} ÷ 2 = ${mitad} kg. Schritt 3: Korb + verbleibende Äpfel = ${caja} + ${mitad} = ${resultado} kg`
    },
    pajaro_cazador: {
        texto: (inicial) => `Es sind ${inicial} Vögel auf einem Ast. Ein Jäger schießt und trifft einen. Wie viele Vögel bleiben auf dem Ast?`,
        explicacion: (inicial) => `Logischer Realismus! Der verletzte Vogel fällt zu Boden und die anderen ${inicial - 1} Vögel fliegen erschrocken davon. Ergebnis: 0 Vögel auf dem Ast.`
    },
    ladrillo_peso_nivel4: {
        texto: () => `Ein Ziegel wiegt 1 kg plus einen halben Ziegel. Wie viel wiegen eineinhalb Ziegel?`,
        explicacion: () => `Algebra: Wenn ein Ziegel (x) = 1 + x/2, dann x/2 = 1, daher x = 2 kg. Eineinhalb Ziegel = 2 + 1 = 3 kg. Die häufige Falle ist, 1,5 kg zu antworten, ohne die Gleichung zu lösen.`
    },

    // LEVEL 5
    // LEVEL 5
    l5_sistema_ecuaciones: {
        texto: (A, B) => `Löse das System: \n2x + y = ${A} \nx - y = ${B} \nWie viel ist x?`,
        explicacion: (x) => `Addiere die Gleichungen: (2x + y) + (x - y) = 3x. Dann ergibt 3x geteilt durch 3 gleich ${x}.`
    },
    l5_probabilidad_dados: {
        opciones: ["1/6", "1/12", "1/36", "5/36"],
        texto: () => `Du wirfst zwei 6-seitige Würfel. Wie hoch ist die Wahrscheinlichkeit, dass die Summe 7 ist?`,
        explicacion: () => `Es gibt 6 günstige Fälle und 36 insgesamt. 6/36 vereinfacht ist 1/6.`
    },
    l5_velocidad_relativa: {
        texto: (v1, v2, dist) => `Ein Zug fährt von A mit ${v1} km/h nach B, ein anderer von B mit ${v2} km/h nach A. Abstand ${dist} km. Wann treffen sie sich?`,
        explicacion: (t) => `Relativgeschwindigkeit = ${v1 + v2} km/h. Zeit = ${dist} / ${v1 + v2} = ${t} Stunden.`
    },
    l5_combinatoria_saludos: {
        texto: (p) => `${p} Freunde treffen sich und jeder schüttelt jedem die Hand. Wie viele Handschläge?`,
        explicacion: (s) => `Formel: n(n-1)/2. Jeder grüßt jeden, aber die Beziehung ist wechselseitig.`
    },
    l5_porcentaje_compuesto: {
        opciones: ["Sinkt um 1%", "Gleich", "Steigt um 1%", "Sinkt um 10%"],
        texto: () => `Eine Aktie steigt um 10% und fällt dann um 10%. Wie steht sie nun?`,
        explicacion: () => `Beispiel: 100 + 10% = 110. 110 - 10% = 99. Sie verliert 1% gegenüber 100.`
    },
    l5_logica_ascensor: {
        opciones: ["Er ist klein", "Er ist sportlich", "Aberglaube", "Kaputt"],
        texto: () => `Ein Mann wohnt im 10. Stock. Er nimmt den Aufzug nach unten, aber nach oben nur bis zum 7. und läuft den Rest (außer es regnet). Warum?`,
        explicacion: () => `Er ist klein! Er kommt nicht an den Knopf für den 10. Stock. Wenn es regnet, benutzt er seinen Regenschirm.`
    },
    l5_logica_meses: {},
    l5_logica_secuencia_letras: {
        opciones: ["D", "N", "O", "P"],
        texto: () => `Welcher Buchstabe folgt? J, F, M, A, M, J, J, A, S, O, N ...`,
        explicacion: () => `D für Dezember! Anfangsbuchstaben der Monate.`
    },
    l5_logica_padre_juan: {
        opciones: ["Johannes", "Vierter", "Lukas", "Josef"],
        texto: () => `Johannes' Vater hat 4 Söhne: Eins, Zwei, Drei... Wie heißt der vierte?`,
        explicacion: () => `Johannes! Die Frage sagt es am Anfang.`
    },
    l5_logica_interruptores: {
        opciones: ["Durch Temperatur", "Schauen", "Zufall", "Unmöglich"],
        texto: () => `3 Schalter für eine geschlossene Lampe. Nur einmal eintreten. Woher weißt du, welcher es ist?`,
        explicacion: () => `Fühle die Glühbirne. Schalte 1 an, warte, aus. Schalte 2 an, geh rein. Licht an -> 2. Heiß -> 1. Kalt -> 3.`
    },

    peso_ladrillo: {
        texto: (extra) => `Wenn ein Ziegel ${extra} kg plus einen halben Ziegel wiegt, wie viel wiegen eineinhalb Ziegel?`,
        explicacion: (extra, ladrillo, resultado) => `Herausforderung deaktiviert! Wenn X = Gewicht eines Ziegels, dann X = ${extra} + X/2, also X = ${ladrillo} kg. Eineinhalb Ziegel wiegen ${ladrillo} + ${ladrillo / 2} = ${resultado} kg.`
    },
    pastor_lobo_oveja: {
        texto: () => `Ein Schafhirt muss einen Fluss überqueren mit einem Wolf, einem Schaf und einem Kohl. Das Boot kann nur ihn und noch eine Sache aufnehmen. Wenn er den Wolf mit dem Schaf allein lässt, frisst der Wolf es. Wenn er das Schaf mit dem Kohl allein lässt, frisst das Schaf den Kohl. Wie viele Fahrten braucht er mindestens? (Jede Fahrt hin oder her zählt als 1 Fahrt)`,
        explicacion: () => `Lösung: 1. Überquert mit dem Schaf. 2. Kommt allein zurück. 3. Überquert mit dem Wolf (und bringt das Schaf zurück). 4. Überquert mit dem Kohl. 5. Kommt allein zurück. 6. Überquert mit dem Schaf. Gesamt: 6 Fahrten.`
    },
    reloj_espejo_avanzado: {
        texto: (hora) => `Du schaust auf eine analoge Uhr durch einen Spiegel. Die Zeiger zeigen ${hora}:00 Uhr. Wie viel Uhr ist es wirklich?`,
        explicacion: (hora, real) => `Der Spiegel dreht die horizontale Position der Uhr um. Die Formel ist: wahre Uhrzeit = 12 - Uhrzeit im Spiegel. Also: 12 - ${hora} = ${real}:00.`
    },
    caracol_pozo: {
        texto: (profundidad, sube, resbala) => `Eine Schnecke ist am Boden eines ${profundidad} Meter tiefen Brunnens. Tagsüber klettert sie ${sube} Meter, aber nachts rutscht sie ${resbala} Meter ab. In wie vielen Tagen kommt sie aus dem Brunnen?`,
        explicacion: (profundidad, sube, resbala, dias) => `Sequenzielle Logik! Die instinktive Berechnung ist ${profundidad}/${sube - resbala}=${profundidad / (sube - resbala)} Tage. Aber am Tag ${dias} beginnt die Schnecke bei ${profundidad - sube}m, klettert ${sube}m und erreicht ${profundidad}m, also kommt sie heraus und rutscht diese Nacht nicht ab!`
    },
    edad_hermana: {
        texto: (edad_pasada, edad_actual) => `Als ich ${edad_pasada} Jahre alt war, war meine Schwester halb so alt wie ich. Jetzt bin ich ${edad_actual} Jahre alt. Wie alt ist meine Schwester?`,
        explicacion: (edad_pasada, edad_actual, diferencia, resultado) => `Variable konstante Beziehung! Das Gehirn sucht nach dem "Hälfte"-Verhältnis (${edad_actual}/2=${edad_actual / 2}), aber der Altersunterschied ist konstant. Wenn es damals ${diferencia} Jahre Unterschied gab, gibt es jetzt immer noch ${diferencia} Jahre. Antwort: ${edad_actual} - ${diferencia} = ${resultado} Jahre.`
    },
    contar_digito_siete: {
        texto: (paginas) => `Du nummerierst die Seiten eines Buches, das genau ${paginas} Seiten hat. Wie oft schreibst du die Ziffer '7'?`,
        explicacion: () => `Zahlenmuster! Viele zählen die 7en nur an den Einerstellen (7,17,27...97) = 10. Aber sie vergessen die 7en an den Zehnerstellen 70-79 (10 weitere). Die Zahl 77 hat zwei 7en. Gesamt: 10 + 10 = 20 Mal.`
    },
    bate_pelota: {
        texto: (total_costo, diferencia) => `Ein Schläger und ein Ball kosten zusammen ${total_costo.toFixed(2)}€. Der Schläger kostet ${diferencia.toFixed(2)}€ mehr als der Ball. Wie viel kostet der Ball?`,
        explicacion: () => `Differenzgleichung! Die automatische Antwort ist 0,10€, aber wenn der Ball 0,10€ kostet, würde der Schläger 1,10€ kosten und das Gesamte 1,20€. Korrekt: Wenn Ball = x, dann Schläger = x + 1. x + (x + 1) = 1,10 → 2x = 0,10 → x = 0,05€`
    },
    vuelo_pajaro: {
        texto: (distancia, velocidad_t, velocidad_p, tiempo) => `Zwei Züge fahren auf gegenüberliegenden Gleisen ${distancia} km voneinander entfernt und nähern sich gegenseitig mit je ${velocidad_t} km/h. Ein Vogel fliegt von Zug A mit ${velocidad_p} km/h zu Zug B, und wenn er ihn erreicht, fliegt er zurück zu Zug A, und so weiter, bis die Züge kollidieren. Wie weit ist die Gesamtstrecke, die der Vogel fliegt?`,
        explicacion: (velocidad_p, tiempo, velocidad_t) => `Die Falle der unendlichen Berechnung! Viele versuchen, jede Vogelflugbahn zu berechnen (unendliche Reihe). Der Trick ist, die Zeit zu berechnen: Die Züge brauchen ${tiempo} Stunde bis zur Kollision (${velocidad_t}+${velocidad_t}=${velocidad_t * 2} km/h relative Geschwindigkeit). Wenn der Vogel ${velocidad_p} km/h für diese Stunde fliegt, legt er genau ${velocidad_p * tiempo} km zurück.`
    },
    cumpleaños_imposible: {
        texto: (edad_anteayer, edad_proximo) => `Vorgestern war ich ${edad_anteayer} Jahre alt und nächstes Jahr werde ich ${edad_proximo} Jahre alt. Wie alt bin ich heute? (Wissen Sie, dass heute der 1. Januar ist)`,
        explicacion: (edad_anteayer, edad_hoy, edad_proximo) => `Zeitlogik! Es scheint unmöglich, in so kurzer Zeit von ${edad_anteayer} zu ${edad_proximo} Jahren zu kommen. Die Lösung: 1. Gestern (31. Dezember) wurde ich ${edad_hoy}. 2. Vorgestern (30. Dezember) war ich noch ${edad_anteayer}. 3. Dieses Jahr werde ich ${edad_hoy + 1} im Dezember. 4. Nächstes Jahr werde ich ${edad_proximo}. Heute: ${edad_hoy} Jahre alt.`
    },
    cubo_pintado: {
        texto: (tamano, total, respuesta) => `Ein Holzwürfel von ${tamano}×${tamano}×${tamano} cm wird von außen blau angestrichen. Dann wird er in ${total} kleine Würfel von 1×1×1 cm geschnitten. Wie viele dieser kleinen Würfel haben genau 2 blau angestrichene Flächen?`,
        explicacion: (aristas, tamano, respuesta) => `Räumliche Visualisierung! Das Gehirn versucht, Gesamtflächen zu zählen, aber der Trick ist zu wissen, dass Würfel mit 2 bemalten Flächen an den Kanten sind (aber nicht an den Ecken, die 3 haben). Ein Würfel hat ${aristas} Kanten, und in diesem Fall gibt es 1 kleinen Würfel pro Kante. Insgesamt: ${respuesta} kleine Würfel.`
    },
    carrera_100m: {
        texto: (distancia, ventaja) => `Läufer A schlägt Läufer B um ${ventaja} Meter. Läufer B schlägt Läufer C um ${ventaja} Meter. Wenn alle drei ${distancia} Meter laufen, um wie viele Meter schlägt A C?`,
        explicacion: (ventaja, velocidad_c_porcent, respuesta) => `Die Additionsfalle! Die intuitive Antwort ist ${ventaja + ventaja} Meter (${ventaja}+${ventaja}). Aber die Entfernungen sind proportional zur Geschwindigkeit. C läuft mit ${velocidad_c_porcent}×100=${Math.round(velocidad_c_porcent * 100)}% von As Geschwindigkeit. Echter Vorsprung: 100 - (100 × ${velocidad_c_porcent}) ≈ ${respuesta}m`
    },
    monos_platanos: {
        texto: (monos_ini, platanos_ini, tiempo_ini, monos_fin, platanos_fin) => `Wenn ${monos_ini} Affen ${tiempo_ini} Minuten brauchen, um ${platanos_ini} Bananen zu essen, wie lange brauchen ${monos_fin} Affen, um ${platanos_fin} Bananen zu essen?`,
        explicacion: (tiempo_ini) => `Die Dreisatzfalle! Es wird versucht, einen direkten Anteil anzuwenden. Aber die Rate beträgt 1 Affe pro Banane alle ${tiempo_ini} Minuten. Wenn alle gleichzeitig anfangen zu essen, enden sie zur gleichen Zeit. Das Verhältnis Affen:Bananen ist gleich (1:1), also bleibt die Zeit konstant: ${tiempo_ini} Minuten.`
    },
    // NEUE PROBLEME STUFE 2
    horno_galletas: {
        texto: (chocolate, vainilla, vendidas) => `In der Bäckerei haben sie ${chocolate} Schokoladenplätzchen und ${vainilla} Vanilleplätzchen gebacken. Wenn sie bereits ${vendidas} Plätzchen verkauft haben, wie viele Plätzchen bleiben noch auf dem Tablett?`,
        explicacion: (chocolate, vainilla, vendidas) => `Zähle zuerst alle Plätzchen zusammen: ${chocolate} + ${vainilla} = ${chocolate + vainilla}. Dann subtrahiere die verkauften: ${chocolate + vainilla} - ${vendidas} = ${chocolate + vainilla - vendidas} Plätzchen.`
    },
    estantes_biblioteca: {
        texto: (estantes, libros_estante) => `In der Schulbibliothek gibt es ${estantes} Regale. Wenn jedes Regal genau ${libros_estante} Bücher hat, wie viele Bücher gibt es insgesamt in der Bibliothek?`,
        explicacion: (estantes, libros_estante) => `Du kannst ${libros_estante} + ${libros_estante}... (${estantes} mal) addieren oder Multiplikation verwenden: ${estantes} × ${libros_estante} = ${estantes * libros_estante} Bücher.`
    },
    reparto_caramelos: {
        texto: (caramelos_total, amigos) => `Du hast ${caramelos_total} Erdbeerbonbons und möchtest sie gleich auf deine ${amigos} besten Freunde verteilen. Wie viele Bonbons bekommt jeder Freund?`,
        explicacion: (caramelos_total, amigos) => `Welche Zahl multipliziert mit ${amigos} ergibt ${caramelos_total}? Die Antwort ist: ${caramelos_total} ÷ ${amigos} = ${caramelos_total / amigos} Bonbons für jeden Freund.`
    },
    ahorro_juguete: {
        texto: (precio, ahorros, regalo) => `Du möchtest ein ferngesteuertes Auto kaufen, das ${precio}€ kostet. Wenn du bereits ${ahorros}€ in deinem Sparschwein hast und deine Großmutter dir noch ${regalo}€ schenkt, wie viel Geld brauchst du noch?`,
        explicacion: (precio, ahorros, regalo) => `Addiere, was du hast: ${ahorros} + ${regalo} = ${ahorros + regalo}€. Subtrahiere jetzt vom Preis: ${precio} - ${ahorros + regalo} = ${precio - (ahorros + regalo)}€. Du brauchst noch ${precio - (ahorros + regalo)}€.`
    },
    plantas_jardin: {
        texto: (medida_inicial, crecimiento_dia, dias) => `Jeden Tag gießt du deine Pflanze und sie wächst ${crecimiento_dia} Zentimeter. Wenn sie am Montag ${medida_inicial} Zentimeter maß, wie groß wird sie nach ${dias} Tagen, wenn sie jeden Tag gleich wächst?`,
        explicacion: (medida_inicial, crecimiento_dia, dias) => `Berechne das Gesamtwachstum: ${dias} Tage × ${crecimiento_dia} cm/Tag = ${dias * crecimiento_dia} cm Wachstum. Addiere die Anfangshöhe: ${medida_inicial} + ${dias * crecimiento_dia} = ${medida_inicial + dias * crecimiento_dia} cm.`
    }
};

export default problemsDE;
