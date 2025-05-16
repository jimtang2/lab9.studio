"use client"
import { useState, useEffect } from "react"
import { Article, ArticleSelectorItemProps, UpdatedAtSchema } from "./types"

import MarkdownTextRenderer from "@/components/MarkdownTextRenderer"
import SyntaxHighlighter from "@/components/SyntaxHighlighter"



export default function ArticleReader({ articles }: { articles: Article[]}) {
	const [selectedId, setSelectedId] = useState(-1)
	const article: Article[] = articles.filter(({id}) => id === selectedId)

	useEffect(() => {
		if (selectedId === -1 && articles.length > 0) {
			setSelectedId(articles[0].id)
		}
	}, [selectedId])
	
	return (
		<div className={`relative flex flex-row items-stretch h-full`}>
			<ArticleNavigator {...{ articles, selectedId, setSelectedId }} />
			{article.length === 1 && <ArticleContent {...(article[0])} />}
		</div>)
}

function ArticleNavigator({ articles, selectedId, setSelectedId }: { articles: Article[], selectedId: number, setSelectedId: (id: number) => void}) {
	return (
		<div className={`flex flex-col gap-2 h-[calc(100vh-44px)] w-[240px] min-w-[240px] overflow-y-scroll border-r-1 border-r-divider`}>
			{articles.map((article, idx) => 
				<ArticleSelectorItem key={`${article.id}-${idx}`} {...article} {...{ selectedId, setSelectedId }} />
				)}
		</div>
	)
}

function ArticleSelectorItem({id, title, updated_at, selectedId, setSelectedId}: ArticleSelectorItemProps) {
	let updated = UpdatedAtSchema.parse(updated_at)
	let selected = id === selectedId
	return (
		<div onClick={() => setSelectedId(id)} className={`flex flex-col gap-2 ${selected ? "bg-accent text-text-contrast" : ""} px-4 py-2 cursor-pointer`}>
			<div className={`font-bold`}>{title}</div>
			<div className={`text-sm`}>{updated}</div>
		</div>)
}

function ArticleContent({ content }: Article) {
	return (
		<div id="reader" className={`flex flex-col flex-grow-1 h-[calc(100vh-44px)] overflow-y-scroll pb-20`}>
			<MarkdownTextRenderer markdown={content} className={`px-10`} />
		</div>
		)
}
