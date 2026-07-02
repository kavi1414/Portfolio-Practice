import projects from '../../data/projects'
import './Projects.css'

const featured = projects.filter(p => p.featured)
const others = projects.filter(p => !p.featured)

function Projects() {
  return (
    <section id="projects">
      <div className="section-inner">

        <p className="section-label">What I've built</p>
        <h2 className="section-title">Projects</h2>

        {/* ── Featured ── */}
        <div className="projects-featured">
          {featured.map(p => (
            <ProjectCard key={p.id} project={p} featured />
          ))}
        </div>

        {/* ── Others ── */}
        <h3 className="projects-more-title">More Projects</h3>
        <div className="projects-grid">
          {others.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card reveal${featured ? ' project-card--featured' : ''}`}>
      <div className="project-card-header">
        <span className="project-type">{project.type}</span>
        <span className="project-year">{project.year}</span>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      {featured && project.highlights && (
        <ul className="project-highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
    </article>
  )
}

export default Projects
