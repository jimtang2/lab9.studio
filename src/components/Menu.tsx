"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useStore } from "@/lib/store"

export default function Menu() {
  const { showMenu } = useStore()
  let marginLeft = showMenu === true ? "ml-[0px]" : "ml-[-60px]"
  let marginLeftSM = showMenu === true ? "sm:ml-[0px]" : "sm:ml-[-240px]"

  return (
    <div id="menu" 
      className={`
        content-stretch
        relative
        w-[60px] min-w-[60px] ${marginLeft}
        sm:w-[240px] sm:min-w-[240px] ${marginLeftSM}
        transition-[margin-left]
        bg-background-lt
        m-0 p-0 py-2
        border-r border-divider rounded-sm`}>

      <MenuItems />
      
    </div>)
}

type MenuItemProps = {
  href: string
  alt: string
  src: string
  width?: number
  height?: number
  label: string
}

function MenuItem({href, alt, src, width = 28, height = 28, label}: MenuItemProps) {
  const path = usePathname()
  const isActive = href == path

  return (
    <li className={`
    p-2 m-2 rounded-xl
    text-sm
    ${isActive ? "bg-accent" : "hover:bg-background-hl"}`}>
    <Link className={`
      flex flex-row 
      items-center
      gap-4`}
      href={href}>
      <Image alt={alt} src={src} width={width} height={height}/>
      <span 
        className={`hidden sm:block`}>
        {label}
      </span>
    </Link>
  </li>)
}

function MenuDivider() {
  return <li className="border-t border-divider m-2"></li>
}

function MenuItems() {
  const topItems: MenuItemProps[] = [
    {
      href: "/",
      alt: "home icon",
      src: "/home.svg",
      label: "Home",
    },
  ]

  const bottomItems: MenuItemProps[] = [
    {
      href: "/preferences",
      alt: "preferences icon",
      src: "/cog.svg",
      label: "Preferences",
    },
    {
      href: "/terms",
      alt: "terms icon",
      src: "/clipboard-document-check.svg",
      label: "Terms & Privacy",
    },
    {
      href: "/contact",
      alt: "contact icon",
      src: "/at-symbol.svg",
      label: "Contact",
    },
  ]

  return (
      <div className="sticky top-[calc(44px+1rem)] min-w-[60px]">
        <ul>
          {topItems.map(menuItemProps => 
            <MenuItem key={menuItemProps.label} {...menuItemProps} />
          )}
          <MenuDivider />
          {bottomItems.map(menuItemProps => 
            <MenuItem key={menuItemProps.label} {...menuItemProps} />
          )}
        </ul>
      </div>
    )
}