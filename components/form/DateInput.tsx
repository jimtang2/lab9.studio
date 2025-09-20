"use client"
import { useState, forwardRef, ChangeEvent, } from "react"
import Input from "./Input"
import clsx from "clsx"

interface DateInputProps {
	name: string; 
	label: string; 
	defaultValue: string;
	placeholder?: string; 
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>((props, ref) => {
	return <Input type="date" {...props} />
})

export default DateInput