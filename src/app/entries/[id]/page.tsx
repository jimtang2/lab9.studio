import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { Error } from "@/components/error"
import Markdown from "@/components/markdown"
import { fetchEntry, fetchNextEntry } from "@/lib/actions"
import EntriesList from "../entries"
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
	} else {
		return (
	    <main id="entry-content">
	    	<EntryNavigation id={id} />
				<EntriesList />
	    	<Markdown className="markdown" markdown={content} />
			</main>
			)		
	}
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