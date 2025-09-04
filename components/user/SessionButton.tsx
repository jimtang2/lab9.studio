"use client"
import { useEffect } from "react"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LoggedOnIcon from "/public/heroicons/solid/user.svg"
import LoggedOffIcon from "/public/heroicons/outline/user.svg"
import clsx from "clsx"

export default function SessionButton() {
  const {
    showLogin,
    setShowLogin,
    showSession,
    setShowSession,
    loginFormLoading,
  } = useStore(state => state)
  const [user] = useSessionUser()
  const loggedIn = typeof(user?.name) === "string"
  const displayName = loggedIn ? user?.name : "Public"

  useEffect(() => {
    setShowLogin(false)
    setShowSession(false)
  }, [loggedIn])

  const cls = {
    button: [
      [
        "flex flex-row items-center justify-center",
        "h-full w-full",
        "z-10",
        "sm:px-4 sm:gap-1",
        showLogin && "bg-highlighted-background text-highlighted-foreground",
        showSession && "bg-highlighted-background text-highlighted-foreground",
        !showLogin && !showSession && "bg-menu",
        loggedIn && "bg-selected-background text-selected-foreground",
        "transition-all duration-300",
        "border-border border-l-1 border-b-1",
        "z-20",
        "pointer-events-auto",
      ],
    ],
    text: [
      "hidden sm:inline-block",
      "whitespace-nowrap overflow-x-hidden text-ellipsis",
    ],
    icon: [
      "scale-[80%]",
      "stroke-2",
      "relative top-[-2px]",
      loginFormLoading && "hidden",
    ],
    loader: [
      "rounded-full h-6 w-6",
      "border-0 border-t-2",
      "animate-spin",
      !loginFormLoading && "hidden",
    ],
  }

  const handleClick = () => loggedIn ? setShowSession(!showSession) : setShowLogin(!showLogin)

  return <button className={clsx(cls.button)}
    id="session-btn" 
    title="" 
    onClick={handleClick}
    tabIndex={-1} >
    {loggedIn ? <LoggedOnIcon className={clsx(cls.icon)} /> : <LoggedOffIcon className={clsx(cls.icon)} />}
    <div className={clsx(cls.loader)}></div>
    <span className={clsx(cls.text)}>{displayName}</span>
  </button>
}

