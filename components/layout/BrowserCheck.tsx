"use client"
import { useEffect } from "react"

export default function BrowserCheck() {
	useEffect(() => {
	  const browser = getBrowserName()
	  if (browser === "Safari") {
	    document.body.classList.add("safari")
	  }
	}, [])

	return <></>	
}

function getBrowserName() {
  const userAgent = navigator.userAgent
  if (/chrome|chromium|crios/i.test(userAgent)) return "Chrome"
  if (/firefox|fxios/i.test(userAgent)) return "Firefox"
  if (/safari/i.test(userAgent)) return "Safari"
  if (/edg/i.test(userAgent)) return "Edge"
  if (/opr|opera/i.test(userAgent)) return "Opera"
  return "Unknown"
}