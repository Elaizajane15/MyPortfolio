import badgeCloudArchitecting from "../assets/badges/badge-cloud-architecting.png";
import badgeCloudFoundations from "../assets/badges/badge-cloud-foundations.png";
import badgeGenAiFoundations from "../assets/badges/badge-genai-foundations.png";

/*
  SAGE & STONE PALETTE
  #F0F7F4  mint cream    — background
  #D4EDE3  soft mint     — surface / cards
  #7BBF9E  sage green    — accent
  #1F4A35  forest green  — dark text / headings
  #4A7C62  mid green     — secondary text
*/

export const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Knowledge", id: "knowledge" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certifications" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

/* pct is optional: skills without it render as a plain row (no bar). */
const PROG = "Programming & Development";
const FRAME = "Frameworks & Technologies";
const PM = "Project Management";
const TECHSK = "Technical & Computer Skills";
const SOFT = "Soft Skills";

export const SKILLS = [
  { name: "Java",               cat: PROG,  pct: 90 },
  { name: "JavaScript",         cat: PROG,  pct: 82 },
  { name: "PHP",                cat: PROG,  pct: 80 },
  { name: "Kotlin",             cat: PROG,  pct: 85 },
  { name: "HTML",               cat: PROG,  pct: 92 },
  { name: "CSS",                cat: PROG,  pct: 92 },

  { name: "React.js",           cat: FRAME, pct: 80 },
  { name: "Spring Boot",        cat: FRAME, pct: 95 },
  { name: "MySQL",              cat: FRAME, pct: 95 },
  { name: "PostgreSQL",         cat: FRAME, pct: 95 },
  { name: "Git & GitHub",       cat: FRAME, pct: 78 },
  { name: "Tailwind CSS",       cat: FRAME, pct: 85 },
  { name: "REST APIs",          cat: FRAME, pct: 70 },
  { name: "Figma / UI Design",  cat: FRAME, pct: 74 },
  { name: "Responsive Design",  cat: FRAME, pct: 88 },

  { name: "Project Manager",    cat: PM,    pct: 95 },
  { name: "Team Leader",        cat: PM,    pct: 95 },

  { name: "Microsoft Word",                 cat: TECHSK },
  { name: "Microsoft Excel",                cat: TECHSK },
  { name: "Microsoft PowerPoint",           cat: TECHSK },
  { name: "Basic Computer Troubleshooting", cat: TECHSK },
  { name: "File and Document Management",   cat: TECHSK },

  { name: "Teamwork & Collaboration",             cat: SOFT },
  { name: "Kindness",                             cat: SOFT },
  { name: "Quality Assurance",                    cat: SOFT },
  { name: "Multitasking",                         cat: SOFT },
  { name: "Willingness to Learn and Be Trained",  cat: SOFT },
  { name: "Works Well with People",               cat: SOFT },
  { name: "Ability to Work Under Pressure",       cat: SOFT },
  { name: "Good Time Management",                 cat: SOFT },
];

export const TECH_SKILL_CATS = [PROG, FRAME];

export const SKILL_CATEGORIES = [...new Set(SKILLS.map(s => s.cat))];

export const EDUCATION = [
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
  },
];

export const KNOWLEDGE = [
  { no: "01", title: "Project Management",       body: "Coordinating tasks, timelines, and team collaboration for smooth delivery." },
  { no: "02", title: "Full Stack (5-Tier System)", body: "Building systems across layers: UI, business logic, data access, database, and deployment." },
  { no: "03", title: "Frontend Development",     body: "Creating responsive, user-friendly interfaces with modern web technologies." },
  { no: "04", title: "Backend Development",      body: "Implementing server-side logic, APIs, and application workflows." },
  { no: "05", title: "Database",                 body: "Designing schemas and working with databases for reliable data storage and queries." },
  { no: "06", title: "Mobile (Kotlin / Android)", body: "Building Android mobile features and screens using Kotlin." },
  { no: "07", title: "API Integration",          body: "Working with REST APIs, requests, and handling responses cleanly in apps." },
  { no: "08", title: "Version Control",          body: "Using Git/GitHub for branching, merging, and collaborative workflows." },
  { no: "09", title: "System Design Thinking",    body: "Breaking problems into modules and designing maintainable architectures." },
  { no: "10", title: "UI/UX Thinking",           body: "Applying design principles to create clear, intuitive, user-focused interfaces." },
  { no: "11", title: "Continuous Learning",       body: "Improving skills through projects, research, and adapting to new tools." },
];

export const SOCIALS = [
  { code: "in", label: "LinkedIn",  bg: "#0077B5", url: "https://www.linkedin.com/feed/" },
  { code: "gh", label: "GitHub",    bg: "#1F4A35", url: "https://github.com/Elaizajane15" },
  { code: "ig", label: "Instagram", bg: "#E1306C", url: "https://www.instagram.com/lyzjynn/" },
  { code: "tw", label: "X",         bg: "#1DA1F2", url: "https://x.com/lyzjnms" },
  { code: "wa", label: "WhatsApp",  bg: "#25D366", url: "https://wa.me/639369024396" },
];

export const PROJECTS = [
  {
    title: "WizardFrac",
    type: "Capstone Project",
    desc: "A magic-themed interactive web app built as our capstone project. Best experienced in landscape mode.",
    tags: ["Capstone", "Web App", "Vercel"],
    url: "https://capstone-wizard-frac.vercel.app/",
  },
  {
    title: "Daily Thoughts",
    type: "IT342 Group Project",
    desc: "A web app for writing down and keeping your daily thoughts, with user accounts and sign-in.",
    tags: ["IT342", "Group Project", "Auth"],
    url: "https://it-342-d-thoughts-g4-moreno.vercel.app/",
  },
  {
    title: "B-T Glass Fabrication",
    type: "Business Website",
    desc: "A website for B-T Glass Fabrication Services that showcases their work and helps customers get in touch.",
    tags: ["Business Site", "Responsive", "Vercel"],
    url: "https://b-tglassfabricationservices.vercel.app/",
  },
];

export const CERTIFICATIONS = [
  {
    title: "AWS Academy Graduate – Cloud Architecting",
    issuer: "Amazon Web Services Training and Certification",
    date: "October 2026",
    img: badgeCloudArchitecting,
    url: "https://www.credly.com/badges/3d7961ea-dfd9-4feb-b894-b5b12fa59b1e/public_url",
  },
  {
    title: "AWS Academy Graduate – Cloud Foundations",
    issuer: "Amazon Web Services Training and Certification",
    date: "October 2026",
    img: badgeCloudFoundations,
    url: "https://www.credly.com/badges/c689e96c-b637-48d0-8871-a1b33d82f5df/public_url",
  },
  {
    title: "AWS Academy Graduate – Generative AI Foundations",
    issuer: "Amazon Web Services Training and Certification",
    date: "October 2026",
    img: badgeGenAiFoundations,
    url: "https://www.credly.com/badges/b09a5b24-f3b2-4c86-ad5a-fd866fc933fa/public_url",
  },
];
