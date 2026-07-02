import { useState, useEffect } from 'react'
import personal from '../../data/personal'
import './Navbar.css'

const navLinks = ['About', 'Experience', 'Projects', 'Certifications', 'Contact']

function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0, rootMargin: '-30% 0px -60% 0px' }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <nav className="nav-inner">

        <a href="#hero" className="nav-logo">
          <KJLogo />
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={activeSection === link.toLowerCase() ? 'active' : ''}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a href={personal.cv} download className="nav-cv-btn">
            Download CV
          </a>

          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

      </nav>
    </header>
  )
}

function KJLogo() {
  return (
    <svg width="120" height="58" viewBox="100 60 480 230" xmlns="http://www.w3.org/2000/svg">
      <circle cx="340" cy="140" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="340" y="158" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif"
        fontSize="60" fontWeight="500" fill="currentColor">KJ</text>
      <line x1="200" y1="238" x2="480" y2="238" stroke="currentColor" strokeWidth="1"/>
      <text x="340" y="278" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif"
        fontSize="28" letterSpacing="4" fill="currentColor" opacity="0.7">Quality assured</text>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default Navbar
