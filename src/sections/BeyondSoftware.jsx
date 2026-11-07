import { useState, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Filter,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import PatentsArchive from "../components/PatentsArchive";
import { CredlyIcon } from "../components/Icons";
import { certificationsData } from "../data/portfolioData";
import "./BeyondSoftware.css";

const CATEGORIES = ["ALL", "CLOUD", "AI / ML", "SECURITY", "SYSTEMS"];
const INITIAL_ROW_COUNT = 12;

export default function BeyondSoftware() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProviderFilter, setSelectedProviderFilter] = useState("ALL");
  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);
  const [isMicrosoftOpen, setIsMicrosoftOpen] = useState(false);
  const msRegionId = useId();
  const archiveRegionId = useId();

  // Filter rows based on category and provider
  const filteredRows = useMemo(() => {
    return certificationsData.archiveRows.filter((row) => {
      const matchesCategory =
        selectedCategory === "ALL" || row.category === selectedCategory;

      const rowShort = (row.shortIssuer || row.shortProvider || "").toLowerCase();
      const rowFull = (row.issuer || row.provider || "").toLowerCase();
      const filterTerm = selectedProviderFilter.toLowerCase();

      const matchesProvider =
        selectedProviderFilter === "ALL" ||
        rowShort === filterTerm ||
        rowFull.includes(filterTerm);

      return matchesCategory && matchesProvider;
    });
  }, [selectedCategory, selectedProviderFilter]);

  // Display initial subset when collapsed, or all rows when expanded
  const visibleRows = useMemo(() => {
    return isArchiveExpanded ? filteredRows : filteredRows.slice(0, INITIAL_ROW_COUNT);
  }, [isArchiveExpanded, filteredRows]);

  const handleProviderSelect = (shortName) => {
    setSelectedProviderFilter((prev) => (prev === shortName ? "ALL" : shortName));
    setIsArchiveExpanded(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsArchiveExpanded(false);
  };

  return (
    <section className="section-editorial beyond-phase" id="beyond">
      <div className="container">
        {/* ========================================================
            SECTION HEADER
           ======================================================== */}
        <SectionHeader
          category="PATENTS, RESEARCH &amp; VERIFIED CREDENTIALS"
          title="Innovations, Accreditations &amp;"
          subtitle="Continuous Learning."
          description="Engineering ideas translated into published intellectual property alongside a verifiable ledger of cloud architectures, machine learning engineering, and distributed systems."
          meta={`03 PUBLISHED PATENTS · ${certificationsData.archiveRows.length} VERIFIED CREDENTIALS · 15 ACCREDITED ISSUERS`}
        />

        {/* ========================================================
            PATENTS & INNOVATIONS ARCHIVE (ANCHOR: #patents)
           ======================================================== */}
        <PatentsArchive />

        {/* ========================================================
            FEATURED ACCREDITATIONS (AWS CREDLY VERIFIED)
           ======================================================== */}
        <div className="featured-credentials-section">
          <div className="beyond-subhead-rail">
            <div className="subhead-tag font-mono">
              <span className="label-editorial">FEATURED ACCREDITATIONS</span>
              <span className="text-muted">AMAZON WEB SERVICES · CREDLY VERIFIED</span>
            </div>
            <span className="subhead-count font-mono">03 HIGHLIGHTED BADGES</span>
          </div>

          <div className="featured-credentials-grid">
            {certificationsData.featuredAws.map((badge, idx) => (
              <motion.div
                key={badge.id}
                className="featured-credential-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="feat-card-top font-mono">
                  <span className="feat-num">{badge.number}</span>
                  <span className="feat-category-pill">{badge.category}</span>
                </div>

                <div className="feat-card-provider font-mono">
                  <CredlyIcon size={14} className="credly-badge-icon" />
                  <span>{badge.provider.toUpperCase()}</span>
                </div>

                <h4 className="feat-card-title">{badge.title}</h4>
                <p className="feat-card-desc">{badge.description}</p>

                <div className="feat-card-footer">
                  <a
                    href={badge.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feat-verify-btn font-mono"
                    aria-label={`Verify ${badge.title} on Credly (opens in new tab)`}
                  >
                    <span>VERIFY ON CREDLY</span>
                    <ArrowUpRight size={13} className="feat-arrow" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            MICROSOFT LEARN MODULES (AZURE & ML CURRICULUM)
           ======================================================== */}
        <div className="microsoft-archive-box">
          <button
            type="button"
            className="ms-archive-toggle-bar"
            onClick={() => setIsMicrosoftOpen(!isMicrosoftOpen)}
            aria-expanded={isMicrosoftOpen}
            aria-controls={msRegionId}
          >
            <div className="ms-toggle-left">
              <span className="ms-badge font-mono">MICROSOFT LEARN</span>
              <div>
                <h4 className="ms-toggle-heading">Azure Cloud Infrastructure &amp; Applied Machine Learning</h4>
                <p className="ms-toggle-sub">10 verified technical learning modules with direct Microsoft Learn accreditation verification</p>
              </div>
            </div>

            <div className="ms-toggle-right font-mono">
              <span className="ms-status-text">{isMicrosoftOpen ? "HIDE MODULES" : "EXPLORE CURRICULUM (10)"}</span>
              {isMicrosoftOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          <AnimatePresence>
            {isMicrosoftOpen && (
              <motion.div
                id={msRegionId}
                className="ms-modules-container"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ms-modules-grid">
                  {certificationsData.microsoftCredentials.map((item) => (
                    <div key={item.number} className="ms-module-row">
                      <div className="ms-row-meta font-mono">
                        <span className="ms-row-num">{item.number}</span>
                        <span className="ms-row-cat">{item.categoryLabel}</span>
                      </div>
                      <h5 className="ms-row-title">{item.title}</h5>
                      <p className="ms-row-desc">{item.description}</p>
                      <div className="ms-row-action font-mono">
                        {item.link && item.link !== "#" ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ms-verify-link"
                            aria-label={`Verify ${item.title} on Microsoft Learn (opens in new tab)`}
                          >
                            <span>VERIFY ON LEARN</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="ms-completed-label">CURRICULUM COMPLETED</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================
            COMPREHENSIVE CERTIFICATION ARCHIVE (97 CERTIFICATES)
           ======================================================== */}
        <div className="archive-summary-section">
          <div className="beyond-subhead-rail">
            <div className="subhead-tag font-mono">
              <span className="label-editorial">COMPREHENSIVE CERTIFICATION ARCHIVE</span>
              <span className="text-muted">PRIMARY SOURCE CERTIFICATE DOCUMENTATION</span>
            </div>
            <span className="subhead-count font-mono">
              {certificationsData.archiveRows.length} VERIFIED DOCUMENTS
            </span>
          </div>

          {/* Provider Summary Filter Strip */}
          <div className="provider-summary-container">
            <div className="provider-summary-header font-mono">
              <span className="provider-summary-title">FILTER BY ISSUING BODY</span>
              <span className="text-muted text-small">
                {selectedProviderFilter === "ALL"
                  ? "Showing all 15 institutional issuers"
                  : `Filtered by: ${selectedProviderFilter}`}
              </span>
            </div>

            <div className="provider-badges-strip">
              <button
                type="button"
                className={`provider-chip font-mono ${
                  selectedProviderFilter === "ALL" ? "active" : ""
                }`}
                onClick={() => handleProviderSelect("ALL")}
              >
                <span>ALL ISSUERS</span>
                <span className="chip-count">{certificationsData.archiveRows.length}</span>
              </button>

              {certificationsData.providerSummary.map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  className={`provider-chip font-mono ${
                    selectedProviderFilter === prov.shortName ? "active" : ""
                  }`}
                  onClick={() => handleProviderSelect(prov.shortName)}
                  title={`${prov.name} · ${prov.focus}`}
                >
                  <span className="chip-name">{prov.shortName}</span>
                  <span className="chip-count">{prov.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="archive-filter-bar">
            <div className="filter-label font-mono">
              <Filter size={13} className="filter-icon" />
              <span>DOMAIN FILTER:</span>
            </div>

            <div className="filter-buttons font-mono">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`archive-filter-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="archive-results-count font-mono">
              SHOWING {visibleRows.length} OF {filteredRows.length} CERTIFICATES
            </span>
          </div>

          {/* Compact Editorial Archive Table */}
          <motion.div
            className="archive-table-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="archive-table-header font-mono">
              <span className="col-num">#</span>
              <span className="col-provider">ISSUER</span>
              <span className="col-title">CREDENTIAL TITLE &amp; ISSUING BODY</span>
              <span className="col-category">DOMAIN</span>
              <span className="col-action">VERIFICATION &amp; PDF</span>
            </div>

            <div className="archive-table-body" id={archiveRegionId}>
              {visibleRows.map((row) => (
                <div key={row.id} className="archive-table-row">
                  <span className="col-num font-mono">{row.number}</span>
                  <span className="col-provider font-mono">
                    <span className="provider-pill">{row.shortIssuer || row.issuer}</span>
                  </span>
                  <div className="col-title">
                    <span className="row-credential-title">{row.title}</span>
                    <span className="row-issuer-sub font-mono">
                      <span className="issuer-prefix">ISSUED BY: </span>
                      {row.issuer}
                    </span>
                  </div>
                  <span className="col-category font-mono">
                    <span className="category-tag-mini">{row.category}</span>
                  </span>
                  <div className="col-action font-mono">
                    <div className="action-button-group">
                      {row.docPath && (
                        <a
                          href={encodeURI(row.docPath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-action-btn doc-btn"
                          aria-label={`Read certificate PDF for ${row.title} issued by ${row.issuer} (opens in new tab)`}
                          title="View verified PDF certificate"
                        >
                          <FileText size={12} />
                          <span>READ CERTIFICATE</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                      {row.verifyUrl && (
                        <a
                          href={row.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-action-btn verify-btn"
                          aria-label={`Verify ${row.title} online (opens in new tab)`}
                          title="Verify credential online"
                        >
                          <ExternalLink size={12} />
                          <span>VERIFY ONLINE</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expand / Collapse Action */}
            {filteredRows.length > INITIAL_ROW_COUNT && (
              <div className="archive-expand-footer">
                <button
                  type="button"
                  className="archive-expand-btn font-mono"
                  onClick={() => setIsArchiveExpanded(!isArchiveExpanded)}
                  aria-expanded={isArchiveExpanded}
                  aria-controls={archiveRegionId}
                >
                  <span>
                    {isArchiveExpanded
                      ? "COLLAPSE ARCHIVE"
                      : `EXPLORE FULL ARCHIVE (${filteredRows.length} CERTIFICATES)`}
                  </span>
                  {isArchiveExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ========================================================
            FROM VERIFICATION TO COLLABORATION (CONTACT HANDOFF)
           ======================================================== */}
        <div className="beyond-contact-handoff">
          <div className="handoff-rail font-mono">
            <span className="label-editorial">FROM VERIFICATION TO COLLABORATION</span>
            <span className="handoff-line" />
          </div>

          <div className="handoff-content">
            <div className="handoff-text-block">
              <h3 className="handoff-heading">Have a system worth building?</h3>
              <p className="handoff-sub">
                From scalable cloud architecture and full-stack software development to modern AI workflows,
                let&apos;s discuss how we can engineer robust systems together.
              </p>
              <div className="handoff-meta-pills font-mono">
                <span className="handoff-pill">
                  <CheckCircle2 size={12} className="text-accent" />
                  <span>INDUSTRY INTERNSHIP TESTED</span>
                </span>
                <span className="handoff-pill">
                  <CheckCircle2 size={12} className="text-accent" />
                  <span>90+ VERIFIED CREDENTIALS</span>
                </span>
                <span className="handoff-pill">
                  <CheckCircle2 size={12} className="text-accent" />
                  <span>ACTIVE REPOSITORIES</span>
                </span>
              </div>
            </div>

            <div className="handoff-action">
              <a
                href="https://www.linkedin.com/in/manthankumar-builds"
                target="_blank"
                rel="noopener noreferrer"
                className="handoff-cta-btn font-mono"
                aria-label="Connect with Manthan Kumar on LinkedIn (opens in new tab)"
              >
                <span>LET&apos;S CONNECT</span>
                <ArrowUpRight size={15} className="handoff-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
