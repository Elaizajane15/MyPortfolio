import { useState, useEffect, useRef } from "react";
import profileImageUrl from "./assets/me1.jpg";

/*
  SAGE & STONE PALETTE
  #F0F7F4  mint cream    — background
  #D4EDE3  soft mint     — surface / cards
  #7BBF9E  sage green    — accent
  #1F4A35  forest green  — dark text / headings
  #4A7C62  mid green     — secondary text
*/

const NAV = ["Home", "About", "Skills", "Education", "Knowledge", "Contact"];

const SKILLS = [
  { name: "React.js",           cat: "Frontend",    pct: 80 },
  { name: "JavaScript ES6+",    cat: "Language",    pct: 82 },
  { name: "HTML5 & CSS3",       cat: "Markup",      pct: 92 },
  { name: "Tailwind CSS",       cat: "Styling",     pct: 85 },
  { name: "Figma / UI Design",  cat: "Design",      pct: 74 },
  { name: "Git & GitHub",       cat: "Tooling",     pct: 78 },
  { name: "REST APIs",          cat: "Integration", pct: 70 },
  { name: "Responsive Design",  cat: "Practice",    pct: 88 },
];

const EDUCATION = [
  
  {
    period: "2021 - 2026",
    degree: "B.S. Information Technology",
    school: "Cebu Institute of Technology University",
    location: "N. Bacalso Cebu City, PH",
    note: "3rd Year Student Honor ",
  },
  {
    period: "2019 — 2021",
    degree: "Senior High School · STEM Strand",
    school: "Cebu Institute of Technology University",
    location: "N. Bacalso Cebu City, PH",
  },

  {
    period: "2016 — 2020",
    degree: "Junior High School",
    school: "Saint Theresa School of Talisay Inc.",
    location: "Poblacion Talisay City Cebu",
  },
  {
    period: "2011 — 2016",
    degree: "Elementary School",
    school: "Holy Rosary School of Pardo",
    location: "Poblacion Pardo.",
  }
];

const KNOWLEDGE = [
  { no: "01", icon: "🗂️", title: "Project Management",       body: "Coordinating tasks, timelines, and team collaboration for smooth delivery." },
  { no: "02", icon: "🧱", title: "Full Stack (5-Tier System)", body: "Building systems across layers: UI, business logic, data access, database, and deployment." },
  { no: "03", icon: "🖥️", title: "Frontend Development",     body: "Creating responsive, user-friendly interfaces with modern web technologies." },
  { no: "04", icon: "⚙️", title: "Backend Development",      body: "Implementing server-side logic, APIs, and application workflows." },
  { no: "05", icon: "🗄️", title: "Database",                 body: "Designing schemas and working with databases for reliable data storage and queries." },
  { no: "06", icon: "📱", title: "Mobile (Kotlin / Android)", body: "Building Android mobile features and screens using Kotlin." },
  { no: "07", icon: "🔗", title: "API Integration",          body: "Working with REST APIs, requests, and handling responses cleanly in apps." },
  { no: "08", icon: "🔀", title: "Version Control",          body: "Using Git/GitHub for branching, merging, and collaborative workflows." },
  { no: "09", icon: "🧩", title: "System Design Thinking",    body: "Breaking problems into modules and designing maintainable architectures." },
  { no: "10", icon: "🎨", title: "UI/UX Thinking",           body: "Applying design principles to create clear, intuitive, user-focused interfaces." },
  { no: "11", icon: "🔧", title: "Problem Solving",           body: "Debugging issues and finding practical solutions through analysis and testing." },
  { no: "12", icon: "📚", title: "Continuous Learning",       body: "Improving skills through projects, research, and adapting to new tools." },
];

const SOCIALS = [
  { code: "in", label: "LinkedIn",  bg: "#0077B5", url: "https://www.linkedin.com/feed/" },
  { code: "gh", label: "GitHub",    bg: "#1F4A35", url: "https://github.com/Elaizajane15" },
  { code: "ig", label: "Instagram", bg: "#E1306C", url: "https://www.instagram.com/lyzjynn/" },
  { code: "tw", label: "X",         bg: "#1DA1F2", url: "https://x.com/lyzjnms" },
];

// ── Hooks ─────────────────────────────────────────────────
function useTyping(words) {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi] ?? "";
    let t;
    if (!del && ci < w.length)     t = setTimeout(() => setCi(c => c + 1), 90);
    else if (!del)                  t = setTimeout(() => setDel(true), 2200);
    else if (del && ci > 0)         t = setTimeout(() => setCi(c => c - 1), 45);
    else                            t = setTimeout(() => { setDel(false); setWi(i => (i + 1) % words.length); }, 0);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return (words[wi] ?? "").slice(0, ci);
}

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const delayMs = Math.round(delay * 1000);
  const delayClass = delayMs ? `fd-${delayMs}` : "";
  const classes = ["fade-in", v ? "in" : "", delayClass, className].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}

function SkillBar({ name, cat, pct, delay }) {
  const ref = useRef(null);
  const v = useInView(ref);
  const delayMs = Math.round(delay * 1000);
  const delayClass = `sd-${delayMs}`;
  const classes = ["skill", v ? "in" : "", delayClass].filter(Boolean).join(" ");
  return (
    <div ref={ref} className={classes}>
      <div className="skill-head">
        <div className="skill-left">
          <span className="skill-cat">{cat}</span>
          <span className="skill-name">{name}</span>
        </div>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className={`skill-fill pct-${pct}`} />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive]     = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const typed = useTyping(["Frontend Developer", "Backend Developer", "Backend Learner",   "Problem Solver", "Problem Solver"]);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const secs = NAV.map(n => document.getElementById(n.toLowerCase())).filter(Boolean);
      for (let i = secs.length - 1; i >= 0; i--) {
        if (window.scrollY >= secs[i].offsetTop - 100) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => { setMenuOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div className="portfolio">

      {/* ── HEADER ── */}
      <header className={["site-header", scrolled ? "scrolled" : ""].filter(Boolean).join(" ")}>
        {/* Logo */}
        <div className="brand">
          <div className="brand-mark">
            <span className="brand-initials">EJ</span>
          </div>
          <span className="brand-name">Elaiza Jane</span>
          <span className="brand-dot">.</span>
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          {NAV.map(n => (
            <button key={n} type="button" className={`nav-link${active===n?" on":""}`} onClick={()=>go(n)}>{n}</button>
          ))}
        </nav>

        {/* CTA + mobile */}
        <div className="header-actions">
          <button type="button" className="btn-cta desktop-only" onClick={()=>go("Contact")}>Let's Talk</button>
          <button type="button" className="mob-btn" onClick={()=>setMenuOpen(!menuOpen)}>MENU</button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button type="button" className="mobile-menu-close" onClick={()=>setMenuOpen(false)}>CLOSE ✕</button>
          {NAV.map(n => (
            <button key={n} type="button" className="mobile-nav-item" onClick={()=>go(n)}>{n}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="hero">
        {/* Decorative circles */}
        <div className="hero-deco hero-deco-1" />
        <div className="hero-deco hero-deco-2" />
        <div className="hero-deco hero-deco-3" />
        <div className="hero-deco hero-deco-4" />
        <div className="hero-deco hero-deco-5" />

        <div className="hero-inner hero-flex">

          {/* LEFT */}
          <div className="hero-left">
            <div className="r1 hero-availability">
              <span className="availability-pill">👋 Available for hire</span>
            </div>

            <h1 className="r2 hero-title">
              Hi, I'm <span className="hero-title-strong">Elaiza Jane</span>
            </h1>
            <h1 className="r3 hero-title hero-title-accent">R. Moreno</h1>

            <p className="r3 hero-typed">
              <span className="hero-typed-muted">I Am A </span>
              <span className="hero-typed-main">{typed}<span className="cursor" /></span>
            </p>

            <p className="r4 hero-subtext">
              Passionate about building clean, accessible, and beautiful web interfaces. Based in Cebu, Philippines — turning ideas into polished digital experiences.
            </p>

            <div className="r5 hero-ctas">
              <button type="button" className="btn-fill" onClick={()=>go("Contact")}>Hire Me ✦</button>
              <button type="button" className="btn-outline" onClick={()=>go("Knowledge")}>See Projects →</button>
            </div>

            <div className="r6 hero-social">
              {SOCIALS.map(s => (
                <a key={s.label} className={`social-btn social-${s.code}`} href={s.url} target="_blank" rel="noreferrer" title={s.label} aria-label={s.label}>
                  {s.code === "tw" ? "X" : s.code}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — avatar */}
          <div className="hero-right">
            <div className="hero-ring" />
            <div className="hero-ring-dot hero-ring-dot-top" />
            <div className="hero-ring-dot hero-ring-dot-bottom" />

            <div className="float avatar-wrap">
              <div className="avatar-photo">
                <img className="avatar-photo-img" src={profileImageUrl} alt="Profile photo" />
              </div>

              <div className="avatar-badge avatar-badge-stack">
                <span className="avatar-badge-icon">⚡</span>
                <div className="avatar-badge-text">
                  <p className="avatar-badge-k">Stack</p>
                  <p className="avatar-badge-v">React.js</p>
                </div>
              </div>

              <div className="avatar-badge avatar-badge-status">
                <span className="avatar-badge-icon">✅</span>
                <div className="avatar-badge-text">
                  <p className="avatar-badge-k">Status</p>
                  <p className="avatar-badge-v">Open to Work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="scroll-cue">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

          {/* ── ABOUT ── */}
      <section id="about" style={{ padding:"110px 6%", background:"#fff" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"#7BBF9E", letterSpacing:3, textTransform:"uppercase" }}>02 / About</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#1F4A35", marginTop:8, marginBottom:0 }}>About Me</h2>
              <div style={{ width:48, height:3, background:"linear-gradient(90deg,#7BBF9E,#D4EDE3)", borderRadius:2, margin:"14px auto 0" }} />
            </div>
          </FadeIn>
 
          <div className="about-flex" style={{ display:"flex", gap:72, alignItems:"center" }}>
            <FadeIn delay={0.1} style={{ flexShrink:0 }}>
              <div style={{ width:280, height:320, borderRadius:24, background:"linear-gradient(145deg,#D4EDE3,#F0F7F4)", border:"1px solid rgba(123,191,158,0.3)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:"0 8px 32px rgba(31,74,53,0.1)" }}>
                <img src={profileImageUrl} alt="Profile photo" className="about-photo-img" />
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top, rgba(31,74,53,0.08), transparent)", height:80 }} />
                <div style={{ position:"absolute", top:16, right:16, background:"#7BBF9E", borderRadius:20, padding:"4px 12px" }}>
                  <span style={{ fontSize:"0.65rem", fontWeight:700, color:"#fff", letterSpacing:1 }}>FRONTEND</span>
                </div>
              </div>
            </FadeIn>
 
            <div style={{ flex:1 }}>
              <FadeIn delay={0.15}>
                <p style={{ fontSize:"1.05rem", lineHeight:1.9, color:"#4A7C62", marginBottom:20, fontWeight:300 }}>
                  Hello! I'm <strong style={{ color:"#1F4A35", fontWeight:700 }}>Elaiza Jane R. Moreno</strong>, a frontend developer based in Cebu, Philippines. I love crafting{" "}
                  <span style={{ color:"#1F4A35", fontWeight:600 }}>beautiful, responsive web experiences</span> that are both functional and delightful.
                </p>
                <p style={{ fontSize:"0.95rem", lineHeight:1.9, color:"#93b8a6", marginBottom:36, fontWeight:300 }}>
                  an Information Technology student and aspiring frontend developer based in Cebu, Philippines. I specialize in building responsive and user-friendly web applications using modern technologies such as React, HTML, and CSS.

I am passionate about continuous learning and enjoy exploring new tools, frameworks, and design trends. I strive to create efficient, functional, and visually appealing digital experiences while continuously improving my technical and problem-solving skills.
                </p>
              </FadeIn>
 
              <FadeIn delay={0.25}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px 32px", marginBottom:40 }}>
                  {[["Full Name","Elaiza Jane R. Moreno"],["Location","Cebu City, Philippines"],["Focus","Frontend Development, Backend Development, Backend Learner, Problem Solver"],["Status","Open to Opportunities"],["Languages","Filipino & English"],["Education","B.S. Information Technology"]].map(([k,v])=>(
                    <div key={k} style={{ padding:"12px 16px", background:"#F0F7F4", borderRadius:10, border:"1px solid rgba(123,191,158,0.2)" }}>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", color:"#7BBF9E", letterSpacing:2, textTransform:"uppercase", marginBottom:4 }}>{k}</p>
                      <p style={{ fontSize:"0.85rem", color:"#1F4A35", fontWeight:600 }}>{v}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
 
              <FadeIn delay={0.35}>
                <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                  {[["3+","Projects Built","🚀"],["2+","Years Learning","📚"],["8+","Technologies","⚡"]].map(([n,l,ic])=>(
                    <div key={l} className="stat-card">
                      <div style={{ fontSize:"1.4rem", marginBottom:4 }}>{ic}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.4rem", fontWeight:700, color:"#1F4A35", lineHeight:1 }}>{n}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"#7BBF9E", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

        {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"110px 6%", background:"#F0F7F4" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"#7BBF9E", letterSpacing:3, textTransform:"uppercase" }}> Skills</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#1F4A35", marginTop:8, marginBottom:0 }}>My Skills</h2>
              <div style={{ width:48, height:3, background:"linear-gradient(90deg,#7BBF9E,#D4EDE3)", borderRadius:2, margin:"14px auto 0" }} />
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(440px,1fr))", gap:"8px 60px" }}>
            {SKILLS.map((s,i) => <SkillBar key={s.name} {...s} delay={i*0.06} />)}
          </div>
        </div>
      </section>
 


      {/* ── EDUCATION ── */}
      <section id="education" style={{ padding:"110px 6%", background:"#fff" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"#7BBF9E", letterSpacing:3, textTransform:"uppercase" }}>Education</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#1F4A35", marginTop:8, marginBottom:0 }}>Education</h2>
              <div style={{ width:48, height:3, background:"linear-gradient(90deg,#7BBF9E,#D4EDE3)", borderRadius:2, margin:"14px auto 0" }} />
            </div>
          </FadeIn>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {EDUCATION.map((e,i) => (
              <FadeIn key={i} delay={i*0.15}>
                <div className="edu-card">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:10 }}>
                    <div>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#1F4A35", marginBottom:4 }}>{e.degree}</h3>
                      <p style={{ fontWeight:700, color:"#7BBF9E", fontSize:"0.9rem", marginBottom:0 }}>{e.school}</p>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                      <span style={{ background:"rgba(123,191,158,0.15)", color:"#1F4A35", borderRadius:20, padding:"4px 14px", fontSize:"0.72rem", fontWeight:700, fontFamily:"'DM Mono',monospace", border:"1px solid rgba(123,191,158,0.3)" }}>{e.period}</span>
                      <span style={{ fontSize:"0.75rem", color:"#93b8a6" }}>📍 {e.location}</span>
                    </div>
                  </div>
                  <p style={{ fontSize:"0.88rem", color:"#4A7C62", lineHeight:1.75, fontWeight:300 }}>{e.note}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

     {/* ── KNOWLEDGE ── */}
      <section id="knowledge" style={{ padding:"110px 6%", background:"#F0F7F4" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"#7BBF9E", letterSpacing:3, textTransform:"uppercase" }}> Knowledge</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#1F4A35", marginTop:8, marginBottom:0 }}>Knowledge Areas</h2>
              <div style={{ width:48, height:3, background:"linear-gradient(90deg,#7BBF9E,#D4EDE3)", borderRadius:2, margin:"14px auto 0" }} />
            </div>
            <p style={{ textAlign:"center", color:"#93b8a6", fontSize:"0.9rem", marginTop:14, marginBottom:52, fontWeight:300 }}>
              Core areas built through self-study, projects, and academic training.
            </p>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {KNOWLEDGE.map((k,i) => (
              <FadeIn key={k.no} delay={i*0.08}>
                <div className="kcard">
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#D4EDE3,#F0F7F4)", border:"1px solid rgba(123,191,158,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem" }}>{k.icon}</div>
                    <div>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"#7BBF9E", letterSpacing:2, display:"block", marginBottom:2 }}>{k.no}</span>
                      <h3 style={{ fontSize:"0.95rem", fontWeight:700, color:"#1F4A35" }}>{k.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize:"0.85rem", color:"#4A7C62", lineHeight:1.8, fontWeight:300 }}>{k.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
 {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"110px 6%", background:"#fff" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"#7BBF9E", letterSpacing:3, textTransform:"uppercase" }}>Contact</span>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#1F4A35", marginTop:8, marginBottom:0 }}>Let's Talk</h2>
              <div style={{ width:48, height:3, background:"linear-gradient(90deg,#7BBF9E,#D4EDE3)", borderRadius:2, margin:"14px auto 0" }} />
              <p style={{ color:"#93b8a6", fontSize:"0.9rem", marginTop:14, fontWeight:300 }}>Open to full-time roles, freelance, and collaborations.</p>
            </div>
          </FadeIn>
 
          <div className="contact-flex" style={{ display:"flex", gap:60, alignItems:"flex-start" }}>
            {/* Info */}
            <FadeIn delay={0.1} style={{ flex:"0 0 260px" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[["📧","Email","elaizajanemoreno3@email.com"],["📍","Location","Talisay City Cebu, Philippines"],["⏰","Availability","Immediate"]].map(([ic,k,v])=>(
                  <div key={k} style={{ display:"flex", gap:14, alignItems:"flex-start", background:"#F0F7F4", borderRadius:14, padding:"16px 18px", border:"1px solid rgba(123,191,158,0.2)" }}>
                    <span style={{ fontSize:"1.2rem" }}>{ic}</span>
                    <div>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", color:"#7BBF9E", letterSpacing:2, textTransform:"uppercase", marginBottom:3 }}>{k}</p>
                      <p style={{ fontSize:"0.85rem", color:"#1F4A35", fontWeight:600 }}>{v}</p>
                    </div>
                  </div>
                ))}
 
                <div style={{ marginTop:8, background:"linear-gradient(135deg,#1F4A35,#2d6b4e)", borderRadius:16, padding:"24px 20px", textAlign:"center" }}>
                  <p style={{ fontSize:"0.85rem", color:"rgba(240,247,244,0.7)", marginBottom:12, fontWeight:300 }}>Find me on</p>
                  <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
                    {SOCIALS.map(s=>(
                      <a key={s.label} className="social-btn" href={s.url} target="_blank" rel="noreferrer" style={{ background:s.bg, width:38, height:38 }} title={s.label} aria-label={s.label}>
                        {s.code === "tw" ? "X" : s.code}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
 
           

           {/* Form */}
            <FadeIn delay={0.2} style={{ flex:1 }}>
              <div style={{ background:"#F0F7F4", borderRadius:24, padding:"36px 32px", border:"1px solid rgba(123,191,158,0.2)" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                    {[["Name","Your full name"],["Email","your@email.com"]].map(([l,p])=>(
                      <div key={l} style={{ flex:1, minWidth:140 }}>
                        <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"#7BBF9E", letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:8 }}>{l}</label>
                        <input className="inp" placeholder={p} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"#7BBF9E", letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:8 }}>Subject</label>
                    <input className="inp" placeholder="What's this about?" />
                  </div>
                  <div>
                    <label style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:"#7BBF9E", letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:8 }}>Message</label>
                    <textarea className="inp" placeholder="Tell me about your project or opportunity..." rows={5} />
                  </div>
                  <button className="btn-fill" style={{ alignSelf:"flex-start" }}>Send Message ✉️</button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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
    </div>
  );
}
