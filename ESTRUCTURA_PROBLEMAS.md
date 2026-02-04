# Estructura Flexible de Problemas - MathQix

## Problema Actual

Los problemas actuales solo soportan respuestas numéricas en inputs de ecuaciones. Problemas como "El Nombre de los Hijos" necesitan respuestas de texto o selección múltiple.

## Solución Propuesta

### Tipos de Respuesta Soportados

#### 1. **numero** (Actual)

Respuestas numéricas en inputs matemáticos.

```javascript
{
    respuestaCorrecta: 15,
    tipoRespuesta: "numero",
    ecuacion: "5 x 3 = __",
    ecuacionValores: [15]
}
```

#### 2. **opcion_multiple**

El usuario debe seleccionar entre opciones (botones).

```javascript
{
    respuestaCorrecta: "Juan",
    tipoRespuesta: "opcion_multiple",
    opciones: [
        { id: "juan", texto: "Juan", icon: "👦" },
        { id: "primero", texto: "Primero", icon: "1️⃣" },
        { id: "segundo", texto: "Segundo", icon: "2️⃣" },
        { id: "tercero", texto: "Tercero", icon: "3️⃣" }
    ],
    renderUI: (problema) => { ... }
}
```

#### 3. **texto**

El usuario escribe una respuesta de texto.

```javascript
{
    respuestaCorrecta: "Juan",
    tipoRespuesta: "texto",
    placeholder: "¿Cómo se llama el tercer hijo?",
    caseSensitive: false,
    trim: true
}
```

#### 4. **drag_drop** (Futuro)

El usuario arrastra elementos para ordenar o clasificar.

```javascript
{
    respuestaCorrecta: ["lobo", "col", "oveja"],
    tipoRespuesta: "drag_drop",
    elementos: ["lobo", "col", "oveja"],
    zonas: ["primero", "segundo", "tercero"]
}
```

### Estructura Base del Problema

```javascript
{
    id: "nombre_unico",
    tipo: "logica|matematico|lateral",
    nivelMin: 1,
    categorias: ["explorador", "arquitecto", "cientifico"],
    generar: () => ({
        texto: "Enunciado del problema",
        respuestaCorrecta: valor_o_texto,
        tipoRespuesta: "numero|opcion_multiple|texto|drag_drop",
        explicacion: "Explicación de la solución",

        // Para respuestas numéricas
        ecuacion: "5 x 3 = __",
        ecuacionValores: [15],

        // Para opciones múltiples
        opciones: [ /* array de opciones */ ],

        // Para texto
        caseSensitive: false,
        trim: true,

        // Para drag & drop
        elementos: [],
        zonas: []
    })
}
```

## Cambios en el UI

### 1. **QuestionGenerator.js**

- Detectar `tipoRespuesta` en el problema
- Renderizar UI diferente según el tipo
- Mantener compatibilidad con `generateQuestion()` y `generateProblem()`

### 2. **app.js - submitProblem()**

- Detectar tipo de respuesta
- Validar según el tipo
- Llamar validador específico

### 3. **styles.css**

- Nuevos estilos para botones de opciones
- Animaciones para drag & drop
- Estados de selección

## Implementación Fase 1 (Inmediata)

✅ Soporte para `opcion_multiple` (Problema: "El Nombre de los Hijos")
✅ Mantener compatibilidad con `numero` actual
✅ Validación flexible

## Implementación Fase 2 (Futura)

⏳ Soporte para `texto`
⏳ Soporte para `drag_drop`
⏳ Persistencia de selecciones

## Beneficios

1. **Flexibilidad**: Cada problema define su tipo de respuesta
2. **Escalabilidad**: Fácil agregar nuevos tipos
3. **UX Mejorado**: Cada tipo tiene su propia interfaz óptima
4. **Compatibilidad**: Código actual sigue funcionando
5. **Reutilizable**: Validadores genéricos por tipo

## Ejemplo: Migración del Problema "Nombre del Tercer Hijo"

**Antes (Solución Forzada):**

```javascript
ecuacion: `El tercer hijo = __ (0=Juan, 1=Primero, 2=Segundo, 3=Tercero)`,
ecuacionValores: [0]
```

**Después (Solución Natural):**

```javascript
tipoRespuesta: "opcion_multiple",
respuestaCorrecta: "Juan",
opciones: [
    { id: "juan", texto: "Juan", icon: "👦" },
    { id: "primero", texto: "Primero", icon: "1️⃣" },
    { id: "segundo", texto: "Segundo", icon: "2️⃣" },
    { id: "tercero", texto: "Tercero", icon: "3️⃣" }
]
```
