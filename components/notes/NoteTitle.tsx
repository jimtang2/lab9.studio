"use client"
import { Note } from "@/db/schema"
import Icon from "/public/heroicons/solid/chevron-up-down.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function NoteTitle({ note }: { note: Note }) {
	const showNotesList = useStore(state => state.showNotesList)
	const setShowNotesList = useStore(state => state.setShowNotesList)
	const handleClick = () => setShowNotesList(!showNotesList)

  const cls = {
  	container: [
			[
				"col-start-2 col-end-[-2]",
				"row-start-1 row-end-2",
				"grid grid-rows-1 grid-cols-[auto_50px] grid-flow-row",
			],
			[
				"border-l-1 border-r-1 border-border-primary",
				"sm:hidden",
			],
	  ],
	  text: [
	  	"bg-background-secondary",
	  	showNotesList && "text-accent-primary",
	  	"px-2",
			"whitespace-nowrap overflow-hidden text-ellipsis",
			"self-stretch flex items-center",
	  ],
	  iconContainer: [
	  	"self-stretch flex items-center justify-center bg-background-secondary",
			"border-l-1 border-border-primary",
			"z-11",
	  ],
	  icon: [
			showNotesList && "text-accent-primary",
			!showNotesList && "text-text-primary",
	  ],
  }

	return <button id="note-title" className={clsx(cls.container)} onClick={handleClick}>
			<span className={clsx(cls.text)}>{note.title}</span>
			<div className={clsx(cls.iconContainer)}>
				<Icon className={clsx(cls.icon)} />	
			</div>
			<div></div>
		</button>
}
