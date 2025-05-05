import Image from "next/image"
import {headers} from "next/headers"
import * as React from "react"

export default function Navigation() {
  return (
  <nav className="
    sticky
    top-[0px]
    w-[calc(100vw-4px)]
    h-[44px] 
    m-px 
    z-10
    backdrop-blur-sm"
      style={{
        background: "rgba(0,0,0,0.1)"
      }}>

    <ul className="
      flex flex-row gap-[20px] 
      h-full
      justify-center
      items-center">
      {/*<NavItem name="Finance" path="/finance" />*/}
    </ul>
  </nav>)
}

type NavItemProps = {
  name: string
  path: string
}

async function NavItem({name, path}: NavItemProps) {
  const headersList = await headers()
  const currentPath = headersList.get("x-pathname")

  return (
    <li className={`
      flex flex-row 
      relative
      ${currentPath == path ? "" : "hover:scale-110 transition-transform duration-300"}
      text-md`}>
      
      <Image className={`
        absolute dark:invert 
        ${currentPath == path ? "visible" : "invisible"}
        bottom-[-12px]
        left-[40%]
        right-[40%]
        stroke-4
      `} 
        aria-hidden 
        src="/chevron-up.svg" 
        alt="chevron up icon" 
        width={16} height={16}/> 

      <a href={path} className={`${currentPath == path ? "font-bold" : "font-normal"}`}>{name}</a>
    </li>
  )
}
