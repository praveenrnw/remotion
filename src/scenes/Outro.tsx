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

  const headProgress = spring({ frame, fps, config: { damping: 80 } });
  const headY = interpolate(headProgress, [0, 1], [30, 0]);

  const subProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 100 },
  });
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  const ctaProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 80, mass: 0.6 },
  });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.9, 1]);

  const footerProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 120 },
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
          fontSize: 56,
          fontWeight: 800,
          color: theme.colors.textPrimary,
          margin: 0,
          textAlign: "center",
          opacity: headProgress,
          transform: `translateY(${headY}px)`,
          lineHeight: 1.2,
          letterSpacing: "-1.5px",
        }}
      >
        Ready to build your
        <br />
        <span style={{ color: theme.colors.accent }}>next product?</span>
      </h1>

      {/* Sub text */}
      <p
        style={{
          fontSize: 20,
          color: theme.colors.textSecondary,
          margin: "24px 0 0",
          opacity: subProgress,
          transform: `translateY(${subY}px)`,
          textAlign: "center",
          maxWidth: 560,
          lineHeight: 1.6,
        }}
      >
        No pitch decks, no sales scripts — just a real conversation about your
        product.
      </p>

      {/* CTA button */}
      <div
        style={{
          marginTop: 40,
          opacity: ctaProgress,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            background: theme.colors.accent,
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            padding: "16px 40px",
            borderRadius: 10,
            letterSpacing: 0.5,
          }}
        >
          Book a strategy call
        </div>
      </div>

      {/* Contact + footer */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: footerProgress,
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: theme.colors.textSecondary,
            fontWeight: 500,
          }}
        >
          hello@nativewit.in
        </span>
        <span style={{ fontSize: 14, color: theme.colors.textMuted }}>
          nativewit.in
        </span>
      </div>
    </AbsoluteFill>
  );
};
