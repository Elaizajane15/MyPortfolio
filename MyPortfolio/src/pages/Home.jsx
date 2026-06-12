import { Link } from "react-router-dom";
import profileImageUrl from "../assets/me1.jpg";
import { useTyping } from "../hooks/useTyping";
import { SOCIALS } from "../data/portfolioData";

export default function Home() {
  const typed = useTyping(["Frontend Developer", "Backend Developer", "Backend Learner", "Problem Solver", "Problem Solver"]);

  return (
    <section className="hero">
      <div className="hero-deco hero-deco-1" />
      <div className="hero-deco hero-deco-2" />
      <div className="hero-deco hero-deco-3" />
      <div className="hero-deco hero-deco-4" />
      <div className="hero-deco hero-deco-5" />

      <div className="hero-inner hero-flex">
        {/* LEFT */}
        <div className="hero-left">
          <div className="r1 hero-availability">
            <span className="availability-pill">👋 Available for hire</span>
          </div>

          <h1 className="r2 hero-title">
            Hi, I'm <span className="hero-title-strong">Elaiza Jane</span>
          </h1>
          <h1 className="r3 hero-title hero-title-accent">R. Moreno</h1>

          <p className="r3 hero-typed">
            <span className="hero-typed-muted">I Am A </span>
            <span className="hero-typed-main">{typed}<span className="cursor" /></span>
          </p>

          <p className="r4 hero-subtext">
            Passionate about building clean, accessible, and beautiful web interfaces. Based in Cebu, Philippines — turning ideas into polished digital experiences.
          </p>

          <div className="r5 hero-ctas">
            <Link to="/contact" className="btn-fill">Hire Me ✦</Link>
            <Link to="/knowledge" className="btn-outline">See Projects →</Link>
          </div>

          <div className="r6 hero-social">
            {SOCIALS.map(s => (
              <a key={s.label} className={`social-btn social-${s.code}`} href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                {s.code === "tw" ? "X" : s.code}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — avatar */}
        <div className="hero-right">
          <div className="hero-ring" />
          <div className="hero-ring-dot hero-ring-dot-top" />
          <div className="hero-ring-dot hero-ring-dot-bottom" />

          <div className="float avatar-wrap">
            <div className="avatar-photo">
              <img className="avatar-photo-img" src={profileImageUrl} alt="Profile photo" />
            </div>

            <div className="avatar-badge avatar-badge-stack">
              <span className="avatar-badge-icon">⚡</span>
              <div className="avatar-badge-text">
                <p className="avatar-badge-k">Stack</p>
                <p className="avatar-badge-v">React.js</p>
              </div>
            </div>

            <div className="avatar-badge avatar-badge-status">
              <span className="avatar-badge-icon">✅</span>
              <div className="avatar-badge-text">
                <p className="avatar-badge-k">Status</p>
                <p className="avatar-badge-v">Open to Work</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="scroll-cue">
        <span>EXPLORE</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
