"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useMenuStore } from "@/lib/store"

export const menuItems: MenuItemProps[] = [
  {
    id: "home",
    type: "link",
    href: "/",
    alt: "home icon",
    icon: "/heroicons/outline/home.svg",
    label: "Home",
  },
  {
    id: "blog",
    type: "link",
    href: "/blog",
    alt: "blog icon",
    icon: "/heroicons/outline/pencil-square.svg",
    label: "Blog",
  },
  {
    id: "preferences",
    type: "link",
    href: "/preferences",
    alt: "preferences icon",
    icon: "/heroicons/outline/cog.svg",
    label: "Preferences",
  },
  {
    id: "divider-1",
    type: "divider"
  },
  {
    id: "about",
    type: "group",
    alt: "about icon",
    icon: "/heroicons/outline/question-mark-circle.svg",
    label: "About",
  },
  {
    id: "terms",
    type: "link",
    parentId: "about",
    href: "/about/terms",
    alt: "about icon",
    icon: "/heroicons/outline/clipboard-document-check.svg",
    label: "Terms",
  },
  {
    id: "contact",
    type: "link",
    parentId: "about",
    href: "/about/contact",
    alt: "contact icon",
    icon: "/heroicons/outline/at-symbol.svg",
    label: "Contact",
  },
]

type MenuItemProps = {
  id: string
  type: "link" | "group" | "divider"
  parentId?: string
  href?: string
  alt?: string 
  icon?: string 
  label?: string
  width?: number
  height?: number
}

type MenuProps = { 
  items: MenuItemProps[]
}

function Menu({ items }: MenuProps) {
  const { show } = useMenuStore()
  let marginLeft = show === true ? "ml-[0px]" : "ml-[-60px]"
  let marginLeftSM = show === true ? "sm:ml-[0px]" : "sm:ml-[-240px]"

  return (
    <div id="menu" 
      className={`
        content-stretch
        relative
        w-[60px] min-w-[60px] ${marginLeft}
        sm:w-[240px] sm:min-w-[240px] ${marginLeftSM}
        transition-[margin-left]
        bg-background-lt
        m-0 p-0 py-2 px-0
        sm:px-4
        border-r border-divider`}>

      <div className="sticky top-[calc(44px+1rem)] min-w-[60px]">
        <ul>
          {items.map(props => 
            <MenuItem key={props.id} {...props} />)}
        </ul>
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
    let parentCollapsed = false
    if (parentId !== null) {
      parentCollapsed = getItemCollapsed(parentId as string)
    }
    if (href === null || alt === null || icon === null) {
      throw new Error("invalid MenuItemProps")
    }
    return (
      <li className={`
        ${isHydrated && parentCollapsed ? "hidden" : ""}
        flex flex-col items-center
        px-0 py-2 my-2 
        sm:rounded-sm sm:px-2
        text-sm w-full
        ${isHydrated && isActive && "bg-accent text-text-contrast"}
        ${isHydrated && !isActive && "hover:bg-background-hl"}`}>
        <Link className={`
          flex flex-row items-center justify-center gap-4
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
      </li>)
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
      <li className={`
        flex flex-col items-center
        px-0 py-2 my-2 
        sm:rounded-sm sm:px-2
        text-sm w-full
        hover:bg-background-hl`}>
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
      </li>)
  case "divider":
    return <li className={`border-t border-divider m-2`}></li>
  default:
    return <></>
  }
}

export default Menu