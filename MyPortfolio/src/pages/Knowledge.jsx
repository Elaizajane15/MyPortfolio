import FadeIn from "../components/FadeIn";
import SectionHeader from "../components/SectionHeader";
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
              <FadeIn key={k.no} delay={(i % 2) * 0.12} variant={i % 2 ? "right" : "left"}>
                <div className="kcard">
                  <div className="kcard-head">
                    <div className="kicon">
                      <span className="kno">{k.no}</span>
                    </div>
                    <h3 className="ktitle">{k.title}</h3>
                  </div>
                  <p className="kbody">{k.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
