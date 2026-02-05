const io = require('socket.io-client'); // npm install socket.io-client
const socket = io('https://rtc.mathqix.com');

socket.on('connect', () => {
    console.log('✅ Conectado exitosamente al servidor de Signaling');
    socket.emit('message', { type: 'test', content: 'hola mathqix' });
});

socket.on('connect_error', (error) => {
    console.error('❌ Error de conexión al Signaling:', error.message);
});