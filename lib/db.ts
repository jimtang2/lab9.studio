import { Pool } from 'pg'

const options = process.env.PGSSLMODE === "require" ? {
	ssl: { 
		rejectUnauthorized: false 
	}
} : {}

export const pool = new Pool(options)
