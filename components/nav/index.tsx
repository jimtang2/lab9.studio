"use client"
import { useStore } from "@/state/store"
import NavToggleButton from "./NavToggleButton"
import NavHomeButton from "./NavHomeButton"
import NavNotesButton from "./NavNotesButton"
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
				showNav ? "translate-x-0 opacity-100" : "translate-x-[-50%] opacity-0",
				"sm:translate-x-0 sm:opacity-100",
				"transition-all duration-300",
			],
		],
  }

	return <div id="nav" className={clsx(cls.bar)}>
		<NavToggleButton />
		<div id="nav-bar-items" className={clsx(cls.items)}>
			<NavHomeButton />
			<NavNotesButton />
			<div></div>
		</div>
	</div>
}
