"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import {  useSettings, useNotifications } from "@/lib/state"
import "./bar.css"

function toggleLeftBar() {
  document.body.classList.toggle("show-left-bar")
}
function toggleRightBar() {
  document.body.classList.toggle("show-right-bar")
}

export function Toolbar({ className }: { className: string}) {
  const { darkMode, setMode } = useSettings()
  const icons = {
    menu: `/heroicons/solid/bars-4.svg`,
    darkMode: `/heroicons/${!darkMode ? "outline/sun" : "solid/moon"}.svg`,
    notifications: `/heroicons/${!darkMode ? "outline" : "solid"}/inbox.svg`,
  }
  const size = {
    width: 20,
    height: 20,
  }
  function toggleTheme() {
    setMode(document.documentElement.classList.contains("dark") ? "light" : "dark")
  }

  return (
    <div id="toolbar" className={className}>
      <button className="toolbar-button" type="button" onClick={toggleLeftBar}>
        <Image src={icons.menu} {...size} alt="Menu" />
      </button>
      <button className="logo left-bar-toggle" onClick={toggleLeftBar} type="button">lab9.studio</button>
      <span className="flex-grow-1"></span>
      <button className="toolbar-button" type="button" onClick={toggleTheme}>
        <Image src={icons.darkMode} {...size} alt="Theme" />
      </button>
      {/*<Link href="https://github.com/jimtang2/lab9.studio">
        <Image alt="Github" src="/logos/github-icon.svg" width={24} height={24} />
      </Link>*/}
      <button className="toolbar-button right-bar-toggle" type="button" onClick={toggleRightBar}>
        <Image src={icons.notifications} {...size} alt="Notifications" />
        <NotificationCountBadge />
      </button>
    </div>)
}

export function NotificationCountBadge() {
  const { notifications } = useNotifications()
  const count = notifications.filter(notification => notification.isRead !== true).length

  return (
    <div className={`notification-count-badge ${count === 0 ? "" : "show"}`}>{count}</div>)  
}

export function Navbar({ className }: { className: string }) {
  const { darkMode } = useSettings()
  const icons = {
    home: `/heroicons/${darkMode ? "solid" : "outline"}/home.svg`,
    entries: `/heroicons/${darkMode ? "solid" : "outline"}/document-text.svg`,
    help: `/heroicons/${darkMode ? "solid" : "outline"}/question-mark-circle.svg`,
    settings: `/heroicons/${darkMode ? "solid" : "outline"}/cog.svg`,
    minimize: `/heroicons/solid/x-mark.svg`,
  }
  const size = {
    width: 18,
    height: 18,
  }

  return (
    <div id="navbar" className={className}>
      <Link className="navbar-item" href="/">
        <Image alt="Home" src={icons.home} {...size} />
        <span>Home</span>
      </Link>
      <Link className="navbar-item" href="/entries">
        <Image alt="Entries" src={icons.entries} {...size} />
        <span>Entries</span>
      </Link>
      <Link className="navbar-item" href="/help">
        <Image alt="Help" src={icons.help} {...size} />
        <span>Help</span>
      </Link>
      <Link className="navbar-item" href="/settings">
        <Image alt="Settings" src={icons.settings} {...size} />
        <span>Settings</span>
      </Link>
    </div>
  )
}

function fmtDate(date: Date | string ): string {
  return z
    .union([z.string(), z.date()])
    .transform((val) => {
      const date = typeof val === 'string' ? new Date(val) : val
      return isNaN(date.getTime()) ? '' : date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    }).parse(date)
}

export function Notifications({ className }: { className: string}) {  
  const { notifications } = useNotifications()
  const [ hydrated, setHydrated ] = useState(false)
  const icons = {
    minimize: `/heroicons/solid/x-mark.svg`,
  }
  const size = {
    width: 20,
    height: 20,
  }
  const unreadNotifications = notifications.filter((notification) => notification.isRead !== true)
  useEffect(() => setHydrated(true), [])
  // render notifications only after hydration since notifications are loaded from persistent state
  if (!hydrated) {
    return (<div id="notifications" className={className}></div>)
  }
  return (
    <div id="notifications" className={className}>
      {notifications
        .map((props, idx) => 
          <NotificationCard key={`${idx}.${fmtDate(props.date)}`} {...{...props, ...{index: idx}}} />)}
    </div>)
}

function NotificationCard({ title, message, isRead, date, index }: {
  title: string 
  message: string 
  type?: string
  date: Date
  isRead?: boolean  
  index: number
}) {
  const [ showMenu, setShowMenu ] = useState(false)
  const { markRead } = useNotifications()
  const d = fmtDate(date)
  const icon = {
    src: "/heroicons/outline/ellipsis-vertical.svg",
    width: 20,
    height: 20,
    alt: "Menu",
  }
  const menu = {
    isPresented: showMenu,
    show: () => setShowMenu(true), 
    hide: () => setShowMenu(false),
    toggle: () => setShowMenu(!showMenu),
    remove: () => markRead(index),
  }
  if (isRead) {
    return <></>
  }
  return (
    <div className="notification">
      <div className="notification-title">{title}</div>
      <div className="notification-message">{message}</div>
      <div className="notification-date">{d}</div>
      <div className="notification-button">
        <button onClick={menu.toggle} type="button">
          <Image {...icon} />
        </button>
        <NotificationMenu {...menu} />
      </div>      
    </div>)

}

function NotificationMenu({ isPresented, hide, remove }: { 
  isPresented: boolean
  hide: () => void
  remove: () => void
}) {
  return (
    <div className={`notification-menu ${isPresented ? "show" : ""}`}>
      <button type="button" onClick={remove}>Remove</button>
      <button type="button" onClick={hide}>Cancel</button>
    </div>)
}