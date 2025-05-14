"use client"
import { useState } from "react"
import Image from "next/image"

import ColorThemeToggle from "@/components/buttons/ColorThemeToggle"
import InboxButton from "@/components/buttons/InboxButton"
import GithubLink from "@/components/buttons/GithubLink"
import MenuToggle from "@/components/buttons/MenuToggle"

import { useNavStore } from "@/lib/store"

export default function NavBar() {
  const { title } = useNavStore()

  return (
  <nav className={`sticky
    w-screen h-[44px] top-[0px] z-50
    px-2 sm:px-4
    bg-background-lt
    border-b border-divider
  `}>
    <ul className={`flex flex-row gap-1
      h-full
      items-center
      justify-start
    `}>
      <MenuToggle />
      <div className={`flex flex-row items-center justify-center
        flex-grow-1 pl-4
        font-bold
      `}>{title}</div>
      {/*<GithubLink />*/}
      <ColorThemeToggle />
      <InboxButton />
    </ul>
  </nav>)
}
