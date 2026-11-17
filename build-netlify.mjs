import { mkdirSync, writeFileSync } from 'node:fs';
import { html } from './page.mjs';

const target = new URL('./dist-netlify/', import.meta.url);
mkdirSync(target, { recursive: true });
writeFileSync(new URL('index.html', target), html);
