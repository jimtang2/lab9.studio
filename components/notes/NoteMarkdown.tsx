"use client"
import { useEffect, useMemo } from "react"
import { Note } from "@/db/schema"
import MarkdownIt from "markdown-it"
import MarkdownItAnchor from "markdown-it-anchor"
import MarkdownItToc from "markdown-it-toc-done-right"
import hljs from "highlight.js"
import markdownItHighlightJs from "markdown-it-highlightjs"
import "@/styles/markdown.css"
import "@/styles/highlightjs.css"

interface NoteMarkdownProps {
	note: Note | null;
	setMarkdownHtml: (arg: string) => void;
	setTocHtml: (arg: string) => void;
}

export default function NoteMarkdown({ note, setMarkdownHtml, setTocHtml }: NoteMarkdownProps) {
	const [html, toc] = parseMarkdown(note?.content || "")

	useEffect(() => {
		setMarkdownHtml(html)
		setTocHtml(toc)
	}, [html, toc])

	return <></>
}

export function parseMarkdown(text: string): [ string, string ] {
	let toc = ""
	const html = new MarkdownIt()
	  .use(MarkdownItAnchor, { uniqueSlugStartIndex: 1 })
	  .use(MarkdownItToc, {
	    callback: (_toc: string) => (toc = _toc),
	  })
	  .use(markdownItHighlightJs, { hljs })
	  .render(text)

	return [ html, toc ]
}
