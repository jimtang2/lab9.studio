"use client"
import { useState, useEffect } from "react"


export default function Modal({show, title, message, children}: {
	show: boolean
	title: string
	message: string 
	children: React.ReactNode
}) {
	const [ display, setDisplay ] = useState(false)

	useEffect(() => {
		if (show) {
			setDisplay(show)
		}
	}, [show])

	return (
		<>
			<div className={`${show ? "flex flex-col items-center justify-center" : "hidden"}
				absolute
				w-full h-full z-20
				bg-transparent
				transition-[opacity] duration-500 ease-in-out
				${display ? "opacity-100" : "opacity-0"}
				`} 
					id="modal">

					<div className={`absolute
						flex flex-col items-center justify-center
						w-[300px] max-w-[90%]
						m-auto mt-[-120px]
						bg-background
						border-1 border-divider rounded-md
						select-none shadow-xl
					`}>
						<div className={`w-full
							p-2
							font-bold text-center
							bg-accent
							text-text-contrast
							border-divider rounded-t-md
						`}>
							{title}
						</div>
						<div className={`w-full
							text-center
							p-4
						`}>
							{message}
						</div>
						<div className={`flex flex-row
							w-full
							border-t-1 border-divider
							divide-x-1 divide-divider
						`}>
							{children}
						</div>
					</div>				

			</div>

			<div className={`${show ? "flex flex-col items-center justify-center" : "hidden"}
				absolute
				w-full h-full z-19
				border-divider rounded-sm`}>
			</div>

		</>)
}