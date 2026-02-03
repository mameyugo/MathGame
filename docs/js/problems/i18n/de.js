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

    // LEVEL 2
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

    // LEVEL 4
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
    }
};

export default problemsDE;
