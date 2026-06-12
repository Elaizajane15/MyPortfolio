import FadeIn from "../components/FadeIn";
import PageHeader from "../components/PageHeader";
import { EDUCATION } from "../data/portfolioData";

export default function Education() {
  return (
    <>
      <PageHeader
        eyebrow="04 / Education"
        title="My Journey"
        subtitle="A timeline of the schools and milestones that shaped my path into tech."
        icon="🎓"
      />

      <section className="section section-white">
        <div className="section-inner section-inner-narrow">
          <div className="timeline">
            {EDUCATION.map((e, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="edu-card">
                    <div className="edu-top">
                      <div>
                        <h3 className="edu-degree">{e.degree}</h3>
                        <p className="edu-school">{e.school}</p>
                      </div>
                      <div className="edu-meta">
                        <span className="edu-period">{e.period}</span>
                        <span className="edu-location">📍 {e.location}</span>
                      </div>
                    </div>
                    {e.note && <p className="edu-note">{e.note}</p>}
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
