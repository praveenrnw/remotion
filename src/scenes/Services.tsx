import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const SERVICES = [
  {
    num: "01",
    title: "Product Engineering",
    subtitle: "Flutter-first. Full-stack when you need it.",
    body: "Full-cycle product development from concept to App Store. Cross-platform apps for mobile, web, and desktop.",
  },
  {
    num: "02",
    title: "AI Integration",
    subtitle: "Make your product intelligent.",
    body: "We identify where AI adds real value, then build it. LLM integration, computer vision, and intelligent automation.",
  },
  {
    num: "03",
    title: "CTO-as-a-Service",
    subtitle: "Technical leadership without the full-time hire.",
    body: "Strategy, architecture decisions, team building, and vendor evaluation — aligned with your business goals.",
  },
];

export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Header ──────────────────────────────────────────────── */
  const headerProgress = spring({ frame, fps, config: { damping: 100 } });
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  const labelProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        padding: "80px 100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section label */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: theme.colors.accent,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: labelProgress,
          marginBottom: 12,
        }}
      >
        What we do
      </span>

      {/* Section heading */}
      <h2
        style={{
          fontSize: 44,
          fontWeight: 700,
          color: theme.colors.textPrimary,
          margin: "0 0 56px",
          opacity: headerProgress,
          transform: `translateY(${headerY}px)`,
        }}
      >
        Three ways we help you ship
      </h2>

      {/* Service cards */}
      <div
        style={{
          display: "flex",
          gap: 28,
          flex: 1,
        }}
      >
        {SERVICES.map((svc, i) => {
          const delay = 18 + i * 12;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });
          const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

          return (
            <div
              key={svc.num}
              style={{
                flex: 1,
                background: theme.colors.surface,
                borderRadius: 16,
                padding: "36px 32px",
                border: `1px solid ${theme.colors.border}`,
                opacity: cardProgress,
                transform: `translateY(${cardY}px)`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, transparent, ${theme.colors.accent}, transparent)`,
                }}
              />
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${theme.colors.accent}1a`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.colors.accent,
                  fontFamily: "monospace",
                  marginBottom: 20,
                }}
              >
                {svc.num}
              </div>
              <h3
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: theme.colors.textPrimary,
                  margin: "0 0 6px",
                }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: theme.colors.accent,
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                {svc.subtitle}
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: theme.colors.textSecondary,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {svc.body}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
