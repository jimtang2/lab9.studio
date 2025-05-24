import { fetchLastEntryId } from "@/lib/actions"
import { redirect } from "next/navigation"

export default async function EntriesListPage() {
  const {id, error} = await fetchLastEntryId()

  if (typeof error === "string") {
    redirect(`/entries/3`)
  } else {
    redirect(`/entries/${id}`)
  }
}

