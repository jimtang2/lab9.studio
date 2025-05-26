"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function HighlightActiveListItem() {
  const currentPath = usePathname()

  useEffect(() => {
    document.querySelectorAll(".notes-list .note-list-item").forEach(element => {
      if (element.getAttribute("href") === currentPath) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    })
  }, [currentPath])

  return <></>
}

export function MinimizeNotesDropdown() {
  useEffect(() => {
    const dropdown = document.querySelector("#notes-toolbar-dropdown")
    const button = document.querySelector("#notes-toolbar-button button.toolbar-item-control")
    if (dropdown?.classList.contains("show")) button?.click()
  }, [])

  return <></>
}