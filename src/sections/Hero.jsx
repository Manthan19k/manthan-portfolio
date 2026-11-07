import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import "./Hero.css";

export default function Hero({ isReady = true }) {
  const containerRef = useRef(null);

  // Scroll transformation: smoothly transforms the hero during initial scroll
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 480], [1, 0.15]);
  const heroY = useTransform(scrollY, [0, 480], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 480], [1, 0.96]);

  // Subtle pointer interaction on technical markings
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 16);
    mouseY.set(y * 16);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="editorial-hero"
      id="hero"
    >
      {/* Subtle Grid Backdrop */}
      <div className="technical-grid-bg" aria-hidden="true" />

      <motion.div
        className="hero-container container"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        {/* Top Status Bar */}
        <div className="hero-top-annotation font-mono">
          <motion.div
            className="hero-status-tag"
            initial={{ opacity: 0, x: 15 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="status-pulse-dot" />
            <span className="status-label">{personalInfo.availability.toUpperCase()}</span>
          </motion.div>
        </div>

        {/* Central Editorial Layout (No Portrait, Pure Architectural Composition) */}
        <div className="hero-editorial-centerpiece">
          {/* Monumental Editorial Headline */}
          <div className="hero-title-architecture">
            {/* Primary Name Display */}
            <div className="hero-name-block">
              <motion.h1
                className="hero-name-primary"
                initial={{ opacity: 0, y: 55 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 55 }}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="name-line">MANTHAN</span>
                <span className="name-line name-line-second">
                  KUMAR<span className="hero-name-period text-accent">.</span>
                </span>
              </motion.h1>
            </div>

            {/* Split Architectural Sub-Header: Role Left + Discipline Statement Right */}
            <div className="hero-role-split">
              <motion.div
                className="role-block"
                initial={{ opacity: 0, y: 40 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="role-title">
                  <span>Software</span>
                  <br />
                  <span className="role-accent">Developer</span>
                </h2>
              </motion.div>

              <motion.div
                className="focus-statement-block"
                initial={{ opacity: 0, y: 40 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="focus-label font-mono">TECHNICAL DIRECTION</span>
                <p className="focus-headline">
                  Building with Code <span className="focus-accent">·</span> Cloud <span className="focus-accent">·</span> AI
                </p>
                <p className="focus-statement-p">
                  Computer Science &amp; Engineering student focused on software development, cloud infrastructure, and emerging artificial intelligence solutions.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Technical Editorial Index Panels (Software, Cloud, AI) */}
          <motion.div
            className="hero-discipline-strip"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, y: 25 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="discipline-item">
              <span className="disc-marker" aria-hidden="true" />
              <div className="disc-info">
                <span className="disc-title font-mono">SOFTWARE</span>
                <span className="disc-desc">Web Systems &amp; Distributed Architectures</span>
              </div>
            </div>

            <div className="discipline-divider" />

            <div className="discipline-item">
              <span className="disc-marker" aria-hidden="true" />
              <div className="disc-info">
                <span className="disc-title font-mono">CLOUD</span>
                <span className="disc-desc">Enterprise Infrastructure &amp; Virtualization</span>
              </div>
            </div>

            <div className="discipline-divider" />

            <div className="discipline-item">
              <span className="disc-marker" aria-hidden="true" />
              <div className="disc-info">
                <span className="disc-title font-mono">AI</span>
                <span className="disc-desc">Machine Learning &amp; Intelligent Solutions</span>
              </div>
            </div>
          </motion.div>

          {/* Direct Simple Calls to Action */}
          <motion.div
            className="hero-actions-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => scrollTo("work")}
              className="hero-cta-btn primary"
            >
              <span>EXPLORE SELECTED WORK</span>
              <span className="cta-arrow">→</span>
            </button>

            <a
              href={personalInfo.contacts.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-btn secondary"
            >
              <span>VIEW RESUME</span>
              <ArrowUpRight size={15} />
            </a>

            <div className="hero-location-annotation font-mono">
              <span className="loc-dot" />
              <span>{personalInfo.location.toUpperCase()}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Editorial Transition Rail */}
        <motion.div
          className="hero-bottom-rail font-mono"
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.75, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="bottom-scroll-trigger"
          >
            <span>SCROLL TO EXPLORE ABOUT &amp; FOUNDATION</span>
            <ArrowDownRight size={14} />
          </button>
          <div className="rail-accent-line" />
        </motion.div>
      </motion.div>
    </section>
  );
}
