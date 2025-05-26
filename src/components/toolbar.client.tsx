"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import "@/css/toolbar.css"

function ChevronSVG() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.5 5.65257C4.5 4.22644 6.029 3.32239 7.2786 4.00967L18.8192 10.357C20.1144 11.0694 20.1144 12.9304 18.8192 13.6428L7.2786 19.9901C6.029 20.6774 4.5 19.7733 4.5 18.3472V5.65257Z" fill="currentColor"/></svg>
}

export function NotesButton() {
  const [ showDropdown, setShowDropdown ] = useState(false)
  
  useEffect(() => {
    if (!showDropdown) {
      document.querySelector("#notes-toolbar-dropdown")?.classList.remove("show")
      document.querySelector("#notes-toolbar-button")?.classList.remove("expand")
    } else {
      document.querySelector("#notes-toolbar-dropdown")?.classList.add("show")
      document.querySelector("#notes-toolbar-button")?.classList.add("expand")
    }
  }, [showDropdown])

  return (
    <div id="notes-toolbar-button" className="toolbar-item">
      <Link className="toolbar-item-control" href="/notes">Notes</Link>
      <button type="button" className="toolbar-item-control" onClick={() => setShowDropdown(!showDropdown)}>
        <span>Notes</span><ChevronSVG />
      </button>
      
    </div>
    )
}

export function ThemeToolbarButton() {
  const { darkMode, setMode } = useSettings()

  useEffect(() => {
    document.documentElement.classList.add(darkMode ? "dark" : "light")
    document.documentElement.classList.remove(darkMode ? "light" : "dark")
  }, [darkMode])

  return (
    <button type="button" id="theme-toolbar-button" className="toolbar-button" onClick={() => setMode(darkMode ? "light" : "dark")}>
      <Image width={20} height={20} src={`/heroicons/${!darkMode ? "outline/sun" : "solid/moon"}.svg`} alt="Theme" />
    </button>)
}

export function HighlightActiveToolbarItem() {
  const currentPath = usePathname()

  function updateToolbarActiveItem() {
    if (currentPath === "/") {
      document.querySelector("#logo")?.classList.add("active")
    } else {
      document.querySelector("#logo")?.classList.remove("active")
    }
    
    if (currentPath.indexOf("/notes") > -1) {
      document.querySelector("#notes-toolbar-button")?.classList.add("active")
    } else {
      document.querySelector("#notes-toolbar-button")?.classList.remove("active")
    }
  }

  useEffect(() => {
    updateToolbarActiveItem()
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