"use server"
import { pool } from "./db"
import logger from "@/lib/logger"

type Note = {
	id: number
	title: string
	content: string
	metadata: string 
	created_at: string
	updated_at: string
}

export async function fetchLastNoteId(): Promise<Note & { error?: string }> {
	try {
		const query = `SELECT * FROM notes ORDER BY updated_at DESC LIMIT 1;`
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

export async function fetchNotes({ limit = 50, offset = 0 }: {
	limit?: number 
	offset?: number
}): Promise<{
	items: Note[]
	error?: string
}> {
	try {
		const query = `SELECT id, title, updated_at FROM notes 
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

export async function fetchNote({ id }: {
	id: number
}): Promise<Note & { error?: string }> {
	try {
		const query = `SELECT * FROM notes WHERE id = $1;`
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

export async function fetchNextNote({ id }: {
	id: number
}): Promise<Note & { error?: string }> {
	try {
		const query = `
SELECT id, title, updated_at FROM (
  SELECT * FROM notes
  WHERE id > $1
  ORDER BY id ASC
  LIMIT 1
) AS next_note
UNION
SELECT id, title, updated_at FROM (
  SELECT * FROM notes
  ORDER BY id ASC
  LIMIT 1
) AS first_note
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

export async function searchNoteTitles({ input }: {
	input: string
}): Promise<{
	items: Note[]
	error?: string
}> {
	try {
		const query = 'select id, title, content, metadata, created_at, updated_at from notes where title ilike $1 order by updated_at desc;'
		const results = await pool.query(query, [input])
		return { items: results.rows as Note[]}
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message, items: [] }	
		} else {
			return { items: [] }
		}
	}	
}

