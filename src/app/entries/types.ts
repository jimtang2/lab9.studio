import { z } from "zod"

export type Entry = {
	id: number
	title: string
	content: string
	metadata: string 
	created_at: string
	updated_at: string
}

export type EntrySelectorItemProps = Entry & {
	selectedId: number 
	setSelectedId: (id: number) => void
}

export type FetchEntriesArgs = {
	limit?: number
	offset?: number
}

export type SearchEntryTitlesArgs = {
	input: string
}

export type EntriesFetchResult = {
	items: Entry[]
	error?: string
}

export const SearchParamsSchema = z.object({
  offset: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
    .pipe(z.coerce.number().default(0)), 
  limit: z
    .union([z.string(), z.array(z.string()), z.undefined()])
    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
    .pipe(z.coerce.number().default(50)), 
})

export const UpdatedAtSchema = z
  .union([z.date(), z.string()])
  .transform((val) => (typeof val === "string" ? new Date(val) : val))
  .refine((date) => !isNaN(date.getTime()), { message: "Invalid date" })
  .transform((date) =>
    date.toLocaleTimeString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );