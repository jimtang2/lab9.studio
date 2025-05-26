import { z } from "zod"
import Link from "next/link"
import { Error } from "@/components/error"
import Markdown from "@/components/markdown"
import { fetchNotes, fetchNote } from "@/lib/db/actions"
import { HighlightActiveListItem, MinimizeNotesDropdown } from "./page.client"
import { fmtDate } from "@/lib/util"
import "@/css/notes_[id].css"

export default async function NoteContentPage({ 
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

	const { content, error: error1 } = await fetchNote({ id })
	const { items, error: error2 } = await fetchNotes({})

	if (id === 0) {
		return <Error error={"note not found"} />
	} else if (typeof error1 === "string") {
		return <Error error={error1} />
	} else if (typeof error2 === "string") {
		return <Error error={error2} />
	}

	return (
    <main id="note-content">
    	<div className="notes-list">
    		{items.map(({ id, title, updated_at }, idx) => {
    			return (
    				<Link key={`${id}.${idx}`} className="note-list-item" href={`/notes/${id}`}>
    					<span className="note-title">{title}</span>
    					<span className="note-updated_at">{fmtDate(updated_at)}</span>
    				</Link>)
    		})}
    		<HighlightActiveListItem />
    		<MinimizeNotesDropdown />
    	</div>
    	<Markdown markdown={content} />
		</main>
		)		
}

