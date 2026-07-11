import { useEffect, useState } from 'react'
import './Typewriter.css'

/**
 * Types each phrase out, pauses, deletes it, then moves to the next — looping.
 * Respects reduced motion by showing the first phrase statically.
 */
export default function Typewriter({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pause = 1600,
}) {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const current = phrases[index % phrases.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex(i => (i + 1) % phrases.length)
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, deleting ? text.length - 1 : text.length + 1))
      }, deleting ? deletingSpeed : typingSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause, reduced])

  if (reduced) {
    return <span className="typewriter">{phrases[0]}</span>
  }

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter-caret" />
    </span>
  )
}
