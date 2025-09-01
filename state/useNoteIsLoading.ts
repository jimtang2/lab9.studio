import { useState, useEffect } from "react"
import { useStore } from "@/state/store"

export function useNoteIsLoading(noteId: number) {
	const loadingNoteId = useStore(state => state.loadingNoteId)
	const setLoadingNoteId = useStore(state => state.setLoadingNoteId)

	useEffect(() => {
		if (loadingNoteId == noteId) {
			setLoadingNoteId(0)
		}
	}, [noteId, loadingNoteId])

	return loadingNoteId !== 0
}