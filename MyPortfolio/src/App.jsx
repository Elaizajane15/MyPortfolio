import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollBand from "./components/ui/ScrollBand";
import NetworkBackground from "./components/layout/NetworkBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Knowledge from "./pages/Knowledge";
import Education from "./pages/Education";
import Certifications from "./pages/Certifications";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { usePointerVars } from "./hooks/usePointerVars";
import { useScrollVars } from "./hooks/useScrollVars";
import "./App.css";

/* One-page portfolio: every section stacked, the header scrolls to each one. */
function App() {
  usePointerVars();
  useScrollVars();
  return (
    <div className="portfolio">
      <NetworkBackground />
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <Home />
        <About />
        <Skills />
        <Knowledge />
        <Education />
        <Certifications />
        <ScrollBand words={["Frontend", "Backend", "UI / UX", "Cloud", "Project Management"]} />
        <Projects />
        <ScrollBand words={["Let's build something", "Open to work", "Say hello"]} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
