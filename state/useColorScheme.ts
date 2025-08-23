import { useEffect, useState } from 'react'

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState('light')

  useEffect(() => {
  	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setColorScheme(mediaQuery.matches ? 'dark' : 'light')
    const handler = () => setColorScheme(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return colorScheme
}
