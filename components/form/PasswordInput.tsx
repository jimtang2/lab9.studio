"use client"
import { useState, forwardRef } from "react"
import Input from "./Input"
import clsx from "clsx"

interface PasswordInputProps {
	name: string; 
	label: string; 
	placeholder?: string; 
	className?: string;
	disabled?: boolean;
	tabIndex?: number;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => <Input type="password" {...props} />)

export default PasswordInput