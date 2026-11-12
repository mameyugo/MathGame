const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'docs', 'index.html'),
  path.join(__dirname, '..', 'docs', 'help.html')
];

const now = new Date();
const version = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, '0'),
  String(now.getDate()).padStart(2, '0'),
  String(now.getHours()).padStart(2, '0'),
  String(now.getMinutes()).padStart(2, '0'),
].join('');

files.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');

    // Actualiza ?v=xxxx en links y scripts locales
    html = html.replace(/(\.css|\.js)\?v=\d+/g, `$1?v=${version}`);

    // Si no existe ?v=, lo añade a archivos locales (no CDN)
    html = html.replace(/(href|src)="(\.\/[^"]+\.(?:css|js))"(?!\?v=)/g, `$1="$2?v=${version}"`);

    fs.writeFileSync(file, html, 'utf8');
    console.log(`Cache version updated for ${path.basename(file)}: ${version}`);
  }
});

// El service worker cambia de versión a la vez: así borra la caché vieja
const sw = path.join(__dirname, '..', 'docs', 'sw.js');
if (fs.existsSync(sw)) {
  const js = fs.readFileSync(sw, 'utf8').replace(/const VERSION = '\d+';/, `const VERSION = '${version}';`);
  fs.writeFileSync(sw, js, 'utf8');
  console.log(`Cache version updated for sw.js: ${version}`);
}

// Los @import de main.css también llevan versión, para que nadie se quede con un CSS viejo
const mainCss = path.join(__dirname, '..', 'docs', 'css', 'main.css');
if (fs.existsSync(mainCss)) {
  const css = fs.readFileSync(mainCss, 'utf8')
    .replace(/@import url\('([^'?]+\.css)(?:\?v=\d+)?'\);/g, `@import url('$1?v=${version}');`);
  fs.writeFileSync(mainCss, css, 'utf8');
  console.log(`Cache version updated for main.css imports: ${version}`);
}
