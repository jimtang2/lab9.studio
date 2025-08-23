"use client"
import { useStore } from "@/state/store"
import clsx from "clsx"

export default function Main({ children }: Readonly<{ children: React.ReactNode; }>) {
	const active = useStore(state => state.showNav)
	const cls = [
    [
      "col-start-1 col-end-[-1]",
      "row-start-1 row-end-[-1]",
    ],
    [
      "sm:col-start-1 sm:col-end-[-1]",
      "sm:row-start-2 sm:row-end-[-1]",
    ],
    "overflow-hidden",
  ]

	return <main id="main" className={clsx(cls)}>{children}</main>
}