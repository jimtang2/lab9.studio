"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function AutoNoteActivator() {
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