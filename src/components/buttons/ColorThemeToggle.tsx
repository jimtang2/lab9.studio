"use client"
import Image from "next/image"
import { useSettingsStore } from "@/lib/store"

export default function ColorThemeToggle() {
	const { darkMode, toggle } = useSettingsStore()
	let icon = darkMode ? "/heroicons/outline/sun.svg" : "/heroicons/outline/moon.svg"
	let size = 26

	return (
    <button className="
    	hidden
      flex flex-row 
      items-center 
      p-2 
      hover:bg-background-hl" 
      onClick={() => toggle("darkMode")}>
      <Image
      	alt={"dark mode"} 
        src={icon}
        width={size} 
        height={size} />
    </button>)
}