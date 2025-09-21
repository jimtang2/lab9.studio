"use client"
import { useState, forwardRef, ChangeEvent, } from "react"
import clsx from "clsx"

interface SelectProps {
	name?: string; 
	label?: string; 
	defaultValue?: string;
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
	children: React.ReactNode;
	onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}





const Select = forwardRef<HTMLSelectElement, SelectProps>(({ 
	name="", 
	label="", 
	defaultValue="", 
	className="", 
	disabled=false, 
	tabIndex=0, 
	children=null, 
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
		select: [
			"col-start-1 row-start-2 row-span-1",
			"outline-accent accent-accent",
			"text-base/6",
			"w-full",
			"px-2",
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