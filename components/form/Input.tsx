"use client"
import { useState, forwardRef } from "react"
import clsx from "clsx"

interface InputProps {
	type: "text" | "password"; 
	name: string; 
	label: string; 
	placeholder?: string; 
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, name, label, placeholder, className="", disabled=false, tabIndex=0 }, ref?) => {
	const cls = {
		container: [
			"grid grid-cols-[repeat(2,auto)] grid-rows-[min-content_auto]",
			"bg-menu",
			className,
		],
		label: [
			"col-start-1 col-end-2 row-start-1 row-end-2",
			"relative",
			"px-[calc(3*var(--spacing))] pt-[calc(1.5*var(--spacing))]",
			"text-xs/4 text-accent",
		],
		input: [
			"col-start-1 col-end-[-1] row-start-1 row-end-[-1]",
			"text-base px-2 pt-4 pb-0 m-1",
			"outline-accent",
			"rounded-md",
		],
	}

	const handleChange = () => {}
	
	return <div className={clsx(cls.container)}>
		<label className={clsx(cls.label)}
			htmlFor={name}>{label}</label>
		<input className={clsx(cls.input)}
			name={name}
			type={type} 
			onChange={handleChange}
			ref={ref}
			disabled={disabled}
			tabIndex={tabIndex} />
	</div>
})

export default Input