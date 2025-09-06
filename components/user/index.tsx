"use client"
import { forwardRef } from "react"
import SessionButton from "./SessionButton"
import LoginForm from "./LoginForm"
import SessionMenu from "./SessionMenu"
// import { RegisterForm } from "./RegisterForm"
import clsx from "clsx"

interface UserComponentProps {
  className?: string;
}

export default forwardRef<HTMLElement, UserComponentProps>(({ className="" }, ref) => {
  const cls = {
    container: [
      [
        "relative h-full w-full",
        "pointer-events-none",
        "z-11",
      ],
      className,
    ],
  }

  return <div className={clsx(cls.container)}>
    <SessionButton />
    <LoginForm />
    <SessionMenu />
    {/*<RegisterForm />*/}
  </div>
})