import { useState } from "react";
import FadeIn from "../components/FadeIn";
import PageHeader from "../components/PageHeader";
import SkillBar from "../components/SkillBar";
import { SKILLS, SKILL_CATEGORIES } from "../data/portfolioData";

export default function Skills() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? SKILLS : SKILLS.filter(s => s.cat === active);

  return (
    <>
      <PageHeader
        eyebrow="03 / Skills"
        title="My Skills"
        subtitle="Tools and technologies I use to bring ideas to life — filter by category to explore."
        icon="🛠️"
      />

      <section className="section section-white">
        <div className="section-inner">
          <FadeIn>
            <div className="filter-tabs">
              {SKILL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-tab${active === cat ? " active" : ""}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="skills-grid">
            {filtered.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 0.06} />)}
          </div>
        </div>
      </section>
    </>
  );
}
