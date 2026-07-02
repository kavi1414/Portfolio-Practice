import { useState, useEffect } from 'react'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    // On first load, check if user already chose a theme — otherwise default to dark
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    // Apply theme to <html data-theme="..."> so all CSS variables switch instantly
    document.documentElement.setAttribute('data-theme', theme)
    // Remember the choice so it survives page refresh
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}

export default useTheme
