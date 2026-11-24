import { openTurso } from './turso.mjs';
import { migrate } from './migrations.mjs';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, NETLIFY, CONTEXT } = process.env;
if (NETLIFY && CONTEXT !== 'production') {
  console.log('Migração reservada ao deploy de produção.');
} else if (TURSO_DATABASE_URL && TURSO_AUTH_TOKEN) {
  await migrate(openTurso(TURSO_DATABASE_URL, TURSO_AUTH_TOKEN));
  console.log('Banco atualizado com consumo de tinta e lançamentos de novembro.');
} else if (NETLIFY) {
  throw new Error('Configure TURSO_DATABASE_URL e TURSO_AUTH_TOKEN para o build de produção.');
} else {
  console.log('Build local. Migração online requer as variáveis do Turso.');
}
