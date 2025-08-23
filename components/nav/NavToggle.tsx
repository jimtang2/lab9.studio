"use client"
import Icon from "/public/heroicons/solid/bars-3.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function ListToggle() {
	const active = useStore(state => state.showNav)
	const setActive = useStore(state => state.setShowNav)
	const handleClick = () => setActive(!active)

	const cls = {
		button: [
	  	active ? [
	  		"bg-background-secondary",
	  	] : [
	  		"border-b-1 border-border-primary",
	  	],
	  	// "transition-all duration-300",
	    "flex items-center justify-center",
	  	[
	  		"col-start-1",
	  		"col-end-[-2]",
	  		"row-start-1 row-end-2",
	  	],
			"sm:hidden",
		],
		icon: [
	  	active ? [
	  		"text-accent-primary",
	  	] : [
	  		""
	  	],
	  	"transition-all duration-300",
		]
	}

	return <button className={clsx(cls.button)} onClick={handleClick}><Icon className={clsx(cls.icon)} /></button>
}