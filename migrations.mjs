export const updates = [{
  id: '20261124_ink_and_prints',
  statements: [
    "CREATE TABLE IF NOT EXISTS ink_items(name TEXT PRIMARY KEY, microliters INTEGER NOT NULL CHECK(microliters>=0))",
    "INSERT INTO ink_items VALUES ('JESUS OVELHAS',33326),('SANTA CEIA AMARELA',9986),('SANTA CEIA COLORIDA',34562),('MÃO DE JESUS',14154) ON CONFLICT(name) DO UPDATE SET microliters=excluded.microliters",
    "INSERT OR IGNORE INTO materials(name) VALUES ('Rolo Inteiro'),('Rolo Inteiro GV')",
    ...[
      ['nov24-01','2026-11-16',4,70,130,'Rolo 90'],
      ['nov24-02','2026-11-16',16,70,130,'Rolo Inteiro'],
      ['nov24-03','2026-11-16',8,70,120,'Rolo Inteiro'],
      ['nov24-04','2026-11-17',24,70,130,'Rolo Inteiro'],
      ['nov24-05','2026-11-17',11,70,120,'Rolo Inteiro'],
      ['nov24-06','2026-11-17',6,70,95,'Rolo Inteiro'],
      ['nov24-07','2026-11-24',12,70,130,'Rolo Inteiro GV'],
      ['nov24-08','2026-11-24',10,60,90,'Rolo Inteiro GV']
    ].map(([id, day, qty, width, height, material]) =>
      "INSERT OR IGNORE INTO entries SELECT '"+id+"','"+day+"',"+qty+","+width+","+height+",name,price,'' FROM materials WHERE name='"+material+"' AND NOT EXISTS (SELECT 1 FROM entries WHERE day='"+day+"' AND qty="+qty+" AND width="+width+" AND height="+height+" AND material='"+material+"' AND image='')"
    )
  ]
}];

updates.push({
  id: '20261127_ink_sizes',
  statements: [
    'CREATE TABLE IF NOT EXISTS ink_sizes (name TEXT NOT NULL, size TEXT NOT NULL, microliters INTEGER CHECK(microliters >= 0), PRIMARY KEY(name,size))',
    `WITH artworks(name) AS (VALUES
      ('ARVORE DOURADA'),
      ('ARVORE FLORES'),
      ('ARVORE OURO'),
      ('ARVORE PRETA'),
      ('FAMILIA DE LEOES (vertical)'),
      ('JESUS PRAIA'),
      ('JESUS AGUAS'),
      ('JESUS CORDEIRO'),
      ('JESUS E MARIA'),
      ('JESUS OLHANDO PRA CIMA'),
      ('JESUS ONDAS'),
      ('JESUS OVELHAS'),
      ('LEAO 1 FILHOTE'),
      ('LEAO 2 FILHOTES (arvore)'),
      ('LEAO 2 FILHOTES'),
      ('MÃO COM PÃO'),
      ('MÃO DE JESUS'),
      ('PATO'),
      ('SAGRADA FAMILIA MARROM'),
      ('SAGRADA FAMILIA VERDE'),
      ('SAGRADA FAMILIA VERMELHA'),
      ('SALMO 91'),
      ('SANTA CEIA AMARELA'),
      ('SANTA CEIA BRANCA'),
      ('SANTA CEIA COLORIDA'),
      ('SANTA CEIA CLASSICA'),
      ('SANTA CEIA DOURADA MOLDURA')
    ), sizes(size) AS (VALUES ('60x90'), ('75x95'), ('70x120'), ('70x130'))
    INSERT OR IGNORE INTO ink_sizes(name,size) SELECT name,size FROM artworks CROSS JOIN sizes`
  ]
});

export async function migrate(db) {
  const query = (sql, ...args) => db.prepare(sql).bind(...args);
  await query('CREATE TABLE IF NOT EXISTS app_migrations(id TEXT PRIMARY KEY)').run();
  for (const update of updates) {
    if (await query('SELECT id FROM app_migrations WHERE id=?', update.id).first()) continue;
    await query(update.statements[0]).run();
    // The migration runner runs once per build or local startup.
    await db.batch([
      ...update.statements.slice(1).map(sql => query(sql)),
      query('INSERT INTO app_migrations VALUES (?)', update.id)
    ]);
  }
}
