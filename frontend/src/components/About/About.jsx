import personal from '../../data/personal'
import skills from '../../data/skills'
import './About.css'

const education = [
  {
    id: 1,
    degree: 'BSc in Computer Science',
    school: 'University of Colombo School of Computing',
    period: '2023 – 2026',
    note: 'Undergraduate (Current)',
    icon: 'graduation',
  },
  {
    id: 2,
    degree: 'Diploma in English & IT',
    school: 'Esoft Metro College',
    period: '2022 – 2023',
    note: '',
    icon: 'certificate',
  },
  {
    id: 3,
    degree: 'G.C.E A/L — 1A / 2B',
    school: 'Kegalle Vidyalaya',
    period: '2019 – 2022',
    note: 'Physical Science Stream',
    icon: 'book',
  },
]

function About() {
  return (
    <section id="about">
      <div className="section-inner">

        <p className="section-label">Who I am</p>
        <h2 className="section-title">About Me</h2>

        {/* ── Bio ── */}
        <div className="about-bio reveal">
          <div className="about-bio-text">
            <p>{personal.summary}</p>
            <p>
              Currently interning at <span className="about-highlight">OrangeHRM</span> as
              an Automation QA Engineer, where I work with Playwright, TypeScript, MCP browser
              tools, and AI-assisted test healing agents. I thrive in agile environments and
              enjoy collaborating closely with developers to ship reliable software.
            </p>
          </div>
          <div className="about-cards">
            <div className="about-card">
              <div className="about-card-icon">
                <TargetIcon />
              </div>
              <h4>Detail Oriented</h4>
              <p>Systematic approach to finding bugs others miss.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">
                <ZapIcon />
              </div>
              <h4>Fast Learner</h4>
              <p>Picked up Playwright + AI agents within my first internship month.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">
                <UsersIcon />
              </div>
              <h4>Team Player</h4>
              <p>Active contributor in group projects and agile sprint teams.</p>
            </div>
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="skills-section">
          <h3 className="about-sub-title">Skills &amp; Tools</h3>
          <div className="skills-grid">
            {skills.map(cat => (
              <div key={cat.category} className="skill-card reveal">
                <h4 className="skill-card-title">{cat.category}</h4>
                <div className="skill-tags">
                  {cat.items.map(item => (
                    <span key={item} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="education-section">
          <h3 className="about-sub-title">Education</h3>
          <div className="education-list">
            {education.map(edu => (
              <div key={edu.id} className="edu-item reveal">
                <div className="edu-icon">
                  {edu.icon === 'graduation' && <GraduationCapIcon />}
                  {edu.icon === 'certificate' && <CertificateIcon />}
                  {edu.icon === 'book' && <BookOpenIcon />}
                </div>
                <div className="edu-body">
                  <div className="edu-top">
                    <h4>{edu.degree}</h4>
                    <span className="edu-period">{edu.period}</span>
                  </div>
                  <p className="edu-school">{edu.school}</p>
                  {edu.note && <p className="edu-note">{edu.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Education SVG icons ── */
function GraduationCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function CertificateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

function BookOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

/* ── Trait card SVG icons ── */
function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export default About
