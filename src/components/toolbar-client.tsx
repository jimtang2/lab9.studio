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

export function EntriesToolbarButton() {
  const [ showDropdown, setShowDropdown ] = useState(false)
  const currentPath = usePathname()
  
  // use Link on > md layout
  const linkProps = {
    className: "toolbar-item-control", 
    href: "/entries",
  }

  // use button on < md layout
  const buttonProps = {
    className: "toolbar-item-control", 
    onClick: () => {
      setShowDropdown(!showDropdown)
    },
  }

  useEffect(() => {
    if (showDropdown) {
      document.querySelector("#entries-toolbar-dropdown")?.classList.add("show")
      document.querySelector("#entries-toolbar-button")?.classList.add("expand")  
    } else {
      document.querySelector("#entries-toolbar-dropdown")?.classList.remove("show")
      document.querySelector("#entries-toolbar-button")?.classList.remove("expand")
    }
  }, [showDropdown])

  useEffect(() => {
    if (showDropdown) {
      setShowDropdown(false)
    }
  }, [currentPath])

  return (
    <div id="entries-toolbar-button" className="toolbar-item">
      <Link {...linkProps}>Entries</Link>
      <button type="button" {...buttonProps}>
        <span>Entries</span><ChevronSVG />
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

// highlight active toolbar entries dropdown item
export function ActiveToolbarDropdownItemChecker() {
  const currentPath = usePathname()

  useEffect(() => {
    document.querySelectorAll("#entries-toolbar-dropdown .entries-toolbar-dropdown-item").forEach(element => {
      if (element.getAttribute("href") === currentPath) {
        element.classList.add("active")
      } else {
        element.classList.remove("active")
      }
    })
  }, [currentPath])

  return <></>
}

// highlight active toolbar item
export function ActiveToolbarItemChecker() {
  const currentPath = usePathname()

  useEffect(() => {
    const logo = document.querySelector("#logo")
    if (currentPath === "/") {
      logo?.classList.add("active")
    } else {
      logo?.classList.remove("active")
    }
    const entries = document.querySelector("#entries-toolbar-button")
    if (currentPath.indexOf("/entries") > -1) {
      entries?.classList.add("active")
    } else {
      entries?.classList.remove("active")
    }
  }, [currentPath])

  return <></>
}
