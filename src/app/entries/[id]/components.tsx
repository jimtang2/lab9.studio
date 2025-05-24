"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function IndexButton() {
	const [ showIndex, setShowIndex ] = useState(false)

	useEffect(() => {
		if (showIndex) {
			document.querySelector("main")?.classList.add("show-index")
		} else {
			document.querySelector("main")?.classList.remove("show-index")
		}
	}, [showIndex])

	return (
		<button id="index-button" type="button" className="navigation-button" 
			onClick={() => setShowIndex(!showIndex)}>Index</button>)
}

export function ActiveEntryLink() {
	const currentPath = usePathname()
	useEffect(() => {
		document.querySelectorAll(".entries-list .entry-list-item").forEach(element => {
			if (element.getAttribute("href") === currentPath) {
				element.classList.add("active")
			}
		})
	}, [])
	return <></>
}

