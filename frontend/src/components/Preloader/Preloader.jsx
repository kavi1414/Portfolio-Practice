import { useEffect, useState } from 'react'
import './Preloader.css'

const CHECKS = [
  'Initializing environment',
  'Loading components',
  'Running UI tests',
  'Checking responsiveness',
  'Verifying accessibility',
  'All checks passed',
]

/**
 * QA-themed intro screen: a checklist of "quality checks" tick off one by one
 * over an animated backdrop, then the overlay fades away to reveal the site.
 * Honours reduced motion.
 */
export default function Preloader({ onComplete }) {
  const [checked, setChecked] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.style.overflow = 'hidden'

    const stepDelay = reduced ? 60 : 300
    const timers = []
    let i = 0

    const tick = () => {
      i += 1
      setChecked(i)
      if (i < CHECKS.length) {
        timers.push(setTimeout(tick, stepDelay))
      } else {
        timers.push(setTimeout(() => setDone(true), reduced ? 80 : 450))
      }
    }
    timers.push(setTimeout(tick, stepDelay))

    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      onComplete()
    }, 650) // match the CSS fade-out duration
    return () => clearTimeout(t)
  }, [done, onComplete])

  const percent = Math.round((checked / CHECKS.length) * 100)

  return (
    <div className={`preloader${done ? ' preloader--done' : ''}`} aria-hidden="true">
      {/* Animated backdrop */}
      <div className="preloader-bg">
        <span className="preloader-blob preloader-blob--1" />
        <span className="preloader-blob preloader-blob--2" />
        <span className="preloader-scan" />
      </div>

      <div className="preloader-box">
        <div className="preloader-logo">KJ</div>
        <p className="preloader-title">Running quality checks</p>

        <ul className="preloader-list">
          {CHECKS.map((label, idx) => (
            <li
              key={label}
              className={`preloader-item${idx < checked ? ' is-checked' : ''}`}
            >
              <span className="preloader-check">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none"
                  stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="preloader-label">{label}</span>
            </li>
          ))}
        </ul>

        <div className="preloader-meter">
          <div className="preloader-bar">
            <div className="preloader-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="preloader-percent">{percent}%</span>
        </div>
      </div>
    </div>
  )
}
