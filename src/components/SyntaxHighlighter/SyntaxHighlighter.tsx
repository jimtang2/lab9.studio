"use client"
import { useState, useEffect } from "react"
import { useSettingsStore } from "@/lib/store"

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

type SyntaxHighlighterProps = {
	html: string 
}

const tag = {
	tag: "link",
	id: "syntax-highlight",
	rel: "stylesheet",
	href: {
		// dark: "/css/prism-xonokai.css",
		dark: "/css/prism-dark.css",
		light: "/css/prism-light.css",
	},
}

function themeTag(): Element | null {
	return document.querySelector(`${tag.tag}#${tag.id}`)
}

function createThemeTag(): Element {
	const t = document.createElement(tag.tag)
	t.setAttribute("id", tag.id)
	t.setAttribute("rel", tag.rel)
	t.setAttribute("href", tag.href.dark)
	document.head.appendChild(t)
	return t
}

export default function SyntaxHighlighter({ html }: SyntaxHighlighterProps) {
	const { darkMode } = useSettingsStore()
	const [ themePath, setThemePath ] = useState("")

	useEffect(() => {
		document.querySelectorAll("pre").forEach(pre => pre.classList.add("line-numbers"))
		Prism.highlightAll()
	}, [html])

	// switch css href on color theme change
	useEffect(() => {
		let t = (themeTag() === null ? createThemeTag() : themeTag()) as Element
		t.setAttribute("href", darkMode ? tag.href.dark : tag.href.light)
	}, [darkMode])

	return <></>
}