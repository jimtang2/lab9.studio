import type { Metadata } from "next"
import { z } from "zod"
import { db } from "@/db"
import { Notes, Note } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { NoteTitle, NotesList, NoteContent } from "@/components/notes"
import clsx from "clsx"

export const metadata: Metadata = {
  title: "Notes",
}

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

  const cls = [
    "h-full max-h-full w-screen max-w-screen",
    "grid overflow-hidden",
    "z-1",
    [
      "grid-cols-[50px_auto_50px]",
      "grid-rows-[50px_auto]",
    ],
    [
      "sm:grid-cols-[1fr_2fr]",
      "sm:grid-rows-1",
    ],
    [
      "xl:grid-cols-[3fr_6fr_3fr]",
    ],
  ]

 const notes = await fetchNotesList()
  if ("error" in notes) {
    return <h3>{notes.error}</h3>
  }

  const note = id === 0 ? null : await fetchNote(id)
  if (note === null) {
  } else if ("error" in note) {
    return <h3>{note?.error}</h3>
  }
 
  return <div id="notes-page" className={clsx(cls)}>
    <NoteTitle note={note} />
    <NoteContent note={note} />
    <NotesList notes={notes} />
  </div>
}

async function fetchNote(id: number): Promise<Note | { error: string }> {
  try {
    const result = await db.select().from(Notes).where(eq(Notes.id, id)).limit(1)
    if (!result[0]) return { error: "Note not found" }
    return result[0]
  } catch (error) {
    return { error: "Database error" }
  }
}

async function fetchLastNote(): Promise<Note | { error: string }> {
  try {
    const result = await db.select().from(Notes).orderBy(desc(Notes.updated_at)).limit(1)
    if (!result[0]) return { error: "No notes found" }
    return result[0]
  } catch (error) {
    return { error: "Database error" }
  }
}

async function fetchNotesList(): Promise<{ id: number; title: string; updated_at: string }[] | { error: string }> {
  try {
    const result = await db.select({
      id: Notes.id,
      title: Notes.title,
      updated_at: Notes.updated_at,
    }).from(Notes).orderBy(desc(Notes.updated_at))
    if (!result) return { error: "No note" }
    return result
  } catch (error) {
    return { error: "Database error" }
  }
}

export const dynamic = "force-dynamic"