"use client"
import { forwardRef } from "react"
import Icon from "/public/heroicons/solid/chevron-right.svg"
import { useStore } from "@/state/store"
import clsx from "clsx"

interface RegisterButtonProps {
	className?: string;
}

const RegisterButton = forwardRef<HTMLButtonElement, RegisterButtonProps>(({ className="" }, ref) => {
	const showLogin = useStore(state => state.showLogin)
	const setShowLogin = useStore(state => state.setShowLogin)

	const cls = {
		container: [
		  "bg-background-primary text-accent-primary hover:text-accent-ternary",
		  "text-base/8",
		  "px-1 py-1",
		  "flex items-center gap-1",
		  "transition-all duration-300",
		  className,
		],
		text: [],
		icon: [
			"stroke-1",
			"scale-[80%]",
		],
	}

	const handleClick = () => {
		console.log("ok")
		setShowLogin(false)
		// code to show RegisterForm
	}

	return <button className={clsx(cls.container)}
		type="button"
		id="register-btn"
		onClick={handleClick} >
    <span className={clsx(cls.text)}>Register</span>
    <Icon className={clsx(cls.icon)}/>
  </button>
})

export {
	RegisterButton
}