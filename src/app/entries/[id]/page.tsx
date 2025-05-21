import { z } from "zod"
import { Error } from "@/components/error"
import Markdown from "@/components/markdown"
import { fetchEntry } from "@/lib/actions"

import "./page.css"

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

	const result: {
	  id: number
	  title: string
	  content: string
	  metadata: string 
	  created_at: string
	  updated_at: string
	  error?: string
	} = await fetchEntry({ id })

	if (typeof result.error === "string") {
		return <Error error={result.error} />
	}
	const { content } = result
	return (
    <main> 
    	<Markdown className="markdown" markdown={content} />
		</main>
		)
}
