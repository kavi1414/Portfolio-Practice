import { useState } from 'react'
import personal from '../../data/personal'
import './Contact.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact">
      <div className="section-inner">

        <p className="section-label">Let's connect</p>
        <h2 className="section-title">Get in Touch</h2>

        <div className="contact-grid">

          {/* ── Left: Info ── */}
          <div className="contact-info">
            <p className="contact-intro">
              I'm currently open to QA Engineer roles, internship extensions, and freelance
              testing work. Whether you have a project in mind or just want to say hi —
              my inbox is always open.
            </p>

            <div className="contact-links">
              <a href={`mailto:${personal.email}`} className="contact-link reveal">
                <EmailIcon />
                <div>
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">{personal.email}</span>
                </div>
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact-link reveal">
                <LinkedInIcon />
                <div>
                  <span className="contact-link-label">LinkedIn</span>
                  <span className="contact-link-value">kavishka-jayathilake</span>
                </div>
              </a>
              <a href={personal.github} target="_blank" rel="noreferrer" className="contact-link reveal">
                <GitHubIcon />
                <div>
                  <span className="contact-link-label">GitHub</span>
                  <span className="contact-link-value">kavi1414</span>
                </div>
              </a>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                rows={6}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="form-feedback form-feedback--success">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--error">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export default Contact
