import profileImageUrl from "../assets/me2.jpg";
import { useTyping } from "../hooks/useTyping";
import { useScramble } from "../hooks/useScramble";
import Orb from "../components/Orb";
import { SOCIALS, SKILLS, KNOWLEDGE } from "../data/portfolioData";
import { TECH } from "../data/techIcons";

const TILE_GRADS = [
  ["#ff2d9a", "#ff8a2b"], ["#4a63ff", "#7be4ff"], ["#34d399", "#fde047"],
  ["#8a3ffc", "#ff2d9a"], ["#ff8a2b", "#fde047"], ["#22d3ee", "#8a3ffc"],
];
const TILE_ORBS = [
  ["#fff3b0", "#ffb800", "#a15c00"], ["#c8f3ff", "#2fa8ff", "#0a3d8a"],
  ["#ffd0f0", "#ff4fb8", "#7a0a58"], ["#d8ffd0", "#3ed16a", "#0b5a2a"],
];
const MARQUEE_WORDS = [...SKILLS.map(s => s.name), ...KNOWLEDGE.slice(0, 5).map(k => k.title)];

export default function Home() {
  const typed = useTyping(["Frontend Developer", "Backend Developer", "Backend Learner", "Project Management"]);
  const TITLE = "HI, I'M ELAI";
  const [title, replay] = useScramble(TITLE);

  return (
    <>
      <section id="home" className="hero">
        <h1 className="hero-title chrome" aria-label={TITLE} onPointerEnter={replay}>
          <span aria-hidden="true">{title}</span>
        </h1>

        <div className="hero-stage">
          <div className="hero-sphere">
            <div className="hero-photo">
              <img src={profileImageUrl} alt="Elaiza Jane R. Moreno" />
            </div>
          </div>

          <div className="avatar-badge avatar-badge-stack">
            <span className="avatar-badge-icon" aria-hidden="true" />
            <div>
              <p className="avatar-badge-k">Stack</p>
              <p className="avatar-badge-v">React.js</p>
            </div>
          </div>
          <div className="avatar-badge avatar-badge-status">
            <span className="avatar-badge-icon is-green" aria-hidden="true" />
            <div>
              <p className="avatar-badge-k">Status</p>
              <p className="avatar-badge-v">Open to Work</p>
            </div>
          </div>
        </div>

        {/* floating 3D shapes */}
        <Orb a="#ff8a2b" b="#ff2d9a" c="#5b1a6e" size={74} s={-30} style={{ left: "10%", top: "44%" }} />
        <Orb a="#7be4ff" b="#4a63ff" c="#1a1f6e" size={62} shape="sq" s={40} style={{ right: "11%", top: "38%" }} />
        <Orb a="#c77dff" c="#5a189a" size={54} shape="ring" s={-22} style={{ right: "24%", top: "16%" }} />
        <Orb a="#d8ffd0" b="#3ed16a" c="#0b5a2a" size={34} s={26} style={{ left: "24%", top: "20%" }} />

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
          {/* tech stack tiles: listed twice so the loop is seamless */}
          {[...TECH, ...TECH].map((t, i) => {
            const g = TILE_GRADS[i % 6];
            const o = TILE_ORBS[i % 4];
            return (
              <div key={i} className="marq-tile" style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}>
                <div className="tile-ball">
                  <Orb a={o[0]} b={o[1]} c={o[2]} size={70} float={false} className="tile-orb" />
                  <svg className="tile-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={t.path} />
                  </svg>
                </div>
                <span className="tile-label">{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
