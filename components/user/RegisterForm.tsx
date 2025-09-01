"use client"
import { useState, useRef, useEffect } from "react"
import { useStore } from "@/state/store"
import { TextInput, PasswordInput, SubmitInput } from "@/components/form"
import clsx from "clsx"

export function RegisterForm() {
  const [focus, setFocus] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const cls = {
    form: [
      [
        "absolute right-0 top-[calc(100%+1px)]",
        "transition-all duration-300",
      ],
      [
        "grid grid-cols-[auto_min-content] grid-rows-[repeat(3,min-content)]",
        "bg-background-secondary",
        ,
      ],
    ],
    nameInput: [
      "col-start-1 col-end-2 row-start-1 row-end-2",
      "border-l-1 border-t-1 border-b-1 border-border-secondary",
    ],
    passwordInput: [
      "col-start-1 col-end-2 row-start-2 row-end-3",
      "border-l-1 border-b-1 border-border-secondary",
    ],
    confirmInput: [
      "col-start-1 col-end-3 row-start-3 row-end-4",
      "border-l-1 border-b-1 border-border-secondary",
    ],
    submitInput: [
      "col-start-2 col-end-3 row-start-1 row-end-4",
      "border-l-1 border-border-secondary",
    ],
  }

  return <form id="login-form" className={clsx(cls.form)}
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    ref={formRef}>
    <TextInput className={clsx(cls.nameInput)}
      name="id"
      label="UserID"
      ref={nameInputRef} />
    <PasswordInput className={clsx(cls.passwordInput)}
      name="password"
      label="Password"/>
    <PasswordInput className={clsx(cls.confirmInput)}
      name="confirm"
      label="Confirm Password" />
    <SubmitInput className={clsx(cls.submitInput)} />
  </form>
}