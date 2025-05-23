import { z } from "zod"
import { fetchLastEntryId } from "@/lib/actions"
import { redirect } from "next/navigation"
import "./page.css"

const CollectionParamsSchema = z.object({
  offset: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
    .pipe(z.coerce.number().default(0)), 
  limit: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
    .pipe(z.coerce.number().default(50)), 
})

export default async function EntriesListPage() {
  const {id, error} = await fetchLastEntryId()

  if (typeof error === "string") {
    redirect(`/entries/3`)
  }

  redirect(`/entries/${id}`)
}

