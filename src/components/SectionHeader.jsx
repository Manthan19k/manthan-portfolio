import { motion } from "framer-motion";
import "./SectionHeader.css";

export default function SectionHeader({
  category = "CATEGORY",
  title = "Section Title",
  subtitle = null,
  description = null,
  meta = null,
}) {
  return (
    <header className="section-editorial-header">
      <motion.div
        className="section-header-top"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-index-badge">
          <span className="phase-category font-mono">{category}</span>
        </div>

        {meta && (
          <div className="section-header-meta font-mono">
            <span className="status-dot-mini" />
            <span>{meta}</span>
          </div>
        )}
      </motion.div>

      <div className="section-header-main">
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="editorial-heading">
            {title}
            {subtitle && <span className="editorial-subtitle"> {subtitle}</span>}
          </h2>
        </motion.div>

        {description && (
          <motion.p
            className="section-header-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>
        )}
      </div>

      <motion.div
        className="editorial-divider-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      >
        <span className="crosshair-left" />
        <span className="crosshair-right" />
      </motion.div>
    </header>
  );
}
