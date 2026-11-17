import { readFileSync } from 'node:fs';
import { openTurso } from './turso.mjs';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;
if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.error('Configure TURSO_DATABASE_URL e TURSO_AUTH_TOKEN antes de executar.');
  process.exitCode = 1;
} else {
  try {
    const db = openTurso(TURSO_DATABASE_URL, TURSO_AUTH_TOKEN);
    const statements = readFileSync(new URL('schema.sql', import.meta.url), 'utf8')
      .split(';').map(sql => sql.trim()).filter(Boolean);
    await db.batch(statements.map(sql => db.prepare(sql).bind()));
    console.log('Banco online inicializado com os lançamentos de novembro.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
