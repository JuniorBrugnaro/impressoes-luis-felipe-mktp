import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export function openDatabase(path) {
  const db = new DatabaseSync(path);
  db.exec('PRAGMA foreign_keys=ON');
  db.exec(readFileSync(new URL('./schema.sql',import.meta.url),'utf8'));
  const adapt = (statement,args) => {
    const run = () => ({meta:{changes:statement.run(...args).changes}});
    return {
      first: async () => statement.get(...args),
      all: async () => ({results:statement.all(...args)}),
      run: async () => run(),
      execute: run
    };
  };
  return {
    prepare: sql => ({bind: (...args) => adapt(db.prepare(sql),args)}),
    batch(statements) {
      db.exec('BEGIN IMMEDIATE');
      try {
        const result = statements.map(statement => statement.execute());
        db.exec('COMMIT');
        return result;
      } catch (error) {
        db.exec('ROLLBACK');
        throw error;
      }
    }
  };
}
