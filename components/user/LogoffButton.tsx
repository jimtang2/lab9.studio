"use client"
import { useStore } from "@/state/store"
import clsx from "clsx"

interface LogoffButtonProps {
	className: string;
}

export default function LogoffButton(props: LogoffButtonProps) {
	const setSid = useStore(state => state.setSid)

	const cls = {
		button: [
			"whitespace-nowrap",
			"hover:bg-background-ternary",
			"transition-all duration-300",
			props.className,
		],
	}

	const handleClick = async () => {
		try {
      const response = await fetch("/api/session", {
        method: "DELETE",
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error("Failed to log out")
      } else {
	      setSid("")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
	}	

	return <button className={clsx(cls.button)}
		onClick={handleClick}>Log Out</button>
}