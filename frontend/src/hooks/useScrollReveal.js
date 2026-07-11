import { useEffect } from 'react'

/**
 * Reveals `.reveal` elements as they scroll into view. Uses a plain scroll
 * check (no IntersectionObserver race) and only hides content once the
 * `js-reveal` flag is set — so content can never get stuck invisible.
 */
export default function useScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js-reveal')

    const els = Array.from(document.querySelectorAll('.reveal'))
    if (els.length === 0) return

    let ticking = false
    const reveal = () => {
      ticking = false
      const trigger = window.innerHeight - 40
      for (const el of els) {
        if (
          !el.classList.contains('is-revealed') &&
          el.getBoundingClientRect().top < trigger
        ) {
          el.classList.add('is-revealed')
        }
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(reveal)
      }
    }

    reveal() // reveal whatever is already in view
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // second pass once layout has settled
    const t = setTimeout(reveal, 300)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearTimeout(t)
    }
  }, [])
}
