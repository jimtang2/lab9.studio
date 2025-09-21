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
	onChange, }, ref?) => {
	const cls = {
		container: [
			"grid grid-cols-[repeat(2,auto)] grid-rows-[min-content_auto]",
			"bg-menu",
			className,
		],
		label: [
			"col-start-1 col-end-2 row-start-1 row-end-2",
			"relative",
			"px-[calc(2*var(--spacing))] pt-[calc(1.0*var(--spacing))]",
			"text-xs/4 text-accent",
		],
		input: [
			"col-start-1 col-end-[-1] row-start-1 row-end-[-1]",
			"accent-accent",
			"text-base px-2 pt-5 pb-1",
			"outline-accent",
			"w-full",
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