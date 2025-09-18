"use client"
import { Note } from "@/db/schema"
import Icon from "/public/heroicons/solid/chevron-up-down.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function NoteTitle({ note, className="", }: { note: Note | null; className?: string; }) {
	const {
		showNotesList,
		setShowNotesList,
	} = useStore(state => state)
	const title = note?.title || "Select Note:"
  const cls = {
  	container: [
  		"flex flex-row items-center",
			"px-2",
			"border-b-1",
			showNotesList ? "text-accent border-background" : "bg-background text-text border-border",
			"transition-all duration-150",
			className,
	  ],
	  text: [
	  	"text-left",
			"whitespace-nowrap overflow-hidden text-ellipsis",
	  	"px-1",
	  	"flex-grow-1",
	  ],
  }

	return <button className={clsx(cls.container)} 
		id="note-title" 
		onClick={() => setShowNotesList(!showNotesList)}>
			<span className={clsx(cls.text)}>{title}</span>
			<Icon />
		</button>
}
