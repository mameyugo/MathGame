const { RTCPeerConnection } = require('wrtc'); // Eliminar esta línea si se usa en navegador

// CONFIGURACIÓN: Reemplaza con tus datos reales
const iceServers = [
    { urls: 'stun:rtc.mathqix.com:3478' },
    {
        urls: 'turn:rtc.mathqix.com:3478',
        username: 'tu_usuario', // Configurado en turnserver.conf
        credential: 'tu_password'
    }
];

const pc = new RTCPeerConnection({ iceServers });

console.log("--- Iniciando prueba de conexión ---");

pc.onicecandidate = (event) => {
    if (event.candidate) {
        const c = event.candidate;
        console.log(`[Candidato encontrado] Tipo: ${c.type} | Protocolo: ${c.protocol} | Dirección: ${c.address}`);

        if (c.type === 'srflx') {
            console.log("✅ STUN funcionando: Se detectó IP pública.");
        }
        if (c.type === 'relay') {
            console.log("✅ TURN funcionando: El tráfico puede ser retransmitido.");
        }
    } else {
        console.log("--- Recolección de candidatos finalizada ---");
    }
};

// Forzar la generación de candidatos creando una oferta
pc.createDataChannel("test");
pc.createOffer()
    .then(offer => pc.setLocalDescription(offer))
    .catch(err => console.error("❌ Error:", err));

// Timeout de seguridad
setTimeout(() => {
    if (pc.iceGatheringState !== 'complete') {
        console.log("⚠️ La recolección tardó demasiado. Revisa el Firewall (Puerto 3478 UDP).");
    }
}, 5000);