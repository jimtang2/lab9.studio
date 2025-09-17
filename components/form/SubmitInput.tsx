"use client"
import { useState, forwardRef } from "react"
import Icon from "/public/heroicons/solid/chevron-right.svg"
import clsx from "clsx"

interface SubmitInputProps {
	className?: string; 
	iconClassName?: string;
	tabIndex?: number;
	text?: string;
}

export default forwardRef<HTMLButtonElement, SubmitInputProps>(function SubmitInput({ className="", iconClassName="", tabIndex=0, text="", }, ref) {
	const [focus, setFocus] = useState(false)
	const [hover, setHover] = useState(false)

	const cls = {
		button: [
			"flex flex-row items-center",
			"outline-accent",
			"bg-control-background text-control-foreground",
			"rounded-lg",
			className,
		],
		text: [
			"text-sm/9",
			"px-1",
		],
		icon: [
			hover && "animate-pulse",
			iconClassName,			
		],
	}

	return <button className={clsx(cls.button)} 
		type="submit"
		ref={ref}
		tabIndex={tabIndex}
		onMouseOver={() => setHover(true)}
		onMouseOut={() => setHover(false)}>
		<span className={clsx(cls.text)}>{text}</span>
		<Icon className={clsx(cls.icon)} />
	</button>
})
