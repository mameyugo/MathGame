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

    test('no duplicate keys in translation files', () => {
        const keyRegex = /"([^"\\]+)"\s*:/g;

        languages.forEach((lang) => {
            const filePath = path.join(langDir, `${lang}.json`);
            const raw = fs.readFileSync(filePath, 'utf8');
            const keys = [];
            let match;

            while ((match = keyRegex.exec(raw)) !== null) {
                keys.push(match[1]);
            }

            const duplicates = keys.filter((k, idx) => keys.indexOf(k) !== idx);
            expect({ lang, duplicates }).toEqual({ lang, duplicates: [] });
        });
    });

    test('placeholders are consistent across languages', () => {
        const placeholderRegex = /(\{[^}]+\}|%[a-zA-Z])/g;
        const baseData = loadLang(baseLang);
        const baseKeys = collectKeys(baseData);

        const getValue = (obj, dottedKey) => {
            return dottedKey.split('.').reduce((acc, part) => acc && acc[part], obj);
        };

        const extractPlaceholders = (value) => {
            if (typeof value !== 'string') return [];
            const matches = value.match(placeholderRegex) || [];
            return matches.sort();
        };

        languages.forEach((lang) => {
            const data = loadLang(lang);

            const mismatches = baseKeys.reduce((acc, key) => {
                const baseVal = getValue(baseData, key);
                const langVal = getValue(data, key);
                const basePh = extractPlaceholders(baseVal);
                const langPh = extractPlaceholders(langVal);

                if (basePh.join('|') !== langPh.join('|')) {
                    acc.push({ key, base: basePh, lang: langPh });
                }
                return acc;
            }, []);

            expect({ lang, mismatches }).toEqual({ lang, mismatches: [] });
        });
    });
});
