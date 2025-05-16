"use client"
import { useEffect } from "react"
import { useMenuStore, useInboxStore } from "@/lib/store"
import { usePathname } from "next/navigation"

export function AutoHideMenu() {
  const { setShow } = useMenuStore()
  const path = usePathname()
  useEffect(() => {
    setShow(false)
  }, [path])
  return <></>
}

export function AutoHideInbox() {
  const { setShow } = useInboxStore()
  const path = usePathname()
  useEffect(() => {
    setShow(false)
  }, [path])
  return <></>
}

