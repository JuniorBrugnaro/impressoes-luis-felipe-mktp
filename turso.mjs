function encode(value) {
  if (value === null) return { type: 'null' };
  if (typeof value === 'string') return { type: 'text', value };
  if (Number.isSafeInteger(value)) return { type: 'integer', value: String(value) };
  if (Number.isFinite(value)) return { type: 'float', value };
  throw new TypeError('Valor SQL inválido.');
}

function decode(value) {
  if (value.type === 'null') return null;
  if (value.type === 'integer' || value.type === 'float') return Number(value.value);
  if (value.type === 'text') return value.value;
  throw new TypeError('Tipo SQL inesperado.');
}

const statement = (sql, args = []) => ({ sql, args: args.map(encode), want_rows: true });
const rows = ({ cols, rows }) => rows.map(row =>
  Object.fromEntries(cols.map((col, index) => [col.name, decode(row[index])]))
);
const changes = result => ({ meta: { changes: result.affected_row_count } });

export function openTurso(databaseUrl, token, fetcher = fetch) {
  const url = new URL(databaseUrl.replace(/^libsql:/, 'https:'));
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash)
    throw new Error('Configure uma URL HTTPS ou libsql válida.');
  const endpoint = new URL('/v2/pipeline', url);

  async function send(request) {
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: [request, { type: 'close' }] }),
      signal: AbortSignal.timeout(12000)
    });
    if (!response.ok) throw new Error('Falha na conexão com o banco: HTTP ' + response.status);
    const { results } = await response.json();
    const result = results?.[0];
    if (result?.type !== 'ok') throw new Error('Banco recusou a operação: ' + (result?.error?.code || 'erro desconhecido'));
    return result.response.result;
  }

  return {
    prepare(sql) {
      return {
        bind(...args) {
          const stmt = statement(sql, args);
          const execute = () => send({ type: 'execute', stmt });
          return {
            stmt,
            first: async () => rows(await execute())[0],
            all: async () => ({ results: rows(await execute()) }),
            run: async () => changes(await execute())
          };
        }
      };
    },
    async batch(commands) {
      const ok = step => ({ type: 'ok', step });
      const statements = [statement('BEGIN IMMEDIATE'), ...commands.map(command => command.stmt), statement('COMMIT')];
      const steps = statements.map((stmt, index) => index
        ? { stmt, condition: ok(index - 1) }
        : { stmt });
      steps.push({
        stmt: statement('ROLLBACK'),
        condition: { type: 'and', conds: [ok(0), { type: 'not', cond: ok(statements.length - 1) }] }
      });
      const result = await send({ type: 'batch', batch: { steps } });
      if (!result.step_results[statements.length - 1]) {
        const error = result.step_errors.find(Boolean);
        throw new Error('Transação cancelada: ' + (error?.code || 'erro desconhecido'));
      }
      return result.step_results.slice(1, statements.length - 1).map(changes);
    }
  };
}
