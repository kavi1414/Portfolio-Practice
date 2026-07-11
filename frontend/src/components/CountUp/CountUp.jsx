import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 up to `end` when scrolled into view. Only starts once `start`
 * is true (used to hold off until the intro preloader is done). Respects
 * reduced motion by jumping straight to the final value.
 */
export default function CountUp({ end, suffix = '', duration = 1400, start = true }) {
  const [val, setVal] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || !start) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVal(end)
      return
    }
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * end))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, start, end, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}
