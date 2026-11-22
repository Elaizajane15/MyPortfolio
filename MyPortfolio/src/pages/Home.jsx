import memojiSmileUrl from "../assets/images/memoji-smile.png";
import memojiWinkUrl from "../assets/images/memoji-wink.png";
import memojiLaptopUrl from "../assets/images/memoji-laptop-sq.png";
import { useTyping } from "../hooks/useTyping";
import { useScramble } from "../hooks/useScramble";
import { SOCIALS, SKILLS, KNOWLEDGE } from "../data/portfolioData";
import { TECH } from "../data/techIcons";
import { lazy, Suspense } from "react";

// The 3D scene is loaded separately so the page shows up first.
const HeroScene = lazy(() => import("../components/three/HeroScene"));

const MARQUEE_WORDS = [...SKILLS.map(s => s.name), ...KNOWLEDGE.slice(0, 5).map(k => k.title)];

export default function Home() {
  const typed = useTyping(["Frontend Developer", "Backend Developer", "Backend Learner", "Project Management"]);
  const TITLE = "HI, I'M ELAI";
  const [title, replay] = useScramble(TITLE);

  return (
    <>
      <section id="home" className="hero">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        <h1 className="hero-title chrome" aria-label={TITLE} onPointerEnter={replay}>
          <span aria-hidden="true">{title}</span>
        </h1>

        <div className="hero-stage">
          <div className="hero-memoji">
            <img src={memojiSmileUrl} alt="Elaiza Jane R. Moreno" className="memoji-smile" />
            <img src={memojiWinkUrl} alt="" aria-hidden="true" className="memoji-wink" />
            <img src={memojiLaptopUrl} alt="" aria-hidden="true" className="memoji-laptop" />
          </div>

          <div className="avatar-badge avatar-badge-status">
            <span className="avatar-badge-icon is-green" aria-hidden="true" />
            <div>
              <p className="avatar-badge-k">Status</p>
              <p className="avatar-badge-v">Open to Work</p>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-tag r2">
            <span className="availability-pill">Available for hire</span>
            <p className="hero-typed">
              I am a <span className="grad-text">{typed}</span><span className="cursor" />
            </p>
            <p className="hero-subtext">
              Elaiza Jane R. Moreno. I build clean, accessible and beautiful web interfaces from Cebu, Philippines, and turn ideas into polished digital experiences.
            </p>
          </div>

          <div className="hero-actions r3">
            <div className="hero-ctas">
              <a href="#contact" className="btn-fill">Hire Me</a>
              <a href="#projects" className="btn-outline">See Projects →</a>
            </div>
            <div className="hero-social">
              {SOCIALS.map(s => (
                <a key={s.label} className="social-btn" href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                  {s.code === "tw" ? "X" : s.code}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="marq" aria-hidden="true">
        <div className="marq-row chrome">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="marq-word">{w}</span>
          ))}
        </div>
        <div className="marq-row rev">
          {/* tech stack chips: listed twice so the loop is seamless */}
          {[...TECH, ...TECH].map((t, i) => (
            <div key={i} className="tech-chip" style={{ "--c": t.color }}>
              <svg className="tech-chip-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d={t.path} />
              </svg>
              <span className="tech-chip-label">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
