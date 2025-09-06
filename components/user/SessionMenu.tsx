"use client"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LogoutButton from "./LogoutButton"
import clsx from "clsx"

export default function SessionMenu() {
	const {
		showNav,
		showSession,
	} = useStore(state => state)
  const [user, loading, error] = useSessionUser()
  const loggedIn = user?.name !== null
  const displayName = loggedIn ? user?.name : "Not Logged In"

	const cls = {
		container: [
			[
			  "absolute right-0 top-[calc(100%-1px)]",
			  showSession && "translate-x-[0px] opacity-100",
			  showSession ? "pointer-events-auto" : "pointer-events-none",
			  !showSession && "translate-x-[50%] opacity-0",
			  showNav && "w-[calc(100vw-50px)]",
			  !showNav && "w-screen",
			  "sm:w-min",
			  "transition-all duration-300",
        "border-1 border-border",
			],
			[
			  "grid grid-cols-[min-content] grid-rows-[repeat(1,minmax(50px,auto))] grid-auto-col",
			  "bg-menu",
			],
		],
		logoutButton: [
		],
	}
	return <div className={clsx(cls.container)}>
		<LogoutButton className={clsx(cls.logoutButton)} />
	</div>
}