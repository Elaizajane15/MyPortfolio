import FadeIn from "../components/ui/FadeIn";
import SectionHeader from "../components/ui/SectionHeader";
import { KNOWLEDGE } from "../data/portfolioData";

export default function Knowledge() {
  return (
    <>
      <section id="knowledge" className="section section-mint">
        <div className="section-inner">
          <SectionHeader
            eyebrow="03 / Knowledge"
            title="Knowledge Areas"
            subtitle="Core areas built through self-study, projects, and academic training."
          />
          <div className="knowledge-grid">
            {KNOWLEDGE.map((k, i) => (
              <FadeIn key={k.no} delay={(i % 2) * 0.08}>
                <div className="kcard">
                  <span className="kno">{k.no}</span>
                  <div className="kcontent">
                    <h3 className="ktitle">{k.title}</h3>
                    <p className="kbody">{k.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
