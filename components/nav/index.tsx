"use client"
import { useStore } from "@/state/store"
import NavToggleButton from "./NavToggleButton"
import NavHomeButton from "./NavHomeButton"
import NavNotesButton from "./NavNotesButton"
import NavProfileButton from "./NavProfileButton"
import clsx from "clsx"

export default function Nav({ className }: { className: string; }) {
	const showNav = useStore(state => state.showNav)

  const cls = {
  	bar: [
			[
				"grid grid-cols-1 grid-rows-[49px_auto]",
				"border-t-1 border-border",
				"z-10",
			],
			[
				"sm:grid-rows-1",
				"sm:border-b-1 sm:border-border sm:border-r-0",
			],
			className,
		],
		items: [
			[
				"col-start-1 col-span-1 row-start-2 row-end-[-1]",
			],
			[
				"sm:col-start-1 sm:col-span-1 sm:row-start-1 sm:row-span-1",
			],
			[
				"grid grid-rows-[repeat(3,50px)_auto_50px_100px]",
				"sm:grid sm:grid-rows-1 sm:grid-cols-[repeat(3,min-content)_auto_min-content]",
				"sm:grid-flow-col",
			],
			[
				showNav && "bg-menu",
				"sm:bg-menu",
				"border-r-1 border-border",
				"divide-y-1 divide-border",
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
			<NavProfileButton />
			<div></div>
		</div>
	</div>
}
