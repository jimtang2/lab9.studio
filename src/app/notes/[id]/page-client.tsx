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

export function HighlightActiveDropdownItem() {
  const currentPath = usePathname()

  function updateToolbarDropdownActiveItem() {
    document.querySelectorAll("#notes-toolbar-dropdown .notes-toolbar-dropdown-item").forEach(element => {
      if (element.getAttribute("href") === currentPath) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    })
  }

  useEffect(() => {
    updateToolbarDropdownActiveItem()
  }, [currentPath])
  
  return <></>
}