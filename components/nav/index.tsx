"use client"
import { useStore } from "@/state/store"
import NavButton from "./NavButton"
import UserButton from "./UserButton"
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
  		"flex flex-col sm:flex-row",
  		"h-full w-[50px] sm:h-[50px] sm:w-full",
  		"border-border border-r-1 sm:border-b-1 sm:border-r-0",
  		"px-1 pt-0 pb-29 sm:px-1 sm:py-1",
  		"bg-background",
			className,
		],
		button: [
			"h-[calc(50px-2*var(--spacing))] sm:h-full",
			"mt-1 sm:mt-0",
		],
		toggle: [
			"sm:hidden",
			"hidden",
		],
		separator: [
			"h-1 mb-1 border-b-1 border-border",
			"flex-grow-1 sm:border-none sm:m-0",
		],
  }

	return <div id="nav" className={clsx(cls.bar)}>
		<NavButton 
		  id={"nav-menu-toggle-btn"}
		  onClick={() => setShowNav(!showNav)}
		  className={clsx([cls.button, cls.toggle])}
		  icon={<MenuToggleIcon />}
		  active={showNav} />
		<NavButton 
		  className={clsx(cls.button)}
		  id={"nav-home-btn"}
		  href={"/"}
		  title={"lab9.studio"}
		  icon={<HomeIcon />} />
		<NavButton 
		  className={clsx(cls.button)}
		  id={"nav-notes-btn"}
		  href={"/notes"}
		  title={"Notes"}
		  icon={<NotesIcon />} />
		<NavButton 
		  className={clsx(cls.button)}
		  id={"nav-profile-btn"}
		  href={"/profile"}
		  title={"Profile"}
		  icon={<ProfileIcon />} />
		<div className={clsx(cls.separator)}></div>
		<UserButton id={"nav-user-btn"} />
	</div>
}
