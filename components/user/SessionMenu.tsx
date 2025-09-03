"use client"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LogoutButton from "./LogoutButton"
import clsx from "clsx"

export default function SessionMenu() {
	const showSession = useStore(state => state.showSession)
  const [user, loading, error] = useSessionUser()
  const loggedIn = user?.name !== null
  const displayName = loggedIn ? user?.name : "Not Logged In"

	const cls = {
		container: [
			[
			  "absolute right-0 top-[100%]",
			  !showSession && "translate-x-[50%] opacity-0",
			  showSession && "translate-x-[0px] opacity-100",
			  "transition-all duration-300",
			  "shadow-xl",
			],
			[
			  "grid grid-cols-[min-content] grid-rows-[repeat(1,minmax(50px,auto))] grid-auto-col",
			  "bg-menu",
			  showSession ? "pointer-events-auto" : "pointer-events-none",
			],
		],
		logoutButton: [
		],
	}
	return <div className={clsx(cls.container)}>
		<LogoutButton className={clsx(cls.logoutButton)} />
	</div>
}