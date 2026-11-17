import { useRef } from "react";
import SectionHeader from "../components/SectionHeader";
import Orb from "../components/Orb";
import { useInView } from "../hooks/useInView";
import { PROJECTS } from "../data/portfolioData";

const PANEL_GRADS = [
  "linear-gradient(135deg, #8a3ffc, #ff2d9a)",
  "linear-gradient(135deg, #4a63ff, #22d3ee)",
  "linear-gradient(135deg, #ff8a2b, #ff2d9a)",
];

/* Each card is sticky, so as you scroll the next one slides up and stacks on top. */
function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const seen = useInView(ref);

  return (
    <article ref={ref} className={`project-card fade-in fx-zoom${seen ? " in" : ""}`} style={{ "--i": i }}>
      <header className="project-head">
        <div className="project-id">
          <b className="project-no">{String(i + 1).padStart(2, "0")}</b>
          <small className="project-type">
            {p.type}
            <br />
            <span>{p.title}</span>
          </small>
        </div>
        <a className="project-live" href={p.url} target="_blank" rel="noreferrer">
          Live Project ↗
        </a>
      </header>

      <div className="project-body">
        <a className="project-preview" href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} live`}>
          <iframe src={p.url} title={`${p.title} live preview`} loading="lazy" tabIndex={-1} />
          <span className="project-preview-cta">Open live ↗</span>
        </a>

        <div className="project-info" style={{ background: PANEL_GRADS[i % PANEL_GRADS.length] }}>
          <Orb a="#ffd0f0" b="#ff4fb8" c="#7a0a58" size={70} s={-18} className="project-orb" />
          <Orb a="#c8f3ff" b="#2fa8ff" c="#0a3d8a" size={46} shape="sq" s={22} className="project-orb-2" />
          <h3 className="project-title chrome">{p.title.toUpperCase()}</h3>
          <p className="project-desc">{p.desc}</p>
          <div className="project-tags">
            {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
          <a className="btn-fill" href={p.url} target="_blank" rel="noreferrer">Visit Site</a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-white">
      <div className="section-inner project-stack">
        <SectionHeader
          eyebrow="06 / Projects"
          title="Projects"
          subtitle="Things I've built and shipped. Keep scrolling, the cards stack up."
        />
        {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}
