"use client"
import { useMenuStore } from "@/lib/store"

export default function Toolbar({children,}: Readonly<{children: React.ReactNode;}>) {
  const { show } = useMenuStore()

	return (
		<div id="toolbar" className={`
			flex flex-row items-stretch justify-start
			sticky top-[44px] z-10
			h-[40px] min-h-[40px] max-h-[40px] 
			bg-background-hl
			border-b border-divider
		`}>{children}</div>)
}