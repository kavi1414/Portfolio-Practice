import { useEffect } from 'react'

/**
 * Makes elements matching `selector` gently pull toward the cursor while
 * hovered ("magnetic" effect). Resets on leave; skipped for reduced-motion
 * and touch devices.
 */
export default function useMagnetic(selector, strength = 0.25) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(hover: none)').matches
    if (reduced || coarse) return

    const els = Array.from(document.querySelectorAll(selector))
    const cleanups = []

    els.forEach(el => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      }
      const onLeave = () => { el.style.transform = '' }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        el.style.transform = ''
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [selector, strength])
}
