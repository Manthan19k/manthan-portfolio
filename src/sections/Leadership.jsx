import { motion } from "framer-motion";
import { Building, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { leadershipData } from "../data/portfolioData";
import "./Leadership.css";

export default function Leadership() {
  return (
    <section className="section-editorial leadership-phase" id="community">
      <div className="container">
        {/* Editorial Section Header */}
        <SectionHeader
          category="COMMUNITY &amp; LEADERSHIP"
          title="Fostering Technical Communities &amp;"
          subtitle="Engineering Stewardship."
          description="Elected student governance, peer developer mentoring, and nationwide technological outreach connecting aspiring student engineers with practical computer science."
          meta="02 COMMUNITY OFFICES"
        />

        {/* Editorial Big Pull Statement */}
        <div className="leadership-pull-statement">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="pull-statement-headline">
              Building technical communities
              <br />
              <span className="text-accent">alongside building software.</span>
            </h3>
          </motion.div>
        </div>

        {/* Data-Driven Leadership Roles: Mapped dynamically */}
        <div className="leadership-roles-stream">
          {leadershipData.map((leader, index) => {
            const isFirst = index === 0;

            return (
              <motion.article
                key={leader.id}
                className="leadership-editorial-entry"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Activating Vertical Brand Accent Marker */}
                <motion.div
                  className="leadership-entry-marker"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "top" }}
                  aria-hidden="true"
                />

                <div className="entry-top-rail font-mono">
                  <div className="entry-meta-left">
                    <span className="entry-type-tag">{leader.type}</span>
                    <span className="entry-sep">·</span>
                    <span className="entry-tenure text-muted">{leader.tenure}</span>
                  </div>
                  <div className="entry-meta-right font-mono">
                    <span className="status-ping-dot" />
                    <span className="entry-status text-accent">{leader.status}</span>
                  </div>
                </div>

                <div className="entry-main-spread">
                  <div className="entry-role-column">
                    <div className="entry-super-kicker font-mono">
                      {isFirst ? (
                        <Building size={13} className="text-accent inline-icon" />
                      ) : (
                        <Globe size={13} className="text-accent inline-icon" />
                      )}
                      <span>{leader.kicker}</span>
                    </div>

                    <h4 className="entry-role-title">{leader.role}</h4>

                    <div className="entry-org-block">
                      <span className="entry-org-name">{leader.organization}</span>
                      {leader.institution && leader.institution !== leader.organization && (
                        <span className="entry-institution font-mono text-muted">
                          {leader.institution}
                        </span>
                      )}
                    </div>

                    <div className="entry-supporting-line">
                      <p className="statement-highlight">
                        &ldquo;{leader.supportingMessage || leader.statement}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="entry-narrative-column">
                    <div className="entry-narrative-paragraphs">
                      {leader.narrative.map((p, pIdx) => (
                        <p key={pIdx} className="entry-narrative-p">
                          {p}
                        </p>
                      ))}
                    </div>

                    {leader.focusAreas && leader.focusAreas.length > 0 && (
                      <div className="entry-focus-list">
                        <div className="focus-list-header font-mono">
                          <span>CORE FOCUS STREAMS:</span>
                        </div>
                        <div className="focus-chips-grid">
                          {leader.focusAreas.map((fa) => (
                            <div key={fa.number} className="focus-stream-unit font-mono">
                              <div className="stream-header">
                                <span className="stream-num text-accent">{fa.number}</span>
                                <strong className="stream-name">{fa.title}</strong>
                              </div>
                              <p className="stream-desc">{fa.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Subtle Editorial Bridge to Beyond Software */}
        <div className="leadership-bridge-strip font-mono">
          <div className="bridge-tag">
            <Sparkles size={13} className="text-accent inline-icon" />
            <span>CONTINUOUS EXPLORATION</span>
          </div>
          <a href="#beyond" className="bridge-link">
            <span>CONTINUE TO CREDENTIALS &amp; CERTIFICATIONS</span>
            <ArrowUpRight size={14} className="bridge-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
