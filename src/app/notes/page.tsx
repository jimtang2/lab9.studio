import { fetchLastNoteId } from "@/lib/db/actions"
import { redirect } from "next/navigation"
import { Error } from "@/components/error"

export default async function NotesListPage() {
  const {id, error} = await fetchLastNoteId()

  if (typeof error === "string") {
    return <Error error={error} />
  } else {
    redirect(`/notes/${id}`)
  }
}

