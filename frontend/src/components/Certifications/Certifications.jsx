import certifications from '../../data/certifications'
import istqbLogo from '../../assets/istqb.png'
import postmanLogo from '../../assets/postman.png'
import './Certifications.css'

const featured = certifications.filter(c => c.featured)
const others   = certifications.filter(c => !c.featured)

function Certifications() {
  return (
    <section id="certifications">
      <div className="section-inner">

        <p className="section-label">What I'm certified in</p>
        <h2 className="section-title">Certifications</h2>

        {/* ── Featured badge cards ── */}
        <div className="certs-featured">
          {featured.map(cert => (
            <FeaturedCert key={cert.id} cert={cert} />
          ))}
        </div>

        {/* ── Other certs ── */}
        <div className="certs-grid">
          {others.map(cert => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  )
}

function FeaturedCert({ cert }) {
  const isISTQB   = cert.issuer === 'ISTQB'
  const isPostman = cert.issuer === 'Postman'

  return (
    <div className={`cert-badge reveal ${isISTQB ? 'cert-badge--istqb' : 'cert-badge--postman'}`}>

      {/* Top accent line */}
      <div className="cert-badge-accent" />

      <div className="cert-badge-inner">
        {/* Logo area */}
        <div className="cert-badge-logo">
          {isISTQB && (
            <div className="cert-logo-box">
              <img src={istqbLogo} alt="ISTQB" />
            </div>
          )}
          {isPostman && (
            <div className="cert-logo-box">
              <img src={postmanLogo} alt="Postman" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="cert-badge-body">
          <span className="cert-badge-issuer">{cert.issuer}</span>
          <h3 className="cert-badge-title">{cert.title}</h3>
          <div className="cert-badge-verified">
            <CheckIcon />
            Verified Certification
          </div>
        </div>
      </div>

    </div>
  )
}

function CertCard({ cert }) {
  return (
    <div className="cert-card reveal">
      <div className="cert-card-dot" />
      <div className="cert-card-body">
        <p className="cert-card-title">{cert.title}</p>
        <span className="cert-card-issuer">{cert.issuer}</span>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default Certifications
