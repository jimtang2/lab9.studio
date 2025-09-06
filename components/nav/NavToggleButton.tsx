"use client"
import { useStore } from "@/state/store"
import Icon from "/public/heroicons/solid/bars-3.svg"
import clsx from "clsx"

export default function NavToggleButton() {
	const showNav = useStore(state => state.showNav)
	const setShowNav = useStore(state => state.setShowNav)
	const handleClick = () => setShowNav(!showNav)

	const cls = {
		button: [
	  	[
	  		"col-start-1 col-end-[-2] row-start-1 row-end-2",
	  	],
	  	[
	  		showNav && [
	  		  "text-selected-foreground bg-selected-background",
	  		  "sm:rounded-md",
	  		],
				!showNav && "bg-menu text-text",
	  		"border-1 border-t-0 border-border",
	  		"transition-all duration-300",
	  	],
	  	[
		    "flex items-center justify-center",
				"sm:hidden",
				"z-4",
				// "rounded-md",
	  	],
		],
		icon: [
			showNav ? "stroke-2" : "",
		]
	}

	return <button className={clsx(cls.button)} 
		 id="nav-toggle-btn"
		 onClick={handleClick}><Icon className={clsx(cls.icon)} />
		</button>
}