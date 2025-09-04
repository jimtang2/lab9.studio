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
  			"col-start-1 col-end-[-1] row-start-2 row-span-1",
  			"sm:col-start-1 sm:col-span-1 sm:row-start-1 sm:row-end-[-1]",	
  		],
  		[
  			showNotesList ? "pointer-events-auto" : "pointer-events-none",
  			"sm:pointer-events-auto",
	  		"z-3",

  		],
  	],
  	items: [
  		[
  			"bg-background",  			
  		],
  		[
  			"w-full h-full max-h-full max-w-full", 
  			"overflow-x-hidden overflow-y-auto",
  			"grid auto-rows-[min-content]",
  		],
	  	[
	  		showNav && [
	  			"w-[calc(100%-50px)]",
	  			showNotesList && "translate-x-[50px] opacity-100", 
	  			!showNotesList && "translate-x-[50%] opacity-0",

	  		],
	  		!showNav && [
	  			"w-full",
		  		showNotesList && "translate-x-0 opacity-100", 
		  		!showNotesList && "translate-x-[50%] opacity-0",
	  		],
	  		"sm:w-full sm:translate-x-0 sm:opacity-100",
	  		"sm:w-full sm:translate-x-0",
  			"transition-all duration-300",
	  	],
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
	const [hover, setHover] = useState(false)
	const currentId = searchParams.get("id")
	const current = `${id}` === currentId

	const cls = {
		container: [
			[
				"grid grid-cols-[auto_50px] grid-rows-1",
			],
			[
				"border-b-1 border-border",
				"bg-background",
				!current && [
					"text-text hover:text-accent",
				],
				current && [
					"bg-selected-background text-selected-foreground",
				],
				"text-base/6",
				"overflow-x-hidden",
			],
			[
				"min-h-[50px] sm:mx-2",
				showNav ? "w-[calc(100%-50px)] sm:w-full" : "w-full",
				"sm:max-w-[calc(100%-4*var(--spacing))]",
			],
			[
				"transition-all duration-300",
			],
		],
		text: [
			"col-start-1 col-end-2",
			"justify-self-start self-center",
			"max-w-full px-3 sm:px-2",
			"whitespace-nowrap overflow-hidden text-ellipsis",
		],
		linkIcon: [
			"col-start-2 col-end-3",
			"justify-self-stretch self-stretch",
			"flex items-center justify-center",
			hover && "animate-pulse",
			current && "sm:hidden sm:pointer-events-none",
		],
	}

	return <Link href={`/notes?id=${id}`} 
		className={clsx(["note-item", cls.container])} 
		onNavigate={() => {
			setShowNotesList(false)
			setNoteContentLoading(current)
		}} 
		onMouseOver={() => setHover(true)} 
		onMouseOut={() => setHover(false)}>
		<span className={clsx(cls.text)}>{title}</span>
		<button className={clsx(cls.linkIcon)}
			tabIndex={showNotesList ? 0 : -1}>
			<LinkIcon />
		</button>
	</Link>
}