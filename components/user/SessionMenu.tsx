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
			  "w-[calc(100vw-50px)] sm:w-min min-w-full",
        "border-1 border-border",
			  [
			  	showSession && [
			  		"translate-y-[0px] opacity-100",
			  		"pointer-events-auto",
			  	],
			  	!showSession && [
			  		"translate-y-[-50%] opacity-0",
			  		"pointer-events-none",
			  	],
			  	"transition-all duration-150",			  	
			  ],
			],
			[
			  "flex flex-col",
			  "bg-background",
			],
		],
		logoutButton: [
		],
	}
	return <div className={clsx(cls.container)}>
		<LogoutButton className={clsx(cls.logoutButton)} />
	</div>
}