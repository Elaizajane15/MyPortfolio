export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="footer-mark">
          <span className="footer-initials">EJ</span>
        </div>
        <span className="footer-name">Elaiza Jane R. Moreno</span>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} · BUILT WITH ME
      </p>
      <div className="footer-links">
        <a className="footer-link" href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="footer-link" href="https://github.com/Elaizajane15" target="_blank" rel="noreferrer">GitHub</a>
        <a className="footer-link" href="mailto:elaizajanemoreno3@email.com">Email</a>
      </div>
    </footer>
  );
}
