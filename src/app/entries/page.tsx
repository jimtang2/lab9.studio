import { fetchLastEntryId } from "@/lib/db/actions"
import { redirect } from "next/navigation"
import { Error } from "@/components/error"

export default async function EntriesListPage() {
  const {id, error} = await fetchLastEntryId()

  if (typeof error === "string") {
    return <Error error={error} />
  } else {
    redirect(`/entries/${id}`)
  }
}

