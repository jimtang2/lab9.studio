"use client"
import Image from "next/image"
import { useEffect } from "react"
import { useStore } from "@/lib/store"


export default function GithubLink() {
	const { colorScheme, toggleColorScheme } = useStore()

	let svgIcon = colorScheme == "dark" ? "sun.svg" : "moon.svg"
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

	const handleClick = () => {
		toggleColorScheme()
	}

	return (
    <button className="
      flex flex-row 
      items-center 
      p-2 
      hover:bg-background-hl
      rounded-sm" 
      onClick={handleClick}>
      <Image
      	alt={svgAlt} 
        src={svgIcon}
        width={26} height={26} />
    </button>)
}