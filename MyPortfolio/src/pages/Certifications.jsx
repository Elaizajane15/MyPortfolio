import FadeIn from "../components/ui/FadeIn";
import SectionHeader from "../components/ui/SectionHeader";
import Orb from "../components/ui/Orb";
import TiltCard from "../components/ui/TiltCard";
import { CERTIFICATIONS } from "../data/portfolioData";

export default function Certifications() {
  return (
    <section id="certifications" className="section section-white">
      <Orb a="#ffd56b" b="#ff9a1f" c="#a14a00" size={90} s={-24} style={{ left: "5%", top: "18%" }} />
      <Orb a="#c77dff" c="#5a189a" size={80} shape="ring" s={30} style={{ right: "6%", bottom: "14%" }} />

      <div className="section-inner">
        <SectionHeader
          eyebrow="05 / Certifications"
          title="Certifications"
          subtitle="Verified badges from AWS Academy. Click a badge to view it on Credly."
        />

        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => {
            const Tag = c.url ? "a" : "div";
            const linkProps = c.url ? { href: c.url, target: "_blank", rel: "noreferrer" } : {};
            return (
              <FadeIn key={c.title} variant="spin" delay={i * 0.15}>
                <TiltCard max={14}>
                  <Tag className="cert-card" {...linkProps}>
                    <div className="cert-badge-wrap tilt-pop">
                      <img className="cert-badge" src={c.img} alt={`${c.title} badge`} loading="lazy" />
                    </div>
                    <p className="cert-date">{c.date}</p>
                    <h3 className="cert-title tilt-pop-sm">{c.title}</h3>
                    <p className="cert-issuer">{c.issuer}</p>
                    {c.url && <span className="cert-link tilt-pop-sm">View Badge ↗</span>}
                  </Tag>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
