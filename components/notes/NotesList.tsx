"use client"
import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function NotesList({ notes, className="" }: { notes: { id: number; title: string; created_at: string; }[]; className?: string; }) {
	const {
		showNav,
		setShowNav,
		showNotesList,
	} = useStore(state => state)

  const cls = {
  	container: [
			showNotesList ? "pointer-events-auto" : "pointer-events-none",
			"sm:pointer-events-auto",
  		"z-3",
  		"border-l-1 border-border sm:border-l-0",
  		className,
  	],
  	items: [
			"flex flex-col divide-y-1 divide-border",
			"max-w-full max-h-full", 
			"overflow-x-hidden overflow-y-auto",
  		showNotesList ? "h-full opacity-100 translate-y-[0]" : "h-[0px] opacity-0 translate-y-[-50px]",
			"sm:w-full sm:h-full sm:translate-x-0 sm:translate-y-0 sm:opacity-100",
			"transition-all duration-150",
			// "bg-background",
			"px-2 sm:py-2",
  	],
  }

	return <div id="notes-list" className={clsx(cls.container)}>
		<div className={clsx(cls.items)}>
			{notes.map((note, i) => <NoteItem key={note.id} {...note} />)}
		</div>
	</div>
}

function NoteItem({ id, title, created_at }: { id: number; title: string; created_at: string; }) {
	const {
		showNav, 
		showNotesList, 
		setShowNotesList,
		setNoteContentLoading,
	} = useStore(state => state)

	const searchParams = useSearchParams()
	const currentId = searchParams.get("id")
	const current = `${id}` === currentId

	const date = new Date(created_at)
	const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

	const cls = {
		container: [
			"flex flex-row items-stretch",
			"text-base/6",
			"w-full",
			"py-1",
		],
		selection: [
			"py-1 px-2 sm:m-0",
			"h-full w-full",
			current ? "text-accent font-bold" : "text-text hover:text-accent",
			"transition-all duration-150",
			// "bg-background",
			"flex flex-col",
			"px-1",
		],
		date: [
			!current ? "text-subtext font-light" : "font-normal",
			"text-xs",
		],
		title: [
			!current && "text-text-secondary hover:text-text",
			"transition-all duration-150",
		],
		linkIcon: [
			"mx-1",
		],
	}

	return <Link href={`/notes?id=${id}`} 
		className={clsx(["note-item", cls.container])} 
		onNavigate={() => {
			setShowNotesList(false)
			setNoteContentLoading(!current)
		}}>
		<div className={clsx(cls.selection)}>
			<span className={clsx(cls.title)}>{title}</span>
			<span className={clsx(cls.date)}>{displayDate}</span>
		</div>
	</Link>
}