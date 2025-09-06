"use client"
import { useState } from "react"
import { useStore } from "@/state/store"
import Icon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

interface LogoutButtonProps {
	className: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
	const [ hovered, setHovered ] = useState(false)
	const {
		setSid,
		setLoginFormLoading,
	} = useStore(state => state)

	const cls = {
		button: [
			"whitespace-nowrap",
      "pl-4 pr-2",
      "flex items-center",
      "hover:text-accent",
			"transition-all duration-300",
			className,
		],
		text: [
			"flex-grow-1",
			"text-left",
		],
		icon: [
			hovered && "animate-pulse",
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
		onClick={handleClick}
		onMouseOver={() => setHovered(true)}
		onMouseOut={() => setHovered(false)}>
		<span className={clsx(cls.text)}>Logout</span>
		<Icon className={clsx(cls.icon)} />
	</button>
}