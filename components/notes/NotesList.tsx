"use client"
import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useStore } from "@/state/store"
import LinkIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

export default function NotesList({ notes, className="" }: { notes: { id: number; title: string; updated_at: string; }[]; className?: string; }) {
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
  		className,
  	],
  	items: [
			"grid auto-rows-[min-content]",
			"max-w-full max-h-full", 
			"overflow-x-hidden overflow-y-auto",
  		showNotesList ? "h-full opacity-100 translate-y-[0]" : "h-[0px] opacity-0 translate-y-[-50px]",
			"sm:w-full sm:h-full sm:translate-x-0 sm:translate-y-0 sm:opacity-100",
			"transition-all duration-150",
  	],
  }

	return <div id="notes-list" className={clsx(cls.container)}>
		<div className={clsx(cls.items)}>
			{notes.map((note, i) => <NoteItem key={note.id} {...note} />)}
		</div>
	</div>
}

function NoteItem({ id, title, updated_at }: { id: number; title: string; updated_at: string; }) {
	const {
		showNav, 
		showNotesList, 
		setShowNotesList,
		setNoteContentLoading,
	} = useStore(state => state)

	const searchParams = useSearchParams()
	const currentId = searchParams.get("id")
	const current = `${id}` === currentId

	const cls = {
		container: [
			"flex flex-row items-stretch",
			"text-base/8",
			"w-full",
			"border-b-1 border-background sm:border-border",
			// "sm:py-[2px]",
		],
		selection: [
			"p-1 sm:m-0",
			"flex flex-row items-center",
			"h-full w-full",
			current ? "text-accent font-bold sm:bg-menu" : "text-text hover:text-accent",
			"transition-all duration-150",
			"bg-menu sm:bg-background sm:hover:bg-menu",
		],
		text: [
			"flex-grow-1",
			"max-w-full",
			"whitespace-nowrap overflow-hidden text-ellipsis",
			"indent-2",
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
			<span className={clsx(cls.text)}>On {title}</span>
			<LinkIcon className={clsx(cls.linkIcon)} />
		</div>
	</Link>
}