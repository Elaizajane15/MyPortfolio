import { useState } from "react";
import FadeIn from "../components/ui/FadeIn";
import SectionHeader from "../components/ui/SectionHeader";
import SkillBar from "../components/ui/SkillBar";
import { SKILLS, SKILL_CATEGORIES } from "../data/portfolioData";

export default function Skills() {
  const [active, setActive] = useState(SKILL_CATEGORIES[0]);
  const filtered = SKILLS.filter(s => s.cat === active);

  return (
    <>
      <section id="skills" className="section section-white">
        <div className="section-inner">
          <SectionHeader
            eyebrow="02 / Skills"
            title="My Skills"
            subtitle="Tools and technologies I use to bring ideas to life — filter by category to explore."
          />
          <FadeIn variant="zoom">
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
            {filtered.map((s, i) => <SkillBar key={s.name} {...s} delay={Math.min(i, 8) * 0.06} />)}
          </div>
        </div>
      </section>
    </>
  );
}
