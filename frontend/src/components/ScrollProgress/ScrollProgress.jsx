import { useEffect, useState } from 'react'
import './ScrollProgress.css'

/** Thin accent bar at the very top that fills as the page is scrolled. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
  )
}
