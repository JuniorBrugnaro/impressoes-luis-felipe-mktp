CREATE TABLE IF NOT EXISTS accounts(email TEXT PRIMARY KEY, role TEXT NOT NULL CHECK(role IN ('ADM','USER')), salt TEXT NOT NULL, hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, email TEXT NOT NULL REFERENCES accounts(email), expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS materials(name TEXT PRIMARY KEY, price INTEGER CHECK(price>=0));
CREATE TABLE IF NOT EXISTS entries(id TEXT PRIMARY KEY, day TEXT NOT NULL, qty INTEGER NOT NULL CHECK(qty>0), width REAL NOT NULL CHECK(width>0), height REAL NOT NULL CHECK(height>0), material TEXT NOT NULL REFERENCES materials(name), price INTEGER CHECK(price>=0), image TEXT NOT NULL DEFAULT '');
CREATE INDEX IF NOT EXISTS entries_day ON entries(day);
CREATE TABLE IF NOT EXISTS auth_limits(client TEXT PRIMARY KEY, window INTEGER NOT NULL, hits INTEGER NOT NULL);
INSERT OR IGNORE INTO materials(name) VALUES ('Rolo 70'),('Rolo 90'),('Rolo INF'),('Rolo INF GV');
INSERT OR IGNORE INTO entries VALUES
('nov01','2026-11-06',5,70,130,'Rolo INF',NULL,''),('nov02','2026-11-06',1,60,90,'Rolo INF',NULL,''),('nov03','2026-11-06',17,60,90,'Rolo 70',NULL,''),
('nov04','2026-11-07',36,70,130,'Rolo 90',NULL,''),('nov05','2026-11-07',14,60,90,'Rolo 90',NULL,''),
('nov06','2026-11-09',10,70,130,'Rolo 90',NULL,''),('nov07','2026-11-09',10,60,90,'Rolo 90',NULL,''),
('nov08','2026-11-10',6,60,90,'Rolo INF',NULL,''),('nov09','2026-11-10',10,60,90,'Rolo 90',NULL,''),('nov10','2026-11-10',10,70,130,'Rolo 90',NULL,''),
('nov11','2026-11-11',2,100,150,'Rolo INF GV',NULL,''),('nov12','2026-11-16',10,70,130,'Rolo INF GV',NULL,''),('nov13','2026-11-16',3,60,90,'Rolo INF GV',NULL,'');
