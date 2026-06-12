import { useState } from "react";
import FadeIn from "../components/FadeIn";
import PageHeader from "../components/PageHeader";
import { SOCIALS } from "../data/portfolioData";

const CONTACT_INFO = [
  ["📧", "Email", "elaizajanemoreno3@email.com"],
  ["📍", "Location", "Talisay City Cebu, Philippines"],
  ["⏰", "Availability", "Immediate"],
];

const FIELDS = [["Name", "Your full name"], ["Email", "your@email.com"]];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="06 / Contact"
        title="Let's Talk"
        subtitle="Open to full-time roles, freelance, and collaborations."
        icon="✉️"
      />

      <section className="section section-white">
        <div className="section-inner section-inner-contact">
          <div className="contact-flex">
            {/* Info */}
            <FadeIn delay={0.1} className="contact-info-col">
              <div className="contact-info">
                {CONTACT_INFO.map(([ic, k, v]) => (
                  <div key={k} className="contact-item">
                    <span className="contact-item-icon">{ic}</span>
                    <div>
                      <p className="contact-item-k">{k}</p>
                      <p className="contact-item-v">{v}</p>
                    </div>
                  </div>
                ))}

                <div className="contact-socialbox">
                  <p className="contact-socialbox-title">Find me on</p>
                  <div className="contact-socialbox-links">
                    {SOCIALS.map(s => (
                      <a key={s.label} className="social-btn social-btn-small" href={s.url} target="_blank" rel="noreferrer" style={{ background: s.bg }} title={s.label} aria-label={s.label}>
                        {s.code === "tw" ? "X" : s.code}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.2} className="contact-form-col">
              <div className="contact-form-card">
                {sent ? (
                  <div className="contact-success">
                    <div className="contact-success-icon">✅</div>
                    <h3 className="contact-success-title">Message Sent!</h3>
                    <p className="contact-success-body">Thanks for reaching out — I'll get back to you as soon as possible.</p>
                    <button type="button" className="btn-outline" onClick={() => setSent(false)}>Send Another</button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      {FIELDS.map(([l, p]) => (
                        <div key={l} className="form-field">
                          <label className="form-label">{l}</label>
                          <input className="inp" placeholder={p} required />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="form-label">Subject</label>
                      <input className="inp" placeholder="What's this about?" required />
                    </div>
                    <div>
                      <label className="form-label">Message</label>
                      <textarea className="inp" placeholder="Tell me about your project or opportunity..." rows={5} required />
                    </div>
                    <button type="submit" className="btn-fill send-btn">Send Message ✉️</button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
