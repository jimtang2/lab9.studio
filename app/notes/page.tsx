import type { Metadata } from "next"
import { z } from "zod"
import { db } from "@/db"
import { notes, Note } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { ListToggle, NotesList, NoteContent } from "@/components/notes"
import clsx from "clsx"
import "@/styles/prism.css"

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  let { id } = z.object({
    id: z.union([
      z.string(), 
      z.array(z.string()), 
      z.undefined()
    ]).transform(val => 
      (Array.isArray(val) ? val[0] : val)
    ).pipe(z.coerce.number().default(0)), 
  }).parse(await searchParams)

  const note = id === 0 ? await fetchLastNote() : await fetchNote(id)
  if ("error" in note) {
    return <h3>{note.error}</h3>
  }

 const allNotes = await fetchNotesList()
  if ("error" in allNotes) {
    return <h3>{allNotes.error}</h3>
  }
 
  const cls = [
    "h-full max-h-full w-full max-w-full",
    "grid overflow-hidden",
    [
      "grid-cols-[50px_auto_50px]",
      "grid-rows-[50px_auto]",
    ],
    [
      "sm:grid-cols-[1fr_3fr]",
      "sm:grid-rows-1",
    ],
    [
      "lg:grid-cols-[minmax(250px,1fr)_3fr_minmax(250px,1fr)]",
    ],
  ]

  return <div id="notes-page" className={clsx(cls)}>
    <ListToggle />
    <NotesList notes={allNotes} />
    <NoteContent note={note} />
  </div>
}

async function fetchNote(id: number): Promise<Note | { error: string }> {
  try {
    const result = await db.select().from(notes).where(eq(notes.id, id)).limit(1)
    if (!result[0]) return { error: "Note not found" }
    return result[0]
  } catch (error) {
    return { error: "Database error" }
  }
}

async function fetchLastNote(): Promise<Note | { error: string }> {
  try {
    const result = await db.select().from(notes).orderBy(desc(notes.updated_at)).limit(1)
    if (!result[0]) return { error: "No notes found" }
    return result[0]
  } catch (error) {
    return { error: "Database error" }
  }
}

async function fetchNotesList(): Promise<{ id: number; title: string; updated_at: string }[] | { error: string }> {
  try {
    const result = await db.select({
      id: notes.id,
      title: notes.title,
      updated_at: notes.updated_at,
    }).from(notes).orderBy(desc(notes.updated_at))
    if (!result) return { error: "No note" }
    return result
  } catch (error) {
    return { error: "Database error" }
  }
}
