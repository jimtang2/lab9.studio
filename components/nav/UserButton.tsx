"use client"
import { useState, useEffect } from "react"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/hooks"
import LoginForm from "@/components/form/LoginForm"
import SessionMenu from "@/components/menu/SessionMenu"
import LoggedOnIcon from "/public/heroicons/solid/user.svg"
import LoggedOffIcon from "/public/heroicons/solid/key.svg"
import AdminIcon from "/public/heroicons/solid/user-circle.svg"
import clsx from "clsx"

interface UserButtonProps {
  id?: string;
  className?: string;
}

export default function SessionButton({ id="", className="" }: UserButtonProps) {
  const {
    showLogin,
    setShowLogin,
    showSession,
    setShowSession,
    loginFormLoading,
    user,
  } = useStore(state => state)

  const [loggedIn, setLoggedIn] = useState(false)
  const [displayName, setDisplayName] = useState("Sign In")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setShowLogin(false)
    setShowSession(false)
  }, [loggedIn])

  useEffect(() => {
    if (!user) {
      setLoggedIn(false)
      setDisplayName("Sign In")
      setIsAdmin(false)
    } else {
      setLoggedIn(true)
      setDisplayName(user.name)
      setIsAdmin(user.is_admin)
    }
  }, [user])

  const cls = {
    button: [
      "flex flex-row items-center justify-center gap-0 sm:gap-1",
      (showSession || showLogin) ? [
        loggedIn && "text-accent",
        "text-accent bg-menu",
      ] : [
        // "bg-background",
        loggedIn && "text-accent",
        !loggedIn && "text-subtext",
      ],
      "transition-all duration-150",
      "pointer-events-auto",
      className,
    ],
    text: [
      "text-sm",
      "hidden sm:inline-block",
      "whitespace-nowrap overflow-x-hidden text-ellipsis",
    ],
    icon: [
      isAdmin ? "scale-[85%]" : "scale-[70%]",
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
