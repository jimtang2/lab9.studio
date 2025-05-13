"use client"
import { useEffect } from "react"
import { useMenuStore } from "@/lib/store"

export default function AutoHideMenu() {
  const { setShow } = useMenuStore()
  useEffect(() => {
    console.log("hide menu")
    setShow(false)
  }, [])
  return <></>
}
