import profileImageUrl from "../assets/me1.jpg";
import FadeIn from "../components/FadeIn";
import PageHeader from "../components/PageHeader";

const INFO = [
  ["Full Name", "Elaiza Jane R. Moreno"],
  ["Location", "Cebu City, Philippines"],
  ["Focus", "Frontend Development, Backend Development, Backend Learner, Problem Solver"],
  ["Status", "Open to Opportunities"],
  ["Languages", "Filipino & English"],
  ["Education", "B.S. Information Technology"],
];

const STATS = [
  ["3+", "Projects Built", "🚀"],
  ["2+", "Years Learning", "📚"],
  ["8+", "Technologies", "⚡"],
];

const VALUES = [
  { icon: "🔍", title: "Curious by Nature", body: "Always exploring new tools, frameworks, and design trends to level up my craft." },
  { icon: "🎯", title: "Detail-Driven", body: "I sweat the small stuff — spacing, motion, and micro-interactions that make UI feel alive." },
  { icon: "🤝", title: "Collaborative", body: "I enjoy working with teams, sharing ideas, and learning from every project I join." },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="02 / About"
        title="About Me"
        subtitle="A closer look at who I am, what I value, and where I'm headed."
      />

      <section className="section section-white">
        <div className="section-inner">
          <div className="about-flex">
            <FadeIn delay={0.1} className="shrink-0">
              <div className="about-card">
                <img src={profileImageUrl} alt="Profile photo" className="about-photo-img" />
                <div className="about-card-fade" />
                <div className="about-chip">
                  <span>FRONTEND</span>
                </div>
              </div>
            </FadeIn>

            <div className="about-text">
              <FadeIn delay={0.15}>
                <p className="about-lead">
                  Hello! I'm <strong className="text-strong">Elaiza Jane R. Moreno</strong>, a frontend developer based in Cebu, Philippines. I love crafting{" "}
                  <span className="text-highlight">beautiful, responsive web experiences</span> that are both functional and delightful.
                </p>
                <p className="about-sublead">
                  An Information Technology student and aspiring frontend developer based in Cebu, Philippines. I specialize in building responsive and user-friendly web applications using modern technologies such as React, HTML, and CSS.
                  <br /><br />
                  I am passionate about continuous learning and enjoy exploring new tools, frameworks, and design trends. I strive to create efficient, functional, and visually appealing digital experiences while continuously improving my technical and problem-solving skills.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="about-grid">
                  {INFO.map(([k, v]) => (
                    <div key={k} className="about-item">
                      <p className="about-item-k">{k}</p>
                      <p className="about-item-v">{v}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.35}>
                <div className="stats-row">
                  {STATS.map(([n, l, ic]) => (
                    <div key={l} className="stat-card">
                      <div className="stat-icon">{ic}</div>
                      <div className="stat-number">{n}</div>
                      <div className="stat-label">{l}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section section-mint">
        <div className="section-inner">
          <FadeIn>
            <div className="section-head section-head-tight">
              <span className="section-kicker">How I Work</span>
              <h2 className="section-title">My Approach</h2>
              <div className="section-underline" />
            </div>
          </FadeIn>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-body">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
