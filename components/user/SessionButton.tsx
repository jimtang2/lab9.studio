"use client"
import { useEffect } from "react"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LoggedOnIcon from "/public/heroicons/solid/user.svg"
import LoggedOffIcon from "/public/heroicons/outline/user.svg"
import clsx from "clsx"

export default function SessionButton() {
  const showLogin = useStore(state => state.showLogin)
  const setShowLogin = useStore(state => state.setShowLogin)
  const showSession = useStore(state => state.showSession)
  const setShowSession = useStore(state => state.setShowSession)
  const [user] = useSessionUser()
  const loggedIn = typeof(user?.name) === "string"
  const displayName = loggedIn ? user?.name : "Anonymous"

  useEffect(() => {
    setShowLogin(false)
    setShowSession(false)
  }, [loggedIn])

  const cls = {
    button: [
      [
        "flex flex-row items-center justify-center",
        "relative top-[-1px]",
        "h-full w-full",
        "z-10",
        "sm:px-6 sm:gap-2",
        "hover:bg-background-ternary sm:hover:bg-background-secondary",
        loggedIn && "text-accent-primary",
        (showLogin || showSession) && "bg-background-ternary sm:bg-background-secondary text-accent-primary",
        (!showLogin && !showSession) && "bg-background-secondary sm:bg-background-primary",
        "transition-all duration-300",
        "border-border-primary border-l-1",
        "z-20",
        "pointer-events-auto",
      ],
    ],
    icon: [
      "scale-[80%]",
    ],
    text: [
      "hidden sm:inline-block",
      "whitespace-nowrap overflow-x-hidden text-ellipsis",
    ],
  }

  const handleClick = () => loggedIn ? setShowSession(!showSession) : setShowLogin(!showLogin)

  return <button className={clsx(cls.button)}
    id="session-btn" 
    title="" 
    onClick={handleClick}
    tabIndex={-1}>
    <span className={clsx(cls.text)}>{displayName}</span>
    {loggedIn ? <LoggedOnIcon className={clsx(cls.icon)} /> : <LoggedOffIcon className={clsx(cls.icon)} />}
  </button>
}

