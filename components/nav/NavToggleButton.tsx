"use client"
import { useStore } from "@/state/store"
import Icon from "/public/heroicons/solid/bars-3.svg"
import clsx from "clsx"

export default function NavToggleButton() {
	const {
		showNav,
		setShowNav,
	} = useStore(state => state)

	const cls = {
		button: [
	  	"col-start-1 col-end-[-2] row-start-1 row-end-2",
  		"border-1 border-t-0 border-border",
  		showNav && [
  		  "text-accent bg-background",
  		  "sm:rounded-md",
  		],
			!showNav && "bg-menu text-subtext hover:text-text",
			"transition-all duration-300",
	    "flex items-center justify-center",
			"sm:hidden",
			"z-4",
		],
		icon: [
			showNav && "stroke-2",
		]
	}

	return <button className={clsx(cls.button)} 
		 id="nav-toggle-btn"
		 onClick={() => setShowNav(!showNav)}>
		 <Icon className={clsx(cls.icon)} />
		</button>
}