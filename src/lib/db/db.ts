import { Pool } from 'pg'

/*
Note that Pool parameters use default environment variables PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD. However, due to a bug in Turbolink/Webpack, .env.* file variables cannot override environment variables. The latter is annoying for development, hence we use PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD, and it will fall back on the version without underscore if they're empty.
*/

export const pool = new Pool({
	ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : undefined,
})