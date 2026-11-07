import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";

// Exactly 7 Editorial Phases
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import SelectedWork from "./sections/SelectedWork";
import Leadership from "./sections/Leadership";
import BeyondSoftware from "./sections/BeyondSoftware";
import Contact from "./sections/Contact";

import "./App.css";

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Clear legacy session storage flag to ensure fresh reloads always show preloader
    try {
      sessionStorage.removeItem("mk_portfolio_intro_seen");
    } catch {
      // Ignore in private/restricted environments
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="editorial-app">
        {/* Global Cinematic Personal Preloader */}
        <Preloader onComplete={() => setIsIntroComplete(true)} />

        {/* Global Progress Indicator */}
        <ScrollProgress />

        {/* Global Editorial Navbar */}
        <Navbar />

        {/* Seven Sequential Editorial Phases */}
        <main id="main-content">
          {/* Phase 01: Hero */}
          <Hero isReady={isIntroComplete} />

          {/* Phase 02: About & Technical Capability Matrix */}
          <About />

          {/* Phase 03: Experience & Sticky Storytelling */}
          <Experience />

          {/* Phase 04: Selected Work & Case Studies */}
          <SelectedWork />

          {/* Phase 05: Community & Leadership (ACM Student Chapter) */}
          <Leadership />

          {/* Phase 06: Beyond Software (Certifications & Credentials Archive) */}
          <BeyondSoftware />

          {/* Phase 07: Contact & Calm Editorial Closing */}
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}
