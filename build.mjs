import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const write = (path, value) => writeFileSync(new URL(path, import.meta.url), value);
mkdirSync(new URL('./dist/server/', import.meta.url), { recursive: true });
const seed = read('./schema.sql').split(/;\s*/).filter(sql => sql.startsWith('INSERT '));
const source = read('./server.mjs')
  .replace("import { html } from './page.mjs';", read('./page.mjs').replace('export const html', 'const html'))
  .replace('(env.SEED||[])', JSON.stringify(seed));
write('./dist/server/index.js', source);
