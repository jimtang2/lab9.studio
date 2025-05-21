import { z } from "zod"
import Link from "next/link"
import { Error } from "@/components/error"
import { fetchEntries } from "@/lib/actions"

import "./page.css"

export default async function EntriesPage({ 
	searchParams 
}: { 
	searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
	const { limit, offset } = z.object({
	  offset: z
	    .union([z.string(), z.array(z.string()), z.undefined()])
	    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
	    .pipe(z.coerce.number().default(0)), 
	  limit: z
	    .union([z.string(), z.array(z.string()), z.undefined()])
	    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
	    .pipe(z.coerce.number().default(50)), 
	}).parse(await searchParams)

	const { items, error }: {
		items: {
			id: number
			title: string
			metadata: string 
			created_at: string
			updated_at: string
		}[]
		error?: string
	} = await fetchEntries({ limit, offset })

	if (typeof error === "string") {
		return <Error error={error} />
	}

	return (
    <main> 
    	{items.map((props, idx) =>
    		<Entry key={idx} {...props} />)}
		</main>
		)
}

function fmtDate(date: Date | string): string {
  return z
    .union([z.string(), z.date()])
    .transform((val) => {
      const date = typeof val === 'string' ? new Date(val) : val
      return isNaN(date.getTime()) ? '' : date.toLocaleDateString("en-US", {
			  year: "2-digit",
			  month: "2-digit",
			  day: "numeric",
			})
    }).parse(date)
}

function Entry({ 
	id,
	title,
	created_at,
	updated_at,
}: {
	id: number
	title: string
	created_at: string
	updated_at: string
}) {
	return (
		<Link className="entry-list-item" href={`/entries/${id}`}>
			<div className="entry-updated_at">{fmtDate(updated_at)}</div>
			<div className="entry-title">{title}</div>
		</Link>)
}