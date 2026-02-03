const fs = require('fs');
const path = require('path');

describe('Translations coverage', () => {
    const langDir = path.join(__dirname, '../../docs/lang');
    const baseLang = 'es';
    const languages = ['es', 'gl', 'en', 'fr', 'ca', 'pt', 'de'];

    const collectKeys = (obj, prefix = '') => {
        if (!obj || typeof obj !== 'object') return [];
        return Object.keys(obj).flatMap((key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                return collectKeys(value, fullKey);
            }
            return [fullKey];
        });
    };

    const loadLang = (lang) => {
        const filePath = path.join(langDir, `${lang}.json`);
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    };

    test('all languages have same translation keys', () => {
        const baseKeys = new Set(collectKeys(loadLang(baseLang)).sort());

        languages.forEach((lang) => {
            const langKeys = new Set(collectKeys(loadLang(lang)).sort());

            const missing = [...baseKeys].filter((k) => !langKeys.has(k));
            const extra = [...langKeys].filter((k) => !baseKeys.has(k));

            expect({ lang, missing, extra }).toEqual({ lang, missing: [], extra: [] });
        });
    });

    test('all translations are non-empty strings', () => {
        const baseData = loadLang(baseLang);
        const baseKeys = collectKeys(baseData);

        const getValue = (obj, dottedKey) => {
            return dottedKey.split('.').reduce((acc, part) => acc && acc[part], obj);
        };

        languages.forEach((lang) => {
            const data = loadLang(lang);

            const empty = baseKeys.filter((k) => {
                const val = getValue(data, k);
                return typeof val !== 'string' || val.trim().length === 0;
            });

            expect({ lang, empty }).toEqual({ lang, empty: [] });
        });
    });
});
