"use client"
import { useMenuStore } from "@/lib/store"

export default function Toolbar({children,}: Readonly<{children: React.ReactNode;}>) {
  const { show } = useMenuStore()

	return (
		<div id="toolbar" className={`
			flex flex-row items-stretch justify-start
			w-screen h-[44px] top-[44px] z-20
			bg-background-hl
			border-b border-divider
			${show && "pr-[60px] sm:pr-[240px] transition-[padding-right]"}
		`}>{children}</div>)
}