"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import "./toolbar.css"

function ChevronSVG() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.5 5.65257C4.5 4.22644 6.029 3.32239 7.2786 4.00967L18.8192 10.357C20.1144 11.0694 20.1144 12.9304 18.8192 13.6428L7.2786 19.9901C6.029 20.6774 4.5 19.7733 4.5 18.3472V5.65257Z" fill="currentColor"/></svg>
}

export function NotesButton() {
  const [ showDropdown, setShowDropdown ] = useState(false)
  const currentPath = usePathname()
  
  // use Link on > md layout
  const linkProps = {
    className: "toolbar-item-control", 
    href: "/notes",
  }

  // use button on < md layout
  const buttonProps = {
    className: "toolbar-item-control", 
    onClick: () => {
      setShowDropdown(!showDropdown)
    },
  }

  useEffect(() => {
    if (!showDropdown) {
      document.querySelector("#notes-toolbar-dropdown")?.classList.remove("show")
      document.querySelector("#notes-toolbar-button")?.classList.remove("expand")
      document.querySelector("#notes-toolbar-button")?.classList.remove("active")
    }

    document.querySelectorAll("#notes-toolbar-dropdown .notes-toolbar-dropdown-item").forEach(element => {
      if (element.getAttribute("href") === currentPath) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    })

    const logoItem = document.querySelector("#logo")
    if (currentPath === "/") {
      logoItem?.classList.add("active")
    } else {
      logoItem?.classList.remove("active")
    }
    const notesItem = document.querySelector("#notes-toolbar-button")
    if (currentPath.indexOf("/notes") > -1) {
      notesItem?.classList.add("active")
    } else {
      notesItem?.classList.remove("active")
    }

    if (showDropdown) {
      document.querySelector("#notes-toolbar-dropdown")?.classList.add("show")
      document.querySelector("#notes-toolbar-button")?.classList.add("expand")  
      document.querySelector("#notes-toolbar-button")?.classList.add("active")
    } 

  }, [showDropdown, currentPath])

  useEffect(() => {
    if (showDropdown) {
      setShowDropdown(false)
    }
  }, [currentPath])

  return (
    <div id="notes-toolbar-button" className="toolbar-item">
      <Link {...linkProps}>Notes</Link>
      <button type="button" {...buttonProps}>
        <span>Notes</span><ChevronSVG />
      </button>
    </div>
    )
}

export function ThemeToolbarButton() {
  const { darkMode, setMode } = useSettings()

  const buttonProps = {
    id: "theme-toolbar-button", 
    className: "toolbar-button", 
    onClick: () => {
      setMode(document.documentElement.classList.contains("dark") ? "light" : "dark")
    },
  }
  const imageProps = {
    width: 20, 
    height: 20,
    src: `/heroicons/${!darkMode ? "outline/sun" : "solid/moon"}.svg`,
    alt: "Theme",
  }

  function updateDOM(isDarkMode: boolean) {
    document.documentElement.classList.add(isDarkMode ? "dark" : "light")
    document.documentElement.classList.remove(isDarkMode ? "light" : "dark")
  }

  useEffect(() => updateDOM(darkMode), [darkMode])

  return (
    <button type="button" {...buttonProps}>
      <Image {...imageProps} />
    </button>)
}
