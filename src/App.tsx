import { useState, useEffect, useRef } from 'react'
import './App.css'
import soilSenImg1 from './assets/SoilSen.jpg'
import soilSenImg2 from './assets/SoilSen2.jpg'
import capconportImg from './assets/Capconport.jpg'
import stockImg1 from './assets/Stock1.png'
import stockImg2 from './assets/Stock2.png'
import stockImg3 from './assets/Stock3.png'
import stockImg4 from './assets/Stock4.png'
import passmanagerImg1 from './assets/Passmanager1 (1).png'
import passmanagerImg2 from './assets/Passmanager2.png'
import passmanagerImg3 from './assets/Passmanager3.png'
import passmanagerImg4 from './assets/Passmanager4.png'

/* ─── Data ──────────────────────────────────────────── */

const projects = [
  {
    index: '01',
    title: 'Osperity Mobile App',
    year: '2026',
    role: 'Mobile',
    summary:
      'Mobile monitoring client for industrial operations with map-driven workflows, live camera context, and faster field response.',
    description:
      'Developed a React Native + Expo mobile client with Osperity to improve how field operators consume monitoring data outside the desktop workflow. I built the map-centric experience using Google Maps API, including coordinate conversion, fast site lookup, and navigation paths that reduce interaction friction during active incidents. I also implemented live camera-view access and integrated external APIs with secure key handling. The result was a practical, production-style prototype presented at SAIT\'s Capstone Convention after a 3-month Agile delivery cycle.',
    tags: ['React Native', 'Expo', 'Google Maps API', 'AWS', 'GitHub', 'Jira'],
    github: 'https://github.com/zander1650',
    demo: null,
    video: 'https://www.youtube.com/embed/hRCyR5hYK3A',
    images: [
      { src: capconportImg, alt: 'Osperity team presenting at SAIT Capstone Convention' },
    ],
  },
  {
    index: '02',
    title: 'SoilSen (EmergEx Final Project)',
    year: '2026',
    role: 'Hardware + Mobile',
    summary:
      'End-to-end IoT prototype linking embedded moisture sensing hardware to a mobile-facing data pipeline.',
    description:
      'Presented at SAIT EmergEx with Carter Babin, Karina Chiste, and Zander Fields. We intentionally reduced scope from a full mesh network to a single reliable sensing node so we could ship a complete hardware-to-software loop in one term. The delivered prototype combines a Raspberry Pi Pico, analog moisture sensor, and radio link, then surfaces readings to a mobile app in near real time. This project emphasized engineering trade-offs, interface reliability, and building a stable foundation that can scale into the original multi-node architecture.',
    tags: ['Raspberry Pi Pico', 'IoT', 'Mobile App', 'Embedded Systems', '3D Printing'],
    github: 'https://github.com/zander1650',
    demo: null,
    images: [
      { src: soilSenImg1, alt: 'SoilSen hardware prototype in 3D printed carrot enclosure' },
      { src: soilSenImg2, alt: 'SoilSen project setup and trade show presentation view' },
    ],
  },
  {
    index: '03',
    title: 'Zero-Plaintext Password Manager',
    year: '2026',
    role: 'Security + Full-Stack',
    summary:
      'A privacy-first credential vault that keeps secrets encrypted client-side and never exposes plaintext in transit or storage.',
    description:
      'Built a privacy-focused password manager with React + TypeScript on the frontend and ASP.NET Core on the backend. Cryptographic operations run in-browser using PBKDF2 for key derivation and AES-GCM for encryption/decryption, so the API never receives plaintext credentials. The backend manages vault state, encrypted record persistence, and session token validation while remaining blind to secret values. I also implemented security-focused UX features: inactivity auto-lock, strong password generation, timed clipboard clearing after copy, and full CRUD workflows for encrypted entries.',
    tags: ['React', 'TypeScript', 'ASP.NET Core', 'PBKDF2', 'AES-GCM', 'Security'],
    github: 'https://github.com/zander1650',
    demo: null,
    images: [
      { src: passmanagerImg1, alt: 'Password manager encrypted vault dashboard' },
      { src: passmanagerImg2, alt: 'Password manager entry creation and encryption flow' },
      { src: passmanagerImg3, alt: 'Password manager secure credential details view' },
      { src: passmanagerImg4, alt: 'Password manager security settings and auto-lock UI' },
    ],
  },
  {
    index: '04',
    title: 'Stock Prediction Application',
    year: '2026',
    role: 'C# / ML.NET',
    summary:
      'Cross-platform market analysis system that engineers financial indicators and predicts short-term direction with ML.NET.',
    description:
      'Built a cross-platform stock analysis application in C#, ML.NET, and .NET MAUI + Blazor with a clear service-oriented architecture. The system ingests historical price data, computes technical features (MA5/10/50, RSI, volatility, returns, volume), and trains a binary classifier to forecast next-period direction. I designed the pipeline to keep feature engineering, prediction logic, and UI concerns separate so the model can be iterated without rewriting the app. The model reaches realistic accuracy (~55-60%), which reflects market noise and helped frame results responsibly.',
    tags: ['C#', 'ML.NET', '.NET MAUI', 'Blazor', 'Time Series', 'AWS'],
    github: 'https://github.com/zander1650',
    demo: null,
    images: [
      { src: stockImg1, alt: 'Stock Prediction app dashboard screenshot' },
      { src: stockImg2, alt: 'Stock Prediction model output screenshot' },
      { src: stockImg3, alt: 'Stock Prediction indicators and analytics screenshot' },
      { src: stockImg4, alt: 'Stock Prediction cross-platform UI screenshot' },
    ],
  },
]

const stack: Record<string, string[]> = {
  Languages:  ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#', 'SQL'],
  Frontend:   ['React', 'HTML5', 'CSS3', 'Vite', 'Blazor', '.NET MAUI', 'Tailwind CSS'],
  Backend:    ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  Tooling:    ['Git', 'Docker', 'VS Code', 'Figma', 'Jira', 'AWS'],
}

/* ─── Nav ───────────────────────────────────────────── */

function Nav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const cb = () => setSolid(window.scrollY > 80)
    window.addEventListener('scroll', cb, { passive: true })
    return () => window.removeEventListener('scroll', cb)
  }, [])

  return (
    <nav className={`nav${solid ? ' nav--solid' : ''}`} aria-label="Site navigation">
      <button
        className="nav__wordmark"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ZF
      </button>
      <a href="/resume.pdf" className="nav__resume" download="Zander-Fields-Resume.pdf">
        resume
      </a>
    </nav>
  )
}

/* ─── Hero ──────────────────────────────────────────── */

function Hero() {
  const year = new Date().getFullYear()

  return (
    <section className="hero" id="hero">
      <div className="hero__header">
        <span className="hero__status">
          <span className="hero__dot" aria-hidden="true" />
          Available — seeking co-op {year}
        </span>
      </div>

      <div className="hero__body">
        <h1 className="hero__name">Zander Fields<em>.</em></h1>
        <p className="hero__title">Software Engineer</p>
        <p className="hero__location">SAIT — Calgary, AB</p>
      </div>

      <p className="hero__bio">
        I build software systems that are clear, reliable, and measurable.
        My focus is backend architecture, clean interfaces, and solving real product constraints without overengineering.
      </p>

      <div className="hero__links">
        <a href="mailto:Zander28fields@gmail.com">Zander28fields@gmail.com</a>
        <a href="https://github.com/zander1650" target="_blank" rel="noopener noreferrer">github.com/zander1650</a>
        <a href="https://www.linkedin.com/in/zander-fields-a0194729a/" target="_blank" rel="noopener noreferrer">linkedin.com/in/zander-fields-a0194729a</a>
      </div>
    </section>
  )
}

/* ─── Work ──────────────────────────────────────────── */

function Work() {
  const [active, setActive] = useState<number | null>(null)
  const [lightboxState, setLightboxState] = useState<{
    images: { src: string; alt: string }[]
    index: number
  } | null>(null)

  const closeLightbox = () => setLightboxState(null)

  const showNextImage = () => {
    setLightboxState((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        index: (prev.index + 1) % prev.images.length,
      }
    })
  }

  const showPrevImage = () => {
    setLightboxState((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        index: (prev.index - 1 + prev.images.length) % prev.images.length,
      }
    })
  }

  useEffect(() => {
    if (!lightboxState) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
      if (event.key === 'ArrowRight') {
        showNextImage()
      }
      if (event.key === 'ArrowLeft') {
        showPrevImage()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxState])

  const currentLightboxImage = lightboxState
    ? lightboxState.images[lightboxState.index]
    : null

  return (
    <section className="work section" id="work">
      <div className="section-aside">
        <span>Work</span>
        <span>{projects.length} projects</span>
      </div>

      <div className="section-main">
        <ol className="work__list">
          {projects.map((p, i) => (
            <li key={p.index} className={`work__item${active === i ? ' is-open' : ''}`}>
              <button
                className="work__row"
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
              >
                <span className="work__index">{p.index}</span>
                <span className="work__title-block">
                  <span className="work__title">{p.title}</span>
                  <span className="work__summary">{p.summary}</span>
                </span>
                <span className="work__meta">
                  <span>{p.role}</span>
                  <span>{p.year}</span>
                </span>
                <span className="work__toggle" aria-hidden="true">{active === i ? '−' : '+'}</span>
              </button>

              <div className="work__drawer" aria-hidden={active !== i}>
                <div className="work__drawer-inner">
                  <p className="work__desc">{p.description}</p>
                  {active === i && (p.video || (p.images && p.images.length > 0)) ? (
                    <div className={`work__media${p.video && p.images && p.images.length > 0 ? ' work__media--split' : ''}`}>
                      {p.video ? (
                        <div className="work__video-wrap">
                          <iframe
                            className="work__video"
                            src={p.video}
                            title={`${p.title} video demo`}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      ) : null}
                      {p.images && p.images.length > 0 ? (
                        <div className="work__gallery" aria-label={`${p.title} images`}>
                          {p.images.map((image, imageIndex) => (
                            <figure className="work__figure" key={image.src}>
                              <button
                                type="button"
                                className="work__image-btn"
                                aria-label={`Open image: ${image.alt}`}
                                onClick={() => setLightboxState({ images: p.images, index: imageIndex })}
                              >
                                <img src={image.src} alt={image.alt} loading="eager" decoding="async" />
                              </button>
                            </figure>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="work__footer">
                    <ul className="work__tags">
                      {p.tags.map(t => <li key={t}>{t}</li>)}
                    </ul>
                    <a href={p.github} className="work__link" target="_blank" rel="noopener noreferrer">
                      Source →
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {lightboxState && currentLightboxImage ? (
          <div
            className="work__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Project image preview"
            onClick={closeLightbox}
          >
            {lightboxState.images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="work__lightbox-nav work__lightbox-nav--prev"
                  onClick={(event) => {
                    event.stopPropagation()
                    showPrevImage()
                  }}
                  aria-label="Previous image"
                >
                  {'<'}
                </button>

                <button
                  type="button"
                  className="work__lightbox-nav work__lightbox-nav--next"
                  onClick={(event) => {
                    event.stopPropagation()
                    showNextImage()
                  }}
                  aria-label="Next image"
                >
                  {'>'}
                </button>
              </>
            ) : null}

            <button
              type="button"
              className="work__lightbox-close"
              onClick={(event) => {
                event.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close image preview"
            >
              Close
            </button>

            <img
              className="work__lightbox-image"
              src={currentLightboxImage.src}
              alt={currentLightboxImage.alt}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ─── About ─────────────────────────────────────────── */

function About() {
  return (
    <section className="about section" id="about">
      <div className="section-aside">
        <span>About</span>
      </div>

      <div className="section-main">
        <div className="about__text">
          <p>
            I am a final-year <strong>Software Development student at SAIT</strong> focused on building
            production-style systems, not just demos. I care about architecture that stays understandable
            as requirements grow and teams change.
          </p>
          <p>
            I work across the stack, with most of my depth on backend design, service boundaries,
            and data modeling. I use TypeScript, C#, Node, and Java in projects where correctness,
            maintainability, and observability matter.
          </p>
          <p>
            I enjoy translating ambiguous problems into concrete implementation plans, then iterating
            with feedback until the system is dependable. I am looking for opportunities where strong
            engineering habits, code review, and thoughtful shipping are part of everyday work.
          </p>
        </div>

        <dl className="about__facts">
          <div>
            <dt>Program</dt>
            <dd>Software Development, SAIT</dd>
          </div>
          <div>
            <dt>Grad</dt>
            <dd>Spring 2026</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Calgary, AB</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Open to opportunities</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/* ─── Stack ─────────────────────────────────────────── */

function Stack() {
  return (
    <section className="stack section" id="stack">
      <div className="section-aside">
        <span>Stack</span>
      </div>

      <div className="section-main">
        <table className="stack__table">
          <tbody>
            {Object.entries(stack).map(([cat, items]) => (
              <tr key={cat}>
                <th>{cat}</th>
                <td>
                  {items.map((item, i) => (
                    <span key={item}>
                      {item}{i < items.length - 1 ? <span className="stack__sep" aria-hidden="true"> / </span> : null}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ─── Contact ───────────────────────────────────────── */

function Contact() {
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Website Visitor'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = `mailto:Zander28fields@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    formRef.current?.reset()
  }

  return (
    <section className="contact section" id="contact">
      <div className="section-aside">
        <span>Contact</span>
      </div>

      <div className="section-main">
        <p className="contact__direct">
          Write me directly: <a href="mailto:Zander28fields@gmail.com">Zander28fields@gmail.com</a>
        </p>

        <p className="contact__or">Or use the form below.</p>

        <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
          {sent ? (
            <p className="contact__sent">
              Sent. I'll reply within a day or two.{' '}
              <button type="button" onClick={() => setSent(false)}>Send another.</button>
            </p>
          ) : (
            <>
              <label>
                <span>Name</span>
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" required autoComplete="email" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={4} required />
              </label>
              <button type="submit">Send</button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="footer">
      <span>Zander Fields</span>
      <span>SAIT Software Development · Calgary</span>
    </footer>
  )
}

function BackgroundWires() {
  return (
    <div className="pipe-bg" aria-hidden="true">
      <svg className="pipe-bg__svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wireStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84a9ff" stopOpacity="0.06" />
            <stop offset="48%" stopColor="#8ce7ff" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#aa9dff" stopOpacity="0.08" />
          </linearGradient>

          <radialGradient id="wireGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d5f9ff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#8fd7ff" stopOpacity="0.42" />
            <stop offset="72%" stopColor="#9e9cff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#9e9cff" stopOpacity="0" />
          </radialGradient>

          <filter id="softGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <path id="wire-1" d="M -200 240 C 120 190, 420 300, 740 255 S 1360 180, 1840 270" />
          <path id="wire-2" d="M -200 500 C 120 445, 420 555, 740 510 S 1360 435, 1840 525" />
          <path id="wire-3" d="M -200 760 C 120 705, 420 815, 740 770 S 1360 695, 1840 785" />
        </defs>

        <g className="pipe-bg__paths">
          <use href="#wire-1" />
          <use href="#wire-2" />
          <use href="#wire-3" />
        </g>

        <g className="pipe-bg__lights" filter="url(#softGlow)">
          <circle r="10" fill="url(#wireGlow)">
            <animateMotion dur="42s" repeatCount="indefinite" rotate="auto">
              <mpath href="#wire-1" />
            </animateMotion>
          </circle>

          <circle r="9" fill="url(#wireGlow)">
            <animateMotion dur="48s" begin="-16s" repeatCount="indefinite" rotate="auto">
              <mpath href="#wire-2" />
            </animateMotion>
          </circle>

          <circle r="10" fill="url(#wireGlow)">
            <animateMotion dur="54s" begin="-30s" repeatCount="indefinite" rotate="auto">
              <mpath href="#wire-3" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  )
}

/* ─── App ───────────────────────────────────────────── */

export default function App() {
  return (
    <div className="site-shell">
      <BackgroundWires />
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
