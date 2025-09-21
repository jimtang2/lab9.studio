"use client"
import { useStore } from "@/state/store"
import NavButton from "./NavButton"
import UserButton from "./UserButton"
import MenuToggleIcon from "/public/heroicons/solid/bars-3.svg"
import HomeIcon from "/public/heroicons/solid/home.svg"
import ChartIcon from "/public/heroicons/solid/chart-pie.svg"
import NotesIcon from "/public/heroicons/solid/document.svg"
import ProfileIcon from "/public/heroicons/solid/academic-cap.svg"
import clsx from "clsx"

export default function Nav({ className }: { className: string; }) {
	const {
		showNav,
		setShowNav,
	} = useStore(state => state)

  const cls = {
  	bar: [
  		"flex flex-col sm:flex-row sm:items-center",
  		"h-full max-h-screen w-[50px] sm:h-[44px] sm:w-full",
  		// "border-border border-t-0 border-l-0 border-b-0 border-1",
  		"px-1 pb-25 sm:py-[2px] sm:pb-0",
			"gap-y-1 divide-y-1 sm:divide-y-0 divide-border",
  		"sm:gap-x-[2px] sm:divide-x-1 sm:divide-border",
  		"bg-background",
			className,
		],
		button: [
      "h-[44px] w-[44px] sm:h-full sm:w-fit",
      "sm:px-4",
		],
		toggle: [
			"sm:hidden",
			"hidden",
		],
		placeholder: [
			"flex-grow-1 h-0",
		],
		userBtn: [
			"order-999",
			// "place-self-stretch",
			// "justify-self-end",
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
		  id={"nav-charts-btn"}
		  href={"/charts"}
		  title={"Charts"}
		  icon={<ChartIcon />} />
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
		 <div className={clsx(cls.placeholder)}></div>
		<UserButton className={clsx(cls.button, cls.userBtn)} id={"nav-user-btn"} />
	</div>
}
