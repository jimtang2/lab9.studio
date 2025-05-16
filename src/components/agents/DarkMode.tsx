"use client"
import { useEffect } from "react"
import { useSettingsStore } from "@/lib/store"

export default function DarkMode() {
	const { darkMode, toggle } = useSettingsStore()

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark")
			document.documentElement.classList.remove("light")
		} else {
			document.documentElement.classList.remove("dark")
			document.documentElement.classList.add("light")
		}
	}, [darkMode])

	return <></>
}