import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

export const HeroStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Animations ──────────────────────────────────────────── */

  const labelProgress = spring({
    frame,
    fps,
    config: { damping: 120 },
  });

  const headProgress = spring({
    frame: frame - 6,
    fps,
    config: { damping: 100 },
  });
  const headY = interpolate(headProgress, [0, 1], [40, 0]);

  const accentLine = spring({
    frame: frame - 16,
    fps,
    config: { damping: 80, mass: 0.5 },
  });

  const bodyProgress = spring({
    frame: frame - 24,
    fps,
    config: { damping: 100 },
  });
  const bodyY = interpolate(bodyProgress, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "0 120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Top-right glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.accent}1a 0%, transparent 60%)`,
          filter: "blur(60px)",
          opacity: headProgress,
        }}
      />

      {/* Section label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: labelProgress,
          marginBottom: 16,
        }}
      >
        Flutter-first product studio
      </span>

      {/* Main tagline */}
      <div style={{ opacity: headProgress, transform: `translateY(${headY}px)` }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: theme.colors.textPrimary,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-2px",
          }}
        >
          We engineer products
          <br />
          <span style={{ color: theme.colors.accent }}>that ship.</span>
        </h1>
      </div>

      {/* Accent underline */}
      <div
        style={{
          width: interpolate(accentLine, [0, 1], [0, 80]),
          height: 4,
          background: theme.colors.accent,
          borderRadius: 2,
          marginTop: 28,
        }}
      />

      {/* Sub-body */}
      <p
        style={{
          fontSize: 22,
          color: theme.colors.textSecondary,
          lineHeight: 1.7,
          maxWidth: 760,
          margin: "28px 0 0",
          opacity: bodyProgress,
          transform: `translateY(${bodyY}px)`,
        }}
      >
        Your next product needs more than developers. We engineer
        production-grade software across mobile, web, and desktop — with AI
        baked in where it matters.
      </p>
    </AbsoluteFill>
  );
};
