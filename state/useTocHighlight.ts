import { useEffect } from "react"

export function useTocHighlight(markdownId: string, tocId: string, deps?: React.DependencyList) {

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const tocEl = document.querySelector(`#${tocId} li > a[href='#${entry.target.id }']`)
				if (entry.isIntersecting) {
					tocEl?.classList.add("active")
				} else {
					tocEl?.classList.remove("active")
				}
			})
			document.querySelectorAll(`#${tocId} li > a.active`).forEach(el => {
				el.classList.remove("top")
			})
			const topEntry = document.querySelector(`#${tocId} li > a.active`)
			topEntry?.classList.add("top")
			topEntry?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, { 
      root: document.querySelector(`#${markdownId}`),
      // rootMargin: '0px 0px -50% 0px',
      threshold: 1
    })

    const headings = document.querySelectorAll(`#${markdownId} h1, #${markdownId} h2, #${markdownId} h3`)
    headings.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, deps)

  return	
}