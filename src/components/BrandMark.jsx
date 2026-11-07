import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/useTheme";
import "./BrandMark.css";

const SIZE_MAP = {
  xs: { width: 24, height: 20 },
  sm: { width: 32, height: 26.67 },
  small: { width: 32, height: 26.67 },
  md: { width: 48, height: 40 },
  medium: { width: 48, height: 40 },
  lg: { width: 96, height: 80 },
  large: { width: 96, height: 80 },
  xl: { width: 240, height: 200 },
};

const easeEditorial = [0.22, 1, 0.36, 1];

export default function BrandMark({
  variant = "auto",
  size = "sm",
  className = "",
  animated = false,
  showCrosshairs,
  showGuides = false,
  ariaLabel = "Manthan Kumar M Monogram",
  style = {},
  ...props
}) {
  const { theme } = useTheme();

  // Resolve active color palette
  const effectiveTheme = useMemo(() => {
    if (variant === "light") return "light";
    if (variant === "dark") return "dark";
    if (variant === "monochrome") return "mono";
    return theme === "dark" ? "dark" : "light";
  }, [variant, theme]);

  // Dimension calculation
  const dimensions = useMemo(() => {
    if (typeof size === "string" && SIZE_MAP[size]) {
      return SIZE_MAP[size];
    }
    if (typeof size === "number") {
      return { width: size, height: Math.round(size * (200 / 240)) };
    }
    return SIZE_MAP.sm;
  }, [size]);

  // Determine whether to display registration crosshairs (cleaner at small sizes)
  const renderCrosshairs = useMemo(() => {
    if (typeof showCrosshairs === "boolean") return showCrosshairs;
    return dimensions.width >= 40;
  }, [showCrosshairs, dimensions.width]);

  const colors = useMemo(() => {
    if (effectiveTheme === "mono") {
      return {
        pillar: "currentColor",
        charcoal: "currentColor",
        charcoalOpacity: 0.4,
        offWhite: "#FFFFFF",
        offWhiteStroke: "currentColor",
        orange: "currentColor",
        orangeLight: "currentColor",
        orangeOpacity: 0.8,
        orangeLightOpacity: 0.7,
        keystone: "currentColor",
        keystoneStroke: "#FFFFFF",
        shadow: "transparent",
        glow: "transparent",
        crosshair: "currentColor",
      };
    }

    if (effectiveTheme === "dark") {
      return {
        pillar: "#F5EFE6",
        charcoal: "#2A2520",
        charcoalOpacity: 1,
        offWhite: "#FFFFFF",
        offWhiteStroke: "rgba(255, 255, 255, 0.2)",
        orange: "#F07A16",
        orangeLight: "#FF9E4A",
        orangeOpacity: 1,
        orangeLightOpacity: 1,
        keystone: "#F5EFE6",
        keystoneStroke: "#F07A16",
        shadow: "rgba(0, 0, 0, 0.65)",
        glow: "#F07A16",
        crosshair: "#F07A16",
      };
    }

    // Default: light mode
    return {
      pillar: "#171513",
      charcoal: "#2A2520",
      charcoalOpacity: 1,
      offWhite: "#FFFFFF",
      offWhiteStroke: "#171513",
      orange: "#C95A08",
      orangeLight: "#E06915",
      orangeOpacity: 1,
      orangeLightOpacity: 1,
      keystone: "#171513",
      keystoneStroke: "#C95A08",
      shadow: "rgba(23, 21, 19, 0.22)",
      glow: "#C95A08",
      crosshair: "#C95A08",
    };
  }, [effectiveTheme]);

  // Unique filter IDs to avoid SVG filter collisions when multiple BrandMarks exist
  const filterIdSuffix = useMemo(() => Math.random().toString(36).substring(2, 7), []);
  const shadowFilterId = `brand-shadow-${filterIdSuffix}`;
  const glowFilterId = `brand-glow-${filterIdSuffix}`;

  const svgAttributes = {
    viewBox: "0 0 240 200",
    width: dimensions.width,
    height: dimensions.height,
    fill: "none",
    className: `brand-mark-svg ${className}`.trim(),
    role: "img",
    "aria-label": ariaLabel,
    style: { display: "block", aspectRatio: "240 / 200", ...style },
    ...props,
  };

  if (animated) {
    return (
      <svg {...svgAttributes}>
        <defs>
          <filter id={shadowFilterId} x="-15%" y="-15%" width="135%" height="135%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={colors.shadow} />
          </filter>
          <filter id={glowFilterId} x="-12%" y="-12%" width="124%" height="124%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={colors.glow} floodOpacity="0.4" />
          </filter>
        </defs>

        {showGuides && (
          <g className="m-construction-guides" opacity="0.35">
            <line x1="16" y1="25" x2="224" y2="25" stroke={colors.orange} strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1="16" y1="175" x2="224" y2="175" stroke={colors.orange} strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1="120" y1="10" x2="120" y2="190" stroke={colors.orange} strokeWidth="0.8" strokeDasharray="2 4" />
          </g>
        )}

        {renderCrosshairs && (
          <g className="m-corner-crosshairs" stroke={colors.crosshair} strokeWidth="1.2">
            <line x1="12" y1="25" x2="20" y2="25" />
            <line x1="16" y1="21" x2="16" y2="29" />
            <line x1="220" y1="25" x2="228" y2="25" />
            <line x1="224" y1="21" x2="224" y2="29" />
            <line x1="12" y1="175" x2="20" y2="175" />
            <line x1="16" y1="171" x2="16" y2="179" />
            <line x1="220" y1="175" x2="228" y2="175" />
            <line x1="224" y1="171" x2="224" y2="179" />
          </g>
        )}

        {/* Stage 01: Structural Outer Pillars */}
        <motion.path
          className="m-part m-pillar-left"
          d="M 24 25 L 56 25 L 56 175 L 24 175 Z"
          fill={colors.pillar}
          initial={{ x: -18, y: -6, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeEditorial }}
        />
        <motion.path
          className="m-part m-pillar-right"
          d="M 184 25 L 216 25 L 216 175 L 184 175 Z"
          fill={colors.pillar}
          initial={{ x: 18, y: -6, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeEditorial }}
        />

        {/* Grounding Charcoal Valley */}
        <motion.polygon
          className="m-part m-valley"
          points="56,175 120,132 184,175 162,175 120,146 78,175"
          fill={colors.charcoal}
          fillOpacity={colors.charcoalOpacity}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.18, ease: easeEditorial }}
        />

        {/* Stage 02: Architectural White Facets */}
        <motion.polygon
          className="m-part m-slope-left"
          points="56,25 96,25 120,96 102,120 56,40"
          fill={colors.offWhite}
          stroke={colors.offWhiteStroke}
          strokeWidth={effectiveTheme === "dark" ? "0.6" : "1.2"}
          initial={{ x: -14, y: -14, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease: easeEditorial }}
        />
        <motion.polygon
          className="m-part m-slope-right"
          points="184,25 144,25 120,96 138,120 184,40"
          fill={colors.offWhite}
          stroke={colors.offWhiteStroke}
          strokeWidth={effectiveTheme === "dark" ? "0.6" : "1.2"}
          initial={{ x: 14, y: -14, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease: easeEditorial }}
        />

        {/* Stage 03: Burnt-Orange Diagonal Accent Beams */}
        <motion.polygon
          className="m-part m-orange-left"
          filter={`url(#${shadowFilterId})`}
          points="56,25 74,25 120,146 108,160 56,62"
          fill={colors.orange}
          fillOpacity={colors.orangeOpacity}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.35, ease: easeEditorial }}
          style={{ transformOrigin: "56px 25px" }}
        />
        <motion.polygon
          className="m-part m-orange-right"
          filter={`url(#${shadowFilterId})`}
          points="184,25 166,25 120,146 132,160 184,62"
          fill={colors.orangeLight}
          fillOpacity={colors.orangeLightOpacity}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.38, ease: easeEditorial }}
          style={{ transformOrigin: "184px 25px" }}
        />

        {/* Stage 04: Central Keystone Anchor */}
        <motion.polygon
          className="m-part m-keystone"
          filter={`url(#${glowFilterId})`}
          points="120,116 138,144 120,166 102,144"
          fill={colors.keystone}
          stroke={colors.keystoneStroke}
          strokeWidth="1.5"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.52, ease: easeEditorial }}
          style={{ transformOrigin: "120px 144px" }}
        />
      </svg>
    );
  }

  // Static high-performance version
  return (
    <svg {...svgAttributes}>
      <defs>
        <filter id={shadowFilterId} x="-15%" y="-15%" width="135%" height="135%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={colors.shadow} />
        </filter>
        <filter id={glowFilterId} x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor={colors.glow} floodOpacity="0.4" />
        </filter>
      </defs>

      {renderCrosshairs && (
        <g className="m-corner-crosshairs" stroke={colors.crosshair} strokeWidth="1.2">
          <line x1="12" y1="25" x2="20" y2="25" />
          <line x1="16" y1="21" x2="16" y2="29" />
          <line x1="220" y1="25" x2="228" y2="25" />
          <line x1="224" y1="21" x2="224" y2="29" />
          <line x1="12" y1="175" x2="20" y2="175" />
          <line x1="16" y1="171" x2="16" y2="179" />
          <line x1="220" y1="175" x2="228" y2="175" />
          <line x1="224" y1="171" x2="224" y2="179" />
        </g>
      )}

      {/* Structural Outer Pillars */}
      <path className="m-part m-pillar-left" d="M 24 25 L 56 25 L 56 175 L 24 175 Z" fill={colors.pillar} />
      <path className="m-part m-pillar-right" d="M 184 25 L 216 25 L 216 175 L 184 175 Z" fill={colors.pillar} />

      {/* Grounding Charcoal Valley */}
      <polygon
        className="m-part m-valley"
        points="56,175 120,132 184,175 162,175 120,146 78,175"
        fill={colors.charcoal}
        fillOpacity={colors.charcoalOpacity}
      />

      {/* Architectural White Facets */}
      <polygon
        className="m-part m-slope-left"
        points="56,25 96,25 120,96 102,120 56,40"
        fill={colors.offWhite}
        stroke={colors.offWhiteStroke}
        strokeWidth={effectiveTheme === "dark" ? "0.6" : "1.2"}
      />
      <polygon
        className="m-part m-slope-right"
        points="184,25 144,25 120,96 138,120 184,40"
        fill={colors.offWhite}
        stroke={colors.offWhiteStroke}
        strokeWidth={effectiveTheme === "dark" ? "0.6" : "1.2"}
      />

      {/* Burnt-Orange Diagonal Accent Beams */}
      <polygon
        className="m-part m-orange-left"
        filter={`url(#${shadowFilterId})`}
        points="56,25 74,25 120,146 108,160 56,62"
        fill={colors.orange}
        fillOpacity={colors.orangeOpacity}
      />
      <polygon
        className="m-part m-orange-right"
        filter={`url(#${shadowFilterId})`}
        points="184,25 166,25 120,146 132,160 184,62"
        fill={colors.orangeLight}
        fillOpacity={colors.orangeLightOpacity}
      />

      {/* Central Keystone Anchor */}
      <polygon
        className="m-part m-keystone"
        filter={`url(#${glowFilterId})`}
        points="120,116 138,144 120,166 102,144"
        fill={colors.keystone}
        stroke={colors.keystoneStroke}
        strokeWidth="1.5"
      />
    </svg>
  );
}
