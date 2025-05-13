"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useMenuStore } from "@/lib/store"

type MenuItemType = "link" | "group" | "divider"

export type MenuItemProps = {
  id: string
  type: MenuItemType
  parentId?: string
  href?: string
  alt?: string 
  icon?: string 
  label?: string
  width?: number
  height?: number
}

interface MenuProps { 
  items: MenuItemProps[]
}

function Menu({ items }: MenuProps) {
  const { show } = useMenuStore()

  return (
    <div id="menu" 
      className={`relative
        w-[60px] min-w-[60px] z-21
        sm:w-[35%] sm:min-w-[240px] sm:max-w-[300px] sm:ml-[0px]
        m-0 ml-[-60px]
        px-0 sm:px-2 pb-8
        transition-[margin-left]
        ${show && "ml-[0px] "}
        bg-background-lt
        border-r border-divider`}>

      <div className="sticky top-[0px] min-w-[60px]">
        {items.map(props => 
          <MenuItem key={props.id} {...props} />)}
      </div>      
    </div>)
}

function MenuItem({ 
    id, 
    href, 
    label, 
    type, 
    alt, 
    icon, 
    width = 26, 
    height = 26, 
    parentId
  }: MenuItemProps) {
  const path = usePathname()
  const isActive = href == path
  
  const { getItemCollapsed, setItemCollapsed } = useMenuStore()
  const [ isCollapsed, setIsCollapsed ] = useState(false)
  const [ isHydrated, setIsHydrated ] = useState(false) // for use in markup to ensure zustand initial state (before hydration) does not conflict with zustand persisted state (after hydration)
  
  useEffect(() => {
    setIsHydrated(true)
    setIsCollapsed(getItemCollapsed(id))
  }, [])

  switch(type) {
  case "link":
    let isChild = (typeof parentId) === "string"
    let parentCollapsed = false
    if (parentId !== null) {
      parentCollapsed = getItemCollapsed(parentId as string)
    }
    if (href === null || alt === null || icon === null) {
      throw new Error("invalid MenuItemProps")
    }
    return (
      <div className={`
        ${isHydrated && parentCollapsed ? "hidden" : ""}
        px-0 py-2 my-1 
        sm:rounded-sm sm:px-2
        text-sm w-full
        ${isHydrated && isActive && "bg-accent text-text-contrast"}
        `}>
        <Link className={`flex flex-row 
          items-center justify-center gap-4
          sm:justify-start
          w-full`}
          href={href!}>
          <Image 
            className={isHydrated && isActive ? "dark:invert" : ""}
            alt={alt!} 
            src={icon!} 
            width={width} 
            height={height}/>
          <span 
            className={`
              hidden sm:block`}>
            {label}
          </span>
        </Link>
      </div>)
    break
  case "group":
    const handleCollapse = () => {
      setIsCollapsed(!isCollapsed)
      setItemCollapsed(id, !isCollapsed)
    }
    if (alt === null || icon === null) {
      return <></>
    }
    return (
      <div className={`
        px-0 py-2 my-1 
        sm:rounded-sm sm:px-2
        text-sm w-full`}>
        <button className={`
          flex flex-row justify-center items-center gap-4
          sm:justify-start 
          w-full`}
          onClick={handleCollapse}>
          <Image 
            alt={alt!} 
            src={icon!} 
            width={width} 
            height={height} />
          <span 
            className={`
              hidden sm:block flex-grow-1
              text-left`}>
            {label}
          </span>
          <Image 
            className={`
              hidden sm:block`}
            alt="chevron" 
            src={`/heroicons/outline/chevron-${isCollapsed ? "right": "down"}.svg`} 
            width={16} 
            height={16}/>
        </button>
      </div>)
  case "divider":
    return <div className={`border-t border-divider my-1`}></div>
  default:
    return <></>
  }
}

export default Menu

export const menuItems: MenuItemProps[] = [
  {
    id: "home",
    type: "link",
    href: "/",
    alt: "home icon",
    icon: "/heroicons/solid/home.svg",
    label: "Home",
  },
  {
    id: "deck",
    type: "link",
    href: "/deck",
    alt: "deck icon",
    icon: "/heroicons/solid/square-3-stack-3d.svg",
    label: "On Deck",
  },
  {
    id: "divider-1",
    type: "divider"
  },
  {
    id: "preferences",
    type: "link",
    href: "/preferences",
    alt: "preferences icon",
    icon: "/heroicons/solid/cog.svg",
    label: "Preferences",
  },
  {
    id: "contact",
    type: "link",
    href: "/about/contact",
    alt: "contact icon",
    icon: "/heroicons/solid/at-symbol.svg",
    label: "Contact",
  },
  {
    id: "divider-2",
    type: "divider"
  },
  {
    id: "about",
    type: "group",
    alt: "about icon",
    icon: "/heroicons/solid/question-mark-circle.svg",
    label: "About",
  },
  {
    id: "terms",
    type: "link",
    parentId: "about",
    href: "/about/terms",
    alt: "about icon",
    icon: "/heroicons/solid/cursor-arrow-ripple.svg",
    label: "Terms of Use",
  },
  {
    id: "privacy",
    type: "link",
    parentId: "about",
    href: "/about/privacy",
    alt: "privacy icon",
    icon: "/heroicons/solid/clipboard-document-check.svg",
    label: "Privacy Policy",
  },
]
