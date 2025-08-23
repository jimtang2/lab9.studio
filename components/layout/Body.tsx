// "use client"
// import { useStore } from "@/state/store"
import clsx from "clsx"

export default function Body({ children }: Readonly<{ children: React.ReactNode; }>) {
	// const active = useStore(state => state.showNav)

	const cls = [
    "bg-background-primary", 
    "h-screen w-screen",
    "grid overflow-hidden",
    // 50px width side nav on mobile
    [
      "grid-cols-[50px_auto]",
      "grid-rows-[50px_auto]",
    ],
    // 50px height top nav on desktop
    [
      "sm:grid-cols-1",
      "sm:grid-rows-[50px_auto]",  
    ],
  ]


	return <body id="body" className={clsx(cls)}>{children}</body>
}