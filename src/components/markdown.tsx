"use client"
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import MarkdownIt from "markdown-it"
import markdownItAnchor from "markdown-it-anchor"
import markdownItToc from "markdown-it-toc-done-right"
import Prism from "prismjs"
import "@/lib/prism"
import "./markdown.css"

export default function Markdown({ 
  markdown
}: {
  markdown: string
}) {
  const [html, setHtml] = useState("")
  const [toc, setToc] = useState("")
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

  function highlightCodeSyntax() {
    document.querySelectorAll("pre").forEach(pre => pre.classList.add("line-numbers"))
    Prism.highlightAll()
  }

  useEffect(() => {
    const md = new MarkdownIt()
      .use(markdownItAnchor, {
        uniqueSlugStartIndex: 1
      })
      .use(markdownItToc, { callback: (tocHtml: string) => setToc(tocHtml) })
    const renderedHtml = md.render(markdown)
    setHtml(renderedHtml)
  }, [markdown, darkMode])

  // Theme and syntax highlighting
  useEffect(() => {
    const t = themeTag() === null ? createThemeTag() : themeTag()!
    t.setAttribute("href", `/css/prism-${darkMode ? "dark" : "light"}.css`)
    highlightCodeSyntax()
  }, [html, darkMode])

  // Scroll-based TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (topEntry) {
          document.querySelectorAll(".toc li").forEach((li) => {
            li.classList.remove("active")
            const href = li.querySelector("a")?.getAttribute("href") || ''
            const id = topEntry.target.id
            if (href === `#${id}`) {
              li.classList.add("active")
              li.querySelector("a")?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          })
        }
      },
      { 
        root: document.querySelector(".markdown"),
        rootMargin: '0px 0px -90% 0px',
        threshold: 1
      }
    )

    const headings = document.querySelectorAll(".markdown h1, .markdown h2, .markdown h3")
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [html, darkMode])

  return (
    <>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="toc" dangerouslySetInnerHTML={{ __html: toc }} />
    </>
  )
}