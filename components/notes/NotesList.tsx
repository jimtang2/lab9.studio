"use client"
import {useState} from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useStore } from "@/state/store"
import LinkIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

export default function NotesList({ notes }: { notes: { id: number; title: string; updated_at: string; }[] }) {
	const showNav = useStore(state => state.showNav)
	const showNotesList = useStore(state => state.showNotesList)
	const searchParams = useSearchParams()
	const nullId = searchParams.get("id") === null

  const cls = {
  	container: [  		
  		[
  			"col-start-1 col-end-4",
  			"row-start-2 row-end-3",
  		],
  		[
  			"sm:col-start-1 sm:col-end-2",
  			"sm:row-start-1 sm:row-end-3",	
  		],
  		"z-3",
  		[
  			showNotesList ? "pointer-events-auto" : "pointer-events-none",
  			"sm:pointer-events-auto",
  		],
  	],
  	items: [
  		"bg-background-primary",
  		[
  			"w-full h-full max-h-full max-w-full", 
  			"overflow-x-hidden overflow-y-scroll",
  			"grid gap-[1px] auto-rows-[min-content]",
  		],
  		[
  			"transition-all duration-300 ease-in-out",
  			showNotesList && "translate-x-0 opacity-100", 
  			!showNotesList && "translate-x-[100%] opacity-0",
  			"sm:w-full sm:translate-x-0 sm:opacity-100",
  		],
	  	[
	  		showNav ? "w-[calc(100%-50px)]" : "w-full",
	  		showNav ? "translate-x-[50px]" : "translate-x-0",
	  		"sm:w-full sm:translate-x-0",
	  	],
  	],
  }

	return <div id="notes-list" className={clsx(cls.container)}>
		<div className={clsx(cls.items)}>
			{notes.map((note, i) => <NoteItem key={note.id} {...note} active={i == 0 && nullId} />)}
		</div>
	</div>
}

function NoteItem({ id, title, updated_at, active }: { id: number; title: string; updated_at: string; active: boolean }) {
	const showNav = useStore(state => state.showNav)
	const setShowNotesList = useStore(state => state.setShowNotesList)
	const setLoadingNoteId = useStore(state => state.setLoadingNoteId)
	const searchParams = useSearchParams()
	const [hovered, setHovered] = useState(false)
	const current = `${id}` === searchParams.get("id")

	const cls = {
		container: [
			[
				"grid grid-cols-[auto_50px] grid-rows-1",
			],
			[
				"border-b-1 border-border-primary sm:mx-4",
				"text-base/6",
				"min-h-[50px]",
			],
			[
				showNav && "w-[calc(100%-50px)] sm:w-full",
				!showNav && "w-full",
				"sm:max-w-[calc(100%-8*var(--spacing))]",
				"overflow-x-hidden",
				hovered && "bg-background-secondary",
				!hovered && "bg-background-primary",
				"transition-all duration-300",
				(active || current) && [
					"hidden sm:flex",
					"bg-background-secondary",
				],
			],
		],
		text: [
			"col-start-1 col-end-2",
			"justify-self-start self-center",
			"px-3 sm:px-2",
			"whitespace-nowrap overflow-hidden text-ellipsis",
			(active || current) && "font-bold text-accent-secondary",
		],
		linkIcon: [
			"col-start-2 col-end-3",
			"justify-self-stretch self-stretch",
			"flex items-center justify-center",
			"sm:hidden",
			(active || current) && "text-accent-primary translate-x-1",
			hovered && "text-accent-primary translate-x-1",
			(!active && !current && !hovered) && "text-text-primary translate-x-0",
			"transition-all duration-400 ease-in-out",
		],
	}

	const handleNavigate = () => {
		setShowNotesList(false)
		setLoadingNoteId(id)
	}

	const handleMouseOver = () => {
		setHovered(true)
	}

	const handleMouseOut = () => {
		setHovered(false)
	}

	return <Link href={`/notes?id=${id}`} 
		className={clsx(["note-item", cls.container])} 
		onNavigate={handleNavigate} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
		<span className={clsx(cls.text)}>{title}</span>
		<button className={clsx(cls.linkIcon)}>
			<LinkIcon />
		</button>
	</Link>
}