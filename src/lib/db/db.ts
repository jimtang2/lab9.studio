import { Pool } from 'pg'

export const pool = new Pool({
	ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : undefined,
})
