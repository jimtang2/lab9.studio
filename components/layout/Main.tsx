"use client"
import { useStore } from "@/state/store"
import clsx  from "clsx"

export default function Main({ children }: Readonly<{ children: React.ReactNode; }>) {  
  const { showNav } = useStore(state => state)
  const cls = {
    container: [
      "w-full h-full",
      "sm:max-w-full sm:max-h-[calc(100%-44px)]",
      "overflow-hidden overscroll-none",
      "transition-all duration-150",

      // "border-4",
      // showNav ? "border-red-500" : "border-green-500",
    ],
  }

  return <main className={clsx(cls.container)}>{children}</main>
}
