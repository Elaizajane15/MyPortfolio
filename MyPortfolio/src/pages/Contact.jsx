import FadeIn from "../components/ui/FadeIn";
import SectionHeader from "../components/ui/SectionHeader";

const CONTACT_INFO = [
  ["Location", "Talisay City Cebu, Philippines"],
  ["Availability", "Immediate"],
];

const LINKS = [
  { label: "WhatsApp",  value: "+63 936 902 4396",            url: "https://wa.me/639369024396" },
  { label: "Email",     value: "elaizajanemoreno3@gmail.com", url: "mailto:elaizajanemoreno3@gmail.com" },
  { label: "LinkedIn",  value: "linkedin.com",                url: "https://www.linkedin.com/feed/" },
  { label: "GitHub",    value: "@Elaizajane15",               url: "https://github.com/Elaizajane15" },
  { label: "Instagram", value: "@lyzjynn",                    url: "https://www.instagram.com/lyzjynn/" },
  { label: "X",         value: "@lyzjnms",                    url: "https://x.com/lyzjnms" },
];

export default function Contact() {
  return (
    <section id="contact" className="section section-mint">
      <div className="section-inner section-inner-contact">
        <SectionHeader
          eyebrow="07 / Contact"
          title="Let's Talk"
          subtitle="Open to full-time roles, freelance, and collaborations."
        />
        <div className="contact-flex">
          {/* Info */}
          <FadeIn delay={0.1} variant="left" className="contact-info-col">
            <div className="contact-info">
              {CONTACT_INFO.map(([k, v]) => (
                <div key={k} className="contact-item">
                  <div>
                    <p className="contact-item-k">{k}</p>
                    <p className="contact-item-v">{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Links */}
          <FadeIn delay={0.2} variant="right" className="contact-form-col">
            <div className="contact-form-card">
              <p className="contact-links-title">Reach me directly</p>
              <div className="contact-links">
                {LINKS.map(l => (
                  <a
                    key={l.label}
                    className="contact-link"
                    href={l.url}
                    target={l.url.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <span>
                      <span className="contact-item-k">{l.label}</span>
                      <span className="contact-link-v">{l.value}</span>
                    </span>
                    <span className="contact-link-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
