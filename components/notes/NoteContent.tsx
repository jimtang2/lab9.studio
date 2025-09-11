"use client"
import { useEffect, useMemo } from "react"
import { Note } from "@/db/schema"
import { useStore } from "@/state/store"
import Loader from "./Loader"
import { parseMarkdown } from "./markdown"
import clsx from "clsx"

export default function NoteContent({ note }: { note: Note | null }) {
	const { 
		showNav, 
		setShowNav,
		setShowNotesList, 
	} = useStore(state => state)
	const defaultContent = ``
  const content = note?.content || defaultContent

  useEffect(() => {
  	if (note === null) {
  		setShowNotesList(true)
  	} else if (showNav) {
  		setShowNav(false)
  	}
  }, [note])

  return <NoteMarkdown text={content} />
}

function NoteMarkdown({text}: {text: string}) {
	const {
		showNav,
		showNotesList,
		noteContentLoading,
		setNoteContentLoading,
	} = useStore(state => state)

	const markdownId = "note-markdown"
	const tocId = "note-toc"
	const [html, toc] = parseMarkdown(text)

	const hasText = text?.length > 0

	const markdownHtml = useMemo(() => ({ __html: html }), [html])
	const tocHtml = useMemo(() => ({ __html: toc }), [toc])

	useEffect(() => {
		noteContentLoading ? setNoteContentLoading(false) : null
		const observer = observeToc(markdownId, tocId)
	  return () => observer.disconnect()			
	}, [html, toc])

  const cls = {
  	loader: [
  		"col-start-1 col-end-[-1]",
  		"row-start-2 row-end-[-1]",
  		"sm:col-start-2 sm:col-end-[-1]",
  		"sm:row-start-1 sm:row-end-[-1]",
  		"xl:col-end-[-2]",
  		"z-40 w-30 h-30 self-center justify-self-center",
  		"animate-spin",
  		"border-t-0 border-r-0 border-b-8 border-l-0 border-accent rounded-full",
  		!noteContentLoading && "hidden pointer-events-none",
  	],
  	markdown: [
			[
				"col-start-1 col-end-[-1] row-start-2 row-end-[-1]",
				"sm:col-start-2 sm:col-end-[-1] sm:row-start-1 sm:row-end-[-1]",
				"xl:col-end-[-2]",
			],
			[
				"h-full max-h-full",
				"overflow-x-hidden overflow-y-auto",
				"px-0 pb-40 sm:mx-2",
				showNotesList ? "pointer-events-none" : "pointer-events-auto",
				"sm:pointer-events-auto",
			],
			[
				"transition-[width] transition-transform duration-150",
				showNav && [
					"w-[calc(100%-50px)] sm:w-full",
					"translate-x-[50px] sm:translate-x-0",
				],
				!showNav && [
					"w-full sm:w-full",
					"translate-x-0 sm:translate-x-0",
				],
			],
			"bg-menu",
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
  		"bg-menu",
  	],
  }

	return <>
		<div className={clsx(cls.loader)}
			id="note-loader" ></div>
		<div className={clsx(cls.markdown)} 
			id={markdownId} 
			dangerouslySetInnerHTML={markdownHtml} />
		<div className={clsx(cls.toc)} 
			id={tocId} 
			dangerouslySetInnerHTML={tocHtml} />
	</>
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
	  rootMargin: '50% 0px 50% 0px',
	  root: document.querySelector(`#${markdownId}`),
	  threshold: 1
	})

	const headings = document.querySelectorAll(`#${markdownId} h1, #${markdownId} h2, #${markdownId} h3`)
	headings.forEach(el => observer.observe(el))	

	return observer
}