import { useEffect } from "react"
import Prism from "prismjs"
import "./prism"

export function useSyntaxHighlight(deps?: React.DependencyList) {
	useEffect(() => Prism.highlightAll(), deps)
	return 
}