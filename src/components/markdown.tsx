"use client"
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"

import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItToc from 'markdown-it-toc-done-right'
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import Prism from "prismjs"
import "@/lib/prism"

async function toHTML(markdown: string): Promise<string> {
  return (await unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkRehype) // Convert to HTML AST
    .use(rehypeStringify) // Serialize to HTML string
    .process(markdown)).toString()
}

export default function Markdown({ 
	markdown, 
	className = "" 
}: {
	markdown: string
	className?: string
}) {
	const [html, setHtml] = useState("")
	const { darkMode } = useSettings()

  function themeTag(): Element | null {
    return document.querySelector(`link#syntax-highlight`)
  }

  function createThemeTag(): Element {
    const t = document.createElement("link")
    t.setAttribute("id", "syntax-highlight")
    t.setAttribute("rel", "stylesheet")
    t.setAttribute("href", "/css/prism-dark.css")
    document.head.appendChild(t)
    return t
  }

  function parseCode() {
		document.querySelectorAll("pre").forEach(pre => pre.classList.add("line-numbers"))
		Prism.highlightAll()
  }

	useEffect(() => {
		toHTML(markdown).then(setHtml)
		parseCode()
	}, [markdown])

  useEffect(() => {
    let t = (themeTag() === null ? createThemeTag() : themeTag()) as Element
    t.setAttribute("href", `/css/prism-${darkMode ? "dark" : "light"}.css`)
		parseCode()
  }, [html, darkMode])

	return (
		<div className={className} dangerouslySetInnerHTML={{__html: html}}></div>
		)
}

export function Toc({ className, content }: { 
  className: string
  content: string
}) {
  const [toc, setToc] = useState('')
  useEffect(() => {
    const md = new MarkdownIt()
      .use(markdownItAnchor)
      .use(markdownItToc, { callback: (tocHtml: string) => setToc(tocHtml) })
    md.render(content)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.toc li').forEach((li) => {
              li.classList.toggle('is-active', li.querySelector('a')?.href.includes(entry.target.id))
            })
          }
        })
      },
      { rootMargin: '0px 0px -50% 0px' }
    )
    document.querySelectorAll('h1, h2, h3').forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return <div className={className} dangerouslySetInnerHTML={{ __html: toc }}></div>
}