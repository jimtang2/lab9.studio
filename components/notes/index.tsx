"use client"
import { useState, useEffect, useMemo } from "react"
import { useStore } from "@/state/store"
import { Note } from "@/db/schema"
import NotesList from "./NotesList"
import NoteTitle from "./NoteTitle"
import NoteMarkdown from "./NoteMarkdown"
import clsx from "clsx"

interface NotesPageProps {
	notes: Note[];
	note: Note | null;
}

export default function NotesPage({ note, notes, }: NotesPageProps) {
	const [ tocHtml, setTocHtml ] = useState<string>("")
	const [ markdownHtml, setMarkdownHtml ] = useState<string>("")

	const { 
		showNav, 
		setShowNav,
		showNotesList,
		setShowNotesList, 
	} = useStore(state => state)

	const contentMarkup = useMemo(() => ({ __html: markdownHtml }), [markdownHtml])
	const tocMarkup = useMemo(() => ({ __html: tocHtml }), [tocHtml])

  const cls = {
    page: [
      "grid",
      "grid-cols-1 grid-rows-[44px_auto]",
      "sm:grid-cols-[1fr_2fr] sm:grid-rows-1",
      "xl:grid-cols-[1fr_2fr_1fr]",
      "xl:overflow-hidden",
      "h-full max-h-full",
    ], 
    title: [
      "col-start-1 row-start-1",
      "sm:hidden",
    ],
    list: [
      "col-start-1 row-start-2",
      "sm:col-start-1 sm:col-span-1 sm:row-start-1",
			"h-full sm:max-h-[calc(100vh-50px)] sm:max-h-screen max-w-full",
    ],
  	content: [
			"col-start-1 col-end-[-1] row-start-2 row-end-[-1]",
			"sm:col-start-2 sm:col-end-[-1] sm:row-start-1 sm:row-end-[-1]",
			"xl:col-end-[-2]",
			"sm:pointer-events-auto",
			"sm:border-l-1 sm:border-border",
			"xl:border-r-1 xl:pb-[88px]",
			"transition-all transition-transform duration-150",
			"mx-0 px-0 sm:px-2 sm:mx-0",
			"h-full sm:max-h-full sm:max-h-screen max-w-full",
			"overflow-x-hidden overflow-y-auto",
			showNotesList ? "pointer-events-none" : "pointer-events-auto",
  	],
  	toc: [
			"hidden xl:block",
			"xl:col-start-3 xl:col-end-[-1] xl:row-start-1 xl:row-end-[-1]",
			"h-full sm:max-h-[calc(100vh-50px)] sm:max-h-screen max-w-full",
			"whitespace-pre-wrap",
			"overflow-x-hidden overflow-y-auto",
  	],
  }

  useEffect(() => {
  	const observer = observeToc("note-markdown", "note-toc")
    return () => observer.disconnect()			
  }, [contentMarkup, tocMarkup])

	return <div id="notes-page" className={clsx(cls.page)}>
		<NoteTitle className={clsx(cls.title)} note={note} />
		<NotesList className={clsx(cls.list)} notes={notes} />
		<div id={"note-markdown"} 
			className={clsx(cls.content)} 
			dangerouslySetInnerHTML={contentMarkup} />
		<div id={"note-toc"} 
			className={clsx(cls.toc)} 
			dangerouslySetInnerHTML={tocMarkup} />
		<NoteMarkdown {...{ note, setTocHtml, setMarkdownHtml }} />
	</div>
}

function observeToc(markdownId: string, tocId: string): IntersectionObserver {
	const observer = new IntersectionObserver(entries => {
		
		entries.forEach(entry => {
			const tocEl = document.querySelector(`#${tocId} li > a[href='#${entry.target.id }']`)
			entry.isIntersecting ? tocEl?.classList.add("active"): tocEl?.classList.remove("active")
		})

		document.querySelectorAll(`#${tocId} li > a.active`).forEach((el, i) => {
			if (i === 0) {
				el?.classList.add("top")
				el?.scrollIntoView({ behavior: "smooth", block: "center" })
			} else {
				el?.classList.remove("top")
			}
		})
	}, { 
	  // rootMargin: '0% 0px 0% 0px',
	  root: document.querySelector(`#${markdownId}`),
	  threshold: 1
	})

	const headings = document.querySelectorAll(`#${markdownId} h1, #${markdownId} h2, #${markdownId} h3`)
	headings.forEach(el => observer.observe(el))	

	return observer
}