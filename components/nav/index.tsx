"use client"
import { useStore } from "@/state/store"
import NavToggle from "./NavToggle"
import HomeButton from "./HomeButton"
import NotesButton from "./NotesButton"
import clsx from "clsx"

export default function Nav() {
	const showNav = useStore(state => state.showNav)

  const cls = {
  	container: [
			[
				"col-start-1 col-end-2",
				"row-start-1 row-end-[-1]",
				"grid",
				"grid-cols-1 grid-rows-[50px_auto]",
				"z-10",
			],
			[
				"sm:col-start-1 sm:col-end-[-1]",
				"sm:row-start-1 sm:row-end-2",
				"sm:grid",
				"sm:grid-cols-1 sm:grid-rows-1",
				[
					"sm:border-b-1 sm:border-border-primary sm:border-r-0",					
				],
			],
		],
		items: [
			[
				"col-start-1 col-end-2",
				"row-start-2 row-end-3",
				"grid auto-rows-[50px]",
				"grid-flow-row",
			],
			[
				"sm:col-start-1 sm:col-end-[-1]",
				"sm:row-start-1 sm:row-end-[-1]",
				"sm:grid sm:grid-rows-1 sm:auto-cols-[min-content]",
				"sm:grid-flow-col",
			],
			[
				"border-r-1 border-border-primary",
				"sm:border-r-0",
			],
			[
				"transition-transform duration-300",
				showNav ? "translate-x-0" : "translate-x-[-100%]",
				"sm:translate-x-0",
			],
		],
  }

	return <div id="nav" className={clsx(cls.container)}>
		<NavToggle />
		<div id="nav-bar-items" className={clsx(cls.items)}>
			<HomeButton />
			<NotesButton />			
		</div>
	</div>
}
