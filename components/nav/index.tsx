"use client"
import { useStore } from "@/state/store"
import NavButton from "./NavButton"
import MenuToggleIcon from "/public/heroicons/solid/bars-3.svg"
import HomeIcon from "/public/heroicons/solid/home.svg"
import NotesIcon from "/public/heroicons/solid/newspaper.svg"
import ProfileIcon from "/public/heroicons/solid/document.svg"
import clsx from "clsx"

export default function Nav({ className }: { className: string; }) {
	const {
		showNav,
		setShowNav,
	} = useStore(state => state)

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
				"sm:px-1",
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
				"transition-all duration-150",
			],
		],
		toggle: [
	  	"col-start-1 col-end-[-2] row-start-1 row-end-2",
  		"border-1 border-t-0 border-border",
			"transition-all duration-150",
			"sm:hidden",
			// "z-20",
		],
  }

  const handleClickMenuToggle = () => {
  	setShowNav(!showNav)
  }

	return <div id="nav" className={clsx(cls.bar)}>
		<NavButton 
		  id={"nav-menu-toggle-btn"}
		  onClick={handleClickMenuToggle}
		  className={clsx(cls.toggle)}
		  icon={<MenuToggleIcon />}
		  active={showNav} />

		<div id="nav-bar-items" className={clsx(cls.items)}>
			<NavButton 
			  id={"nav-home-btn"}
			  href={"/"}
			  title={"lab9.studio"}
			  icon={<HomeIcon />} />
			<NavButton 
			  id={"nav-notes-btn"}
			  href={"/notes"}
			  title={"Notes"}
			  icon={<NotesIcon />} />
			<NavButton 
			  id={"nav-profile-btn"}
			  href={"/profile"}
			  title={"Profile"}
			  icon={<ProfileIcon />} />
			<div></div>
		</div>
	</div>
}
