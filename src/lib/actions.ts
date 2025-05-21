"use server"
import { pool } from "@/lib/db"

type Entry = {
	id: number
	title: string
	content: string
	metadata: string 
	created_at: string
	updated_at: string	
}

export async function fetchEntries({ limit, offset}: {
	limit: number 
	offset: number
}): Promise<{
	items: Entry[]
	error?: string
}> {
	try {
		const query = 'select id, title, metadata, created_at, updated_at from entries order by updated_at desc limit $1 offset $2;'
		const results = await pool.query(query, [limit, offset])
		return { items: results.rows }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message, items: [] }	
		} else {
			return { items: [] }
		}
	}	
}

export async function fetchEntry({ id }: {
	id: number
}): Promise<Entry & {error?: string}> {
	try {
		const query = 'select id, title, content, metadata, created_at, updated_at from entries where id=$1;'
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
