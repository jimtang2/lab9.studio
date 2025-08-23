"use client"
import Icon from "/public/heroicons/solid/chevron-double-down.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function ListToggle() {
	const showNotesList = useStore(state => state.showNotesList)
	const setShowNotesList = useStore(state => state.setShowNotesList)
	const handleClick = () => setShowNotesList(!showNotesList)
	const cls = {
		button: [
	  	showNotesList ? [
	  		"bg-background-secondary",
	  	] : [
	  		"",
	  	],
	  	"border-b-1 border-r-1 border-border-primary",
	  	"transition-all duration-300",
	    "flex items-center justify-center",
	  	[
	  		"col-start-[-2] col-end-[-1]",
	  		"row-start-1 row-end-2",
	  	],
			"sm:hidden",
		],
		icon: [
	  	showNotesList ? [
	  		"rotate-90",
	  		"text-accent-primary",
	  	] : [
	  		"rotate-0",
	  	],
	  	"transition-all duration-300",
		]
	}

	return <button className={clsx(cls.button)} onClick={handleClick}><Icon className={clsx(cls.icon)} /></button>
}