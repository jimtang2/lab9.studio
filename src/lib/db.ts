import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT as string),
});

// const db = await initDb();
// await db.exec(`
//   CREATE TABLE IF NOT EXISTS historical_prices (
//     symbol TEXT,
//     timestamp DATETIME,
//     open REAL,
//     high REAL,
//     low REAL,
//     close REAL,
//     volume INTEGER,
//     PRIMARY KEY (symbol, timestamp)
//   );
//   CREATE TABLE IF NOT EXISTS financial_metrics (
//     symbol TEXT,
//     metric_date DATETIME,
//     market_cap REAL,
//     pe_ratio REAL,
//     dividend_yield REAL,
//     PRIMARY KEY (symbol, metric_date)
//   );
// `);