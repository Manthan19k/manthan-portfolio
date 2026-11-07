import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles, Terminal, Activity, ArrowRight } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { GithubIcon } from "../components/Icons";
import { projectsData } from "../data/portfolioData";
import "./SelectedWork.css";

export default function SelectedWork() {
  const featuredProjects = projectsData;

  return (
    <section className="section-editorial work-phase" id="work">
      <div className="container">
        {/* Editorial Section Header */}
        <SectionHeader
          category="SELECTED WORK &amp; SYSTEMS"
          title="Engineered Systems &amp;"
          subtitle="Applied Software."
          description="Case studies of operational cloud telemetry, intercity transit coordination, and modern web application architectures."
          meta="02 FEATURED SYSTEMS"
        />

        {/* ========================================================
            FEATURED ENGINEERING CASE STUDIES
           ======================================================== */}
        <div className="case-studies-stack">
          {featuredProjects.map((project, index) => {
            const isFirst = index === 0;

            return (
              <div key={project.id} className="case-study-outer-wrapper">
                {/* Intentional Editorial Inter-Project Transition */}
                {!isFirst && (
                  <div className="inter-project-transition-strip font-mono">
                    <motion.span
                      className="transition-rule"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left" }}
                    />
                    <span className="transition-tag">CASE STUDY · {project.title.toUpperCase()}</span>
                    <motion.span
                      className="transition-rule"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                )}

                <motion.article
                  className={`engineering-case-study ${isFirst ? "case-layout-primary" : "case-layout-secondary"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.08 }}
                  transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Case Study Header Rail */}
                  <div className="case-study-rail">
                    <div className="case-index-meta font-mono">
                      <span className="case-num">{project.number}</span>
                      <span className="case-sep">/</span>
                      <span className="case-category">{project.category}</span>
                      <span className="case-sep">·</span>
                      <span className="case-status text-muted">{project.status}</span>
                    </div>

                    <div className="case-badge-pill font-mono">
                      <Sparkles size={12} className="badge-sparkle text-accent" />
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  {/* Main Case Title & Tagline with Reveal */}
                  <div className="case-title-block">
                    <motion.h3
                      className="case-editorial-title"
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="case-tagline font-mono">{project.tagline}</p>
                    <p className="case-main-description">{project.description}</p>
                  </div>

                  {/* CASE STUDY SECTION BREAKDOWN: 01 Context, 02 Architecture, 03 Interface */}
                  {project.caseSections && (
                    <div className="case-editorial-columns">
                      <motion.div
                        className="case-col-module"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="module-col-header font-mono">
                          <span className="module-col-num">01</span>
                          <span className="module-col-name">CONTEXT &amp; PURPOSE</span>
                        </div>
                        <p className="module-col-body">{project.caseSections.context}</p>
                      </motion.div>

                      <motion.div
                        className="case-col-module"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="module-col-header font-mono">
                          <span className="module-col-num">02</span>
                          <span className="module-col-name">SYSTEM LOGIC</span>
                        </div>
                        <p className="module-col-body">{project.caseSections.system}</p>
                      </motion.div>

                      <motion.div
                        className="case-col-module"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="module-col-header font-mono">
                          <span className="module-col-num">03</span>
                          <span className="module-col-name">INTERFACE CAPABILITY</span>
                        </div>
                        <p className="module-col-body">{project.caseSections.interface}</p>
                      </motion.div>
                    </div>
                  )}

                  {/* Visual Architecture Representation / System Diagram with Sequential Node Highlighting */}
                  {project.architectureFlow && (
                    <div className="system-diagram-container">
                      <div className="diagram-header font-mono">
                        <span className="diagram-title">
                          <Activity size={13} className="text-accent inline-icon" />
                          SYSTEM ARCHITECTURE WORKFLOW
                        </span>
                        <span className="diagram-spec text-muted">[ACTIVE LOGICAL PIPELINE]</span>
                      </div>

                      <div className="diagram-flow-track font-mono">
                        {project.architectureFlow.map((step, idx) => (
                          <motion.div
                            key={step.step}
                            className="diagram-flow-node"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="node-box">
                              <span className="node-step text-accent">{step.step}</span>
                              <strong className="node-label">{step.label}</strong>
                              <span className="node-desc">{step.desc}</span>
                            </div>
                            {idx < project.architectureFlow.length - 1 && (
                              <div className="node-connector" aria-hidden="true">
                                <ArrowRight size={14} className="connector-arrow text-muted" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Blueprint Visualizer (Varying Composition Between Project 01 & 02) */}
                  <div className={`case-blueprint-visualizer ${isFirst ? "blueprint-style-cloud" : "blueprint-style-transit"}`}>
                    <div className="blueprint-top-bar font-mono">
                      <div className="blueprint-dots">
                        <span className="b-dot red" />
                        <span className="b-dot yellow" />
                        <span className="b-dot green" />
                        <span className="b-filename">{project.id}.manifest</span>
                      </div>
                      <span className="blueprint-status-tag">{project.status} // ILLUSTRATIVE STATE</span>
                    </div>

                    <div className="blueprint-stage">
                      <div className="blueprint-grid-overlay" aria-hidden="true" />
                      
                      {isFirst ? (
                        /* Project 01: Cloud Infrastructure Telemetry Visualizer (Illustrative Prototype) */
                        <div className="cloud-telemetry-mockup font-mono">
                          <div className="telemetry-terminal-pane">
                            <span className="prompt-sym text-accent">&gt;</span> [ILLUSTRATIVE TELEMETRY // ARCHITECTURAL PROTOTYPE]
                            <br />
                            <span className="prompt-sym text-accent">&gt;</span> sys_init --target="enterprise-cluster" --mode="observability"
                            <br />
                            <span className="prompt-sym text-accent">&gt;</span> nodes_detected: 8 physical, 24 virtualized instances
                            <br />
                            <span className="prompt-sym text-accent">&gt;</span> telemetry_status: healthy · latency &lt; 14ms
                          </div>

                          <div className="telemetry-meters-grid">
                            <div className="meter-card">
                              <span className="meter-label">CPU ALLOCATION [SAMPLE]</span>
                              <div className="meter-progress-track">
                                <div className="meter-fill" style={{ width: "62%" }} />
                              </div>
                              <span className="meter-val text-accent">62% NOMINAL</span>
                            </div>

                            <div className="meter-card">
                              <span className="meter-label">MEMORY UTILIZATION [SAMPLE]</span>
                              <div className="meter-progress-track">
                                <div className="meter-fill" style={{ width: "54%" }} />
                              </div>
                              <span className="meter-val text-accent">54% NOMINAL</span>
                            </div>

                            <div className="meter-card">
                              <span className="meter-label">HYPERVISOR TARGET</span>
                              <div className="meter-progress-track">
                                <div className="meter-fill" style={{ width: "78%" }} />
                              </div>
                              <span className="meter-val text-accent">VMWARE ESXi CLUSTER</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Project 02: Transit Scheduling & Coach Seat Matrix Visualizer */
                        <div className="transit-schedule-mockup font-mono">
                          <div className="coach-layout-pane">
                            <span className="coach-label text-muted">COACH SEAT ALLOCATION ENGINE [2×2 MATRIX // DEMO UI STATE]:</span>
                            <div className="seat-matrix-grid">
                              {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((s, sIdx) => {
                                const isBooked = sIdx % 3 === 0;
                                const isSelected = sIdx === 5;
                                return (
                                  <div
                                    key={s}
                                    className={`seat-unit ${isBooked ? "booked" : isSelected ? "selected" : "available"}`}
                                  >
                                    <span>{s}</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="seat-legend font-mono">
                              <span className="legend-item"><span className="leg-dot available" /> AVAILABLE</span>
                              <span className="legend-item"><span className="leg-dot selected" /> SELECTED</span>
                              <span className="legend-item"><span className="leg-dot booked" /> RESERVED</span>
                            </div>
                          </div>

                          <div className="route-manifest-pane">
                            <div className="manifest-header">INTERCITY TRANSIT DISPATCH</div>
                            <div className="manifest-row"><span>ORIGIN:</span><strong>TERMINAL CENTRAL</strong></div>
                            <div className="manifest-row"><span>DESTINATION:</span><strong>NORTH METRO STATION</strong></div>
                            <div className="manifest-row"><span>STATE ROUTING:</span><span className="text-accent">TanStack Start (Typed)</span></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="blueprint-footer-bar font-mono">
                      <span>PROJECT_REF: {project.id}</span>
                      <span>RUNTIME: VALIDATED &amp; BUILDABLE</span>
                    </div>
                  </div>

                  {/* Editorial Technology Manifest with Progressive Tags */}
                  {project.techManifest && (
                    <div className="case-tech-manifest-section">
                      <div className="manifest-section-title font-mono">
                        <span>EDITORIAL TECHNOLOGY MANIFEST</span>
                        <span className="text-muted">VERIFIED DEPENDENCIES &amp; RUNTIMES</span>
                      </div>

                      <div className="manifest-domains-grid">
                        {project.techManifest.map((dom) => (
                          <div key={dom.domain} className="manifest-domain-col font-mono">
                            <span className="domain-group-title text-accent">{dom.domain}</span>
                            <div className="domain-chips-wrap">
                              {dom.items.map((techItem, techIdx) => (
                                <motion.span
                                  key={techItem}
                                  className="tech-chip font-mono"
                                  initial={{ opacity: 0, y: 8 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: false, amount: 0.2 }}
                                  transition={{ duration: 0.35, delay: Math.min(techIdx * 0.03, 0.2), ease: [0.22, 1, 0.36, 1] }}
                                >
                                  {techItem}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Case Actions Bar */}
                  <div className="case-actions-toolbar">
                    <div className="actions-left">
                      {project.github && project.github !== "#" ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="case-btn primary font-mono"
                          aria-label={`View ${project.title} GitHub repository`}
                        >
                          <GithubIcon size={16} />
                          <span>SOURCE REPOSITORY</span>
                          <ArrowUpRight size={14} className="case-btn-arrow" />
                        </a>
                      ) : (
                        <span className="case-btn disabled font-mono">
                          <GithubIcon size={16} />
                          <span>INTERNAL REPOSITORY</span>
                        </span>
                      )}

                      {project.liveDemo && project.liveDemo !== "#" ? (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="case-btn secondary font-mono"
                          aria-label={`View ${project.title} Live Demo`}
                        >
                          <ExternalLink size={15} />
                          <span>EXPLORE LIVE DEMO</span>
                        </a>
                      ) : (
                        <span className="case-btn disabled font-mono">
                          <Terminal size={14} />
                          <span>LOCAL ENVIRONMENT SPECIFIED</span>
                        </span>
                      )}
                    </div>

                    <div className="actions-specs font-mono text-muted">
                      <span>CASE FILE // VERIFIED ARCHITECTURE</span>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>

        {/* Editorial Handoff to Community & Leadership */}
        <div className="work-handoff-strip font-mono">
          <div className="handoff-line" />
          <a href="#community" className="handoff-link">
            <span className="handoff-target">COMMUNITY &amp; LEADERSHIP</span>
            <ArrowUpRight size={14} className="handoff-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
