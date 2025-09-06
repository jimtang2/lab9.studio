"use client"
import { usePathname } from "next/navigation"
import { useStore } from "@/state/store"
import Link from "next/link"
import clsx from "clsx"
import Icon from "/public/heroicons/solid/document.svg"

export default function NavProfileButton() {
  const active = useStore(state => state.showNav)
  const path = usePathname()
  const current = path == "/profile"

  const cls = {
  	base: [
      current && [
        "text-selected-foreground bg-selected-background",
        "sm:rounded-md",
      ],
      "flex items-center justify-center",
      "sm:px-6",
      // "rounded-md",
	  ],
	  icon: "sm:hidden",
	  text: "not-sm:hidden",
  }

  return <Link id="nav-profile-btn" href="/profile" className={clsx(cls.base)} title="Profile">
  	<Icon className={clsx(cls.icon)} />
  	<span className={clsx(cls.text)}>Profile</span>
  </Link>
}
