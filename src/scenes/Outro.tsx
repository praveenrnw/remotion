import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Scene fade-in ────────────────────────────────────── */
  const sceneFade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const headProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headScale = interpolate(headProgress, [0, 1], [0.95, 1]);
  const headY = interpolate(headProgress, [0, 1], [30, 0]);

  const subProgress = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  const ctaProgress = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const emailX = interpolate(ctaProgress, [0, 1], [-20, 0]);

  const phoneProgress = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneX = interpolate(phoneProgress, [0, 1], [20, 0]);

  const footerProgress = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneFade,
      }}
    >
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}1a 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: headProgress,
        }}
      />

      {/* Heading */}
      <h1
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: theme.colors.textPrimary,
          margin: 0,
          textAlign: "center",
          opacity: headProgress,
          transform: `translateY(${headY}px) scale(${headScale})`,
          lineHeight: 1.2,
          letterSpacing: "-1.5px",
        }}
      >
        Let's talk about
        <br />
        <span style={{ color: theme.colors.accent }}>what you're building.</span>
      </h1>

      {/* Sub text */}
      <p
        style={{
          fontSize: 26,
          color: theme.colors.textSecondary,
          margin: "28px 0 0",
          opacity: subProgress,
          transform: `translateY(${subY}px)`,
          textAlign: "center",
          maxWidth: 560,
          lineHeight: 1.6,
        }}
      >
        No pitch decks. No sales scripts. Just a real conversation
        about your product.
      </p>

      <div
        style={{
          marginTop: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 12,
            padding: "18px 44px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: ctaProgress,
            transform: `translateX(${emailX}px)`,
          }}
        >
          {/* Email SVG icon */}
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
            <rect x="1" y="1" width="22" height="18" rx="3" stroke={theme.colors.accent} strokeWidth="2" />
            <polyline points="1,1 12,11 23,1" fill="none" stroke={theme.colors.accent} strokeWidth="2" />
          </svg>
          <span style={{ fontSize: 24, color: theme.colors.textPrimary, fontWeight: 700 }}>
            hello@nativewit.in
          </span>
        </div>
        <div
          style={{
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: 12,
            padding: "16px 44px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: phoneProgress,
            transform: `translateX(${phoneX}px)`,
          }}
        >
          {/* Phone SVG icon */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 1h12a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V3a2 2 0 012-2z" stroke={theme.colors.accent} strokeWidth="2" />
            <line x1="8" y1="18" x2="14" y2="18" stroke={theme.colors.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 22, color: theme.colors.textPrimary, fontWeight: 700 }}>
            +91 99443 96311
          </span>
        </div>
      </div>

      {/* Website footer */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: footerProgress,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Globe icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={theme.colors.textSecondary} strokeWidth="2" />
            <ellipse cx="12" cy="12" rx="4" ry="10" stroke={theme.colors.textSecondary} strokeWidth="1.5" />
            <line x1="2" y1="12" x2="22" y2="12" stroke={theme.colors.textSecondary} strokeWidth="1.5" />
          </svg>
          <span style={{ fontSize: 22, color: theme.colors.textSecondary, fontWeight: 700 }}>
            www.nativewit.in
          </span>
        </div>
        <span style={{ fontSize: 18, color: theme.colors.textMuted, fontWeight: 600 }}>
          hello@nativewit.in
        </span>
      </div>
    </AbsoluteFill>
  );
};
