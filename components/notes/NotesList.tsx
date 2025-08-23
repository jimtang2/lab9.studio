"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useStore } from "@/state/store"
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
  		"z-4",
  		[
  			showNotesList ? "pointer-events-auto" : "pointer-events-none",
  			"sm:pointer-events-auto",
  		],
  	],
  	items: [
  		"bg-background-primary",
  		[
  			"w-full h-full max-h-full overflow-y-scroll",
  			"grid gap-[1px] auto-rows-[min-content]",
  		],
  		[
  			"transition-[width] transition-transform duration-300",
  			showNotesList ? "translate-x-0" : "translate-x-[100%]",
  			"sm:w-full sm:translate-x-0",

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
	const setShowNotesList = useStore(state => state.setShowNotesList)
	const searchParams = useSearchParams()
	const _active = `${id}` === searchParams.get("id")

	const cls = [
		"flex items-center",
		"px-4 py-3",
		"min-h-[50px]",
		"text-base/6",
		(active || _active) && "font-bold text-accent-primary bg-background-secondary",
	]

	const handleClick = () => setShowNotesList(false)

	return <Link href={`/notes?id=${id}`} className={clsx(cls)} onClick={handleClick}>
		<span>{title}</span>
	</Link>
}