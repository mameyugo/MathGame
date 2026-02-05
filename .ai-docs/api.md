# API Documentation - rtc.mathqix.com

Documentación completa de los endpoints disponibles en el servidor de comunicación en tiempo real para MathQix.

## Endpoints Disponibles

### 1. Registro de Usuarios

**URL:** `https://rtc.mathqix.com/api/register`  
**Método:** `POST`  
**Content-Type:** `application/json`

#### Request

```json
{
    "user": "nombre_usuario",
    "pass": "contraseña"
}
```

#### Response - Éxito (200 OK)

```json
{
    "ok": true
}
```

#### Response - Error (409 Conflict - Usuario ya existe)

```json
{
    "ok": false,
    "error": "User already exists"
}
```

#### Response - Error (400 Bad Request - Datos incompletos)

```json
{
    "ok": false,
    "error": "Missing user or pass"
}
```

#### Ejemplo con cURL

```bash
curl -X POST https://rtc.mathqix.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"user":"alice","pass":"password123"}'
```

#### Ejemplo con JavaScript

```javascript
const response = await fetch("https://rtc.mathqix.com/api/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        user: "alice",
        pass: "password123",
    }),
});

const data = await response.json();
if (data.ok) {
    console.log("Usuario registrado exitosamente");
} else {
    console.error("Error:", data.error);
}
```

---

### 2. Login de Usuarios

**URL:** `https://rtc.mathqix.com/api/login`  
**Método:** `POST`  
**Content-Type:** `application/json`

#### Request

```json
{
    "user": "nombre_usuario",
    "pass": "contraseña"
}
```

#### Response - Éxito (200 OK)

```json
{
    "ok": true
}
```

#### Response - Error (401 Unauthorized - Credenciales inválidas)

```json
{
    "ok": false,
    "error": "Invalid credentials"
}
```

#### Response - Error (400 Bad Request - Datos incompletos)

```json
{
    "ok": false,
    "error": "Missing user or pass"
}
```

#### Ejemplo con cURL

```bash
curl -X POST https://rtc.mathqix.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"user":"alice","pass":"password123"}'
```

#### Ejemplo con JavaScript

```javascript
const response = await fetch("https://rtc.mathqix.com/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        user: "alice",
        pass: "password123",
    }),
});

const data = await response.json();
if (data.ok) {
    console.log("Login exitoso");
    // Proceder a conectar al WebSocket
} else {
    console.error("Error de login:", data.error);
}
```

---

## WebSocket - Signaling

Una vez que el usuario se ha autenticado, puede conectarse al servidor WebSocket para comunicación en tiempo real.

**URL:** `ws://rtc.mathqix.com/ws`  
**Protocolo:** WebSocket (RFC 6455)

### Flujo de Autenticación

1. **Conectar al WebSocket:**

```javascript
const ws = new WebSocket("ws://rtc.mathqix.com/ws");
```

2. **Enviar credenciales después de conectar:**

```javascript
ws.onopen = () => {
    ws.send(
        JSON.stringify({
            type: "login",
            user: "alice",
            pass: "password123",
        }),
    );
};
```

3. **Recibir respuesta de login:**

```javascript
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "login_success") {
        console.log("Autenticado en WebSocket");
        console.log("Ice Servers:", data.iceServers);
        // Ahora puede usar la conexión para signaling
    } else if (data.type === "error") {
        console.error("Error de autenticación:", data.message);
    }
};
```

### Response de Login Exitoso

```json
{
    "type": "login_success",
    "iceServers": [
        {
            "urls": "stun:rtc.mathqix.com:3478"
        },
        {
            "urls": "turn:rtc.mathqix.com:3478",
            "username": "1738759634:mathqix_player",
            "credential": "base64_encoded_password"
        }
    ]
}
```

### Respuesta de Error

```json
{
    "type": "error",
    "message": "Credenciales inválidas"
}
```

---

## Servidores STUN/TURN

Los servidores STUN y TURN son necesarios para establecer conexiones P2P a través de NAT y firewalls.

### STUN (Session Traversal Utilities for NAT)

- **URL:** `stun:rtc.mathqix.com:3478`
- Ayuda a descubrir la dirección IP pública y puertos

### TURN (Traversal Using Relays around NAT)

- **URL:** `turn:rtc.mathqix.com:3478`
- **Puerto:** 3478 (UDP/TCP)
- **Credenciales:** Proporcionadas después del login en WebSocket
- **Rango de puertos dinámicos:** 49152-65535 (UDP)

---

## Configuración en el Cliente (Ejemplo Completo)

```javascript
class RTCClient {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.ws = null;
        this.peerConnection = null;
    }

    async register() {
        const response = await fetch("https://rtc.mathqix.com/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: this.username,
                pass: this.password,
            }),
        });
        return response.json();
    }

    async login() {
        const response = await fetch("https://rtc.mathqix.com/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: this.username,
                pass: this.password,
            }),
        });
        return response.json();
    }

    async connect() {
        // Verificar credenciales
        const loginResult = await this.login();
        if (!loginResult.ok) {
            throw new Error("Login failed: " + loginResult.error);
        }

        // Conectar a WebSocket
        this.ws = new WebSocket("ws://rtc.mathqix.com/ws");

        return new Promise((resolve, reject) => {
            this.ws.onopen = () => {
                this.ws.send(
                    JSON.stringify({
                        type: "login",
                        user: this.username,
                        pass: this.password,
                    }),
                );
            };

            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.type === "login_success") {
                    // Crear RTCPeerConnection con Ice Servers
                    this.peerConnection = new RTCPeerConnection({
                        iceServers: data.iceServers,
                    });
                    resolve(data.iceServers);
                } else if (data.type === "error") {
                    reject(new Error(data.message));
                } else {
                    // Procesar otros tipos de mensajes (señalización)
                    this.handleSignalingMessage(data);
                }
            };

            this.ws.onerror = reject;
        });
    }

    handleSignalingMessage(data) {
        // Implementar lógica de señalización (offer, answer, ICE candidates)
        console.log("Signaling message:", data);
    }

    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
        if (this.peerConnection) {
            this.peerConnection.close();
        }
    }
}

// Uso
const client = new RTCClient("alice", "password123");
client
    .connect()
    .then((iceServers) => {
        console.log("Conectado y listo para WebRTC");
        console.log("Ice Servers:", iceServers);
    })
    .catch((error) => {
        console.error("Error al conectar:", error);
    });
```

---

## Consideraciones de Seguridad

1. **HTTPS obligatorio:** Todos los endpoints REST deben accederse via HTTPS
2. **WSS para producción:** En producción, usar `wss://` (WebSocket Secure) en lugar de `ws://`
3. **Validación de credenciales:** Las contraseñas se hashean con `password_hash()` (PHP argon2)
4. **CORS habilitado:** Los endpoints aceptan requests desde cualquier origen
5. **Token persistente:** No se usa token JWT, la validación ocurre por sesión en WebSocket

---

## Códigos de Estado HTTP

| Código | Significado        | Notas                                           |
| ------ | ------------------ | ----------------------------------------------- |
| 200    | OK                 | Operación exitosa                               |
| 204    | No Content         | Respuesta válida sin contenido (CORS preflight) |
| 400    | Bad Request        | Datos incompletos o inválidos                   |
| 401    | Unauthorized       | Credenciales inválidas                          |
| 404    | Not Found          | Endpoint no existe                              |
| 405    | Method Not Allowed | Método HTTP no soportado                        |
| 409    | Conflict           | Usuario ya registrado                           |
| 500    | Server Error       | Error interno del servidor                      |

---

## Límites y Restricciones

- **Longitud máxima de usuario:** Sin límite específico (validación en cliente recomendada)
- **Longitud máxima de contraseña:** Sin límite específico
- **Tasa de requests:** Sin limitación implementada (implementar en cliente/middleware)
- **Usuarios simultáneos:** Ilimitados (depende de recursos del servidor)
- **Mensajes WebSocket:** Sin tamaño máximo específico

---

## Troubleshooting

### Error: "User already exists"

- El usuario ya está registrado
- Cambiar el nombre de usuario o usar login directamente

### Error: "Invalid credentials"

- Usuario o contraseña incorrectos
- Verificar que los datos se envían correctamente

### Error de conexión WebSocket

- Verificar que el servidor está ejecutándose (`systemctl status coturn`)
- Comprobar firewall: puertos 3478 (TURN), 49152-65535 (streaming)
- En desarrollo, verificar que `ws://localhost:8081/ws` es accesible

### ICE Candidates no se conectan

- Verificar que TURN server está activo
- Comprobar credenciales y realm en `/etc/turnserver.conf`
- Revisar logs: `/var/log/coturn/turnserver.log`

---

## Testing

### Verificar que la API está disponible

```bash
curl -i http://rtc.mathqix.com:8080/api/register
curl -i http://rtc.mathqix.com:8080/api/login
```

### Registrar un usuario de prueba

```bash
curl -X POST http://rtc.mathqix.com:8080/api/register \
  -H "Content-Type: application/json" \
  -d '{"user":"test","pass":"test123"}'
```

### Probar login

```bash
curl -X POST http://rtc.mathqix.com:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"user":"test","pass":"test123"}'
```

---

## Información de Contacto y Soporte

Para problemas, sugerencias o reportes de bugs:

- **Email:** dev@mathqix.com
- **GitHub:** [rtcMathQix](https://github.com/mameyugo/rtcMathQix)
- **Documentación actualizada:** Ver `README.md` en la raíz del proyecto

---

**Última actualización:** Febrero 5, 2026  
**Versión API:** 1.0
