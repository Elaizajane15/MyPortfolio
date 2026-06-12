import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV } from "../data/portfolioData";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goContact = () => {
    setMenuOpen(false);
    navigate("/contact");
  };

  return (
    <>
      <header className={["site-header", scrolled ? "scrolled" : ""].filter(Boolean).join(" ")}>
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <div className="brand-mark">
            <span className="brand-initials">EJ</span>
          </div>
          <span className="brand-name">Elaiza Jane</span>
          <span className="brand-dot">.</span>
        </NavLink>

        <nav className="desktop-nav">
          {NAV.map(n => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.path === "/"}
              className={({ isActive }) => `nav-link${isActive ? " on" : ""}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="btn-cta desktop-only" onClick={goContact}>Let's Talk</button>
          <button type="button" className="mob-btn" onClick={() => setMenuOpen(!menuOpen)}>MENU</button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button type="button" className="mobile-menu-close" onClick={() => setMenuOpen(false)}>CLOSE ✕</button>
          {NAV.map(n => (
            <NavLink
              key={n.path}
              to={n.path}
              end={n.path === "/"}
              className="mobile-nav-item"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
