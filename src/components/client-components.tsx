"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import { usePathname } from "next/navigation"

import "./client-components.css"

export function ThemeToggleButton() {
  const { darkMode, setMode } = useSettings()
  const src = `/heroicons/${!darkMode ? "outline/sun" : "solid/moon"}.svg`
  const size = { width: 20, height: 20 }

  function toggleTheme() {
    setMode(document.documentElement.classList.contains("dark") ? "light" : "dark")
  }

  return (
    <button className="toolbar-button" type="button" onClick={toggleTheme}>
      <Image src={src} { ...size } alt="Theme" />
    </button>)
}

export function Dynamic() {
  const currentPath = usePathname()
  const { darkMode } = useSettings()

  // required for dark mode
  useEffect(() => {
    document.documentElement.classList.add(darkMode ? "dark" : "light")
    document.documentElement.classList.remove(darkMode ? "light" : "dark")
  }, [darkMode])

  // required for active toolbar-item
  useEffect(() => {
    document.querySelectorAll("#toolbar .toolbar-item").forEach(toolbarItem => {
      const href = toolbarItem.getAttribute("href")
      if (href === currentPath) {
        toolbarItem.classList.add("active")
      } else {
        toolbarItem.classList.remove("active")
      }
    })
    const activeNavItem = document.querySelector("#toolbar .toolbar-item.active")
    if (activeNavItem === null) {
      let match = ""
      document.querySelectorAll("#toolbar .toolbar-item").forEach(toolbarItem => {
        const href = toolbarItem.getAttribute("href") as string
        if (currentPath.indexOf(href) > -1 && href.length > match.length) {
          match = href
        }
      })
      if (match.length > 0) {
        document.querySelectorAll("#toolbar .toolbar-item").forEach(toolbarItem => {
          const href = toolbarItem.getAttribute("href")
          if (href === match) {
            toolbarItem.classList.add("active")
          }
        })        
      }
    }
  }, [currentPath])

  return <></>
}

