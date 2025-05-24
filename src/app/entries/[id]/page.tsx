import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { Error } from "@/components/error"
import Markdown, { Toc } from "@/components/markdown"
import { fetchEntries, fetchEntry, fetchNextEntry } from "@/lib/actions"
import IndexButton, { ActiveEntryLink } from "./components"
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

	if (id === 0) {
		return <Error error={"Invalid parameter 'id'"} />
	}

	const { content, error } = await fetchEntry({ id })

	if (typeof error === "string") {
		return <Error error={error} />
	}

	return (
    <main id="entry-content">
    	<EntryNavigation id={id} />
			<EntriesList />
    	<Markdown className="markdown" markdown={content} />
    	<Toc className="toc" content={content} />
		</main>
		)		
}

async function EntryNavigation({ id }: { id: number }) {
	return (
		<div className="navigation">
			<IndexButton />
			<NextEntryButton id={id} />
			<ActiveEntryLink />
		</div>)
}

async function NextEntryButton({ id }: { id: number }) {
	const { id: nextId, title, error } = await fetchNextEntry({ id })

	if (typeof error === "string") {
		return <Error error={error} />
	}

	return (
		<Link className="navigation-button" href={`/entries/${nextId}`}>
			<span>{title}</span>
			<Image src="/heroicons/outline/chevron-right.svg" width={18} height={18} alt="Next Entry" />
		</Link>)	
}

async function EntriesList() {
	const { items, error } = await fetchEntries({})

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


