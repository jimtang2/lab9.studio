"use client"
import { Note } from "@/db/schema"
import Icon from "/public/heroicons/solid/chevron-up-down.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function NoteTitle({ note }: { note: Note }) {
	const showNav = useStore(state => state.showNav)
	const setShowNav = useStore(state => state.setShowNav)
	const showNotesList = useStore(state => state.showNotesList)
	const setShowNotesList = useStore(state => state.setShowNotesList)

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

  const handleClick = () => {
  	// setShowNav(!showNotesList)
  	setShowNotesList(!showNotesList)
  }

	return <button id="note-title" className={clsx(cls.container)} onClick={handleClick}>
			<span className={clsx(cls.text)}>{note.title}</span>
			<div className={clsx(cls.iconContainer)}>
				<Icon className={clsx(cls.icon)} />	
			</div>
			<div></div>
		</button>
}
