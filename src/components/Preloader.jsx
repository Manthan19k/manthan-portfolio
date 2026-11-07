import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "./BrandMark";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isActive, setIsActive] = useState(() => {
    try {
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return false;
      }
      return true;
    } catch {
      return true;
    }
  });

  const completedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setShowContent(false);
    setIsExiting(true);
    setTimeout(() => {
      setIsActive(false);
      onComplete?.();
    }, 750);
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) {
      onComplete?.();
      return;
    }

    // Lock body scroll while loader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Escape key listener to skip intro
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Hard fallback timeout: loader NEVER gets stuck beyond 2.8s
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, 2800);

    // Track application readiness (DOM complete, fonts ready)
    let isAppReady = typeof document !== "undefined" && document.readyState === "complete";
    const onWindowLoad = () => {
      isAppReady = true;
    };
    if (typeof window !== "undefined" && !isAppReady) {
      window.addEventListener("load", onWindowLoad, { once: true });
    }
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        isAppReady = true;
      }).catch(() => {});
    }

    // Smooth progress counter (pacing 1250ms when ready, 1800ms while loading)
    const startTime = performance.now();
    const nominalDuration = 1250;

    let frameId;
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const targetDuration = isAppReady ? nominalDuration : 1800;
      const rawProgress = Math.min(100, (elapsed / targetDuration) * 100);
      const easedProgress = Math.floor(rawProgress);

      setProgress(easedProgress);

      if (rawProgress < 100) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        // Brief pause at 100% to let viewer register completion before curtain reveal
        setTimeout(() => {
          handleFinish();
        }, 120);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("load", onWindowLoad);
      document.body.style.overflow = originalOverflow;
    };
  }, [isActive, handleFinish, onComplete]);

  if (!isActive) {
    return null;
  }

  // Easing curve: cubic-bezier(0.22, 1, 0.36, 1)
  const easeEditorial = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence>
      {!completedRef.current && (
        <motion.div
          className={`cinematic-preloader ${isExiting ? "exiting" : ""}`}
          role="status"
          aria-live="polite"
          aria-label="Loading Manthan Kumar Engineering Portfolio"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.75, ease: easeEditorial },
          }}
        >
          {/* Subtle Technical Architectural Grid & Diagonal Guide Background */}
          <div className="preloader-grid-bg" aria-hidden="true" />
          <div className="preloader-diagonal-guide" aria-hidden="true" />

          {/* Top Metadata Rail */}
          <header className="preloader-top-rail font-mono">
            <div className="preloader-meta-left">
              <span className="preloader-status-dot" />
              <span className="preloader-meta-item">MANTHAN KUMAR</span>
              <span className="preloader-meta-sep">/</span>
              <span className="preloader-meta-item text-muted">ONLINE</span>
            </div>

            <span className="preloader-meta-center text-muted">ENGINEERING PORTFOLIO</span>

            <div className="preloader-meta-right">
              <button
                type="button"
                onClick={handleFinish}
                className="preloader-skip-btn font-mono"
                aria-label="Skip loading animation"
              >
                <span>[ ESC // SKIP ]</span>
              </button>
            </div>
          </header>

          {/* ========================================================
              CORE COMPOSITION: SPLIT EDITORIAL LAYOUT
              Left: Custom Layered Geometric M Monogram
              Divider: Hairline Vertical Rule
              Right: BUILD / DEPLOY / SCALE Stack
             ======================================================== */}
          {showContent && (
            <motion.div
              className="preloader-core-composition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3, ease: easeEditorial } }}
            >
              <div className="preloader-split-grid">
                {/* LEFT / CENTER: Custom Layered Geometric M Monogram */}
                <div className="monogram-stage-wrapper">
                  <BrandMark
                    animated
                    size={240}
                    showGuides={true}
                    showCrosshairs={true}
                    className="geometric-layered-m"
                  />
                </div>

                {/* THIN VERTICAL DIVIDER */}
                <motion.div
                  className="preloader-vertical-divider"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 0.25, ease: easeEditorial }}
                  style={{ transformOrigin: "top" }}
                  aria-hidden="true"
                />

                {/* RIGHT: BUILD / DEPLOY / SCALE Stack */}
                <div className="preloader-text-stack-column">
                  <div className="words-stack-container">
                    <div className="word-mask">
                      <motion.div
                        className="stack-word word-primary"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.7, delay: 0.25, ease: easeEditorial }}
                      >
                        BUILD
                      </motion.div>
                    </div>

                    <div className="word-mask">
                      <motion.div
                        className="stack-word word-primary"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.7, delay: 0.35, ease: easeEditorial }}
                      >
                        DEPLOY
                      </motion.div>
                    </div>

                    <div className="word-mask">
                      <motion.div
                        className="stack-word word-accent"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.7, delay: 0.45, ease: easeEditorial }}
                      >
                        SCALE
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    className="portfolio-descriptor font-mono"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: easeEditorial }}
                  >
                    A SOFTWARE DEVELOPER&apos;S PORTFOLIO
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================
              BOTTOM RAIL: HORIZONTAL PROGRESS INDICATOR
             ======================================================== */}
          <footer className="preloader-bottom-rail font-mono">
            <div className="preloader-progress-info">
              <span className="progress-caption">A SOFTWARE DEVELOPER&apos;S PORTFOLIO</span>
              <span className="progress-value">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            {/* Hairline Progress Bar with Burnt-Orange Fill */}
            <div className="preloader-progress-track">
              <div
                className="preloader-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
