"use client"
import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useStore } from "@/state/store"
import LinkIcon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

export default function NotesList({ notes }: { notes: { id: number; title: string; updated_at: string; }[] }) {
	const {
		showNav,
		setShowNav,
		showNotesList,
	} = useStore(state => state)

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
	  		"mx-0",
  		],
  	],
  	items: [
  		[
  			"grid auto-rows-[min-content]",
  			"max-w-full max-h-full", 
  			"overflow-x-hidden overflow-y-auto",
  			"divide-y divide-border",
  			"border-b-1 border-border",
  		],
  		[
  			"sm:w-full sm:h-full",
  			"sm:translate-x-0 sm:translate-y-0 sm:opacity-100",
  		],
	  	[
	  		showNav && [
	  			"w-[calc(100%-50px)]",
	  			"translate-x-[50px]",
	  		],
	  		!showNav && [
	  			"w-full",
	  			"translate-x-0",
	  		],
	  		showNotesList && [
	  			"h-full",
	  			"opacity-100",
	  			"translate-y-0",
	  		], 
	  		!showNotesList && [
	  			"h-[0px]",
	  			"opacity-0",
	  			"translate-y-[-50px]",
	  		],
  			"transition-all duration-150",
	  	],
	  	"bg-menu",
  	],
  }

  useEffect(() => {
  	if (showNav) {
  		setShowNav(false)
  	}
  }, [])

  useEffect(() => {
  	if (showNotesList && !showNav) {
  		setShowNav(true)
  	}
  }, [showNotesList])

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
			"flex flex-row items-center",
			"w-full min-h-[50px]",
			"last:border-b-1 border-border",
			"text-base/6",
			[
				!current && "text-subtext hover:text-text",
				current && "text-accent font-bold bg-background",
				showNav && "w-[calc(100%-50px)]",
				"transition-all duration-150",
			],
		],
		text: [
			"flex-grow-1",
			"max-w-full pl-3",
			"whitespace-nowrap overflow-hidden text-ellipsis",
		],
		linkIcon: [
			"mx-2",
		],
	}

	return <Link href={`/notes?id=${id}`} 
		className={clsx(["note-item", cls.container])} 
		onNavigate={() => {
			setShowNotesList(false)
			setNoteContentLoading(!current)
		}}>
		<span className={clsx(cls.text)}>On {title}</span>
		<LinkIcon className={clsx(cls.linkIcon)} />
	</Link>
}