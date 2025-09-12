"use client"
import { useEffect } from "react"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import LoginForm from "./LoginForm"
import SessionMenu from "./SessionMenu"
import LoggedOnIcon from "/public/heroicons/solid/user.svg"
import LoggedOffIcon from "/public/heroicons/solid/user.svg"
import AdminIcon from "/public/heroicons/solid/user-circle.svg"
import clsx from "clsx"

interface UserButtonProps {
  id?: string;
}

export default function SessionButton({ id="" }: UserButtonProps) {
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
      "flex flex-row items-center justify-center gap-0 sm:gap-2",
      "h-[calc(50px-2*var(--spacing))] w-[calc(50px-2*var(--spacing))]",
      "sm:h-[calc(50px-2*var(--spacing))] sm:w-min",
      "sm:px-4",
      (showSession || showLogin) ? [
        loggedIn && "text-accent",
        "text-accent bg-menu",
      ] : [
        "bg-background",
        loggedIn && "text-accent",
        !loggedIn && "text-subtext",
      ],
      "transition-all duration-150",
      "pointer-events-auto",
      "rounded-lg",
      "relative",
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

  return <>
    <button className={clsx(cls.button)}
      onClick={() => loggedIn ? setShowSession(!showSession) : setShowLogin(!showLogin)}
      id={id} 
      title="" 
      tabIndex={-1}>
      {isAdmin ? <AdminIcon className={clsx(cls.icon)} /> : 
      (loggedIn ? <LoggedOnIcon className={clsx(cls.icon)} /> : <LoggedOffIcon className={clsx(cls.icon)} />)}
      <div className={clsx(cls.loader)}></div>
      <span className={clsx(cls.text)}>{displayName}</span>
    </button>
    <LoginForm />
    <SessionMenu />
  </>
}
