"use client"
import { useStore } from "@/state/store"
import HomeButton from "./HomeButton"
import NotesButton from "./NotesButton"
import LoginButton from "@/components/login/LoginButton"
import Icon from "/public/heroicons/solid/bars-3.svg"
import clsx from "clsx"

export default function Nav() {
	const showNav = useStore(state => state.showNav)

  const cls = {
  	bar: [
			[
				"col-start-1 col-end-2",
				"row-start-1 row-end-[-1]",
				"sm:col-start-1 sm:col-end-[-1]",
				"sm:row-start-1 sm:row-end-2",
			],
			[
				"grid grid-cols-1 grid-rows-[50px_auto]",
				"sm:grid sm:grid-cols-1 sm:grid-rows-1",
				"z-10",
				"sm:border-b-1 sm:border-border-primary sm:border-r-0",					
			],
		],
		items: [
			[
				"col-start-1 col-end-2",
				"row-start-2 row-end-3",
				"sm:col-start-1 sm:col-end-[-1]",
				"sm:row-start-1 sm:row-end-[-1]",
			],
			[
				"grid grid-rows-[repeat(2,50px)_auto_50px_100px]",
				"sm:grid sm:grid-rows-1 sm:grid-cols-[repeat(2,min-content)_auto_min-content]",
				"sm:grid-flow-col",
			],
			[
				showNav && "bg-background-secondary",
				"sm:bg-background-primary",
				"border-r-1 border-border-primary",
				"divide-y-1 divide-border-primary",
				"sm:border-r-0",
				"sm:divide-x-1 sm:divide-y-0",
			],
			[
				showNav ? "translate-x-0" : "translate-x-[-100%]",
				"sm:translate-x-0",
				"transition-transform duration-300",
			],
		],
  }

	return <div id="nav" className={clsx(cls.bar)}>
		<ToggleButton />
		<div id="nav-bar-items" className={clsx(cls.items)}>
			<HomeButton />
			<NotesButton />
			<div></div>
		</div>
	</div>
}

function ToggleButton() {
	const showNav = useStore(state => state.showNav)
	const setShowNav = useStore(state => state.setShowNav)
	const handleClick = () => setShowNav(!showNav)

	const cls = {
		button: [
	  	[
	  		"col-start-1 col-end-[-2]",
	  		"row-start-1 row-end-2",
	  	],
	  	[
				"hover:bg-background-ternary",
				showNav && "bg-background-ternary",
				!showNav && "bg-background-secondary",
	  		"border-b-1 border-border-primary",
		    "flex items-center justify-center",
				"sm:hidden",
				"z-4",
	  	],
	  	[
	  		"transition-all duration-300",
	  	],
		],
		icon: [
			"hover:text-accent-ternary",
	  	showNav && [
	  		"text-accent-primary",
	  	],
	  	!showNav && [],
		]
	}

	return <button className={clsx(cls.button)} onClick={handleClick}><Icon className={clsx(cls.icon)} /></button>
}