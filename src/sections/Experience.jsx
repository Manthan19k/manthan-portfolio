import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Server, Terminal, FileCheck } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { experienceData } from "../data/portfolioData";
import "./Experience.css";

export default function Experience() {
  const scrollToModule = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="section-editorial experience-phase" id="experience">
      <div className="container">
        {/* Editorial Section Header */}
        <SectionHeader
          category="EXPERIENCE"
          title="Infrastructure &amp;"
          subtitle="Applied Intelligence."
          description="Professional case studies of enterprise IT operations, server virtualization clusters, and agentic AI sustainability initiatives across industrial and national programs."
          meta="02 COMPLETED INTERNSHIPS"
        />

        {/* Dynamic Storytelling Case Files: Consuming experienceData[] */}
        <div className="experience-case-files">
          {experienceData.map((exp) => (
            <div key={exp.id} className="case-file-layout">
              {/* LEFT SIDE: Anchored Editorial Identity & Story Module Index */}
              <motion.aside
                className="case-identity-rail"
                aria-label={`Experience Dossier for ${exp.company}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="identity-rail-dossier">
                  {/* File Metadata Header */}
                  <div className="rail-top-header font-mono">
                    <span className="file-code">INDUSTRIAL DOSSIER · {exp.year}</span>
                    <span className="file-status">{exp.status.toUpperCase()}</span>
                  </div>

                  {/* Company & Unit Identity */}
                  <div className="rail-company-block">
                    {exp.logo ? (
                      <div className="company-logo-frame">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} - Aditya Birla Group`}
                          className="company-logo-img"
                        />
                      </div>
                    ) : (
                      <div className="company-logo-frame monogram-frame font-mono">
                        <span className="monogram-tag text-accent">1M1B // AICTE</span>
                        <span className="monogram-sub text-muted">IBM SKILLSBUILD</span>
                      </div>
                    )}

                    <h3 className="company-title">{exp.company}</h3>
                    <p className="company-division">{exp.group}</p>
                    <p className="company-dept font-mono">{exp.department}</p>
                  </div>

                  {/* Role & Duration Tag */}
                  <div className="rail-role-tag">
                    <span className="role-name">{exp.role}</span>
                    <span className="role-dur font-mono">{exp.duration}</span>
                  </div>

                  {/* Completion Certificate CTA Button */}
                  {exp.certificatePdf && (
                    <div className="rail-cert-action">
                      <a
                        href={encodeURI(exp.certificatePdf)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exp-cert-btn font-mono"
                        aria-label={`View completion certificate for ${exp.company} (opens PDF in new tab)`}
                      >
                        <FileCheck size={14} className="text-accent" />
                        <span>VIEW COMPLETION CERTIFICATE</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  )}

                  {/* Section-Specific Story Progress Indicator */}
                  <div className="section-story-progress font-mono">
                    <span className="progress-caption">SYSTEM MODULE NAVIGATION:</span>
                    <div className="progress-rail-items">
                      {exp.learnings.map((module, idx) => {
                        const targetId = `exp-module-${exp.id}-${idx}`;
                        return (
                          <button
                            key={module.number}
                            type="button"
                            onClick={() => scrollToModule(targetId)}
                            className="progress-rail-item"
                            aria-label={`Jump to module ${module.number}: ${module.title}`}
                          >
                            <span className="item-num">{module.number}</span>
                            <span className="item-bar" />
                            <span className="item-name">{module.shortTitle || module.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status Verification */}
                  <div className="rail-verification font-mono">
                    <CheckCircle2 size={13} className="text-accent" />
                    <span>VERIFIED COMPLETION RECORD</span>
                  </div>
                </div>
              </motion.aside>

              {/* RIGHT SIDE: Dynamic Case Content & Open Story Modules */}
              <div className="case-content-stream">
                {/* Story Overview & Environment Analysis */}
                <motion.div
                  className="case-executive-summary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="summary-badge font-mono">
                    <Server size={13} className="text-accent" />
                    <span>{exp.kicker}</span>
                  </div>

                  <h3 className="summary-headline">{exp.headline}</h3>

                  <div className="summary-narrative">
                    {exp.narrative.map((p, idx) => (
                      <p key={idx} className="summary-p">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* System Context Specification Table */}
                  {exp.caseStory && (
                    <div className="case-specs-table font-mono">
                      <div className="case-spec-row">
                        <span className="spec-key">LOCATION</span>
                        <span className="spec-val">{exp.caseStory.location}</span>
                      </div>
                      <div className="case-spec-row">
                        <span className="spec-key">TOPOLOGY / STACK</span>
                        <span className="spec-val">{exp.caseStory.environment}</span>
                      </div>
                      <div className="case-spec-row">
                        <span className="spec-key">KEY DOMAINS</span>
                        <span className="spec-val">{exp.caseStory.observedSystems}</span>
                      </div>
                      <div className="case-spec-row">
                        <span className="spec-key">CORE IMPACT</span>
                        <span className="spec-val text-accent">{exp.caseStory.appliedProject}</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* 4 Open Sequential Story Modules: de-boxified editorial format */}
                <div className="story-sequential-modules">
                  {exp.learnings.map((learning, idx) => (
                    <motion.article
                      key={learning.number}
                      id={`exp-module-${exp.id}-${idx}`}
                      className="story-module-anchor module-editorial-row"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                    >
                      <div className="module-row-index font-mono">
                        <span className="module-big-num">{learning.number}</span>
                        <span className="module-step-label">OBSERVED SYSTEM</span>
                      </div>

                      <div className="module-row-content">
                        <div className="module-row-heading-wrap">
                          <h4 className="module-title-main">{learning.title}</h4>
                          <ArrowUpRight size={16} className="module-arrow" />
                        </div>
                        <p className="module-core-desc">{learning.description}</p>
                        <p className="module-practical-detail font-mono">{learning.detail}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* System Exposure Tags Manifest */}
                <motion.div
                  className="case-exposure-panel"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="exposure-title-bar font-mono">
                    <Terminal size={13} className="text-accent" />
                    <span>SYSTEM EXPOSURE MANIFEST</span>
                  </div>

                  <div className="exposure-tags-flow">
                    {exp.exposureAreas.map((tech) => (
                      <span key={tech} className="exposure-tag-unit font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Direct Connection to the Project Artifact or Certificate Action */}
                <motion.div
                  className="derived-project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="derived-top font-mono">
                    <span className="derived-label">VERIFIED INDUSTRIAL ARTIFACT</span>
                    <span className="derived-status text-accent">DOCUMENTED CREDENTIAL</span>
                  </div>

                  <div className="derived-body">
                    <h4 className="derived-project-title">
                      {exp.id === "grasim-industries"
                        ? "Cloud Infrastructure Monitoring Dashboard"
                        : "AI for Sustainability & Agentic AI Framework"}
                    </h4>
                    <p>
                      {exp.id === "grasim-industries"
                        ? "Derived directly from physical server monitoring, VMware hypervisors, and operational telemetry observed during vocational industrial training at Grasim Industries Limited."
                        : "Developed through the AI for Sustainability Virtual Internship supported by AICTE and IBM SkillsBuild, integrating Agentic AI and RAG architectures for societal and environmental problem-solving."}
                    </p>
                    <div className="derived-action-group font-mono">
                      {exp.certificatePdf && (
                        <a
                          href={encodeURI(exp.certificatePdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="derived-cert-link"
                          aria-label={`Open ${exp.company} completion certificate PDF`}
                        >
                          <FileCheck size={14} className="text-accent" />
                          <span>READ COMPLETION CERTIFICATE (PDF)</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
