/*
  SAGE & STONE PALETTE
  #F0F7F4  mint cream    — background
  #D4EDE3  soft mint     — surface / cards
  #7BBF9E  sage green    — accent
  #1F4A35  forest green  — dark text / headings
  #4A7C62  mid green     — secondary text
*/

export const NAV = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Skills", path: "/skills" },
  { label: "Education", path: "/education" },
  { label: "Knowledge", path: "/knowledge" },
  { label: "Contact", path: "/contact" },
];

export const SKILLS = [
  { name: "React.js",           cat: "Frontend",    pct: 80 },
  { name: "JavaScript ES6+",    cat: "Language",    pct: 82 },
  { name: "HTML5 & CSS3",       cat: "Markup",      pct: 92 },
  { name: "Tailwind CSS",       cat: "Styling",     pct: 85 },
  { name: "Figma / UI Design",  cat: "Design",      pct: 74 },
  { name: "Git & GitHub",       cat: "Tooling",     pct: 78 },
  { name: "REST APIs",          cat: "Integration", pct: 70 },
  { name: "Responsive Design",  cat: "Practice",    pct: 88 },
];

export const SKILL_CATEGORIES = ["All", ...new Set(SKILLS.map(s => s.cat))];

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

export const SOCIALS = [
  { code: "in", label: "LinkedIn",  bg: "#0077B5", url: "https://www.linkedin.com/feed/" },
  { code: "gh", label: "GitHub",    bg: "#1F4A35", url: "https://github.com/Elaizajane15" },
  { code: "ig", label: "Instagram", bg: "#E1306C", url: "https://www.instagram.com/lyzjynn/" },
  { code: "tw", label: "X",         bg: "#1DA1F2", url: "https://x.com/lyzjnms" },
];
