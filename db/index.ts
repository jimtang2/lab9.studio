import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const options = process.env.PGSSLMODE === "require" ? {
  ssl: { 
    rejectUnauthorized: false 
  }
} : {}

export const pool = new Pool(options)

export const db = drizzle(pool, { schema })