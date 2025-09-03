"use client"
import { Note } from "@/db/schema"
import { useStore } from "@/state/store"
import { useMarkdown } from "@/state/useMarkdown"
import { useTocHighlight } from "@/state/useTocHighlight"
import { useNoteIsLoading } from "@/state/useNoteIsLoading"
import Loader from "./Loader"
import clsx from "clsx"

export default function NoteContent({ note }: { note: Note }) {
	const isLoading = useNoteIsLoading(note.id)
  return (
    <>
    	{isLoading && <Loader />}
      <NoteMarkdown text={note.content} />
    </>
  )
}

function NoteMarkdown({text}: {text: string}) {
	const showNav = useStore(state => state.showNav)
	const showNotesList = useStore(state => state.showNotesList)
	const [html, toc] = useMarkdown(text)
	const markdownId = "note-markdown"
	const tocId = "note-toc"
	useTocHighlight(markdownId, tocId, [html, showNav, showNotesList])

  const cls = {
  	markdown: [
			[
				"col-start-1 col-end-[-1]",
				"row-start-2 row-end-[-1]",
				"sm:col-start-2 sm:col-end-[-1]",
				"sm:row-start-1 sm:row-end-[-1]",
				"xl:col-end-[-2]",
			],
			[
				"h-full max-h-full",
				"overflow-x-hidden overflow-y-auto",
				"px-2",
				"bg-background-primary",
				showNotesList ? "pointer-events-none sm:pointer-events-auto" : "pointer-events-auto",
				"sm:border-l-1 sm:border-border",
				"xl:border-r-1",
			],
			[
				"transition-[width] transition-transform duration-300",
				showNav && [
					"w-[calc(100%-50px)] sm:w-full",
					"translate-x-[50px] sm:translate-x-0",
				],
				!showNav && [
					"w-full sm:w-full",
					"translate-x-0 sm:translate-x-0",
				],
			],
  	],
  	toc: [
  		[
  			"hidden xl:block",
  			"xl:col-start-3 xl:col-end-[-1]",
  			"xl:row-start-1 xl:row-end-[-1]",
  		],
  		[
  			"pr-2",
  			"overflow-y-auto",
  		],
  	],
  }

	return <>
		<div id={markdownId} className={clsx(cls.markdown)} dangerouslySetInnerHTML={{ __html: html }} />
		<div id={tocId} className={clsx(cls.toc)} dangerouslySetInnerHTML={{ __html: toc }} />
	</>
}

