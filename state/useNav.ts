import { useState, useEffect } from "react"
import { useStore } from "./store"

export function useNav() {
	const { showNav, setShowNav } = useStore()
	useEffect(() => {}, [showNav])
	
	return {
		showNav: showNav,
		toggleNav: () => setShowNav(!showNav),
	}
}