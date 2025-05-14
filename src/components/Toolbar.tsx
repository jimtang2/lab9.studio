"use client"
import { useState, useEffect } from "react"
import { useMenuStore } from "@/lib/store"

export default function Toolbar({children,}: Readonly<{children: React.ReactNode;}>) {
	const [hydrated, setHydrated] = useState(false)
  const { show } = useMenuStore()

  useEffect(() => setHydrated(true), [])

	return (
		<div id="toolbar" className={`
			flex flex-row items-stretch justify-start
			sticky top-[0px] z-10
			h-[40px] min-h-[40px] max-h-[40px] 
			bg-background-lt
			border-b border-divider
			transition-width
			${show ? "w-[calc(100%-60px)]" : "w-full"}
		`}>{children}</div>)
}