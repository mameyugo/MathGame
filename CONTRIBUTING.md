# 🤝 Guía de Contribución - MateAventura

¡Gracias por tu interés en contribuir a MateAventura! Este documento explica cómo puedes ayudar a mejorar el proyecto.

## Cómo Contribuir

### 1. Reportar Problemas (Issues)

Si encuentras un bug o tienes una idea de mejora:

1. Ve a la sección [Issues](https://github.com/mameyugo/MathGame/issues)
2. Verifica que el problema no haya sido reportado antes
3. Haz clic en "New Issue"
4. Describe el problema claramente:
    - **Título:** Breve y descriptivo
    - **Descripción:** Qué esperas que suceda vs. qué sucede
    - **Pasos para reproducir:** Si es un bug
    - **Capturas de pantalla:** Si es relevante
    - **Navegador/dispositivo:** En el que ocurre

### 2. Proponer Mejoras

Para nuevas características:

1. Abre un Issue con la etiqueta `enhancement`
2. Describe la idea y por qué sería útil
3. Espera a que los mantenedores respondan antes de empezar a trabajar

### 3. Enviar Pull Requests

Si quieres contribuir con código:

#### Pasos Iniciales

```bash
# 1. Haz un Fork del repositorio
# (Botón "Fork" en GitHub)

# 2. Clona tu fork
git clone https://github.com/TuUsuario/MathGame.git
cd MathGame

# 3. Crea una rama para tu feature
git checkout -b feature/descripcion-breve
# o para un bug fix:
git checkout -b fix/descripcion-breve
```

#### Desarrollo

- **Código limpio:** Sigue el estilo existente del proyecto
- **Comentarios:** Agrega comentarios en código complejo
- **Testing:** Prueba tu código en diferentes navegadores (Chrome, Firefox, Safari, Edge)
- **Sin dependencias externas:** Mantén JavaScript vanilla cuando sea posible

#### Enviar el PR

```bash
# 1. Haz commit de tus cambios
git commit -m "Descripción clara del cambio"

# 2. Sube a tu fork
git push origin feature/descripcion-breve

# 3. Abre un Pull Request en GitHub
# (verás un botón "Compare & pull request")
```

#### Template para Pull Request

```markdown
## Descripción

Breve explicación de qué cambia

## Tipo de cambio

- [ ] Bug fix (cambio no breaking que soluciona un issue)
- [ ] Nueva feature (cambio no breaking que añade funcionalidad)
- [ ] Breaking change (cambio que altera funcionalidad existente)

## Cómo ha sido probado

Describe los pasos para probar

## Checklist

- [ ] Mi código sigue el estilo del proyecto
- [ ] He probado en navegadores modernos
- [ ] He actualizado la documentación si es necesario
```

## Estándares de Código

### JavaScript

- Usa nombres descriptivos para variables y funciones
- Comenta código no evidente
- Mantén funciones pequeñas y enfocadas
- Evita variables globales

### HTML/CSS

- HTML semántico
- CSS organizado y comentado
- Mobile-first en responsive design
- Accesibilidad: atributos `aria-label`, `alt` en imágenes, etc.

### Convención de Nombres

- Variables: `camelCase` (ej: `playerName`)
- Clases CSS: `kebab-case` (ej: `.game-stats`)
- Funciones: `camelCase` (ej: `startGame()`)

## Áreas Donde Puedes Contribuir

### 🐛 Bugs

- Errores en la lógica del juego
- Problemas visuales en dispositivos
- Inconsistencias en idiomas

### ✨ Features

- Nuevos modos de juego
- Más operaciones matemáticas
- Temas visuales adicionales
- Mejoras en accesibilidad

### 📝 Documentación

- Mejoras al README
- Traducción a otros idiomas
- Ejemplos de uso

### 🌐 Traducción

- Agregar nuevos idiomas en `docs/lang/`
- Mejorar traducciones existentes

## Proceso de Revisión

1. Tu PR será revisado por los mantenedores
2. Podría haber solicitud de cambios
3. Una vez aprobado, será fusionado a `master`
4. ¡Serás mencionado como contribuidor!

## Preguntas

Si tienes dudas:

- Abre un Issue con la etiqueta `question`
- Consulta la sección [Ayuda](https://github.com/mameyugo/MathGame/wiki)

## Código de Conducta

Este proyecto adhiere a un [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, esperas mantener este código.

---

¡Gracias por ayudar a que MateAventura sea mejor! 🎮✨
