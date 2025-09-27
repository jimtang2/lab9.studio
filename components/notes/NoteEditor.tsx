"use client"
import { useState, useEffect, type ChangeEvent } from "react"
import { useStore } from "@/state/store"
import { Note } from "@/db/schema"
import NotesButtons from "./NotesButtons"
import { parseMarkdown } from "./NoteMarkdown"
import clsx from "clsx"

interface NoteEditorProps {
	className?: string;
	note: Note | null;
}

export default function NoteEditor({ className="", note, }: NoteEditorProps) {
	const { editNotes, previewNotes } = useStore(state => state)
	const [ title, setTitle ] = useState("")
	const [ content, setContent ] = useState("")
	const [ markup, setMarkup ] = useState("")

	const cls = {
		container: [
			"grid",
			"grid-cols-[auto_min-content] grid-rows-[44px_auto]", 
			"w-full h-full overflow-hidden",
			"sm:border-l-1 border-border",
			editNotes ? "pointer-events-auto" : "pointer-events-none",
			className,
		],
    buttons: [
    	"col-start-2 col-end-3 row-start-1 row-end-2",
    ],
		title: [
			"col-start-1 col-end-2 row-start-1 row-end-2",
			"px-6 py-0",
			"text-base/[44px]",
			"whitespace-nowrap",
			"bg-menu",
			"resize-none outline-none",
			"border-b-2 border-background",
			editNotes ? "block" : "hidden",
			previewNotes ? "hidden" : "",
		],
		content: [
			"col-start-1 col-end-3 row-start-2 row-end-3",
			"flex-grow-1",
			"px-6 pt-2 pb-12",
			"bg-menu",
			"resize-none outline-none",
			editNotes ? "block" : "hidden",
			previewNotes ? "hidden" : "",
		],
		preview: [
			editNotes ? "block" : "hidden",
			previewNotes ? "" : "hidden",
			"col-start-1 col-end-3 row-start-2 row-end-3",
			"overflow-y-scroll",
			"px-4 py-6",
			"border-6 border-border",
		],
	}

	useEffect(() => {
		setTitle(note?.title || "")
		setContent(note?.content || "")
	}, [note?.id || 0])

	useEffect(() => {
		if (previewNotes) {
			const [contentHtml] = parseMarkdown(content)
			setMarkup(contentHtml)
		}
	}, [note?.id || 0, previewNotes])

	const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value as string)
	}

	const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value as string)
	}

	return <div className={clsx(cls.container)}>
		<NotesButtons className={clsx(cls.buttons)} title={title} content={content} note={note} />
		<textarea className={clsx(cls.title)} value={title} onChange={handleChangeTitle}></textarea>
		<textarea className={clsx(cls.content)} value={content} onChange={handleChangeContent}></textarea>
		<div className={clsx(cls.preview)} id="note-markdown" dangerouslySetInnerHTML={{__html: markup}}></div>
	</div>
}