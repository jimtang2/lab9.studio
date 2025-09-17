"use client"
import { useStore } from "@/state/store"
import NavButton from "./NavButton"
import UserButton from "./UserButton"
import MenuToggleIcon from "/public/heroicons/solid/bars-3.svg"
import HomeIcon from "/public/heroicons/solid/home.svg"
import DataIcon from "/public/heroicons/solid/circle-stack.svg"
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
  		"flex flex-col sm:flex-row sm:items-center",
  		"h-full w-[50px] sm:h-[44px] sm:w-full",
  		"border-border border-1",
  		"px-1 pt-0 sm:px-1 sm:py-[2px]",
			"gap-y-1 divide-y-1 divide-border",
  		"sm:gap-x-[2px] sm:divide-x-1 sm:divide-border",
  		"bg-background",
			className,
		],
		button: [
			"h-[calc(44px-2*var(--spacing))] sm:h-full",
		],
		toggle: [
			"sm:hidden",
			"hidden",
		],
		separator: [
			"h-1 mb-1 border-b-1 border-border",
			"flex-grow-1 sm:border-none sm:m-0",
		],
		userBtn: [
			"mb-20 sm:mb-0",
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
		  id={"nav-data-btn"}
		  href={"/data"}
		  title={"Data"}
		  icon={<DataIcon />} />
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
		<UserButton className={clsx(cls.button, cls.userBtn)} id={"nav-user-btn"} />
	</div>
}
