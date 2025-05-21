"use client"
import { useState, useEffect } from "react"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

import Prism from "prismjs"
import "prismjs/components/prism-c" // required for cpp
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-cpp"
import 'prismjs/components/prism-markup-templating' // required for php
import "prismjs/components/prism-php"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-docker"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-go"
import "prismjs/components/prism-swift"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-css"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-toml"
import "prismjs/components/prism-groovy"
import "prismjs/components/prism-kotlin"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-ruby"

import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

import { useSettings } from "@/lib/state"

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
  	console.log("switch link")
    let t = (themeTag() === null ? createThemeTag() : themeTag()) as Element
    t.setAttribute("href", `/css/prism-${darkMode ? "dark" : "light"}.css`)
		parseCode()
  }, [html, darkMode])

	return (
		<div className={className} dangerouslySetInnerHTML={{__html: html}}></div>
		)
}

