import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

/**
 * Neon "glow" cursor: an outlined arrow pointer with a green glow that tracks
 * the mouse exactly. Grows/brightens over interactive elements and dips on
 * click. Renders nothing at all on touch devices (no real mouse), so it can
 * never sit frozen in one place.
 */
export default function CustomCursor() {
  const ref = useRef(null)
  const [enabled] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  useEffect(() => {
    if (!enabled) return

    const el = ref.current
    document.body.classList.add('has-custom-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let raf = null

    const place = () => {
      el.style.transform = `translate(calc(${x}px - 4px), calc(${y}px - 4px))`
      raf = null
    }
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(place)
    }

    const interactive = 'a, button, input, textarea, select, label, .btn, [role="button"]'
    const onOver = (e) => { if (e.target.closest?.(interactive)) el.classList.add('is-hovering') }
    const onOut = (e) => { if (e.target.closest?.(interactive)) el.classList.remove('is-hovering') }
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} className="glow-cursor" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
