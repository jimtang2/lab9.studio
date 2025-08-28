"use client"
import { useStore } from "@/state/store"
import Link from "next/link"
import clsx from "clsx"
import Icon from "/public/heroicons/solid/user.svg"

export default function LoginButton() {
  const showLogin = useStore(state => state.showLogin)
  const setShowLogin = useStore(state => state.setShowLogin)

  const cls = {
    base: [
      [
        "col-start-[-2] col-end-[-1]",
        "row-start-1 row-end-2",        
      ],
      [
        "flex items-center justify-center",
        "sm:px-6 sm:gap-2",
        "z-10",
      ],
      [
        "bg-background-secondary sm:bg-background-primary",
        "border-border-primary border-l-1 sm:border-b-1",
      ],
      // "transition-all duration-300",
    ],
    indicator: [
      "bg-red-500",
      "h-4 w-4 sm:h-4 sm:w-4", 
      "rounded-full",
      "animate-pulse",
    ],
    icon: "hidden",
    text: [
      "hidden sm:inline-block",
    ],
  }

  const handleClick = () => {
    setShowLogin(!showLogin)
  }

  return <button id="login-btn" className={clsx(cls.base)} title="Login" onClick={handleClick}>
    <Icon className={clsx(cls.icon)} />
    <span className={clsx(cls.text)}>Login</span>
    <div className={clsx(cls.indicator)}></div>
  </button>
}
