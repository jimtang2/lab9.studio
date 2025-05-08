"use client"
import Image from "next/image"
import { useEffect } from "react"
import { useSettingsStore } from "@/lib/store"


export default function GithubLink() {
	const { colorScheme, toggleColorScheme } = useSettingsStore()

	let svgIcon = colorScheme == "dark" ? "/heroicons/outline/sun.svg" : "/heroicons/outline/moon.svg"
	let svgAlt = colorScheme == "dark" ? "dark icon" : "light icon"

	useEffect(() => {
		if (colorScheme == "dark") {
			document.documentElement.classList.add("dark")
			document.documentElement.classList.remove("light")
		} else {
			document.documentElement.classList.add("light")
			document.documentElement.classList.remove("dark")
		}
	}, [colorScheme])

	return (
    <button className="
      flex flex-row 
      items-center 
      p-2 
      hover:bg-background-hl" 
      onClick={toggleColorScheme}>
      <Image
      	alt={svgAlt} 
        src={svgIcon}
        width={26} height={26} />
    </button>)
}