import { Pool } from 'pg'

/*
Note that Pool parameters use default environment variables PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD. However, due to a bug in Turbolink/Webpack, .env.* file variables cannot override environment variables. The latter is annoying for development, hence we use PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD, and it will fall back on the version without underscore if they're empty.
*/
export const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT as string),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})
