"use client"
import { useEffect } from "react"
import { useMenuStore } from "@/lib/store"
import { usePathname } from "next/navigation"

export default function AutoHideMenu() {
  const { setShow } = useMenuStore()
  const path = usePathname()
  useEffect(() => {
    setShow(false)
  }, [path])
  return <></>
}
