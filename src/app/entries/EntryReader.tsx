"use client"
import { useState, useEffect } from "react"
import { Entry, EntrySelectorItemProps, UpdatedAtSchema } from "./types"

import MarkdownTextRenderer from "@/components/MarkdownTextRenderer"
import SyntaxHighlighter from "@/components/SyntaxHighlighter"



export default function EntryReader({ entries }: { entries: Entry[]}) {
	const [selectedId, setSelectedId] = useState(-1)
	const entry: Entry[] = entries.filter(({id}) => id === selectedId)

	useEffect(() => {
		if (selectedId === -1 && entries.length > 0) {
			setSelectedId(entries[0].id)
		}
	}, [selectedId])
	
	return (
		<div className={`relative flex flex-row items-stretch h-full`}>
			<EntryNavigator {...{ entries, selectedId, setSelectedId }} />
			{entry.length === 1 && <EntryContent {...(entry[0])} />}
		</div>)
}

function EntryNavigator({ entries, selectedId, setSelectedId }: { entries: Entry[], selectedId: number, setSelectedId: (id: number) => void}) {
	return (
		<div className={`flex flex-col gap-2 h-[calc(100vh-44px)] w-[240px] min-w-[240px] overflow-y-scroll border-r-1 border-r-divider`}>
			{entries.map((entry, idx) => 
				<EntrySelectorItem key={`${entry.id}-${idx}`} {...entry} {...{ selectedId, setSelectedId }} />
				)}
		</div>
	)
}

function EntrySelectorItem({id, title, updated_at, selectedId, setSelectedId}: EntrySelectorItemProps) {
	let updated = UpdatedAtSchema.parse(updated_at)
	let selected = id === selectedId
	return (
		<div onClick={() => setSelectedId(id)} className={`flex flex-col gap-2 ${selected ? "bg-accent text-text-contrast" : ""} px-4 py-2 cursor-pointer`}>
			<div className={`font-bold`}>{title}</div>
			<div className={`text-sm`}>{updated}</div>
		</div>)
}

function EntryContent({ content }: Entry) {
	return (
		<div id="reader" className={`flex flex-col flex-grow-1 h-[calc(100vh-44px)] overflow-y-scroll pb-20`}>
			<MarkdownTextRenderer markdown={content} className={`px-10`} />
		</div>
		)
}
