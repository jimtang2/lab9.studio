import Title from "@/components/Title"
import { fetchEntries } from "./actions"
import { Entry, EntriesFetchResult, SearchParamsSchema } from "./types"
import EntryReader from "./EntryReader"

export default async function SavedReading({ 
	searchParams 
}: { 
	searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
	const { limit, offset } = SearchParamsSchema.parse(await searchParams)
	const { items, error }: EntriesFetchResult = await fetchEntries({ limit, offset })

	let hasError = typeof error === "string"

	return (
    <main className={``} style={{overflowY: "hidden"}}>
			<Title title="Entries" />

			{hasError ? 
				<div>{error}</div> : 
				<EntryReader entries={items} />}
			
		</main>
		)
}
