"use client"
import { Note } from "@/db/schema"
import { useState, useEffect } from "react"
import MarkdownIt from "markdown-it"
import MarkdownItAnchor from "markdown-it-anchor"
import MarkdownItToc from "markdown-it-toc-done-right"
import { useStore } from "@/state/store"
import { useSyntaxHighlight } from "@/state/useSyntaxHighlight"
import clsx from "clsx"

export default function NoteContent({ note }: { note: Note }) {
  return (
    <>
      <NoteTitle title={note.title} />
      <NoteMarkdown text={note.content} />
    </>
  )
}

function NoteTitle({ title }: { title: string }) {
  const cls = [
		[
			"col-start-2 col-end-3",
			"row-start-1 row-end-2",
			"border-b-1 border-border-primary",
		],
		[
			"bg-background-primary",
		],
		[
			"whitespace-nowrap overflow-hidden text-ellipsis",
			"flex items-center",
			"px-2",
		],
		[
			"sm:hidden",
		],
  ]

	return <div id="note-title" className={clsx(cls)}>{title}</div>
}

function NoteMarkdown({text}: {text: string}) {
	const showNav = useStore(state => state.showNav)
	const showNotesList = useStore(state => state.showNotesList)
  const [html, setHtml] = useState("")
  const [toc, setToc] = useState("")

  useEffect(() => {
    setHtml(new MarkdownIt()
      .use(MarkdownItAnchor, { 
      	uniqueSlugStartIndex: 1 
      })
      .use(MarkdownItToc, { 
      	callback: (tocHtml: string) => setToc(tocHtml) 
      })
      .render(text))
  }, [text])

  useSyntaxHighlight([html, showNav, showNotesList])

  const cls = {
  	markdown: [
  		// grid position
			[
				"col-start-1 col-end-[-1]",
				"row-start-2 row-end-[-1]"
			],
			[
				"sm:col-start-2 sm:col-end-[-1]",
				"sm:row-start-1 sm:row-end-[-1]"
			],
			[
				"lg:col-end-[-2]",
			],
			// layout
			[
				"h-full max-h-full",
				"overflow-x-hidden overflow-y-auto",
				"px-2",
				"bg-background-primary",
				showNotesList ? "pointer-events-none" : "pointer-events-auto",
			],
			// animation
			[
				"transition-[width] transition-transform duration-300",
				showNav ? [
					"w-[calc(100%-50px)]",
					"sm:w-full",
					"translate-x-[50px]",
					"sm:translate-x-0",
				] : [
					"w-full",
					"sm:w-full",
					"translate-x-0",
					"sm:translate-x-0",
				],
			],
  	],
  	toc: [
  		"hidden lg:block",
  		[
  			"lg:col-start-3 lg:col-end-[-1]",
  			"lg:row-start-1 lg:row-end-[-1]",
  		],
  		[
  			"overflow-y-auto",
  			"break-all",
  			// "overscroll-contain",  			
  		],
  	],
  }

	return <>
		<div id="note-markdown" className={clsx(cls.markdown)} dangerouslySetInnerHTML={{ __html: html }} />
		<div id="note-toc" className={clsx(cls.toc)} dangerouslySetInnerHTML={{ __html: toc }} />
	</>
}

