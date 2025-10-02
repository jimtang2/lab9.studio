"use client"
import { useStore } from "@/state/store"
import Icon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

export default function SessionMenu() {
	const { showSession, showNav, } = useStore(state => state)

	const cls = {
		container: [
		  "absolute",
      "bottom-0 right-0",
      "sm:top-[calc(100%+2px)] sm:left-auto sm:right-0",
		  "w-min max-w-[360px]",
      "border-1 border-background",
      "bg-menu",
      "mx-1",
      "z-10",
      "sm:translate-x-0",
      // !showSession && "translate-x-0 translate-y-[-100%] sm:translate-x-0 sm:translate-y-[-50px] opacity-0",
      // showSession && "translate-x-0 translate-y-[-120%] sm:translate-y-0 opacity-100",
      // showSession ? "pointer-events-auto" : "pointer-events-none",
      showSession ? [
        "translate-x-[-44px] translate-y-[-100px]",
        "sm:translate-y-0",
        "pointer-events-auto",
        "opacity-100",
      ] : [
        "translate-x-0 translate-y-[-100px]",
        "sm:translate-x-0 sm:translate-y-[-50px]",
        "pointer-events-none",
        "opacity-0",
      ],
      showSession && !showNav && "hidden sm:flex",

      "transition-all duration-150",
		  "flex flex-col",
		],
	}
	return <div className={clsx(cls.container)}>
		<LogoutButton />
	</div>
}

function LogoutButton() {
	const { 
		setSid, 
		setLoginFormLoading,
		setUser,
		 } = useStore(state => state)

	const handleClick = async () => {
		setLoginFormLoading(true)
		try {
      const response = await fetch("/api/session", {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("Failed to log out")
      } 
      setSid("")
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
    setLoginFormLoading(false)
	}	

	const cls = {
		button: [
			"whitespace-nowrap",
			"w-full min-w-full",
      "flex flex-row items-center",
			"bg-control-background text-control-foreground",
		],
		text: "flex-grow-1 text-left text-sm/10 px-2",
		icon: [],
	}

	return <button className={clsx(cls.button)}
		onClick={handleClick} >
		<span className={clsx(cls.text)}>Logout</span>
		<Icon className={clsx(cls.icon)} />
	</button>
}