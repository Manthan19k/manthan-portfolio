import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, MapPin, Mail, Layers } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { personalInfo, focusAreas, technicalSkills } from "../data/portfolioData";
import "./About.css";

export default function About() {
  return (
    <section className="section-editorial about-phase" id="about">
      <div className="container">
        {/* Editorial Section Header */}
        <SectionHeader
          category="FOUNDATION"
          title="Engineering software systems,"
          subtitle="infrastructure &amp; machine intelligence."
          description="A technical perspective grounded in computer science fundamentals, enterprise virtualization exposure, and applied system engineering."
          meta={`${personalInfo.education.degreeFull.toUpperCase()}`}
        />

        {/* Part 1: Asymmetric Editorial Identity Grid */}
        <div className="about-editorial-grid">
          {/* LEFT: Grand Editorial Statement & Academic Baseline */}
          <div className="about-col-statement">
            <motion.div
              className="statement-quote-wrap"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="statement-editorial-lead">
                I build software, explore cloud infrastructure, and turn technical ideas into resilient systems.
              </h3>

              <div className="statement-paragraphs">
                {personalInfo.bio.map((paragraph, index) => (
                  <p key={index} className="statement-p">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Academic Foundation Spec Card (Clean Editorial Style) */}
            <motion.div
              className="academic-editorial-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="academic-card-top font-mono">
                <span className="card-kicker">ACADEMIC FOUNDATION</span>
                <span className="card-year">{personalInfo.year}</span>
              </div>

              <div className="academic-card-body">
                <div className="academic-title-row">
                  <GraduationCap size={20} className="academic-icon text-accent" />
                  <h4>{personalInfo.education.degreeFull}</h4>
                </div>
                <p className="academic-institution">{personalInfo.education.institution}</p>

                <div className="academic-metadata-strip font-mono">
                  <div className="acad-meta-item">
                    <MapPin size={12} className="meta-icon text-accent" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <span className="acad-meta-sep">/</span>
                  <div className="acad-meta-item">
                    <Mail size={12} className="meta-icon text-muted" />
                    <span>{personalInfo.education.academicEmail}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Focus Pillars & Editorial Statistics */}
          <div className="about-col-focus">
            {/* 3 Core Technical Focus Pillars */}
            <div className="focus-editorial-block">
              <div className="focus-block-header font-mono">
                <span>CORE ENGINEERING FOCUS</span>
              </div>

              <div className="focus-pillars-stack">
                {focusAreas.map((pillar, idx) => (
                  <motion.article
                    key={pillar.number}
                    className="editorial-pillar-row"
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="pillar-index-col font-mono">
                      <span className="pillar-num">{pillar.number}</span>
                    </div>

                    <div className="pillar-text-col">
                      <h4 className="pillar-heading">{pillar.title}</h4>
                      <p className="pillar-detail">{pillar.description}</p>
                    </div>

                    <div className="pillar-arrow-col">
                      <ArrowUpRight size={16} />
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Editorial Metric Strips (No SaaS Dashboards, Pure Editorial Rules) */}
            <motion.div
              className="editorial-metrics-panel"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="metrics-panel-header font-mono">
                <span>RECORDED QUANTITATIVE SUMMARY</span>
              </div>

              <div className="metrics-linear-grid">
                {personalInfo.stats.map((item) => (
                  <div key={item.label} className="metric-linear-cell">
                    <span className="metric-num font-mono">{item.value}</span>
                    <span className="metric-title font-mono">{item.label}</span>
                    <span className="metric-annotation text-muted">{item.note}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Part 2: Technical Capability Matrix (Integrated Editorial Layout) */}
        <div className="capability-matrix-section">
          <div className="capability-header-bar font-mono">
            <div className="cap-label-group">
              <span className="cap-title">TECHNICAL CAPABILITY MATRIX</span>
            </div>
            <span className="cap-subtitle text-muted">VERIFIED TOOLKIT ACCROSS REPOSITORIES &amp; TRAINING</span>
          </div>

          <div className="capability-editorial-grid">
            {technicalSkills.map((domain, index) => (
              <motion.article
                key={domain.number}
                className="capability-domain-unit"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="domain-unit-top">
                  <span className="domain-unit-num">{domain.number}</span>
                  <span className="domain-unit-category">{domain.category}</span>
                </div>

                <p className="domain-unit-desc">{domain.description}</p>

                <div className="domain-skills-manifest">
                  {domain.skills.map((skill) => (
                    <span key={skill} className="manifest-item font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="capability-matrix-footer font-mono">
            <span className="footer-label">
              <Layers size={13} className="text-accent inline-icon" /> SYSTEM MATRIX ACTIVE
            </span>
            <span className="footer-rule" />
            <span className="footer-status text-muted">CONTINUOUS EXPANSION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
