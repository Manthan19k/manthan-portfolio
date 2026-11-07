import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, CredlyIcon } from "../components/Icons";
import SectionHeader from "../components/SectionHeader";
import BrandMark from "../components/BrandMark";
import { personalInfo } from "../data/portfolioData";
import "./Contact.css";

const socialIconsMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Credly: CredlyIcon,
};

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(personalInfo.contacts.primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section className="section-editorial contact-phase" id="contact">
      <div className="container">
        {/* Editorial Section Header */}
        <SectionHeader
          category="COMMUNICATION &amp; NETWORK"
          title="Direct Gateway &amp;"
          subtitle="Connection Channels."
          description="Whether discussing a software initiative, cloud infrastructure concept, AI system idea, or a professional opportunity — let's connect."
          meta="RESPONSIVE GATEWAY"
        />

        {/* Large Editorial Headline */}
        <div className="contact-editorial-hero">
          <motion.div
            className="contact-lead-wrap"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="contact-display-heading">
              LET&apos;S BUILD
              <br />
              <span className="contact-heading-outline">SOMETHING</span>
              <br />
              <span className="text-accent">MEANINGFUL.</span>
            </h2>
          </motion.div>
        </div>

        {/* Contact Matrix: Primary Email Card + Details & Channels */}
        <div className="contact-matrix-grid">
          {/* Main Primary Email Callout */}
          <motion.div
            className="primary-channel-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="channel-card-top font-mono">
              <span className="channel-label">PRIMARY INBOX</span>
              <button
                type="button"
                onClick={handleCopy}
                className="copy-email-btn"
                aria-label="Copy primary email address"
                title="Copy to clipboard"
              >
                {copiedEmail ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                <span>{copiedEmail ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            <div className="channel-email-wrap">
              <a
                href={`mailto:${personalInfo.contacts.primaryEmail}`}
                className="primary-email-link"
              >
                {personalInfo.contacts.primaryEmail}
              </a>
              <p className="email-helper-text">
                Direct channel for software collaborations, cloud discussions, or prospective roles.
              </p>
            </div>

            <div className="channel-action-row">
              <a
                href={`mailto:${personalInfo.contacts.primaryEmail}`}
                className="compose-btn"
              >
                <Mail size={16} />
                <span>Compose Email</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Secondary Inboxes */}
            <div className="secondary-inboxes font-mono">
              <span className="secondary-inbox-title">SECONDARY CHANNELS:</span>
              <div className="secondary-inbox-list">
                {personalInfo.contacts.secondaryEmails.map((item) => (
                  <a
                    key={item.email}
                    href={`mailto:${item.email}`}
                    className="secondary-email-item"
                  >
                    <span className="sec-email-label text-muted">[{item.label}]</span>
                    <span className="sec-email-addr">{item.email}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Location, Availability & Social Network */}
          <div className="contact-meta-column">
            {/* Location & Status Card */}
            <motion.div
              className="meta-status-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="meta-card-item">
                <span className="meta-sub font-mono">LOCATION</span>
                <div className="meta-val-row">
                  <MapPin size={16} className="text-accent" />
                  <strong>{personalInfo.location}</strong>
                </div>
                <span className="font-mono text-muted text-micro">{personalInfo.coordinates}</span>
              </div>

              <div className="meta-card-sep" />

              <div className="meta-card-item">
                <span className="meta-sub font-mono">CURRENT STATUS</span>
                <div className="meta-val-row">
                  <span className="status-ping-dot" />
                  <strong>{personalInfo.availability}</strong>
                </div>
                <span className="font-mono text-muted text-micro">AVAILABLE FOR COLLABORATION</span>
              </div>
            </motion.div>

            {/* Social Network Links */}
            <motion.div
              className="social-channels-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="social-sub font-mono">VERIFIED PROFILES</span>

              <div className="social-links-list">
                {personalInfo.contacts.socials.map((social) => {
                  const Icon = socialIconsMap[social.platform] || ArrowUpRight;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-channel-item"
                    >
                      <div className="social-item-left">
                        <Icon size={18} className="social-icon" />
                        <div>
                          <span className="social-name">{social.platform}</span>
                          <span className="social-handle font-mono text-muted">@{social.handle}</span>
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="social-arrow" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Calm Editorial Colophon Footer */}
        <div className="editorial-colophon-footer">
          <div className="colophon-left">
            <div className="footer-brand">
              <BrandMark size={24} className="footer-brand-mark" ariaLabel="Manthan Kumar Monogram" />
              <div className="footer-brand-text">
                <span className="colophon-title font-mono">{personalInfo.name.toUpperCase()}</span>
                <span className="footer-portfolio-sub font-mono">ENGINEERING PORTFOLIO</span>
              </div>
            </div>
            <p className="colophon-desc">
              Designed as an Editorial Engineering Journal &amp; Digital Workshop.
            </p>
          </div>

          <div className="colophon-right font-mono">
            <span>© 2026 MANTHAN KUMAR</span>
            <span className="colophon-sep">·</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
