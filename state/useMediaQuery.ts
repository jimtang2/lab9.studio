import { useState, useEffect } from "react"

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const updateMatches = () => {
      const newMatches = media.matches
      setMatches(newMatches)
      console.log("useMediaQuery", document.body.offsetWidth)
    }

    // Initial check
    updateMatches()

    // Listen for media query changes
    media.addEventListener("change", updateMatches)

    // Listen for window resize (for document.body.offsetWidth changes)
    window.addEventListener("resize", updateMatches)

    return () => {
      media.removeEventListener("change", updateMatches)
      window.removeEventListener("resize", updateMatches)
    }
  }, [query])

  return matches
}