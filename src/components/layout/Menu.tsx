"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useMenuStore } from "@/lib/store"
import { menuItems } from "@/constants"

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

export default function Menu() {
  const { show } = useMenuStore()
  const [ hydrated, setHydrated ] = useState(false)

  useEffect(() => setHydrated(true), [])

  return (
    <div id="menu" 
      className={`relative
        w-[60px] min-w-[60px] px-0 m-0 sm:px-0 
        sm:w-[250px] sm:min-w-[250px] sm:max-w-[250px] 
        h-[calc(100vh-44px)] max-h-[calc(100vh-44px)] min-h-[calc(100vh-44px)] overflow-y-scroll
        ml-[-60px] sm:ml-0
        transition-[margin-left]
        ${hydrated && show ? "ml-[0px]" : ""}
        bg-background-lt
        border-r border-r-divider`}>

      {menuItems.map((props: MenuItemProps) => 
        <MenuItem key={props.id} {...props} />)}
    </div>)
}

function MenuItem(props: MenuItemProps) {
  switch(props.type) {
  case "link":
    return <MenuItemLink {...props} />
  case "group":
    return <MenuItemGroup {...props} />
  case "divider":
    return <MenuItemDivider />
  default:
    return <></>
  }
}

function MenuItemLink(props: MenuItemProps) {
  const { parentId, href, label, alt, icon, width = 26, height = 26 } = props
  const [ hydrated, setHydrated ] = useState(false)
  let { getItemCollapsed } = useMenuStore()
  let path = usePathname()

  let isActive = href == path
  let hasParent = typeof parentId === "string"
  let parentCollapsed = parentId !== null ? getItemCollapsed(parentId as string) : false

  useEffect(() => setHydrated(true), [])

  if (href === null || alt === null || icon === null) {
    throw new Error("invalid MenuItemProps")
  }
  return (
    <div className={`relative px-0 py-2 my-1 sm:px-2 text-sm w-full
      ${hydrated && `${parentCollapsed ? "hidden" : ""} ${isActive ? "bg-accent text-text-contrast shadow-lg" : ""}`}`}>
      <Link className={`flex flex-row items-center justify-center gap-4 sm:justify-start w-full`}
        href={href!}>
        <Image alt={alt!} src={icon!} width={width} height={height}
          className={isActive ? "dark:invert" : ""} />
        <span className={`hidden sm:block`}>{label}</span>
      </Link>
    </div>
  )
}

function MenuItemGroup(props: MenuItemProps) {
  const { id, label, alt, icon, width = 26, height = 26 } = props
  const [ hydrated, setHydrated ] = useState(false)
  const { getItemCollapsed, setItemCollapsed } = useMenuStore()
  const [ isCollapsed, setIsCollapsed ] = useState(false)

  function handleCollapse() {
    setIsCollapsed(!isCollapsed)
    setItemCollapsed(id, !isCollapsed)
  }

  useEffect(() => {
    setIsCollapsed(getItemCollapsed(id))
    setHydrated(true)
  }, [])

  if (alt === null || icon === null) {
    return <></>
  }
  return (
    <div className={`px-0 py-2 my-1 sm:px-2 text-sm w-full`}>
      <button className={`flex flex-row justify-center items-center gap-4 sm:justify-start w-full`}
        onClick={handleCollapse}>
        <Image alt={alt!} src={icon!} width={width} height={height} />
        <span className={`hidden sm:block flex-grow-1 text-left`}>{label}</span>
        <Image className={`hidden sm:block`} alt="chevron" src={`/heroicons/outline/chevron-${hydrated && isCollapsed ? "right": "down"}.svg`} width={16} height={16}/>
      </button>
    </div>
  )
}

function MenuItemDivider() {
  return <div className={`border-t border-divider my-1`}></div>
}