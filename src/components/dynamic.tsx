"use client"
/*
All dynamic functions are logically basically client components.
*/
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import { usePathname } from "next/navigation"

export default function Dynamic() {
  const currentPath = usePathname()
  const { darkMode } = useSettings()

  // required for dark mode
  useEffect(() => {
    document.documentElement.classList.add(darkMode ? "dark" : "light")
    document.documentElement.classList.remove(darkMode ? "light" : "dark")
  }, [darkMode])

  // required for active navbar-item
  useEffect(() => {
    document.querySelectorAll("#navbar .navbar-item").forEach(navbarItem => {
      const href = navbarItem.getAttribute("href")
      if (href === currentPath) {
        navbarItem.classList.add("active")
      } else {
        navbarItem.classList.remove("active")
      }
    })
    const activeNavItem = document.querySelector("#navbar .navbar-item.active")
    if (activeNavItem === null) {
      let match = ""
      document.querySelectorAll("#navbar .navbar-item").forEach(navbarItem => {
        const href = navbarItem.getAttribute("href") as string
        if (currentPath.indexOf(href) > -1 && href.length > match.length) {
          match = href
        }
      })
      if (match.length > 0) {
        document.querySelectorAll("#navbar .navbar-item").forEach(navbarItem => {
          const href = navbarItem.getAttribute("href")
          if (href === match) {
            navbarItem.classList.add("active")
          }
        })        
      }
    }
  }, [currentPath])

  return <></>
}

