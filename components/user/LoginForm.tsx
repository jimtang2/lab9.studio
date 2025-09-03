"use client"
import { useState, useRef, useEffect } from "react"
import { useStore } from "@/state/store"
import { TextInput, PasswordInput, SubmitInput } from "@/components/form"
import clsx from "clsx"

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const {
    showLogin,
    setShowLogin,
    setSid,
    setLoginFormLoading,
  } = useStore(state => state)

  const [focus, setFocus] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const cls = {
    form: [
      [
        "absolute right-0 top-[100%]",
        !showLogin && "translate-x-[50%] opacity-0",
        showLogin && "translate-x-[0px] opacity-100",
        "transition-all duration-300",
        "bg-menu",
      ],
      [
        "grid grid-cols-[auto_50px] grid-rows-[repeat(4,min-content)]",
        showLogin ? "pointer-events-auto" : "pointer-events-none",
        "border-l-1 border-b-1 border-border",
        "shadow-lg",
      ],
    ],
    header: [
      "col-start-1 col-end-3 row-start-1 row-span-1",
      "px-2 py-2",
    ],
    nameInput: [
      "col-start-1 col-end-3 row-start-2 row-span-1",
      "border-t-1 border-b-1 border-border",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    passwordInput: [
      "col-start-1 col-end-3 row-start-3 row-span-1",
      "border-b-1 border-border",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    submitInput: [
      "col-start-2 col-end-3 row-start-1 row-span-1",
      "border-l-1 border-border",
      "flex items-center justify-center",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    error: [
      "col-start-1 col-end-[-1] row-start-[-2] row-span-1",
      "text-error",
      "px-2 py-2",
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
    <LoginFormHeader className={clsx(cls.header)} />
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
    <SubmitInput className={clsx(cls.submitInput)}
      tabIndex={showLogin ? 0 : -1} />
    <div className={clsx(cls.error)}>{error}</div>
  </form>
}

function LoginFormHeader({ className="" }: { className: string; }) {
  const { loginFormLoading } = useStore(state => state)
  const cls = {
    container: [
      "flex flex-row items-center gap-2",
      "w-[calc(100%-50px)]",
      className,
    ],
    text: [
      "flex-grow-1",
    ],
    loader: [
      "rounded-full h-6 w-6",
      "block min-h-6 min-w-6",
      "border-2 border-l-1 border-r-1 border-accent",
      "animate-spin",
      !loginFormLoading && [
        "hidden",
      ],
    ],
  }

  return <div className={clsx(cls.container)}>
    <span className={clsx(cls.text)}>Sign In</span>
    <div className={clsx(cls.loader)}></div>
  </div>
}