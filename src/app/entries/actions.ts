'use server'
import { pool } from "@/lib/db"
import { FetchEntriesArgs, EntriesFetchResult, SearchEntryTitlesArgs } from "./types"

export async function fetchEntries({ limit, offset}: FetchEntriesArgs): Promise<EntriesFetchResult> {
	try {
		const query = 'select id, title, content, metadata, created_at, updated_at from entries order by updated_at desc limit $1 offset $2;'
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

export async function searchEntryTitles({ input }: SearchEntryTitlesArgs): Promise<EntriesFetchResult> {
	try {
		const query = 'select id, title, content, metadata, created_at, updated_at from entries where title ilike $1 order by updated_at desc;'
		const results = await pool.query(query, [input])
		return { items: results.rows }
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message, items: [] }	
		} else {
			return { items: [] }
		}
	}	
}
