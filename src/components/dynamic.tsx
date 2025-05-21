"use client"
/*
All dynamic functions are logically basically client components.
*/
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import { usePathname } from "next/navigation"

export default function Dynamic() {
  const path = usePathname()
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
      if (href === path) {
        navbarItem.classList.add("active")
      } else {
        navbarItem.classList.remove("active")
      }
    })
  }, [path])

  return <></>
}

