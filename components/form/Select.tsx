"use client"
import { useState, forwardRef, ChangeEvent, } from "react"
import clsx from "clsx"

interface SelectProps {
	name?: string; 
	label?: string; 
	defaultValue?: string;
	// placeholder?: string; 
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
	children: React.ReactNode;
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ 
	name="", 
	label="", 
	// placeholder="", 
	defaultValue="", 
	className="", 
	disabled=false, 
	tabIndex=0, 
	children=null, 
	onChange, 
}, ref?) => {
	const cls = {
		container: [
			"grid grid-cols-[repeat(2,auto)] grid-rows-[min-content_auto]",
			className,
			"bg-menu",
			"overflow-hidden",
		],
		label: [
			"col-start-1 col-end-2 row-start-1 row-end-2",
			"relative",
			"px-[calc(2*var(--spacing))] pt-[calc(1.0*var(--spacing))]",
			"text-xs/4 text-accent",
		],
		select: [
			"col-start-1 col-end-[-1] row-start-1 row-end-[-1]",
			"accent-accent",
			"text-base px-2",
			label.length == 0 ? "py-3" : "pt-5 pb-1",
			"outline-accent",
			"max-w-full",
		],
	}

	return <div className={clsx(cls.container)}>
		<label className={clsx(cls.label)}
			htmlFor={name}>{label}</label>
		<select className={clsx(cls.select)}
			name={name}
			onChange={onChange}
			ref={ref}
			disabled={disabled}
			tabIndex={tabIndex}
			defaultValue={defaultValue}>{children}</select>
	</div>
})

export default Select