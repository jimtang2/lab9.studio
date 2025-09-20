"use client"
import { useState, forwardRef, ChangeEvent, } from "react"
import Input from "./Input"
import clsx from "clsx"

interface TextInputProps {
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

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => <Input type="text" {...props} />)

export default TextInput