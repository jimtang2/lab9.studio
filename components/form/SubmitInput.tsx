"use client"
import { useState, forwardRef } from "react"
import Icon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

interface SubmitInputProps {
	className?: string; 
	iconClassName?: string;
	tabIndex?: number;
}

export default forwardRef<HTMLButtonElement, SubmitInputProps>(function SubmitInput({ className="", iconClassName="", tabIndex=0 }, ref) {
	const [focus, setFocus] = useState(false)

	const cls = {
		button: [
			"px-1",
			"outline-accent-primary",
			"bg-background-ternary",
			"text-accent-primary",
			className,
		],
		icon: [
			"stroke-2",
			iconClassName,
		],
	}

	return <button className={clsx(cls.button)} 
		type="submit"
		ref={ref}
		tabIndex={tabIndex}>
		<Icon className={clsx(cls.icon)} />
	</button>
})
