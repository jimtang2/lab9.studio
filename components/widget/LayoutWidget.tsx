"use client"
import { useState, useEffect } from "react"

interface LayoutWidgetProps {
	className?: string
}

export default function LayoutWidget({ className="" }: LayoutWidgetProps) {
	return <div className={className}>
		<div>Browser: <Browser /></div>
	</div>
}

function Browser() {
	const [browser, setBrowser] = useState("")

	useEffect(() => {
		const b = getBrowserName()
		if (b === "Safari") {
			document.body.classList.add("safari")
		}
		setBrowser(b)
	}, [])
	return <>{browser}</>
}

function getBrowserName() {
  const userAgent = navigator.userAgent
  let name: string
  if (/chrome|chromium|crios/i.test(userAgent)) name = "Chrome"
  else if (/firefox|fxios/i.test(userAgent)) name = "Firefox"
  else if (/safari/i.test(userAgent)) name = "Safari"
  else if (/edg/i.test(userAgent)) name = "Edge"
  else if (/opr|opera/i.test(userAgent)) name = "Opera"
  else name = "Unknown"
	return name	
}