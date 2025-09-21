"use client"
import { useState, forwardRef, ChangeEvent, } from "react"
import clsx from "clsx"

interface InputProps {
	type: "text" | "password" | "date"; 
	name: string; 
	label: string; 
	defaultValue?: string;
	placeholder?: string; 
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
	list?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
	type, 
	name, 
	label, 
	defaultValue="", 
	placeholder="", 
	className="", 
	disabled=false, 
	tabIndex=0, 
	list="",
	onChange, 
}, ref?) => {
	const cls = {
		container: [
			"grid auto-cols-auto grid-rows-[min-content_auto]",
			"bg-menu",
			"h-[44px]",
			className,
		],
		label: [
			"col-start-1 row-start-1 row-end-2",
			"relative",
			"text-xs/4 text-accent",
		],
		input: [
			"col-start-1 row-start-2 row-span-1",
			"outline-accent",
			"text-base/6",
			"w-full",
			"px-2",
			// "m-0! p-0! indent-0!",
			type === "date" ? "" : "accent-accent",
		],
	}
	
	return <div className={clsx(cls.container)}>
		<label className={clsx(cls.label)}
			htmlFor={name}>{label}</label>
		<input className={clsx(cls.input)}
			name={name}
			type={type} 
			defaultValue={defaultValue}
			onChange={onChange}
			ref={ref}
			disabled={disabled}
			tabIndex={tabIndex}
			placeholder={placeholder}
			list={list} />
	</div>
})

export default Input