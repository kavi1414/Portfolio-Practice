import { useState } from 'react'
import useTheme from './hooks/useTheme'// Manages dark mode / light mode
import useScrollReveal from './hooks/useScrollReveal'
import useTilt from './hooks/useTilt'
import useMagnetic from './hooks/useMagnetic'
import ParticleBackground from './components/Background/ParticleBackground'
import Aurora from './components/Background/Aurora'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import Preloader from './components/Preloader/Preloader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Certifications from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme() // It gets the current theme and the function to switch the theme.
  const [loading, setLoading] = useState(true)

  useScrollReveal()
  useTilt('.skill-card, .project-card, .hero-photo-tilt')
  useMagnetic('.btn, .nav-cv-btn')

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Aurora />
      <ParticleBackground theme={theme} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero ready={!loading} />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
