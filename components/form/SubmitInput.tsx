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
	const [hover, setHover] = useState(false)

	const cls = {
		button: [
			"px-1",
			"outline-accent",
			"bg-control-background text-control-foreground",
			className,
		],
		icon: [
			"stroke-2",
			"text-control-foreground",
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
		<Icon className={clsx(cls.icon)} />
	</button>
})
