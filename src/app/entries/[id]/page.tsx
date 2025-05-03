import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { Error } from "@/components/error"
import Markdown from "@/components/markdown"
import { fetchEntries, fetchEntry, fetchNextEntry } from "@/lib/db/actions"
import { ActiveEntriesListItemChecker } from "./page-client"
import { fmtDate } from "@/lib/util"
import "./page.css"

export default async function EntryContentPage({ 
	params 
}: { 
	params: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
	const { id } = z.object({
	  id: z
	    .union([z.string(), z.array(z.string()), z.undefined()])
	    .transform((val) => (Array.isArray(val) ? val[0] : val)) 
	    .pipe(z.coerce.number().default(0)), 
	}).parse(await params)

	const { content, error: error1 } = await fetchEntry({ id })
	const { items, error: error2 } = await fetchEntries({})

	if (id === 0) {
		return <Error error={"entry not found"} />
	} else if (typeof error1 === "string") {
		return <Error error={error1} />
	} else if (typeof error2 === "string") {
		return <Error error={error2} />
	}

	return (
    <main id="entry-content">
    	<div className="entries-list">
    		{items.map(({ id, title, updated_at }, idx) => {
    			return (
    				<Link key={`${id}.${idx}`} className="entry-list-item" href={`/entries/${id}`}>
    					<span className="entry-title">{title}
    						<span className="entry-updated_at"> – added on {fmtDate(updated_at)}</span>
    					</span>
    				</Link>)
    		})}
    	</div>
    	<Markdown markdown={content} />
    	<ActiveEntriesListItemChecker />
		</main>
		)		
}
