import { motion } from "framer-motion";
import { Sparkles, Activity } from "lucide-react";
import { patentsData } from "../data/portfolioData";
import "./PatentsArchive.css";

const easeEditorial = [0.22, 1, 0.36, 1];

export default function PatentsArchive() {
  return (
    <section className="patents-archive-section" id="patents" aria-label="Patents and Innovations Archive">
      {/* Archive Masthead */}
      <div className="patents-masthead">
        <div className="beyond-subhead-rail">
          <div className="subhead-tag font-mono">
            <span className="label-editorial">PATENTS &amp; INNOVATIONS</span>
            <span className="text-muted">INTELLECTUAL PROPERTY &amp; APPLIED RESEARCH</span>
          </div>
          <span className="subhead-count font-mono">
            03 PUBLISHED INDIAN PATENT APPLICATIONS
          </span>
        </div>

        <div className="patents-masthead-copy">
          <h3 className="patents-archive-heading">Patents &amp; Innovations</h3>
          <p className="patents-archive-lead">
            Engineering ideas focused on intelligent infrastructure, secure mobility and sustainable transportation.
          </p>
        </div>
      </div>

      {/* Editorial Vertical Timeline & Dossiers */}
      <div className="patents-timeline-stream">
        {patentsData.map((patent, idx) => {
          const isFeaturedModel = Boolean(patent.technicalModel);

          return (
            <motion.article
              key={patent.applicationNumber}
              className={`patent-dossier-entry ${isFeaturedModel ? "patent-dossier-featured" : ""}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: easeEditorial }}
            >
              {/* Left Architectural Marker Rail (Desktop) */}
              <div className="patent-timeline-marker-rail" aria-hidden="true">
                <div className="marker-pip" />
                <div className="marker-line" />
              </div>

              {/* Main Patent Content Dossier */}
              <div className="patent-dossier-body">
                {/* Top Metadata Header Bar */}
                <div className="patent-meta-top font-mono">
                  <div className="meta-left-tags">
                    <span className="patent-ref-tag">PATENT RECORD</span>
                    <span className="patent-jurisdiction-tag">{patent.jurisdiction.toUpperCase()}</span>
                  </div>

                  <div className="patent-status-badge">
                    <span className="status-live-dot" />
                    <span>{patent.status.toUpperCase()}</span>
                  </div>
                </div>

                {/* Patent Title */}
                <h4 className="patent-entry-title">{patent.title}</h4>

                {/* Tagline / Subtitle */}
                {patent.tagline && (
                  <p className="patent-tagline font-mono text-accent">
                    // {patent.tagline}
                  </p>
                )}

                {/* Technical Specifications Matrix */}
                <div className="patent-specs-matrix font-mono">
                  <div className="spec-cell">
                    <span className="spec-label">APPLICATION NO.</span>
                    <strong className="spec-value">{patent.applicationNumber}</strong>
                  </div>

                  <div className="spec-cell">
                    <span className="spec-label">PUBLICATION NO.</span>
                    <strong className="spec-value text-accent">{patent.publicationNumber}</strong>
                  </div>

                  <div className="spec-cell">
                    <span className="spec-label">FILING DATE</span>
                    <strong className="spec-value">{patent.filingDate}</strong>
                  </div>

                  <div className="spec-cell">
                    <span className="spec-label">PUBLICATION DATE</span>
                    <strong className="spec-value">{patent.publicationDate}</strong>
                  </div>
                </div>

                {/* Technical Narrative Description */}
                <div className="patent-narrative-block">
                  <p className="patent-description-text">{patent.description}</p>
                </div>

                {/* Core Objective Callout */}
                <div className="patent-objective-callout">
                  <div className="objective-label font-mono">
                    <Sparkles size={13} className="text-accent" />
                    <span>CORE OBJECTIVE</span>
                  </div>
                  <p className="objective-text">{patent.objective}</p>
                </div>

                {/* Stability Risk Index Technical Model (Patent 03 Feature) */}
                {patent.technicalModel && (
                  <div className="patent-technical-model-panel">
                    <div className="model-panel-header font-mono">
                      <div className="model-header-left">
                        <Activity size={14} className="text-accent" />
                        <span>TECHNICAL MODEL // {patent.technicalModel.name.toUpperCase()}</span>
                      </div>
                      <span className="model-tag-concept">PROPOSED FORMULATION</span>
                    </div>

                    <p className="model-summary-desc">{patent.technicalModel.description}</p>

                    {/* Formula Display Box */}
                    <div className="model-formula-display font-mono">
                      <span className="formula-prefix">MATHEMATICAL MODEL:</span>
                      <code className="formula-expression">{patent.technicalModel.formula}</code>
                    </div>

                    {/* Variables Matrix */}
                    <div className="model-variables-grid font-mono">
                      {patent.technicalModel.variables.map((variable) => (
                        <div key={variable.symbol} className="variable-item">
                          <span className="var-symbol text-accent">{variable.symbol}</span>
                          <span className="var-sep">=</span>
                          <div className="var-meta">
                            <strong className="var-name">{variable.name}:</strong>
                            <span className="var-desc text-muted">{variable.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="model-technical-note font-mono text-muted text-micro">
                      * {patent.technicalModel.note}
                    </p>
                  </div>
                )}

                {/* Key Technical Areas */}
                <div className="patent-technical-areas">
                  <span className="areas-label font-mono">KEY TECHNICAL AREAS:</span>
                  <div className="areas-pills-wrap">
                    {patent.technicalAreas.map((area) => (
                      <span key={area} className="tech-area-pill font-mono">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
