/**
 * MateAventura - Página de Ayuda
 * Sistema de traducciones para la página de ayuda
 */

// Sistema de traducciones para ayuda
const helpTranslations = {
    es: {
        help_title: '📚 Ayuda - MateAventura',
        help_how_to_play_title: '🎮 ¿Cómo se juega?',
        help_how_to_play_desc: 'MateAventura es un juego educativo de matemáticas donde debes resolver operaciones matemáticas contra el tiempo. ¡Gana monedas y sube de nivel mientras aprendes!',
        help_game_types_title: '🎲 Tipos de Juego',
        help_visual_mode: '📦 Modo Visual',
        help_visual_mode_desc: 'En este modo verás representaciones visuales con bloques de decenas (📦x10) y unidades (🍎) para facilitar el conteo. Ideal para niveles iniciales.',
        help_unknown_mode: '❓ Modo Incógnita',
        help_unknown_mode_desc: 'Debes encontrar el número que falta en la operación. Por ejemplo: "? × 5 = 20". Este modo desarrolla el pensamiento inverso.',
        help_standard_mode: '➕ Modo Estándar',
        help_standard_mode_desc: 'Operaciones matemáticas clásicas donde calculas el resultado. Por ejemplo: "7 + 3 = ?"',
        help_operations_title: '🔢 Operaciones Disponibles',
        help_op_addition: '➕ <strong>Sumas:</strong> Operaciones de adición para todos los niveles',
        help_op_subtraction: '➖ <strong>Restas:</strong> Operaciones de sustracción (siempre con resultado positivo)',
        help_op_multiplication: '✖️ <strong>Multiplicaciones:</strong> Tablas de multiplicar progresivas',
        help_levels_title: '📈 Sistema de Niveles',
        help_levels_desc: 'Empiezas en el <strong>Nivel 1</strong> y subes automáticamente cada vez que consigues <strong>50 monedas</strong>. A medida que subes de nivel:',
        help_levels_item1: 'Los números en las operaciones son más grandes',
        help_levels_item2: 'El modo visual aparece menos frecuentemente',
        help_levels_item3: 'Las operaciones se vuelven más desafiantes',
        help_coins_desc: '<strong>💰 Monedas:</strong> Ganas 10 monedas por cada respuesta correcta. Las monedas se acumulan en tu perfil y te ayudan a aparecer en el Salón de la Fama.',
        help_players_title: '👤 Crear Jugadores',
        help_players_desc: 'Para crear un nuevo jugador:',
        help_players_step1: 'Escribe el nombre del jugador en el campo de texto',
        help_players_step2: 'Haz clic en el botón "+ Añadir"',
        help_players_step3: 'El nuevo jugador aparecerá en la lista con Nivel 1 y 0 monedas',
        help_players_step4: 'Haz clic en un jugador para configurar sus operaciones y jugar',
        help_duel_title: '🏆 Modo Duelo',
        help_duel_desc: 'El <strong>Modo Duelo</strong> permite que varios jugadores compitan entre sí:',
        help_duel_req: 'Se necesitan al menos <strong>2 jugadores</strong> creados',
        help_duel_turns: 'Cada jugador juega un turno de 30 segundos con su nivel actual',
        help_duel_score: 'Las monedas ganadas en el duelo NO se acumulan al perfil',
        help_duel_winner: 'Al final se muestra quién ganó más monedas durante el duelo',
        help_duel_start: 'Para iniciar un duelo, simplemente haz clic en el botón <strong>"🏆 MODO DUELO"</strong> desde la pantalla principal.',
        help_tips_title: '💡 Consejos',
        help_tip1: '⏱️ Cada respuesta correcta suma 2 segundos al cronómetro',
        help_tip2: '❌ Una respuesta incorrecta resta 4 segundos',
        help_tip3: '🎯 Practica con una operación a la vez si recién comienzas',
        help_tip4: '🏅 Aparece en el Salón de la Fama siendo uno de los 3 mejores jugadores',
        btn_back_home: '⬅ Volver al Inicio'
    },
    gl: {
        help_title: '📚 Axuda - MateAventura',
        help_how_to_play_title: '🎮 Como se xoga?',
        help_how_to_play_desc: 'MateAventura é un xogo educativo de matemáticas onde debes resolver operacións matemáticas contra o tempo. Gaña moedas e sube de nivel mentres aprendes!',
        help_game_types_title: '🎲 Tipos de Xogo',
        help_visual_mode: '📦 Modo Visual',
        help_visual_mode_desc: 'Neste modo verás representacións visuais con bloques de decenas (📦x10) e unidades (🍎) para facilitar a conta. Ideal para niveis iniciais.',
        help_unknown_mode: '❓ Modo Incógnita',
        help_unknown_mode_desc: 'Debes atopar o número que falta na operación. Por exemplo: "? × 5 = 20". Este modo desenvolve o pensamento inverso.',
        help_standard_mode: '➕ Modo Estándar',
        help_standard_mode_desc: 'Operacións matemáticas clásicas onde calculas o resultado. Por exemplo: "7 + 3 = ?"',
        help_operations_title: '🔢 Operacións Dispoñibles',
        help_op_addition: '➕ <strong>Sumas:</strong> Operacións de adición para todos os niveis',
        help_op_subtraction: '➖ <strong>Restas:</strong> Operacións de sustracción (sempre con resultado positivo)',
        help_op_multiplication: '✖️ <strong>Multiplicacións:</strong> Táboas de multiplicar progresivas',
        help_levels_title: '📈 Sistema de Niveis',
        help_levels_desc: 'Comezas no <strong>Nivel 1</strong> e sobes automaticamente cada vez que consegues <strong>50 moedas</strong>. A medida que sobes de nivel:',
        help_levels_item1: 'Os números nas operacións son máis grandes',
        help_levels_item2: 'O modo visual aparece menos frecuentemente',
        help_levels_item3: 'As operacións volven máis desafiantes',
        help_coins_desc: '<strong>💰 Moedas:</strong> Gañas 10 moedas por cada resposta correcta. As moedas acumúlanse no teu perfil e axúdanche a aparecer no Salón da Fama.',
        help_players_title: '👤 Crear Xogadores',
        help_players_desc: 'Para crear un novo xogador:',
        help_players_step1: 'Escribe o nome do xogador no campo de texto',
        help_players_step2: 'Fai clic no botón "+ Engadir"',
        help_players_step3: 'O novo xogador aparecerá na lista con Nivel 1 e 0 moedas',
        help_players_step4: 'Fai clic nun xogador para configurar as súas operacións e xogar',
        help_duel_title: '🏆 Modo Duelo',
        help_duel_desc: 'O <strong>Modo Duelo</strong> permite que varios xogadores compitan entre si:',
        help_duel_req: 'Necesítanse polo menos <strong>2 xogadores</strong> creados',
        help_duel_turns: 'Cada xogador xoga unha quenda de 30 segundos co seu nivel actual',
        help_duel_score: 'As moedas gañadas no duelo NON se acumulan ao perfil',
        help_duel_winner: 'Ao final móstrase quen gañou máis moedas durante o duelo',
        help_duel_start: 'Para iniciar un duelo, simplemente fai clic no botón <strong>"🏆 MODO DUELO"</strong> desde a pantalla principal.',
        help_tips_title: '💡 Consellos',
        help_tip1: '⏱️ Cada resposta correcta suma 2 segundos ao cronómetro',
        help_tip2: '❌ Unha resposta incorrecta resta 4 segundos',
        help_tip3: '🎯 Practica cunha operación á vez se acabas de comezar',
        help_tip4: '🏅 Aparece no Salón da Fama sendo un dos 3 mellores xogadores',
        btn_back_home: '⬅ Volver ao Inicio'
    }
};

// Obtener idioma desde localStorage
let currentLanguage = localStorage.getItem('math_lang') || 'es';

/**
 * Obtiene el texto traducido según el idioma actual
 * @param {string} key - Clave de traducción
 * @returns {string} Texto traducido
 */
function t(key) {
    return helpTranslations[currentLanguage][key] || helpTranslations['es'][key] || key;
}

/**
 * Cambia el idioma de la página de ayuda
 * @param {string} lang - Código de idioma (es/gl)
 */
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('math_lang', lang);
    document.getElementById('html-root').setAttribute('lang', lang);

    // Actualizar estilos de botones de idioma
    document.getElementById('btn-lang-es').style.borderColor = lang === 'es' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-es').style.background = lang === 'es' ? '#f0f7ff' : 'white';
    document.getElementById('btn-lang-gl').style.borderColor = lang === 'gl' ? 'var(--primary)' : '#ddd';
    document.getElementById('btn-lang-gl').style.background = lang === 'gl' ? '#f0f7ff' : 'white';

    // Actualizar todos los textos
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = t(key);
    });
}

/**
 * Vuelve a la página principal
 */
function goBack() {
    window.location.href = 'index.html';
}

// Inicializar idioma al cargar
changeLanguage(currentLanguage);
