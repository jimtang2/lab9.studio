"use client"
import { useStore } from "@/state/store"
import Icon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

interface LogoutButtonProps {
	className: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
	const {
		setSid,
		setLoginFormLoading,
	} = useStore(state => state)

	const cls = {
		button: [
			"whitespace-nowrap",
			"w-full min-w-full min-h-[50px]",
      "pl-4 pr-2",
      "flex flex-row items-center",
      "text-subtext hover:text-text",
			"transition-all duration-300",
			className,
		],
		text: [
			"flex-grow-1 text-left",
		],
		icon: [
		],
	}

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
    } catch (error) {
      console.error("Logout error:", error)
    }
    setLoginFormLoading(false)
	}	

	return <button className={clsx(cls.button)}
		onClick={handleClick} >
		<span className={clsx(cls.text)}>Logout</span>
		<Icon className={clsx(cls.icon)} />
	</button>
}