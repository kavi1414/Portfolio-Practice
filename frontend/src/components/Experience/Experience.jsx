import experience from '../../data/experience'
import './Experience.css'

function Experience() {
  return (
    <section id="experience">
      <div className="section-inner">

        <p className="section-label">Where I've worked</p>
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          {experience.map((job, index) => (
            <div key={job.id} className={`timeline-item reveal${job.current ? ' current' : ''}`}>

              {/* ── Timeline spine ── */}
              <div className="timeline-spine">
                <div className="timeline-dot">
                  {job.current && <div className="timeline-dot-pulse" />}
                </div>
                {index < experience.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>

              {/* ── Card ── */}
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div className="timeline-card-title">
                    <h3>{job.role}</h3>
                    <div className="timeline-meta">
                      <span className="timeline-company">{job.company}</span>
                      <span className="timeline-sep">·</span>
                      <span className="timeline-location">{job.location}</span>
                    </div>
                  </div>
                  <div className="timeline-card-right">
                    <span className="timeline-period">{job.period}</span>
                    {job.current && (
                      <span className="timeline-current-badge">Current</span>
                    )}
                  </div>
                </div>

                <ul className="timeline-highlights">
                  {job.highlights.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <div className="timeline-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="timeline-tag">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience
