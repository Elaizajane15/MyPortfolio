import profileImageUrl from "../assets/me2.jpg";
import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
import CountUp from "../components/CountUp";

const INFO = [
  ["Full Name", "Elaiza Jane R. Moreno"],
  ["Location", "Talisay City, Cebu, Philippines"],
  ["Education", "BS Information Technology, Cebu Institute of Technology (2023 – 2027)"],
  ["Roles", "Project Manager · Team Leader"],
  ["Languages", "Filipino & English"],
  ["Status", "Open to Opportunities"],
];

const STATS = [
  ["3+", "Projects Built"],
  ["4+", "Years Learning"],
  ["3", "AWS Badges"],
];

const VALUES = [
  { title: "Team Player", body: "I work well with people, whether independently or as part of a team, and I value good teamwork and collaboration." },
  { title: "Natural Leader", body: "As a project manager and team leader, I keep tasks organized, timelines on track, and everyone moving together." },
  { title: "Detail-Oriented", body: "Responsible and careful with quality, I make sure the work I deliver is clean, tested, and done right." },
  { title: "Always Learning", body: "I'm willing to learn and be trained, I handle pressure well, and I keep improving with every challenge." },
];

export default function About() {
  return (
    <>
      <section id="about" className="section section-white">
        <div className="section-inner">
          <SectionHeader
            eyebrow="01 / About"
            title="About Me"
            subtitle="A closer look at who I am, what I value, and where I'm headed."
          />
          <div className="about-flex">
            <FadeIn delay={0.1} variant="left" className="shrink-0">
              <div className="about-card">
                <img src={profileImageUrl} alt="Profile photo" className="about-photo-img" />
                <div className="about-card-fade" />
                <div className="about-chip">
                  <span>BSIT STUDENT</span>
                </div>
              </div>
            </FadeIn>

            <div className="about-text">
              <FadeIn delay={0.15} variant="right">
                <p className="about-lead">
                  Hello! I'm <strong className="text-strong">Elaiza Jane R. Moreno</strong>, an Information Technology student at Cebu Institute of Technology from Talisay City, Cebu. I'm a{" "}
                  <span className="text-highlight">motivated, adaptable and creative</span> developer who loves turning ideas into working apps.
                </p>
                <p className="about-sublead">
                  I bring strong thinking, problem-solving and organizational skills to every project. I'm comfortable working on my own or with a team, and I'm always willing to learn new skills and take on new challenges.
                  <br /><br />
                  I build with Java, JavaScript, PHP, Kotlin and C, using React.js, Spring Boot, MySQL and PostgreSQL, and I've led teams as a project manager. I'm detail-oriented, responsible and good with time, committed to delivering quality work while continuously improving my personal and professional abilities.
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
                  {STATS.map(([n, l]) => (
                    <div key={l} className="stat-card">
                      <div className="stat-number"><CountUp value={n} /></div>
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
              <FadeIn key={v.title} delay={i * 0.15} variant="flip">
                <div className="value-card">
                  <div className="value-icon" aria-hidden="true" />
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
