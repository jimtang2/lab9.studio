"use server"
import { pool } from "./db"
import logger from "@/lib/logger"

type Entry = {
	id: number
	title: string
	content: string
	metadata: string 
	created_at: string
	updated_at: string
}

export async function fetchLastEntryId(): Promise<Entry & { error?: string }> {
	try {
		const query = `SELECT * FROM entries ORDER BY updated_at DESC LIMIT 1;`
		const results = await pool.query(query)
		return { ...results.rows[0] }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { 
				id: -1,
				title: "",
				content: "",
				metadata: "",
				created_at: "",
				updated_at: "",
				error: error.message,
			}	
		} else {
			return {
				id: -1,
				title: "",
				content: "",
				metadata: "",
				created_at: "",
				updated_at: "",				
			}
		}
	}	
}

export async function fetchEntries({ limit = 50, offset = 0 }: {
	limit?: number 
	offset?: number
}): Promise<{
	items: Entry[]
	error?: string
}> {
	try {
		const query = `SELECT id, title, updated_at FROM entries 
ORDER BY updated_at DESC 
LIMIT $1 OFFSET $2;`
		const results = await pool.query(query, [limit, offset])
		return { items: results.rows }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: `sql: ${error.message} ${JSON.stringify(error)}`, items: [] }	
		} else {
			return { error: `unknown error: ${JSON.stringify(error)}`, items: [] }	
		}
	}	
}

export async function fetchEntry({ id }: {
	id: number
}): Promise<Entry & { error?: string }> {
	try {
		const query = `SELECT * FROM entries WHERE id = $1;`
		const results = await pool.query(query, [id])
		return { ...results.rows[0] }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { 
				id: -1,
				title: "",
				content: "",
				metadata: "",
				created_at: "",
				updated_at: "",
				error: error.message,
			}	
		} else {
			return {
				id: -1,
				title: "",
				content: "",
				metadata: "",
				created_at: "",
				updated_at: "",				
			}
		}
	}	
}

export async function fetchNextEntry({ id }: {
	id: number
}): Promise<Entry & { error?: string }> {
	try {
		const query = `
SELECT id, title, updated_at FROM (
  SELECT * FROM entries
  WHERE id > $1
  ORDER BY id ASC
  LIMIT 1
) AS next_entry
UNION
SELECT id, title, updated_at FROM (
  SELECT * FROM entries
  ORDER BY id ASC
  LIMIT 1
) AS first_entry
ORDER BY id DESC
LIMIT 1;`
		const results = await pool.query(query, [id])
		return { ...results.rows[0] }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { 
				id: -1,
				title: "",
				content: "",
				metadata: "",
				created_at: "",
				updated_at: "",
				error: error.message,
			}	
		} else {
			return {
				id: -1,
				title: "",
				content: "",
				metadata: "",
				created_at: "",
				updated_at: "",				
			}
		}
	}	
}

export async function searchEntryTitles({ input }: {
	input: string
}): Promise<{
	items: Entry[]
	error?: string
}> {
	try {
		const query = 'select id, title, content, metadata, created_at, updated_at from entries where title ilike $1 order by updated_at desc;'
		const results = await pool.query(query, [input])
		return { items: results.rows as Entry[]}
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message, items: [] }	
		} else {
			return { items: [] }
		}
	}	
}

