"use client"
import { useState } from "react"
import Image from "next/image"

import "./Inputs.css"

export function Dropdown({ options, onChange, label }: {
	options: string[]
	onChange: (option: string) => void
	label: string
}) {
	const [ showOptions, setShowOptions ] = useState(false)

	const handleClickItem = (option: string) => {
		setShowOptions(false)
		onChange(option)
	}

	return (
		<div className={`relative`}>
			<div className={`flex flex-row gap-2 px-4 py-2 cursor-pointer select-none`}
				onClick={() => setShowOptions(!showOptions)}>
				<span>{label}</span>
				<Image 
					src="/heroicons/outline/chevron-down.svg" 
					width={16} 
					height={16} 
					alt={"dropdown chevron down"} />
			</div>

			<div className={`absolute
				flex flex-col
				w-fit top-[40px] m-1
				bg-background-lt
				border-divider border-1 rounded-xs
				shadow-md
				${showOptions ? "block" : "hidden"}`}>
				{options.map((option, idx) => 
					<div key={idx} 
						className={`py-2 pl-4 pr-10 text-nowrap cursor-pointer hover:bg-background-dk`}
						onClick={() => handleClickItem(option)}>{option}</div>
					)}
			</div>
		</div>)
}