"use client"
import { useState, useEffect } from "react"
import { useSettings } from "@/lib/state"
import MarkdownIt from "markdown-it"
import markdownItAnchor from "markdown-it-anchor"
import markdownItToc from "markdown-it-toc-done-right"
import Prism from "prismjs"
import "@/lib/prism"
import "@/css/markdown.css"

export default function Markdown({ 
  markdown
}: {
  markdown: string
}) {
  const { darkMode } = useSettings()
  const [html, setHtml] = useState("")
  const [toc, setToc] = useState("")

  // render markdown and toc to html
  useEffect(() => {
    const md = new MarkdownIt()
      .use(markdownItAnchor, {
        uniqueSlugStartIndex: 1
      })
      .use(markdownItToc, { callback: (tocHtml: string) => setToc(tocHtml) })
    setHtml(md.render(markdown))
  }, [markdown])

  // set prism style based on color theme
  useEffect(() => {
    let t: Element = document.querySelector(`link#syntax-highlight`) || (() => {
      const t = document.createElement("link")
      t.setAttribute("id", "syntax-highlight")
      t.setAttribute("rel", "stylesheet")
      document.head.appendChild(t)
      return t
    })()
    t.setAttribute("href", `/css/prism-${darkMode ? "dark" : "light"}.css`)
    Prism.highlightAll()
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