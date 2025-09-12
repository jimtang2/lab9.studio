"use client"
import { useState, useRef, useEffect } from "react"
import { useStore } from "@/state/store"
import { useSessionUser } from "@/state/useSessionUser"
import { TextInput, PasswordInput, SubmitInput } from "@/components/form"
import clsx from "clsx"

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const {
    showLogin,
    setShowLogin,
    showSession,
    setShowSession,
    setSid,
    setLoginFormLoading,
  } = useStore(state => state)
  const [user] = useSessionUser()
  const loggedIn = typeof(user?.name) === "string"

  const [focus, setFocus] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setShowLogin(false)
    setShowSession(false)
  }, [loggedIn])

  const cls = {
    form: [
      "absolute",
      "bottom-4 left-14 max-w-[360px]",
      "sm:top-full sm:left-auto sm:right-0",
      "bg-menu",
      "z-10",
      "sm:translate-x-0",
      !showLogin && "translate-x-[-50px] sm:translate-x-0 sm:translate-y-[-50px] opacity-0",
      showLogin && "translate-x-0 sm:translate-y-0 opacity-100",
      "transition-all duration-150",
      "flex flex-col",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    nameInput: [
      showLogin ? "pointer-events-auto" : "pointer-events-none",
      "border-t-1 border-b-1 border-background",
    ],
    passwordInput: [
      showLogin ? "pointer-events-auto" : "pointer-events-none",
      "border-b-1 border-background",
    ],
    footer: [
      "flex flex-row items-center",
    ],
    submitInput: [
      showLogin ? "pointer-events-auto" : "pointer-events-none",
      "px-1 mx-1",
      "order-1 sm:order-2",
    ],
    error: [
      "order-2 sm:order-1",
      "flex-grow-1",
      "text-error",
      "text-base/10",
      "px-2",
      "min-h-full",
      "bg-menu",
    ],
  }

  useEffect(() => {
    if (showLogin) {
      setTimeout(() => nameInputRef.current?.focus(), 300)
    }
  }, [showLogin])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoginFormLoading(true)
    const formData = new FormData(formRef.current!)
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error)
      } else {
        setSid(data.sid)
        setShowLogin(false)
      }
    } catch (error) {
      setError("Network error, please try again")
    }
    setLoginFormLoading(false)
  }

  return <form id="login-form" className={clsx(cls.form)}
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    ref={formRef}
    onSubmit={handleSubmit} >
    <TextInput className={clsx(cls.nameInput)}
      name="id"
      label="UserID"
      placeholder="User ID"
      ref={nameInputRef}
      tabIndex={showLogin ? 0 : -1} />
    <PasswordInput className={clsx(cls.passwordInput)}
      name="password"
      label="Password"
      placeholder="Password"
      tabIndex={showLogin ? 0 : -1} />
    <div className={clsx(cls.footer)}>
      <div className={clsx(cls.error)}>{error}</div>
      <SubmitInput className={clsx(cls.submitInput)}
        tabIndex={showLogin ? 0 : -1}
        text="Sign In" />
    </div>
  </form>
}
