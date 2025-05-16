"use client"
import { useState, useEffect } from "react"

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import SyntaxHighlighter from "@/components/SyntaxHighlighter"

async function toHTML(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkRehype) // Convert to HTML AST
    .use(rehypeStringify) // Serialize to HTML string
    .process(markdown)
  return result.toString()
}

type MarkdownTextRendererProps = {
	markdown: string
	className?: string
}

export default function MarkdownTextRenderer({ markdown, className = "" }: MarkdownTextRendererProps) {
	const [html, setHtml] = useState("")
	useEffect(() => {
		toHTML(markdown).then(setHtml)
	}, [markdown])

	return (
		<>
			<div className={className} dangerouslySetInnerHTML={{__html: html}}></div>
			<SyntaxHighlighter html={html} />
		</>
		)
}