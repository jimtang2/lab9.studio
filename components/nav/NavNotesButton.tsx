"use client"
import { usePathname } from "next/navigation"
import { useStore } from "@/state/store"
import Link from "next/link"
import clsx from "clsx"
import Icon from "/public/heroicons/solid/newspaper.svg"

export default function NavNotesButton() {
  const active = useStore(state => state.showNav)
  const path = usePathname()
  const current = path.indexOf("/notes") == 0

  const cls = {
    base: [
      current && "text-selected-foreground bg-selected-background",
      "flex items-center justify-center",
      "sm:px-6",
    ],
    icon: "sm:hidden",
    text: "not-sm:hidden",
  }

  return <Link id="nav-notes-btn" href="/notes" className={clsx(cls.base)} title="Notes">
    <Icon className={clsx(cls.icon)} />
    <span className={clsx(cls.text)}>Notes</span>
  </Link>
}
