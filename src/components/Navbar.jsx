import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import BrandMark from "./BrandMark";
import { personalInfo } from "../data/portfolioData";
import "./Navbar.css";

const navItems = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Work", href: "work" },
  { label: "Community", href: "community" },
  { label: "Beyond", href: "beyond" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section link indicator
  useEffect(() => {
    const sectionIds = ["about", "experience", "work", "community", "beyond", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`editorial-nav ${scrolled ? "nav-scrolled" : "nav-top"}`}>
      <div className="nav-container">
        {/* Monogram / Brand Identity */}
        <button
          onClick={() => scrollTo("top")}
          className="nav-brand"
          aria-label="Manthan Kumar - Scroll to top"
        >
          <span className="brand-mark-wrap">
            <BrandMark size={28} className="nav-brand-mark" ariaLabel="Manthan Kumar M Monogram" />
          </span>
          <span className="brand-name">
            <span className="brand-full">{personalInfo.name.toUpperCase()}</span>
            <span className="brand-sub font-mono">ENGINEERING PORTFOLIO</span>
          </span>
        </button>

        {/* Desktop Editorial Navigation */}
        <nav className="nav-menu-desktop" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={`nav-link font-mono ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="nav-label">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="nav-active-line"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls: Theme + Resume + Mobile Hamburger */}
        <div className="nav-actions">
          <ThemeToggle />

          <a
            href={personalInfo.contacts.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume-btn font-mono"
            aria-label="Download or view Manthan Kumar's Resume"
          >
            <span>RESUME</span>
            <ArrowUpRight size={13} className="resume-arrow" />
          </a>

          <button
            type="button"
            className="nav-mobile-trigger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-drawer open"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer-inner">
              <div className="drawer-meta">
                <span className="label-editorial">NAVIGATION</span>
                <span className="font-mono text-muted">{personalInfo.location}</span>
              </div>
              <ul className="drawer-list">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <li key={item.href}>
                      <button
                        onClick={() => scrollTo(item.href)}
                        className={`drawer-link ${isActive ? "active" : ""}`}
                      >
                        <span className="drawer-label">{item.label}</span>
                        <span className="drawer-arrow">→</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="drawer-footer">
                <a
                  href={personalInfo.contacts.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-resume-cta"
                >
                  <span>View Full Resume (PDF)</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
