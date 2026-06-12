import FadeIn from "../components/FadeIn";
import PageHeader from "../components/PageHeader";
import { KNOWLEDGE } from "../data/portfolioData";

export default function Knowledge() {
  return (
    <>
      <PageHeader
        eyebrow="05 / Knowledge"
        title="Knowledge Areas"
        subtitle="Core areas built through self-study, projects, and academic training."
        icon="🧠"
      />

      <section className="section section-mint">
        <div className="section-inner">
          <div className="knowledge-grid">
            {KNOWLEDGE.map((k, i) => (
              <FadeIn key={k.no} delay={i * 0.08}>
                <div className="kcard">
                  <div className="kcard-head">
                    <div className="kicon">{k.icon}</div>
                    <div>
                      <span className="kno">{k.no}</span>
                      <h3 className="ktitle">{k.title}</h3>
                    </div>
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
