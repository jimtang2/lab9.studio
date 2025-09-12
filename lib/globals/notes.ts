import { Note } from "@/db/schema"

let notes: Note[] = []

export function getNotes(): Note[] {
	return notes
}

export function setNotes(newNotes: Note[]) {
	notes = newNotes
}

export default notes