"use client"
import { useEffect } from "react"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LoggedOnIcon from "/public/heroicons/solid/user.svg"
import LoggedOffIcon from "/public/heroicons/solid/user.svg"
import AdminIcon from "/public/heroicons/solid/user-circle.svg"
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
  const isAdmin = user?.is_admin || false

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
        "sm:px-6 sm:gap-1",
        (showSession || showLogin) ? [
          loggedIn && "text-accent",
          "text-accent bg-background",
          "rounded-md sm:rounded-sm",
        ] : [
          "bg-menu",
          loggedIn && "text-accent",
          !loggedIn && "text-subtext",
        ],
        "transition-all duration-150",
        "z-20",
        "pointer-events-auto",
        "sm:border-b-1 border-border",
      ],
    ],
    text: [
      "hidden sm:inline-block",
      "whitespace-nowrap overflow-x-hidden text-ellipsis",
      "font-bold",
    ],
    icon: [
      !isAdmin && "scale-[80%]",
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
    {isAdmin ? <AdminIcon className={clsx(cls.icon)} /> : 
    (loggedIn ? <LoggedOnIcon className={clsx(cls.icon)} /> : <LoggedOffIcon className={clsx(cls.icon)} />)}
    <div className={clsx(cls.loader)}></div>
    <span className={clsx(cls.text)}>{displayName}</span>
  </button>
}

