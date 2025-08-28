import { useState, useEffect } from "react"

import MarkdownIt from "markdown-it"
import MarkdownItAnchor from "markdown-it-anchor"
import MarkdownItToc from "markdown-it-toc-done-right"
import MarkdownItPrism from "markdown-it-prism"

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

import "@/styles/prism.css"
import "@/styles/markdown.css"

export function useMarkdown(text: string) {
  const [html, setHtml] = useState("")
  const [toc, setToc] = useState("")

  useEffect(() => {
    setHtml(new MarkdownIt()
      .use(MarkdownItAnchor, { uniqueSlugStartIndex: 1,})
      .use(MarkdownItToc, { callback: (tocHtml: string) => setToc(tocHtml),})
      .use(MarkdownItPrism)
      .render(text))
  }, [text])

  return [html, toc]
}