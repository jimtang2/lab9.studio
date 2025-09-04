"use client"
import { Note } from "@/db/schema"
import Icon from "/public/heroicons/solid/chevron-up-down.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function NoteTitle({ note }: { note: Note | null }) {
	const {
		showNav,
		setShowNav,
		showNotesList,
		setShowNotesList,
	} = useStore(state => state)
	const title = note?.title || "Tap to select note"
  const cls = {
  	container: [
			[
				"col-start-2 col-end-[-2] row-start-1 row-span-1",
				"grid grid-rows-1 grid-cols-[auto_50px] grid-flow-row",
			],
			[
				"border-b-1 border-border",
				showNotesList ? "bg-selected-background text-selected-foreground" : "bg-menu",

				"sm:hidden",
				"transition-all duration-300",
			],
	  ],
	  text: [
			"whitespace-nowrap overflow-hidden text-ellipsis",
			"self-stretch flex items-center",
	  	"px-2",
	  ],
	  iconContainer: [
	  	"self-stretch flex items-center justify-center",
			"z-11",
	  ],
	  icon: [
	  ],
  }

	return <button className={clsx(cls.container)} 
		id="note-title" 
		onClick={() => setShowNotesList(!showNotesList)}>
			<span className={clsx(cls.text)}>{title}</span>
			<div className={clsx(cls.iconContainer)}>
				<Icon className={clsx(cls.icon)} />	
			</div>
			<div></div>
		</button>
}
