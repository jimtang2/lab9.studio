import { db } from "@/db"
import { Notes, Note } from "@/db/schema"
import { desc } from "drizzle-orm"
import { setNotes } from "@/lib/globals/notes"

export default async function updateNotes() {
	console.log("updateNotesJob run started")
  try {
    const rows = await db.select().from(Notes).orderBy(desc(Notes.updated_at))
    setNotes(rows ? rows : [])
  } catch (error) {
  	console.log("error:", error)
  }
	console.log("updateNotesJob run completed")
}

