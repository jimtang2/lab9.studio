import { useState, useEffect } from "react"
import { useStore } from "./store"

export function useNotesList() {
	const { showNotesList, setShowNotesList } = useStore()
	useEffect(() => {}, [showNotesList])
	
	return {
		showNotesList: showNotesList,
		toggleNotesList: () => setShowNotesList(!showNotesList),
	}
}