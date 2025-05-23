import { z } from "zod"
import Link from "next/link"
import { Error } from "@/components/error"
import { fetchEntries } from "@/lib/actions"
import logger from "@/lib/logger"

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

export default async function EntriesList() {
	const { items, error } = await fetchEntries({})
	// logger.info({ error, items })
	if (typeof error === "string") {
		return <Error error={error} />
	}
	return (
  	<div className="entries-list">
  		{items.map((props, idx) => <Entry key={idx} {...props} />)}
  	</div>
	)
}

function Entry({ id, title, updated_at }: {
	id: number
	title: string
	updated_at: string
}) {
	return (
		<Link className="entry-list-item" href={`/entries/${id}`}>
			<span className="entry-title">{title}
				<span className="entry-updated_at"> – added on {fmtDate(updated_at)}</span>
			</span>
			
		</Link>)
}

