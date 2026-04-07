import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

const STATS = [
  { value: 30, suffix: "+", label: "Products shipped" },
  { value: 5.0, suffix: "", label: "Clutch rating", decimals: 1 },
  { value: 12, suffix: "", label: "Weeks avg. to launch" },
  { value: 99.7, suffix: "%", label: "Crash-free rate", decimals: 1 },
];

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headProgress = spring({ frame, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill
      style={{
        background: theme.colors.bg,
        fontFamily: theme.font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 64,
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
          opacity: headProgress,
        }}
      >
        By the numbers
      </span>

      {/* Stats grid */}
      <div style={{ display: "flex", gap: 48 }}>
        {STATS.map((stat, i) => {
          const delay = 8 + i * 10;
          const progress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 100 },
          });

          // Animated counter
          const countRaw = interpolate(progress, [0, 1], [0, stat.value]);
          const countDisplay =
            stat.decimals != null
              ? countRaw.toFixed(stat.decimals)
              : Math.round(countRaw).toString();

          const statY = interpolate(progress, [0, 1], [20, 0]);

          return (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                opacity: progress,
                transform: `translateY(${statY}px)`,
                minWidth: 180,
                background: theme.colors.surface,
                borderRadius: 16,
                padding: "32px 28px",
                border: `1px solid ${theme.colors.border}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent gradient line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${theme.colors.accent}, transparent)`,
                }}
              />
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                }}
              >
                {countDisplay}{stat.suffix}
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: theme.colors.textSecondary,
                  margin: "14px 0 0",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
