import { useRef, useEffect } from 'react'
import './ParticleBackground.css'

/**
 * Animated particle-network background. Fixed behind all content, uses the
 * theme's --accent colour, and stays subtle so text remains readable.
 * Honours prefers-reduced-motion (draws a single static frame, no motion).
 */
function hexToRgb(hex) {
  const m = hex.trim().replace('#', '')
  if (m.length === 6) {
    return {
      r: parseInt(m.slice(0, 2), 16),
      g: parseInt(m.slice(2, 4), 16),
      b: parseInt(m.slice(4, 6), 16),
    }
  }
  return null
}

export default function ParticleBackground({ theme }) {
  const canvasRef = useRef(null)
  const colorRef = useRef({ r: 0, g: 230, b: 118 })

  // Re-read the accent colour whenever the theme changes.
  useEffect(() => {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
    const rgb = hexToRgb(accent)
    if (rgb) colorRef.current = rgb
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let particles = []
    let rafId = null
    const mouse = { x: null, y: null }

    const initParticles = () => {
      const count = Math.min(90, Math.max(24, Math.floor((width * height) / 16000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles()
      if (reduced) render() // redraw the static frame on resize
    }

    const update = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        else if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        else if (p.y > height) p.y = 0
      }
    }

    const render = () => {
      const { r, g, b } = colorRef.current
      ctx.clearRect(0, 0, width, height)

      // dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},0.55)`
        ctx.fill()
      }

      // connecting lines
      const maxDist = 130
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const c = particles[j]
          const dx = a.x - c.x
          const dy = a.y - c.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(c.x, c.y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // connect particles to the cursor
      if (mouse.x !== null) {
        const mDist = 170
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < mDist) {
            const alpha = (1 - dist / mDist) * 0.35
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
            // gentle pull toward the cursor
            p.x -= dx * 0.0016
            p.y -= dy * 0.0016
          }
        }
      }
    }

    const loop = () => {
      update()
      render()
      rafId = requestAnimationFrame(loop)
    }

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    resize()
    if (reduced) {
      render()
    } else {
      loop()
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseout', onMouseLeave)
    }

    window.addEventListener('resize', resize)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-bg" aria-hidden="true" />
}
