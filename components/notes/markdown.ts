import MarkdownIt from "markdown-it"
import MarkdownItAnchor from "markdown-it-anchor"
import MarkdownItToc from "markdown-it-toc-done-right"
import hljs from "highlight.js"
import markdownItHighlightJs from "markdown-it-highlightjs"
import "@/styles/markdown.css"
import "@/styles/highlightjs.css"

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