import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { z } from "zod"
import NotesPageClient from "@/components/notes"
import { getNotes, getNote } from "@/state/global/notes"

export const metadata: Metadata = {
  title: "Notes",
}

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

  const { id } = z.object({
    id: z
      .union([ z.string(), z.array(z.string()), z.undefined() ])
      .transform(val => Array.isArray(val) ? val[0] : val)
      .transform(val => (typeof val === "string" && !isNaN(Number(val)) ? val : undefined))
      .pipe(z.coerce.number().default(0))
  }).parse(await searchParams)

  const notes = await getNotes()
  if (id === 0 && notes.length > 0) {
    if (notes.length > 0) {
      const redirectId = notes[0].id
      redirect(`/notes?id=${redirectId}`)
      return null
    }
  }
  const note = await getNote(id)

  return <NotesPageClient notes={notes} note={note} />
}

export const dynamic = "force-dynamic"