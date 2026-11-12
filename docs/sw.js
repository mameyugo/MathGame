/**
 * Service worker de MathQix: deja jugar sin conexión y permite instalar la app.
 *
 * - Páginas, plantillas, traducciones e imports sin versión: primero la red y,
 *   si no hay conexión, la copia guardada.
 * - JS y CSS con ?v=AAAAMMDDHHMM (lo pone scripts/bump-cache-version.js): esa URL
 *   no cambia nunca de contenido, así que se sirven de la caché.
 * - El servidor online (rtc.mathqix.com) no se toca: solo mismo origen.
 */
const VERSION = '202611121852';
const CACHE = 'mathqix-' + VERSION;
const BASICOS = ['./', './index.html', './help.html', './manifest.webmanifest', './favicon.png',
    './app-icons/icon-192.png', './app-icons/icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        await cache.addAll(BASICOS);
        // Además, todo lo que enlaza la portada (scripts y hojas de estilo versionados)
        try {
            const html = await (await fetch('./index.html', { cache: 'no-store' })).text();
            const urls = [...html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)].map(m => m[1]);
            await cache.addAll([...new Set(urls)]);
        } catch (e) {
            // Se completará al navegar
        }
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const nombres = await caches.keys();
        await Promise.all(nombres.filter(n => n.startsWith('mathqix-') && n !== CACHE).map(n => caches.delete(n)));
        await self.clients.claim();
    })());
});

function esInmutable(url) {
    return /\.(js|css)$/.test(url.pathname) && /[?&]v=\d{12}\b/.test(url.search);
}

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    if (esInmutable(url)) {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE);
            const guardada = await cache.match(req);
            if (guardada) return guardada;
            const resp = await fetch(req);
            if (resp.ok) cache.put(req, resp.clone());
            return resp;
        })());
        return;
    }

    event.respondWith((async () => {
        const cache = await caches.open(CACHE);
        try {
            const resp = await fetch(req);
            if (resp.ok) cache.put(req, resp.clone());
            return resp;
        } catch (e) {
            const guardada = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
            if (guardada) return guardada;
            if (req.mode === 'navigate') {
                const portada = await cache.match('./index.html');
                if (portada) return portada;
            }
            throw e;
        }
    })());
});
