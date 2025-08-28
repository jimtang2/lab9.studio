import { useState, useEffect } from "react"
import MarkdownIt from "markdown-it"
import MarkdownItAnchor from "markdown-it-anchor"
import MarkdownItToc from "markdown-it-toc-done-right"
import hljs from "highlight.js"
import markdownItHighlightJs from "markdown-it-highlightjs"
import "@/styles/markdown.css"
import "@/styles/highlightjs.css"

export function useMarkdown(text: string) {
  const [html, setHtml] = useState("")
  const [toc, setToc] = useState("")

  useEffect(() => {
    setHtml(
      new MarkdownIt()
        .use(MarkdownItAnchor, { uniqueSlugStartIndex: 1 })
        .use(MarkdownItToc, { callback: (tocHtml: string) => setToc(tocHtml) })
        .use(markdownItHighlightJs, { hljs })
        .render(text)
    )
  }, [text])

  return [html, toc]
}