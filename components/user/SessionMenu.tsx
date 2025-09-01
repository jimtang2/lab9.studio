"use client"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LogoffButton from "./LogoffButton"
import clsx from "clsx"

export default function SessionMenu() {
	const showSession = useStore(state => state.showSession)
  const [user, loading, error] = useSessionUser()
  const loggedIn = user?.name !== null
  const displayName = loggedIn ? user?.name : "Not Logged In"

	const cls = {
		container: [
			[
			  "absolute right-0 top-[calc(100%+1px)]",
			  !showSession && "translate-x-[50%] opacity-0",
			  showSession && "translate-x-[0px] opacity-100",
			  "transition-all duration-300",
			  // "w-[300px]",
			],
			[
			  "grid grid-cols-[min-content] grid-rows-[repeat(2,minmax(50px,auto))]",
			  "bg-background-secondary",
			  showSession ? "pointer-events-auto" : "pointer-events-none",
			],
		],
    title: [
      "col-start-1 col-span-1 row-start-1 row-span-1",
      "flex items-center",
			"whitespace-nowrap",
      "px-4",
      "bg-background-ternary text-text-secondary",
      "border-b-1 border-border-secondary",
    ],
		logoffButton: [
			"col-start-1 col-span-1 row-start-2 row-span-1",
      "flex items-center",
      "px-4",
		],
	}
	return <div className={clsx(cls.container)}>
		<div className={clsx(cls.title)}>Signed in [{displayName}]</div>
		<LogoffButton className={clsx(cls.logoffButton)} />
	</div>
}