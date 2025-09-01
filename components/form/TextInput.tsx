"use client"
import { useState, forwardRef } from "react"
import Input from "./Input"
import clsx from "clsx"

interface TextInputProps {
	name: string; 
	label: string; 
	placeholder?: string; 
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => <Input type="text" {...props} />)

export default TextInput