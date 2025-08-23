"use client"
import { usePathname } from "next/navigation"
import { useStore } from "@/state/store"
import Link from "next/link"
import clsx from "clsx"
import Icon from "/public/heroicons/solid/pencil.svg"

export default function NotesButton() {
  const active = useStore(state => state.showNav)
  const path = usePathname()
  const current = path.indexOf("/notes") == 0

  const cls = {
    base: [
      // active ? "block" : "not-sm:hidden",
      current && "bg-background-secondary text-accent-secondary font-bold",
      "transition-all duration-300",
      // "col-start-1 col-end-2 row-start-3 row-end-4",
      // "sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2",
      "sm:px-6",
      "flex items-center justify-center",
    ],
    icon: "sm:hidden",
    text: "not-sm:hidden",
  }

  return <Link id="nav-notes-btn" href="/notes" className={clsx(cls.base)} title="Notes">
    <Icon className={clsx(cls.icon)} />
    <span className={clsx(cls.text)}>Notes</span>
  </Link>
}
