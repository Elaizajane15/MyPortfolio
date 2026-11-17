import { useState, useEffect } from "react";
import { NAV } from "../data/portfolioData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* highlight the nav link of the section currently in the middle of the screen */
  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* lock page scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={["site-header", scrolled ? "scrolled" : ""].filter(Boolean).join(" ")}>
        <a href="#home" className="brand" onClick={close}>
          <div className="brand-mark">
            <span className="brand-initials">EJ</span>
          </div>
          <span className="brand-name">Elai</span>
          <span className="brand-dot">.</span>
        </a>

        <nav className="desktop-nav" aria-label="Sections">
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`nav-link${active === n.id ? " on" : ""}`}
              aria-current={active === n.id ? "true" : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#contact" className="btn-cta desktop-only">Let's Talk</a>
          <button type="button" className="mob-btn" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>MENU</button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button type="button" className="mobile-menu-close" onClick={close}>CLOSE</button>
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`mobile-nav-item${active === n.id ? " active" : ""}`}
              onClick={close}
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
