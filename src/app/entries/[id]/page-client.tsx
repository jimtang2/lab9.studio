"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ActiveEntriesListItemChecker() {
  const currentPath = usePathname()

  useEffect(() => {
    document.querySelectorAll(".entries-list .entry-list-item").forEach(element => {
      if (element.getAttribute("href") === currentPath) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    })
  }, [currentPath])

  return <></>
}