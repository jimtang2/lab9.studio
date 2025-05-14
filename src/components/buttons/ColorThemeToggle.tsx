"use client"
import Image from "next/image"
import { useSettingsStore } from "@/lib/store"

export default function ColorThemeToggle() {
	const { darkMode, toggle } = useSettingsStore()

	return (
    <button className="flex flex-row items-center p-2 " 
      onClick={() => toggle("darkMode")}>
      <Image
      	alt={"dark mode"} 
        src={darkMode ? "/heroicons/outline/sun.svg" : "/heroicons/outline/moon.svg"}
        width={26} 
        height={26} />
    </button>)
}