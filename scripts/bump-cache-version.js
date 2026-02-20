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