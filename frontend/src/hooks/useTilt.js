import { useEffect } from 'react'

/**
 * Adds a subtle 3D tilt-toward-cursor effect to every element matching
 * `selector`. Resets cleanly on mouse leave, and is skipped entirely for
 * users who prefer reduced motion (and on touch devices).
 */
export default function useTilt(selector, max = 8) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(hover: none)').matches
    if (reduced || coarse) return

    const els = Array.from(document.querySelectorAll(selector))
    const cleanups = []

    els.forEach(el => {
      const onEnter = () => { el.style.transition = 'transform 0.08s ease' }
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.transform =
          `perspective(700px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`
      }
      const onLeave = () => {
        el.style.transition = 'transform 0.4s ease'
        el.style.transform = ''
      }

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        el.style.transform = ''
        el.style.transition = ''
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [selector, max])
}
