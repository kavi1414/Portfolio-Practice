import personal from '../../data/personal'
import './Footer.css'

const navLinks = ['About', 'Experience', 'Projects', 'Certifications', 'Contact']

function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── Top row ── */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <KJLogo />
            </a>
            <p className="footer-tagline">{personal.tagline}</p>
            <p className="footer-location">
              <LocationIcon /> {personal.location}
            </p>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {navLinks.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${personal.email}`}>
                  <EmailIcon /> Email me
                </a>
              </li>
              <li>
                <a href={personal.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
              <li>
                <a href={personal.github} target="_blank" rel="noreferrer">
                  <GitHubIcon /> GitHub
                </a>
              </li>
              <li>
                <a href={personal.cv} download>
                  <DownloadIcon /> Download CV
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom row ── */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Kavishka Jayathilake. Built with React + Vite.
          </p>
          <button className="footer-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUpIcon />
            Back to top
          </button>
        </div>

      </div>
    </footer>
  )
}

function KJLogo() {
  return (
    <svg width="112" height="86" viewBox="190 60 300 230" xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'var(--accent)' }}>
      <circle cx="340" cy="140" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
      <text x="340" y="158" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif"
        fontSize="60" fontWeight="500" fill="currentColor">KJ</text>
      <line x1="200" y1="238" x2="480" y2="238" stroke="currentColor" strokeWidth="1"/>
      <text x="340" y="278" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif"
        fontSize="28" letterSpacing="4" fill="currentColor" opacity="0.7">Quality assured</text>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
}

export default Footer
