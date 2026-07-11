import personal from '../../data/personal'
import profileImg from '../../assets/profile.jpg'
import CountUp from '../CountUp/CountUp'
import Typewriter from '../Typewriter/Typewriter'
import './Hero.css'

const ROLES = [
  'QA Automation Engineer',
  'ISTQB® CTFL Certified',
  'Playwright · TypeScript',
  'API & CI/CD Testing',
]

function Hero({ ready = true }) {
  return (
    <section id="hero">
      <div className="hero-inner">

        {/* ── Left: Text ── */}
        <div className="hero-text">
          <div className="hero-badges">
            <span className="hero-badge">ISTQB® CTFL Certified</span>
            <span className="hero-badge hero-badge--green">Open to Work</span>
          </div>

          <h1 className="hero-name">
            Hi, I'm<br />
            <span className="hero-name-accent">{personal.name}</span>
          </h1>

          <p className="hero-title">
            <Typewriter phrases={ROLES} />
          </p>

          <p className="hero-summary">{personal.summary}</p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-outline">Get in Touch</a>
          </div>

          <div className="hero-socials">
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="social-link">
              <LinkedInIcon />
              LinkedIn
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="social-link">
              <GitHubIcon />
              GitHub
            </a>
            <span className="social-sep" />
            <span className="hero-location">
              <LocationIcon />
              {personal.location}
            </span>
          </div>
        </div>

        {/* ── Right: Photo + Stats ── */}
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <div className="hero-photo-tilt">
              <img src={profileImg} alt={personal.name} className="hero-photo" />
              <div className="hero-photo-ring" />
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number"><CountUp end={7} suffix="+" start={ready} /></span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number"><CountUp end={10} suffix="+" start={ready} /></span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number"><CountUp end={1} suffix="+" start={ready} /></span>
              <span className="stat-label">Years Exp.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>Scroll down</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default Hero
