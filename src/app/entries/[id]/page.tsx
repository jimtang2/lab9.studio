import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import { Error } from "@/components/error"
import Markdown from "@/components/markdown"
import { fetchEntry, fetchNextEntry } from "@/lib/actions"

import "./page.css"

type Entry = {
	id: number
	title: string
	content: string
	metadata: string 
	created_at: string
	updated_at: string
}

export default async function EntryPage({ 
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

	const { content, error }: Entry & { error?: string } = await fetchEntry({ id })

	if (typeof error === "string") {
		return <Error error={error} />
	} else {
		return (
	    <main>
	    	<EntryNavigation id={id} />
	    	<Markdown className="markdown" markdown={content} />
			</main>
			)		
	}
}

async function EntryNavigation({ id }: { id: number }) {
	const { id: nextId, title, error }: Entry & { error?: string } = await fetchNextEntry({ id })

	if (typeof error === "string") {
		return <Error error={error} />
	} else {
		return (
			<div className="entry-navigation">
				<Link className="navigation-link" href="/entries">
					<Image src="/heroicons/outline/list-bullet.svg" width={18} height={18} alt="List Entries" />
					<span>Back to Index</span>
				</Link>

				<Link className="navigation-link" href={`/entries/${nextId}`}>
					<span>{title}</span>
					<Image src="/heroicons/outline/chevron-right.svg" width={18} height={18} alt="Next Entry" />
				</Link>
			</div>)
	}
}