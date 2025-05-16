import Title from "@/components/Title"
import { fetchArticles } from "./actions"
import { Article, ArticlesFetchResult, SearchParamsSchema } from "./types"
import ArticleReader from "./ArticleReader"

export default async function SavedReading({ 
	searchParams 
}: { 
	searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
	const { limit, offset } = SearchParamsSchema.parse(await searchParams)
	const { items, error }: ArticlesFetchResult = await fetchArticles({ limit, offset })

	let hasError = typeof error === "string"

	return (
    <main className={``} style={{overflowY: "hidden"}}>
			<Title title="Articles" />

			{hasError ? 
				<div>{error}</div> : 
				<ArticleReader articles={items} />}
			
		</main>
		)
}
