"use client"
import { useState, useRef, useEffect } from "react"
import { useStore } from "@/state/store"
import { TextInput, PasswordInput, SubmitInput } from "@/components/form"
import clsx from "clsx"

export default function LoginForm() {
  const [focus, setFocus] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const showLogin = useStore(state => state.showLogin)
  const setShowLogin = useStore(state => state.setShowLogin)
  const setSid = useStore(state => state.setSid)
  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const cls = {
    form: [
      [
        "absolute right-0 top-[calc(100%+1px)]",
        !showLogin && "translate-x-[50%] opacity-0",
        showLogin && "translate-x-[0px] opacity-100",
        "transition-all duration-300",
      ],
      [
        "grid grid-cols-[auto_50px] grid-rows-[repeat(3,min-content)]",
        "bg-background-secondary",
        showLogin ? "pointer-events-auto" : "pointer-events-none",
      ],
    ],
    title: [
      "col-start-1 col-end-3 row-start-1 row-span-1",
      "flex items-center",
      "px-2 py-2",
    ],
    nameInput: [
      "col-start-1 col-end-3 row-start-2 row-span-1",
      "border-l-1 border-t-1 border-b-1 border-border-secondary",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    passwordInput: [
      "col-start-1 col-end-3 row-start-3 row-span-1",
      "border-l-1 border-b-1 border-border-secondary",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    submitInput: [
      "col-start-2 col-end-3 row-start-1 row-span-1",
      "border-l-1 border-border-secondary",
      "flex items-center justify-center",
      showLogin ? "pointer-events-auto" : "pointer-events-none",
    ],
    error: [],
  }

  useEffect(() => {
    if (showLogin) {
      setTimeout(() => nameInputRef.current?.focus(), 300)
    }
  }, [showLogin])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(formRef.current!)
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Sign-in failed");
        return
      }
      setSid(data.sid)
      setShowLogin(false)
    } catch (error) {
      setError("Network error, please try again")
    }
  }

  return <form id="login-form" className={clsx(cls.form)}
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    ref={formRef}
    onSubmit={handleSubmit} >
    <div className={clsx(cls.title)}>Sign In</div>
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
  </form>
}
